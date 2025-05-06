"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";

import { LoginSchema } from "@/src/schema";
import { getUserByEmail } from "@/src/data/User";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/src/routes";

export const login = async (data: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      error: "Invalid fields!",
    };
  }

  const { email, password, remember } = validatedFields.data;

  const user = await getUserByEmail(email);

  if (!user) {
    return { error: "User not found!" };
  }

  if (!user.password) {
    return { error: "Please use you'r google or anyother provider to login!" };
  }

  const passwordMatch = await bcrypt.compare(password, user!.password);

  if (!passwordMatch) {
    return { error: "Invalid password!" };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.cause) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "An unknown error occurred!" };
      }
    }

    throw error;
  }
};
