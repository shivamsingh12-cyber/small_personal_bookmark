# Bookmark App

Production-ready bookmark application scaffold built with Next.js 15 App Router, TypeScript, Tailwind CSS, Supabase, and Resend.

## Scripts

- `npm run dev` starts the development server.
- `npm run build` creates the production build.
- `npm run start` serves the production build.
- `npm run lint` runs ESLint with zero warnings allowed.
- `npm run typecheck` runs TypeScript without emitting files.

## Supabase

- `src/lib/supabase/client.ts` creates the browser client.
- `src/lib/supabase/server.ts` creates the server client for App Router usage.
- `src/lib/supabase/middleware.ts` refreshes auth cookies in middleware.
- `src/lib/supabase/auth.ts` exposes cached server helpers for current session and user.

## Auth

- `/sign-up` provides a typed signup form using React Hook Form and Zod.
- `/signup` redirects to `/sign-up` so the public auth route is available under the expected path.
- `/login` signs existing users in and redirects them to the dashboard.
- `/dashboard` and `/settings` are protected by Supabase session-aware middleware.
- `src/app/api/auth/sign-up/route.ts` handles secure signup on the server.
- `src/app/api/auth/login/route.ts` handles server-side password sign-in.
- `src/server/auth/sign-up.ts` creates the auth user and inserts the profile row.
- `src/server/auth/sign-in.ts` authenticates a user with Supabase Auth.

## Local development

Prerequisites: Node 18+ and npm. Create a local `.env.local` (or `.env`) with these values:

- `NEXT_PUBLIC_APP_URL` (e.g. `http://localhost:3000`)
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (server-only)
- `RESEND_API_KEY` (server-only)
- `RESEND_FROM_EMAIL`

Then run:

```bash
npm install
npm run dev
```

To build and run the production bundle locally:

```bash
npm run build
npm run start
```

## Notes about this work (honest dev log)

- Where the agent got something wrong: 
Early in the session I  treated the Next.js `params` object as a Promise in some places and even used `await params` incorrectly, which made TypeScript expect a Promise and caused build-time type errors. I caught this during `npm run build` and fixed the components to safely await `params` or accept `props: unknown`, restoring correct typing.

One thing I'd improve with more time

With more time I'd add an automated CI pipeline that runs the Supabase migrations, type checks, linting, and end-to-end smoke tests against a preview deployment. That would catch type, import, and runtime issues earlier (and ensure signup/magic-link redirects use the correct deployed origin).
