import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";

import { db } from "@/src/db";
import { getUserById } from "@/src/data/User";
import { authConfig } from "@/auth.config";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
  unstable_update,
} = NextAuth({
  adapter: DrizzleAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
  callbacks: {
    async signIn({ user, account, credentials }) {
      return true;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      session.user.name = token.name;
      session.user.username = token.username;
      session.user.emailVerified = token.emailVerified;

      // console.log("Session", session);
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      token.name = existingUser.name;
      token.username = existingUser.username;
      token.emailVerified = existingUser.emailVerified;

      // console.log("JWT: ", token);
      return token;
    },
  },
});
