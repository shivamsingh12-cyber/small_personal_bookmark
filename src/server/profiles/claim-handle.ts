import { createClient } from "@/lib/supabase/server";
import { createServiceRoleClient } from "@/lib/supabase/service-role";

export async function claimHandleForCurrentUser(handleInput: string) {
  const handle = handleInput.replace(/^@/, "").toLowerCase();

  if (!/^[a-z0-9_]{3,32}$/.test(handle)) {
    return { error: "Invalid handle format." };
  }

  const supabase = await createClient();
  const { data: sessionData, error: sessionError } = await supabase.auth.getUser();

  if (sessionError || !sessionData.user) {
    return { error: "Not authenticated." };
  }

  const userId = sessionData.user.id;

  const adminClient = createServiceRoleClient();

  const { data: existing, error: existingError } = await adminClient
    .from("profiles")
    .select("id")
    .eq("handle", handle)
    .maybeSingle();

  if (existingError) {
    return { error: "Unable to validate handle availability." };
  }

  if (existing && existing.id !== userId) {
    return { error: "Handle already taken." };
  }

  const { error: updateError } = await supabase
    .from("profiles")
    .update({ handle })
    .eq("id", userId);

  if (updateError) {
    // Unique constraint or other DB error
    if (updateError.message?.toLowerCase().includes("duplicate")) {
      return { error: "Handle already taken." };
    }

    return { error: "Unable to update handle." };
  }

  return { success: true };
}
