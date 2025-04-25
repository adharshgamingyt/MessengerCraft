"use server";

import * as z from "zod";

import { LoginSchema } from "@/src/schema";

export const login = async (data: z.infer<typeof LoginSchema>) => {};
