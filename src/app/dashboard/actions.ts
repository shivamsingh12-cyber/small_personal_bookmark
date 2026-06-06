"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import {
  createBookmarkSchema,
  updateBookmarkSchema,
} from "@/lib/validation/bookmark";

type BookmarkActionState = {
  error: string | null;
  success: string | null;
  fieldErrors?: {
    title?: string[];
    url?: string[];
  };
};

export type CreateBookmarkActionState = BookmarkActionState;
export type UpdateBookmarkActionState = BookmarkActionState;

export const initialCreateBookmarkState: CreateBookmarkActionState = {
  error: null,
  success: null,
};

export const initialUpdateBookmarkState: UpdateBookmarkActionState = {
  error: null,
  success: null,
};

export async function createBookmarkAction(
  _previousState: CreateBookmarkActionState,
  formData: FormData,
): Promise<CreateBookmarkActionState> {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return {
      error: "You must be signed in to create a bookmark.",
      success: null,
    };
  }

  const parsedInput = createBookmarkSchema.safeParse({
    title: formData.get("title"),
    url: formData.get("url"),
    isPublic: formData.get("isPublic") === "on",
  });

  if (!parsedInput.success) {
    const fieldErrors = parsedInput.error.flatten().fieldErrors;

    return {
      error: "Please correct the highlighted fields.",
      success: null,
      fieldErrors: {
        title: fieldErrors.title,
        url: fieldErrors.url,
      },
    };
  }

  const { title, url, isPublic } = parsedInput.data;
  const { error } = await supabase.from("bookmarks").insert({
    user_id: user.id,
    title,
    url,
    is_public: isPublic,
  });

  if (error) {
    return {
      error: "Unable to save the bookmark right now.",
      success: null,
    };
  }

  revalidatePath("/dashboard");

  return {
    error: null,
    success: "Bookmark created successfully.",
  };
}

export async function updateBookmarkAction(
  _previousState: UpdateBookmarkActionState,
  formData: FormData,
): Promise<UpdateBookmarkActionState> {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return {
      error: "You must be signed in to edit a bookmark.",
      success: null,
    };
  }

  const parsedInput = updateBookmarkSchema.safeParse({
    id: formData.get("id"),
    title: formData.get("title"),
    url: formData.get("url"),
    isPublic: formData.get("isPublic") === "on",
  });

  if (!parsedInput.success) {
    const fieldErrors = parsedInput.error.flatten().fieldErrors;

    return {
      error: "Please correct the highlighted fields.",
      success: null,
      fieldErrors: {
        title: fieldErrors.title,
        url: fieldErrors.url,
      },
    };
  }

  const { id, title, url, isPublic } = parsedInput.data;
  const { data, error } = await supabase
    .from("bookmarks")
    .update({
      title,
      url,
      is_public: isPublic,
    })
    .eq("id", id)
    .eq("user_id", user.id)
    .select("id")
    .maybeSingle();

  if (error) {
    return {
      error: "Unable to update the bookmark right now.",
      success: null,
    };
  }

  if (!data) {
    return {
      error: "Bookmark not found or you do not have permission to edit it.",
      success: null,
    };
  }

  revalidatePath("/dashboard");

  return {
    error: null,
    success: "Bookmark updated successfully.",
  };
}
