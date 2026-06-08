import { createHash } from "node:crypto";
import { getServerEnv } from "@/lib/env/server";
import { createServiceRoleClient } from "@/lib/supabase/service-role";
import { sendWelcomeEmail } from "@/server/email/send-welcome";
import { createClient as createServerClient } from "@/lib/supabase/server";
import { signUpSchema, type SignUpInput } from "@/lib/validation/auth";

const HANDLE_MAX_LENGTH = 32;

function buildBaseHandle(email: string) {
  const [localPart = "user"] = email.toLowerCase().split("@");
  const sanitized = localPart.replace(/[^a-z0-9_]/g, "_").replace(/_+/g, "_");
  const trimmed = sanitized.replace(/^_+|_+$/g, "");

  return trimmed.slice(0, HANDLE_MAX_LENGTH) || "user";
}

async function createUniqueHandle(email: string) {
  const adminClient = createServiceRoleClient();
  const baseHandle = buildBaseHandle(email);
  const hash = createHash("sha256").update(email).digest("hex");

  for (let attempt = 0; attempt < 10; attempt += 1) {
    const suffix = hash.slice(attempt * 2, attempt * 2 + 6) || hash.slice(0, 6);
    const separator = baseHandle.length >= HANDLE_MAX_LENGTH - 7 ? "" : "_";
    const prefixLength = HANDLE_MAX_LENGTH - suffix.length - separator.length;
    const candidate = `${baseHandle.slice(0, prefixLength)}${separator}${suffix}`;

    const { data, error } = await adminClient
      .from("profiles")
      .select("id")
      .eq("handle", candidate)
      .maybeSingle();

    if (error) {
      throw new Error("Unable to validate profile handle availability.");
    }

    if (!data) {
      return candidate;
    }
  }

  throw new Error("Unable to generate a unique profile handle.");
}

export async function signUpWithEmail(input: SignUpInput) {
  const parsedInput = signUpSchema.safeParse(input);

  if (!parsedInput.success) {
    return {
      error: parsedInput.error.issues[0]?.message ?? "Invalid sign up details.",
    };
  }

  const { email, password } = parsedInput.data;
  const supabase = await createServerClient();
  const env = getServerEnv();

  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${env.NEXT_PUBLIC_APP_URL}/auth/callback`,
    },
  });

  if (authError) {
    return {
      error: authError.message,
    };
  }

  const userId = authData.user?.id;

  if (!userId) {
    return {
      error: "Unable to create the user account.",
    };
  }

  let handle: string;

  try {
    handle = await createUniqueHandle(email);
  } catch (err) {
    // Log the underlying error for diagnostics
    // eslint-disable-next-line no-console
    console.error("createUniqueHandle error:", err);

    return {
      error: "Unable to prepare the user profile.",
    };
  }

  const adminClient = createServiceRoleClient();
  const { error: profileError } = await adminClient.from("profiles").insert({
    id: userId,
    email,
    handle,
  });

  if (profileError) {
    // Log details to help diagnose DB errors (unique constraint, permissions, etc.)
    // eslint-disable-next-line no-console
    console.error("profile insert error:", profileError);

    await adminClient.auth.admin.deleteUser(userId);

    return {
      error: "Account created, but profile setup failed. Please try again.",
    };
  }

  // Send welcome email but don't fail account creation if email sending fails.
  try {
    const sendResult = await sendWelcomeEmail(email, handle);

    if ("error" in sendResult) {
      // Log the error server-side for diagnostics
      // eslint-disable-next-line no-console
      console.error("Failed to send welcome email:", sendResult.error);
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error("Unexpected error sending welcome email:", e);
  }

  return {
    success: true,
  };
}
