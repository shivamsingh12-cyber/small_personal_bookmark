import { z } from "zod";

export const handleSchema = z
  .string()
  .min(1)
  .transform((val) => val.replace(/^@/, ""))
  .refine((val) => /^[a-zA-Z0-9_]{3,32}$/.test(val), {
    message:
      "Handle must be 3-32 characters and contain only letters, numbers, or underscores. Prefix with @ is optional.",
  })
  .transform((val) => val.toLowerCase());

export type HandleInput = z.infer<typeof handleSchema>;
