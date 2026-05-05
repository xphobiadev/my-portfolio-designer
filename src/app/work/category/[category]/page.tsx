import { redirect } from 'next/navigation';
import { defaultLocale } from '@/i18n/config';

export default async function WorkCategoryRedirect({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  redirect(`/${defaultLocale}/work/category/${category}`);
}
