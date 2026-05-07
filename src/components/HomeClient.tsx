'use client';

import { useRef } from 'react';
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, ChevronDown, Palette, Camera, Film, Music, Code, Calendar } from "lucide-react";
import TextReveal from "@/components/TextReveal";
import MagneticButton from "@/components/MagneticButton";
import TiltCard from "@/components/TiltCard";
import ParallaxSection from "@/components/ParallaxSection";
import AnimatedCounter from "@/components/AnimatedCounter";
import FloatingElements from "@/components/FloatingElements";
import type { Project, SiteSettings } from "@/lib/types";

interface HomeClientProps {
  locale: string;
  dict: Record<string, any>;
  projects: Project[];
  settings: SiteSettings | null;
}

export default function HomeClient({ locale, dict, projects, settings }: HomeClientProps) {
  const heroRef = useRef<HTMLElement>(null);

  const skills = [
    { title: dict.home.skillsDesign, desc: dict.home.skillsDesignDesc, icon: "palette" },
    { title: dict.home.skillsPhoto, desc: dict.home.skillsPhotoDesc, icon: "camera" },
    { title: dict.home.skillsVideo, desc: dict.home.skillsVideoDesc, icon: "film" },
    { title: dict.home.skillsAudio, desc: dict.home.skillsAudioDesc, icon: "music" },
    { title: dict.home.skillsDev, desc: dict.home.skillsDevDesc, icon: "code" },
    { title: dict.home.skillsEvents, desc: dict.home.skillsEventsDesc, icon: "calendar" },
    { title: dict.home.skillsDecor, desc: dict.home.skillsDecorDesc, icon: "palette2" },
  ];

  const getSkillIcon = (icon: string) => {
    switch (icon) {
      case "palette": return <Palette className="w-6 h-6" />;
      case "camera": return <Camera className="w-6 h-6" />;
      case "film": return <Film className="w-6 h-6" />;
      case "music": return <Music className="w-6 h-6" />;
      case "code": return <Code className="w-6 h-6" />;
      case "calendar": return <Calendar className="w-6 h-6" />;
      case "palette2": return <Palette className="w-6 h-6" />;
      default: return <Palette className="w-6 h-6" />;
    }
  };

  const stats = [
    { value: parseInt(settings?.stat_years || '20'), suffix: '+', label: settings?.stat_years_label || dict.home.yearsExperience },
    { value: parseInt(settings?.stat_projects || '120'), suffix: '+', label: settings?.stat_projects_label || dict.home.projectsDelivered },
    { value: parseInt(settings?.stat_awards || '30'), suffix: '+', label: settings?.stat_awards_label || dict.home.awardsWon },
    { value: parseInt(settings?.stat_clients || '50'), suffix: '+', label: settings?.stat_clients_label || dict.home.happyClients },
  ];

  return (
    <>
      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 1: HERO — Full Viewport with 3D/4D Effects
          ══════════════════════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="hero-section relative w-full flex items-center justify-center overflow-hidden perspective-deep"
        aria-label="Hero introduction"
      >
        {/* Background layers */}
        <div className="absolute inset-0 z-0">
          {settings?.hero_video_url && (
            <video
              autoPlay
              loop
              muted
              playsInline
              controls={false}
              preload="none"
              poster={settings.hero_image_url ?? undefined}
              className="hero-video opacity-40"
              src={settings.hero_video_url}
              aria-hidden="true"
            />
          )}
          {!settings?.hero_video_url && settings?.hero_image_url && (
            <Image
              src={settings.hero_image_url}
              alt=""
              fill
              className="object-cover opacity-40 scale-110"
              priority
              sizes="100vw"
              quality={75}
              aria-hidden="true"
            />
          )}
          {!settings?.hero_video_url && !settings?.hero_image_url && (
            <div className="absolute inset-0 hero-fallback-bg" aria-hidden="true" />
          )}
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-bg)] via-transparent to-[var(--color-bg)] z-10" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-bg)]/80 via-transparent to-[var(--color-bg)]/80 z-10" aria-hidden="true" />
        </div>

        {/* Floating elements in background */}
        <FloatingElements count={8} className="z-20 opacity-50" />

        {/* Hero Content */}
        <div className="container mx-auto px-5 sm:px-8 md:px-12 z-30 pt-32 md:pt-40 pb-32 md:pb-40 w-full">
          <div className="max-w-5xl mx-auto text-center">
            {/* Eyebrow */}
            <div className="flex justify-center mb-8 reveal stagger-1">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)]/50 backdrop-blur-sm text-[10px] uppercase tracking-[0.3em] text-[var(--color-accent)]">
                {settings?.site_title || dict.home.heroEyebrow}
              </span>
            </div>

            {/* Main heading with TextReveal - character by character */}
            <div className="mb-8 md:mb-10">
              <TextReveal
                text={settings?.hero_title || dict.home.heroTitle}
                as="h1"
                className="text-[clamp(2.5rem,8vw,7rem)] font-heading font-bold uppercase leading-[0.85] tracking-[-0.02em] text-[var(--color-text)]"
                splitBy="char"
                animation="fade-up"
                delay={0.2}
              />
            </div>

            {/* Subtitle with word-by-word reveal */}
            <div className="mb-10 md:mb-14">
              <TextReveal
                text={settings?.hero_subtitle || dict.home.heroSubtitle}
                as="p"
                className="text-[var(--color-text-secondary)] max-w-2xl mx-auto text-base md:text-lg lg:text-xl font-light leading-relaxed"
                splitBy="word"
                animation="fade-up"
                delay={0.8}
              />
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-5 reveal stagger-3">
              <MagneticButton
                href={settings?.hero_cta_link || `/${locale}/about`}
                className="group inline-flex items-center gap-3 bg-[var(--color-accent)] text-[var(--color-bg)] px-8 md:px-10 py-4 md:py-5 rounded-full text-[11px] tracking-[0.18em] uppercase font-bold hover:shadow-[0_0_60px_var(--color-glow)] transition-all duration-500"
                strength={20}
              >
                <span>{settings?.hero_cta_text || dict.home.exploreCta}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </MagneticButton>
              <MagneticButton
                href={`/${locale}/work`}
                className="group inline-flex items-center gap-3 border border-[var(--color-border-hover)] px-8 md:px-10 py-4 md:py-5 rounded-full text-[11px] tracking-[0.18em] uppercase text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)]/40 transition-all duration-500"
                strength={20}
              >
                <span>{dict.home.watchShowreel}</span>
                <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" aria-hidden="true" />
              </MagneticButton>
            </div>

            {/* Stats with AnimatedCounter */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 md:mt-28 reveal stagger-4">
              {stats.map((stat, i) => (
                <div key={i} className="text-center group cursor-default">
                  <div className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold gradient-text mb-2 group-hover:text-glow transition-all duration-500">
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} duration={2500} />
                  </div>
                  <p className="text-[10px] md:text-[11px] text-[var(--color-text-muted)] uppercase tracking-[0.2em] group-hover:text-[var(--color-text-secondary)] transition-colors duration-300">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2">
          <span className="text-[9px] uppercase tracking-[0.3em] text-[var(--color-text-muted)]">{dict.home.scroll}</span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-[var(--color-accent)] to-transparent animate-bounce" aria-hidden="true" />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 2: FEATURED WORK — 3D Tilt Cards
          ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-32 md:py-40 relative overflow-hidden" aria-label="Featured projects">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[var(--color-accent)]/[0.02] rounded-full blur-[250px] pointer-events-none" aria-hidden="true" />

        <div className="container mx-auto px-5 sm:px-6 md:px-12 relative z-10">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-16 md:mb-20 gap-6">
            <div>
              <div className="flex items-center gap-4 mb-4 reveal">
                <span className="w-8 md:w-12 h-[1px] bg-[var(--color-accent)]/60" aria-hidden="true" />
                <span className="text-[10px] tracking-[0.4em] text-[var(--color-accent)] uppercase font-medium">
                  {settings?.featured_section_title || dict.home.selectedWorks}
                </span>
              </div>
              <TextReveal
                text={settings?.featured_section_subtitle || dict.home.featuredProjects}
                as="h2"
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold uppercase tracking-tight text-[var(--color-text)] leading-tight"
                splitBy="word"
                animation="fade-up"
              />
            </div>
            <Link
              href={`/${locale}/work`}
              className="group inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-all duration-500 border-b border-transparent hover:border-[var(--color-accent)]/30 pb-1 reveal"
            >
              {settings?.featured_view_all_text || dict.home.viewAllProjects}
              <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" aria-hidden="true" />
            </Link>
          </div>

          {/* Project Grid with TiltCard */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {projects.slice(0, 6).map((project: Project, index: number) => (
              <div
                key={project.id}
                className={`reveal stagger-${Math.min(index + 1, 5)} ${
                  index === 0 ? 'sm:col-span-2 sm:row-span-1' : ''
                }`}
              >
                <TiltCard
                  className={`rounded-2xl overflow-hidden ${
                    index === 0 ? 'aspect-[16/10]' : 'aspect-[4/3]'
                  }`}
                  tiltStrength={8}
                  scale={1.01}
                  glare={true}
                >
                  <Link
                    href={`/${locale}/work/${project.slug}`}
                    className="group block relative w-full h-full bg-[var(--color-surface)]"
                  >
                    {project.cover_image && (
                      <Image
                        src={project.cover_image}
                        alt={`${project.title}${project.subtitle ? ` - ${project.subtitle}` : ''}`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-out"
                        sizes={index === 0
                          ? "(max-width: 640px) 100vw, (max-width: 1024px) 66vw, 50vw"
                          : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        }
                        loading={index < 3 ? "eager" : "lazy"}
                        quality={80}
                      />
                    )}
                    {!project.cover_image && (
                      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-bg-secondary)] to-[var(--color-bg-tertiary)] flex items-center justify-center">
                        <span className="text-5xl font-heading font-bold text-[var(--color-text)]/10 uppercase tracking-widest">
                          {project.title.charAt(0)}
                        </span>
                      </div>
                    )}
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)] via-[var(--color-bg)]/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-700 z-10" />
                    {/* Content */}
                    <div className="absolute bottom-0 left-0 w-full p-5 md:p-7 lg:p-8 z-20 translate-y-2 group-hover:translate-y-0 transition-transform duration-700">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="w-4 md:w-6 h-[1px] bg-[var(--color-accent)]/60" aria-hidden="true" />
                        <p className="text-[var(--color-accent)] text-[9px] tracking-[0.3em] uppercase font-medium">{project.category}</p>
                      </div>
                      <h3 className={`font-heading font-bold text-[var(--color-text)] mb-1 tracking-wide uppercase ${
                        index === 0 ? 'text-xl md:text-2xl lg:text-3xl' : 'text-base md:text-lg'
                      }`}>
                        {project.title}
                      </h3>
                      <p className="text-xs text-[var(--color-text-muted)] font-light opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 max-w-sm line-clamp-2">
                        {project.subtitle}
                      </p>
                      <div className="mt-3 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200">
                        <ArrowUpRight className="w-5 h-5 text-[var(--color-accent)]" aria-hidden="true" />
                      </div>
                    </div>
                    {/* Featured badge */}
                    {index === 0 && (
                      <div className="absolute top-4 right-4 md:top-6 md:right-6 z-20">
                        <span className="px-3 py-1.5 bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20 rounded-full text-[8px] uppercase tracking-[0.2em] text-[var(--color-accent)] backdrop-blur-sm">
                          {dict.home.featured}
                        </span>
                      </div>
                    )}
                  </Link>
                </TiltCard>
              </div>
            ))}
          </div>

          {projects.length === 0 && (
            <div className="text-center py-20 md:py-32 glass rounded-3xl">
              <p className="text-[var(--color-text-muted)] text-sm uppercase tracking-widest">{dict.home.noProjects}</p>
              <p className="text-[var(--color-text-muted)] text-xs mt-2">{dict.home.addFromAdmin}</p>
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 3: SERVICES / SKILLS — With 3D Cards + Counters
          ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-32 md:py-40 relative overflow-hidden" aria-label="Skills & Services">
        {/* Parallax background decoration */}
        <ParallaxSection speed={0.3} className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-[400px] h-[400px] bg-[var(--color-accent)]/[0.03] rounded-full blur-[150px]" aria-hidden="true" />
          <div className="absolute bottom-20 right-10 w-[300px] h-[300px] bg-[var(--color-accent-secondary)]/[0.03] rounded-full blur-[120px]" aria-hidden="true" />
        </ParallaxSection>

        {/* Top/bottom decorative lines */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent" aria-hidden="true" />
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent" aria-hidden="true" />

        <div className="container mx-auto px-5 sm:px-6 md:px-12 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16 md:mb-24">
            <div className="flex items-center justify-center gap-4 mb-4 reveal">
              <span className="w-8 md:w-12 h-[1px] bg-[var(--color-accent)]/40" aria-hidden="true" />
              <span className="text-[10px] tracking-[0.4em] text-[var(--color-accent)] uppercase font-medium">
                {dict.home.expertise}
              </span>
              <span className="w-8 md:w-12 h-[1px] bg-[var(--color-accent)]/40" aria-hidden="true" />
            </div>
            <TextReveal
              text={dict.home.multidisciplinary}
              as="h2"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold uppercase tracking-tight text-[var(--color-text)] mb-6"
              splitBy="word"
              animation="fade-up"
            />
            <p className="text-[var(--color-text-muted)] text-base md:text-lg font-light max-w-2xl mx-auto leading-relaxed reveal stagger-2">
              {dict.home.servicesDesc}
            </p>
          </div>

          {/* Skills Grid with TiltCards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
            {skills.map((skill, i) => (
              <div key={i} className={`reveal stagger-${Math.min(i + 1, 5)}`}>
                <TiltCard
                  className="h-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/50 backdrop-blur-sm hover:border-[var(--color-accent)]/20 transition-colors duration-700 overflow-hidden group"
                  tiltStrength={10}
                  scale={1.02}
                  glare={true}
                >
                  <div className="p-6 md:p-7 relative">
                    {/* Background gradient on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)]/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" aria-hidden="true" />
                    
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-[var(--color-accent)]/60 group-hover:text-[var(--color-accent)] transition-colors duration-500">
                          {getSkillIcon(skill.icon)}
                        </span>
                      </div>
                      <h3 className="text-sm md:text-base font-heading font-semibold text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors duration-500 mb-2">
                        {skill.title}
                      </h3>
                      <p className="text-sm text-[var(--color-text-muted)] font-light leading-relaxed group-hover:text-[var(--color-text-secondary)] transition-colors duration-500 line-clamp-3">
                        {skill.desc}
                      </p>
                    </div>

                    {/* Card number */}
                    <span className="absolute top-4 right-4 text-[10px] text-[var(--color-text-muted)]/30 font-heading font-bold group-hover:text-[var(--color-accent)]/20 transition-colors duration-500" aria-hidden="true">
                      0{i + 1}
                    </span>
                  </div>
                </TiltCard>
              </div>
            ))}
          </div>

          {/* Learn more link */}
          <div className="flex justify-center mt-14 md:mt-20 reveal">
            <Link
              href={`/${locale}/about`}
              className="group inline-flex items-center gap-3 text-[11px] tracking-[0.2em] uppercase text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-all duration-500"
            >
              <span className="w-6 md:w-8 h-[1px] bg-[var(--color-accent)]/40 group-hover:w-12 transition-all duration-500" aria-hidden="true" />
              {dict.home.learnMore}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 4: ABOUT PREVIEW — Split Layout with Parallax
          ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-32 md:py-40 relative overflow-hidden" aria-label="About preview">
        <div className="container mx-auto px-5 sm:px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
            {/* Text Side */}
            <div className="reveal-left">
              <div className="flex items-center gap-4 mb-6">
                <span className="w-8 md:w-12 h-[1px] bg-[var(--color-accent)]/60" aria-hidden="true" />
                <span className="text-[10px] tracking-[0.4em] text-[var(--color-accent)] uppercase font-medium">
                  {dict.about.eyebrow}
                </span>
              </div>
              <TextReveal
                text={`${dict.about.title} ${dict.about.titleHighlight}`}
                as="h2"
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold uppercase tracking-tight text-[var(--color-text)] mb-6 leading-[0.9]"
                splitBy="word"
                animation="fade-up"
              />
              <p className="text-[var(--color-text-secondary)] text-base md:text-lg font-light leading-relaxed mb-8 max-w-lg">
                {dict.about.intro}
              </p>
              <div className="flex flex-wrap gap-4">
                <MagneticButton
                  href={`/${locale}/about`}
                  className="group inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[var(--color-accent)]/30 text-[var(--color-accent)] text-[11px] uppercase tracking-[0.15em] font-bold hover:bg-[var(--color-accent)] hover:text-[var(--color-bg)] transition-all duration-500"
                  strength={20}
                >
                  <span>{dict.about.viewWork}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </MagneticButton>
                <MagneticButton
                  href={`/${locale}/contact`}
                  className="group inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[var(--color-border)] text-[var(--color-text-secondary)] text-[11px] uppercase tracking-[0.15em] font-bold hover:border-[var(--color-accent)]/30 hover:text-[var(--color-accent)] transition-all duration-500"
                  strength={20}
                >
                  <span>{dict.about.getInTouch}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:rotate-45 transition-transform" aria-hidden="true" />
                </MagneticButton>
              </div>
            </div>

            {/* Image Side with Parallax */}
            <div className="reveal-right">
              <ParallaxSection speed={0.2} className="relative">
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface)]">
                  {settings?.about_image ? (
                    <Image
                      src={settings.about_image}
                      alt="Mohamed Bouliani"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      loading="lazy"
                      quality={80}
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-bg-secondary)] to-[var(--color-bg-tertiary)] flex items-center justify-center">
                      <span className="text-8xl font-heading font-bold text-[var(--color-text)]/5 uppercase">MB</span>
                    </div>
                  )}
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)]/40 via-transparent to-transparent" aria-hidden="true" />
                </div>
                {/* Decorative floating element */}
                <div className="absolute -top-4 -right-4 w-24 h-24 border border-[var(--color-accent)]/20 rounded-2xl rotate-12 float" aria-hidden="true" />
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-[var(--color-accent)]/10 rounded-full float" style={{ animationDelay: '1s' }} aria-hidden="true" />
              </ParallaxSection>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 5: CONTACT CTA — Large Gradient Text
          ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-32 md:py-40 lg:py-48 relative overflow-hidden" aria-label="Contact call to action">
        {/* Floating elements */}
        <FloatingElements count={6} className="z-0 opacity-30" />

        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--color-accent)]/[0.03] rounded-full blur-[200px] pointer-events-none" aria-hidden="true" />

        <div className="container mx-auto px-5 sm:px-6 md:px-12 relative z-10 text-center">
          <div className="max-w-4xl mx-auto">
            <TextReveal
              text={dict.contact.title + " " + dict.contact.titleHighlight}
              as="h2"
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-heading font-bold uppercase tracking-tight gradient-text leading-[0.85] mb-8 md:mb-12"
              splitBy="char"
              animation="fade-up"
            />
            <p className="text-[var(--color-text-secondary)] text-base md:text-lg lg:text-xl font-light max-w-2xl mx-auto leading-relaxed mb-10 md:mb-14 reveal stagger-2">
              {dict.contact.subtitle}
            </p>
            <div className="reveal stagger-3">
              <MagneticButton
                href={`/${locale}/contact`}
                className="group inline-flex items-center gap-3 bg-[var(--color-accent)] text-[var(--color-bg)] px-10 md:px-14 py-5 md:py-6 rounded-full text-[12px] md:text-[13px] tracking-[0.18em] uppercase font-bold hover:shadow-[0_0_80px_var(--color-glow)] transition-all duration-700"
                strength={25}
              >
                <span>{dict.footer.startProject}</span>
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-2 transition-transform duration-500" aria-hidden="true" />
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          MARQUEE — Infinite scroll text
          ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-8 md:py-12 overflow-hidden border-y border-[var(--color-border)]" aria-hidden="true">
        {(() => {
          const marqueeWords = settings?.marquee_words
            ? settings.marquee_words.split(',').map((w: string) => w.trim()).filter(Boolean)
            : ["DESIGN", "PHOTOGRAPHY", "VIDEO", "AUDIO", "FULL-STACK", "CYBERSECURITY", "MOTION", "EVENTS"];
          return (
            <div className="flex whitespace-nowrap" style={{ animation: "marquee 25s linear infinite" }}>
              {[0, 1].map((setIndex) => (
                <div key={setIndex} className="flex items-center gap-8 md:gap-16 px-4 md:px-8 flex-shrink-0">
                  {marqueeWords.map((word: string, i: number) => (
                    <span
                      key={`${setIndex}-${i}`}
                      className="text-xl sm:text-2xl md:text-4xl font-heading font-bold uppercase tracking-wider text-[var(--color-text)]/20 hover:text-[var(--color-accent)] transition-colors duration-500 cursor-default select-none"
                    >
                      {word}
                      <span className="mx-4 md:mx-8 text-[var(--color-accent)]/30">·</span>
                    </span>
                  ))}
                </div>
              ))}
            </div>
          );
        })()}
      </section>
    </>
  );
}
