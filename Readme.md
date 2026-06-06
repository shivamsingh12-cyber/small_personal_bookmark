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
