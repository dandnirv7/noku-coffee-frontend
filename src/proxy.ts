import { authClient } from "@/features/auth/lib/auth-client";
import {
  ADMIN_ROUTES,
  AUTH_ROUTES,
  PROTECTED_ROUTES,
} from "@/features/auth/lib/routes";
import { NextRequest, NextResponse } from "next/server";

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  let session = null;

  try {
    const res = await authClient.getSession({
      fetchOptions: {
        headers: {
          cookie: request.headers.get("cookie") || "",
        },
      },
    });
    session = res.data;
  } catch {
    session = null;
  }

  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route),
  );

  const isAdminRoute = ADMIN_ROUTES.some((route) => pathname.startsWith(route));

  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));

  if ((isProtectedRoute || isAdminRoute) && !session) {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  if (isAdminRoute && session?.user?.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/forbidden", request.url));
  }

  if (isAuthRoute && session) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all requests except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder (images, etc)
     */
    "/((?!_next/static|_next/image|favicon.ico|public|api/auth).*)",
  ],
};
