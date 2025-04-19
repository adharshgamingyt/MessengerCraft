import { Navbar } from "@/src/components/my ui/Home/navbar";
import type { layout } from "@/src/types/types";

const layout = ({ children }: layout) => {
  return (
    <div className="h-full w-full bg-black">
      <Navbar />
      {children}
    </div>
  );
};

export default layout;
