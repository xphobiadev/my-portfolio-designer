"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import type { Category } from '@/lib/types';
import {
    LayoutDashboard,
    FolderOpen,
    Tag,
    Home,
    User,
    Phone,
    Settings,
    ChevronDown,
    ChevronRight,
    Menu,
    X,
    ExternalLink,
    MessageSquare,
    Sparkles,
    Zap
} from 'lucide-react';

interface AdminSidebarProps {
    categories: Category[];
    unreadCount: number;
}

export function AdminSidebar({ categories, unreadCount }: AdminSidebarProps) {
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [categoriesOpen, setCategoriesOpen] = useState(false);

    const isActive = (path: string) => pathname === path;

    const navItemClass = (path: string) =>
        `group flex items-center gap-3 px-4 py-3 rounded-xl text-[11px] uppercase tracking-[0.12em] transition-all duration-200 relative overflow-hidden ${isActive(path)
            ? 'bg-gradient-to-r from-gold-400/15 to-gold-400/5 text-gold-400 border border-gold-400/20 shadow-[0_0_20px_rgba(212,175,55,0.05)] border-l-2 border-l-gold-400'
            : 'text-white/60 hover:text-white hover:bg-white/5 border border-transparent'
        }`;

    const currentYear = new Date().getFullYear();

    const sidebar = (
        <div className="flex flex-col h-full">
            {/* Logo Area */}
            <div className="p-6 pb-8">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                            <Zap className="w-5 h-5 text-black" />
                        </div>
                        <div>
                            <h2 className="text-sm font-heading font-bold text-white tracking-wide">
                                Admin
                            </h2>
                            <p className="text-[8px] text-gray-600 uppercase tracking-[0.2em]">Control Panel</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setMobileOpen(false)}
                        className="md:hidden p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Divider */}
            <div className="mx-6 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto p-4 space-y-6 mt-4">

                {/* Content Group */}
                <div>
                    <h3 className="text-[8px] text-gray-600 uppercase tracking-[0.25em] mb-3 px-4 font-bold flex items-center gap-2">
                        <Sparkles className="w-3 h-3 text-gold-400/40" />
                        Content
                    </h3>
                    <div className="space-y-1">
                        <Link href="/admin" className={navItemClass('/admin')} onClick={() => setMobileOpen(false)}>
                            <LayoutDashboard className="w-4 h-4 flex-shrink-0" />
                            <span className="font-medium">Dashboard</span>
                        </Link>
                        <Link href="/admin/home" className={navItemClass('/admin/home')} onClick={() => setMobileOpen(false)}>
                            <Home className="w-4 h-4 flex-shrink-0" />
                            <span className="font-medium">Home Page</span>
                        </Link>
                        <Link href="/admin/about" className={navItemClass('/admin/about')} onClick={() => setMobileOpen(false)}>
                            <User className="w-4 h-4 flex-shrink-0" />
                            <span className="font-medium">About Page</span>
                        </Link>
                        <Link href="/admin/projects" className={navItemClass('/admin/projects')} onClick={() => setMobileOpen(false)}>
                            <FolderOpen className="w-4 h-4 flex-shrink-0" />
                            <span className="font-medium">Projects</span>
                        </Link>
                        <Link href="/admin/categories" className={navItemClass('/admin/categories')} onClick={() => setMobileOpen(false)}>
                            <Tag className="w-4 h-4 flex-shrink-0" />
                            <span className="font-medium">Categories</span>
                            <span className="ml-auto text-[9px] bg-gold-400/10 text-gold-400 px-2 py-0.5 rounded-full border border-gold-400/20">
                                {categories.length}
                            </span>
                        </Link>

                        {/* Categories Dropdown */}
                        {categories.length > 0 && (
                            <>
                                <button
                                    onClick={() => setCategoriesOpen(!categoriesOpen)}
                                    className="flex items-center gap-3 px-4 py-2 w-full text-[9px] uppercase tracking-[0.12em] text-gray-600 hover:text-gray-400 transition-colors duration-200 rounded-lg"
                                >
                                    {categoriesOpen ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
                                    Browse Categories
                                </button>
                                {categoriesOpen && (
                                    <div className="ml-4 pl-4 border-l border-white/[0.04] space-y-0.5">
                                        {categories.filter(c => !c.parent_id).map(cat => (
                                            <Link
                                                key={cat.id}
                                                href={`/admin/projects?category=${encodeURIComponent(cat.name)}`}
                                                className="block px-3 py-1.5 text-[9px] uppercase tracking-[0.1em] rounded-lg transition-all duration-200 text-gray-600 hover:text-gold-400 hover:bg-gold-400/5"
                                                onClick={() => setMobileOpen(false)}
                                            >
                                                {cat.name}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>

                <hr className="border-white/10 my-2" />

                {/* Communication Group */}
                <div>
                    <h3 className="text-[8px] text-gray-600 uppercase tracking-[0.25em] mb-3 px-4 font-bold">
                        Communication
                    </h3>
                    <div className="space-y-1">
                        <Link href="/admin/contact" className={navItemClass('/admin/contact')} onClick={() => setMobileOpen(false)}>
                            <Phone className="w-4 h-4 flex-shrink-0" />
                            <span className="font-medium">Contact Info</span>
                        </Link>
                        <Link href="/admin/messages" className={navItemClass('/admin/messages')} onClick={() => setMobileOpen(false)}>
                            <MessageSquare className="w-4 h-4 flex-shrink-0" />
                            <span className="font-medium">Messages</span>
                            {unreadCount > 0 && (
                                <span className="ml-auto flex items-center justify-center min-w-[20px] h-5 text-[9px] bg-red-500/20 text-red-400 px-1.5 rounded-full border border-red-500/30 font-bold animate-pulse">
                                    {unreadCount}
                                </span>
                            )}
                        </Link>
                    </div>
                </div>

                <hr className="border-white/10 my-2" />

                {/* System Group */}
                <div>
                    <h3 className="text-[8px] text-gray-600 uppercase tracking-[0.25em] mb-3 px-4 font-bold">
                        System
                    </h3>
                    <div className="space-y-1">
                        <Link href="/admin/settings" className={navItemClass('/admin/settings')} onClick={() => setMobileOpen(false)}>
                            <Settings className="w-4 h-4 flex-shrink-0" />
                            <span className="font-medium">Settings</span>
                        </Link>
                    </div>
                </div>

            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-white/[0.04]">
                <Link
                    href="/"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-[10px] uppercase tracking-[0.12em] text-gray-500 hover:text-gold-400 hover:bg-gold-400/5 transition-all duration-200 border border-transparent hover:border-gold-400/10"
                    target="_blank"
                >
                    <ExternalLink className="w-4 h-4" />
                    <span className="font-medium">View Site</span>
                </Link>
                <p className="text-center text-[8px] text-gray-700 mt-2 tracking-[0.15em]">
                    © {currentYear}
                </p>
            </div>
        </div>
    );

    return (
        <>
            {/* Mobile Toggle */}
            <button
                onClick={() => setMobileOpen(true)}
                className="md:hidden fixed top-4 left-4 z-50 p-3 bg-obsidian-900/90 backdrop-blur-xl border border-white/10 rounded-xl text-white shadow-lg"
            >
                <Menu className="w-5 h-5" />
            </button>

            {/* Mobile Overlay */}
            {mobileOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed top-0 left-0 h-full w-72 bg-[#060606] border-r border-white/[0.04] z-50
                transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
                ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
                md:translate-x-0
            `}>
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-gold-400/[0.01] via-transparent to-transparent pointer-events-none" />
                <div className="relative h-full">
                    {sidebar}
                </div>
            </aside>
        </>
    );
}
