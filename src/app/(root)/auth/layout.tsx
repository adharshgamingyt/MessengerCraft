import React from "react";

import type { layout } from "@/src/types/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication",
};

const Authlayout = ({ children }: layout) => {
  return <div>{children}</div>;
};

export default Authlayout;
