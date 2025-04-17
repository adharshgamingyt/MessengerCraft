import { Button } from "@/src/components/ui/button";
import { InteractiveGrid } from "@/src/components/ui/interactive-grid";
import { Separator } from "@/src/components/ui/separator";
import { ShineBorder } from "@/src/components/ui/shine-border";
import { Star, Globe, Shield, Clock } from "lucide-react";

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
              className="gap-2 border-white/10 bg-white/5 hover:bg-white/10"
            >
              Get started
            </Button>
            <Button
              variant="secondary"
              className="bg-white text-black hover:bg-gray-100"
            >
              Download
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
    </ShineBorder>
  );
};

export default Home;
