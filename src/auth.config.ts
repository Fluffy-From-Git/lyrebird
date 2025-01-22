import type { NextAuthConfig } from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import db from "@/drizzle";
import * as schema from "@/drizzle/schema";

export const authConfig = {
  adapter: {
    ...DrizzleAdapter(db, {
      accountsTable: schema.accounts,
      usersTable: schema.users,
      authenticatorsTable: schema.authenticators,
      sessionsTable: schema.sessions,
      verificationTokensTable: schema.verificationTokens,
    }),
  },
  session: { strategy: "jwt" },
  secret: process.env.AUTH_SECRET,
  pages: { signIn: "/login", signOut: "/login" },
  callbacks: {
    authorized({ auth, request }) {
      const { nextUrl } = request;
      const authenticatedPages: string[] = ["/history", "/consult"];

      const isLoggedIn = !!auth?.user;
      const isOnAuthPage = authenticatedPages.some((page) =>
        nextUrl.pathname.startsWith(page),
      );

      if (isLoggedIn && !isOnAuthPage) {
        return Response.redirect(new URL("/consult", nextUrl));
      }

      if (!isLoggedIn && isOnAuthPage) {
        return Response.redirect(new URL("/login", nextUrl));
      }

      return true;
    },
    // async jwt({ token, user, trigger, session }) {
    //   if (trigger === "update") {
    //     return { ...token, ...session.user };
    //   }

    //   if (user?.id) token.id = user.id;
    //   if (user?.role) token.role = user.role;

    //   return token;
    // },
    // session({ session, token }) {
    //   session.user.id = token.id;
    //   session.user.role = token.role;

    //   return session;
    // },
    // signIn({ user, account }) {
    //   if (account?.provider === "credentials") {
    //     if (user.emailVerified) return true;
    //   }

    //   return false;
    // },
  },
  providers: [],
} satisfies NextAuthConfig;
