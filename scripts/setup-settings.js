const { Client } = require('pg');
require('dotenv').config({ path: '.env.local' });

async function setup() {
    const client = new Client({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

    try {
        await client.connect();
        await client.query(`
      CREATE TABLE IF NOT EXISTS site_settings (
        id integer PRIMARY KEY DEFAULT 1,
        about_bio text,
        about_image text,
        contact_email text,
        contact_phone text,
        contact_instagram text
      );
      INSERT INTO site_settings (id, about_bio, contact_email) 
      VALUES (1, 'A multidisciplinary creative seamlessly blending visual design, spatial audio, and cinematic videography.', 'hello@mohamedbouliani.com') 
      ON CONFLICT (id) DO NOTHING;
    `);
        console.log("Site settings table successfully initialized on the Live Database!");
    } catch (err) {
        console.error(err);
    } finally {
        await client.end();
    }
}
setup();
