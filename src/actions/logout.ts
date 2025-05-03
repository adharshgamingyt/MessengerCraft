"use server";

import { signOut } from "@/auth";
import { DEFAULT_LOGOUT_REDIRECT } from "@/src/routes";

export const logout = async () => {
  // Note: Add any additional cleanup logic here if needed
  await signOut({ redirectTo: DEFAULT_LOGOUT_REDIRECT });
};
