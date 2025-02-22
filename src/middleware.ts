import { NextRequest, NextResponse, userAgent } from 'next/server';

export default async function middleware(request: NextRequest) {
  const agent = userAgent({ headers: request.headers });

  request.headers.set('x-url', request.url);
  request.headers.set('x-pathname', request.nextUrl.pathname);

  return NextResponse.next({ request });
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/* (_next/ resources)
     * - favicon.ico (favicon file)
     * - manifest.webmanifest (Manifest file)
     * - *.svg, *.png (Image files)
     * - mockServiceWorker.js (MSW Worker file)
     */
    '/((?!api|_next|favicon.ico|manifest.webmanifest|.*\.svg$|.*\.png$|mockServiceWorker.js).*)',
  ],
};
