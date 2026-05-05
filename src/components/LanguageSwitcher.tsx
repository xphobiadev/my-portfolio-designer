"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { locales, localeNames, type Locale } from "@/i18n/config";

export function LanguageSwitcher({ locale }: { locale: Locale }) {
    const pathname = usePathname();

    // Remove the current locale prefix from the pathname
    const pathnameWithoutLocale = pathname.replace(`/${locale}`, '') || '/';

    return (
        <div
            className="flex items-center gap-0.5 bg-white/[0.04] border border-white/[0.06] rounded-full px-1 py-0.5"
            role="navigation"
            aria-label="Language switcher"
        >
            {locales.map((loc) => (
                <Link
                    key={loc}
                    href={`/${loc}${pathnameWithoutLocale}`}
                    className={`px-2.5 py-1 text-[10px] uppercase tracking-[0.1em] font-semibold rounded-full transition-all duration-300 touch-manipulation ${
                        loc === locale
                            ? 'bg-gold-400 text-black shadow-sm'
                            : 'text-gray-400 hover:text-white hover:bg-white/[0.06] active:text-white border border-transparent'
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
