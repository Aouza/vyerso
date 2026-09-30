import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseServerClient } from "@/infrastructure/supabase/server";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type");

  const fail = () => NextResponse.redirect(new URL("/login?erro=link", origin));

  if (!tokenHash || type !== "email") return fail();

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.verifyOtp({
    type: "email",
    token_hash: tokenHash,
  });
  if (error) return fail();

  // Destino fixo: sem parâmetro `next`, logo sem open redirect.
  return NextResponse.redirect(new URL("/connections", origin));
}
