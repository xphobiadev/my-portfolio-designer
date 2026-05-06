import Link from 'next/link';
import { getProjects, getCategoriesList, getSettings, getUnreadMessagesCount } from '@/lib/data';
import type { Project } from '@/lib/types';
import {
    FolderOpen, Layers, Image, MessageSquare, TrendingUp,
    Star, ArrowUpRight, Plus, Zap, Mail, Phone, AtSign, Globe
} from 'lucide-react';

export default async function AdminDashboard() {
    const projects = await getProjects();
    const categories = await getCategoriesList();
    const settings = await getSettings();
    const unreadMessages = await getUnreadMessagesCount();

    // Server-side greeting using UTC+1
    const nowUTC = new Date();
    const hourUTC1 = (nowUTC.getUTCHours() + 1) % 24;
    const greetingTime = hourUTC1 < 12 ? 'morning' : hourUTC1 < 18 ? 'afternoon' : 'evening';

    const totalProjects = projects.length;
    const featuredProjects = projects.filter((p: Project) => p.is_featured).length;
    const withMedia = projects.filter((p: Project) => p.cover_image || p.video_url || p.audio_url).length;
    const totalCategories = categories.length;
    const mediaAssets = projects.reduce((sum: number, p: Project) => {
        return sum + (p.cover_image ? 1 : 0) + (p.video_url ? 1 : 0) + (p.audio_url ? 1 : 0) + (p.gallery?.length || 0);
    }, 0);

    const stats = [
        {
            label: 'Total Projects',
            count: totalProjects,
            description: 'Total in portfolio',
            icon: FolderOpen,
            color: 'text-blue-400',
            borderColor: 'border-l-blue-500',
            gradient: 'from-blue-500/20 to-blue-500/5',
            border: 'border-blue-500/20',
        },
        {
            label: 'Featured',
            count: featuredProjects,
            description: 'Highlighted work',
            icon: Star,
            color: 'text-amber-400',
            borderColor: 'border-l-amber-500',
            gradient: 'from-amber-500/20 to-amber-500/5',
            border: 'border-amber-500/20',
        },
        {
            label: 'Categories',
            count: totalCategories,
            description: 'Organization groups',
            icon: Layers,
            color: 'text-green-400',
            borderColor: 'border-l-green-500',
            gradient: 'from-green-500/20 to-green-500/5',
            border: 'border-green-500/20',
        },
        {
            label: 'Unread Messages',
            count: unreadMessages,
            description: 'Awaiting review',
            icon: MessageSquare,
            color: 'text-red-400',
            borderColor: 'border-l-red-500',
            gradient: 'from-red-500/20 to-red-500/5',
            border: 'border-red-500/20',
        },
        {
            label: 'Media Assets',
            count: mediaAssets,
            description: 'Files & uploads',
            icon: Image,
            color: 'text-purple-400',
            borderColor: 'border-l-purple-500',
            gradient: 'from-purple-500/20 to-purple-500/5',
            border: 'border-purple-500/20',
        },
        {
            label: 'With Media',
            count: withMedia,
            description: 'Have attachments',
            icon: TrendingUp,
            color: 'text-cyan-400',
            borderColor: 'border-l-cyan-500',
            gradient: 'from-cyan-500/20 to-cyan-500/5',
            border: 'border-cyan-500/20',
        },
    ];

    return (
        <div className="space-y-8">
            {/* Welcome Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center">
                            <Zap className="w-4 h-4 text-black" />
                        </div>
                        <h1 className="text-2xl md:text-3xl font-heading font-bold text-white tracking-wide">
                            Good {greetingTime}, Admin 👋
                        </h1>
                    </div>
                    <p className="text-xs text-gray-500 tracking-wide ml-11">
                        Here&apos;s an overview of your portfolio.
                    </p>
                </div>
                <Link
                    href="/admin/projects"
                    className="inline-flex items-center gap-2 admin-btn w-fit"
                >
                    <Plus className="w-3 h-3" /> New Project
                </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {stats.map(stat => {
                    const Icon = stat.icon;
                    return (
                        <div
                            key={stat.label}
                            className={`relative p-5 rounded-2xl border ${stat.border} border-l-4 ${stat.borderColor} bg-gradient-to-br ${stat.gradient} backdrop-blur-sm overflow-hidden group hover:scale-[1.02] hover:-translate-y-0.5 transition-all duration-200`}
                        >
                            {/* Background glow */}
                            <div className={`absolute -top-4 -right-4 w-16 h-16 ${stat.color} opacity-5 blur-2xl rounded-full`} />

                            <div className="relative z-10">
                                <Icon className={`w-4 h-4 ${stat.color} mb-3 opacity-70`} />
                                <p className={`text-3xl font-heading font-bold ${stat.color}`}>{stat.count}</p>
                                <p className="text-[8px] uppercase tracking-[0.15em] text-gray-500 mt-1 font-medium">{stat.label}</p>
                                <p className="text-[8px] text-gray-700 mt-0.5 tracking-wide">{stat.description}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Quick Actions */}
            <div>
                <h2 className="text-[9px] uppercase tracking-[0.2em] text-gray-600 font-bold mb-4 flex items-center gap-2">
                    <span className="w-4 h-px bg-white/10 inline-block" /> Quick Actions
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                        { href: '/admin/home', title: 'Home Page', desc: 'Manage hero video, title & stats', icon: '🎬', color: 'hover:border-blue-500/30' },
                        { href: '/admin/about', title: 'About Page', desc: 'Update bio & portrait image', icon: '👤', color: 'hover:border-green-500/30' },
                        { href: '/admin/contact', title: 'Contact Info', desc: 'Email, phone & social links', icon: '📬', color: 'hover:border-gold-400/30' },
                    ].map((action) => (
                        <Link
                            key={action.href}
                            href={action.href}
                            className={`group relative p-6 rounded-2xl border border-white/[0.04] bg-white/[0.01] hover:bg-white/[0.03] ${action.color} transition-all duration-200 overflow-hidden hover:-translate-y-0.5`}
                        >
                            {/* Hover gradient */}
                            <div className="absolute inset-0 bg-gradient-to-r from-gold-400/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            <div className="relative z-10">
                                <span className="text-2xl mb-3 block">{action.icon}</span>
                                <h3 className="text-sm font-heading font-bold text-white uppercase tracking-wide mb-1.5 group-hover:text-gold-400 transition-colors duration-200">
                                    {action.title}
                                </h3>
                                <p className="text-[10px] text-gray-500 tracking-wide">{action.desc}</p>
                            </div>

                            <div className="absolute bottom-5 right-5 flex items-center gap-1 text-[9px] text-gray-700 group-hover:text-gold-400 transition-all duration-200 uppercase tracking-widest">
                                <span>Edit</span>
                                <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Recent Projects Table */}
            <div className="rounded-2xl border border-white/[0.04] bg-white/[0.01] overflow-hidden">
                <div className="flex justify-between items-center p-6 border-b border-white/[0.04]">
                    <h2 className="text-sm font-heading font-bold text-white uppercase tracking-wide">Recent Projects</h2>
                    <Link href="/admin/projects" className="text-[10px] uppercase tracking-[0.15em] text-gold-400 hover:text-white transition-colors duration-200 flex items-center gap-1">
                        View All <ArrowUpRight className="w-3 h-3" />
                    </Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[700px]">
                        <thead>
                            <tr className="border-b border-white/[0.04] bg-white/[0.01]">
                                <th className="px-6 py-4 text-[8px] uppercase tracking-[0.2em] text-gray-600 font-bold">Title</th>
                                <th className="px-6 py-4 text-[8px] uppercase tracking-[0.2em] text-gray-600 font-bold">Category</th>
                                <th className="px-6 py-4 text-[8px] uppercase tracking-[0.2em] text-gray-600 font-bold">Status</th>
                                <th className="px-6 py-4 text-[8px] uppercase tracking-[0.2em] text-gray-600 font-bold">Media</th>
                                <th className="px-6 py-4 text-[8px] uppercase tracking-[0.2em] text-gray-600 font-bold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.slice(0, 8).map((proj: Project, idx: number) => (
                                <tr
                                    key={proj.id}
                                    className={`border-b border-white/[0.02] hover:bg-white/[0.03] transition-colors duration-200 group ${idx % 2 === 0 ? 'bg-transparent' : 'bg-white/[0.01]'}`}
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            {proj.cover_image ? (
                                                <div className="w-10 h-10 rounded-xl overflow-hidden bg-obsidian-800 flex-shrink-0 border border-white/[0.06]">
                                                    <img src={proj.cover_image} alt={proj.title} className="w-full h-full object-cover" />
                                                </div>
                                            ) : (
                                                <div className="w-10 h-10 rounded-xl bg-white/[0.03] flex items-center justify-center flex-shrink-0 border border-white/[0.04]">
                                                    <FolderOpen className="w-4 h-4 text-gray-700" />
                                                </div>
                                            )}
                                            <span className="text-xs font-medium text-white/80 group-hover:text-gold-400 transition-colors duration-200 tracking-wide">
                                                {proj.title}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-[10px] text-gray-500 tracking-wider px-2 py-1 bg-white/[0.03] rounded-md border border-white/[0.04]">
                                            {proj.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        {proj.is_featured ? (
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-400/10 text-amber-400 border border-amber-400/20 text-[9px] uppercase tracking-widest rounded-full font-medium">
                                                <Star className="w-2.5 h-2.5" /> Featured
                                            </span>
                                        ) : (
                                            <span className="text-[9px] text-gray-700 uppercase tracking-widest">Standard</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-1.5 items-center">
                                            {proj.cover_image && (
                                                <span className="w-2 h-2 rounded-full bg-emerald-400/80" title="Image" />
                                            )}
                                            {proj.video_url && (
                                                <span className="w-2 h-2 rounded-full bg-blue-400/80" title="Video" />
                                            )}
                                            {proj.audio_url && (
                                                <span className="w-2 h-2 rounded-full bg-purple-400/80" title="Audio" />
                                            )}
                                            {!proj.cover_image && !proj.video_url && !proj.audio_url && (
                                                <span className="text-[9px] text-gray-700">—</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <Link
                                            href={`/admin/projects/${proj.id}`}
                                            className="inline-flex items-center gap-1 text-[10px] text-gray-600 hover:text-gold-400 uppercase tracking-widest transition-colors duration-200 font-medium"
                                        >
                                            Edit <ArrowUpRight className="w-3 h-3" />
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                            {projects.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-16 text-center">
                                        <div className="flex flex-col items-center gap-3">
                                            <FolderOpen className="w-8 h-8 text-gray-700" />
                                            <p className="text-gray-600 text-xs uppercase tracking-widest">No projects yet</p>
                                            <Link href="/admin/projects" className="text-[10px] text-gold-400 uppercase tracking-widest hover:text-white transition-colors">
                                                Create your first project →
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Site Configuration */}
            {settings && (
                <div className="rounded-2xl border border-white/[0.04] bg-white/[0.01] p-6">
                    <h2 className="text-sm font-heading font-bold text-white uppercase tracking-wide mb-6">Site Configuration</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { label: 'Email', value: settings.contact_email, icon: Mail, color: 'text-blue-400', bg: 'bg-blue-500/10' },
                            { label: 'Phone', value: settings.contact_phone, icon: Phone, color: 'text-green-400', bg: 'bg-green-500/10' },
                            { label: 'Instagram', value: settings.contact_instagram, icon: AtSign, color: 'text-pink-400', bg: 'bg-pink-500/10' },
                            { label: 'Hero Title', value: settings.hero_title, icon: Globe, color: 'text-gold-400', bg: 'bg-gold-400/10' },
                        ].map((item) => {
                            const Icon = item.icon;
                            return (
                                <div key={item.label} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] transition-colors duration-200 group">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className={`w-6 h-6 rounded-md ${item.bg} flex items-center justify-center`}>
                                            <Icon className={`w-3 h-3 ${item.color}`} />
                                        </div>
                                        <p className="text-[8px] text-gray-600 uppercase tracking-[0.2em] font-bold">{item.label}</p>
                                    </div>
                                    <p className="text-xs text-gray-300 truncate group-hover:text-white transition-colors duration-200">
                                        {item.value || <span className="text-gray-700 italic">Not set</span>}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
