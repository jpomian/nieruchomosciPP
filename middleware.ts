import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  console.log('Middleware running for:', request.nextUrl.pathname);
  
  // Check authentication
  const authCookie = request.cookies.get('auth');
  const isAuthenticated = authCookie?.value === 'true';

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // User is authenticated, proceed to panel
  return NextResponse.next();
}

// Configure middleware to only run on panel routes
export const config = {
  matcher: '/panel/:path*',
};