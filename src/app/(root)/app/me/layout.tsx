import React from "react";

import type { layout } from "@/src/types/types";
import { Metadata } from "next";
import { currentUser } from "@/src/lib/auth";

export const UserName = async () => {
  const user = await currentUser();
  return user?.name;
};

export async function generateMetadata(): Promise<Metadata> {
  const user = await currentUser();
  return {
    title: user?.name ? `@${user.name}` : "@me",
  };
}

const MePagelayout = ({ children }: layout) => {
  return <div>{children}</div>;
};

export default MePagelayout;
