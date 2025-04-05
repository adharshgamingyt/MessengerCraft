import { Button } from "@/components/ui/button";
import { InteractiveGrid } from "@/components/ui/interactive-grid";
import { ShineBorder } from "@/components/ui/shine-border";

const Home = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-black pt-32 pb-16">
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
            Easily protect sensitive information on your community and calls.
            Keep your focus on what you want to share while maintaining full
            control over your privacy.
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
    </section>
  );
};

export default Home;
