import { getSettings, getFeaturedProjects } from '@/lib/data';
import { updateSettings, updateHomeSettings, updateHeroImage, updateProjectCover } from '../actions';
import { Video, BarChart3, Type, Layers, Briefcase, MousePointerClick, ImageIcon, Image as ImageLucide, Sparkles } from 'lucide-react';
import type { Project } from '@/lib/types';

export default async function AdminHome() {
    const settings = await getSettings();
    const featuredProjects = await getFeaturedProjects();

    return (
        <div className="space-y-8 max-w-5xl">
            {/* Page Header */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gold-400/20 to-gold-400/5 border border-gold-400/20 flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-gold-400" />
                    </div>
                    <h1 className="text-2xl font-heading font-bold text-white tracking-wide">
                        Home Page
                    </h1>
                </div>
                <p className="text-xs text-gray-500 tracking-wide ml-11">
                    Full control over the homepage — hero, stats, featured projects, and services
                </p>
            </div>

            {/* Hero Text Settings */}
            <form action={updateSettings} className="admin-card p-6 space-y-5">
                <input type="hidden" name="type" value="hero" />
                <div className="flex items-center gap-3 mb-4">
                    <Type className="w-4 h-4 text-gold-400" />
                    <h3 className="text-xs text-gold-400 uppercase tracking-[0.15em] font-bold">Hero Section Text</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="text-[9px] text-gray-500 uppercase tracking-[0.2em] mb-2 block font-medium">Site Title</label>
                        <input
                            name="site_title"
                            defaultValue={settings?.site_title || ''}
                            placeholder="Mohamed Bouliani"
                            className="admin-input"
                        />
                    </div>
                    <div>
                        <label className="text-[9px] text-gray-500 uppercase tracking-[0.2em] mb-2 block font-medium">Site Description</label>
                        <input
                            name="site_description"
                            defaultValue={settings?.site_description || ''}
                            placeholder="Designer. Photographer. Filmmaker."
                            className="admin-input"
                        />
                    </div>
                </div>

                <div>
                    <label className="text-[9px] text-gray-500 uppercase tracking-[0.2em] mb-2 block font-medium">Hero Title (Main Heading)</label>
                    <input
                        name="hero_title"
                        defaultValue={settings?.hero_title || ''}
                        placeholder="I Create Cinematic Experiences"
                        className="admin-input"
                    />
                    <p className="text-[8px] text-gray-700 mt-1.5 ml-1">Words 1-2 = white, words 3-4 = gold gradient, words 5+ = white (line breaks auto-applied)</p>
                </div>

                <div>
                    <label className="text-[9px] text-gray-500 uppercase tracking-[0.2em] mb-2 block font-medium">Hero Subtitle</label>
                    <textarea
                        name="hero_subtitle"
                        defaultValue={settings?.hero_subtitle || ''}
                        placeholder="Designer. Photographer. Filmmaker. Audio Engineer..."
                        rows={3}
                        className="admin-input resize-none"
                    />
                </div>

                <div className="flex justify-end pt-2">
                    <button type="submit" className="admin-btn">Save Hero Text</button>
                </div>
            </form>

            {/* Hero CTA Button */}
            <form action={updateSettings} className="admin-card p-6 space-y-5">
                <input type="hidden" name="type" value="hero_cta" />
                <div className="flex items-center gap-3 mb-4">
                    <MousePointerClick className="w-4 h-4 text-gold-400" />
                    <h3 className="text-xs text-gold-400 uppercase tracking-[0.15em] font-bold">Hero Call-to-Action</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="text-[9px] text-gray-500 uppercase tracking-[0.2em] mb-2 block font-medium">Button Text</label>
                        <input
                            name="hero_cta_text"
                            defaultValue={settings?.hero_cta_text || 'Explore My Work'}
                            placeholder="Explore My Work"
                            className="admin-input"
                        />
                    </div>
                    <div>
                        <label className="text-[9px] text-gray-500 uppercase tracking-[0.2em] mb-2 block font-medium">Button Link</label>
                        <input
                            name="hero_cta_link"
                            defaultValue={settings?.hero_cta_link || '/work'}
                            placeholder="/work"
                            className="admin-input"
                        />
                    </div>
                </div>

                <div className="flex justify-end pt-2">
                    <button type="submit" className="admin-btn">Save CTA</button>
                </div>
            </form>

            {/* Stats Settings */}
            <form action={updateSettings} className="admin-card p-6 space-y-5">
                <input type="hidden" name="type" value="stats" />
                <div className="flex items-center gap-3 mb-4">
                    <BarChart3 className="w-4 h-4 text-gold-400" />
                    <h3 className="text-xs text-gold-400 uppercase tracking-[0.15em] font-bold">Statistics Section</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                        { name: 'stat_years', label: 'Value 1', value: settings?.stat_years || '10+', labelName: 'stat_years_label', labelValue: settings?.stat_years_label || "Years Experience" },
                        { name: 'stat_projects', label: 'Value 2', value: settings?.stat_projects || '120+', labelName: 'stat_projects_label', labelValue: settings?.stat_projects_label || 'Projects Delivered' },
                        { name: 'stat_awards', label: 'Value 3', value: settings?.stat_awards || '15+', labelName: 'stat_awards_label', labelValue: settings?.stat_awards_label || 'Awards Won' },
                        { name: 'stat_clients', label: 'Value 4', value: settings?.stat_clients || '50+', labelName: 'stat_clients_label', labelValue: settings?.stat_clients_label || 'Happy Clients' },
                    ].map((stat) => (
                        <div key={stat.name} className="space-y-3 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                            <div>
                                <label className="text-[8px] text-gray-600 uppercase tracking-[0.2em] mb-1.5 block font-bold">Number</label>
                                <input name={stat.name} defaultValue={stat.value} className="admin-input text-center text-lg font-heading font-bold" />
                            </div>
                            <div>
                                <label className="text-[8px] text-gray-600 uppercase tracking-[0.2em] mb-1.5 block font-bold">Label</label>
                                <input name={stat.labelName} defaultValue={stat.labelValue} className="admin-input text-center text-xs" />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-end pt-2">
                    <button type="submit" className="admin-btn">Save Stats</button>
                </div>
            </form>

            {/* Featured Projects Section */}
            <form action={updateSettings} className="admin-card p-6 space-y-5">
                <input type="hidden" name="type" value="featured" />
                <div className="flex items-center gap-3 mb-4">
                    <Layers className="w-4 h-4 text-gold-400" />
                    <h3 className="text-xs text-gold-400 uppercase tracking-[0.15em] font-bold">Featured Projects Section</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="text-[9px] text-gray-500 uppercase tracking-[0.2em] mb-2 block font-medium">Section Label</label>
                        <input name="featured_section_title" defaultValue={settings?.featured_section_title || 'Selected Works'} className="admin-input" />
                    </div>
                    <div>
                        <label className="text-[9px] text-gray-500 uppercase tracking-[0.2em] mb-2 block font-medium">Section Heading</label>
                        <input name="featured_section_subtitle" defaultValue={settings?.featured_section_subtitle || 'Featured Projects'} className="admin-input" />
                    </div>
                    <div>
                        <label className="text-[9px] text-gray-500 uppercase tracking-[0.2em] mb-2 block font-medium">View All Text</label>
                        <input name="featured_view_all_text" defaultValue={settings?.featured_view_all_text || 'View All Projects'} className="admin-input" />
                    </div>
                </div>

                <div className="flex justify-end pt-2">
                    <button type="submit" className="admin-btn">Save Featured Section</button>
                </div>
            </form>

            {/* Featured Projects Cover Images */}
            <div className="admin-card p-6 space-y-5">
                <div className="flex items-center gap-3 mb-4">
                    <ImageLucide className="w-4 h-4 text-gold-400" />
                    <h3 className="text-xs text-gold-400 uppercase tracking-[0.15em] font-bold">Featured Projects — Covers</h3>
                </div>

                <p className="text-[10px] text-gray-500 leading-relaxed max-w-lg">
                    Update cover images for featured projects displayed on the homepage.
                </p>

                {featuredProjects.length === 0 && (
                    <p className="text-xs text-gray-600 italic py-4">No featured projects found. Mark projects as featured from the Projects page.</p>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {featuredProjects.slice(0, 6).map((project: Project) => (
                        <form key={project.id} action={updateProjectCover} className="p-4 rounded-xl border border-white/[0.04] bg-white/[0.01] space-y-3">
                            <input type="hidden" name="id" value={project.id} />
                            
                            <div className="flex items-center gap-2">
                                <p className="text-[9px] text-gold-400 uppercase tracking-[0.15em] font-bold truncate">{project.title}</p>
                            </div>

                            <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-obsidian-800 border border-white/[0.04]">
                                {project.cover_image ? (
                                    <img src={project.cover_image} alt={project.title} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <span className="text-[9px] text-gray-700 uppercase tracking-widest">No cover</span>
                                    </div>
                                )}
                            </div>

                            <input
                                type="file"
                                name="cover_image"
                                accept="image/jpeg,image/png,image/webp"
                                required
                                className="text-xs text-gray-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-[8px] file:uppercase file:tracking-widest file:bg-white/10 file:text-white hover:file:bg-white/20 transition-colors w-full cursor-pointer"
                            />

                            <button type="submit" className="w-full admin-btn text-[8px] py-2.5">
                                Update Cover
                            </button>
                        </form>
                    ))}
                </div>
            </div>

            {/* Services Section */}
            <form action={updateSettings} className="admin-card p-6 space-y-5">
                <input type="hidden" name="type" value="services" />
                <div className="flex items-center gap-3 mb-4">
                    <Briefcase className="w-4 h-4 text-gold-400" />
                    <h3 className="text-xs text-gold-400 uppercase tracking-[0.15em] font-bold">Services / Expertise</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="text-[9px] text-gray-500 uppercase tracking-[0.2em] mb-2 block font-medium">Section Label</label>
                        <input name="services_section_title" defaultValue={settings?.services_section_title || 'Expertise'} className="admin-input" />
                    </div>
                    <div>
                        <label className="text-[9px] text-gray-500 uppercase tracking-[0.2em] mb-2 block font-medium">Section Heading</label>
                        <input name="services_section_subtitle" defaultValue={settings?.services_section_subtitle || 'A Multidisciplinary Approach'} className="admin-input" />
                    </div>
                </div>

                <div>
                    <label className="text-[9px] text-gray-500 uppercase tracking-[0.2em] mb-2 block font-medium">Description</label>
                    <textarea name="services_section_description" defaultValue={settings?.services_section_description || ''} rows={3} className="admin-input resize-none" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="text-[9px] text-gray-500 uppercase tracking-[0.2em] mb-2 block font-medium">Link Text</label>
                        <input name="services_section_link_text" defaultValue={settings?.services_section_link_text || 'Learn More'} className="admin-input" />
                    </div>
                    <div>
                        <label className="text-[9px] text-gray-500 uppercase tracking-[0.2em] mb-2 block font-medium">Link URL</label>
                        <input name="services_section_link_url" defaultValue={settings?.services_section_link_url || '/about'} className="admin-input" />
                    </div>
                </div>

                {/* Service Cards */}
                <div className="border-t border-white/[0.04] pt-5 mt-5">
                    <p className="text-[9px] text-gray-400 uppercase tracking-[0.15em] mb-4 font-medium">Service Cards (4 displayed on homepage)</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[1, 2, 3, 4].map((num) => (
                            <div key={num} className="p-4 rounded-xl border border-white/[0.04] bg-white/[0.01] space-y-3">
                                <p className="text-[8px] text-gold-400 uppercase tracking-[0.2em] font-bold">Service {num}</p>
                                <input
                                    name={`service_${num}_title`}
                                    defaultValue={(settings as unknown as Record<string, string | null>)?.[`service_${num}_title`] || ''}
                                    placeholder="Service title"
                                    className="admin-input text-sm"
                                />
                                <textarea
                                    name={`service_${num}_description`}
                                    defaultValue={(settings as unknown as Record<string, string | null>)?.[`service_${num}_description`] || ''}
                                    placeholder="Service description"
                                    rows={2}
                                    className="admin-input resize-none text-sm"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-end pt-2">
                    <button type="submit" className="admin-btn">Save Services</button>
                </div>
            </form>

            {/* Hero Video Upload */}
            <form action={updateHomeSettings} className="admin-card p-6 space-y-5">
                <div className="flex items-center gap-3 mb-4">
                    <Video className="w-4 h-4 text-gold-400" />
                    <h3 className="text-xs text-gold-400 uppercase tracking-[0.15em] font-bold">Hero Background Video</h3>
                </div>

                <p className="text-[10px] text-gray-500 leading-relaxed max-w-lg">
                    Upload an MP4 or WebM video that loops silently in the hero background.
                </p>

                <div className="p-4 rounded-xl border border-white/[0.04] bg-white/[0.01]">
                    <input
                        type="file"
                        name="hero_video"
                        accept="video/mp4,video/webm"
                        required
                        className="text-xs text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-[9px] file:uppercase file:tracking-widest file:bg-white/10 file:text-white hover:file:bg-white/20 transition-colors w-full cursor-pointer"
                    />
                </div>

                <div className="flex justify-end pt-2">
                    <button type="submit" className="admin-btn">Upload Video</button>
                </div>
            </form>

            {/* Hero Background Image Upload */}
            <form action={updateHeroImage} className="admin-card p-6 space-y-5">
                <div className="flex items-center gap-3 mb-4">
                    <ImageIcon className="w-4 h-4 text-gold-400" />
                    <h3 className="text-xs text-gold-400 uppercase tracking-[0.15em] font-bold">Hero Background Image</h3>
                </div>

                <p className="text-[10px] text-gray-500 leading-relaxed max-w-lg">
                    Upload a background image for the hero section (1920×1080 or larger recommended).
                </p>

                {settings?.hero_image_url && (
                    <div className="p-3 rounded-xl border border-white/[0.04] bg-white/[0.01]">
                        <p className="text-[8px] text-gray-600 uppercase tracking-[0.2em] mb-2 font-bold">Current Image:</p>
                        <img src={settings.hero_image_url} alt="Current hero" className="w-full max-w-xs h-32 object-cover rounded-lg border border-white/[0.04]" />
                    </div>
                )}

                <div className="p-4 rounded-xl border border-white/[0.04] bg-white/[0.01]">
                    <input
                        type="file"
                        name="hero_image"
                        accept="image/jpeg,image/png,image/webp"
                        required
                        className="text-xs text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-[9px] file:uppercase file:tracking-widest file:bg-white/10 file:text-white hover:file:bg-white/20 transition-colors w-full cursor-pointer"
                    />
                </div>

                <div className="flex justify-end pt-2">
                    <button type="submit" className="admin-btn">Upload Image</button>
                </div>
            </form>
        </div>
    );
}
