import { createClient } from "@/lib/supabase/server";

export type BookmarkListItem = {
  id: string;
  title: string;
  url: string;
  is_public: boolean;
  created_at: string;
};

export async function listBookmarksForCurrentUser() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("bookmarks")
    .select("id, title, url, is_public, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error("Unable to load bookmarks.");
  }

  return (data ?? []) as BookmarkListItem[];
}
