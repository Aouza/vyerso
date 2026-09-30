/**
 * O link padrão do Supabase (PKCE) pousa em `/?code=...` (Site URL). Encaminha o code
 * para a rota que troca por sessão. Nenhum outro parâmetro é repassado.
 */
export function resolveAuthLanding(
  pathname: string,
  search: string,
): string | null {
  if (pathname !== "/") return null;
  const code = new URLSearchParams(search).get("code");
  if (!code) return null;
  return `/auth/confirm?code=${encodeURIComponent(code)}`;
}

export type Gate = "allow" | "redirect-login" | "redirect-app";

const PROTECTED_PREFIXES = ["/connections"];

/**
 * Gate otimista do proxy. Não substitui autorização: as páginas chamam
 * requireUser() e os dados são protegidos por RLS.
 */
export function resolveGate(pathname: string, hasSession: boolean): Gate {
  if (pathname === "/login") return hasSession ? "redirect-app" : "allow";
  const isProtected = PROTECTED_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  );
  return isProtected && !hasSession ? "redirect-login" : "allow";
}
