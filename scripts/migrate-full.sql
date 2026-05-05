-- ============================================================
-- FULL MIGRATION: Run this in your Supabase SQL Editor
-- This script is idempotent — safe to run multiple times.
-- ============================================================

-- ── Extensions ───────────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ── Categories ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS categories (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    name text UNIQUE NOT NULL,
    slug text UNIQUE,
    parent_id uuid REFERENCES categories(id) ON DELETE SET NULL,
    created_at timestamp with time zone DEFAULT now()
);

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'categories' AND column_name = 'slug') THEN
        ALTER TABLE categories ADD COLUMN slug text UNIQUE;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'categories' AND column_name = 'parent_id') THEN
        ALTER TABLE categories ADD COLUMN parent_id uuid REFERENCES categories(id) ON DELETE SET NULL;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'categories' AND column_name = 'created_at') THEN
        ALTER TABLE categories ADD COLUMN created_at timestamp with time zone DEFAULT now();
    END IF;
END $$;

-- ── Projects ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS projects (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    title text NOT NULL,
    subtitle text,
    category text NOT NULL,
    slug text UNIQUE NOT NULL,
    description text,
    tags text[] DEFAULT '{}',
    tools text[] DEFAULT '{}',
    problem text,
    solution text,
    result text,
    cover_image text,
    gallery text[] DEFAULT '{}',
    video_url text,
    audio_url text,
    is_featured boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT now()
);

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'projects' AND column_name = 'subtitle') THEN
        ALTER TABLE projects ADD COLUMN subtitle text;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'projects' AND column_name = 'tags') THEN
        ALTER TABLE projects ADD COLUMN tags text[] DEFAULT '{}';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'projects' AND column_name = 'tools') THEN
        ALTER TABLE projects ADD COLUMN tools text[] DEFAULT '{}';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'projects' AND column_name = 'problem') THEN
        ALTER TABLE projects ADD COLUMN problem text;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'projects' AND column_name = 'solution') THEN
        ALTER TABLE projects ADD COLUMN solution text;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'projects' AND column_name = 'result') THEN
        ALTER TABLE projects ADD COLUMN result text;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'projects' AND column_name = 'gallery') THEN
        ALTER TABLE projects ADD COLUMN gallery text[] DEFAULT '{}';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'projects' AND column_name = 'video_url') THEN
        ALTER TABLE projects ADD COLUMN video_url text;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'projects' AND column_name = 'audio_url') THEN
        ALTER TABLE projects ADD COLUMN audio_url text;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'projects' AND column_name = 'is_featured') THEN
        ALTER TABLE projects ADD COLUMN is_featured boolean DEFAULT false;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'projects' AND column_name = 'cover_image') THEN
        ALTER TABLE projects ADD COLUMN cover_image text;
    END IF;
END $$;

-- ── Site Settings ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS site_settings (
    id integer PRIMARY KEY DEFAULT 1,
    site_title text DEFAULT 'Mohamed Bouliani',
    site_description text DEFAULT 'Designer. Photographe. Vidéaste. Ingénieur Audio.',
    hero_title text DEFAULT 'Je Crée Des Expériences Qui Racontent',
    hero_subtitle text DEFAULT 'Designer. Photographe. Vidéaste. Ingénieur Audio.',
    hero_video_url text,
    hero_image_url text,
    hero_cta_text text DEFAULT 'Découvrir Mes Projets',
    hero_cta_link text DEFAULT '/work',
    stat_years text DEFAULT '10+',
    stat_years_label text DEFAULT 'Années D''Expérience',
    stat_projects text DEFAULT '120+',
    stat_projects_label text DEFAULT 'Projets Réalisés',
    stat_awards text DEFAULT '15+',
    stat_awards_label text DEFAULT 'Prix Reçus',
    stat_clients text DEFAULT '50+',
    stat_clients_label text DEFAULT 'Clients Satisfaits',
    featured_section_title text DEFAULT 'Travaux Sélectionnés',
    featured_section_subtitle text DEFAULT 'Projets en Vedette',
    featured_view_all_text text DEFAULT 'Voir Tous Les Projets',
    services_section_title text DEFAULT 'Expertise',
    services_section_subtitle text DEFAULT 'Une Approche Multidisciplinaire',
    services_section_description text DEFAULT 'Allier stratégie, design cinématique et technologie performante.',
    services_section_link_text text DEFAULT 'En savoir plus',
    services_section_link_url text DEFAULT '/about',
    service_1_title text DEFAULT 'Design & UI/UX',
    service_1_description text DEFAULT 'Des interfaces primées qui captivent les utilisateurs.',
    service_2_title text DEFAULT 'Photographie & Vidéo',
    service_2_description text DEFAULT 'Narration visuelle cinématique.',
    service_3_title text DEFAULT 'Ingénierie Audio',
    service_3_description text DEFAULT 'Paysages sonores immersifs et production haute fidélité.',
    service_4_title text DEFAULT 'Ingénieur IA & Prompting',
    service_4_description text DEFAULT 'Solutions d''intelligence artificielle sur mesure.',
    about_bio text,
    about_image text,
    contact_email text,
    contact_phone text,
    contact_instagram text,
    contact_behance text,
    contact_linkedin text,
    footer_text text DEFAULT '© Mohamed Bouliani. Tous droits réservés.',
    updated_at timestamp with time zone DEFAULT now()
);

-- Add any missing columns to site_settings
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'site_settings' AND column_name = 'hero_image_url') THEN
        ALTER TABLE site_settings ADD COLUMN hero_image_url text;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'site_settings' AND column_name = 'hero_cta_text') THEN
        ALTER TABLE site_settings ADD COLUMN hero_cta_text text DEFAULT 'Découvrir Mes Projets';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'site_settings' AND column_name = 'hero_cta_link') THEN
        ALTER TABLE site_settings ADD COLUMN hero_cta_link text DEFAULT '/work';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'site_settings' AND column_name = 'stat_years_label') THEN
        ALTER TABLE site_settings ADD COLUMN stat_years_label text DEFAULT 'Années D''Expérience';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'site_settings' AND column_name = 'stat_projects_label') THEN
        ALTER TABLE site_settings ADD COLUMN stat_projects_label text DEFAULT 'Projets Réalisés';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'site_settings' AND column_name = 'stat_awards_label') THEN
        ALTER TABLE site_settings ADD COLUMN stat_awards_label text DEFAULT 'Prix Reçus';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'site_settings' AND column_name = 'stat_clients_label') THEN
        ALTER TABLE site_settings ADD COLUMN stat_clients_label text DEFAULT 'Clients Satisfaits';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'site_settings' AND column_name = 'featured_section_title') THEN
        ALTER TABLE site_settings ADD COLUMN featured_section_title text DEFAULT 'Travaux Sélectionnés';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'site_settings' AND column_name = 'featured_section_subtitle') THEN
        ALTER TABLE site_settings ADD COLUMN featured_section_subtitle text DEFAULT 'Projets en Vedette';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'site_settings' AND column_name = 'featured_view_all_text') THEN
        ALTER TABLE site_settings ADD COLUMN featured_view_all_text text DEFAULT 'Voir Tous Les Projets';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'site_settings' AND column_name = 'services_section_title') THEN
        ALTER TABLE site_settings ADD COLUMN services_section_title text DEFAULT 'Expertise';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'site_settings' AND column_name = 'services_section_subtitle') THEN
        ALTER TABLE site_settings ADD COLUMN services_section_subtitle text DEFAULT 'Une Approche Multidisciplinaire';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'site_settings' AND column_name = 'services_section_description') THEN
        ALTER TABLE site_settings ADD COLUMN services_section_description text;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'site_settings' AND column_name = 'services_section_link_text') THEN
        ALTER TABLE site_settings ADD COLUMN services_section_link_text text DEFAULT 'En savoir plus';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'site_settings' AND column_name = 'services_section_link_url') THEN
        ALTER TABLE site_settings ADD COLUMN services_section_link_url text DEFAULT '/about';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'site_settings' AND column_name = 'service_1_title') THEN
        ALTER TABLE site_settings ADD COLUMN service_1_title text DEFAULT 'Design & UI/UX';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'site_settings' AND column_name = 'service_1_description') THEN
        ALTER TABLE site_settings ADD COLUMN service_1_description text;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'site_settings' AND column_name = 'service_2_title') THEN
        ALTER TABLE site_settings ADD COLUMN service_2_title text DEFAULT 'Photographie & Vidéo';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'site_settings' AND column_name = 'service_2_description') THEN
        ALTER TABLE site_settings ADD COLUMN service_2_description text;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'site_settings' AND column_name = 'service_3_title') THEN
        ALTER TABLE site_settings ADD COLUMN service_3_title text DEFAULT 'Ingénierie Audio';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'site_settings' AND column_name = 'service_3_description') THEN
        ALTER TABLE site_settings ADD COLUMN service_3_description text;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'site_settings' AND column_name = 'service_4_title') THEN
        ALTER TABLE site_settings ADD COLUMN service_4_title text DEFAULT 'Ingénieur IA & Prompting';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'site_settings' AND column_name = 'service_4_description') THEN
        ALTER TABLE site_settings ADD COLUMN service_4_description text;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'site_settings' AND column_name = 'contact_behance') THEN
        ALTER TABLE site_settings ADD COLUMN contact_behance text;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'site_settings' AND column_name = 'contact_linkedin') THEN
        ALTER TABLE site_settings ADD COLUMN contact_linkedin text;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'site_settings' AND column_name = 'footer_text') THEN
        ALTER TABLE site_settings ADD COLUMN footer_text text DEFAULT '© Mohamed Bouliani. Tous droits réservés.';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'site_settings' AND column_name = 'updated_at') THEN
        ALTER TABLE site_settings ADD COLUMN updated_at timestamp with time zone DEFAULT now();
    END IF;
END $$;

-- Insert default settings row if not exists
INSERT INTO site_settings (id) VALUES (1) ON CONFLICT (id) DO NOTHING;

-- ── Contact Messages ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS contact_messages (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    name text NOT NULL,
    email text NOT NULL,
    message text NOT NULL,
    is_read boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT now()
);

-- ── Row Level Security ────────────────────────────────────────
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'projects' AND policyname = 'Allow all access to projects') THEN
        CREATE POLICY "Allow all access to projects" ON projects FOR ALL USING (true) WITH CHECK (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'categories' AND policyname = 'Allow all access to categories') THEN
        CREATE POLICY "Allow all access to categories" ON categories FOR ALL USING (true) WITH CHECK (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'site_settings' AND policyname = 'Allow all access to site_settings') THEN
        CREATE POLICY "Allow all access to site_settings" ON site_settings FOR ALL USING (true) WITH CHECK (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'contact_messages' AND policyname = 'Allow all access to contact_messages') THEN
        CREATE POLICY "Allow all access to contact_messages" ON contact_messages FOR ALL USING (true) WITH CHECK (true);
    END IF;
END $$;

-- ── Default Categories ────────────────────────────────────────
INSERT INTO categories (name, slug) VALUES
    ('Design', 'design'),
    ('Photography', 'photography'),
    ('Video Production', 'video-production'),
    ('Audio Engineering', 'audio-engineering'),
    ('Branding', 'branding'),
    ('Motion Graphics', 'motion-graphics'),
    ('Retouche & Manipulation Photo', 'retouche-manipulation-photo'),
    ('Développement Web', 'developpement-web'),
    ('AI Prompting Engineer', 'ai-prompting-engineer')
ON CONFLICT (name) DO NOTHING;

-- ── Storage Bucket ────────────────────────────────────────────
INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio_media', 'portfolio_media', true)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'objects' AND schemaname = 'storage' AND policyname = 'Allow public read portfolio_media') THEN
        CREATE POLICY "Allow public read portfolio_media"
        ON storage.objects FOR SELECT
        USING (bucket_id = 'portfolio_media');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'objects' AND schemaname = 'storage' AND policyname = 'Allow authenticated upload portfolio_media') THEN
        CREATE POLICY "Allow authenticated upload portfolio_media"
        ON storage.objects FOR INSERT
        WITH CHECK (bucket_id = 'portfolio_media');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'objects' AND schemaname = 'storage' AND policyname = 'Allow authenticated update portfolio_media') THEN
        CREATE POLICY "Allow authenticated update portfolio_media"
        ON storage.objects FOR UPDATE
        USING (bucket_id = 'portfolio_media');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'objects' AND schemaname = 'storage' AND policyname = 'Allow authenticated delete portfolio_media') THEN
        CREATE POLICY "Allow authenticated delete portfolio_media"
        ON storage.objects FOR DELETE
        USING (bucket_id = 'portfolio_media');
    END IF;
END $$;

SELECT 'Full migration completed successfully!' AS status;
