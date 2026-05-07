import { NextRequest, NextResponse } from 'next/server';
import { locales, defaultLocale } from './src/i18n/config';

// Aliases that should redirect to their canonical paths
const PATH_ALIASES: Record<string, string> = {
  '/travaux': '/work',
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip admin routes, api routes, static files, and Next.js internals
  if (
    pathname.startsWith('/admin') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon') ||
    pathname.includes('.') // static files
  ) {
    return NextResponse.next();
  }

  // Check if the pathname already has a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    // Handle path aliases within localized routes (e.g. /fr/travaux → /fr/work)
    for (const locale of locales) {
      for (const [alias, canonical] of Object.entries(PATH_ALIASES)) {
        const aliasPath = `/${locale}${alias}`;
        if (pathname === aliasPath || pathname.startsWith(`${aliasPath}/`)) {
          const url = request.nextUrl.clone();
          url.pathname = pathname.replace(alias, canonical);
          return NextResponse.redirect(url, { status: 301 });
        }
      }
    }
    return NextResponse.next();
  }

  // Redirect to default locale
  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    // Match all paths except static files and api
    '/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
};
