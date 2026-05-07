import Image from 'next/image';
import Link from 'next/link';
import { getProjects, getCategoriesList } from '@/lib/data';
import type { Project, Category } from '@/lib/types';
import { ArrowUpRight } from 'lucide-react';
import { getDictionary } from '@/i18n/getDictionary';
import type { Locale } from '@/i18n/config';
import TextReveal from '@/components/TextReveal';
import FloatingElements from '@/components/FloatingElements';
import TiltCard from '@/components/TiltCard';

export const dynamic = 'force-dynamic';

export default async function WorkPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const dict = await getDictionary(locale as Locale);
    const categories: Category[] = await getCategoriesList();
    const projects: Project[] = await getProjects();

    const rootCategories = categories.filter(c => !c.parent_id);

    return (
        <main role="main" className="relative overflow-x-hidden" style={{ minHeight: '100vh' }}>
            {/* Background floating elements */}
            <FloatingElements count={6} className="opacity-30" />

            {/* Hero Section */}
            <section className="pt-32 md:pt-44 pb-16 md:pb-24 relative">
                <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10">
                    <div className="max-w-4xl">
                        <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8 reveal">
                            <span className="w-8 md:w-12 h-[1px]" style={{ backgroundColor: 'var(--color-accent)' }} aria-hidden="true" />
                            <span className="text-[10px] tracking-[0.3em] md:tracking-[0.4em] uppercase font-medium" style={{ color: 'var(--color-accent)' }}>
                                {dict.work.eyebrow}
                            </span>
                        </div>

                        <TextReveal
                            text={`${dict.work.title} ${dict.work.titleHighlight}`}
                            as="h1"
                            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-bold uppercase tracking-tight leading-[0.85] gradient-text"
                            splitBy="char"
                            animation="fade-up"
                        />

                        <TextReveal
                            text={dict.work.subtitle}
                            as="p"
                            className="mt-6 md:mt-8 text-base md:text-lg lg:text-xl font-light leading-relaxed max-w-xl"
                            style={{ color: 'var(--color-text-secondary)' }}
                            splitBy="word"
                            animation="fade-up"
                            delay={0.4}
                        />
                    </div>
                </div>
            </section>

            {/* Category Grid */}
            <section className="pb-24 md:pb-40 relative z-10">
                <div className="container mx-auto px-4 sm:px-6 md:px-12">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
                        {rootCategories.map((category, index) => {
                            const representativeProject = projects.find((p) => p.category === category.name && p.cover_image);
                            const thumbnail = representativeProject?.cover_image || null;
                            const projectCount = projects.filter((p) => p.category === category.name).length;
                            const staggerClass = `stagger-${(index % 5) + 1}`;

                            return (
                                <div key={category.id} className={`reveal reveal-scale ${staggerClass} ${index === 0 ? 'sm:col-span-2' : ''}`}>
                                    <TiltCard
                                        className="rounded-2xl"
                                        tiltStrength={8}
                                        scale={1.02}
                                        glare={true}
                                    >
                                        <Link
                                            href={`/${locale}/work/category/${encodeURIComponent(category.name)}`}
                                            className={`group block relative rounded-2xl overflow-hidden border transition-all duration-700 ${
                                                index === 0 ? 'aspect-[16/9]' : 'aspect-[4/3]'
                                            }`}
                                            style={{
                                                borderColor: 'var(--color-border)',
                                                backgroundColor: 'var(--color-bg-secondary)',
                                            }}
                                        >
                                            {thumbnail ? (
                                                <Image
                                                    src={thumbnail}
                                                    alt={`${category.name} - category cover image`}
                                                    fill
                                                    className="object-cover group-hover:scale-110 transition-transform duration-[1.4s] ease-out"
                                                    sizes={index === 0
                                                        ? "(max-width: 640px) 100vw, (max-width: 1024px) 66vw, 50vw"
                                                        : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                                    }
                                                    loading={index < 2 ? "eager" : "lazy"}
                                                    quality={80}
                                                />
                                            ) : (
                                                <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, var(--color-bg-secondary), var(--color-bg-tertiary))' }}>
                                                    <span className="text-4xl md:text-6xl font-heading font-bold uppercase opacity-[0.03]" style={{ color: 'var(--color-text)' }}>{category.name}</span>
                                                </div>
                                            )}

                                            {/* Gradient overlays */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-700 z-10" aria-hidden="true" />
                                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10" style={{ background: 'linear-gradient(135deg, var(--color-accent)/10, transparent)' }} aria-hidden="true" />

                                            {/* Content overlay */}
                                            <div className="absolute bottom-0 left-0 w-full p-5 md:p-8 z-20 flex flex-col justify-end h-full">
                                                <div className="mb-auto">
                                                    <span className="inline-flex items-center px-2.5 py-1 md:px-3 md:py-1.5 rounded-full text-[9px] uppercase tracking-[0.2em] backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                                        style={{
                                                            backgroundColor: 'var(--color-accent)/10',
                                                            border: '1px solid var(--color-accent)/20',
                                                            color: 'var(--color-accent)',
                                                        }}
                                                    >
                                                        {projectCount} {projectCount === 1 ? dict.work.project : dict.work.projects}
                                                    </span>
                                                </div>

                                                <div>
                                                    <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
                                                        <span className="w-4 md:w-6 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ backgroundColor: 'var(--color-accent)' }} aria-hidden="true" />
                                                        <p className="text-[9px] tracking-[0.3em] uppercase font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ color: 'var(--color-accent)' }}>
                                                            {dict.work.explore}
                                                        </p>
                                                    </div>
                                                    <h3 className={`font-heading font-bold uppercase tracking-wide transition-colors duration-500 group-hover:text-[var(--color-accent)] ${
                                                        index === 0 ? 'text-2xl md:text-3xl lg:text-4xl' : 'text-xl md:text-2xl'
                                                    }`} style={{ color: 'var(--color-text)' }}>
                                                        {category.name}
                                                    </h3>

                                                    <div className="mt-3 md:mt-4 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                                                        <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em]" style={{ color: 'var(--color-accent)' }}>
                                                            {dict.work.viewProjects}
                                                            <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </TiltCard>
                                </div>
                            );
                        })}
                    </div>

                    {/* Empty state */}
                    {rootCategories.length === 0 && (
                        <div className="text-center py-24 md:py-40 glass rounded-3xl">
                            <p className="text-sm uppercase tracking-widest mb-3" style={{ color: 'var(--color-text-muted)' }}>{dict.work.noCategories}</p>
                            <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{dict.work.addFromAdmin}</p>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
