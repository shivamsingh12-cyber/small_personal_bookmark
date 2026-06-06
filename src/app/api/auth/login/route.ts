import { NextResponse } from "next/server";
import { signInWithEmail } from "@/server/auth/sign-in";

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<{
    email: string;
    password: string;
  }>;

  const result = await signInWithEmail({
    email: body.email ?? "",
    password: body.password ?? "",
  });

  if (result.error) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  return NextResponse.json({ success: true, redirectTo: "/dashboard" });
}
