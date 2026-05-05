-- ============================================================
-- MIGRATION: Run this in your Supabase SQL Editor to update
-- your database schema to support all admin panel features.
-- ============================================================

-- Add is_featured column to projects if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'projects' AND column_name = 'is_featured') THEN
        ALTER TABLE projects ADD COLUMN is_featured boolean DEFAULT false;
    END IF;
END $$;

-- Add problem/solution/result columns if they don't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'projects' AND column_name = 'problem') THEN
        ALTER TABLE projects ADD COLUMN problem text;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'projects' AND column_name = 'solution') THEN
        ALTER TABLE projects ADD COLUMN solution text;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'projects' AND column_name = 'result') THEN
        ALTER TABLE projects ADD COLUMN result text;
    END IF;
END $$;

-- Update categories table to use UUID primary key if it uses name as PK
-- First check if categories has an id column
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'categories' AND column_name = 'id') THEN
        -- Drop and recreate categories table with proper structure
        DROP TABLE IF EXISTS categories CASCADE;
        CREATE TABLE categories (
            id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
            name text UNIQUE NOT NULL,
            slug text UNIQUE,
            parent_id uuid REFERENCES categories(id) ON DELETE SET NULL,
            created_at timestamp with time zone DEFAULT now()
        );
        -- Re-insert default categories
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
    ELSE
        -- Just add slug column if missing
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                       WHERE table_name = 'categories' AND column_name = 'slug') THEN
            ALTER TABLE categories ADD COLUMN slug text UNIQUE;
        END IF;
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                       WHERE table_name = 'categories' AND column_name = 'parent_id') THEN
            ALTER TABLE categories ADD COLUMN parent_id uuid REFERENCES categories(id) ON DELETE SET NULL;
        END IF;
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                       WHERE table_name = 'categories' AND column_name = 'created_at') THEN
            ALTER TABLE categories ADD COLUMN created_at timestamp with time zone DEFAULT now();
        END IF;
    END IF;
END $$;

-- Create or update site_settings table
CREATE TABLE IF NOT EXISTS site_settings (
    id integer PRIMARY KEY DEFAULT 1,
    site_title text DEFAULT 'Mohamed Bouliani',
    site_description text DEFAULT 'Designer. Photographe. Vidéaste. Ingénieur Audio.',
    hero_title text DEFAULT 'Je Crée Des Expériences Qui Racontent',
    hero_subtitle text DEFAULT 'Designer. Photographe. Vidéaste. Ingénieur Audio. Création de marques puissantes et d''expériences immersives.',
    hero_video_url text,
    about_bio text,
    about_image text,
    contact_email text,
    contact_phone text,
    contact_instagram text,
    contact_behance text,
    contact_linkedin text,
    footer_text text DEFAULT '© Mohamed Bouliani. Tous droits réservés.',
    stat_years text DEFAULT '10+',
    stat_projects text DEFAULT '120+',
    stat_awards text DEFAULT '15+',
    stat_clients text DEFAULT '50+',
    updated_at timestamp with time zone DEFAULT now()
);

-- Add any missing columns to site_settings
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'site_settings' AND column_name = 'site_title') THEN
        ALTER TABLE site_settings ADD COLUMN site_title text DEFAULT 'Mohamed Bouliani';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'site_settings' AND column_name = 'site_description') THEN
        ALTER TABLE site_settings ADD COLUMN site_description text;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'site_settings' AND column_name = 'hero_title') THEN
        ALTER TABLE site_settings ADD COLUMN hero_title text;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'site_settings' AND column_name = 'hero_subtitle') THEN
        ALTER TABLE site_settings ADD COLUMN hero_subtitle text;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'site_settings' AND column_name = 'hero_video_url') THEN
        ALTER TABLE site_settings ADD COLUMN hero_video_url text;
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
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'site_settings' AND column_name = 'stat_years') THEN
        ALTER TABLE site_settings ADD COLUMN stat_years text DEFAULT '10+';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'site_settings' AND column_name = 'stat_projects') THEN
        ALTER TABLE site_settings ADD COLUMN stat_projects text DEFAULT '120+';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'site_settings' AND column_name = 'stat_awards') THEN
        ALTER TABLE site_settings ADD COLUMN stat_awards text DEFAULT '15+';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'site_settings' AND column_name = 'stat_clients') THEN
        ALTER TABLE site_settings ADD COLUMN stat_clients text DEFAULT '50+';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'site_settings' AND column_name = 'updated_at') THEN
        ALTER TABLE site_settings ADD COLUMN updated_at timestamp with time zone DEFAULT now();
    END IF;
END $$;

-- Insert default settings row if not exists
INSERT INTO site_settings (id) VALUES (1) ON CONFLICT (id) DO NOTHING;

-- Create contact_messages table
CREATE TABLE IF NOT EXISTS contact_messages (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    name text NOT NULL,
    email text NOT NULL,
    message text NOT NULL,
    is_read boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS but allow all operations (for simplicity - you can restrict later)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Create permissive policies (allow all for anon key - adjust for production)
DO $$
BEGIN
    -- Projects policies
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'projects' AND policyname = 'Allow all access to projects') THEN
        CREATE POLICY "Allow all access to projects" ON projects FOR ALL USING (true) WITH CHECK (true);
    END IF;
    
    -- Categories policies
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'categories' AND policyname = 'Allow all access to categories') THEN
        CREATE POLICY "Allow all access to categories" ON categories FOR ALL USING (true) WITH CHECK (true);
    END IF;
    
    -- Site settings policies
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'site_settings' AND policyname = 'Allow all access to site_settings') THEN
        CREATE POLICY "Allow all access to site_settings" ON site_settings FOR ALL USING (true) WITH CHECK (true);
    END IF;
    
    -- Contact messages policies
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'contact_messages' AND policyname = 'Allow all access to contact_messages') THEN
        CREATE POLICY "Allow all access to contact_messages" ON contact_messages FOR ALL USING (true) WITH CHECK (true);
    END IF;
END $$;

-- Create storage bucket for media (run this separately if needed)
-- INSERT INTO storage.buckets (id, name, public) VALUES ('portfolio_media', 'portfolio_media', true) ON CONFLICT (id) DO NOTHING;

SELECT 'Migration completed successfully!' as status;
