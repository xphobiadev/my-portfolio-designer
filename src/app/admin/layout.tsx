import Link from 'next/link';
import { Inter, Outfit } from "next/font/google";
import { getCategoriesList, getUnreadMessagesCount } from '@/lib/data';
import type { Category } from '@/lib/types';
import { AdminSidebar } from './components/AdminSidebar';
import { AdminBreadcrumb } from './components/AdminBreadcrumb';
import '../globals.css';

// Force all admin routes to be dynamically rendered (they use connection() for DB access)
export const dynamic = 'force-dynamic';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    const categories: Category[] = await getCategoriesList();
    const unreadCount = await getUnreadMessagesCount();

    return (
        <html lang="fr" suppressHydrationWarning className={`${inter.variable} ${outfit.variable} h-full antialiased dark`}>
            <body className="min-h-full flex flex-col bg-background text-foreground font-sans selection:bg-gold-400/20 selection:text-gold-300">
                <div className="flex min-h-screen bg-[#030303] relative">
                    {/* Subtle background pattern */}
                    <div className="fixed inset-0 opacity-[0.015] pointer-events-none">
                        <div className="absolute inset-0" style={{
                            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                            backgroundSize: '40px 40px'
                        }} />
                    </div>

                    <AdminSidebar categories={categories} unreadCount={unreadCount} />

                    <main className="flex-1 p-4 md:p-8 lg:p-10 overflow-y-auto min-w-0 ml-0 md:ml-72 relative z-10">
                        {/* Mobile Header */}
                        <div className="md:hidden flex items-center justify-between mb-8 pb-4 border-b border-white/[0.04]">
                            {/* Spacer for the fixed mobile menu button (top-left) */}
                            <div className="w-12" />
                            <Link href="/admin" className="text-lg font-heading font-bold text-gold-400 tracking-wider uppercase">
                                Admin
                            </Link>
                            <Link
                                href="/"
                                target="_blank"
                                className="text-[9px] text-gray-500 uppercase tracking-[0.2em] hover:text-gold-400 transition-colors px-3 py-1.5 border border-white/[0.06] rounded-full"
                            >
                                View Site →
                            </Link>
                        </div>

                        {/* Desktop breadcrumb */}
                        <AdminBreadcrumb />

                        {children}
                    </main>
                </div>
            </body>
        </html>
    );
}
