import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";

import { db } from "@/src/db";
import { authConfig } from "./auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
