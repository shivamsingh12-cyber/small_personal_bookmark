"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
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
    <button
      onClick={handleLogout}
      className="rounded-2xl bg-[#142013] px-3 py-2 text-sm font-semibold text-white"
    >
      Log out
    </button>
  );
}
