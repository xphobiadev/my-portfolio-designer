import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getProjectBySlug } from '@/lib/data';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, Play } from 'lucide-react';
import { getDictionary } from '@/i18n/getDictionary';
import type { Locale } from '@/i18n/config';

export default async function ProjectDetail({ params }: { params: Promise<{ locale: string; slug: string }> }) {
    const { locale, slug } = await params;
    const dict = await getDictionary(locale as Locale);
    const project = await getProjectBySlug(slug);

    if (!project) return notFound();

    return (
        <div className="pt-24 md:pt-28 pb-0 relative">
            <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gold-400/[0.02] rounded-full blur-[200px] pointer-events-none" aria-hidden="true" />

            {/* Back link + title */}
            <div className="container mx-auto px-4 sm:px-6 md:px-12 mb-8 md:mb-12 relative z-10">
                <Link
                    href={`/${locale}/work`}
                    className="group inline-flex items-center gap-2 md:gap-3 text-[10px] uppercase tracking-[0.25em] md:tracking-[0.3em] text-gray-500 hover:text-gold-400 transition-all duration-500 mb-8 md:mb-12"
                >
                    <ArrowLeft className="w-3.5 h-3.5 md:w-4 md:h-4 group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
                    {dict.work.backToWork}
                </Link>

                <div className="max-w-5xl">
                    <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                        <span className="w-6 md:w-8 h-[1px] bg-gold-400/60" aria-hidden="true" />
                        <span className="text-gold-400 text-[10px] tracking-[0.3em] md:tracking-[0.4em] uppercase font-medium">{project.category}</span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-heading font-bold uppercase mb-4 md:mb-6 leading-[0.85] tracking-tight text-white">
                        {project.title}
                    </h1>
                    <p className="text-base md:text-xl lg:text-2xl text-gray-400 font-light max-w-3xl leading-relaxed">
                        {project.subtitle}
                    </p>
                </div>
            </div>

            {/* Cover image */}
            {project.cover_image ? (
                <div className="relative w-full aspect-[16/9] md:aspect-[21/9] bg-obsidian-800 mb-12 md:mb-20 overflow-hidden letterbox">
                    <Image
                        src={project.cover_image}
                        alt={project.title}
                        fill
                        className="object-cover cinematic-image"
                        sizes="100vw"
                        priority
                        quality={85}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/30" aria-hidden="true" />
                </div>
            ) : (
                <div className="w-full aspect-[16/9] md:aspect-[21/9] bg-obsidian-800 mb-12 md:mb-20 relative flex items-center justify-center border-y border-white/[0.03]">
                    <span className="text-gray-700 font-heading tracking-[0.3em] uppercase text-sm">No Cover Image</span>
                </div>
            )}

            {/* Content */}
            <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 mb-20 md:mb-32">
                    {/* Main content */}
                    <div className="lg:col-span-8 order-2 lg:order-1">
                        <h2 className="text-xl md:text-2xl font-heading font-bold mb-6 md:mb-8 tracking-wide text-white uppercase flex items-center gap-3 md:gap-4">
                            <span className="w-5 md:w-6 h-[1px] bg-gold-400/60" aria-hidden="true" />
                            Overview
                        </h2>
                        <p className="text-gray-300 leading-relaxed font-light text-base md:text-lg mb-10 md:mb-16">
                            {project.description}
                        </p>

                        <div className="space-y-8 md:space-y-12">
                            {project.problem && (
                                <div className="relative pl-6 md:pl-8 border-l-2 border-gold-400/30">
                                    <div className="absolute top-0 left-[-5px] w-2 h-2 rounded-full bg-gold-400" aria-hidden="true" />
                                    <h3 className="text-[11px] tracking-[0.25em] text-gold-400 uppercase mb-3 md:mb-4 font-bold">The Challenge</h3>
                                    <p className="text-gray-300 leading-relaxed font-light text-sm md:text-base">{project.problem}</p>
                                </div>
                            )}
                            {project.solution && (
                                <div className="relative pl-6 md:pl-8 border-l-2 border-white/10">
                                    <div className="absolute top-0 left-[-5px] w-2 h-2 rounded-full bg-white/30" aria-hidden="true" />
                                    <h3 className="text-[11px] tracking-[0.25em] text-white uppercase mb-3 md:mb-4 font-bold">The Solution</h3>
                                    <p className="text-gray-300 leading-relaxed font-light text-sm md:text-base">{project.solution}</p>
                                </div>
                            )}
                            {project.result && (
                                <div className="relative pl-6 md:pl-8 border-l-2 border-white/10">
                                    <div className="absolute top-0 left-[-5px] w-2 h-2 rounded-full bg-white/30" aria-hidden="true" />
                                    <h3 className="text-[11px] tracking-[0.25em] text-white uppercase mb-3 md:mb-4 font-bold">The Result</h3>
                                    <p className="text-gray-300 leading-relaxed font-light text-sm md:text-base">{project.result}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-4 order-1 lg:order-2">
                        <div className="lg:sticky lg:top-32 space-y-6 md:space-y-8 p-5 md:p-8 rounded-2xl border border-white/[0.04] bg-white/[0.01] backdrop-blur-sm">
                            {project.tags && project.tags.length > 0 && (
                                <div>
                                    <h3 className="text-[9px] tracking-[0.3em] text-gray-500 uppercase mb-3 md:mb-4 font-bold">Role & Services</h3>
                                    <div className="flex flex-wrap gap-1.5 md:gap-2">
                                        {project.tags.map((tag: string) => (
                                            <span
                                                key={tag}
                                                className="text-[10px] px-2.5 py-1 md:px-3 md:py-1.5 border border-white/[0.06] rounded-full text-gray-400 font-light hover:border-gold-400/30 hover:text-gold-400 transition-all duration-500 cursor-default"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {project.tools && project.tools.length > 0 && (
                                <div>
                                    <h3 className="text-[9px] tracking-[0.3em] text-gray-500 uppercase mb-3 md:mb-4 font-bold">Tools & Pipeline</h3>
                                    <div className="flex flex-wrap gap-1.5 md:gap-2">
                                        {project.tools.map((tool: string) => (
                                            <span
                                                key={tool}
                                                className="text-[10px] px-2.5 py-1 md:px-3 md:py-1.5 border border-white/[0.06] rounded-full text-gray-400 font-light hover:border-gold-400/30 hover:text-gold-400 transition-all duration-500 cursor-default"
                                            >
                                                {tool}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="pt-4 md:pt-6 border-t border-white/[0.04]">
                                <Link
                                    href={`/${locale}/contact`}
                                    className="group flex items-center justify-between w-full px-4 md:px-5 py-3.5 md:py-4 bg-gold-400/10 border border-gold-400/20 rounded-xl text-[10px] uppercase tracking-[0.15em] text-gold-400 hover:bg-gold-400 hover:text-black transition-all duration-500"
                                >
                                    {dict.contact.eyebrow}
                                    <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" aria-hidden="true" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Media sections */}
                <div className="space-y-16 md:space-y-32 mb-16 md:mb-32">
                    {/* Gallery */}
                    {project.gallery && project.gallery.length > 0 && (
                        <div>
                            <h2 className="text-xl md:text-2xl font-heading font-bold mb-8 md:mb-12 tracking-wide text-white uppercase flex items-center gap-3 md:gap-4">
                                <span className="w-5 md:w-6 h-[1px] bg-gold-400/60" aria-hidden="true" />
                                Gallery
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                                {project.gallery.map((img: string, i: number) => (
                                    <div
                                        key={i}
                                        className={`relative rounded-xl md:rounded-2xl overflow-hidden border border-white/[0.04] group ${
                                            i === 0 ? 'md:col-span-2 aspect-[16/9]' : 'aspect-[4/3]'
                                        }`}
                                    >
                                        <Image
                                            src={img}
                                            alt={`${project.title} - Image ${i + 1}`}
                                            fill
                                            className="object-cover cinematic-image group-hover:scale-[1.03] transition-transform duration-[1.2s]"
                                            sizes={i === 0
                                                ? "(max-width: 768px) 100vw, 100vw"
                                                : "(max-width: 768px) 100vw, 50vw"
                                            }
                                            loading={i < 2 ? "eager" : "lazy"}
                                            quality={80}
                                        />
                                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700" aria-hidden="true" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Video */}
                    {project.video_url && (
                        <div>
                            <h2 className="text-xl md:text-2xl font-heading font-bold mb-8 md:mb-12 tracking-wide text-white uppercase flex items-center gap-3 md:gap-4">
                                <span className="w-5 md:w-6 h-[1px] bg-gold-400/60" aria-hidden="true" />
                                Video
                            </h2>
                            <div className="relative aspect-video rounded-xl md:rounded-2xl overflow-hidden border border-white/[0.04] bg-obsidian-900">
                                <video
                                    controls
                                    className="w-full h-full object-contain"
                                    src={project.video_url}
                                    preload="metadata"
                                    poster={project.cover_image || undefined}
                                    playsInline
                                >
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        </div>
                    )}

                    {/* Audio */}
                    {project.audio_url && (
                        <div>
                            <h2 className="text-xl md:text-2xl font-heading font-bold mb-8 md:mb-12 tracking-wide text-white uppercase flex items-center gap-3 md:gap-4">
                                <span className="w-5 md:w-6 h-[1px] bg-gold-400/60" aria-hidden="true" />
                                Audio
                            </h2>
                            <div className="relative rounded-xl md:rounded-2xl overflow-hidden border border-white/[0.04] bg-obsidian-800/50 backdrop-blur-sm p-6 md:p-10">
                                <div className="flex items-center gap-4 md:gap-6 mb-5 md:mb-6">
                                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gold-400/10 border border-gold-400/20 flex items-center justify-center flex-shrink-0">
                                        <Play className="w-5 h-5 md:w-6 md:h-6 text-gold-400 ml-1" aria-hidden="true" />
                                    </div>
                                    <div>
                                        <p className="text-white font-heading font-medium text-sm md:text-base">{project.title}</p>
                                        <p className="text-xs text-gray-500">Audio Track</p>
                                    </div>
                                </div>
                                <audio
                                    controls
                                    className="w-full"
                                    src={project.audio_url}
                                    preload="metadata"
                                >
                                    Your browser does not support the audio element.
                                </audio>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
