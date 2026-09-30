import { afterAll, beforeAll, describe, expect, it } from "vitest";
import {
  createConnection,
  listConnections,
} from "@/features/connections/queries";
import {
  createTestUser,
  deleteTestUser,
  type TestUser,
} from "./helpers/supabase";

let a: TestUser;
let b: TestUser;

beforeAll(async () => {
  a = await createTestUser();
  b = await createTestUser();
});

afterAll(async () => {
  if (a) await deleteTestUser(a.id);
  if (b) await deleteTestUser(b.id);
});

describe("connections queries (sob RLS, com sessão do usuário)", () => {
  it("usuário sem conexões recebe lista vazia", async () => {
    expect(await listConnections(b.client)).toEqual([]);
  });

  it("createConnection devolve a Connection e não envia owner_user_id", async () => {
    const created = await createConnection(a.client, {
      displayName: "Ana",
      contextType: "ex",
    });
    expect(created.displayName).toBe("Ana");
    expect(created.contextType).toBe("ex");
    expect(created.createdAt).toBeInstanceOf(Date);
  });

  it("contextType ausente vira null", async () => {
    const created = await createConnection(a.client, { displayName: "Bia" });
    expect(created.contextType).toBeNull();
  });

  it("A vê as suas; B não vê as de A", async () => {
    const created = await createConnection(a.client, { displayName: "Só A" });
    const mine = await listConnections(a.client);
    expect(mine.map((c) => c.id)).toContain(created.id);
    const theirs = await listConnections(b.client);
    expect(theirs.map((c) => c.id)).not.toContain(created.id);
  });

  it("lista em ordem decrescente de criação", async () => {
    const first = await createConnection(a.client, { displayName: "Primeira" });
    await new Promise((r) => setTimeout(r, 50));
    const second = await createConnection(a.client, { displayName: "Segunda" });
    const ids = (await listConnections(a.client)).map((c) => c.id);
    expect(ids.indexOf(second.id)).toBeLessThan(ids.indexOf(first.id));
  });

  it("erro do banco vira exceção sem vazar dados", async () => {
    await expect(
      createConnection(a.client, { displayName: "x".repeat(81) }),
    ).rejects.toThrow(/createConnection failed: 23514/);
  });
});
