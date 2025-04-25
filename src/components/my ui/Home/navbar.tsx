"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/src/components/ui/button";
import { ShineBorder } from "../../ui/shine-border";

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
      ref={Nav}
      className={`left-0 z-50 flex h-16 items-center justify-between transition-all duration-75 ${
        isSticky
          ? "fixed top-0 w-full bg-transparent shadow-md backdrop-blur-lg"
          : "relative"
      }`}
    >
      <ShineBorder
        className={`w-full px-4 sm:px-6 lg:px-8 ${isSticky ? "w-fit items-center justify-center" : "w-full"}`}
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
            className={`transition-all duration-300 ${
              isSticky
                ? "absolute left-1/2 flex w-full -translate-x-1/2 transform justify-center" // Better centering
                : "hidden md:block" // Hidden on mobile, visible on desktop when not sticky
            }`}
          >
            <div className="flex items-center justify-center space-x-6">
              {/* Mobile (sticky) vs Desktop styling */}
              <Link
                href="/"
                className={`text-center text-xs font-medium text-white transition-all duration-200 md:rounded-full md:bg-white/10 md:px-4 md:py-2 md:text-sm md:backdrop-blur-md md:hover:bg-white/20 ${
                  isSticky ? "hover:underline md:hover:no-underline" : ""
                }`}
              >
                Home
              </Link>
              <Link
                href="/features"
                className={`text-center text-xs font-medium text-white transition-all duration-200 md:rounded-full md:bg-white/10 md:px-4 md:py-2 md:text-sm md:backdrop-blur-md md:hover:bg-white/20 ${
                  isSticky ? "hover:underline md:hover:no-underline" : ""
                }`}
              >
                Feature
              </Link>
              <Link
                href="/support"
                className={`text-center text-xs font-medium text-white transition-all duration-200 md:rounded-full md:bg-white/10 md:px-4 md:py-2 md:text-sm md:backdrop-blur-md md:hover:bg-white/20 ${
                  isSticky ? "hover:underline md:hover:no-underline" : ""
                }`}
              >
                Support
              </Link>
              <Link
                href="/about-us"
                className={`text-center text-xs font-medium text-white transition-all duration-200 md:rounded-full md:bg-white/10 md:px-4 md:py-2 md:text-sm md:backdrop-blur-md md:hover:bg-white/20 ${
                  isSticky ? "hover:underline md:hover:no-underline" : ""
                }`}
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
              <Link href={"/download"}>Download</Link>
            </Button>
          </div>
        </div>
      </ShineBorder>
    </nav>
  );
};
