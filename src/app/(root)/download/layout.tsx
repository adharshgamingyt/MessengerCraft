import Footer from "@/src/components/my ui/download/footer";
import { Navbar } from "@/src/components/my ui/download/navbar";
import type { layout } from "@/src/types/types";

import React from "react";

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
