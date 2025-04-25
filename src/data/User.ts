"use server";

import { eq } from "drizzle-orm";

import { db } from "@/src/db";
import { user } from "@/src/db/schema";

export const getUserByEmail = async (email: string) => {
  try {
    const existingUser = await db.query.user.findFirst({
      where: eq(user.email, email),
    });

    return existingUser;
  } catch (error) {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const existingUser = await db.query.user.findFirst({
      where: eq(user.id, id),
    });

    return existingUser;
  } catch (error) {
    return null;
  }
};
