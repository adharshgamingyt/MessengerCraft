"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";

export const Navbar = () => {
  const Nav = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Check if navbar is out of viewport
      if (Nav.current) {
        const navHeight = Nav.current.offsetHeight;

        // If scrolling down and past the navbar height
        if (currentScrollY > navHeight && currentScrollY > lastScrollY) {
          setIsSticky(true);
        }
        // If scrolling up or at the top
        else if (currentScrollY < lastScrollY || currentScrollY <= 0) {
          setIsSticky(false);
        }
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <nav
      className={`left-0 z-50 flex h-16 items-center justify-between px-4 transition-all duration-300 sm:px-6 lg:px-8 ${
        isSticky
          ? "fixed top-0 w-full bg-black/70 shadow-md backdrop-blur-lg"
          : "relative"
      }`}
      ref={Nav}
    >
      <div className="flex flex-1 items-center justify-between">
        {/* Logo - Hide when sticky */}
        <div
          className={`flex-shrink-0 transition-opacity duration-300 ${isSticky ? "opacity-0" : "opacity-100"}`}
        >
          <Link href="/">
            <Image src="/logo-no-bg.png" alt="Logo" width={80} height={80} />
          </Link>
        </div>

        {/* Navigation Links - Always visible, centered when sticky */}
        <div
          className={`transition-all duration-300 md:block ${
            isSticky ? "absolute left-1/2 -translate-x-1/2 transform" : "hidden"
          }`}
        >
          <div className="flex space-x-4">
            <Link
              href="/"
              className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-md transition-colors duration-200 hover:bg-white/20 hover:text-white"
            >
              Home
            </Link>
            <Link
              href="/features"
              className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-md transition-colors duration-200 hover:bg-white/20 hover:text-white"
            >
              Feature
            </Link>
            <Link
              href="/support"
              className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-md transition-colors duration-200 hover:bg-white/20 hover:text-white"
            >
              Support
            </Link>
            <Link
              href="/about-us"
              className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-md transition-colors duration-200 hover:bg-white/20 hover:text-white"
            >
              About Us
            </Link>
          </div>
        </div>

        {/* Desktop Buttons - Hide when sticky */}
        <div
          className={`flex items-center gap-4 transition-opacity duration-300 ${isSticky ? "opacity-0" : "opacity-100"}`}
        >
          <Button className="hidden items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-lg transition-all duration-200 hover:bg-white/20 md:inline-flex">
            <Link href={"/on-boarding"}>Get Started</Link>
          </Button>
          <Button className="hidden items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-lg transition-all duration-200 hover:bg-white/20 md:inline-flex">
            <Link href={"/download"}>Download</Link>
          </Button>
        </div>

        {/* Mobile Button - Hide when sticky */}
        <div
          className={`flex transition-opacity duration-300 md:hidden ${isSticky ? "opacity-0" : "opacity-100"}`}
        >
          <Button className="items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-lg transition-all duration-200 hover:bg-white/20">
            Download
          </Button>
        </div>
      </div>
    </nav>
  );
};
