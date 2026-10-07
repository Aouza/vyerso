import { describe, expect, it } from "vitest";
import { resolveGate } from "@/features/auth/redirect";
import { HEADLINES, INTEREST_PATH, nosCopy } from "./copy";

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
  [/R\$/, "a página não mostra preço (OD-08)"],
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

describe("fake door", () => {
  it("todo CTA da página aponta para a tela de interesse", () => {
    expect(INTEREST_PATH).toBe("/nos/interesse");
    expect(nosCopy.hero.cta).toBeTruthy();
    expect(nosCopy.invite.cta).toBeTruthy();
    expect(nosCopy.finalCta.cta).toBeTruthy();
  });

  it("todos os CTAs principais comunicam a mesma ação", () => {
    const ctas = [
      nosCopy.hero.cta,
      nosCopy.preview.cta,
      nosCopy.discoveries.cta,
      nosCopy.invite.cta,
      nosCopy.finalCta.cta,
    ];
    expect(new Set(ctas)).toEqual(new Set(["Quero analisar minha conversa"]));
  });

  it("não deixa placeholders na página, exceto os já decididos", () => {
    const { interest, ...sales } = nosCopy;
    void interest;
    const placeholders = strings(sales).filter((s) => /\[[^\]]+\]/.test(s));
    expect(placeholders.sort()).toEqual([
      "Assim que a análise termina. Se você abandonar o envio, em até [X] dias.",
      "Você & [Pessoa]",
    ]);
  });

  it("a menção ao produto é sempre destacada pelo componente (NosMark)", () => {
    expect(strings(nosCopy).filter((s) => /Nós/.test(s))).toEqual([]);
  });

  it("a página de vendas não pede e-mail", () => {
    const { interest, ...sales } = nosCopy;
    void interest;
    expect(strings(sales).filter((s) => /e-?mail/i.test(s))).toEqual([]);
  });

  it("a tela de interesse avisa que nada foi cobrado e que ainda não existe", () => {
    const text = strings(nosCopy.interest).join(" ");
    expect(text).toMatch(/Nada foi cobrado/);
    expect(text).toMatch(/ainda não está disponível/);
  });
});

describe("rota pública", () => {
  it("o proxy deixa /nos aberta sem sessão", () => {
    expect(resolveGate("/nos", false)).toBe("allow");
  });
});
