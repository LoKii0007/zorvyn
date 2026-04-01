import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Middleware to restrict navigation to only /dashboard and /transactions.
 * Redirects all other requests (including the root '/') to /dashboard.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Define allowed routes
  const allowedRoutes = ['/dashboard', '/transactions'];

  // 2. Check if the current pathname matches an allowed route exactly or is a sub-path
  const isAllowed = allowedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  // 3. If the path is allowed, continue
  if (isAllowed) {
    return NextResponse.next();
  }

  // 4. Redirect everything else (matched by the config) to /dashboard
  const dashboardUrl = new URL('/dashboard', request.url);
  return NextResponse.redirect(dashboardUrl);
}

/**
 * Matcher configuration for Next.js Middleware.
 * This excludes static files, images, and API routes to ensure they remain accessible.
 */
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
};
