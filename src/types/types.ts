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
