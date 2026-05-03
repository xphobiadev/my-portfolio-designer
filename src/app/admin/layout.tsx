import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen bg-[#050505]">
            <aside className="w-64 border-r border-white/5 p-8 hidden md:block">
                <div className="mb-12">
                    <h2 className="text-2xl font-heading text-gold-400 tracking-wide uppercase">Admin</h2>
                </div>
                <nav className="space-y-6">
                    {['Overview', 'Projects', 'Categories', 'Media'].map(tab => (
                        <Link key={tab} href={tab === 'Overview' ? '/admin' : `/admin/${tab.toLowerCase()}`} className="block text-gray-400 hover:text-white text-xs uppercase tracking-[0.2em] transition-colors">{tab}</Link>
                    ))}
                </nav>
            </aside>
            <main className="flex-1 p-6 md:p-12 overflow-auto">
                {children}
            </main>
        </div>
    );
}
