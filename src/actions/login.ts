"use server";

import * as z from "zod";

import { LoginSchema } from "@/src/schema";

export const login = async (data: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      error: "Invalid fields!",
    };
  }

  const { email, password, remember } = validatedFields.data;
};
