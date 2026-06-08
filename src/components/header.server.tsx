import Link from "next/link";
import LogoutButton from "./logout-button";
import { createClient, createServiceRoleClient } from "@/lib/supabase/server";

export default async function HeaderServer() {
  const supabase = await createClient();

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return (
        <header className="border-b bg-white/80 px-6 py-4">
          <div className="mx-auto flex max-w-6xl items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-lg font-semibold text-[#142013]">BookmarkApp</Link>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/login" className="text-sm text-[#495747] hover:underline">Log in</Link>
              <Link href="/sign-up" className="text-sm text-[#495747] hover:underline">Sign up</Link>
            </div>
          </div>
        </header>
      );
    }

    const service = createServiceRoleClient();
    const { data: profile } = await service.from("profiles").select("handle").eq("id", user.id).maybeSingle();

    return (
      <header className="border-b bg-white/80 px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-lg font-semibold text-[#142013]">BookmarkApp</Link>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-[#495747] md:inline">{profile?.handle ?? user.email ?? "Account"}</span>
            <LogoutButton />
          </div>
        </div>
      </header>
    );
  } catch (e) {
    return (
      <header className="border-b bg-white/80 px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-lg font-semibold text-[#142013]">BookmarkApp</Link>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm text-[#495747] hover:underline">Log in</Link>
            <Link href="/sign-up" className="text-sm text-[#495747] hover:underline">Sign up</Link>
          </div>
        </div>
      </header>
    );
  }
}
