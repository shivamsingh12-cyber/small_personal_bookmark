import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";
import { getServerEnv } from "@/lib/env/server";

const PROTECTED_PREFIXES = ["/dashboard", "/settings"];
const AUTH_ROUTES = ["/login", "/signup", "/sign-up"];

function isProtectedRoute(pathname: string) {
  return PROTECTED_PREFIXES.some(
    (protectedPrefix) =>
      pathname === protectedPrefix || pathname.startsWith(`${protectedPrefix}/`),
  );
}

function isAuthRoute(pathname: string) {
  return AUTH_ROUTES.some(
    (authRoute) => pathname === authRoute || pathname.startsWith(`${authRoute}/`),
  );
}

export async function updateSession(request: NextRequest) {
  const env = getServerEnv();
  let response = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });

          response = NextResponse.next({
            request,
          });

          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;

  if (isProtectedRoute(pathname) && !user) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/login";
    redirectUrl.searchParams.set(
      "next",
      `${pathname}${request.nextUrl.search}`,
    );

    return NextResponse.redirect(redirectUrl);
  }

  if (isAuthRoute(pathname) && user) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/dashboard";
    redirectUrl.search = "";

    return NextResponse.redirect(redirectUrl);
  }

  return response;
}
