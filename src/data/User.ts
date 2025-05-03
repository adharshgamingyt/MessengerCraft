"use server";

import { eq } from "drizzle-orm";

import { db } from "@/src/db";
import { user } from "@/src/db/schema";
import type { User } from "@/src/types/types";

/**
 * Fetches a user by email from the database.
 *
 * @description This function retrieves a user from the database using their registered email address. If fails return error with null.
 * @param email - The email address of the user.
 * @returns {Promise<User | null>} - Returns the user object if found, otherwise null.
 * @throws {Error} - Throws an error if the database query fails.
 */
export const getUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const existingUser = await db.query.user.findFirst({
      where: eq(user.email, email),
    });

    if (!existingUser) return null;

    return existingUser!;
  } catch (error) {
    console.error(
      `[DB] Failed to fetch user by email: ${error instanceof Error ? error.message : String(error)}`,
    );
    return null;
  }
};

/**
 * Fetches a user by ID from the database.
 *
 * @description This function retrieves a user from the database using their ID. If fails return error with null.
 * @param id - The ID of the user.
 * @returns {Promise<User | null>} - Returns the user object if found, otherwise null.
 * @throws {Error} - Throws an error if the database query fails.
 */
export const getUserById = async (id: string): Promise<User | null> => {
  try {
    const existingUser = await db.query.user.findFirst({
      where: eq(user.id, id),
    });

    if (!existingUser) return null;

    return existingUser!;
  } catch (error) {
    console.error(
      `[DB] Failed to fetch user by Id: ${error instanceof Error ? error.message : String(error)}`,
    );
    return null;
  }
};
