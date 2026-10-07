import { describe, expect, it } from "vitest";
import { resolveGate } from "@/features/auth/redirect";
import { HEADLINES, nosCopy } from "./copy";

function strings(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(strings);
  if (value && typeof value === "object")
    return Object.values(value).flatMap(strings);
  return [];
}

// Afirmações que o LANDING_BRIEF.md §4 e §6 proíbem até haver decisão.
const FORBIDDEN: [RegExp, string][] = [
  [/sem assinatura/i, "OD-09 aberta"],
  [/nunca treina/i, "provedor de LLM indefinido"],
  [/mascaramos/i, "redação no navegador é só direção a investigar"],
  [/em até \d+ dias/i, "prazo deve ser placeholder [X]"],
  [/últimas? \d|restam|só hoje|por tempo limitado/i, "escassez falsa"],
  [/R\$\s*\d/, "preço não pode aparecer"],
  [/compatibilidade de \d|\d+% dos/i, "estatística inventada"],
  [/instagram|áudio/i, "só WhatsApp (OD-10)"],
  [/disponível agora|já disponível/i, "produto ainda não existe"],
];

describe("copy da /nos", () => {
  const all = [...strings(nosCopy), ...strings(HEADLINES)];

  it.each(FORBIDDEN)("não contém %s (%s)", (pattern) => {
    expect(all.filter((s) => pattern.test(s))).toEqual([]);
  });

  it("mantém os dois headlines do teste", () => {
    expect(Object.keys(HEADLINES)).toEqual(["controle", "variacao"]);
  });

  it("usa placeholder visível para o prazo de retenção", () => {
    expect(strings(nosCopy.privacy)).toContainEqual(
      expect.stringContaining("[X] dias"),
    );
  });
});

describe("rota pública", () => {
  it("o proxy deixa /nos aberta sem sessão", () => {
    expect(resolveGate("/nos", false)).toBe("allow");
  });
});
