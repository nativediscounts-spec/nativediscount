import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
const PUBLIC_FILE = /\.(.*)$/;
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

export function middleware(req) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("admin_token")?.value;
  const author_token = req.cookies.get("author_token")?.value;
// Skip static files/_next
  // If it's just the homepage `/`
  if (pathname === "/") {
    //return NextResponse.redirect(new URL("/us", req.url));
  }

  // if (
  //   pathname.startsWith('/_next') ||
  //   pathname.startsWith('/api') ||
  //   pathname.startsWith('/admin') ||
  //   PUBLIC_FILE.test(pathname)
  // ) {
  //   return;
  // }

  // // Supported locales
  // const locales = ['uk', 'es', 'fr'];
  // const defaultLocale = 'uk';

  // // Check if pathname already has a locale
  // const pathnameHasLocale = locales.some((locale) =>
  //   pathname.startsWith(`/${locale}`)
  // );

  // if (!pathnameHasLocale) {
  //   return NextResponse.redirect(
  //     new URL(`/${defaultLocale}${pathname}`, req.url)
  //   );
  // }
  // ✅ If token exists
  if (token || author_token) {
    try {
      jwt.verify(token, JWT_SECRET); // optional validation

      // If already logged in & trying to visit login page → go to dashboard
      if (pathname.startsWith("/admin/login")) {
        return NextResponse.redirect(new URL("/admin/dashboard", req.url));
      }
      return NextResponse.redirect();
      // Allow access to all other admin pages
      return NextResponse.next();
    } catch {
      // Invalid token → redirect to login
      //  return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }
  else if (!token && !author_token && !pathname.startsWith("/admin/login")) {
   // return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  // Allow access to login page without token
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"], // Apply to all admin routes
};
