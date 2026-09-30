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
