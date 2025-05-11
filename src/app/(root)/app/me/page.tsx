import { currentUser } from "@/src/lib/auth";
import React from "react";

const MePage = async () => {
  const user = await currentUser();

  return (
    <div className="text-black">
      Welcome User
      <p>{JSON.stringify({ user })}</p>
    </div>
  );
};

export default MePage;
