import { createClient } from "@/lib/supabase/server";
import { createServiceRoleClient } from "@/lib/supabase/service-role";

export type BookmarkListItem = {
  id: string;
  title: string;
  url: string;
  is_public: boolean;
  created_at: string;
};

export async function listBookmarksForCurrentUser() {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return [];
  }

  const adminClient = createServiceRoleClient();

  const { data, error } = await adminClient
    .from("bookmarks")
    .select("id, title, url, is_public, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error("Unable to load bookmarks.");
  }

  return (data ?? []) as BookmarkListItem[];
}

export async function listPublicBookmarksByHandle(handle: string) {
  const adminClient = createServiceRoleClient();

  const { data: profile, error: profileError } = await adminClient
    .from("profiles")
    .select("id, handle")
    .eq("handle", handle)
    .maybeSingle();

  if (profileError) {
    throw new Error("Unable to load profile.");
  }

  if (!profile) {
    return [] as BookmarkListItem[];
  }

  const { data, error } = await adminClient
    .from("bookmarks")
    .select("id, title, url, is_public, created_at")
    .eq("user_id", profile.id)
    .eq("is_public", true)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error("Unable to load public bookmarks.");
  }

  return (data ?? []) as BookmarkListItem[];
}
