const { Client } = require('pg');
require('dotenv').config({ path: '.env.local' });

async function setup() {
    const client = new Client({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

    try {
        await client.connect();

        // Storage bucket policies - allow anon to upload/read/delete objects
        await client.query(`
      -- Allow anyone to SELECT (read/download) objects from storage
      DROP POLICY IF EXISTS "Allow public read" ON storage.objects;
      CREATE POLICY "Allow public read" ON storage.objects
        FOR SELECT
        USING (bucket_id = 'portfolio_media');

      -- Allow anyone to INSERT (upload) objects to storage
      DROP POLICY IF EXISTS "Allow public upload" ON storage.objects;
      CREATE POLICY "Allow public upload" ON storage.objects
        FOR INSERT
        WITH CHECK (bucket_id = 'portfolio_media');

      -- Allow anyone to UPDATE (upsert) objects in storage
      DROP POLICY IF EXISTS "Allow public update" ON storage.objects;
      CREATE POLICY "Allow public update" ON storage.objects
        FOR UPDATE
        USING (bucket_id = 'portfolio_media');

      -- Allow anyone to DELETE objects from storage
      DROP POLICY IF EXISTS "Allow public delete" ON storage.objects;
      CREATE POLICY "Allow public delete" ON storage.objects
        FOR DELETE
        USING (bucket_id = 'portfolio_media');
    `);

        console.log("✅ Storage RLS policies configured - uploads are now allowed!");
    } catch (err) {
        console.error("Error:", err);
    } finally {
        await client.end();
    }
}
setup();
