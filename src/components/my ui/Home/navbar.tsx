import Link from "next/link";

import { Button } from "@/components/ui/button";
import Image from "next/image";

export const Navbar = () => {
  return (
    <nav className="left-0 z-50 flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
      <div className="flex flex-1 items-center justify-between">
        <div className="flex-shrink-0">
          <Link href="/">
            <Image src="/logo-no-bg.png" alt="Logo" width={80} height={80} />
          </Link>
        </div>
        <div className="hidden md:block">
          <div className="flex space-x-8">
            <Link
              href="/"
              className="text-sm font-medium text-white/90 underline-offset-4 transition-colors duration-200 hover:text-white hover:underline"
            >
              Home
            </Link>
            <Link
              href="/feature's"
              className="text-sm font-medium text-white/90 underline-offset-4 transition-colors duration-200 hover:text-white hover:underline"
            >
              Feature
            </Link>
            <Link
              href="/support"
              className="text-sm font-medium text-white/90 underline-offset-4 transition-colors duration-200 hover:text-white hover:underline"
            >
              Support
            </Link>
            <Link
              href="/about-us"
              className="text-sm font-medium text-white/90 underline-offset-4 transition-colors duration-200 hover:text-white hover:underline"
            >
              About Us
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button className="hidden items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-lg transition-all duration-200 hover:bg-white/20 md:inline-flex">
            <Link href={"/on-boarding"}>Get Started</Link>
          </Button>
          <Button className="hidden items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-lg transition-all duration-200 hover:bg-white/20 md:inline-flex">
            <Link href={"/download"}>Download</Link>
          </Button>
        </div>
        <div className="flex md:hidden">
          <Button className="items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-lg transition-all duration-200 hover:bg-white/20">
            Download
          </Button>
        </div>
      </div>
    </nav>
  );
};
