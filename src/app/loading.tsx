import Image from "next/image";
import React from "react";

const loading = () => {
  return (
    <div className="flex h-full w-full items-center justify-center bg-black">
      <div className="flex flex-col items-center justify-center bg-black">
        <Image
          src="/logo-no-bg.png"
          alt="MessengerCraft Logo"
          className="h-56 w-56 text-white"
          width={100}
          height={100}
        />
        <div className="items-center justify-center bg-black p-5">
          <p className="pt-5 text-5xl font-bold text-white">MessengerCraft</p>
        </div>
      </div>
    </div>
  );
};

export default loading;
