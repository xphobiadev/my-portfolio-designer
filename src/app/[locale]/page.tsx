import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Play, ArrowUpRight, ChevronDown, BookOpen, Camera, Film, Music, Code, Calendar, Palette } from "lucide-react";
import { getFeaturedProjects, getSettings } from "@/lib/data";
import type { Project } from "@/lib/types";
import { getDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";

export const dynamic = 'force-dynamic';

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const projects = await getFeaturedProjects();
  const settings = await getSettings();

  const chapters = [
    { title: dict.home.chapter1Title, subtitle: dict.home.chapter1Subtitle, text: dict.home.chapter1Text },
    { title: dict.home.chapter2Title, subtitle: dict.home.chapter2Subtitle, text: dict.home.chapter2Text },
    { title: dict.home.chapter3Title, subtitle: dict.home.chapter3Subtitle, text: dict.home.chapter3Text },
    { title: dict.home.chapter4Title, subtitle: dict.home.chapter4Subtitle, text: dict.home.chapter4Text },
    { title: dict.home.chapter5Title, subtitle: dict.home.chapter5Subtitle, text: dict.home.chapter5Text },
    { title: dict.home.chapter6Title, subtitle: dict.home.chapter6Subtitle, text: dict.home.chapter6Text },
  ];

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
      case "palette": return <Palette className="w-5 h-5" />;
      case "camera": return <Camera className="w-5 h-5" />;
      case "film": return <Film className="w-5 h-5" />;
      case "music": return <Music className="w-5 h-5" />;
      case "code": return <Code className="w-5 h-5" />;
      case "calendar": return <Calendar className="w-5 h-5" />;
      case "palette2": return <Palette className="w-5 h-5" />;
      default: return <Palette className="w-5 h-5" />;
    }
  };

  return (
    <>
      {/* ── HERO — PROLOGUE ── */}
      <section className="hero-section relative w-full flex items-center overflow-hidden" aria-label="Hero introduction">
        {/* Background layer */}
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
              className="hero-video opacity-50"
              src={settings.hero_video_url}
              aria-hidden="true"
            />
          )}
          {!settings?.hero_video_url && settings?.hero_image_url && (
            <Image
              src={settings.hero_image_url}
              alt=""
              fill
              className="object-cover opacity-50 scale-105"
              priority
              sizes="100vw"
              quality={75}
              aria-hidden="true"
            />
          )}
          {!settings?.hero_video_url && !settings?.hero_image_url && (
            <div className="absolute inset-0 hero-fallback-bg" aria-hidden="true" />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/30 z-10" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50 z-10" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background z-10" aria-hidden="true" />
          <div className="hidden md:block absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-gold-400/[0.05] blur-[150px] rounded-full z-10 animate-pulse-glow" aria-hidden="true" />
          <div className="hidden md:block absolute bottom-1/4 right-1/3 w-[300px] h-[300px] bg-gold-400/[0.03] blur-[100px] rounded-full z-10 animate-float" aria-hidden="true" />
        </div>

        {/* Hero Content */}
        <div className="container mx-auto px-5 sm:px-8 md:px-12 z-30 pt-20 md:pt-24 pb-24 md:pb-32 w-full">
          <div className="max-w-3xl mx-auto text-center">
            {/* Prologue badge */}
            <div className="flex justify-center mb-6 animate-fade-in-up">
              <span className="prologue-badge">
                <BookOpen className="w-3 h-3" />
                {settings?.site_title || dict.home.heroEyebrow}
              </span>
            </div>

            {/* Main heading */}
            <h1 className="text-[2.6rem] sm:text-5xl md:text-6xl lg:text-[5rem] xl:text-[5.5rem] font-heading font-bold uppercase leading-[0.88] tracking-[-0.02em] mb-6 md:mb-8 animate-fade-in-up delay-200">
              {settings?.hero_title ? (
                <>
                  <span className="block">{settings.hero_title.split(' ').slice(0, 2).join(' ')}</span>
                  <span className="block gradient-text">{settings.hero_title.split(' ').slice(2, 4).join(' ')}</span>
                  <span className="block text-white/80">{settings.hero_title.split(' ').slice(4).join(' ')}</span>
                </>
              ) : (
                <>
                  <span className="block gradient-text">{dict.home.heroTitle}</span>
                </>
              )}
            </h1>

            {/* Subtitle */}
            <p className="text-gray-300 max-w-xl mx-auto text-[15px] md:text-base lg:text-lg font-light leading-relaxed mb-8 md:mb-10 animate-fade-in-up delay-400">
              {settings?.hero_subtitle || dict.home.heroSubtitle}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 animate-fade-in-up delay-600">
              <Link
                href={settings?.hero_cta_link || `/${locale}/about`}
                className="group inline-flex items-center gap-2.5 bg-gold-400 text-black px-7 md:px-8 py-3.5 md:py-4 rounded-full text-[11px] tracking-[0.18em] md:tracking-[0.2em] uppercase font-bold hover:bg-white transition-all duration-300 hover:shadow-[0_0_40px_rgba(212,175,55,0.35)] magnetic-btn min-h-[44px]"
              >
                {settings?.hero_cta_text || dict.home.exploreCta}
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform flex-shrink-0" aria-hidden="true" />
              </Link>
              <Link
                href={`/${locale}/work`}
                className="group inline-flex items-center gap-2.5 bg-white/[0.06] border border-white/20 px-7 md:px-8 py-3.5 md:py-4 rounded-full text-[11px] tracking-[0.18em] md:tracking-[0.2em] uppercase text-white/90 hover:bg-white/[0.12] hover:border-gold-400/40 hover:text-gold-400 transition-all duration-300 min-h-[44px]"
              >
                <Play className="w-3 h-3 flex-shrink-0" aria-hidden="true" />
                {dict.home.watchShowreel}
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 md:mt-20 animate-fade-in-up delay-800">
              {[
                { value: settings?.stat_years || '20+', label: settings?.stat_years_label || dict.home.yearsExperience },
                { value: settings?.stat_projects || '120+', label: settings?.stat_projects_label || dict.home.projectsDelivered },
                { value: settings?.stat_awards || '30+', label: settings?.stat_awards_label || dict.home.awardsWon },
                { value: settings?.stat_clients || '50+', label: settings?.stat_clients_label || dict.home.happyClients },
              ].map((stat, i) => (
                <div key={i} className="text-center group cursor-default">
                  <p className="text-3xl md:text-4xl font-heading font-bold gradient-text mb-1.5 group-hover:text-glow transition-all duration-500">
                    {stat.value}
                  </p>
                  <p className="text-[9px] text-gray-400 uppercase tracking-[0.2em] group-hover:text-gray-200 transition-colors duration-200">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1.5 animate-fade-in-up delay-800">
          <span className="text-[9px] uppercase tracking-[0.3em] text-gray-400">{dict.home.scroll}</span>
          <ChevronDown className="w-4 h-4 text-gold-400/60 animate-bounce" aria-hidden="true" />
        </div>
      </section>

      {/* ── STORY CHAPTERS ── */}
      <section className="py-20 md:py-32 relative overflow-hidden" aria-label="My Story">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold-400/[0.02] rounded-full blur-[200px] pointer-events-none" aria-hidden="true" />
        
        <div className="container mx-auto px-5 sm:px-6 md:px-12 relative z-10">
          {/* Section header */}
          <div className="text-center mb-16 md:mb-24">
            <div className="flex items-center justify-center gap-3 md:gap-4 mb-4">
              <span className="w-8 md:w-12 h-[1px] bg-gold-400/40" aria-hidden="true" />
              <span className="text-[10px] tracking-[0.3em] md:tracking-[0.4em] text-gold-400 uppercase font-medium">
                {dict.about.journey}
              </span>
              <span className="w-8 md:w-12 h-[1px] bg-gold-400/40" aria-hidden="true" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold uppercase tracking-tight text-white">
              {dict.about.myPath}
            </h2>
          </div>

          {/* Timeline */}
          <div className="relative max-w-4xl mx-auto">
            {/* Vertical connector line */}
            <div className="hidden md:block story-timeline-connector timeline-line" aria-hidden="true" />

            {/* Chapters */}
            <div className="space-y-12 md:space-y-16">
              {chapters.map((chapter, index) => (
                <div
                  key={index}
                  className={`story-chapter relative flex flex-col md:flex-row items-start gap-6 md:gap-12 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline dot (desktop) */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-8 items-center justify-center">
                    <div className="story-timeline-dot" />
                  </div>

                  {/* Chapter content */}
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right md:pr-16' : 'md:text-left md:pl-16'}`}>
                    <div className="story-card">
                      {/* Chapter number */}
                      <div className={`flex items-center gap-3 mb-3 ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}>
                        <span className="chapter-number text-4xl md:text-5xl font-heading font-bold text-gold-400/20">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>
                      
                      {/* Chapter title */}
                      <h3 className="text-lg md:text-xl font-heading font-semibold text-white mb-1">
                        {chapter.title}
                      </h3>
                      
                      {/* Chapter subtitle (year) */}
                      <p className="text-sm text-gold-400 mb-3 tracking-wide">
                        {chapter.subtitle}
                      </p>
                      
                      {/* Chapter text */}
                      <p className="text-sm md:text-base text-gray-400 font-light leading-relaxed">
                        {chapter.text}
                      </p>
                    </div>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SKILLS SHOWCASE ── */}
      <section className="py-20 md:py-32 relative overflow-hidden" aria-label="Skills">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-obsidian-800/30 to-transparent" aria-hidden="true" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" aria-hidden="true" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" aria-hidden="true" />
        
        <div className="container mx-auto px-5 sm:px-6 md:px-12 relative z-10">
          {/* Section header */}
          <div className="text-center mb-12 md:mb-16">
            <div className="flex items-center justify-center gap-3 md:gap-4 mb-4">
              <span className="w-8 md:w-12 h-[1px] bg-gold-400/40" aria-hidden="true" />
              <span className="text-[10px] tracking-[0.3em] md:tracking-[0.4em] text-gold-400 uppercase font-medium">
                {dict.home.expertise}
              </span>
              <span className="w-8 md:w-12 h-[1px] bg-gold-400/40" aria-hidden="true" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold uppercase tracking-tight text-white mb-4">
              {dict.home.multidisciplinary}
            </h2>
            <p className="text-gray-400 text-base md:text-lg font-light max-w-2xl mx-auto leading-relaxed">
              {dict.home.servicesDesc}
            </p>
          </div>

          {/* Skills grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
            {skills.map((skill, i) => (
              <div
                key={i}
                className="skill-card group relative p-5 md:p-6 rounded-2xl border border-white/[0.04] bg-white/[0.01] hover:bg-white/[0.03] hover:border-gold-400/20 transition-all duration-700 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gold-400/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" aria-hidden="true" />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-gold-400/60 group-hover:text-gold-400 transition-colors duration-500">
                      {getSkillIcon(skill.icon)}
                    </span>
                    <h3 className="text-sm md:text-base font-heading font-semibold text-white group-hover:text-gold-400 transition-colors duration-500">
                      {skill.title}
                    </h3>
                  </div>
                  <p className="text-xs md:text-sm text-gray-500 font-light leading-relaxed group-hover:text-gray-400 transition-colors duration-500">
                    {skill.desc}
                  </p>
                </div>
                <span className="absolute top-3 right-3 text-[10px] text-gray-800 font-heading font-bold group-hover:text-gold-400/20 transition-colors duration-500" aria-hidden="true">
                  0{i + 1}
                </span>
              </div>
            ))}
          </div>

          {/* Learn more link */}
          <div className="flex justify-center mt-10 md:mt-14">
            <Link
              href={`/${locale}/about`}
              className="group inline-flex items-center gap-2 md:gap-3 text-[11px] tracking-[0.2em] uppercase text-white hover:text-gold-400 transition-all duration-500"
            >
              <span className="w-6 md:w-8 h-[1px] bg-gold-400/40 group-hover:w-10 md:group-hover:w-12 transition-all duration-500" aria-hidden="true" />
              {dict.home.learnMore}
              <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── FEATURED PROJECTS ── */}
      <section className="py-20 md:py-32 relative overflow-hidden" aria-label="Featured projects">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold-400/[0.02] rounded-full blur-[200px] pointer-events-none" aria-hidden="true" />
        <div className="container mx-auto px-5 sm:px-6 md:px-12 relative z-10">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 md:mb-16 gap-4 md:gap-6">
            <div>
              <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                <span className="w-6 md:w-8 h-[1px] bg-gold-400/60" aria-hidden="true" />
                <span className="text-[10px] tracking-[0.3em] md:tracking-[0.4em] text-gold-400 uppercase font-medium">
                  {settings?.featured_section_title || dict.home.selectedWorks}
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold uppercase tracking-tight text-white leading-tight">
                {settings?.featured_section_subtitle || dict.home.featuredProjects}
              </h2>
            </div>
            <Link
              href={`/${locale}/work`}
              className="group inline-flex items-center gap-2 md:gap-3 text-[11px] uppercase tracking-[0.2em] text-gray-400 hover:text-gold-400 transition-all duration-500 border-b border-transparent hover:border-gold-400/30 pb-1 flex-shrink-0"
            >
              {settings?.featured_view_all_text || dict.home.viewAllProjects}
              <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" aria-hidden="true" />
            </Link>
          </div>

          {/* Project grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {projects.slice(0, 6).map((project: Project, index: number) => (
              <Link
                href={`/${locale}/work/${project.slug}`}
                key={project.id}
                className={`group block relative rounded-2xl overflow-hidden card-cinematic bg-obsidian-800 ${
                  index === 0 ? 'sm:col-span-2 aspect-[16/10]' : 'aspect-[4/3]'
                }`}
              >
                {project.cover_image && (
                  <Image
                    src={project.cover_image}
                    alt={`${project.title}${project.subtitle ? ` - ${project.subtitle}` : ''}`}
                    fill
                    className="object-cover cinematic-image group-hover:scale-105 transition-transform duration-[1.2s] ease-out"
                    sizes={index === 0
                      ? "(max-width: 640px) 100vw, (max-width: 1024px) 66vw, 50vw"
                      : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    }
                    loading={index < 3 ? "eager" : "lazy"}
                    quality={80}
                  />
                )}
                {!project.cover_image && (
                  <div className="absolute inset-0 bg-gradient-to-br from-obsidian-700 to-obsidian-900 flex items-center justify-center">
                    <span className="text-4xl font-heading font-bold text-white/10 uppercase tracking-widest">
                      {project.title.charAt(0)}
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-700 z-10" aria-hidden="true" />
                <div className="absolute bottom-0 left-0 w-full p-4 md:p-6 lg:p-8 z-20 translate-y-2 group-hover:translate-y-0 transition-transform duration-700">
                  <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
                    <span className="w-4 md:w-6 h-[1px] bg-gold-400/60" aria-hidden="true" />
                    <p className="text-gold-400 text-[9px] tracking-[0.3em] uppercase font-medium">{project.category}</p>
                  </div>
                  <h3 className={`font-heading font-bold text-white mb-1 md:mb-2 tracking-wide uppercase ${
                    index === 0 ? 'text-xl md:text-2xl lg:text-3xl' : 'text-base md:text-lg'
                  }`}>
                    {project.title}
                  </h3>
                  <p className="text-xs text-gray-400 font-light opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 max-w-sm line-clamp-2">
                    {project.subtitle}
                  </p>
                  <div className="mt-3 md:mt-4 opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all duration-500 delay-200">
                    <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 text-gold-400" aria-hidden="true" />
                  </div>
                </div>
                {index === 0 && (
                  <div className="absolute top-4 right-4 md:top-6 md:right-6 z-20">
                    <span className="px-2.5 py-1 md:px-3 md:py-1.5 bg-gold-400/10 border border-gold-400/20 rounded-full text-[8px] uppercase tracking-[0.2em] text-gold-400 backdrop-blur-sm">
                      {dict.home.featured}
                    </span>
                  </div>
                )}
              </Link>
            ))}
          </div>

          {projects.length === 0 && (
            <div className="text-center py-16 md:py-24 glass rounded-3xl">
              <p className="text-gray-400 text-sm uppercase tracking-widest">{dict.home.noProjects}</p>
              <p className="text-gray-400 text-xs mt-2">{dict.home.addFromAdmin}</p>
            </div>
          )}
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <section className="py-8 md:py-12 overflow-hidden border-y border-white/[0.03]" aria-hidden="true">
        {(() => {
          const marqueeWords = settings?.marquee_words
            ? settings.marquee_words.split(',').map(w => w.trim()).filter(Boolean)
            : ["DESIGN", "PHOTOGRAPHY", "VIDEO", "AUDIO", "FULL-STACK", "CYBERSECURITY", "MOTION", "EVENTS"];
          return (
        <div className="flex whitespace-nowrap" style={{ animation: "marquee 25s linear infinite" }}>
          {[0, 1].map((setIndex) => (
            <div key={setIndex} className="flex items-center gap-8 md:gap-16 px-4 md:px-8 flex-shrink-0">
              {marqueeWords.map((word, i) => (
                <span
                  key={`${setIndex}-${i}`}
                  className="text-xl sm:text-2xl md:text-4xl font-heading font-bold uppercase tracking-wider text-white/40 hover:text-gold-400 transition-colors duration-500 cursor-default select-none"
                >
                  {word}
                  <span className="mx-4 md:mx-8 text-gold-400/50">·</span>
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
