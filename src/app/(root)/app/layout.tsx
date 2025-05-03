import { Metadata } from "next";

import type { layout } from "@/src/types/types";
import { currentUser } from "@/src/lib/auth";

const user = await currentUser();

export const metadata: Metadata = {
  title: `${user?.name}`,
};

const layout = ({ children }: layout) => {
  return <div className="h-full w-full bg-black">{children}</div>;
};

export default layout;
