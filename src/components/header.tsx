"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

type User = {
  id?: string;
  email?: string | null;
  handle?: string | null;
};

export default function Header({ user }: { user: User | null }) {
  const router = useRouter();

  async function handleLogout() {
    try {
      const res = await fetch("/api/auth/logout", { method: "POST" });
      if (res.ok) {
        router.push("/login");
        router.refresh();
      } else {
        console.error("Logout failed");
      }
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <header className="border-b bg-white/80 px-6 py-4">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-lg font-semibold text-[#142013]">
            BookmarkApp
          </Link>
          <nav className="hidden gap-3 md:flex">
            <Link href="/dashboard" className="text-sm text-[#495747] hover:underline">Dashboard</Link>
            <Link href="/settings" className="text-sm text-[#495747] hover:underline">Settings</Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="hidden text-sm text-[#495747] md:inline">{user.handle ?? user.email ?? "Account"}</span>
              <button
                onClick={handleLogout}
                className="rounded-2xl bg-[#142013] px-3 py-2 text-sm font-semibold text-white"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-sm text-[#495747] hover:underline">Log in</Link>
              <Link href="/sign-up" className="text-sm text-[#495747] hover:underline">Sign up</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
