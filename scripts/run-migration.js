const { Client } = require('pg');
require('dotenv').config({ path: '.env.local' });

const sql = `
-- Add is_featured column to projects if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'projects' AND column_name = 'is_featured') THEN
        ALTER TABLE projects ADD COLUMN is_featured boolean DEFAULT false;
        RAISE NOTICE 'Added is_featured column to projects';
    ELSE
        RAISE NOTICE 'is_featured column already exists';
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

-- Create contact_messages table if it doesn't exist
CREATE TABLE IF NOT EXISTS contact_messages (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    name text NOT NULL,
    email text NOT NULL,
    message text NOT NULL,
    is_read boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS on contact_messages
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Create permissive policy for contact_messages if not exists
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'contact_messages' AND policyname = 'Allow all access to contact_messages') THEN
        CREATE POLICY "Allow all access to contact_messages" ON contact_messages FOR ALL USING (true) WITH CHECK (true);
        RAISE NOTICE 'Created RLS policy for contact_messages';
    ELSE
        RAISE NOTICE 'RLS policy for contact_messages already exists';
    END IF;
END $$;

SELECT 'Migration completed successfully!' as status;
`;

async function runMigration() {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
        console.error('ERROR: DATABASE_URL not found in .env.local');
        process.exit(1);
    }

    const client = new Client({
        connectionString,
        ssl: { rejectUnauthorized: false }
    });

    try {
        await client.connect();
        console.log('Connected to Supabase Postgres.');
        const result = await client.query(sql);
        // Print last result (the SELECT status)
        const last = Array.isArray(result) ? result[result.length - 1] : result;
        if (last?.rows?.[0]) {
            console.log(last.rows[0].status);
        }
        console.log('Done.');
    } catch (err) {
        console.error('Migration error:', err.message || err);
        process.exit(1);
    } finally {
        await client.end();
    }
}

runMigration();
