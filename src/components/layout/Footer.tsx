"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import MagneticButton from "@/components/MagneticButton";
import TextReveal from "@/components/TextReveal";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";
import type { SiteSettings } from "@/lib/types";

export function Footer({ locale, dict, settings }: { locale: Locale; dict: Dictionary; settings?: SiteSettings | null }) {
    const pathname = usePathname();
    if (pathname.startsWith('/admin')) return null;

    const footerLinks = [
        { name: dict.nav.work, path: `/${locale}/work` },
        { name: dict.nav.about, path: `/${locale}/about` },
        { name: dict.nav.photography, path: `/${locale}/photography` },
        { name: dict.nav.contact, path: `/${locale}/contact` },
    ];

    const socialLinks = [
        { name: 'Instagram', url: settings?.contact_instagram },
        { name: 'Behance', url: settings?.contact_behance },
        { name: 'LinkedIn', url: settings?.contact_linkedin },
    ].filter((s): s is { name: string; url: string } => Boolean(s.url));

    return (
        <footer className="relative w-full mt-auto overflow-hidden" role="contentinfo" aria-label="Site footer">
            {/* Gradient border top */}
            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--color-accent)]/30 to-transparent" aria-hidden="true" />

            {/* Main Footer Content */}
            <div className="relative py-24 md:py-32 lg:py-40 bg-[var(--color-bg-secondary)]">
                {/* Background decorative elements */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[var(--color-accent)]/[0.03] rounded-full blur-[200px] pointer-events-none" aria-hidden="true" />
                <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-[var(--color-accent-secondary)]/[0.02] rounded-full blur-[150px] pointer-events-none" aria-hidden="true" />

                <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10">
                    {/* Large CTA Text */}
                    <div className="text-center mb-16 md:mb-24">
                        <p className="text-[10px] uppercase tracking-[0.4em] text-[var(--color-accent)] mb-6 opacity-70">{dict.footer.cta}</p>
                        <div className="mb-8 md:mb-12">
                            <TextReveal
                                text={`${dict.footer.letsWork} ${dict.footer.together}`}
                                as="h2"
                                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-heading font-bold uppercase tracking-tight leading-[0.9]"
                                splitBy="word"
                                animation="fade-up"
                            />
                        </div>
                        <MagneticButton
                            href={`/${locale}/contact`}
                            className="inline-flex items-center gap-3 px-8 md:px-10 py-4 md:py-5 border border-[var(--color-accent)]/30 text-[var(--color-accent)] rounded-full text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-[var(--color-accent)] hover:text-[var(--color-bg)] transition-all duration-500"
                            strength={25}
                        >
                            <span>{dict.footer.startProject}</span>
                            <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                        </MagneticButton>
                    </div>

                    {/* Footer Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 pt-12 border-t border-[var(--color-border)]">
                        {/* Brand */}
                        <div>
                            <Link
                                href={`/${locale}`}
                                className="text-2xl md:text-3xl font-heading font-bold tracking-[0.12em] gradient-text inline-block hover:opacity-80 transition-opacity duration-300"
                                aria-label="Home"
                            >
                                {settings?.logo_text ?? 'MB'}
                            </Link>
                            <p className="text-sm text-[var(--color-text-muted)] mt-4 leading-relaxed font-light max-w-xs">
                                {dict.footer.description}
                            </p>
                        </div>

                        {/* Navigation */}
                        <nav aria-label="Footer navigation">
                            <h3 className="text-[10px] uppercase tracking-[0.3em] text-[var(--color-text-muted)] font-bold mb-6">
                                {dict.footer.navigation}
                            </h3>
                            <div className="grid grid-cols-2 gap-x-6 gap-y-1">
                                {footerLinks.map((link) => (
                                    <Link
                                        key={link.path}
                                        href={link.path}
                                        className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors duration-300 uppercase tracking-wider py-2 min-h-[44px] inline-flex items-center group"
                                    >
                                        <span className="relative">
                                            {link.name}
                                            <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-[var(--color-accent)] group-hover:w-full transition-all duration-300" />
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        </nav>

                        {/* Social - with magnetic effect */}
                        <nav aria-label="Social media links">
                            <h3 className="text-[10px] uppercase tracking-[0.3em] text-[var(--color-text-muted)] font-bold mb-6">
                                {dict.footer.connect}
                            </h3>
                            <div className="flex flex-col gap-1">
                                {socialLinks.length > 0 ? (
                                    socialLinks.map((social) => (
                                        <MagneticButton
                                            key={social.name}
                                            href={social.url}
                                            className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors duration-300 uppercase tracking-wider inline-flex items-center gap-2 group py-2 min-h-[44px]"
                                            strength={15}
                                        >
                                            <span>{social.name}</span>
                                            <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300" aria-hidden="true" />
                                        </MagneticButton>
                                    ))
                                ) : (
                                    <span className="text-sm text-[var(--color-text-muted)]">
                                        {dict.footer.comingSoon}
                                    </span>
                                )}
                            </div>
                        </nav>
                    </div>

                    {/* Bottom Bar */}
                    <div className="flex flex-col sm:flex-row justify-between items-center mt-16 md:mt-20 pt-8 border-t border-[var(--color-border)] gap-3">
                        <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-[0.2em] text-center sm:text-left">
                            {settings?.footer_text ?? `© ${new Date().getFullYear()} Mohamed Bouliani.`} {dict.footer.rights}
                        </p>
                        <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-[0.15em] text-center sm:text-right">
                            {dict.footer.crafted}
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
