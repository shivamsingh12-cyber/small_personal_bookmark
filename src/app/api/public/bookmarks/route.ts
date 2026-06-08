import { NextResponse } from "next/server";
import { listPublicBookmarksByHandle } from "@/server/bookmarks/list-bookmarks";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const handle = url.searchParams.get("handle");

  if (!handle) {
    return NextResponse.json({ error: "Missing handle" }, { status: 400 });
  }

  try {
    const bookmarks = await listPublicBookmarksByHandle(handle);
    return NextResponse.json({ data: bookmarks });
  } catch (err) {
    return NextResponse.json({ error: "Unable to load public bookmarks" }, { status: 500 });
  }
}
