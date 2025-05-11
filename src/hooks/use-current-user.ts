"use client";

import { useSession } from "next-auth/react";

export const useCurrentUser = () => {
  const user = useSession();

  return user.data?.user;
};
