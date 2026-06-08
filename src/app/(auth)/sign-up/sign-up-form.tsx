"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signUpSchema, type SignUpInput } from "@/lib/validation/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast-provider";

export function SignUpForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [formError, setFormError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    setFormError(null);

    const response = await fetch("/api/auth/sign-up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const result = (await response.json()) as {
      error?: string;
    };

    if (!response.ok) {
      setFormError(result.error ?? "Unable to create your account.");
      toast({ id: String(Date.now()), title: "Sign up failed", description: result.error });
      return;
    }

    toast({ id: String(Date.now()), title: "Welcome", description: "Account created" });
    router.push("/sign-up/success");
  });

  return (
    <form className="space-y-5" onSubmit={onSubmit} noValidate>
      <div className="space-y-2">
        <label className="text-sm font-medium text-[#142013]" htmlFor="email">
          Email
        </label>
        <Input id="email" type="email" autoComplete="email" placeholder="you@example.com" {...register("email")} />
        {errors.email ? <p className="text-sm text-[#a12f24]">{errors.email.message}</p> : null}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-[#142013]" htmlFor="password">
          Password
        </label>
        <Input id="password" type="password" autoComplete="new-password" placeholder="At least 8 characters" {...register("password")} />
        {errors.password ? <p className="text-sm text-[#a12f24]">{errors.password.message}</p> : null}
      </div>

      {formError ? (
        <div className="rounded-2xl border border-[#e5b2ab] bg-[#fff5f3] px-4 py-3 text-sm text-[#8b2b20]">
          {formError}
        </div>
      ) : null}

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Creating account..." : "Create account"}
      </Button>
    </form>
  );
}
