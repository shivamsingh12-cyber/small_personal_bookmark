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
