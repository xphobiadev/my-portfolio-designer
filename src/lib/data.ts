import { createClient } from '@supabase/supabase-js';
import type { Project, Category, SiteSettings, ContactMessage } from './types';

function getSupabase() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
    return createClient(supabaseUrl, supabaseKey, {
        auth: { persistSession: false },
    });
}

// ─── Projects ────────────────────────────────────────────────────────────────

export async function getProjects(): Promise<Project[]> {
    try {
        const supabase = getSupabase();
        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.warn("Error fetching projects:", error?.message || error);
            return [];
        }
        return data || [];
    } catch (err) {
        console.warn("getProjects exception:", err);
        return [];
    }
}

export async function getFeaturedProjects(): Promise<Project[]> {
    try {
        const supabase = getSupabase();
        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .eq('is_featured', true)
            .order('created_at', { ascending: false })
            .limit(6);

        if (error) {
            console.warn("Featured projects query issue, falling back to latest:", error?.message || error);
            const allProjects = await getProjects();
            return allProjects.slice(0, 6);
        }
        // If no featured projects, return latest 6
        if (!data || data.length === 0) {
            const allProjects = await getProjects();
            return allProjects.slice(0, 6);
        }
        return data;
    } catch (err) {
        console.warn("getFeaturedProjects exception, returning empty:", err);
        return [];
    }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
    const supabase = getSupabase();
    const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('slug', slug)
        .single();

    if (error) return null;
    return data;
}

export async function getProjectById(id: string): Promise<Project | null> {
    const supabase = getSupabase();
    const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single();

    if (error) return null;
    return data;
}

export async function getProjectsByCategory(category: string): Promise<Project[]> {
    const supabase = getSupabase();
    const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('category', category)
        .order('created_at', { ascending: false });

    if (error) {
        console.error("Error fetching projects by category:", error);
        return [];
    }
    return data || [];
}

// ─── Categories ──────────────────────────────────────────────────────────────

export async function getCategoriesList(): Promise<Category[]> {
    const supabase = getSupabase();
    const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');

    if (error || !data) {
        console.error("Error fetching categories:", error);
        return [];
    }

    // Build hierarchy: root categories (no parent_id) and group children by parent_id
    const rootCategories = data.filter((cat: Category) => !cat.parent_id);
    const childrenMap = new Map<string, Category[]>();

    data.forEach((cat: Category) => {
        if (cat.parent_id) {
            const children = childrenMap.get(cat.parent_id) || [];
            children.push(cat);
            childrenMap.set(cat.parent_id, children);
        }
    });

    // Create sorted flat list: Parent followed by all its children
    const sortedCategories: Category[] = [];
    rootCategories.forEach((parent: Category) => {
        sortedCategories.push(parent);
        const children = childrenMap.get(parent.id) || [];
        sortedCategories.push(...children);
    });

    // If any categories are orphaned, append them at the end
    const sortedIds = new Set(sortedCategories.map(c => c.id));
    const orphaned = data.filter((c: Category) => !sortedIds.has(c.id));

    return [...sortedCategories, ...orphaned];
}

// ─── Settings ────────────────────────────────────────────────────────────────

export async function getSettings(): Promise<SiteSettings | null> {
    const supabase = getSupabase();
    const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .eq('id', 1)
        .single();

    if (error) {
        console.error("Error fetching settings:", error);
        return null;
    }
    return data;
}

// ─── Contact Messages ────────────────────────────────────────────────────────

export async function getContactMessages(): Promise<ContactMessage[]> {
    const supabase = getSupabase();
    const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error("Error fetching contact messages:", error);
        return [];
    }
    return data || [];
}

export async function getUnreadMessagesCount(): Promise<number> {
    const supabase = getSupabase();
    const { count, error } = await supabase
        .from('contact_messages')
        .select('*', { count: 'exact', head: true })
        .eq('is_read', false);

    if (error) return 0;
    return count || 0;
}
