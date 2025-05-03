import type { layout } from "@/src/types/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "On-Boarding",
};

const OnBoardingLayout = ({ children }: layout) => {
  return <div>{children}</div>;
};

export default OnBoardingLayout;
