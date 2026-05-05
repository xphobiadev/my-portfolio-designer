import { getSettings } from '@/lib/data';
import AboutImage from '@/components/AboutImage';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { getDictionary } from '@/i18n/getDictionary';
import type { Locale } from '@/i18n/config';

export default async function About({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const dict = await getDictionary(locale as Locale);
    const settings = await getSettings();

    const expertise = [
        { title: dict.about.expertise1Title, desc: dict.about.expertise1Desc, tools: dict.about.expertise1Tools, number: '01' },
        { title: dict.about.expertise2Title, desc: dict.about.expertise2Desc, tools: dict.about.expertise2Tools, number: '02' },
        { title: dict.about.expertise3Title, desc: dict.about.expertise3Desc, tools: dict.about.expertise3Tools, number: '03' },
        { title: dict.about.expertise4Title, desc: dict.about.expertise4Desc, tools: dict.about.expertise4Tools, number: '04' },
        { title: dict.about.expertise5Title, desc: dict.about.expertise5Desc, tools: dict.about.expertise5Tools, number: '05' },
        { title: dict.about.expertise6Title, desc: dict.about.expertise6Desc, tools: dict.about.expertise6Tools, number: '06' }
    ];

    const timeline = [
        { year: dict.about.timeline1Year, label: dict.about.timeline1Label, desc: dict.about.timeline1Desc },
        { year: dict.about.timeline2Year, label: dict.about.timeline2Label, desc: dict.about.timeline2Desc },
        { year: dict.about.timeline3Year, label: dict.about.timeline3Label, desc: dict.about.timeline3Desc },
        { year: dict.about.timeline4Year, label: dict.about.timeline4Label, desc: dict.about.timeline4Desc }
    ];

    return (
        <div className="pt-24 md:pt-32 pb-0 relative">
            <div className="absolute top-0 right-0 w-1/2 h-[600px] bg-gradient-to-l from-gold-400/[0.02] to-transparent blur-3xl pointer-events-none" aria-hidden="true" />

            <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10">
                {/* Hero grid: image + bio */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-20 items-start">
                    {/* Portrait */}
                    <div className="lg:col-span-5 relative">
                        <div className="relative aspect-[3/4] w-full max-w-sm mx-auto sm:max-w-md lg:max-w-none rounded-3xl overflow-hidden group">
                            <div className="absolute inset-0 bg-obsidian-800 rounded-3xl overflow-hidden border border-white/[0.04]">
                                <AboutImage src={settings?.about_image} />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10 pointer-events-none" aria-hidden="true" />
                            <div className="absolute -inset-3 border border-gold-400/10 rounded-[2rem] pointer-events-none" aria-hidden="true" />
                            <div className="absolute -inset-6 border border-gold-400/5 rounded-[2.5rem] pointer-events-none hidden sm:block" aria-hidden="true" />
                        </div>
                        {/* Years badge */}
                        <div className="absolute -bottom-4 right-0 sm:-right-4 lg:right-4 bg-obsidian-900/90 backdrop-blur-xl border border-gold-400/20 rounded-2xl px-4 md:px-6 py-3 md:py-4 z-20">
                            <p className="text-2xl md:text-3xl font-heading font-bold gradient-text">10+</p>
                            <p className="text-[9px] uppercase tracking-[0.2em] text-gray-500">{dict.about.yearsOfCraft}</p>
                        </div>
                    </div>

                    {/* Bio */}
                    <div className="lg:col-span-7 lg:pt-8 mt-8 sm:mt-0">
                        <div className="flex items-center gap-3 md:gap-4 mb-5 md:mb-6">
                            <span className="w-6 md:w-8 h-[1px] bg-gold-400/60" aria-hidden="true" />
                            <span className="text-[10px] tracking-[0.3em] md:tracking-[0.4em] text-gold-400 uppercase font-medium">{dict.about.eyebrow}</span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold uppercase leading-[0.85] tracking-tight mb-6 md:mb-8 text-white">
                            {dict.about.title}{' '}
                            <br className="hidden sm:block" />
                            <span className="gradient-text">{dict.about.titleHighlight}</span>
                        </h1>

                        {settings?.about_bio ? (
                            <div className="space-y-4 md:space-y-5 text-gray-400 leading-relaxed font-light text-base md:text-lg">
                                {settings.about_bio.split('\n').filter(Boolean).map((paragraph, i) => (
                                    <p key={i}>{paragraph}</p>
                                ))}
                            </div>
                        ) : (
                            <>
                                <p className="text-lg md:text-xl lg:text-2xl font-heading font-light leading-relaxed text-gray-300 mb-6 md:mb-8">
                                    {dict.about.intro}
                                </p>
                                <div className="space-y-4 md:space-y-5 text-gray-400 leading-relaxed font-light text-base md:text-lg">
                                    <p>{dict.about.bio1}</p>
                                    <p>{dict.about.bio2}</p>
                                    <p>{dict.about.bio3}</p>
                                </div>
                            </>
                        )}

                        <div className="flex flex-wrap gap-3 md:gap-4 mt-8 md:mt-10">
                            <Link
                                href={`/${locale}/work`}
                                className="group inline-flex items-center gap-2 px-4 md:px-5 py-2.5 md:py-3 border border-white/10 rounded-full text-[10px] uppercase tracking-[0.2em] text-gray-400 hover:text-gold-400 hover:border-gold-400/30 transition-all duration-500"
                            >
                                {dict.about.viewWork}
                                <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" aria-hidden="true" />
                            </Link>
                            <Link
                                href={`/${locale}/contact`}
                                className="group inline-flex items-center gap-2 px-4 md:px-5 py-2.5 md:py-3 bg-gold-400/10 border border-gold-400/20 rounded-full text-[10px] uppercase tracking-[0.2em] text-gold-400 hover:bg-gold-400 hover:text-black transition-all duration-500"
                            >
                                {dict.about.getInTouch}
                                <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" aria-hidden="true" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── EXPERTISE ── */}
            <div className="container mx-auto px-4 sm:px-6 md:px-12 mt-24 md:mt-40 relative z-10">
                <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                    <span className="w-6 md:w-8 h-[1px] bg-gold-400/60" aria-hidden="true" />
                    <span className="text-[10px] tracking-[0.3em] md:tracking-[0.4em] text-gold-400 uppercase font-medium">{dict.about.whatIDo}</span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold uppercase tracking-tight mb-10 md:mb-16 text-white">
                    {dict.about.areasOfExpertise}
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {expertise.map((service, i) => (
                        <div
                            key={i}
                            className="group relative p-6 md:p-8 rounded-2xl border border-white/[0.04] bg-white/[0.01] hover:bg-white/[0.03] hover:border-gold-400/15 transition-all duration-700 card-cinematic overflow-hidden"
                        >
                            <span className="absolute top-4 right-4 md:top-6 md:right-6 text-4xl md:text-5xl font-heading font-bold text-white/[0.03] group-hover:text-gold-400/10 transition-colors duration-700" aria-hidden="true">
                                {service.number}
                            </span>
                            <div className="relative z-10">
                                <h3 className="text-base md:text-lg font-heading font-semibold tracking-wide text-white mb-2 md:mb-3 group-hover:text-gold-400 transition-colors duration-500">
                                    {service.title}
                                </h3>
                                <p className="text-xs md:text-sm font-light text-gray-500 mb-4 md:mb-5 leading-relaxed group-hover:text-gray-400 transition-colors duration-500">
                                    {service.desc}
                                </p>
                                <div className="pt-3 md:pt-4 border-t border-white/[0.04]">
                                    <p className="text-[10px] tracking-[0.15em] uppercase text-gray-600 group-hover:text-gray-500 transition-colors duration-500">
                                        {service.tools}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── PHILOSOPHY QUOTE ── */}
            <div className="relative mt-24 md:mt-40 py-20 md:py-32 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-obsidian-800/40 to-transparent" aria-hidden="true" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-400/[0.03] rounded-full blur-[150px] pointer-events-none" aria-hidden="true" />
                <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="flex items-center justify-center gap-3 md:gap-4 mb-6 md:mb-8">
                            <span className="w-8 md:w-12 h-[1px] bg-gold-400/40" aria-hidden="true" />
                            <span className="text-[10px] tracking-[0.3em] md:tracking-[0.4em] text-gold-400 uppercase font-medium">{dict.about.philosophy}</span>
                            <span className="w-8 md:w-12 h-[1px] bg-gold-400/40" aria-hidden="true" />
                        </div>
                        <blockquote className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-heading font-light leading-[1.2] text-white/90">
                            &ldquo;{dict.about.quote}{' '}
                            <span className="gradient-text font-medium">{dict.about.quoteHighlight}</span>&rdquo;
                        </blockquote>
                    </div>
                </div>
            </div>

            {/* ── TIMELINE ── */}
            <div className="container mx-auto px-4 sm:px-6 md:px-12 py-20 md:py-32 relative z-10">
                <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                    <span className="w-6 md:w-8 h-[1px] bg-gold-400/60" aria-hidden="true" />
                    <span className="text-[10px] tracking-[0.3em] md:tracking-[0.4em] text-gold-400 uppercase font-medium">{dict.about.journey}</span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold uppercase tracking-tight mb-10 md:mb-16 text-white">
                    {dict.about.myPath}
                </h2>

                <div className="relative">
                    {/* Horizontal connector line — desktop only */}
                    <div className="hidden md:block absolute top-8 left-0 right-0 h-[1px] bg-gradient-to-r from-gold-400/20 via-white/5 to-gold-400/20" aria-hidden="true" />

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-8">
                        {timeline.map((item) => (
                            <div key={item.year} className="relative group cursor-default">
                                <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                                    <div className="relative flex-shrink-0">
                                        <div className="w-4 h-4 rounded-full border-2 border-gold-400/30 bg-background group-hover:bg-gold-400 group-hover:border-gold-400 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.5)] transition-all duration-700 z-10 relative" />
                                        <div className="absolute inset-0 w-4 h-4 rounded-full bg-gold-400/20 animate-ping opacity-0 group-hover:opacity-100" aria-hidden="true" />
                                    </div>
                                    <p className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold gradient-text group-hover:text-glow transition-all duration-500">
                                        {item.year}
                                    </p>
                                </div>
                                <div className="ml-7 md:ml-8">
                                    <p className="text-sm uppercase tracking-[0.15em] text-white/80 mb-1.5 md:mb-2 group-hover:text-gold-400 transition-colors duration-500 font-medium">
                                        {item.label}
                                    </p>
                                    <p className="text-xs text-gray-600 font-light leading-relaxed group-hover:text-gray-400 transition-colors duration-500 max-w-[200px]">
                                        {item.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
