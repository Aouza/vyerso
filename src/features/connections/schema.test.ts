import { describe, expect, it } from "vitest";
import { connectionRowSchema, createConnectionInputSchema } from "./schema";

const parse = (input: unknown) => createConnectionInputSchema.safeParse(input);

describe("createConnectionInputSchema", () => {
  it("apara espaços nas pontas", () => {
    const r = parse({ displayName: "  Ana  " });
    expect(r.success && r.data.displayName).toBe("Ana");
  });

  it("rejeita nome vazio ou só com espaços", () => {
    expect(parse({ displayName: "" }).success).toBe(false);
    expect(parse({ displayName: "   " }).success).toBe(false);
  });

  it("aceita 80 e rejeita 81 caracteres", () => {
    expect(parse({ displayName: "a".repeat(80) }).success).toBe(true);
    expect(parse({ displayName: "a".repeat(81) }).success).toBe(false);
  });

  it("conta code points, não unidades UTF-16 (emoji)", () => {
    expect(parse({ displayName: "😀".repeat(80) }).success).toBe(true);
    expect(parse({ displayName: "😀".repeat(81) }).success).toBe(false);
  });

  it("aceita contextType válido e rejeita inválido", () => {
    const ok = parse({ displayName: "Ana", contextType: "ex" });
    expect(ok.success && ok.data.contextType).toBe("ex");
    expect(parse({ displayName: "Ana", contextType: "x" }).success).toBe(false);
  });

  it("trata contextType vazio (select do form) como ausente", () => {
    const r = parse({ displayName: "Ana", contextType: "" });
    expect(r.success && r.data.contextType).toBeUndefined();
  });
});

describe("connectionRowSchema", () => {
  it("converte a linha do banco para camelCase com Date", () => {
    const row = {
      id: "6f1c1a1e-3b6e-4a53-9a8e-0c5f6a1d2b3c",
      display_name: "Ana",
      context_type: null,
      created_at: "2026-09-29T10:00:00.000Z",
      updated_at: "2026-09-29T11:00:00.000Z",
    };
    const c = connectionRowSchema.parse(row);
    expect(c).toEqual({
      id: row.id,
      displayName: "Ana",
      contextType: null,
      createdAt: new Date(row.created_at),
      updatedAt: new Date(row.updated_at),
    });
  });
});
