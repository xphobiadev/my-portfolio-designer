const { Client } = require('pg');
require('dotenv').config({ path: '.env.local' });

async function setup() {
    const client = new Client({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

    try {
        await client.connect();

        // Enable RLS but allow all operations (admin-only site)
        // This covers ALL tables: projects, site_settings, categories, contact_messages
        await client.query(`
      -- Projects
      ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
      DROP POLICY IF EXISTS "Allow all for anon" ON projects;
      CREATE POLICY "Allow all for anon" ON projects
        FOR ALL
        USING (true)
        WITH CHECK (true);

      -- Site Settings
      ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
      DROP POLICY IF EXISTS "Allow all for anon" ON site_settings;
      CREATE POLICY "Allow all for anon" ON site_settings
        FOR ALL
        USING (true)
        WITH CHECK (true);

      -- Categories
      ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
      DROP POLICY IF EXISTS "Allow all for anon" ON categories;
      CREATE POLICY "Allow all for anon" ON categories
        FOR ALL
        USING (true)
        WITH CHECK (true);

      -- Contact Messages
      ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
      DROP POLICY IF EXISTS "Allow all for anon" ON contact_messages;
      CREATE POLICY "Allow all for anon" ON contact_messages
        FOR ALL
        USING (true)
        WITH CHECK (true);
    `);

        console.log("✅ RLS policies configured for ALL tables - anon key now has full CRUD access!");
    } catch (err) {
        console.error("Error:", err);
    } finally {
        await client.end();
    }
}
setup();
