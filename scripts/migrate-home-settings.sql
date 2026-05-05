-- ============================================================
-- MIGRATION: Add full home page control columns to site_settings
-- Run this in your Supabase SQL Editor
-- ============================================================

-- Hero CTA button
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'site_settings' AND column_name = 'hero_cta_text') THEN
        ALTER TABLE site_settings ADD COLUMN hero_cta_text text DEFAULT 'Découvrir Mes Projets';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'site_settings' AND column_name = 'hero_cta_link') THEN
        ALTER TABLE site_settings ADD COLUMN hero_cta_link text DEFAULT '/work';
    END IF;
END $$;

-- Stat labels
DO $$
BEGIN
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
END $$;

-- Featured projects section
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'site_settings' AND column_name = 'featured_section_title') THEN
        ALTER TABLE site_settings ADD COLUMN featured_section_title text DEFAULT 'Travaux Sélectionnés';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'site_settings' AND column_name = 'featured_section_subtitle') THEN
        ALTER TABLE site_settings ADD COLUMN featured_section_subtitle text DEFAULT 'Projets en Vedette';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'site_settings' AND column_name = 'featured_view_all_text') THEN
        ALTER TABLE site_settings ADD COLUMN featured_view_all_text text DEFAULT 'Voir Tous Les Projets';
    END IF;
END $$;

-- Services section
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'site_settings' AND column_name = 'services_section_title') THEN
        ALTER TABLE site_settings ADD COLUMN services_section_title text DEFAULT 'Expertise';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'site_settings' AND column_name = 'services_section_subtitle') THEN
        ALTER TABLE site_settings ADD COLUMN services_section_subtitle text DEFAULT 'Une Approche Multidisciplinaire';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'site_settings' AND column_name = 'services_section_description') THEN
        ALTER TABLE site_settings ADD COLUMN services_section_description text DEFAULT 'Allier stratégie, design cinématique et technologie performante pour créer des expériences digitales qui élèvent les marques et captivent les audiences.';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'site_settings' AND column_name = 'services_section_link_text') THEN
        ALTER TABLE site_settings ADD COLUMN services_section_link_text text DEFAULT 'En savoir plus';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'site_settings' AND column_name = 'services_section_link_url') THEN
        ALTER TABLE site_settings ADD COLUMN services_section_link_url text DEFAULT '/about';
    END IF;
END $$;

-- Individual services (4 services)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'site_settings' AND column_name = 'service_1_title') THEN
        ALTER TABLE site_settings ADD COLUMN service_1_title text DEFAULT 'Design & UI/UX';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'site_settings' AND column_name = 'service_1_description') THEN
        ALTER TABLE site_settings ADD COLUMN service_1_description text DEFAULT 'Des interfaces primées qui captivent les utilisateurs et renforcent l''identité de marque.';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'site_settings' AND column_name = 'service_2_title') THEN
        ALTER TABLE site_settings ADD COLUMN service_2_title text DEFAULT 'Photographie & Vidéo';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'site_settings' AND column_name = 'service_2_description') THEN
        ALTER TABLE site_settings ADD COLUMN service_2_description text DEFAULT 'Narration visuelle cinématique, conçue pour les plateformes premium.';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'site_settings' AND column_name = 'service_3_title') THEN
        ALTER TABLE site_settings ADD COLUMN service_3_title text DEFAULT 'Ingénierie Audio';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'site_settings' AND column_name = 'service_3_description') THEN
        ALTER TABLE site_settings ADD COLUMN service_3_description text DEFAULT 'Paysages sonores immersifs et production haute fidélité.';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'site_settings' AND column_name = 'service_4_title') THEN
        ALTER TABLE site_settings ADD COLUMN service_4_title text DEFAULT 'Ingénieur IA & Prompting';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'site_settings' AND column_name = 'service_4_description') THEN
        ALTER TABLE site_settings ADD COLUMN service_4_description text DEFAULT 'Solutions d''intelligence artificielle sur mesure et automatisation avancée.';
    END IF;
END $$;

-- Hero background image
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'site_settings' AND column_name = 'hero_image_url') THEN
        ALTER TABLE site_settings ADD COLUMN hero_image_url text;
    END IF;
END $$;

SELECT 'Home page settings migration completed!' as status;
