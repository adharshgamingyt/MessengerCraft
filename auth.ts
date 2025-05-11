import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";

import { db } from "@/src/db";
import { getUserById } from "@/src/data/User";
import { authConfig } from "@/auth.config";

export const { handlers, auth, signIn, signOut, unstable_update } = NextAuth({
  callbacks: {
    // async signIn({ user, account, profile, email, credentials }) {
    //   //Note: can block user's from login
    //   return true;
    // },
    // async redirect({ url, baseUrl }) {
    //   return baseUrl;
    // },
    async session({ session, user, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
        session.user.name = token.name;
        session.user.username = token.username;
        session.user.emailVerified = token.emailVerified;
      }

      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      token.username = existingUser.username as string;
      token.emailVerified = existingUser.emailVerified as Date;

      return token;
    },
  },
  adapter: DrizzleAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
