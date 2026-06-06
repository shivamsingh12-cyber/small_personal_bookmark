import Link from "next/link";

export default function SignUpSuccessPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl items-center px-6 py-16">
      <section className="w-full rounded-[2rem] border bg-white p-10 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#4d5b48]">
          Account Created
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-[#142013]">
          Check your email to continue.
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-[#495747]">
          Your account and profile were created successfully. If email confirmation
          is enabled in Supabase, use the link in your inbox to finish sign-in.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-2xl bg-[#142013] px-5 py-3 text-sm font-semibold text-white"
        >
          Return home
        </Link>
      </section>
    </main>
  );
}
