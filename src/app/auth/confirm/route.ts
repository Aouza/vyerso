import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseServerClient } from "@/infrastructure/supabase/server";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type");

  const fail = () => NextResponse.redirect(new URL("/login?erro=link", origin));
  // Destino fixo: sem parâmetro `next`, logo sem open redirect.
  const ok = () => NextResponse.redirect(new URL("/connections", origin));

  // Fluxo PKCE (link padrão do Supabase): exige o mesmo navegador que pediu o link.
  if (code) {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    return error ? fail() : ok();
  }

  // Fluxo token_hash (template customizado): funciona em qualquer navegador.
  if (!tokenHash || type !== "email") return fail();

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.verifyOtp({
    type: "email",
    token_hash: tokenHash,
  });
  return error ? fail() : ok();
}
