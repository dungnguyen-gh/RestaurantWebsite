import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyJWT, getTokenFromCookie } from "@/lib/auth";

// Paths that require authentication
const protectedPaths = ["/admin/dashboard"];

// API paths that require authentication
const protectedApiPaths = ["/api/menu", "/api/orders", "/api/upload"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if this is a protected admin page
  if (protectedPaths.some((path) => pathname.startsWith(path))) {
    const cookieHeader = request.headers.get("cookie");
    const token = getTokenFromCookie(cookieHeader);

    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    const payload = await verifyJWT(token);

    if (!payload) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    // Add admin info to request headers for potential use in pages
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-admin-id", payload.id);
    requestHeaders.set("x-admin-email", payload.email);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  // Check if this is a protected API route (excluding GET requests for public data)
  if (protectedApiPaths.some((path) => pathname.startsWith(path))) {
    // Allow GET requests for menu and orders without auth (public read)
    if (request.method === "GET" && !pathname.includes("/api/upload")) {
      return NextResponse.next();
    }

    // Require auth for mutations (POST, PUT, DELETE)
    const cookieHeader = request.headers.get("cookie");
    const token = getTokenFromCookie(cookieHeader);

    if (!token) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const payload = await verifyJWT(token);

    if (!payload) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 }
      );
    }

    // Add admin info to request headers
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-admin-id", payload.id);
    requestHeaders.set("x-admin-email", payload.email);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/menu/:path*", "/api/orders/:path*", "/api/upload"],
};
