import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Play, ArrowUpRight } from "lucide-react";
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

  const services = [
    { title: settings?.service_1_title || "", desc: settings?.service_1_description || "", icon: "◆" },
    { title: settings?.service_2_title || "", desc: settings?.service_2_description || "", icon: "▲" },
    { title: settings?.service_3_title || "", desc: settings?.service_3_description || "", icon: "●" },
    { title: settings?.service_4_title || "", desc: settings?.service_4_description || "", icon: "◇" }
  ].filter(s => s.title);

  return (
    <>
      {/* ── HERO ── */}
      <section className="hero-section relative w-full flex items-center overflow-hidden">
        {/* Background layer */}
        <div className="absolute inset-0 z-0">
          {/* Background video — shown on all screen sizes */}
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
          {/* Fallback image when no video */}
          {!settings?.hero_video_url && settings?.hero_image_url && (
            <Image
              src={settings.hero_image_url}
              alt=""
              fill
              className="object-cover opacity-40 scale-105"
              priority
              sizes="100vw"
              quality={75}
            />
          )}
          {/* Gradients */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent z-10" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40 z-10" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background z-10" aria-hidden="true" />
          {/* Ambient glows — hidden on mobile for perf */}
          <div className="hidden md:block absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-gold-400/[0.04] blur-[150px] rounded-full z-10 animate-pulse-glow" aria-hidden="true" />
          <div className="hidden md:block absolute bottom-1/4 right-1/3 w-[300px] h-[300px] bg-gold-400/[0.03] blur-[100px] rounded-full z-10 animate-float" aria-hidden="true" />
          {/* Scan line — desktop only */}
          <div className="hidden md:block absolute inset-0 z-20 pointer-events-none opacity-[0.02]" aria-hidden="true">
            <div className="w-full h-[2px] bg-white/50 animate-[scan-line_8s_linear_infinite]" />
          </div>
        </div>

        {/* Hero Content */}
        <div className="container mx-auto px-4 sm:px-6 md:px-12 z-30 pt-24 md:pt-28">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8 animate-fade-in-up">
              <span className="w-8 md:w-12 h-[1px] bg-gold-400/60" aria-hidden="true" />
              <span className="text-gold-400 text-[10px] md:text-[11px] tracking-[0.3em] md:tracking-[0.4em] uppercase font-medium">
                {settings?.site_title || dict.home.heroEyebrow}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem] font-heading font-bold uppercase leading-[0.85] tracking-[-0.02em] mb-6 md:mb-8 animate-fade-in-up delay-200">
              {settings?.hero_title ? (
                <>
                  {settings.hero_title.split(' ').slice(0, 2).join(' ')}{' '}
                  <br className="hidden sm:block" />
                  <span className="gradient-text">{settings.hero_title.split(' ').slice(2, 4).join(' ')}</span>{' '}
                  <br className="hidden sm:block" />
                  <span className="text-white/80">{settings.hero_title.split(' ').slice(4).join(' ')}</span>
                </>
              ) : (
                <>
                  {dict.home.heroTitle.split(' ').slice(0, 2).join(' ')}{' '}
                  <br className="hidden sm:block" />
                  <span className="gradient-text">{dict.home.heroTitle.split(' ').slice(2, 4).join(' ')}</span>{' '}
                  <br className="hidden sm:block" />
                  <span className="text-white/80">{dict.home.heroTitle.split(' ').slice(4).join(' ')}</span>
                </>
              )}
            </h1>

            <p className="text-gray-400 max-w-lg text-base md:text-lg lg:text-xl font-light leading-relaxed mb-8 md:mb-12 animate-fade-in-up delay-400">
              {settings?.hero_subtitle || dict.home.heroSubtitle}
            </p>

            <div className="flex flex-wrap items-center gap-3 md:gap-5 animate-fade-in-up delay-600">
              <Link
                href={settings?.hero_cta_link || `/${locale}/work`}
                className="group inline-flex items-center gap-2 md:gap-3 bg-gold-400 text-black px-6 md:px-8 py-3.5 md:py-4 rounded-full text-[11px] tracking-[0.15em] md:tracking-[0.2em] uppercase font-bold hover:bg-white transition-all duration-500 hover:shadow-[0_0_40px_rgba(212,175,55,0.3)] magnetic-btn"
              >
                {settings?.hero_cta_text || dict.home.exploreCta}
                <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
              <Link
                href={`/${locale}/about`}
                className="group inline-flex items-center gap-2 md:gap-3 border border-white/15 px-6 md:px-8 py-3.5 md:py-4 rounded-full text-[11px] tracking-[0.15em] md:tracking-[0.2em] uppercase text-white/80 hover:border-gold-400/40 hover:text-gold-400 transition-all duration-500"
              >
                <Play className="w-3 h-3" aria-hidden="true" />
                {dict.home.watchShowreel}
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 md:gap-3 animate-fade-in-up delay-800">
          <span className="text-[9px] uppercase tracking-[0.3em] text-gray-500">{dict.home.scroll}</span>
          <div className="w-[1px] h-6 md:h-8 bg-gradient-to-b from-gold-400/50 to-transparent animate-pulse" aria-hidden="true" />
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="relative w-full py-12 md:py-16 overflow-hidden" aria-label="Statistics">
        <div className="absolute inset-0 bg-obsidian-800/50" aria-hidden="true" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/10 to-transparent" aria-hidden="true" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/10 to-transparent" aria-hidden="true" />
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
            {[
              { value: settings?.stat_years || '10+', label: settings?.stat_years_label || dict.home.yearsExperience },
              { value: settings?.stat_projects || '120+', label: settings?.stat_projects_label || dict.home.projectsDelivered },
              { value: settings?.stat_awards || '15+', label: settings?.stat_awards_label || dict.home.awardsWon },
              { value: settings?.stat_clients || '50+', label: settings?.stat_clients_label || dict.home.happyClients },
            ].map((stat, i) => (
              <div key={i} className="text-center group cursor-default">
                <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold gradient-text mb-2 md:mb-3 group-hover:text-glow transition-all duration-500">
                  {stat.value}
                </p>
                <p className="text-[9px] md:text-[10px] text-gray-500 uppercase tracking-[0.2em] md:tracking-[0.25em] group-hover:text-gray-300 transition-colors duration-500">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PROJECTS ── */}
      <section className="py-20 md:py-32 relative overflow-hidden" aria-label="Featured projects">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold-400/[0.02] rounded-full blur-[200px] pointer-events-none" aria-hidden="true" />
        <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10">
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

          {/* Responsive project grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {projects.slice(0, 6).map((project: Project, index: number) => (
              <Link
                href={`/${locale}/work/${project.slug}`}
                key={project.id}
                className={`group block relative rounded-2xl overflow-hidden card-cinematic bg-obsidian-800 ${
                  index === 0
                    ? 'sm:col-span-2 aspect-[16/10]'
                    : 'aspect-[4/3]'
                }`}
              >
                {project.cover_image && (
                  <Image
                    src={project.cover_image}
                    alt={project.title}
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
              <p className="text-gray-500 text-sm uppercase tracking-widest">{dict.home.noProjects}</p>
              <p className="text-gray-600 text-xs mt-2">{dict.home.addFromAdmin}</p>
            </div>
          )}
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="py-20 md:py-32 relative overflow-hidden" aria-label="Services">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-obsidian-800/30 to-transparent" aria-hidden="true" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" aria-hidden="true" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" aria-hidden="true" />
        <div className="hidden md:block absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gold-400/[0.02] to-transparent blur-3xl" aria-hidden="true" />
        <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10">
          <div className={`grid grid-cols-1 gap-12 md:gap-20 ${services.length > 0 ? 'lg:grid-cols-2' : ''}`}>
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-3 md:gap-4 mb-5 md:mb-6">
                <span className="w-6 md:w-8 h-[1px] bg-gold-400/60" aria-hidden="true" />
                <span className="text-[10px] tracking-[0.3em] md:tracking-[0.4em] text-gold-400 uppercase font-medium">
                  {settings?.services_section_title || dict.home.expertise}
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold uppercase leading-[0.9] tracking-tight mb-6 md:mb-8 text-white">
                {settings?.services_section_subtitle || dict.home.multidisciplinary}
              </h2>
              <p className="text-gray-400 text-base md:text-lg leading-relaxed font-light mb-8 md:mb-10 max-w-lg">
                {settings?.services_section_description || dict.home.servicesDesc}
              </p>
              <Link
                href={settings?.services_section_link_url || `/${locale}/about`}
                className="group inline-flex items-center gap-2 md:gap-3 text-[11px] tracking-[0.2em] uppercase text-white hover:text-gold-400 transition-all duration-500 w-fit"
              >
                <span className="w-6 md:w-8 h-[1px] bg-gold-400/40 group-hover:w-10 md:group-hover:w-12 transition-all duration-500" aria-hidden="true" />
                {settings?.services_section_link_text || dict.home.learnMore}
                <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
            </div>
            {services.length > 0 && (
              <div className="grid gap-4 md:gap-5">
                {services.map((srv, i) => (
                  <div
                    key={i}
                    className="group relative p-5 md:p-7 rounded-2xl border border-white/[0.04] bg-white/[0.01] hover:bg-white/[0.03] hover:border-gold-400/20 transition-all duration-700 cursor-default overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-gold-400/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" aria-hidden="true" />
                    <div className="relative z-10 flex items-start gap-4 md:gap-5">
                      <span className="text-gold-400/40 text-xl md:text-2xl group-hover:text-gold-400 transition-colors duration-500 mt-1 flex-shrink-0" aria-hidden="true">
                        {srv.icon}
                      </span>
                      <div>
                        <h3 className="text-sm md:text-base font-heading font-semibold tracking-wide text-white mb-1.5 md:mb-2 group-hover:text-gold-400 transition-colors duration-500">
                          {srv.title}
                        </h3>
                        <p className="text-xs md:text-sm font-light text-gray-500 leading-relaxed group-hover:text-gray-400 transition-colors duration-500">
                          {srv.desc}
                        </p>
                      </div>
                    </div>
                    <span className="absolute top-4 right-4 md:top-6 md:right-6 text-[10px] text-gray-700 font-heading font-bold group-hover:text-gold-400/30 transition-colors duration-500" aria-hidden="true">
                      0{i + 1}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <section className="py-8 md:py-12 overflow-hidden border-y border-white/[0.03]" aria-hidden="true">
        <div className="flex whitespace-nowrap" style={{ animation: "marquee 25s linear infinite" }}>
          {/* Two identical sets — second set creates the seamless loop */}
          {[0, 1].map((setIndex) => (
            <div key={setIndex} className="flex items-center gap-8 md:gap-16 px-4 md:px-8 flex-shrink-0">
              {["DESIGN", "PHOTOGRAPHY", "VIDEO", "AUDIO", "WEB DEV", "AI", "BRANDING", "MOTION"].map((word, i) => (
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
      </section>
    </>
  );
}
