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
  pages: { signIn: "/login" },
  callbacks: {
    authorized({ auth, request }) {
      const { nextUrl } = request;

      const isLoggedIn = !!auth?.user;
      const isOnProfile = nextUrl.pathname.startsWith("/dashboard");
      // if on login or register page and logged in, redirect to profile
      const isOnAuth = nextUrl.pathname.startsWith("/login");

      if (!isLoggedIn && isOnProfile) {
        return Response.redirect(new URL("/login", nextUrl));
      }

      if (isLoggedIn && !isOnProfile) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }

      if (isOnAuth) {
        if (!isLoggedIn) return true;
        return Response.redirect(new URL("/dashboard", nextUrl));
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
