import { getFeaturedProjects, getSettings } from "@/lib/data";
import { getDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";
import HomeClient from "@/components/HomeClient";

export const dynamic = 'force-dynamic';

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const projects = await getFeaturedProjects();
  const settings = await getSettings();

  return (
    <HomeClient
      locale={locale}
      dict={dict}
      projects={projects}
      settings={settings}
    />
  );
}
