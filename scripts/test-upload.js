const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
    console.log("Testing Supabase Connection...");
    console.log("URL:", supabaseUrl, "KEY:", supabaseKey.slice(0, 5) + '...');

    const { data: bucket_data, error: bucket_err } = await supabase.storage.createBucket('portfolio_media', { public: true });
    console.log("BUCKET RESULT:", { bucket_data, bucket_err });

    const buffer = Buffer.from('test binary data');
    const { data, error } = await supabase.storage.from('portfolio_media').upload('test/test.txt', buffer, { contentType: 'text/plain', upsert: true });

    console.log("UPLOAD RESULT (Buffer):", { data, error });

    if (typeof File !== 'undefined') {
        const file = new File(['test binary data'], 'test2.txt', { type: 'text/plain' });
        const { data: d2, error: e2 } = await supabase.storage.from('portfolio_media').upload('test/test2.txt', file, { contentType: 'text/plain', upsert: true });
        console.log("UPLOAD RESULT (Web File):", { data: d2, error: e2 });
    } else {
        console.log("Web File API not natively available in this Node runtime.");
    }
}
test();
