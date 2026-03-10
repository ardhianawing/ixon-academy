import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

const publicRoutes = ["/", "/login", "/register"];

const roleRoutes: Record<string, string[]> = {
  COACH: ["/coach"],
  ADMIN: ["/admin"],
  SCOUTING: ["/scouting"],
  PARENT: ["/parent"],
};

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;

    // Check role-based routes
    for (const [role, prefixes] of Object.entries(roleRoutes)) {
      for (const prefix of prefixes) {
        if (pathname.startsWith(prefix) && token?.role !== role) {
          const url = req.nextUrl.clone();
          url.pathname = "/dashboard";
          return NextResponse.redirect(url);
        }
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized({ req, token }) {
        const { pathname } = req.nextUrl;

        // Allow public routes
        if (publicRoutes.some((route) => pathname === route)) {
          return true;
        }

        // Allow API auth routes
        if (pathname.startsWith("/api/auth")) {
          return true;
        }

        // All other routes require authentication
        return !!token;
      },
    },
    pages: {
      signIn: "/login",
    },
  }
);

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico
     * - public files
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
