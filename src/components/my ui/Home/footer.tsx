"use client";

import React from "react";
import Link from "next/link";
import { Mail, Github, Twitter, Instagram } from "lucide-react";
import { ShineBorder } from "../../ui/shine-border";

const date = async () => {
  const currentDate = new Date();
  return currentDate.getFullYear();
};

const Footer = () => {
  return (
    <ShineBorder className="bg-black">
      <footer className="rounded-2xl rounded-t border-t border-gray-800 bg-black text-white">
        <div className="mx-auto max-w-7xl px-6 py-12">
          {/* Top section with logo and description */}
          <div className="mb-12 flex flex-col justify-between md:flex-row">
            <div className="mb-8 md:mb-0 md:w-1/3">
              <h2 className="text-2xl font-bold tracking-tight">
                MessengerCraft
              </h2>
              <p className="mt-4 max-w-md text-gray-400">
                Redefining digital communication with powerful features,
                seamless integration, and uncompromising security for personal
                and professional use.
              </p>
            </div>

            {/* Navigation links */}
            <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
              <div>
                <h3 className="mb-4 text-sm font-semibold tracking-wider uppercase">
                  Product
                </h3>
                <ul className="space-y-3">
                  <li>
                    <Link
                      href="/features"
                      className="text-gray-400 transition-colors hover:text-white"
                    >
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/security"
                      className="text-gray-400 transition-colors hover:text-white"
                    >
                      Security
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/integrations"
                      className="text-gray-400 transition-colors hover:text-white"
                    >
                      Integrations
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/pricing"
                      className="text-gray-400 transition-colors hover:text-white"
                    >
                      Pricing
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="mb-4 text-sm font-semibold tracking-wider uppercase">
                  Company
                </h3>
                <ul className="space-y-3">
                  <li>
                    <Link
                      href="/about"
                      className="text-gray-400 transition-colors hover:text-white"
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/blog"
                      className="text-gray-400 transition-colors hover:text-white"
                    >
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/careers"
                      className="text-gray-400 transition-colors hover:text-white"
                    >
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      className="text-gray-400 transition-colors hover:text-white"
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="mb-4 text-sm font-semibold tracking-wider uppercase">
                  Resources
                </h3>
                <ul className="space-y-3">
                  <li>
                    <Link
                      href="/docs"
                      className="text-gray-400 transition-colors hover:text-white"
                    >
                      Documentation
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/tutorials"
                      className="text-gray-400 transition-colors hover:text-white"
                    >
                      Tutorials
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/support"
                      className="text-gray-400 transition-colors hover:text-white"
                    >
                      Support
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/api"
                      className="text-gray-400 transition-colors hover:text-white"
                    >
                      API
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom section with social links, copyright */}
          <div className="flex flex-col items-center justify-between border-t border-gray-800 pt-8 md:flex-row">
            <p className="mb-4 text-sm text-gray-400 md:mb-0">
              © {date()} MessengerCraft. All rights reserved.
            </p>

            <div className="flex space-x-6">
              <a
                href="mailto:support@messengercraft.com"
                className="text-gray-400 transition-colors hover:text-white"
              >
                <span className="sr-only">Email</span>
                <Mail size={20} />
              </a>
              <a
                href="https://github.com/messengercraft"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 transition-colors hover:text-white"
              >
                <span className="sr-only">GitHub</span>
                <Github size={20} />
              </a>
              <a
                href="https://twitter.com/messengercraft"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 transition-colors hover:text-white"
              >
                <span className="sr-only">Twitter</span>
                <Twitter size={20} />
              </a>
              <a
                href="https://instagram.com/messengercraft"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 transition-colors hover:text-white"
              >
                <span className="sr-only">Instagram</span>
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Legal links */}
          <div className="mt-6 flex justify-center md:justify-end">
            <div className="flex space-x-6 text-xs text-gray-500">
              <Link
                href="/privacy"
                className="transition-colors hover:text-gray-400"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="transition-colors hover:text-gray-400"
              >
                Terms of Service
              </Link>
              <Link
                href="/cookies"
                className="transition-colors hover:text-gray-400"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </ShineBorder>
  );
};

export default Footer;
