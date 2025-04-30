import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email("Email required!"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long!")
    .max(32, "Password must be at most 32 characters long!"),
  remember: z.boolean().optional(),
});

export const RegisterSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .refine(
        (value) => {
          const hasAlphabet = /[a-zA-Z]/.test(value);
          const hasNumber = /\d/.test(value);
          return hasAlphabet && hasNumber;
        },
        {
          message: "Password must contain at least one letter and one number.",
        },
      ),
    confirmPassword: z.string(),
    terms: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
