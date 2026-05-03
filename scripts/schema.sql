-- extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- create basic tables
CREATE TABLE IF NOT EXISTS categories (
  name text PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS projects (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  subtitle text,
  category text REFERENCES categories(name),
  slug text UNIQUE NOT NULL,
  description text,
  tags text[],
  tools text[],
  problem text,
  solution text,
  result text,
  cover_image text,
  gallery text[],
  video_url text,
  audio_url text,
  created_at timestamp with time zone DEFAULT now()
);

-- ensure core categories exist
INSERT INTO categories (name) VALUES 
('Design'), ('Photography'), ('Video'), ('Audio'), ('Branding')
ON CONFLICT (name) DO NOTHING;

-- clear old mock projects just in case
DELETE FROM projects;

-- Insert Mock Data
INSERT INTO projects (title, subtitle, category, slug, description, tags, tools, problem, solution, result, cover_image, gallery) VALUES
('Noir Essence', 'Luxury Perfume Branding', 'Branding', 'noir-essence', 'A complete visual identity project for a luxury perfume brand, from concept to packaging design.', ARRAY['Branding', 'Packaging', 'Art Direction'], ARRAY['Illustrator', 'Photoshop', 'Figma', 'Cinema 4D'], 'The brand had no strong visual identity to stand out in a saturated market.', 'We created a premium identity with a timeless black & gold aesthetic.', 'The brand now has a strong recognition and premium positioning.', '/mock/noir-essence.jpg', ARRAY['/mock/noir-essence-2.jpg', '/mock/noir-essence-3.jpg']),

('Casa Nights', 'Urban Photography Series', 'Photography', 'casa-nights', 'A cinematic photography exploration of Casablanca at night.', ARRAY['Photography', 'Color Grading'], ARRAY['Lightroom', 'Photoshop'], 'Capturing the raw, unfiltered essence of the city without losing aesthetic appeal.', 'Applied a custom film emulation LUT with heavy contrast and neon highlights.', 'Award-winning photo series featured in international magazines.', '/mock/casa-nights.jpg', ARRAY['/mock/casa-nights-2.jpg', '/mock/casa-nights-3.jpg']),

('Atlas Experience', 'Event Aftermovie', 'Video', 'atlas-experience', 'High-energy cinematic aftermovie for the Atlas Music Festival.', ARRAY['Video Production', 'Editing', 'Color Grading'], ARRAY['Premiere Pro', 'DaVinci Resolve', 'After Effects'], 'Summarize a 3-day multi-stage event into a cohesive 2-minute film.', 'Focus on human emotion and dynamic transitions matching the audio beat.', 'Over 1M organic views and 40% increase in next years ticket presales.', '/mock/atlas-exp.jpg', ARRAY[]::text[]),

('Echo Sphere', 'Sound Design & Music Production', 'Audio', 'echo-sphere', 'Immersive soundscape and foley design for a sci-fi short film.', ARRAY['Sound Design', 'Mixing', 'Mastering'], ARRAY['Ableton Live', 'Pro Tools'], 'The visual effects lacked weight and realism.', 'Layered organic sounds with synthesized sub-frequencies.', 'Winner of Best Sound Design at the Independent Short Film Awards.', '/mock/echo-sphere.jpg', ARRAY[]::text[]);
