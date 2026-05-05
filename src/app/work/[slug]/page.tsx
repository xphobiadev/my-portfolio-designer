import { redirect } from 'next/navigation';
import { defaultLocale } from '@/i18n/config';

export default function WorkSlugRedirect({ params }: { params: { slug: string } }) {
  redirect(`/${defaultLocale}/work/${params.slug}`);
}
