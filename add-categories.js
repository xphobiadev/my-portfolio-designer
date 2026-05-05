require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

async function addCategories() {
    console.log("Connecting to Supabase at", supabaseUrl);

    const newCategories = [
        { name: 'Software Engineering', parent_id: null, slug: 'software-engineering' },
        { name: 'Web Development', parent_id: null, slug: 'web-development' },
        { name: 'AI Engineering', parent_id: null, slug: 'ai-engineering' }
    ];

    for (const cat of newCategories) {
        // Check if exists first
        const { data: existing } = await supabase
            .from('categories')
            .select('id')
            .eq('name', cat.name)
            .single();

        if (!existing) {
            const { data, error } = await supabase
                .from('categories')
                .insert([cat])
                .select();

            if (error) {
                console.error("Error inserting", cat.name, error);
            } else {
                console.log("Successfully inserted", cat.name, data);
            }
        } else {
            console.log(cat.name, "already exists. Skipping.");
        }
    }
}

addCategories();
