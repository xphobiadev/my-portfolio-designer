import type { Metadata, Viewport } from "next";
import { Inter, Outfit, Cairo } from "next/font/google";
import "../globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ReadingProgress } from "@/components/ReadingProgress";
import { locales, localeDirection, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { getSettings } from "@/lib/data";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  display: "swap",
  preload: false, // only load when needed
});

export const metadata: Metadata = {
  title: "Mohamed Bouliani | Cinematic Portfolio",
  description: "Designer. Photographer. Filmmaker. Audio Engineer. Crafting powerful brands and immersive cinematic experiences.",
  keywords: ["portfolio", "designer", "photographer", "filmmaker", "audio engineer", "cinematic", "creative"],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://mohamedbouliani.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Mohamed Bouliani Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#030303',
  colorScheme: 'dark',
};

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang = locale as Locale;
  const dir = localeDirection[lang] || 'ltr';
  const dict = await getDictionary(lang);
  const settings = await getSettings();

  return (
    <html
      lang={lang}
      dir={dir}
      suppressHydrationWarning
      className={`${inter.variable} ${outfit.variable} ${cairo.variable} h-full antialiased dark`}
    >
      <head>
        {/* Anti-flash theme script — runs before first paint to apply stored/system theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark'){document.documentElement.setAttribute('data-theme',t);}else if(window.matchMedia('(prefers-color-scheme: light)').matches){document.documentElement.setAttribute('data-theme','light');}}catch(e){}})();`,
          }}
        />
        {/* DNS prefetch for Supabase */}
        {process.env.NEXT_PUBLIC_SUPABASE_URL && (
          <link rel="dns-prefetch" href={process.env.NEXT_PUBLIC_SUPABASE_URL} />
        )}
        {process.env.NEXT_PUBLIC_SUPABASE_URL && (
          <link rel="preconnect" href={process.env.NEXT_PUBLIC_SUPABASE_URL} />
        )}
      </head>
      <body className={`min-h-full flex flex-col bg-background text-foreground selection:bg-gold-400/20 selection:text-gold-300 ${dir === 'rtl' ? 'font-arabic' : 'font-sans'}`}>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:rounded">
          Aller au contenu principal
        </a>
        <ReadingProgress />
        <Header locale={lang} dict={dict} />
        <main id="main-content" className="flex-grow flex flex-col" aria-label="Main content">{children}</main>
        <Footer locale={lang} dict={dict} settings={settings} />
      </body>
    </html>
  );
}
