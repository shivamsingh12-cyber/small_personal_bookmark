import { NextResponse } from "next/server";
import { createServiceRoleClient } from "@/lib/supabase/service-role";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const query = url.searchParams.get("query") || "";

  if (!query) {
    return NextResponse.json({ data: [] });
  }

  try {
    const service = createServiceRoleClient();
    const { data, error } = await service
      .from("profiles")
      .select("handle")
      .ilike("handle", `${query}%`)
      .limit(20)
      .order("handle", { ascending: true });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data: (data ?? []).map((r) => r.handle) });
  } catch (err) {
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}
