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

export const OnBoardingSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(32, "Username must be less than 20 characters")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores",
    ),
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must be less than 50 characters"),
  country: z.string().min(2, "Please select your country"),
  phoneNumber: z
    .string()
    .length(10, "Phone number must be exactly 10 digits")
    .regex(/^[0-9]+$/, "Phone number can only contain numbers"),
  verificationCode: z
    .string()
    .length(6, "Verification code must be 6 digits")
    .regex(/^[0-9]+$/, "Verification code can only contain numbers"),
  profileImage: z.string().optional(),
});
