"use client";

import { usePathname } from 'next/navigation';
import { ChevronRight } from 'lucide-react';

const PAGE_LABELS: Record<string, string> = {
    '/admin': 'Dashboard',
    '/admin/home': 'Home Page',
    '/admin/about': 'About Page',
    '/admin/projects': 'Projects',
    '/admin/categories': 'Categories',
    '/admin/contact': 'Contact Info',
    '/admin/messages': 'Messages',
    '/admin/settings': 'Settings',
};

export function AdminBreadcrumb() {
    const pathname = usePathname();

    // For dynamic routes like /admin/projects/[id], derive a label
    const getLabel = () => {
        if (PAGE_LABELS[pathname]) return PAGE_LABELS[pathname];
        if (pathname.startsWith('/admin/projects/')) return 'Edit Project';
        return 'Admin';
    };

    const pageLabel = getLabel();
    const isRoot = pathname === '/admin';

    return (
        <div className="hidden md:flex items-center gap-2 text-[9px] uppercase tracking-[0.18em] text-gray-600 mb-8">
            <span className="text-gray-700 hover:text-gray-500 transition-colors duration-200 cursor-default">
                Admin Panel
            </span>
            {!isRoot && (
                <>
                    <ChevronRight className="w-3 h-3 text-gray-700 flex-shrink-0" />
                    <span className="text-gold-400/70 font-medium">{pageLabel}</span>
                </>
            )}
        </div>
    );
}
