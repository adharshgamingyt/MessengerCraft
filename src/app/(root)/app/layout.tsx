import React from "react";
import type { layout } from "@/src/types/types";

const AppLayout = ({ children }: layout) => {
  return <div>{children}</div>;
};

export default AppLayout;
