"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import { RegisterSchema } from "@/src/schema";
import { db } from "@/src/db";
import { user } from "@/src/db/schema";
import { getUserByEmail } from "@/src/data/User";

export const register = async (data: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password, confirmPassword } = validatedFields.data;

  if (password !== confirmPassword) {
    return { error: "Passwords do not match!" };
  }

  const hasAlphabet = /[a-zA-Z]/.test(password);
  const hasNumber = /\d/.test(password);

  if (!hasAlphabet || !hasNumber) {
    return {
      error: "Password must contain at least one letter and one number!",
    };
  }

  // Note: just in case as an fallback, but the schema should already handle this
  if (password.length < 8) {
    return { error: "Password must be at least 8 characters!" };
  }

  try {
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return { error: "User already exists!" };
    }

    const hashedPassword = await bcrypt.hash(password, 16);

    await db.insert(user).values({
      email,
      password: hashedPassword,
    });

    return { success: "Verification email sent!" };
  } catch (error) {
    console.log("Error creating user:", error);
    return { error: "Failed to create user. Please try again!" };
  }
};
