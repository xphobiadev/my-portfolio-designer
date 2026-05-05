import Image from 'next/image';
import { getProjects } from '@/lib/data';
import Link from 'next/link';
import type { Project } from '@/lib/types';
import { getDictionary } from '@/i18n/getDictionary';
import type { Locale } from '@/i18n/config';

export default async function Videos({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const dict = await getDictionary(locale as Locale);
    const allProjects = await getProjects();
    const projects = allProjects.filter((p: Project) =>
        p.video_url ||
        p.category === 'Video Production' ||
        p.category === 'Motion Graphics' ||
        p.category === 'Video'
    );

    return (
        <div className="pt-24 md:pt-32 pb-16 md:pb-24 container mx-auto px-4 sm:px-6 md:px-12">
            {/* Page header */}
            <div className="mb-8 md:mb-12">
                <h1 className="text-4xl sm:text-5xl md:text-7xl font-heading font-bold uppercase mb-3 md:mb-4 tracking-tight text-white leading-[0.85]">
                    {dict.nav.videos}
                </h1>
                <p className="text-gray-500 text-xs uppercase tracking-[0.3em]">
                    {projects.length > 0 ? `${projects.length} ${projects.length === 1 ? 'project' : 'projects'}` : ''}
                </p>
            </div>

            {projects.length === 0 ? (
                <p className="text-gray-500 text-xs uppercase tracking-widest text-center py-20">
                    {dict.work.noProjectsInCategory}
                </p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    {projects.map((p: Project, index: number) => (
                        <Link
                            href={`/${locale}/work/${p.slug}`}
                            key={p.id}
                            className="group flex flex-col gap-4 md:gap-6 cursor-pointer"
                        >
                            {/* Video thumbnail */}
                            <div className="aspect-video rounded-2xl md:rounded-3xl overflow-hidden glass bg-obsidian-900 flex items-center justify-center relative border border-white/5 group-hover:border-gold-400/30 transition-all duration-500">
                                {p.cover_image ? (
                                    <Image
                                        src={p.cover_image}
                                        alt={p.title}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        loading={index < 2 ? "eager" : "lazy"}
                                        quality={80}
                                    />
                                ) : (
                                    <span className="text-gray-600 font-sans tracking-[0.2em] uppercase text-xs px-4 text-center">
                                        {p.title}
                                    </span>
                                )}
                                {/* Play button */}
                                <div
                                    className="absolute w-14 h-14 md:w-20 md:h-20 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-gold-400 group-hover:text-obsidian-900 transition-all duration-500 pl-1 z-10"
                                    aria-hidden="true"
                                >
                                    &#9658;
                                </div>
                            </div>
                            {/* Title */}
                            <div>
                                <h3 className="text-xl md:text-2xl font-heading text-white uppercase tracking-wide group-hover:text-gold-400 transition-colors duration-300">
                                    {p.title}
                                </h3>
                                <p className="text-gray-500 text-[10px] tracking-[0.3em] uppercase mt-1.5 md:mt-2">{p.category}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
