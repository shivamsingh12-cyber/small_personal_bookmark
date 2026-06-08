import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createServiceRoleClient } from "@/lib/supabase/service-role";

export async function GET() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ data: null });
    }

    const service = createServiceRoleClient();
    const { data: profile } = await service.from("profiles").select("handle,email").eq("id", user.id).maybeSingle();

    return NextResponse.json({ data: { id: user.id, email: user.email, handle: profile?.handle ?? null } });
  } catch (err) {
    return NextResponse.json({ data: null });
  }
}
