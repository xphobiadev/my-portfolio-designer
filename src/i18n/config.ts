export const locales = ['fr', 'en', 'ar'] as const;
export const defaultLocale = 'fr' as const;

export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  fr: 'Français',
  en: 'English',
  ar: 'العربية',
};

export const localeDirection: Record<Locale, 'ltr' | 'rtl'> = {
  fr: 'ltr',
  en: 'ltr',
  ar: 'rtl',
};
