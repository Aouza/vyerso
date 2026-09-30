import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";

const url = () => process.env.NEXT_PUBLIC_SUPABASE_URL!;
const publishable = () => process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;
const secret = () => process.env.SUPABASE_SECRET_KEY!;
const opts = { auth: { persistSession: false, autoRefreshToken: false } };

/** Somente testes: cria/remove usuários e verifica cascata. Nunca em código de produto. */
export const adminClient = (): SupabaseClient =>
  createClient(url(), secret(), opts);

export const anonClient = (): SupabaseClient =>
  createClient(url(), publishable(), opts);

export type TestUser = { id: string; email: string; client: SupabaseClient };

/** Cria um usuário descartável e devolve um cliente já autenticado como ele. */
export async function createTestUser(): Promise<TestUser> {
  const email = `rls-${randomUUID()}@example.invalid`;
  const admin = adminClient();
  const created = await admin.auth.admin.createUser({
    email,
    email_confirm: true,
  });
  if (created.error || !created.data.user) {
    throw created.error ?? new Error("createUser sem usuário");
  }
  const link = await admin.auth.admin.generateLink({
    type: "magiclink",
    email,
  });
  if (link.error) throw link.error;
  const client = anonClient();
  const session = await client.auth.verifyOtp({
    type: "magiclink",
    token_hash: link.data.properties.hashed_token,
  });
  if (session.error) throw session.error;
  return { id: created.data.user.id, email, client };
}

export async function deleteTestUser(id: string): Promise<void> {
  await adminClient().auth.admin.deleteUser(id);
}
