import { SignUpForm } from "./sign-up-form";

export default function SignUpPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl items-center px-6 py-16">
      <div className="grid w-full gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-[2rem] border bg-[linear-gradient(180deg,#fbfdf9_0%,#eef4e8_100%)] p-8 shadow-sm sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#4d5b48]">
            Sign Up
          </p>
          <h1 className="mt-4 max-w-xl text-4xl font-semibold tracking-tight text-[#142013] sm:text-5xl">
            Create your bookmarks account.
          </h1>
          <p className="mt-4 max-w-lg text-base leading-7 text-[#495747]">
            This form creates a Supabase auth user and an application profile
            record, then redirects to a success screen.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border bg-white/80 p-4">
              <p className="text-sm font-semibold text-[#142013]">Validated</p>
              <p className="mt-2 text-sm text-[#495747]">
                Email format and password length are checked with Zod.
              </p>
            </div>
            <div className="rounded-2xl border bg-white/80 p-4">
              <p className="text-sm font-semibold text-[#142013]">Server-safe</p>
              <p className="mt-2 text-sm text-[#495747]">
                Account creation and profile insertion run on the server.
              </p>
            </div>
            <div className="rounded-2xl border bg-white/80 p-4">
              <p className="text-sm font-semibold text-[#142013]">Redirected</p>
              <p className="mt-2 text-sm text-[#495747]">
                Successful signup sends the user to the next step immediately.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-[2rem] border bg-white p-8 shadow-sm sm:p-10">
          <h2 className="text-2xl font-semibold text-[#142013]">Create account</h2>
          <p className="mt-2 text-sm leading-6 text-[#495747]">
            Use an email you can access if your Supabase project requires email
            confirmation.
          </p>
          <div className="mt-8">
            <SignUpForm />
          </div>
        </section>
      </div>
    </main>
  );
}
