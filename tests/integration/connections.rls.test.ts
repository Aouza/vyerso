import { afterAll, beforeAll, describe, expect, it } from "vitest";
import {
  adminClient,
  anonClient,
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

async function insertAs(user: TestUser, row: Record<string, unknown>) {
  return user.client.from("connections").insert(row).select().single();
}

describe("connections — ownership e RLS", () => {
  it("dono insere e lê; owner_user_id vem do banco (auth.uid())", async () => {
    const { data, error } = await insertAs(a, { display_name: "Ana" });
    expect(error).toBeNull();
    expect(data?.owner_user_id).toBe(a.id);
    const read = await a.client.from("connections").select("id");
    expect(read.data?.map((r) => r.id)).toContain(data?.id);
  });

  it("não permite forjar owner_user_id no INSERT (42501)", async () => {
    const { error } = await insertAs(a, {
      display_name: "Forjada",
      owner_user_id: b.id,
    });
    expect(error?.code).toBe("42501");
  });

  it("B não lê, não altera e não apaga linhas de A", async () => {
    const created = await insertAs(a, { display_name: "Só da A" });
    const id = created.data!.id as string;

    const seen = await b.client.from("connections").select().eq("id", id);
    expect(seen.data).toEqual([]);

    const upd = await b.client
      .from("connections")
      .update({ display_name: "Invadida" })
      .eq("id", id)
      .select();
    expect(upd.data).toEqual([]);

    await b.client.from("connections").delete().eq("id", id);

    const still = await a.client.from("connections").select().eq("id", id);
    expect(still.data).toHaveLength(1);
    expect(still.data![0].display_name).toBe("Só da A");
  });

  it("dono não pode alterar owner_user_id (42501)", async () => {
    const created = await insertAs(a, { display_name: "Minha" });
    const { error } = await a.client
      .from("connections")
      .update({ owner_user_id: b.id })
      .eq("id", created.data!.id);
    expect(error?.code).toBe("42501");
  });

  it("anon não lê nem insere (42501)", async () => {
    const anon = anonClient();
    const sel = await anon.from("connections").select();
    expect(sel.error?.code).toBe("42501");
    const ins = await anon.from("connections").insert({ display_name: "x" });
    expect(ins.error?.code).toBe("42501");
  });

  it("constraints de display_name e context_type (code points)", async () => {
    const empty = await insertAs(a, { display_name: "" });
    expect(empty.error?.code).toBe("23514");

    const long = await insertAs(a, { display_name: "a".repeat(81) });
    expect(long.error?.code).toBe("23514");

    const emoji80 = await insertAs(a, { display_name: "😀".repeat(80) });
    expect(emoji80.error).toBeNull();

    const emoji81 = await insertAs(a, { display_name: "😀".repeat(81) });
    expect(emoji81.error?.code).toBe("23514");

    const badCtx = await insertAs(a, { display_name: "Ok", context_type: "x" });
    expect(badCtx.error?.code).toBe("23514");

    const goodCtx = await insertAs(a, {
      display_name: "Ok",
      context_type: "ex",
    });
    expect(goodCtx.error).toBeNull();
  });

  it("updated_at avança após update do dono", async () => {
    const created = await insertAs(a, { display_name: "Antes" });
    const before = new Date(created.data!.updated_at).getTime();
    await new Promise((r) => setTimeout(r, 50));
    const upd = await a.client
      .from("connections")
      .update({ display_name: "Depois" })
      .eq("id", created.data!.id)
      .select()
      .single();
    expect(new Date(upd.data!.updated_at).getTime()).toBeGreaterThan(before);
  });

  it("excluir o usuário apaga suas conexões (cascata)", async () => {
    const temp = await createTestUser();
    await insertAs(temp, { display_name: "Temporária" });
    await deleteTestUser(temp.id);
    const left = await adminClient()
      .from("connections")
      .select("id")
      .eq("owner_user_id", temp.id);
    expect(left.data).toEqual([]);
  });

  it("service_role só lê connections; não escreve (deny-by-default)", async () => {
    const admin = adminClient();
    const read = await admin.from("connections").select("id").limit(1);
    expect(read.error).toBeNull();
    const write = await admin
      .from("connections")
      .insert({ owner_user_id: a.id, display_name: "Via admin" });
    expect(write.error?.code).toBe("42501");
  });
});
