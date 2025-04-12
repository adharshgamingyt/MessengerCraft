import { Navbar } from "@/components/my ui/Home/navbar";
import type { layout } from "@/types/layout";

const layout = ({ children }: layout) => {
  return (
    <div className="h-full w-full bg-black">
      <Navbar />
      {children}
    </div>
  );
};

export default layout;
