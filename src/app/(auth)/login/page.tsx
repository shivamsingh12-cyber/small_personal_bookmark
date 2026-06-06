import Link from "next/link";
import { LoginForm } from "./login-form";

export default function LoginPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl items-center px-6 py-16">
      <div className="grid w-full gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-[2rem] border bg-[linear-gradient(180deg,#fbfdf9_0%,#eef4e8_100%)] p-8 shadow-sm sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#4d5b48]">
            Log In
          </p>
          <h1 className="mt-4 max-w-xl text-4xl font-semibold tracking-tight text-[#142013] sm:text-5xl">
            Access your private bookmark workspace.
          </h1>
          <p className="mt-4 max-w-lg text-base leading-7 text-[#495747]">
            Sign in with your email and password to reach the dashboard. Invalid
            credentials stay on the form with a clear error state.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border bg-white/80 p-4">
              <p className="text-sm font-semibold text-[#142013]">Validated</p>
              <p className="mt-2 text-sm text-[#495747]">
                The same Zod schema validates email format and password length.
              </p>
            </div>
            <div className="rounded-2xl border bg-white/80 p-4">
              <p className="text-sm font-semibold text-[#142013]">Protected</p>
              <p className="mt-2 text-sm text-[#495747]">
                The dashboard is guarded by middleware and server-side checks.
              </p>
            </div>
            <div className="rounded-2xl border bg-white/80 p-4">
              <p className="text-sm font-semibold text-[#142013]">Redirected</p>
              <p className="mt-2 text-sm text-[#495747]">
                Successful login redirects directly to the dashboard.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-[2rem] border bg-white p-8 shadow-sm sm:p-10">
          <h2 className="text-2xl font-semibold text-[#142013]">Welcome back</h2>
          <p className="mt-2 text-sm leading-6 text-[#495747]">
            New here?{" "}
            <Link href="/sign-up" className="font-medium text-[#142013] underline">
              Create an account
            </Link>
            .
          </p>
          <div className="mt-8">
            <LoginForm />
          </div>
        </section>
      </div>
    </main>
  );
}
