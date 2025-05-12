/**
 * Core application types and interfaces.
 * @module types
 * @description This module contains core types and interfaces used throughout the application.
 */
import { user } from "@/src/db/schema";
import { InferSelectModel } from "drizzle-orm";
import type { ReactNode } from "react";

/** @Layout component props */
export type layout = {
  children: ReactNode;
};

/** @Todo placeholder type */
export interface Todo {
  Todo: unknown;
}

/** @User model derived from database schema */
export type User = InferSelectModel<typeof user>;

/** Importing type DefaultSession so we can extend user session */
import NextAuth, { type DefaultSession } from "next-auth";

/** Making extending easy to understand */
export type ExtendedSession = DefaultSession["user"] & {
  name: string | null;
  username: string | null;
  image: string | URL | null;
  emailVerified: Data | null;
};

/** Extending Session */
declare module "next-auth" {
  interface Session {
    user: ExtendedSession;
  }
}

// The `JWT` interface can be found in the `next-auth/jwt` submodule
import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    name: string | null;
    username: string | null;
    image: string | URL | null;
    emailVerified: Data | null;
  }
}

/** Auth Extending ends */
