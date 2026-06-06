import { z } from "zod";

export const bookmarkFieldsSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required.")
    .max(200, "Title must be 200 characters or fewer."),
  url: z
    .string()
    .trim()
    .url("Enter a valid URL.")
    .refine((value) => /^https?:\/\//i.test(value), {
      message: "URL must start with http:// or https://.",
    }),
  isPublic: z.boolean(),
});

export const createBookmarkSchema = bookmarkFieldsSchema;

export const updateBookmarkSchema = bookmarkFieldsSchema.extend({
  id: z.uuid("Invalid bookmark identifier."),
});

export type CreateBookmarkInput = z.infer<typeof createBookmarkSchema>;
export type UpdateBookmarkInput = z.infer<typeof updateBookmarkSchema>;
