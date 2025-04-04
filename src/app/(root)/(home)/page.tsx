import { Button } from "@/components/ui/button";
import React from "react";

const HomePage = () => {
  return (
    <main className="from-p1 to-p2 flex h-full w-full bg-radial">
      <section className="text-s2 mx-auto my-25 items-center justify-center text-center">
        <h1 className="text-s2 text-7xl font-bold text-balance">
          Join a vibrant community where conversations are more than just text
          with{" "}
          <span className="text-p2 stroke-s3 stroke-2">MessengerCraft.</span>
        </h1>
      </section>
    </main>
  );
};

export default HomePage;
