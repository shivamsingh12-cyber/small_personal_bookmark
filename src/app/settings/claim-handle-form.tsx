"use client";

import { useState } from "react";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { handleSchema } from "@/lib/validation/profile";

export function ClaimHandleForm() {
  const router = useRouter();
  const [formError, setFormError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<{ handle: string }>({
    resolver: zodResolver(z.object({ handle: handleSchema })),
    defaultValues: { handle: "" },
  });

  const onSubmit = handleSubmit(async (values) => {
    setFormError(null);
    setSuccess(false);

    const response = await fetch("/api/profile/claim-handle", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ handle: values.handle }),
    });

    const result = (await response.json()) as { error?: string };

    if (!response.ok) {
      setFormError(result.error ?? "Unable to claim handle.");
      return;
    }

    setSuccess(true);
    // optionally refresh to show updated handle
    router.refresh();
  });

  return (
    <form className="space-y-5 mt-6" onSubmit={onSubmit} noValidate>
      <div className="space-y-2">
        <label className="text-sm font-medium text-[#142013]" htmlFor="handle">
          Choose a handle
        </label>
        <div className="flex items-center gap-3">
          <span className="text-sm text-[#495747]">@</span>
          <input
            id="handle"
            type="text"
            className="w-full rounded-2xl border bg-white px-4 py-3 text-sm outline-none transition focus:border-[#51624d] focus:ring-2 focus:ring-[#d9e5d4]"
            placeholder="your-handle"
            {...register("handle")}
          />
        </div>
        {errors.handle ? (
          <p className="text-sm text-[#a12f24]">{errors.handle.message}</p>
        ) : null}
      </div>

      {formError ? (
        <div className="rounded-2xl border border-[#e5b2ab] bg-[#fff5f3] px-4 py-3 text-sm text-[#8b2b20]">
          {formError}
        </div>
      ) : null}

      {success ? (
        <div className="rounded-2xl border border-[#b8e0c6] bg-[#f1fbf5] px-4 py-3 text-sm text-[#28502a]">
          Handle claimed successfully.
        </div>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-2xl bg-[#142013] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#1d2c1c] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? "Saving..." : "Claim handle"}
      </button>
    </form>
  );
}
