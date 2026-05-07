-- migrate-fix.sql
-- Fixes missing columns and ensures RLS policies allow admin operations

-- Add missing columns to site_settings
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS contact_whatsapp text;
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS contact_location text;
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS logo_text text DEFAULT 'MB';
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS marquee_words text;

-- Ensure RLS is enabled on all tables
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Drop and recreate permissive policies for all tables
DROP POLICY IF EXISTS "Allow all access to projects" ON projects;
CREATE POLICY "Allow all access to projects" ON projects FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow all access to categories" ON categories;
CREATE POLICY "Allow all access to categories" ON categories FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow all access to site_settings" ON site_settings;
CREATE POLICY "Allow all access to site_settings" ON site_settings FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow all access to contact_messages" ON contact_messages;
CREATE POLICY "Allow all access to contact_messages" ON contact_messages FOR ALL USING (true) WITH CHECK (true);

-- Ensure settings row exists
INSERT INTO site_settings (id) VALUES (1) ON CONFLICT (id) DO NOTHING;
