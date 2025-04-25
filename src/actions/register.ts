"use server";

import * as z from "zod";

import { RegisterSchema } from "@/src/schema";

export const register = async (data: z.infer<typeof RegisterSchema>) => {};
