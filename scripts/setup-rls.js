const { Client } = require('pg');
require('dotenv').config({ path: '.env.local' });

async function setup() {
    const client = new Client({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

    try {
        await client.connect();

        // Enable RLS but allow all operations (admin-only site)
        await client.query(`
      ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
      
      DROP POLICY IF EXISTS "Allow all for anon" ON projects;
      CREATE POLICY "Allow all for anon" ON projects
        FOR ALL
        USING (true)
        WITH CHECK (true);

      ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

      DROP POLICY IF EXISTS "Allow all for anon" ON site_settings;
      CREATE POLICY "Allow all for anon" ON site_settings
        FOR ALL
        USING (true)
        WITH CHECK (true);
    `);

        console.log("✅ RLS policies configured - anon key now has full CRUD access!");
    } catch (err) {
        console.error("Error:", err);
    } finally {
        await client.end();
    }
}
setup();
