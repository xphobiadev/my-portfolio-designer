import { createClient } from '@supabase/supabase-js';
import { connection } from 'next/server';
import type { Project, Category, SiteSettings, ContactMessage } from './types';

function getSupabase() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
        console.error('[Supabase] Missing environment variables: NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY');
        // Return a client that will fail gracefully
        return createClient('https://placeholder.supabase.co', 'placeholder', {
            auth: { persistSession: false },
        });
    }

    return createClient(supabaseUrl, supabaseKey, {
        auth: { persistSession: false },
        global: {
            fetch: (url, options = {}) => {
                return fetch(url, { ...options, cache: 'no-store' });
            },
        },
    });
}

// ─── Projects ────────────────────────────────────────────────────────────────

export async function getProjects(): Promise<Project[]> {
    try {
        await connection();
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
        await connection();
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
    try {
        await connection();
        const supabase = getSupabase();
        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .eq('slug', slug)
            .single();

        if (error) {
            console.warn("Error fetching project by slug:", error?.message || error);
            return null;
        }
        return data;
    } catch (err) {
        console.warn("getProjectBySlug exception:", err);
        return null;
    }
}

export async function getProjectById(id: string): Promise<Project | null> {
    try {
        await connection();
        const supabase = getSupabase();
        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            console.warn("Error fetching project by id:", error?.message || error);
            return null;
        }
        return data;
    } catch (err) {
        console.warn("getProjectById exception:", err);
        return null;
    }
}

export async function getProjectsByCategory(category: string): Promise<Project[]> {
    try {
        await connection();
        const supabase = getSupabase();
        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .eq('category', category)
            .order('created_at', { ascending: false });

        if (error) {
            console.warn("Error fetching projects by category:", error?.message || error);
            return [];
        }
        return data || [];
    } catch (err) {
        console.warn("getProjectsByCategory exception:", err);
        return [];
    }
}

// ─── Categories ──────────────────────────────────────────────────────────────

export async function getCategoriesList(): Promise<Category[]> {
    try {
        await connection();
        const supabase = getSupabase();
        const { data, error } = await supabase
            .from('categories')
            .select('*')
            .order('name');

        if (error || !data) {
            console.warn("Error fetching categories:", error?.message || error);
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
    } catch (err) {
        console.warn("getCategoriesList exception:", err);
        return [];
    }
}

// ─── Settings ────────────────────────────────────────────────────────────────

export async function getSettings(): Promise<SiteSettings | null> {
    try {
        await connection();
        const supabase = getSupabase();
        const { data, error } = await supabase
            .from('site_settings')
            .select('*')
            .eq('id', 1)
            .single();

        if (error) {
            console.warn("Error fetching settings:", error?.message || error);
            return null;
        }
        return data;
    } catch (err) {
        console.warn("getSettings exception:", err);
        return null;
    }
}

// ─── Contact Messages ────────────────────────────────────────────────────────

export async function getContactMessages(): Promise<ContactMessage[]> {
    try {
        await connection();
        const supabase = getSupabase();
        const { data, error } = await supabase
            .from('contact_messages')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.warn("Error fetching contact messages:", error?.message || error);
            return [];
        }
        return data || [];
    } catch (err) {
        console.warn("getContactMessages exception:", err);
        return [];
    }
}

export async function getUnreadMessagesCount(): Promise<number> {
    try {
        await connection();
        const supabase = getSupabase();
        const { count, error } = await supabase
            .from('contact_messages')
            .select('*', { count: 'exact', head: true })
            .eq('is_read', false);

        if (error) return 0;
        return count || 0;
    } catch (err) {
        console.warn("getUnreadMessagesCount exception:", err);
        return 0;
    }
}
