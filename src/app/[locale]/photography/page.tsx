import Image from 'next/image';
import { getProjects } from '@/lib/data';
import Link from 'next/link';
import type { Project } from '@/lib/types';
import { getDictionary } from '@/i18n/getDictionary';
import type { Locale } from '@/i18n/config';

export const dynamic = 'force-dynamic';

export default async function Photography({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const dict = await getDictionary(locale as Locale);
    const allProjects = await getProjects();
    const projects = allProjects.filter((p: Project) =>
        p.category === 'Photography' ||
        p.category === 'Retouche & Manipulation Photo' ||
        p.category === 'Photographie'
    );

    return (
        <main role="main" className="pt-24 md:pt-32 pb-16 md:pb-24 container mx-auto px-4 sm:px-6 md:px-12">
            {/* Page header */}
            <div className="mb-8 md:mb-12">
                <h1 className="text-4xl sm:text-5xl md:text-7xl font-heading font-bold uppercase mb-3 md:mb-4 tracking-tight leading-[0.85]" style={{ color: 'var(--color-text)' }}>
                    {dict.nav.photography}
                </h1>
                <p className="text-xs uppercase tracking-[0.3em]" style={{ color: 'var(--color-text-muted)' }}>
                    {projects.length > 0 ? `${projects.length} ${projects.length === 1 ? 'project' : 'projects'}` : ''}
                </p>
            </div>

            {/* Masonry grid — single column on mobile, 2 on sm, 3 on lg */}
            {projects.length === 0 ? (
                <p className="text-xs uppercase tracking-widest text-center py-20" style={{ color: 'var(--color-text-muted)' }}>
                    {dict.work.noProjectsInCategory}
                </p>
            ) : (
                <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 md:gap-6 space-y-4 md:space-y-6">
                    {projects.map((p: Project, index: number) => (
                        <Link
                            href={`/${locale}/work/${p.slug}`}
                            key={p.id}
                            className="break-inside-avoid relative rounded-xl md:rounded-2xl overflow-hidden group cursor-zoom-in border block"
                            style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)' }}
                        >
                            <div className="aspect-[3/4] relative overflow-hidden flex items-center justify-center" style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
                                {p.cover_image ? (
                                    <Image
                                        src={p.cover_image}
                                        alt={`${p.title} - photography project`}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        loading={index < 3 ? "eager" : "lazy"}
                                        quality={80}
                                    />
                                ) : (
                                    /* Tasteful placeholder — no raw alt text leaking */
                                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3" aria-label={p.title}>
                                        <svg className="w-8 h-8 opacity-20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" style={{ color: 'var(--color-accent)' }}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                                        </svg>
                                        <span className="text-[10px] uppercase tracking-[0.25em] px-4 text-center opacity-30" style={{ color: 'var(--color-text)' }}>{p.title}</span>
                                    </div>
                                )}
                            </div>
                            {/* Hover overlay — always visible title on hover */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4 md:p-6 z-10">
                                <p className="font-heading text-base md:text-lg tracking-wide" style={{ color: 'var(--color-accent)' }}>{p.title}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </main>
    );
}
