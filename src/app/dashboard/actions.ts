"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { createServiceRoleClient } from "@/lib/supabase/service-role";
import {
  createBookmarkSchema,
  updateBookmarkSchema,
} from "@/lib/validation/bookmark";
import {
  CreateBookmarkActionState,
  UpdateBookmarkActionState,
  DeleteBookmarkActionState,
} from "./action-states";

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
  // Use service role client for writes to avoid RLS issues in server actions.
  const adminClient = createServiceRoleClient();

  const { error } = await adminClient.from("bookmarks").insert({
    user_id: user.id,
    title,
    url,
    is_public: isPublic,
  });

  if (error) {
    // Log DB error for diagnostics, do not expose raw DB details to client
    // eslint-disable-next-line no-console
    console.error("bookmark insert error:", error);

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
  // Use service role client for update as well, but still constrain by user_id to enforce ownership.
  const adminClient = createServiceRoleClient();

  const { data, error } = await adminClient
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
    // eslint-disable-next-line no-console
    console.error("bookmark update error:", error);

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

export async function deleteBookmarkAction(
  _previousState: DeleteBookmarkActionState,
  formData: FormData,
): Promise<DeleteBookmarkActionState> {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return {
      error: "You must be signed in to delete a bookmark.",
      success: null,
    };
  }

  const bookmarkId = formData.get("id");

  if (typeof bookmarkId !== "string" || !bookmarkId) {
    return {
      error: "Invalid bookmark identifier.",
      success: null,
    };
  }

  const adminClient = createServiceRoleClient();

  const { data, error } = await adminClient
    .from("bookmarks")
    .delete()
    .eq("id", bookmarkId)
    .eq("user_id", user.id)
    .select("id")
    .maybeSingle();

  if (error) {
    // eslint-disable-next-line no-console
    console.error("bookmark delete error:", error);

    return {
      error: "Unable to delete the bookmark right now.",
      success: null,
    };
  }

  if (!data) {
    return {
      error: "Bookmark not found or you do not have permission to delete it.",
      success: null,
    };
  }

  revalidatePath("/dashboard");

  return {
    error: null,
    success: "Bookmark deleted successfully.",
  };
}
