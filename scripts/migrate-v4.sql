-- Migration v4: Add contact_whatsapp, contact_location, logo_text, marquee_words to site_settings

ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS contact_whatsapp TEXT DEFAULT '+212600891594';
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS contact_location TEXT DEFAULT 'Morocco';
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS logo_text TEXT DEFAULT 'MB';
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS marquee_words TEXT DEFAULT 'DESIGN,PHOTOGRAPHY,VIDEO,AUDIO,FULL-STACK,CYBERSECURITY,MOTION,EVENTS';

-- Set defaults for existing row if columns were NULL
UPDATE site_settings
SET
    contact_whatsapp = '+212600891594',
    contact_location = 'Morocco',
    logo_text = 'MB',
    marquee_words = 'DESIGN,PHOTOGRAPHY,VIDEO,AUDIO,FULL-STACK,CYBERSECURITY,MOTION,EVENTS',
    updated_at = NOW()
WHERE id = 1 AND contact_whatsapp IS NULL;
