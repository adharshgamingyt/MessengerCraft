"use server";

import * as z from "zod";

import { OnBoardingSchema } from "@/src/schema";

export const onBoarding = async (
  data: z.infer<typeof OnBoardingSchema>,
): Promise<{ error?: string; success?: string }> => {
  const validatedFields = OnBoardingSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  return { success: "Redirecting you to encrypted server!" };
};
