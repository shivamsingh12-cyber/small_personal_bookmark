import { Section } from "@/components/ui/section";

const setupSteps = [
  "Configure Supabase auth and database keys.",
  "Configure Resend sender details for transactional email.",
  "Add bookmark domain modules after the base platform is stable.",
];

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-6 py-24">
      <div className="rounded-3xl border bg-white/80 p-10 shadow-sm backdrop-blur">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#4d5b48]">
          Bookmark App
        </p>
        <h1 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight text-[#142013] sm:text-5xl">
          Next.js 15 scaffold ready for auth, database, email, and deployment.
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-[#495747]">
          This project currently includes infrastructure only: App Router, strict
          TypeScript, Tailwind CSS, typed environment validation, Supabase entry
          points, and a Resend email client.
        </p>
        <ul className="mt-8 space-y-3 text-sm text-[#495747]">
          {setupSteps.map((step) => (
            <li key={step} className="rounded-2xl border bg-[#f8faf5] px-4 py-3">
              {step}
            </li>
          ))}
        </ul>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <Section
            title="Server-first rendering"
            description="The App Router defaults to Server Components so data-fetching and auth entry points can stay close to the server."
          />
          <Section
            title="Production configuration"
            description="Environment variables are validated with Zod and isolated into client-safe and server-only modules."
          />
        </div>
      </div>
    </main>
  );
}
