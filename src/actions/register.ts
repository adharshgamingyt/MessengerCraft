"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

import { RegisterSchema } from "@/src/schema";
import { db } from "@/src/db";
import { user } from "@/src/db/schema";

export const register = async (data: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password, confirmPassword } = validatedFields.data;

  if (password !== confirmPassword) {
    return { error: "Passwords do not match!" };
  }

  // This check is likely redundant if your RegisterSchema already validates password length
  // But I'm keeping it for now, just in case
  if (password.length < 8) {
    return { error: "Password must be at least 8 characters!" };
  }

  try {
    const existingUser = await db.query.user.findFirst({
      where: eq(user.email, email),
    });

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
