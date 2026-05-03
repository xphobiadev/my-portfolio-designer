const fs = require('fs');
const { Client } = require('pg');
require('dotenv').config({ path: '.env.local' });

async function setup() {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }
    });

    try {
        await client.connect();
        console.log("Connected to Supabase Postgres.");

        const schema = fs.readFileSync('./scripts/schema.sql', 'utf8');
        await client.query(schema);
        console.log("Schema applied and initial mock data inserted into Supabase DB!");

    } catch (err) {
        console.error("Error setting up DB:", err);
    } finally {
        await client.end();
    }
}

setup();
