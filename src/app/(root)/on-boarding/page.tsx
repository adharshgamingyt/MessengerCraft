import React, { Suspense } from "react";
import { auth } from "@/auth";

export default async function OnBoardingPage() {
  const session = await auth();

  return (
    <div>
      <h1>Welcome to Onboarding!</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <p>Session: {JSON.stringify(session?.user)}</p>
        <p>Onboarding content goes here...</p>
      </Suspense>
    </div>
  );
}
