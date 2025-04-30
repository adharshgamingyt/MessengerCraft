import Github from "next-auth/providers/github";

import type { NextAuthConfig } from "next-auth";

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  providers: [],
  callbacks: {},
};
