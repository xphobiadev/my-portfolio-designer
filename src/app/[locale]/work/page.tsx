import Image from 'next/image';
import Link from 'next/link';
import { getProjects, getCategoriesList } from '@/lib/data';
import type { Project, Category } from '@/lib/types';
import { ArrowUpRight } from 'lucide-react';
import { getDictionary } from '@/i18n/getDictionary';
import type { Locale } from '@/i18n/config';

export const dynamic = 'force-dynamic';

export default async function WorkPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const dict = await getDictionary(locale as Locale);
    const categories: Category[] = await getCategoriesList();
    const projects: Project[] = await getProjects();

    const rootCategories = categories.filter(c => !c.parent_id);

    return (
        <div className="pt-24 md:pt-32 pb-16 md:pb-24 relative">
            <div className="absolute top-0 left-0 w-full h-[400px] bg-gradient-to-b from-gold-400/[0.02] to-transparent pointer-events-none" aria-hidden="true" />

            <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10">
                {/* Page header */}
                <div className="mb-12 md:mb-20">
                    <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                        <span className="w-6 md:w-8 h-[1px] bg-gold-400/60" aria-hidden="true" />
                        <span className="text-[10px] tracking-[0.3em] md:tracking-[0.4em] text-gold-400 uppercase font-medium">
                            {dict.work.eyebrow}
                        </span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-heading font-bold uppercase tracking-tight mb-4 md:mb-6 text-white leading-[0.85]">
                        {dict.work.title}{' '}
                        <span className="gradient-text">{dict.work.titleHighlight}</span>
                    </h1>
                    <p className="text-gray-400 max-w-xl text-base md:text-lg font-light leading-relaxed">
                        {dict.work.subtitle}
                    </p>
                </div>

                {/* Category grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
                    {rootCategories.map((category, index) => {
                        const representativeProject = projects.find((p) => p.category === category.name && p.cover_image);
                        const thumbnail = representativeProject?.cover_image || null;
                        const projectCount = projects.filter((p) => p.category === category.name).length;

                        return (
                            <Link
                                href={`/${locale}/work/category/${encodeURIComponent(category.name)}`}
                                key={category.id}
                                className={`group block relative rounded-2xl overflow-hidden card-cinematic bg-obsidian-800 border border-white/[0.04] ${
                                    index === 0 ? 'sm:col-span-2 aspect-[16/9]' : 'aspect-[4/3]'
                                }`}
                            >
                                {thumbnail ? (
                                    <Image
                                        src={thumbnail}
                                        alt={`${category.name} - category cover image`}
                                        fill
                                        className="object-cover cinematic-image group-hover:scale-105 transition-transform duration-[1.2s] ease-out"
                                        sizes={index === 0
                                            ? "(max-width: 640px) 100vw, (max-width: 1024px) 66vw, 50vw"
                                            : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        }
                                        loading={index < 2 ? "eager" : "lazy"}
                                        quality={80}
                                    />
                                ) : (
                                    <div className="absolute inset-0 bg-gradient-to-br from-obsidian-700 to-obsidian-900 flex items-center justify-center">
                                        <span className="text-4xl md:text-6xl font-heading font-bold text-white/[0.03] uppercase">{category.name}</span>
                                    </div>
                                )}

                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-700 z-10" aria-hidden="true" />
                                <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent z-10" aria-hidden="true" />

                                <div className="absolute bottom-0 left-0 w-full p-5 md:p-8 z-20 flex flex-col justify-end h-full">
                                    <div className="mb-auto">
                                        <span className="inline-flex items-center px-2.5 py-1 md:px-3 md:py-1.5 bg-gold-400/10 border border-gold-400/20 rounded-full text-[9px] uppercase tracking-[0.2em] text-gold-400 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                            {projectCount} {projectCount === 1 ? dict.work.project : dict.work.projects}
                                        </span>
                                    </div>

                                    <div>
                                        <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
                                            <span className="w-4 md:w-6 h-[1px] bg-gold-400/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true" />
                                            <p className="text-gold-400 text-[9px] tracking-[0.3em] uppercase font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                                {dict.work.explore}
                                            </p>
                                        </div>
                                        <h3 className={`font-heading font-bold uppercase text-white group-hover:text-gold-400 transition-colors duration-500 tracking-wide ${
                                            index === 0 ? 'text-2xl md:text-3xl lg:text-4xl' : 'text-xl md:text-2xl'
                                        }`}>
                                            {category.name}
                                        </h3>

                                        <div className="mt-3 md:mt-4 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                                            <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-gold-400">
                                                {dict.work.viewProjects}
                                                <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {rootCategories.length === 0 && (
                    <div className="text-center py-20 md:py-32 glass rounded-3xl">
                        <p className="text-gray-500 text-sm uppercase tracking-widest mb-2">{dict.work.noCategories}</p>
                        <p className="text-gray-600 text-xs">{dict.work.addFromAdmin}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
