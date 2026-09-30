import { describe, expect, it } from "vitest";
import { resolveAuthLanding, resolveGate } from "./redirect";

describe("resolveAuthLanding", () => {
  it("manda /?code=... para a troca de sessão", () => {
    expect(resolveAuthLanding("/", "?code=abc")).toBe("/auth/confirm?code=abc");
  });

  it("codifica o code", () => {
    expect(resolveAuthLanding("/", "?code=a b&x=1")).toBe(
      "/auth/confirm?code=a%20b",
    );
  });

  it("ignora a home sem code e outras rotas", () => {
    expect(resolveAuthLanding("/", "")).toBeNull();
    expect(resolveAuthLanding("/", "?code=")).toBeNull();
    expect(resolveAuthLanding("/login", "?code=abc")).toBeNull();
  });
});

describe("resolveGate", () => {
  it("bloqueia rotas protegidas sem sessão", () => {
    expect(resolveGate("/connections", false)).toBe("redirect-login");
    expect(resolveGate("/connections/new", false)).toBe("redirect-login");
  });

  it("permite rotas protegidas com sessão", () => {
    expect(resolveGate("/connections", true)).toBe("allow");
    expect(resolveGate("/connections/new", true)).toBe("allow");
  });

  it("manda usuário logado para fora do /login", () => {
    expect(resolveGate("/login", true)).toBe("redirect-app");
    expect(resolveGate("/login", false)).toBe("allow");
  });

  it("nunca bloqueia a confirmação do link nem a home", () => {
    expect(resolveGate("/auth/confirm", false)).toBe("allow");
    expect(resolveGate("/auth/confirm", true)).toBe("allow");
    expect(resolveGate("/", false)).toBe("allow");
  });

  it("não trata prefixo parecido como rota protegida", () => {
    expect(resolveGate("/connectionsx", false)).toBe("allow");
  });
});
