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
        // Mock authentication — accept any phone/password combo
        if (!credentials?.phone || !credentials?.password) {
          return null;
        }

        // Return mock user
        const mockUser = {
          id: "mock-user-001",
          name: "IXON Player",
          phone: credentials.phone,
          role: "PLAYER" as const,
          tier: "FREE" as const,
        };

        return mockUser;
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
