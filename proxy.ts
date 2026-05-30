import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SESSION_COOKIE = "gursha_admin_session";

export function proxy(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith("/admin/invoices")) {
    return NextResponse.next();
  }

  const isLoggedIn = request.cookies.get(SESSION_COOKIE)?.value === "authenticated";

  if (isLoggedIn) {
    return NextResponse.next();
  }

  const loginUrl = new URL("/admin/login", request.url);
  loginUrl.searchParams.set("next", request.nextUrl.pathname);

  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin/invoices/:path*"]
};
