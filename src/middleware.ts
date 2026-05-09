import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define protected and public routes
const protectedRoutes = ["/me", "/reservations"];
const authRoutes = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check for refresh token cookie as a proxy for authentication on the server-side
  // Note: True authentication state is managed in the Zustand store (client-side)
  // but middleware can use the cookie to handle early redirects.
  const hasRefreshToken = request.cookies.has("refreshToken");

  // 1. Redirect unauthenticated users from protected routes to login
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );
  if (isProtectedRoute && !hasRefreshToken) {
    const url = new URL("/login", request.url);
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }

  // 2. Redirect authenticated users away from auth routes to home
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));
  if (isAuthRoute && hasRefreshToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
