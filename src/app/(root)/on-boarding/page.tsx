import React from "react";
import { unstable_update as update } from "@/auth";

import { auth } from "@/auth";
import { Button } from "@/src/components/ui/button";
import { user } from "../../../db/schema";
import { logout } from "@/src/actions/logout";

export default async function OnBoardingPage() {
  const session = await auth();
  const user = session?.user;
  const id = user?.id;

  return (
    <div>
      <h1>Welcome to Onboarding!</h1>
      <p>{JSON.stringify(user)}</p>
      {/* <Button
        onClick={async () => {
          "use server";
          await update({ user: { user } });
        }}
      >
        Update
      </Button>{" "} */}
      <Button
        onClick={async () => {
          "use server";
          await logout();
        }}
      >
        Signout
      </Button>
    </div>
  );
}
