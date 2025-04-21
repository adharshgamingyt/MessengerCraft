"use client";

import { Star, Globe, Shield, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@/src/components/ui/button";
import { InteractiveGrid } from "@/src/components/ui/interactive-grid";
import { Separator } from "@/src/components/ui/separator";
import { ShineBorder } from "@/src/components/ui/shine-border";

const Home = () => {
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
            Protect Your Privacy, Send What
            <br />
            You Want to
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-400">
            Keep your sensitive information safe in community discussions and
            calls. Focus on sharing freely, empowered by full privacy control in
            MessengerCraft.
          </p>
          <div className="flex justify-center gap-4">
            <Button
              variant="outline"
              className="z-1 gap-2 border-white/10 bg-white/5 hover:bg-white/10"
              asChild
            >
              <Link href="/on-boarding">Get started</Link>
            </Button>
            <Button
              variant="secondary"
              className="z-1 hidden bg-white text-black hover:bg-gray-100 md:block"
              asChild
            >
              <Link href="/download">Download</Link>
            </Button>
            <Button
              variant="secondary"
              className="z-1 bg-white text-black hover:bg-gray-100 md:hidden"
              asChild
            >
              <Link href="/download">Download</Link>
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

      <section className="mx-auto my-20 flex flex-col items-center justify-center px-6">
        <div className="text-center">
          <p className="relative text-3xl font-light tracking-widest text-white uppercase">
            <span className="absolute top-1/2 -left-6 h-px w-4 bg-white"></span>
            Explore Features Of
            <span className="absolute top-1/2 -right-6 h-px w-4 bg-white"></span>
          </p>
          <h2 className="mt-2 text-4xl font-black tracking-tight text-white uppercase md:text-5xl">
            MessengerCraft
          </h2>
          <div className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-white to-transparent"></div>
          <div className="mx-auto mt-2 h-px w-16 bg-white"></div>
        </div>

        <div className="mt-24 w-full max-w-6xl">
          <div className="mb-24 flex flex-col items-center md:flex-row md:items-center">
            <div className="w-full md:w-1/2 md:pr-12">
              <div
                className="relative mx-auto w-full max-w-md overflow-hidden border border-gray-800 bg-gray-900"
                style={{ aspectRatio: "16/9" }}
              >
                <img
                  src="/api/placeholder/800/450"
                  alt="Real-time messaging"
                  className="h-full w-full object-cover"
                />
                <div className="bg-opacity-20 absolute inset-0 bg-black"></div>
              </div>
            </div>
            <div className="mt-8 w-full md:mt-0 md:w-1/2">
              <h3 className="text-3xl font-bold text-white">
                Real-time Messaging
              </h3>
              <div className="mt-2 h-px w-16 bg-white"></div>
              <p className="mt-6 text-lg text-gray-300">
                Experience seamless communication with our lightning-fast
                messaging system. Send text, images, and files instantly with
                end-to-end encryption keeping your conversations secure and
                private.
              </p>
              <p className="mt-4 text-lg text-gray-300">
                Our proprietary technology ensures messages are delivered even
                with unstable internet connections, making sure you stay
                connected anywhere.
              </p>
            </div>
          </div>

          <div className="mb-24 flex flex-col items-center md:flex-row-reverse md:items-center">
            <div className="w-full md:w-1/2 md:pl-12">
              <div
                className="relative mx-auto w-full max-w-md overflow-hidden border border-gray-800 bg-gray-900"
                style={{ aspectRatio: "16/9" }}
              >
                <img
                  src="/api/placeholder/800/450"
                  alt="Smart organization"
                  className="h-full w-full object-cover"
                />
                <div className="bg-opacity-20 absolute inset-0 bg-black"></div>
              </div>
            </div>
            <div className="mt-8 w-full md:mt-0 md:w-1/2 md:text-right">
              <h3 className="text-3xl font-bold text-white">
                Smart Organization
              </h3>
              <div className="mt-2 ml-auto h-px w-16"></div>
              <p className="mt-6 text-lg text-gray-300">
                Never lose track of important conversations again. Our
                intelligent sorting system automatically categorizes messages,
                creating a clutter-free workspace that adapts to your
                communication style.
              </p>
              <p className="mt-4 text-lg text-gray-300">
                Pin essential conversations, create custom folders, and use
                advanced filters to find any message instantly, no matter how
                old.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center md:flex-row md:items-center">
            <div className="w-full md:w-1/2 md:pr-12">
              <div
                className="relative mx-auto w-full max-w-md overflow-hidden border border-gray-800 bg-gray-900"
                style={{ aspectRatio: "16/9" }}
              >
                <img
                  src="/api/placeholder/800/450"
                  alt="Cross-platform support"
                  className="h-full w-full object-cover"
                />
                <div className="bg-opacity-20 absolute inset-0 bg-black"></div>
              </div>
            </div>
            <div className="mt-8 w-full md:mt-0 md:w-1/2">
              <h3 className="text-3xl font-bold text-white">
                Cross-platform Support
              </h3>
              <div className="mt-2 h-px w-16 bg-white"></div>
              <p className="mt-6 text-lg text-gray-300">
                Stay connected across all your devices with perfect
                synchronization. Whether you're on desktop, mobile, or tablet,
                your messages, settings, and preferences remain consistent.
              </p>
              <p className="mt-4 text-lg text-gray-300">
                Enjoy a native experience on each platform with interfaces
                designed specifically for touch, mouse, or keyboard interaction
                without compromising functionality.
              </p>
            </div>
          </div>
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
                  className="z-1 bg-white text-black hover:bg-gray-100"
                  asChild
                >
                  <Link href="/download">Download Now</Link>
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

      <section className="md:hi mx-auto mb-16 w-full max-w-6xl px-6 md:hidden">
        <div className="flex flex-col items-center justify-between gap-6 rounded-xl bg-gradient-to-r from-gray-900 to-black p-6 md:flex-row md:p-8">
          <div>
            <h3 className="text-xl font-bold text-white md:text-2xl">
              Get the MessengerCraft App
            </h3>
            <p className="mt-2 text-gray-300">Available for Ios and Android</p>
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

export default Home;
