import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

export async function getProjects() {
    const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error("Error fetching projects:", error);
        return [];
    }
    return data;
}

export async function getProjectBySlug(slug: string) {
    const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('slug', slug)
        .single();

    if (error) return null;
    return data;
}

export const categories = [
    "All", "Design", "Photography", "Video", "Audio", "Branding"
];
