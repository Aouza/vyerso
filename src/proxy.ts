import { NextResponse, type NextRequest } from "next/server";
import { resolveAuthLanding, resolveGate } from "@/features/auth/redirect";
import { refreshSession } from "@/infrastructure/supabase/proxy-client";

export async function proxy(request: NextRequest) {
  const landing = resolveAuthLanding(
    request.nextUrl.pathname,
    request.nextUrl.search,
  );
  if (landing) return NextResponse.redirect(new URL(landing, request.url));

  const { response, hasSession } = await refreshSession(request);
  const gate = resolveGate(request.nextUrl.pathname, hasSession);
  if (gate === "allow") return response;

  const target = gate === "redirect-login" ? "/login" : "/connections";
  const redirect = NextResponse.redirect(new URL(target, request.url));
  // Preserva cookies de sessão renovados.
  response.cookies.getAll().forEach((c) => redirect.cookies.set(c));
  return redirect;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
