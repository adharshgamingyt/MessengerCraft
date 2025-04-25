import Footer from "@/src/components/my ui/download/footer";
import { Navbar } from "@/src/components/my ui/download/navbar";
import type { layout } from "@/src/types/types";
import { Metadata } from "next";

import React from "react";

export const metadata: Metadata = {
  title: "Download",
};

const layout = ({ children }: layout) => {
  return (
    <div className="h-full w-full bg-black">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default layout;
