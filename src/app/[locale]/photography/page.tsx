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
        <div className="pt-24 md:pt-32 pb-16 md:pb-24 container mx-auto px-4 sm:px-6 md:px-12">
            {/* Page header */}
            <div className="mb-8 md:mb-12">
                <h1 className="text-4xl sm:text-5xl md:text-7xl font-heading font-bold uppercase mb-3 md:mb-4 tracking-tight text-white leading-[0.85]">
                    {dict.nav.photography}
                </h1>
                <p className="text-gray-500 text-xs uppercase tracking-[0.3em]">
                    {projects.length > 0 ? `${projects.length} ${projects.length === 1 ? 'project' : 'projects'}` : ''}
                </p>
            </div>

            {/* Masonry grid — single column on mobile, 2 on sm, 3 on lg */}
            {projects.length === 0 ? (
                <p className="text-gray-500 text-xs uppercase tracking-widest text-center py-20">
                    {dict.work.noProjectsInCategory}
                </p>
            ) : (
                <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 md:gap-6 space-y-4 md:space-y-6">
                    {projects.map((p: Project, index: number) => (
                        <Link
                            href={`/${locale}/work/${p.slug}`}
                            key={p.id}
                            className="break-inside-avoid relative rounded-xl md:rounded-2xl overflow-hidden glass group cursor-zoom-in border border-white/5 block"
                        >
                            <div className="aspect-[3/4] bg-obsidian-800 flex items-center justify-center text-gray-600 relative overflow-hidden">
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
                                    <span className="uppercase text-[10px] tracking-widest px-4 text-center">{p.title}</span>
                                )}
                            </div>
                            {/* Hover overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-obsidian-900 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4 md:p-6 z-10">
                                <p className="text-gold-400 font-heading text-base md:text-lg tracking-wide">{p.title}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
