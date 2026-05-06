import { getProjects } from '@/lib/data';
import Link from 'next/link';
import type { Project } from '@/lib/types';
import { getDictionary } from '@/i18n/getDictionary';
import type { Locale } from '@/i18n/config';

export const dynamic = 'force-dynamic';

export default async function Audio({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const dict = await getDictionary(locale as Locale);
    const allProjects = await getProjects();
    const projects = allProjects.filter((p: Project) => p.audio_url || p.category === 'Audio Engineering');

    return (
        <div className="pt-24 md:pt-32 pb-16 md:pb-24 container mx-auto px-4 sm:px-6 md:px-12">
            {/* Page header */}
            <div className="mb-8 md:mb-12">
                <h1 className="text-4xl sm:text-5xl md:text-7xl font-heading font-bold uppercase mb-3 md:mb-4 tracking-tight text-white leading-[0.85]">
                    {dict.nav.audio}
                </h1>
                <p className="text-gray-500 text-xs uppercase tracking-[0.3em]">
                    {projects.length > 0
                        ? `${projects.length} ${projects.length === 1 ? 'track' : 'tracks'}`
                        : dict.audio.subtitle}
                </p>
            </div>

            {/* Player card */}
            <div className="glass p-6 sm:p-8 md:p-12 rounded-2xl md:rounded-3xl border border-white/5 max-w-4xl mx-auto bg-obsidian-900/50">
                <div className="flex items-center justify-between mb-6 md:mb-8 gap-4">
                    <div className="min-w-0">
                        <h3 className="text-xl md:text-2xl font-heading text-white mb-1.5 md:mb-2 uppercase tracking-wide truncate">
                            Echo Sphere
                        </h3>
                        <p className="text-[10px] uppercase tracking-[0.3em] text-gold-400">{dict.nav.audio}</p>
                    </div>
                    <button
                        className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gold-400 text-obsidian-900 flex items-center justify-center font-bold text-lg md:text-xl hover:scale-105 hover:bg-white transition-all duration-300 flex-shrink-0"
                        aria-label="Play"
                    >
                        &#9658;
                    </button>
                </div>

                {/* Waveform placeholder */}
                <div className="h-20 md:h-32 bg-obsidian-900 rounded-xl mb-8 md:mb-12 flex items-center justify-center border border-white/5 text-gray-700 text-xs tracking-[0.3em] uppercase">
                    Interactive Waveform
                </div>

                {/* Track list */}
                <div className="space-y-1 relative">
                    <div className="absolute left-0 top-0 bottom-0 w-px bg-white/5" aria-hidden="true" />

                    {projects.length === 0 && (
                        <div className="text-center py-8 px-4">
                            <p className="text-gray-500 text-xs uppercase tracking-widest mb-3">
                                {dict.audio.comingSoon}
                            </p>
                            <p className="text-gray-400 text-sm font-light leading-relaxed">
                                {dict.audio.noProjects}
                            </p>
                        </div>
                    )}

                    {projects.map((p: Project, i: number) => (
                        <Link
                            href={`/${locale}/work/${p.slug}`}
                            key={p.id}
                            className="flex justify-between items-center py-3 md:py-4 px-4 md:px-6 hover:bg-white/5 active:bg-white/5 rounded-xl transition-colors cursor-pointer group gap-4"
                        >
                            <div className="flex items-center gap-4 md:gap-6 min-w-0">
                                <span className="text-gold-400 text-xs tracking-widest opacity-50 group-hover:opacity-100 transition-opacity flex-shrink-0">
                                    {(i + 1).toString().padStart(2, '0')}
                                </span>
                                <span className="text-gray-300 text-sm font-light uppercase tracking-wider group-hover:text-white transition-colors truncate">
                                    {p.title}
                                </span>
                            </div>
                            <span className="text-gray-500 text-[10px] uppercase font-mono tracking-widest flex-shrink-0 hidden sm:block">
                                {p.category}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
