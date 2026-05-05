-- extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Categories table with proper UUID primary key
CREATE TABLE IF NOT EXISTS categories (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text UNIQUE NOT NULL,
  slug text UNIQUE,
  parent_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  created_at timestamp with time zone DEFAULT now()
);

-- Projects table
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

-- Site settings table
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

-- Contact messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  is_read boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now()
);

-- Insert default settings row
INSERT INTO site_settings (id) VALUES (1) ON CONFLICT (id) DO NOTHING;

-- Ensure core categories exist
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
