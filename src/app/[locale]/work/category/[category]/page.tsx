import Image from 'next/image';
import Link from 'next/link';
import { getProjects } from '@/lib/data';
import type { Project } from '@/lib/types';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { getDictionary } from '@/i18n/getDictionary';
import type { Locale } from '@/i18n/config';

export const dynamic = 'force-dynamic';

export default async function CategoryPage({ params }: { params: Promise<{ locale: string; category: string }> }) {
    const { locale, category } = await params;
    const dict = await getDictionary(locale as Locale);
    const decodedCategory = decodeURIComponent(category);

    const allProjects = await getProjects();
    const projects = allProjects.filter((p: Project) => p.category === decodedCategory);

    return (
        <div className="pt-24 md:pt-32 pb-16 md:pb-24 relative">
            <div className="absolute top-0 left-0 w-full h-[300px] bg-gradient-to-b from-gold-400/[0.02] to-transparent pointer-events-none" aria-hidden="true" />

            <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10">
                {/* Back link */}
                <Link
                    href={`/${locale}/work`}
                    className="group inline-flex items-center gap-2 md:gap-3 text-[10px] uppercase tracking-[0.25em] md:tracking-[0.3em] text-gray-500 hover:text-gold-400 transition-all duration-500 mb-8 md:mb-12"
                >
                    <ArrowLeft className="w-3.5 h-3.5 md:w-4 md:h-4 group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
                    {dict.work.backToWork}
                </Link>

                {/* Page header */}
                <div className="mb-10 md:mb-16">
                    <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                        <span className="w-6 md:w-8 h-[1px] bg-gold-400/60" aria-hidden="true" />
                        <span className="text-[10px] tracking-[0.3em] md:tracking-[0.4em] text-gold-400 uppercase font-medium">
                            {projects.length} {projects.length === 1 ? dict.work.project : dict.work.projects}
                        </span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-heading font-bold uppercase tracking-tight text-white leading-[0.85]">
                        {decodedCategory}
                    </h1>
                </div>

                {/* Projects grid */}
                {projects.length === 0 ? (
                    <div className="text-center py-20 md:py-32 rounded-3xl border border-white/[0.04] bg-white/[0.01]">
                        <p className="text-gray-500 text-sm uppercase tracking-widest mb-2">{dict.work.noProjectsInCategory}</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
                        {projects.map((project: Project, index: number) => (
                            <Link
                                href={`/${locale}/work/${project.slug}`}
                                key={project.id}
                                className={`group block relative rounded-2xl overflow-hidden card-cinematic bg-obsidian-800 border border-white/[0.04] ${
                                    index === 0 && projects.length > 2 ? 'sm:col-span-2 aspect-[16/9]' : 'aspect-[4/3]'
                                }`}
                            >
                                {project.cover_image && (
                                    <Image
                                        src={project.cover_image}
                                        alt={`${project.title} - ${project.category} project`}
                                        fill
                                        className="object-cover cinematic-image group-hover:scale-105 transition-transform duration-[1.2s] ease-out"
                                        sizes={index === 0 && projects.length > 2
                                            ? "(max-width: 640px) 100vw, (max-width: 1024px) 66vw, 50vw"
                                            : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        }
                                        loading={index < 2 ? "eager" : "lazy"}
                                        quality={80}
                                    />
                                )}

                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-700 z-10" aria-hidden="true" />

                                <div className="absolute bottom-0 left-0 w-full p-4 md:p-6 lg:p-8 z-20 translate-y-2 group-hover:translate-y-0 transition-transform duration-700">
                                    <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
                                        <span className="w-4 md:w-6 h-[1px] bg-gold-400/60" aria-hidden="true" />
                                        <p className="text-gold-400 text-[9px] tracking-[0.3em] uppercase font-medium">{project.category}</p>
                                    </div>
                                    <h3 className={`font-heading font-bold text-white mb-1.5 md:mb-2 tracking-wide uppercase group-hover:text-gold-400 transition-colors duration-500 ${
                                        index === 0 && projects.length > 2 ? 'text-xl md:text-2xl lg:text-3xl' : 'text-base md:text-lg'
                                    }`}>
                                        {project.title}
                                    </h3>
                                    <p className="text-xs text-gray-400 font-light opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 max-w-sm line-clamp-2">
                                        {project.description}
                                    </p>

                                    <div className="mt-3 md:mt-4 opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all duration-500 delay-200">
                                        <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 text-gold-400" aria-hidden="true" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
