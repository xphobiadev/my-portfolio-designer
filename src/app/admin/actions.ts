"use server"

import { createClient } from '@supabase/supabase-js';
import { revalidatePath } from 'next/cache';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

// ─── Helper: Upload file to Supabase Storage ─────────────────────────────────

async function uploadFile(file: File, path: string): Promise<string | null> {
    if (!file || file.size === 0) return null;

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

    return `${supabaseUrl}/storage/v1/object/public/portfolio_media/${data.path}`;
}

// ─── Projects ────────────────────────────────────────────────────────────────

export async function createProject(formData: FormData) {
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

    if (error) console.error("Create project error:", error);

    revalidatePath('/admin');
    revalidatePath('/admin/projects');
    revalidatePath('/work');
    revalidatePath('/');
}

export async function updateProject(formData: FormData) {
    const id = formData.get('id') as string;
    if (!id) return;

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

    const { error } = await supabase.from('projects').update(updates).eq('id', id);
    if (error) console.error("Update project error:", error);

    revalidatePath('/admin');
    revalidatePath('/admin/projects');
    revalidatePath(`/admin/projects/${id}`);
    revalidatePath('/work');
    revalidatePath('/');
}

export async function deleteProject(formData: FormData) {
    const id = formData.get('id') as string;
    if (!id) return;

    await supabase.from('projects').delete().eq('id', id);

    revalidatePath('/admin');
    revalidatePath('/admin/projects');
    revalidatePath('/work');
    revalidatePath('/');
}

export async function toggleFeatured(formData: FormData) {
    const id = formData.get('id') as string;
    const featured = formData.get('is_featured') === 'true';

    await supabase.from('projects').update({ is_featured: !featured }).eq('id', id);

    revalidatePath('/admin');
    revalidatePath('/admin/projects');
    revalidatePath('/');
}

// ─── Categories ──────────────────────────────────────────────────────────────

export async function createCategory(formData: FormData) {
    const name = formData.get('name') as string;
    const parent_id = formData.get('parent_id') as string || null;
    if (!name) return;

    const slug = name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

    const { error } = await supabase.from('categories').insert([{
        name,
        slug,
        parent_id: parent_id || null
    }]);

    if (error) console.error("Create category error:", error);

    revalidatePath('/admin');
    revalidatePath('/admin/categories');
    revalidatePath('/work');
}

export async function deleteCategory(formData: FormData) {
    const id = formData.get('id') as string;
    if (!id) return;

    await supabase.from('categories').delete().eq('id', id);

    revalidatePath('/admin');
    revalidatePath('/admin/categories');
    revalidatePath('/work');
}

// ─── Settings ────────────────────────────────────────────────────────────────

export async function updateSettings(formData: FormData) {
    const type = formData.get('type') as string;
    if (!type) return;

    if (type === 'about') {
        const about_bio = formData.get('about_bio') as string;
        const file = formData.get('about_image') as File;

        const updates: Record<string, string> = { about_bio };

        if (file && file.size > 0) {
            const about_image = await uploadFile(file, `settings/about_${Date.now()}_${file.name.replace(/\s+/g, '_')}`);
            if (about_image) updates.about_image = about_image;
        }

        await supabase.from('site_settings').update(updates).eq('id', 1);
    } else if (type === 'contact') {
        const contact_email = formData.get('contact_email') as string;
        const contact_phone = formData.get('contact_phone') as string;
        const contact_instagram = formData.get('contact_instagram') as string;
        const contact_behance = formData.get('contact_behance') as string;
        const contact_linkedin = formData.get('contact_linkedin') as string;

        await supabase.from('site_settings').update({
            contact_email,
            contact_phone,
            contact_instagram,
            contact_behance,
            contact_linkedin
        }).eq('id', 1);
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

        await supabase.from('site_settings').update(updates).eq('id', 1);
    } else if (type === 'hero_cta') {
        const hero_cta_text = formData.get('hero_cta_text') as string;
        const hero_cta_link = formData.get('hero_cta_link') as string;

        const updates: Record<string, string> = {};
        if (hero_cta_text) updates.hero_cta_text = hero_cta_text;
        if (hero_cta_link) updates.hero_cta_link = hero_cta_link;

        await supabase.from('site_settings').update(updates).eq('id', 1);
    } else if (type === 'stats') {
        const stat_years = formData.get('stat_years') as string;
        const stat_projects = formData.get('stat_projects') as string;
        const stat_awards = formData.get('stat_awards') as string;
        const stat_clients = formData.get('stat_clients') as string;
        const stat_years_label = formData.get('stat_years_label') as string;
        const stat_projects_label = formData.get('stat_projects_label') as string;
        const stat_awards_label = formData.get('stat_awards_label') as string;
        const stat_clients_label = formData.get('stat_clients_label') as string;

        await supabase.from('site_settings').update({
            stat_years,
            stat_projects,
            stat_awards,
            stat_clients,
            stat_years_label,
            stat_projects_label,
            stat_awards_label,
            stat_clients_label
        }).eq('id', 1);
    } else if (type === 'featured') {
        const featured_section_title = formData.get('featured_section_title') as string;
        const featured_section_subtitle = formData.get('featured_section_subtitle') as string;
        const featured_view_all_text = formData.get('featured_view_all_text') as string;

        const updates: Record<string, string> = {};
        if (featured_section_title) updates.featured_section_title = featured_section_title;
        if (featured_section_subtitle) updates.featured_section_subtitle = featured_section_subtitle;
        if (featured_view_all_text) updates.featured_view_all_text = featured_view_all_text;

        await supabase.from('site_settings').update(updates).eq('id', 1);
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

        await supabase.from('site_settings').update({
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
    } else if (type === 'footer') {
        const footer_text = formData.get('footer_text') as string;
        await supabase.from('site_settings').update({ footer_text }).eq('id', 1);
    }

    revalidatePath('/admin');
    revalidatePath('/admin/home');
    revalidatePath('/admin/about');
    revalidatePath('/admin/contact');
    revalidatePath('/');
    revalidatePath('/about');
    revalidatePath('/contact');
}

export async function updateHomeSettings(formData: FormData) {
    const file = formData.get('hero_video') as File;
    if (!file || file.size === 0) return;

    await supabase.storage.createBucket('portfolio_media', { public: true }).catch(() => { });

    const buffer = Buffer.from(await file.arrayBuffer());
    const { error } = await supabase.storage.from('portfolio_media').upload('settings/hero_video.mp4', buffer, {
        contentType: file.type,
        upsert: true
    });

    if (error) console.error("Upload Error (updateHomeSettings):", error);

    revalidatePath('/admin/home');
    revalidatePath('/');
}

export async function updateHeroImage(formData: FormData) {
    const file = formData.get('hero_image') as File;
    if (!file || file.size === 0) return;

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
        return;
    }

    const imageUrl = `${supabaseUrl}/storage/v1/object/public/portfolio_media/${data.path}`;
    await supabase.from('site_settings').update({ hero_image_url: imageUrl }).eq('id', 1);

    revalidatePath('/admin/home');
    revalidatePath('/');
}

// ─── Project Cover Image ─────────────────────────────────────────────────────

export async function updateProjectCover(formData: FormData) {
    const id = formData.get('id') as string;
    if (!id) return;

    const file = formData.get('cover_image') as File;
    if (!file || file.size === 0) return;

    const cover_image = await uploadFile(file, `projects/${id}/cover_${Date.now()}_${file.name.replace(/\s+/g, '_')}`);
    if (!cover_image) return;

    const { error } = await supabase.from('projects').update({ cover_image }).eq('id', id);
    if (error) console.error("Update project cover error:", error);

    revalidatePath('/admin/home');
    revalidatePath('/admin/projects');
    revalidatePath(`/admin/projects/${id}`);
    revalidatePath('/work');
    revalidatePath('/');
}

// ─── Contact Messages ────────────────────────────────────────────────────────

export async function submitContactMessage(formData: FormData) {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;

    if (!name || !email || !message) return;

    const { error } = await supabase.from('contact_messages').insert([{
        name,
        email,
        message
    }]);

    if (error) console.error("Submit contact message error:", error);

    revalidatePath('/admin/messages');
}

export async function markMessageRead(formData: FormData) {
    const id = formData.get('id') as string;
    if (!id) return;

    await supabase.from('contact_messages').update({ is_read: true }).eq('id', id);
    revalidatePath('/admin/messages');
}

export async function deleteMessage(formData: FormData) {
    const id = formData.get('id') as string;
    if (!id) return;

    await supabase.from('contact_messages').delete().eq('id', id);
    revalidatePath('/admin/messages');
}
