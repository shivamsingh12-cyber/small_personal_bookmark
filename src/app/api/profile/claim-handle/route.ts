import { NextResponse } from "next/server";
import { claimHandleForCurrentUser } from "@/server/profiles/claim-handle";

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<{ handle: string }>;

  const result = await claimHandleForCurrentUser(body.handle ?? "");

  if (result.error) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
