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
  name: z
    .string({
      message: "Name is required!",
    })
    .min(3, {
      message: "Name must be 3 characters long!",
    })
    .max(32, {
      message: "Name must only be 32 characters long",
    }),
  image: z
    .string()
    .url("Invalid image URL!")
    .regex(/\.(jpg|jpeg|webp|png|gif)$/i, "Invalid image format")
    .optional(),
  phone_number: z
    .string({
      message: "Phone number is required!",
    })
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must be at most 15 digits")
    .regex(/^\+?[\d\s\-\(\)]+$/, "Invalid phone number format"),
});
