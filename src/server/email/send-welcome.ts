import { getServerEnv } from "@/lib/env/server";

type SendResult = { success: true } | { error: string };

function buildWelcomeHtml(handle: string, appUrl: string) {
  return `
    <div style="font-family:system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; color:#142013;">
      <h1 style="color:#142013">Welcome to BookmarkApp, @${handle}!</h1>
      <p>Thanks for signing up. You're all set — start saving and sharing bookmarks.</p>
      <p>
        Visit your dashboard by opening your app and navigating to <strong>/dashboard</strong>.
      </p>
      <hr />
      <p style="color:#697565; font-size:12px">If you didn't sign up, you can ignore this email.</p>
    </div>
  `;
}

export async function sendWelcomeEmail(to: string, handle: string): Promise<SendResult> {
  const env = getServerEnv();

  const body = {
    from: env.RESEND_FROM_EMAIL,
    to,
    subject: `Welcome to BookmarkApp, @${handle}`,
    html: buildWelcomeHtml(handle, env.NEXT_PUBLIC_APP_URL),
  } as Record<string, unknown>;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const text = await res.text();
      return { error: `Resend API error: ${res.status} ${text}` };
    }

    return { success: true };
  } catch (err) {
    // Network or unexpected error
    return { error: (err as Error).message ?? String(err) };
  }
}
