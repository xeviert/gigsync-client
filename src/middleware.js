// src/middleware.js
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

// Define the routes that should be publicly accessible
const publicRoutes = ['/authentication/login', '/authentication/register'];

export function middleware(req) {
  // Retrieve the token from cookies
  const authToken = req.cookies.get('authToken');

  // Check if the current route is public
  const isPublicRoute = publicRoutes.some(route =>
    req.nextUrl.pathname.startsWith(route)
  );

  // Allow requests to public routes without authentication
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // If there's no auth token and the route is not public, redirect to login
  if (!authToken) {
    return NextResponse.redirect(new URL('/authentication/login', req.url));
  }

  // If the auth token exists, continue with the request
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'], // Apply middleware to all routes except static files and APIs
};