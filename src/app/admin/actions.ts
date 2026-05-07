"use server"

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { revalidatePath } from 'next/cache';

// Standard response type for all admin actions
export type ActionResult = { success: boolean; error?: string };

// Lazy initialization to ensure env vars are available at runtime on Vercel
let _supabase: SupabaseClient | null = null;

function getSupabaseAdmin(): SupabaseClient {
    if (!_supabase) {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

        if (!supabaseUrl || !supabaseKey) {
            console.error('[Supabase Admin] Missing environment variables:', {
                hasUrl: !!supabaseUrl,
                hasServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
                hasAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
            });
            throw new Error('Supabase environment variables are not configured. Please check NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in your Vercel project settings.');
        }

        _supabase = createClient(supabaseUrl, supabaseKey, {
            auth: { persistSession: false },
        });
    }
    return _supabase;
}

// Helper to revalidate all pages (including all locale-prefixed routes)
function revalidateAll() {
    revalidatePath('/', 'layout');
}

// ─── Helper: Upload file to Supabase Storage ─────────────────────────────────

async function uploadFile(file: File, path: string): Promise<string | null> {
    if (!file || file.size === 0) return null;

    const supabase = getSupabaseAdmin();
    await supabase.storage.createBucket('portfolio_media', { public: true }).catch(() => { });

    const buffer = Buffer.from(await file.arrayBuffer());
    const { data, error } = await supabase.storage.from('portfolio_media').upload(
        path,
        buffer,
        { contentType: file.type, upsert: true }
    );

    if (error) {
        console.error("Upload Error:", error);
        return null;
    }

    return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/portfolio_media/${data.path}`;
}

// ─── Projects ────────────────────────────────────────────────────────────────

export async function createProject(_prevState: ActionResult | null, formData: FormData): Promise<ActionResult> {
    try {
        const title = formData.get('title') as string;
        const subtitle = formData.get('subtitle') as string || '';
        const category = formData.get('category') as string;
        const description = formData.get('description') as string || '';
        const problem = formData.get('problem') as string || '';
        const solution = formData.get('solution') as string || '';
        const result = formData.get('result') as string || '';
        const tagsRaw = formData.get('tags') as string || '';
        const toolsRaw = formData.get('tools') as string || '';
        const is_featured = formData.get('is_featured') === 'on';
        const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

        const tags = tagsRaw.split(',').map(t => t.trim()).filter(Boolean);
        const tools = toolsRaw.split(',').map(t => t.trim()).filter(Boolean);

        const coverFile = formData.get('cover_image') as File;
        const videoFile = formData.get('video_file') as File;
        const audioFile = formData.get('audio_file') as File;

        const cover_image = await uploadFile(coverFile, `projects/${slug}/cover_${Date.now()}_${coverFile?.name?.replace(/\s+/g, '_') || 'img'}`);
        const video_url = await uploadFile(videoFile, `projects/${slug}/video_${Date.now()}_${videoFile?.name?.replace(/\s+/g, '_') || 'vid'}`);
        const audio_url = await uploadFile(audioFile, `projects/${slug}/audio_${Date.now()}_${audioFile?.name?.replace(/\s+/g, '_') || 'aud'}`);

        const supabase = getSupabaseAdmin();
        const { error } = await supabase.from('projects').insert([{
            title,
            subtitle,
            category,
            slug,
            description,
            problem: problem || null,
            solution: solution || null,
            result: result || null,
            cover_image,
            video_url,
            audio_url,
            tags,
            tools,
            gallery: [],
            is_featured
        }]);

        if (error) {
            console.error("Create project error:", error);
            return { success: false, error: `Failed to create project: ${error.message}` };
        }

        revalidateAll();
        return { success: true };
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Unknown error occurred';
        console.error("Create project exception:", err);
        return { success: false, error: message };
    }
}

export async function updateProject(_prevState: ActionResult | null, formData: FormData): Promise<ActionResult> {
    try {
        const id = formData.get('id') as string;
        if (!id) return { success: false, error: 'Missing project ID' };

        const title = formData.get('title') as string;
        const subtitle = formData.get('subtitle') as string || '';
        const category = formData.get('category') as string;
        const description = formData.get('description') as string || '';
        const problem = formData.get('problem') as string || '';
        const solution = formData.get('solution') as string || '';
        const result = formData.get('result') as string || '';
        const tagsRaw = formData.get('tags') as string || '';
        const toolsRaw = formData.get('tools') as string || '';
        const is_featured = formData.get('is_featured') === 'on';

        const tags = tagsRaw.split(',').map(t => t.trim()).filter(Boolean);
        const tools = toolsRaw.split(',').map(t => t.trim()).filter(Boolean);

        const coverFile = formData.get('cover_image') as File;
        const videoFile = formData.get('video_file') as File;
        const audioFile = formData.get('audio_file') as File;

        const cover_image = await uploadFile(coverFile, `projects/${id}/cover_${Date.now()}_${coverFile?.name?.replace(/\s+/g, '_') || 'img'}`);
        const video_url = await uploadFile(videoFile, `projects/${id}/video_${Date.now()}_${videoFile?.name?.replace(/\s+/g, '_') || 'vid'}`);
        const audio_url = await uploadFile(audioFile, `projects/${id}/audio_${Date.now()}_${audioFile?.name?.replace(/\s+/g, '_') || 'aud'}`);

        const updates: Record<string, unknown> = {
            title,
            subtitle,
            category,
            description,
            problem: problem || null,
            solution: solution || null,
            result: result || null,
            tags,
            tools,
            is_featured
        };

        if (cover_image) updates.cover_image = cover_image;
        if (video_url) updates.video_url = video_url;
        if (audio_url) updates.audio_url = audio_url;

        const supabase = getSupabaseAdmin();
        const { error } = await supabase.from('projects').update(updates).eq('id', id);
        if (error) {
            console.error("Update project error:", error);
            return { success: false, error: `Failed to update project: ${error.message}` };
        }

        revalidateAll();
        return { success: true };
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Unknown error occurred';
        console.error("Update project exception:", err);
        return { success: false, error: message };
    }
}

export async function deleteProject(_prevState: ActionResult | null, formData: FormData): Promise<ActionResult> {
    try {
        const id = formData.get('id') as string;
        if (!id) return { success: false, error: 'Missing project ID' };

        const supabase = getSupabaseAdmin();
        const { error } = await supabase.from('projects').delete().eq('id', id);

        if (error) {
            console.error("Delete project error:", error);
            return { success: false, error: `Failed to delete project: ${error.message}` };
        }

        revalidateAll();
        return { success: true };
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Unknown error occurred';
        console.error("Delete project exception:", err);
        return { success: false, error: message };
    }
}

export async function toggleFeatured(_prevState: ActionResult | null, formData: FormData): Promise<ActionResult> {
    try {
        const id = formData.get('id') as string;
        const featured = formData.get('is_featured') === 'true';

        const supabase = getSupabaseAdmin();
        const { error } = await supabase.from('projects').update({ is_featured: !featured }).eq('id', id);

        if (error) {
            console.error("Toggle featured error:", error);
            return { success: false, error: `Failed to toggle featured: ${error.message}` };
        }

        revalidateAll();
        return { success: true };
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Unknown error occurred';
        console.error("Toggle featured exception:", err);
        return { success: false, error: message };
    }
}

// ─── Categories ──────────────────────────────────────────────────────────────

export async function createCategory(_prevState: ActionResult | null, formData: FormData): Promise<ActionResult> {
    try {
        const name = formData.get('name') as string;
        const parent_id = formData.get('parent_id') as string || null;
        if (!name) return { success: false, error: 'Category name is required' };

        const slug = name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

        const supabase = getSupabaseAdmin();
        const { error } = await supabase.from('categories').insert([{
            name,
            slug,
            parent_id: parent_id || null
        }]);

        if (error) {
            console.error("Create category error:", error);
            return { success: false, error: `Failed to create category: ${error.message}` };
        }

        revalidateAll();
        return { success: true };
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Unknown error occurred';
        console.error("Create category exception:", err);
        return { success: false, error: message };
    }
}

export async function deleteCategory(_prevState: ActionResult | null, formData: FormData): Promise<ActionResult> {
    try {
        const id = formData.get('id') as string;
        if (!id) return { success: false, error: 'Missing category ID' };

        const supabase = getSupabaseAdmin();
        const { error } = await supabase.from('categories').delete().eq('id', id);

        if (error) {
            console.error("Delete category error:", error);
            return { success: false, error: `Failed to delete category: ${error.message}` };
        }

        revalidateAll();
        return { success: true };
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Unknown error occurred';
        console.error("Delete category exception:", err);
        return { success: false, error: message };
    }
}

// ─── Settings ────────────────────────────────────────────────────────────────

export async function updateSettings(_prevState: ActionResult | null, formData: FormData): Promise<ActionResult> {
    try {
        const type = formData.get('type') as string;
        if (!type) return { success: false, error: 'Missing settings type' };

        const supabase = getSupabaseAdmin();
        let dbError = null;

        if (type === 'about') {
            const about_bio = formData.get('about_bio') as string;
            const file = formData.get('about_image') as File;

            const updates: Record<string, string> = { about_bio };

            if (file && file.size > 0) {
                const about_image = await uploadFile(file, `settings/about_${Date.now()}_${file.name.replace(/\s+/g, '_')}`);
                if (about_image) updates.about_image = about_image;
            }

            const { error } = await supabase.from('site_settings').update(updates).eq('id', 1);
            dbError = error;
        } else if (type === 'contact') {
            const contact_email = formData.get('contact_email') as string;
            const contact_phone = formData.get('contact_phone') as string;
            const contact_instagram = formData.get('contact_instagram') as string;
            const contact_behance = formData.get('contact_behance') as string;
            const contact_linkedin = formData.get('contact_linkedin') as string;
            const contact_whatsapp = formData.get('contact_whatsapp') as string;
            const contact_location = formData.get('contact_location') as string;

            const { error } = await supabase.from('site_settings').update({
                contact_email,
                contact_phone,
                contact_instagram,
                contact_behance,
                contact_linkedin,
                contact_whatsapp,
                contact_location
            }).eq('id', 1);
            dbError = error;
        } else if (type === 'hero') {
            const hero_title = formData.get('hero_title') as string;
            const hero_subtitle = formData.get('hero_subtitle') as string;
            const site_title = formData.get('site_title') as string;
            const site_description = formData.get('site_description') as string;

            const updates: Record<string, string> = {};
            if (hero_title) updates.hero_title = hero_title;
            if (hero_subtitle) updates.hero_subtitle = hero_subtitle;
            if (site_title) updates.site_title = site_title;
            if (site_description) updates.site_description = site_description;

            const { error } = await supabase.from('site_settings').update(updates).eq('id', 1);
            dbError = error;
        } else if (type === 'hero_cta') {
            const hero_cta_text = formData.get('hero_cta_text') as string;
            const hero_cta_link = formData.get('hero_cta_link') as string;

            const updates: Record<string, string> = {};
            if (hero_cta_text) updates.hero_cta_text = hero_cta_text;
            if (hero_cta_link) updates.hero_cta_link = hero_cta_link;

            const { error } = await supabase.from('site_settings').update(updates).eq('id', 1);
            dbError = error;
        } else if (type === 'stats') {
            const stat_years = formData.get('stat_years') as string;
            const stat_projects = formData.get('stat_projects') as string;
            const stat_awards = formData.get('stat_awards') as string;
            const stat_clients = formData.get('stat_clients') as string;
            const stat_years_label = formData.get('stat_years_label') as string;
            const stat_projects_label = formData.get('stat_projects_label') as string;
            const stat_awards_label = formData.get('stat_awards_label') as string;
            const stat_clients_label = formData.get('stat_clients_label') as string;

            const { error } = await supabase.from('site_settings').update({
                stat_years,
                stat_projects,
                stat_awards,
                stat_clients,
                stat_years_label,
                stat_projects_label,
                stat_awards_label,
                stat_clients_label
            }).eq('id', 1);
            dbError = error;
        } else if (type === 'featured') {
            const featured_section_title = formData.get('featured_section_title') as string;
            const featured_section_subtitle = formData.get('featured_section_subtitle') as string;
            const featured_view_all_text = formData.get('featured_view_all_text') as string;

            const updates: Record<string, string> = {};
            if (featured_section_title) updates.featured_section_title = featured_section_title;
            if (featured_section_subtitle) updates.featured_section_subtitle = featured_section_subtitle;
            if (featured_view_all_text) updates.featured_view_all_text = featured_view_all_text;

            const { error } = await supabase.from('site_settings').update(updates).eq('id', 1);
            dbError = error;
        } else if (type === 'services') {
            const services_section_title = formData.get('services_section_title') as string;
            const services_section_subtitle = formData.get('services_section_subtitle') as string;
            const services_section_description = formData.get('services_section_description') as string;
            const services_section_link_text = formData.get('services_section_link_text') as string;
            const services_section_link_url = formData.get('services_section_link_url') as string;
            const service_1_title = formData.get('service_1_title') as string;
            const service_1_description = formData.get('service_1_description') as string;
            const service_2_title = formData.get('service_2_title') as string;
            const service_2_description = formData.get('service_2_description') as string;
            const service_3_title = formData.get('service_3_title') as string;
            const service_3_description = formData.get('service_3_description') as string;
            const service_4_title = formData.get('service_4_title') as string;
            const service_4_description = formData.get('service_4_description') as string;

            const { error } = await supabase.from('site_settings').update({
                services_section_title,
                services_section_subtitle,
                services_section_description,
                services_section_link_text,
                services_section_link_url,
                service_1_title,
                service_1_description,
                service_2_title,
                service_2_description,
                service_3_title,
                service_3_description,
                service_4_title,
                service_4_description
            }).eq('id', 1);
            dbError = error;
        } else if (type === 'footer') {
            const footer_text = formData.get('footer_text') as string;
            const { error } = await supabase.from('site_settings').update({ footer_text }).eq('id', 1);
            dbError = error;
        } else if (type === 'branding') {
            const logo_text = formData.get('logo_text') as string;
            const marquee_words = formData.get('marquee_words') as string;

            const { error } = await supabase.from('site_settings').update({
                logo_text,
                marquee_words
            }).eq('id', 1);
            dbError = error;
        }

        if (dbError) {
            console.error(`Update settings (${type}) error:`, dbError);
            return { success: false, error: `Failed to update ${type} settings: ${dbError.message}` };
        }

        revalidateAll();
        return { success: true };
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Unknown error occurred';
        console.error("Update settings exception:", err);
        return { success: false, error: message };
    }
}

export async function updateHomeSettings(_prevState: ActionResult | null, formData: FormData): Promise<ActionResult> {
    try {
        const file = formData.get('hero_video') as File;
        if (!file || file.size === 0) return { success: false, error: 'No video file provided' };

        const supabase = getSupabaseAdmin();
        await supabase.storage.createBucket('portfolio_media', { public: true }).catch(() => { });

        const buffer = Buffer.from(await file.arrayBuffer());
        const { data, error } = await supabase.storage.from('portfolio_media').upload('settings/hero_video.mp4', buffer, {
            contentType: file.type,
            upsert: true
        });

        if (error) {
            console.error("Upload Error (updateHomeSettings):", error);
            return { success: false, error: `Failed to upload hero video: ${error.message}` };
        }

        // Save the public URL to site_settings so the frontend can use it
        const videoUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/portfolio_media/${data.path}`;
        const { error: dbError } = await supabase
            .from('site_settings')
            .update({ hero_video_url: videoUrl })
            .eq('id', 1);

        if (dbError) {
            console.error("DB Error saving hero_video_url:", dbError);
            return { success: false, error: `Failed to save video URL: ${dbError.message}` };
        }

        revalidateAll();
        return { success: true };
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Unknown error occurred';
        console.error("updateHomeSettings exception:", err);
        return { success: false, error: message };
    }
}

export async function updateHeroImage(_prevState: ActionResult | null, formData: FormData): Promise<ActionResult> {
    try {
        const file = formData.get('hero_image') as File;
        if (!file || file.size === 0) return { success: false, error: 'No image file provided' };

        const supabase = getSupabaseAdmin();
        await supabase.storage.createBucket('portfolio_media', { public: true }).catch(() => { });

        const buffer = Buffer.from(await file.arrayBuffer());
        const ext = file.name.split('.').pop() || 'jpg';
        const path = `settings/hero_image.${ext}`;

        const { data, error } = await supabase.storage.from('portfolio_media').upload(path, buffer, {
            contentType: file.type,
            upsert: true
        });

        if (error) {
            console.error("Upload Error (updateHeroImage):", error);
            return { success: false, error: `Failed to upload hero image: ${error.message}` };
        }

        const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/portfolio_media/${data.path}`;
        const { error: dbError } = await supabase.from('site_settings').update({ hero_image_url: imageUrl }).eq('id', 1);

        if (dbError) {
            console.error("DB Error saving hero_image_url:", dbError);
            return { success: false, error: `Failed to save image URL: ${dbError.message}` };
        }

        revalidateAll();
        return { success: true };
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Unknown error occurred';
        console.error("updateHeroImage exception:", err);
        return { success: false, error: message };
    }
}

// ─── Save media URL after direct browser→Supabase upload ────────────────────
// These actions only write the already-uploaded public URL to the DB.
// The actual file upload happens in the browser (see HeroMediaUpload component)
// so it never passes through the Vercel serverless function body limit (4.5 MB).

export async function saveHeroVideoUrl(_prevState: ActionResult | null, formData: FormData): Promise<ActionResult> {
    try {
        const url = formData.get('url') as string;
        if (!url) return { success: false, error: 'No URL provided' };

        const supabase = getSupabaseAdmin();
        const { error } = await supabase
            .from('site_settings')
            .update({ hero_video_url: url })
            .eq('id', 1);

        if (error) {
            console.error('saveHeroVideoUrl DB error:', error);
            return { success: false, error: `Failed to save video URL: ${error.message}` };
        }

        revalidateAll();
        return { success: true };
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Unknown error occurred';
        console.error("saveHeroVideoUrl exception:", err);
        return { success: false, error: message };
    }
}

export async function saveHeroImageUrl(_prevState: ActionResult | null, formData: FormData): Promise<ActionResult> {
    try {
        const url = formData.get('url') as string;
        if (!url) return { success: false, error: 'No URL provided' };

        const supabase = getSupabaseAdmin();
        const { error } = await supabase
            .from('site_settings')
            .update({ hero_image_url: url })
            .eq('id', 1);

        if (error) {
            console.error('saveHeroImageUrl DB error:', error);
            return { success: false, error: `Failed to save image URL: ${error.message}` };
        }

        revalidateAll();
        return { success: true };
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Unknown error occurred';
        console.error("saveHeroImageUrl exception:", err);
        return { success: false, error: message };
    }
}

export async function saveProjectCoverUrl(_prevState: ActionResult | null, formData: FormData): Promise<ActionResult> {
    try {
        const id = formData.get('id') as string;
        const url = formData.get('url') as string;
        if (!id || !url) return { success: false, error: 'Missing project ID or URL' };

        const supabase = getSupabaseAdmin();
        const { error } = await supabase
            .from('projects')
            .update({ cover_image: url })
            .eq('id', id);

        if (error) {
            console.error('saveProjectCoverUrl DB error:', error);
            return { success: false, error: `Failed to save cover URL: ${error.message}` };
        }

        revalidateAll();
        return { success: true };
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Unknown error occurred';
        console.error("saveProjectCoverUrl exception:", err);
        return { success: false, error: message };
    }
}

// ─── Project Cover Image ─────────────────────────────────────────────────────

export async function updateProjectCover(_prevState: ActionResult | null, formData: FormData): Promise<ActionResult> {
    try {
        const id = formData.get('id') as string;
        if (!id) return { success: false, error: 'Missing project ID' };

        const file = formData.get('cover_image') as File;
        if (!file || file.size === 0) return { success: false, error: 'No cover image provided' };

        const cover_image = await uploadFile(file, `projects/${id}/cover_${Date.now()}_${file.name.replace(/\s+/g, '_')}`);
        if (!cover_image) return { success: false, error: 'Failed to upload cover image' };

        const supabase = getSupabaseAdmin();
        const { error } = await supabase.from('projects').update({ cover_image }).eq('id', id);
        if (error) {
            console.error("Update project cover error:", error);
            return { success: false, error: `Failed to update cover: ${error.message}` };
        }

        revalidateAll();
        return { success: true };
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Unknown error occurred';
        console.error("updateProjectCover exception:", err);
        return { success: false, error: message };
    }
}

// ─── Contact Messages ────────────────────────────────────────────────────────

export async function submitContactMessage(_prevState: ActionResult | null, formData: FormData): Promise<ActionResult> {
    try {
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const message = formData.get('message') as string;

        if (!name || !email || !message) return { success: false, error: 'All fields are required' };

        const supabase = getSupabaseAdmin();
        const { error } = await supabase.from('contact_messages').insert([{
            name,
            email,
            message
        }]);

        if (error) {
            console.error("Submit contact message error:", error);
            return { success: false, error: `Failed to send message: ${error.message}` };
        }

        revalidateAll();
        return { success: true };
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Unknown error occurred';
        console.error("submitContactMessage exception:", err);
        return { success: false, error: message };
    }
}

export async function markMessageRead(_prevState: ActionResult | null, formData: FormData): Promise<ActionResult> {
    try {
        const id = formData.get('id') as string;
        if (!id) return { success: false, error: 'Missing message ID' };

        const supabase = getSupabaseAdmin();
        const { error } = await supabase.from('contact_messages').update({ is_read: true }).eq('id', id);

        if (error) {
            console.error("Mark message read error:", error);
            return { success: false, error: `Failed to mark as read: ${error.message}` };
        }

        revalidateAll();
        return { success: true };
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Unknown error occurred';
        console.error("markMessageRead exception:", err);
        return { success: false, error: message };
    }
}

export async function deleteMessage(_prevState: ActionResult | null, formData: FormData): Promise<ActionResult> {
    try {
        const id = formData.get('id') as string;
        if (!id) return { success: false, error: 'Missing message ID' };

        const supabase = getSupabaseAdmin();
        const { error } = await supabase.from('contact_messages').delete().eq('id', id);

        if (error) {
            console.error("Delete message error:", error);
            return { success: false, error: `Failed to delete message: ${error.message}` };
        }

        revalidateAll();
        return { success: true };
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Unknown error occurred';
        console.error("deleteMessage exception:", err);
        return { success: false, error: message };
    }
}
