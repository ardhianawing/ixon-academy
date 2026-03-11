import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

const publicRoutes = ["/", "/login", "/register"];

// Home page per role
const roleHome: Record<string, string> = {
  COACH: "/coach/queue",
  ADMIN: "/admin/dashboard",
  SCOUTING: "/scouting/talent-board",
  PARENT: "/parent/dashboard",
  PLAYER: "/dashboard",
};

// Routes yang hanya boleh diakses role tertentu
const restrictedPrefixes: Record<string, string[]> = {
  COACH: ["/coach"],
  ADMIN: ["/admin"],
  SCOUTING: ["/scouting"],
  PARENT: ["/parent"],
};

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;
    const role = (token?.role as string) ?? "PLAYER";

    // Redirect /dashboard ke role home jika bukan PLAYER
    if (pathname === "/dashboard" && role !== "PLAYER") {
      const url = req.nextUrl.clone();
      url.pathname = roleHome[role] ?? "/dashboard";
      return NextResponse.redirect(url);
    }

    // Blokir akses ke route yang bukan milik role ini
    for (const [allowedRole, prefixes] of Object.entries(restrictedPrefixes)) {
      for (const prefix of prefixes) {
        if (pathname.startsWith(prefix) && role !== allowedRole) {
          const url = req.nextUrl.clone();
          url.pathname = roleHome[role] ?? "/dashboard";
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
        if (publicRoutes.some((route) => pathname === route)) return true;
        if (pathname.startsWith("/api/auth")) return true;
        return !!token;
      },
    },
    pages: { signIn: "/login" },
  }
);

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
