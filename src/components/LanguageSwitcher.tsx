"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { locales, localeNames, type Locale } from "@/i18n/config";

export function LanguageSwitcher({ locale }: { locale: Locale }) {
    const pathname = usePathname();

    // Remove the current locale prefix from the pathname
    const pathnameWithoutLocale = pathname.replace(`/${locale}`, '') || '/';

    return (
        <div className="flex items-center gap-0.5 md:gap-1" role="navigation" aria-label="Language switcher">
            {locales.map((loc) => (
                <Link
                    key={loc}
                    href={`/${loc}${pathnameWithoutLocale}`}
                    className={`px-2 md:px-2.5 py-1.5 text-[10px] uppercase tracking-[0.1em] font-medium rounded-full transition-all duration-300 touch-manipulation ${
                        loc === locale
                            ? 'bg-gold-400/15 text-gold-400 border border-gold-400/30'
                            : 'text-gray-500 hover:text-white hover:bg-white/5 active:text-white active:bg-white/5 border border-transparent'
                    }`}
                    title={localeNames[loc]}
                    aria-label={`Switch to ${localeNames[loc]}`}
                    aria-current={loc === locale ? 'true' : undefined}
                    hrefLang={loc}
                >
                    {loc}
                </Link>
            ))}
        </div>
    );
}
