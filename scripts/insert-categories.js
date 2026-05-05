const { Client } = require('pg');
require('dotenv').config({ path: '.env.local' });

async function setup() {
    const client = new Client({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

    try {
        await client.connect();

        // Drop FK constraint on projects first
        await client.query('ALTER TABLE projects DROP CONSTRAINT IF EXISTS projects_category_fkey');
        console.log("Dropped FK constraint");

        // Recreate categories table with proper schema
        await client.query('DROP TABLE IF EXISTS categories CASCADE');
        await client.query(`
      CREATE TABLE categories (
        id serial PRIMARY KEY,
        name text UNIQUE NOT NULL,
        slug text NOT NULL,
        services jsonb DEFAULT '[]'::jsonb,
        parent_id integer REFERENCES categories(id) ON DELETE CASCADE
      )
    `);
        console.log("Created categories table with full schema");

        // RLS
        await client.query(`
      ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
      DROP POLICY IF EXISTS "Allow all for anon" ON categories;
      CREATE POLICY "Allow all for anon" ON categories FOR ALL USING (true) WITH CHECK (true);
    `);

        // Insert top-level categories
        const cats = [
            { name: "Identité Visuelle", slug: "identite-visuelle", services: ["Conception de logo", "Palette de couleurs", "Typographie", "Brand guidelines"] },
            { name: "Réseaux Sociaux & Publicité", slug: "reseaux-sociaux-publicite", services: ["Création de posts", "Stories", "Visuels publicitaires", "Campagnes marketing"] },
            { name: "Design Print", slug: "design-print", services: ["Flyers", "Affiches", "Cartes de visite", "Brochures", "Bannières", "Posters"] },
            { name: "Impression & Textile", slug: "impression-textile", services: ["Impression sur vêtements", "T-shirts personnalisés", "Merchandising textile", "Sérigraphie"] },
            { name: "UI/UX Design", slug: "ui-ux-design", services: ["Design de sites web", "Applications mobiles", "Landing pages", "Expérience utilisateur"] },
            { name: "Motion Design", slug: "motion-design", services: ["Animation de logo", "Vidéos promotionnelles", "Reels et shorts", "Animations graphiques"] },
            { name: "Photography", slug: "photography", services: ["Portrait", "Street photography", "Photographie événementielle", "Photographie cinématographique"] },
            { name: "Retouche & Manipulation Photo", slug: "retouche-photo", services: ["Retouche professionnelle", "Photomontage", "Color grading"] },
            { name: "Video Production", slug: "video-production", services: ["Tournage vidéo", "Montage vidéo", "Storytelling visuel", "Production cinématographique"] },
            { name: "Motion Graphics", slug: "motion-graphics", services: ["Animations avancées", "Identité animée", "Effets visuels", "Contenus dynamiques"] },
            { name: "Audio Engineering", slug: "audio-engineering", services: ["Mixage audio", "Mastering", "Sound design", "Production musicale"] },
            { name: "Media Production", slug: "media-production", services: ["Production audiovisuelle", "Création de contenu", "Direction artistique", "Post-production"] },
            { name: "Event Production", slug: "event-production", services: ["Organisation d'événements", "Gestion de festivals", "Production de shows", "Coordination technique"] },
            { name: "Festivals", slug: "festivals", services: ["Production de festivals", "Scénographie", "Gestion artistique", "Logistique événementielle"] },
            { name: "Conferences", slug: "conferences", services: ["Organisation de conférences", "Forums professionnels", "Événements corporate", "Gestion des intervenants"] },
            { name: "Stage Design", slug: "stage-design", services: ["Conception de scènes", "Scénographie immersive", "Éclairage scénique", "Expériences visuelles live"] },
            { name: "Design LED & Écrans", slug: "design-led-ecrans", services: ["Design pour écrans LED", "Animations visuelles", "Contenus événementiels", "Habillage digital"] },
            { name: "Content Creation", slug: "content-creation", services: ["Création de contenu digital", "Stratégie de contenu", "Brand storytelling", "Social media content"] },
            { name: "Web Development", slug: "web-development", services: ["Développement frontend", "Développement backend", "Applications web", "Full-stack development"] },
            { name: "Cyber Security", slug: "cyber-security", services: ["Sécurité des systèmes", "Audit de sécurité", "Protection des données", "Monitoring"] },
            { name: "Réunions RNI Jeunes", slug: "reunions-rni-jeunes", services: ["Organisation des réunions", "Production visuelle", "Couverture média", "Gestion des événements politiques"] },
            { name: "Design d'Espaces Professionnels", slug: "design-espaces-pro", services: [] },
        ];

        for (const cat of cats) {
            await client.query(
                'INSERT INTO categories (name, slug, services) VALUES ($1, $2, $3)',
                [cat.name, cat.slug, JSON.stringify(cat.services)]
            );
        }
        console.log(`Inserted ${cats.length} top-level categories`);

        // Insert subcategories under "Design d'Espaces Professionnels"
        const { rows: [parent] } = await client.query("SELECT id FROM categories WHERE slug='design-espaces-pro'");
        const subs = [
            { name: "Façade & Extérieur", slug: "facade-exterieur", services: ["Design de façade", "Entrée et expérience client", "Éclairage extérieur", "Branding extérieur"] },
            { name: "Réception & Accueil", slug: "reception-accueil", services: ["Desk d'accueil", "Mur logo (logo wall)", "Design moderne et minimaliste", "Matériaux (bois, marbre, verre)"] },
            { name: "Mobilier", slug: "mobilier", services: ["Bureaux ergonomiques", "Chaises confortables", "Tables de réunion", "Rangement et organisation"] },
            { name: "Décoration & Branding Intérieur", slug: "decoration-branding", services: ["Couleurs selon identité", "Wall graphics", "Quotes et visuels", "Plantes et décoration moderne"] },
            { name: "Aménagement de l'Espace", slug: "amenagement-espace", services: ["Open space", "Bureaux privés", "Salles de réunion", "Espaces détente"] },
            { name: "Éclairage", slug: "eclairage", services: ["Lumière naturelle", "Éclairage LED", "Ambiance chaude ou froide", "Distribution fonctionnelle"] },
        ];
        for (const sub of subs) {
            await client.query(
                'INSERT INTO categories (name, slug, services, parent_id) VALUES ($1, $2, $3, $4)',
                [sub.name, sub.slug, JSON.stringify(sub.services), parent.id]
            );
        }
        console.log(`Inserted ${subs.length} subcategories`);

        // Show results
        const { rows: all } = await client.query('SELECT id, name, slug, parent_id FROM categories ORDER BY parent_id NULLS FIRST, name');
        console.log(`\n✅ Total: ${all.length} categories`);
        all.forEach(r => {
            const prefix = r.parent_id ? '  └─ ' : '• ';
            console.log(`${prefix}${r.name} (${r.slug})`);
        });

    } catch (err) {
        console.error("Error:", err);
    } finally {
        await client.end();
    }
}
setup();
