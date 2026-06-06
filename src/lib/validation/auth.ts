import { z } from "zod";

export const authWithPasswordSchema = z.object({
  email: z.email("Enter a valid email address."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long."),
});

export const signUpSchema = authWithPasswordSchema;

export const loginSchema = authWithPasswordSchema;

export type SignUpInput = z.infer<typeof signUpSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
