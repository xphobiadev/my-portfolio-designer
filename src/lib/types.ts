export interface Project {
    id: string;
    title: string;
    subtitle: string;
    category: string;
    slug: string;
    description: string;
    cover_image: string | null;
    video_url: string | null;
    audio_url: string | null;
    tags: string[];
    tools: string[];
    gallery: string[];
    problem: string | null;
    solution: string | null;
    result: string | null;
    is_featured: boolean;
    created_at: string;
}

export interface Category {
    id: string;
    name: string;
    slug: string | null;
    parent_id: string | null;
    created_at: string;
}

export interface SiteSettings {
    id: number;
    site_title: string | null;
    site_description: string | null;
    hero_title: string | null;
    hero_subtitle: string | null;
    hero_video_url: string | null;
    hero_image_url: string | null;
    hero_cta_text: string | null;
    hero_cta_link: string | null;
    stat_years: string | null;
    stat_years_label: string | null;
    stat_projects: string | null;
    stat_projects_label: string | null;
    stat_awards: string | null;
    stat_awards_label: string | null;
    stat_clients: string | null;
    stat_clients_label: string | null;
    featured_section_title: string | null;
    featured_section_subtitle: string | null;
    featured_view_all_text: string | null;
    services_section_title: string | null;
    services_section_subtitle: string | null;
    services_section_description: string | null;
    services_section_link_text: string | null;
    services_section_link_url: string | null;
    service_1_title: string | null;
    service_1_description: string | null;
    service_2_title: string | null;
    service_2_description: string | null;
    service_3_title: string | null;
    service_3_description: string | null;
    service_4_title: string | null;
    service_4_description: string | null;
    about_bio: string | null;
    about_image: string | null;
    contact_email: string | null;
    contact_phone: string | null;
    contact_instagram: string | null;
    contact_behance: string | null;
    contact_linkedin: string | null;
    footer_text: string | null;
    updated_at: string;
}

export interface ContactMessage {
    id: string;
    name: string;
    email: string;
    message: string;
    is_read: boolean;
    created_at: string;
}
