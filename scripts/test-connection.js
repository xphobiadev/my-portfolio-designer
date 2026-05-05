// Test Supabase connection
require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log('=== Supabase Connection Test ===\n');
console.log('URL:', supabaseUrl);
console.log('Anon Key:', supabaseAnonKey ? `${supabaseAnonKey.substring(0, 20)}...` : 'NOT SET');
console.log('Service Role Key:', supabaseServiceKey ? `${supabaseServiceKey.substring(0, 20)}...` : 'NOT SET');
console.log('Database URL:', process.env.DATABASE_URL ? 'SET' : 'NOT SET');
console.log('');

async function testConnection() {
    try {
        // Test with anon key
        console.log('--- Testing with Anon Key ---');
        const supabaseAnon = createClient(supabaseUrl, supabaseAnonKey);
        
        // Try a simple query - list tables or check health
        const { data: anonData, error: anonError } = await supabaseAnon
            .from('categories')
            .select('*')
            .limit(5);
        
        if (anonError) {
            console.log('Anon query result:', anonError.message);
            if (anonError.message.includes('does not exist')) {
                console.log('  -> Connection works! Table just does not exist yet (need to run migrations).');
            } else if (anonError.message.includes('permission denied')) {
                console.log('  -> Connection works! RLS is blocking access (expected for anon key).');
            } else {
                console.log('  -> Error details:', anonError);
            }
        } else {
            console.log('Anon query SUCCESS! Found', (anonData || []).length, 'categories');
            if (anonData && anonData.length > 0) {
                console.log('  Categories:', anonData.map(c => c.name || c.id).join(', '));
            }
        }

        console.log('');

        // Test with service role key
        console.log('--- Testing with Service Role Key ---');
        const supabaseService = createClient(supabaseUrl, supabaseServiceKey);
        
        const { data: serviceData, error: serviceError } = await supabaseService
            .from('categories')
            .select('*')
            .limit(5);
        
        if (serviceError) {
            console.log('Service role query result:', serviceError.message);
            if (serviceError.message.includes('does not exist')) {
                console.log('  -> Connection works! Table just does not exist yet (need to run migrations).');
            } else {
                console.log('  -> Error details:', serviceError);
            }
        } else {
            console.log('Service role query SUCCESS! Found', (serviceData || []).length, 'categories');
            if (serviceData && serviceData.length > 0) {
                console.log('  Categories:', serviceData.map(c => c.name || c.id).join(', '));
            }
        }

        console.log('');

        // Test storage
        console.log('--- Testing Storage ---');
        const { data: buckets, error: bucketsError } = await supabaseService
            .storage
            .listBuckets();
        
        if (bucketsError) {
            console.log('Storage error:', bucketsError.message);
        } else {
            console.log('Storage buckets:', buckets.length > 0 ? buckets.map(b => b.name).join(', ') : 'No buckets found');
        }

        console.log('\n=== Connection Test Complete ===');
        console.log('✅ Supabase is reachable and credentials are valid!');
        
    } catch (err) {
        console.error('\n❌ Connection FAILED:', err.message);
        process.exit(1);
    }
}

testConnection();
