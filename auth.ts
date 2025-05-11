import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";

import { db } from "@/src/db";
import { getUserById } from "@/src/data/User";
import { authConfig } from "@/auth.config";
import async from "./src/app/(root)/on-boarding/page";

export const { handlers, auth, signIn, signOut, unstable_update } = NextAuth({
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      //Note: can block user's from login
      return true;
    },
    async session({ session, token }) {
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (token.sub) {
        console.log(token);
      }
      return token;
    },
  },
  adapter: DrizzleAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
