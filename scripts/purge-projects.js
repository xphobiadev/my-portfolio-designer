const { Client } = require('pg');
require('dotenv').config({ path: '.env.local' });

async function purgeData() {
    const client = new Client({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

    try {
        await client.connect();

        // Purge all projects
        const { rowCount: count } = await client.query('DELETE FROM projects');
        console.log(`✅ Deleted ${count} projects from database.`);

        // Purge storage objects in portfolio_media
        const { rowCount: count2 } = await client.query(`DELETE FROM storage.objects WHERE bucket_id = 'portfolio_media'`);
        console.log(`✅ Deleted ${count2} files from storage.`);

    } catch (err) {
        console.error("Error:", err);
    } finally {
        await client.end();
    }
}
purgeData();
