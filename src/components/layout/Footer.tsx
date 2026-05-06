"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";
import type { SiteSettings } from "@/lib/types";

// Pages that are currently under development and should not be navigable
const COMING_SOON_PATHS = ['/audio', '/videos'];

export function Footer({ locale, dict, settings }: { locale: Locale; dict: Dictionary; settings?: SiteSettings | null }) {
    const pathname = usePathname();
    if (pathname.startsWith('/admin')) return null;

    const footerLinks = [
        { name: dict.nav.work, path: `/${locale}/work` },
        { name: dict.nav.about, path: `/${locale}/about` },
        { name: dict.nav.photography, path: `/${locale}/photography` },
        { name: dict.nav.videos, path: `/${locale}/videos` },
        { name: dict.nav.audio, path: `/${locale}/audio` },
        { name: dict.nav.contact, path: `/${locale}/contact` },
    ];

    const socialLinks = [
        { name: 'Instagram', url: settings?.contact_instagram },
        { name: 'Behance', url: settings?.contact_behance },
        { name: 'LinkedIn', url: settings?.contact_linkedin },
    ].filter((s): s is { name: string; url: string } => Boolean(s.url));

    const isComingSoon = (path: string) => {
        return COMING_SOON_PATHS.some((p) => path.endsWith(p));
    };

    return (
        <footer className="relative w-full mt-auto overflow-hidden" role="contentinfo" aria-label="Site footer">
            {/* Top gradient line */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-gold-400/20 to-transparent" aria-hidden="true" />

            {/* Main Footer */}
            <div className="relative py-12 md:py-20 bg-obsidian-900/80">
                {/* Background glow */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gold-400/[0.03] rounded-full blur-[120px] pointer-events-none" aria-hidden="true" />

                <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10">
                    {/* CTA Section */}
                    <div className="text-center mb-10 md:mb-16">
                        <p className="text-[10px] uppercase tracking-[0.4em] text-gold-400/60 mb-4">{dict.footer.cta}</p>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold uppercase tracking-tight text-white mb-6 md:mb-8 leading-tight">
                            {dict.footer.letsWork}{' '}
                            <span className="gradient-text">{dict.footer.together}</span>
                        </h2>
                        <Link
                            href={`/${locale}/contact`}
                            className="inline-flex items-center gap-3 px-6 md:px-8 py-3.5 md:py-4 border border-gold-400/30 text-gold-400 rounded-full text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-gold-400 hover:text-black transition-all duration-500 magnetic-btn"
                        >
                            {dict.footer.startProject}
                            <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                        </Link>
                    </div>

                    {/* Footer Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 pt-8 md:pt-12 border-t border-white/[0.04]">
                        {/* Brand */}
                        <div className="sm:col-span-2 md:col-span-1">
                            <Link
                                href={`/${locale}`}
                                className="text-2xl md:text-3xl font-heading font-bold tracking-[0.15em] text-white hover:text-gold-400 transition-colors duration-500 inline-block"
                                aria-label="Home"
                            >
                                {settings?.logo_text ?? 'MB'}
                            </Link>
                            <p className="text-sm text-gray-400 mt-4 leading-relaxed font-light max-w-xs">
                                {dict.footer.description}
                            </p>
                        </div>

                        {/* Navigation */}
                        <nav aria-label="Footer navigation">
                            <h3 className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-bold mb-5 md:mb-6">
                                {dict.footer.navigation}
                            </h3>
                            <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                                {footerLinks.map((link) =>
                                    isComingSoon(link.path) ? (
                                        <span
                                            key={link.path}
                                            aria-disabled="true"
                                            className="text-xs text-gray-500 cursor-not-allowed uppercase tracking-wider py-3 min-h-[44px] inline-flex items-center gap-1"
                                        >
                                            {link.name}
                                            <span className="text-[9px] text-gray-600 normal-case tracking-normal">({dict.footer.comingSoon})</span>
                                        </span>
                                    ) : (
                                        <Link
                                            key={link.path}
                                            href={link.path}
                                            className="text-xs text-gray-400 hover:text-gold-400 active:text-gold-400 transition-colors duration-300 uppercase tracking-wider py-3 min-h-[44px] inline-flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded"
                                        >
                                            {link.name}
                                        </Link>
                                    )
                                )}
                            </div>
                        </nav>

                        {/* Social */}
                        <nav aria-label="Social media links">
                            <h3 className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-bold mb-5 md:mb-6">
                                {dict.footer.connect}
                            </h3>
                            <div className="flex flex-col gap-1">
                                {socialLinks.length > 0 ? (
                                    socialLinks.map((social) => (
                                        <a
                                            key={social.name}
                                            href={social.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-xs text-gray-400 hover:text-gold-400 active:text-gold-400 transition-colors duration-300 uppercase tracking-wider inline-flex items-center gap-2 group py-3 min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded"
                                        >
                                            {social.name}
                                            <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300" aria-hidden="true" />
                                        </a>
                                    ))
                                ) : (
                                    <span aria-disabled="true" className="text-xs text-gray-500 cursor-not-allowed uppercase tracking-wider">
                                        {dict.footer.comingSoon}
                                    </span>
                                )}
                            </div>
                        </nav>
                    </div>

                    {/* Bottom Bar */}
                    <div className="flex flex-col sm:flex-row justify-between items-center mt-10 md:mt-16 pt-6 md:pt-8 border-t border-white/[0.04] gap-3">
                        <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] text-center sm:text-left">
                            {settings?.footer_text ?? `© ${new Date().getFullYear()} Mohamed Bouliani.`} {dict.footer.rights}
                        </p>
                        <p className="text-[10px] text-gray-400 uppercase tracking-[0.15em] text-center sm:text-right">
                            {dict.footer.crafted}
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
