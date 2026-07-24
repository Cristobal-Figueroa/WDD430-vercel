import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import { NextResponse } from 'next/server';
import { auth } from './auth';
 
export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isOnDashboard = req.nextUrl.pathname.startsWith('/dashboard');
  if (isOnDashboard) {
    if (isLoggedIn) return NextResponse.next();
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  } else if (isLoggedIn) {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
  }
  return NextResponse.next();
});
 
export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
