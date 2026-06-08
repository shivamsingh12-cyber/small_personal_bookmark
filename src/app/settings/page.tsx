import { redirect } from "next/navigation";
import { getUser } from "@/lib/supabase/auth";
import { ClaimHandleForm } from "./claim-handle-form";

export default async function SettingsPage() {
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-6xl px-6 py-16">
      <section className="w-full rounded-[2rem] border bg-white p-8 shadow-sm sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#4d5b48]">
          Settings
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-[#142013]">
          Account settings are protected.
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-[#495747]">
          This route uses the same protection model as the dashboard. Anonymous
          visitors are redirected to the login page before any settings content
          is rendered.
        </p>
        <div className="mt-8 rounded-2xl border bg-[#f8faf5] p-5">
          <p className="text-sm font-medium text-[#142013]">Authenticated user</p>
          <p className="mt-2 text-sm text-[#495747]">{user.email}</p>
        </div>
        <div className="mt-6">
          <ClaimHandleForm />
        </div>
      </section>
    </main>
  );
}
