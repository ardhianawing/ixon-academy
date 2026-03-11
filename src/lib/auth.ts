import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

declare module "next-auth" {
  interface User {
    id: string;
    name: string;
    phone: string;
    role: "PLAYER" | "COACH" | "ADMIN" | "SCOUTING" | "PARENT";
    tier: "FREE" | "SILVER" | "GOLD" | "PLATINUM";
  }

  interface Session {
    user: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    phone: string;
    role: "PLAYER" | "COACH" | "ADMIN" | "SCOUTING" | "PARENT";
    tier: "FREE" | "SILVER" | "GOLD" | "PLATINUM";
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        phone: { label: "Nomor HP", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.phone || !credentials?.password) {
          return null;
        }

        // Demo accounts
        const demoAccounts: Record<string, { id: string; name: string; role: "PLAYER" | "COACH" | "ADMIN" | "SCOUTING" | "PARENT"; tier: "FREE" | "SILVER" | "GOLD" | "PLATINUM" }> = {
          "demo-player": { id: "demo-player", name: "TENSAI", role: "PLAYER", tier: "GOLD" },
          "demo-coach": { id: "demo-coach", name: "Coach Luminaire", role: "COACH", tier: "PLATINUM" },
          "demo-admin": { id: "demo-admin", name: "Admin IXON", role: "ADMIN", tier: "PLATINUM" },
          "demo-parent": { id: "demo-parent", name: "Bapak Andi", role: "PARENT", tier: "GOLD" },
          "demo-scout": { id: "demo-scout", name: "Scout EVOS", role: "SCOUTING", tier: "PLATINUM" },
        };

        const demo = demoAccounts[credentials.phone];
        if (demo) {
          return { ...demo, phone: credentials.phone };
        }

        // Fallback: accept any credentials as player
        return {
          id: "user-" + credentials.phone,
          name: "IXON Player",
          phone: credentials.phone,
          role: "PLAYER" as const,
          tier: "FREE" as const,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.phone = user.phone;
        token.role = user.role;
        token.tier = user.tier;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id,
        name: token.name ?? "IXON Player",
        phone: token.phone,
        role: token.role,
        tier: token.tier,
      };
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET ?? "ixon-academy-dev-secret-key",
};
