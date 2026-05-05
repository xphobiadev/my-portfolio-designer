"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";

export function Header({ locale, dict }: { locale: Locale; dict: Dictionary }) {
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    if (pathname.startsWith('/admin')) return null;

    const navLinks = [
        { name: dict.nav.work, path: `/${locale}/work` },
        { name: dict.nav.photography, path: `/${locale}/photography` },
        { name: dict.nav.videos, path: `/${locale}/videos` },
        { name: dict.nav.audio, path: `/${locale}/audio` },
        { name: dict.nav.about, path: `/${locale}/about` },
        { name: dict.nav.contact, path: `/${locale}/contact` },
    ];

    // Passive scroll listener for better performance
    const handleScroll = useCallback(() => {
        setIsScrolled(window.scrollY > 50);
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    useEffect(() => {
        setMobileMenuOpen(false);
    }, [pathname]);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [mobileMenuOpen]);

    return (
        <>
            <header
                className={`fixed top-0 w-full z-50 transition-all duration-700 ease-out ${
                    isScrolled
                        ? 'py-3 md:py-4 glass border-b border-white/[0.03]'
                        : 'py-5 md:py-7 bg-transparent'
                }`}
            >
                <div className="container mx-auto px-4 sm:px-6 md:px-12 flex justify-between items-center">
                    {/* Logo */}
                    <Link
                        href={`/${locale}`}
                        className="relative group flex-shrink-0"
                        aria-label="Home"
                    >
                        <span className="text-2xl md:text-3xl font-heading font-bold tracking-[0.15em] text-white group-hover:text-gold-400 transition-colors duration-500">
                            MB
                        </span>
                        <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold-400 group-hover:w-full transition-all duration-500" />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main navigation">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                href={link.path}
                                className={`relative px-3 xl:px-5 py-2.5 text-[12px] xl:text-[13px] uppercase tracking-[0.15em] xl:tracking-[0.18em] font-medium transition-all duration-500 rounded-full ${
                                    pathname === link.path
                                        ? "text-gold-400 bg-gold-400/[0.08]"
                                        : "text-gray-400 hover:text-white"
                                }`}
                            >
                                {link.name}
                                {pathname === link.path && (
                                    <motion.span
                                        layoutId="nav-indicator"
                                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-gold-400"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                            </Link>
                        ))}
                    </nav>

                    {/* CTA + Language Switcher + Mobile Toggle */}
                    <div className="flex items-center gap-2 md:gap-3">
                        <LanguageSwitcher locale={locale} />

                        <Link
                            href={`/${locale}/contact`}
                            className="hidden md:inline-flex items-center gap-2 px-4 xl:px-6 py-2.5 xl:py-3 text-[10px] xl:text-[11px] uppercase tracking-[0.15em] xl:tracking-[0.18em] font-bold border border-gold-400/30 text-gold-400 rounded-full hover:bg-gold-400 hover:text-black transition-all duration-500 magnetic-btn"
                        >
                            {dict.nav.letsTalk}
                            <ArrowUpRight className="w-3 h-3 xl:w-3.5 xl:h-3.5" aria-hidden="true" />
                        </Link>

                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="lg:hidden relative w-10 h-10 md:w-11 md:h-11 flex items-center justify-center rounded-full border border-white/10 hover:border-gold-400/30 transition-colors touch-manipulation"
                            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                            aria-expanded={mobileMenuOpen}
                            aria-controls="mobile-menu"
                        >
                            {mobileMenuOpen ? (
                                <X className="w-4 h-4 md:w-5 md:h-5 text-white" aria-hidden="true" />
                            ) : (
                                <Menu className="w-4 h-4 md:w-5 md:h-5 text-white" aria-hidden="true" />
                            )}
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu - Full Screen Cinematic */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        id="mobile-menu"
                        role="dialog"
                        aria-modal="true"
                        aria-label="Navigation menu"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[60] bg-black/97 backdrop-blur-xl flex flex-col items-center justify-center"
                        style={{ paddingTop: 'env(safe-area-inset-top)', paddingBottom: 'env(safe-area-inset-bottom)' }}
                    >
                        {/* Close button inside overlay */}
                        <button
                            onClick={() => setMobileMenuOpen(false)}
                            className="absolute top-4 right-4 md:top-5 md:right-6 w-10 h-10 flex items-center justify-center rounded-full border border-white/10 hover:border-gold-400/30 transition-colors touch-manipulation"
                            aria-label="Close menu"
                        >
                            <X className="w-4 h-4 text-white" aria-hidden="true" />
                        </button>

                        {/* Decorative elements — hidden on very small screens for perf */}
                        <div className="hidden sm:block absolute top-1/4 left-1/4 w-64 h-64 bg-gold-400/5 rounded-full blur-[100px] pointer-events-none" aria-hidden="true" />
                        <div className="hidden sm:block absolute bottom-1/4 right-1/4 w-48 h-48 bg-gold-400/3 rounded-full blur-[80px] pointer-events-none" aria-hidden="true" />

                        <nav
                            className="flex flex-col items-center gap-1 w-full px-6"
                            aria-label="Mobile navigation"
                        >
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.path}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ delay: i * 0.06, duration: 0.35 }}
                                    className="w-full text-center"
                                >
                                    <Link
                                        href={link.path}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={`block text-2xl sm:text-3xl font-heading font-bold uppercase tracking-wider py-3 px-8 transition-all duration-300 touch-manipulation ${
                                            pathname === link.path
                                                ? "text-gold-400 text-glow"
                                                : "text-white/60 hover:text-white active:text-gold-400"
                                        }`}
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>

                        {/* Language switcher in mobile */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.35 }}
                            className="mt-8"
                        >
                            <LanguageSwitcher locale={locale} />
                        </motion.div>

                        {/* Let's Talk CTA in mobile menu */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.42 }}
                            className="mt-6"
                        >
                            <Link
                                href={`/${locale}/contact`}
                                onClick={() => setMobileMenuOpen(false)}
                                className="inline-flex items-center gap-2 px-6 py-3 text-[11px] uppercase tracking-[0.18em] font-bold border border-gold-400/30 text-gold-400 rounded-full hover:bg-gold-400 hover:text-black transition-all duration-500 touch-manipulation"
                            >
                                {dict.nav.letsTalk}
                                <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                            </Link>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="absolute bottom-8 text-center"
                            style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
                        >
                            <p className="text-[10px] text-gray-600 uppercase tracking-[0.3em]">
                                Mohamed Bouliani © {new Date().getFullYear()}
                            </p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
