"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ThemeToggle } from "@/components/ThemeToggle";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";

export function Header({ locale, dict, logoText }: { locale: Locale; dict: Dictionary; logoText?: string }) {
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const lastScrollY = useRef(0);
    const headerRef = useRef<HTMLElement>(null);

    // Determine if a nav link is active
    const isActive = (linkPath: string) => {
        if (pathname === linkPath) return true;
        if (linkPath !== `/${locale}` && pathname.startsWith(linkPath + '/')) return true;
        return false;
    };

    // Hide on scroll down, show on scroll up
    const handleScroll = useCallback(() => {
        const currentScrollY = window.scrollY;
        setIsScrolled(currentScrollY > 50);
        
        if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
            setIsHidden(true);
        } else {
            setIsHidden(false);
        }
        lastScrollY.current = currentScrollY;
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [mobileMenuOpen]);

    // Close mobile menu on Escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && mobileMenuOpen) {
                setMobileMenuOpen(false);
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [mobileMenuOpen]);

    if (pathname.startsWith('/admin')) return null;

    const navLinks = [
        { name: dict.nav.work, path: `/${locale}/work` },
        { name: dict.nav.photography, path: `/${locale}/photography` },
        { name: dict.nav.videos, path: `/${locale}/videos` },
        { name: dict.nav.audio, path: `/${locale}/audio` },
        { name: dict.nav.about, path: `/${locale}/about` },
        { name: dict.nav.contact, path: `/${locale}/contact` },
    ];

    return (
        <>
            <header
                ref={headerRef}
                role="banner"
                className={`fixed top-0 w-full z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isHidden ? '-translate-y-full' : 'translate-y-0'
                } ${
                    isScrolled
                        ? 'py-3 md:py-4'
                        : 'py-5 md:py-6'
                }`}
            >
                {/* Glassmorphism background layer */}
                <div
                    className={`absolute inset-0 transition-all duration-700 ${
                        isScrolled
                            ? 'bg-[var(--color-bg)]/80 backdrop-blur-2xl shadow-[0_8px_32px_var(--color-shadow),0_0_80px_var(--color-glow)]'
                            : 'bg-transparent backdrop-blur-none'
                    }`}
                    style={{
                        borderBottom: isScrolled ? '1px solid var(--color-border)' : '1px solid transparent',
                    }}
                />

                <div className="container mx-auto px-4 sm:px-6 md:px-12 flex justify-between items-center relative z-10">
                    {/* Logo with 3D perspective effect */}
                    <Link
                        href={`/${locale}`}
                        className="relative group flex-shrink-0 perspective"
                        aria-label="Home"
                    >
                        <motion.span
                            className="text-2xl md:text-3xl font-heading font-bold tracking-[0.12em] inline-block gradient-text"
                            whileHover={{ 
                                rotateY: 10,
                                rotateX: -5,
                                scale: 1.05,
                            }}
                            transition={{ type: "spring", stiffness: 400, damping: 20 }}
                            style={{ transformStyle: 'preserve-3d' }}
                        >
                            {logoText ?? 'MB'}
                        </motion.span>
                        {/* Animated glow under logo */}
                        <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-secondary)] group-hover:w-full transition-all duration-500 ease-out rounded-full" />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main navigation">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                href={link.path}
                                aria-current={isActive(link.path) ? "page" : undefined}
                                className={`relative px-4 xl:px-5 py-3 min-h-[44px] inline-flex items-center text-[12px] xl:text-[13px] uppercase tracking-[0.15em] font-medium transition-all duration-300 rounded-full group focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] ${
                                    isActive(link.path)
                                        ? "text-[var(--color-accent)]"
                                        : "text-[var(--color-text-secondary)] hover:text-[var(--color-text)]"
                                }`}
                            >
                                <span className="relative z-10">{link.name}</span>
                                {/* Hover underline animation - scale from center */}
                                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-secondary)] group-hover:w-3/4 transition-all duration-300 ease-out rounded-full" />
                                {/* Active indicator */}
                                {isActive(link.path) && (
                                    <motion.span
                                        layoutId="nav-active-pill"
                                        className="absolute inset-0 rounded-full bg-[var(--color-accent)]/[0.08] border border-[var(--color-accent)]/20"
                                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                                    />
                                )}
                            </Link>
                        ))}
                    </nav>

                    {/* Right side controls */}
                    <div className="flex items-center gap-2 md:gap-3">
                        <ThemeToggle />
                        <LanguageSwitcher locale={locale} />

                        {/* CTA Button with magnetic feel */}
                        <Link
                            href={`/${locale}/contact`}
                            className="hidden md:inline-flex items-center gap-2 px-6 xl:px-7 py-3 xl:py-3.5 text-[11px] xl:text-[12px] uppercase tracking-[0.15em] font-bold bg-[var(--color-accent)] text-[var(--color-bg)] rounded-full hover:scale-105 hover:shadow-[0_0_40px_var(--color-glow)] transition-all duration-300 magnetic-btn relative overflow-hidden group"
                        >
                            <span className="relative z-10">{dict.nav.letsTalk}</span>
                            <ArrowUpRight className="w-3.5 h-3.5 xl:w-4 xl:h-4 relative z-10 group-hover:rotate-45 transition-transform duration-300" aria-hidden="true" />
                        </Link>

                        {/* Mobile menu toggle */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="lg:hidden relative w-11 h-11 flex items-center justify-center rounded-full border border-[var(--color-border)] hover:border-[var(--color-accent)]/30 hover:bg-[var(--color-surface)] transition-all duration-300"
                            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                            aria-expanded={mobileMenuOpen}
                            aria-controls="mobile-menu"
                        >
                            <motion.div
                                animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                {mobileMenuOpen ? (
                                    <X className="w-4 h-4 text-[var(--color-text)]" aria-hidden="true" />
                                ) : (
                                    <Menu className="w-4 h-4 text-[var(--color-text)]" aria-hidden="true" />
                                )}
                            </motion.div>
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu - Full Screen with 3D reveal */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        id="mobile-menu"
                        role="dialog"
                        aria-modal="true"
                        aria-label="Navigation menu"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed inset-0 z-[60] bg-[var(--color-bg)]/98 backdrop-blur-2xl flex flex-col items-center justify-center"
                        style={{ paddingTop: 'env(safe-area-inset-top)', paddingBottom: 'env(safe-area-inset-bottom)' }}
                    >
                        {/* Close button */}
                        <button
                            onClick={() => setMobileMenuOpen(false)}
                            className="absolute top-4 right-4 md:top-5 md:right-6 w-11 h-11 flex items-center justify-center rounded-full border border-[var(--color-border)] hover:border-[var(--color-accent)]/30 transition-colors"
                            aria-label="Close menu"
                        >
                            <X className="w-4 h-4 text-[var(--color-text)]" aria-hidden="true" />
                        </button>

                        {/* Background decorative elements */}
                        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[var(--color-accent)]/5 rounded-full blur-[100px] pointer-events-none" aria-hidden="true" />
                        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-[var(--color-accent-secondary)]/5 rounded-full blur-[80px] pointer-events-none" aria-hidden="true" />

                        <nav className="flex flex-col items-center gap-2 w-full px-6" aria-label="Mobile navigation">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.path}
                                    initial={{ opacity: 0, y: 30, rotateX: -15 }}
                                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                                    exit={{ opacity: 0, y: -15 }}
                                    transition={{ delay: i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                    className="w-full text-center perspective"
                                >
                                    <Link
                                        href={link.path}
                                        onClick={() => setMobileMenuOpen(false)}
                                        aria-current={isActive(link.path) ? "page" : undefined}
                                        className={`block text-2xl sm:text-3xl font-heading font-bold uppercase tracking-wider py-3 px-8 min-h-[44px] rounded-xl transition-all duration-300 ${
                                            isActive(link.path)
                                                ? "gradient-text"
                                                : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
                                        }`}
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>

                        {/* Language switcher + CTA in mobile */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                            className="mt-8 flex flex-col items-center gap-4"
                        >
                            <LanguageSwitcher locale={locale} />
                            <Link
                                href={`/${locale}/contact`}
                                onClick={() => setMobileMenuOpen(false)}
                                className="inline-flex items-center gap-2 px-6 py-3 min-h-[44px] text-[11px] uppercase tracking-[0.18em] font-bold border border-[var(--color-accent)]/30 text-[var(--color-accent)] rounded-full hover:bg-[var(--color-accent)] hover:text-[var(--color-bg)] transition-all duration-300"
                            >
                                {dict.nav.letsTalk}
                                <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                            </Link>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="absolute bottom-8 text-[10px] text-[var(--color-text-muted)] uppercase tracking-[0.3em]"
                        >
                            Mohamed Bouliani © {new Date().getFullYear()}
                        </motion.p>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
