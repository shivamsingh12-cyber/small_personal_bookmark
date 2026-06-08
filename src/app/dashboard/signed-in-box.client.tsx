"use client";

export default function SignedInBox({ email, handle }: { email: string; handle?: string | null }) {
  return (
    <div className="rounded-3xl border bg-[#f8faf5] px-5 py-4">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#4d5b48]">Signed in as</p>
      <p className="mt-2 text-sm text-[#142013]">{handle ?? email}</p>
    </div>
  );
}
