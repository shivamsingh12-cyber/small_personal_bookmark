import { createClient as createServerClient } from "@/lib/supabase/server";
import { loginSchema, type LoginInput } from "@/lib/validation/auth";

export async function signInWithEmail(input: LoginInput) {
  const parsedInput = loginSchema.safeParse(input);

  if (!parsedInput.success) {
    return {
      error: parsedInput.error.issues[0]?.message ?? "Invalid login details.",
    };
  }

  const { email, password } = parsedInput.data;
  const supabase = await createServerClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return {
      error: error.message,
    };
  }

  return {
    success: true,
  };
}
