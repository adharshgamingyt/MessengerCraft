"use client";

import {
  Star,
  Globe,
  Shield,
  Clock,
  ArrowRight,
  Download,
  Laptop,
  Smartphone,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/src/components/ui/button";
import { InteractiveGrid } from "@/src/components/ui/interactive-grid";
import { Separator } from "@/src/components/ui/separator";
import { ShineBorder } from "@/src/components/ui/shine-border";

const DownloadPage = () => {
  return (
    <ShineBorder className="relative min-h-screen overflow-hidden bg-black pt-32 pb-16">
      <InteractiveGrid
        containerClassName="absolute inset-0"
        className="opacity-30"
        points={40}
      />
      <ShineBorder
        className="relative z-10 mx-auto max-w-6xl px-6 pt-6 pb-2"
        borderClassName="border border-white/10 rounded-xl overflow-hidden"
      >
        <div className="mb-16 text-center text-white">
          <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl">
            Download MessengerCraft
            <br />
            For Any Device
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-400">
            Experience secure messaging across all your devices. Download
            MessengerCraft now and take control of your digital conversations
            with end-to-end encryption.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              variant="secondary"
              className="z-1 gap-2 bg-white text-black hover:bg-gray-100"
              size="lg"
            >
              <Download className="size-4" />
              Download for Windows
            </Button>
            <Button
              variant="secondary"
              className="z-1 gap-2 bg-white text-black hover:bg-gray-100"
              size="lg"
            >
              <Download className="size-4" />
              Download for Mac
            </Button>
            <Button
              variant="secondary"
              className="z-1 gap-2 bg-white text-black hover:bg-gray-100"
              size="lg"
            >
              <Download className="size-4" />
              Download for Linux
            </Button>
          </div>
          <div className="mt-4 flex justify-center gap-4">
            <Button
              variant="outline"
              className="z-1 gap-2 border-white/10 bg-white/5 hover:bg-white/10"
              asChild
            >
              <Link href="/app-store">App Store</Link>
            </Button>
            <Button
              variant="outline"
              className="z-1 gap-2 border-white/10 bg-white/5 hover:bg-white/10"
              asChild
            >
              <Link href="/google-play">Google Play</Link>
            </Button>
          </div>
        </div>
      </ShineBorder>

      <section className="mx-auto my-12 flex flex-wrap items-center justify-center gap-8 px-6 sm:gap-12">
        <div className="flex flex-col items-center">
          <div className="flex items-center text-4xl font-bold text-white">
            <span>4M+</span>
            <Globe className="ml-2 size-6 text-gray-400" />
          </div>
          <p className="text-sm text-gray-400">Active Users</p>
        </div>

        <Separator orientation="vertical" className="hidden h-16 sm:block" />

        <div className="flex flex-col items-center">
          <div className="flex items-center text-4xl font-bold text-white">
            <span>150+</span>
            <Shield className="ml-2 size-6 text-gray-400" />
          </div>
          <p className="text-sm text-gray-400">Countries</p>
        </div>

        <Separator orientation="vertical" className="hidden h-16 sm:block" />

        <div className="flex flex-col items-center">
          <div className="flex items-center text-4xl font-bold text-white">
            <span>4.9</span>
            <Star className="ml-2 size-6 text-yellow-400" />
          </div>
          <p className="text-sm text-gray-400">User Rating</p>
        </div>

        <Separator orientation="vertical" className="hidden h-16 sm:block" />

        <div className="flex flex-col items-center">
          <div className="flex items-center text-4xl font-bold text-white">
            <span>99.9%</span>
            <Clock className="ml-2 size-6 text-gray-400" />
          </div>
          <p className="text-sm text-gray-400">Uptime</p>
        </div>
      </section>

      <section className="mx-auto my-20 max-w-6xl px-6">
        <div className="text-center">
          <p className="relative text-3xl font-light tracking-widest text-white uppercase">
            <span className="absolute top-1/2 -left-6 h-px w-4 bg-white"></span>
            Available For
            <span className="absolute top-1/2 -right-6 h-px w-4 bg-white"></span>
          </p>
          <h2 className="mt-2 text-4xl font-black tracking-tight text-white uppercase md:text-5xl">
            All Platforms
          </h2>
          <div className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-white to-transparent"></div>
          <div className="mx-auto mt-2 h-px w-16 bg-white"></div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          <ShineBorder
            className="overflow-hidden rounded-xl bg-white/5 p-6"
            borderClassName="border border-white/10"
          >
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 rounded-full bg-white/10 p-4">
                <Laptop className="size-10 text-white" />
              </div>
              <h3 className="mb-4 text-2xl font-bold text-white">Desktop</h3>
              <p className="mb-6 text-gray-300">
                Available for Windows, macOS, and Linux. Enjoy the full power of
                MessengerCraft with keyboard shortcuts and multi-window support.
              </p>
              <ul className="mb-8 w-full text-left">
                <li className="mb-2 flex items-center text-gray-300">
                  <CheckCircle className="mr-2 size-5 text-green-400" />
                  <span>Multi-account support</span>
                </li>
                <li className="mb-2 flex items-center text-gray-300">
                  <CheckCircle className="mr-2 size-5 text-green-400" />
                  <span>Advanced file sharing</span>
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="mr-2 size-5 text-green-400" />
                  <span>Screen sharing capabilities</span>
                </li>
              </ul>
              <Button
                variant="secondary"
                className="z-1 w-full gap-2 bg-white text-black hover:bg-gray-100"
              >
                <Download className="size-4" />
                Download for Desktop
              </Button>
            </div>
          </ShineBorder>

          <ShineBorder
            className="overflow-hidden rounded-xl bg-white/5 p-6"
            borderClassName="border border-white/10"
          >
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 rounded-full bg-white/10 p-4">
                <Smartphone className="size-10 text-white" />
              </div>
              <h3 className="mb-4 text-2xl font-bold text-white">Mobile</h3>
              <p className="mb-6 text-gray-300">
                Take MessengerCraft with you on iOS and Android. Stay connected
                with notifications and quick replies on the go.
              </p>
              <ul className="mb-8 w-full text-left">
                <li className="mb-2 flex items-center text-gray-300">
                  <CheckCircle className="mr-2 size-5 text-green-400" />
                  <span>Push notifications</span>
                </li>
                <li className="mb-2 flex items-center text-gray-300">
                  <CheckCircle className="mr-2 size-5 text-green-400" />
                  <span>Voice messages</span>
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="mr-2 size-5 text-green-400" />
                  <span>Low data usage mode</span>
                </li>
              </ul>
              <div className="flex w-full gap-2">
                <Button
                  variant="outline"
                  className="z-1 flex-1 border-white/10 bg-white/5 text-white hover:bg-white/10"
                  asChild
                >
                  <Link href="/app-store">App Store</Link>
                </Button>
                <Button
                  variant="outline"
                  className="z-1 flex-1 border-white/10 bg-white/5 text-white hover:bg-white/10"
                  asChild
                >
                  <Link href="/google-play">Google Play</Link>
                </Button>
              </div>
            </div>
          </ShineBorder>

          <ShineBorder
            className="overflow-hidden rounded-xl bg-white/5 p-6"
            borderClassName="border border-white/10"
          >
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 rounded-full bg-white/10 p-4">
                <Globe className="size-10 text-white" />
              </div>
              <h3 className="mb-4 text-2xl font-bold text-white">Web</h3>
              <p className="mb-6 text-gray-300">
                Access MessengerCraft from any browser without installing
                anything. Perfect for quick access on shared computers.
              </p>
              <ul className="mb-8 w-full text-left">
                <li className="mb-2 flex items-center text-gray-300">
                  <CheckCircle className="mr-2 size-5 text-green-400" />
                  <span>No installation required</span>
                </li>
                <li className="mb-2 flex items-center text-gray-300">
                  <CheckCircle className="mr-2 size-5 text-green-400" />
                  <span>Works on any modern browser</span>
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="mr-2 size-5 text-green-400" />
                  <span>Secure temporary sessions</span>
                </li>
              </ul>
              <Button
                variant="secondary"
                className="z-1 w-full gap-2 bg-white text-black hover:bg-gray-100"
                asChild
              >
                <Link href="/web-app">Launch Web App</Link>
              </Button>
            </div>
          </ShineBorder>
        </div>
      </section>

      <section className="mx-auto my-20 max-w-6xl px-6">
        <div className="text-center">
          <p className="relative text-3xl font-light tracking-widest text-white uppercase">
            <span className="absolute top-1/2 -left-6 h-px w-4 bg-white"></span>
            System
            <span className="absolute top-1/2 -right-6 h-px w-4 bg-white"></span>
          </p>
          <h2 className="mt-2 text-4xl font-black tracking-tight text-white uppercase md:text-5xl">
            Requirements
          </h2>
          <div className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-white to-transparent"></div>
          <div className="mx-auto mt-2 h-px w-16 bg-white"></div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
          <ShineBorder
            className="overflow-hidden rounded-xl bg-white/5 p-6"
            borderClassName="border border-white/10"
          >
            <h3 className="mb-6 text-2xl font-bold text-white">Windows</h3>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start">
                <CheckCircle className="mt-1 mr-2 size-5 shrink-0 text-green-400" />
                <span>Windows 10 (64-bit) or newer</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="mt-1 mr-2 size-5 shrink-0 text-green-400" />
                <span>4GB RAM minimum (8GB recommended)</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="mt-1 mr-2 size-5 shrink-0 text-green-400" />
                <span>500MB free disk space</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="mt-1 mr-2 size-5 shrink-0 text-green-400" />
                <span>Internet connection (broadband recommended)</span>
              </li>
            </ul>
          </ShineBorder>

          <ShineBorder
            className="overflow-hidden rounded-xl bg-white/5 p-6"
            borderClassName="border border-white/10"
          >
            <h3 className="mb-6 text-2xl font-bold text-white">macOS</h3>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start">
                <CheckCircle className="mt-1 mr-2 size-5 shrink-0 text-green-400" />
                <span>macOS 10.15 (Catalina) or newer</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="mt-1 mr-2 size-5 shrink-0 text-green-400" />
                <span>4GB RAM minimum (8GB recommended)</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="mt-1 mr-2 size-5 shrink-0 text-green-400" />
                <span>500MB free disk space</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="mt-1 mr-2 size-5 shrink-0 text-green-400" />
                <span>Internet connection (broadband recommended)</span>
              </li>
            </ul>
          </ShineBorder>

          <ShineBorder
            className="overflow-hidden rounded-xl bg-white/5 p-6"
            borderClassName="border border-white/10"
          >
            <h3 className="mb-6 text-2xl font-bold text-white">Linux</h3>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start">
                <CheckCircle className="mt-1 mr-2 size-5 shrink-0 text-green-400" />
                <span>
                  Ubuntu 18.04+, Debian 10+, Fedora 32+, or equivalent
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="mt-1 mr-2 size-5 shrink-0 text-green-400" />
                <span>4GB RAM minimum (8GB recommended)</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="mt-1 mr-2 size-5 shrink-0 text-green-400" />
                <span>500MB free disk space</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="mt-1 mr-2 size-5 shrink-0 text-green-400" />
                <span>Internet connection (broadband recommended)</span>
              </li>
            </ul>
          </ShineBorder>

          <ShineBorder
            className="overflow-hidden rounded-xl bg-white/5 p-6"
            borderClassName="border border-white/10"
          >
            <h3 className="mb-6 text-2xl font-bold text-white">Mobile</h3>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start">
                <CheckCircle className="mt-1 mr-2 size-5 shrink-0 text-green-400" />
                <span>iOS 14.0 or newer</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="mt-1 mr-2 size-5 shrink-0 text-green-400" />
                <span>Android 8.0 or newer</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="mt-1 mr-2 size-5 shrink-0 text-green-400" />
                <span>100MB free storage space</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="mt-1 mr-2 size-5 shrink-0 text-green-400" />
                <span>Internet connection (Wi-Fi or cellular)</span>
              </li>
            </ul>
          </ShineBorder>
        </div>
      </section>

      <section className="mx-auto my-24 hidden w-full max-w-6xl px-6 md:block">
        <ShineBorder
          className="overflow-hidden rounded-2xl bg-white/5 px-6 py-16 md:py-20"
          borderClassName="border border-white/20"
        >
          <div className="flex flex-col items-center justify-between gap-10 md:flex-row md:px-6">
            <div className="text-center md:max-w-xl md:text-left">
              <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
                Ready to experience secure messaging?
              </h2>
              <p className="mt-6 text-lg text-gray-300">
                Join millions of users worldwide who trust MessengerCraft for
                their private communications. Download now and take control of
                your digital conversations today.
              </p>
              <div className="mt-10 flex flex-col gap-4 text-black sm:flex-row sm:justify-center md:justify-start">
                <Button
                  variant="secondary"
                  size="lg"
                  className="z-1 gap-2 bg-white text-black hover:bg-gray-100"
                >
                  <Download className="size-4" />
                  Download Now
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="z-1 gap-2 border-white/10 bg-white/5 text-white hover:bg-white/10"
                  asChild
                >
                  <Link href="/learn-more">
                    Learn more <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="relative h-64 w-64">
                <div className="absolute inset-0 rounded-full border border-white/20"></div>
                <div className="absolute inset-4 rounded-full border border-white/15"></div>
                <div className="absolute inset-8 rounded-full border border-white/10"></div>
                <div className="absolute inset-12 flex h-40 w-40 items-center justify-center rounded-full bg-white/5">
                  <Shield className="size-16 text-white" />
                </div>
              </div>
            </div>
          </div>
        </ShineBorder>
      </section>

      <section className="mx-auto mb-16 w-full max-w-6xl px-6 md:hidden">
        <div className="flex flex-col items-center justify-between gap-6 rounded-xl bg-gradient-to-r from-gray-900 to-black p-6 md:flex-row md:p-8">
          <div>
            <h3 className="text-xl font-bold text-white md:text-2xl">
              Get the MessengerCraft App
            </h3>
            <p className="mt-2 text-gray-300">Available for iOS and Android</p>
          </div>
          <div className="flex flex-col gap-3 text-slate-200 sm:flex-row">
            <Button
              variant="outline"
              className="z-1 border-white/10 bg-white/5 hover:bg-white/10"
              asChild
            >
              <Link href="/app-store">App Store</Link>
            </Button>
            <Button
              variant="outline"
              className="z-1 border-white/10 bg-white/5 hover:bg-white/10"
              asChild
            >
              <Link href="/google-play">Google Play</Link>
            </Button>
          </div>
        </div>
      </section>
    </ShineBorder>
  );
};

export default DownloadPage;
