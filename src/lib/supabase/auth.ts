import { cache } from "react";
import { createClient } from "@/lib/supabase/server";

export const getSession = cache(async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    throw error;
  }

  return data.session;
});

export const getUser = cache(async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    throw error;
  }

  return data.user;
});
