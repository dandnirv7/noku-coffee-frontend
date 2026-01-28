import { AUTH_ROUTES, PROTECTED_ROUTES } from "@/features/auth/lib/routes";
import { NextRequest, NextResponse } from "next/server";
import { authClient } from "@/features/auth/lib/auth-client";

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const { data: session } = await authClient.getSession();

  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route),
  );

  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));

  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  if (isAuthRoute && session) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
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
