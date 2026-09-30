import type { SupabaseClient } from "@supabase/supabase-js";
import {
  connectionRowSchema,
  type Connection,
  type CreateConnectionInput,
} from "./schema";

const COLUMNS = "id, display_name, context_type, created_at, updated_at";

// Recebem o cliente com a sessão do usuário: a RLS é quem isola os dados.
// Erros carregam só o código do banco, nunca dados.

export async function listConnections(
  client: SupabaseClient,
): Promise<Connection[]> {
  const { data, error } = await client
    .from("connections")
    .select(COLUMNS)
    .order("created_at", { ascending: false });
  if (error) throw new Error(`listConnections failed: ${error.code}`);
  return data.map((row) => connectionRowSchema.parse(row));
}

export async function createConnection(
  client: SupabaseClient,
  input: CreateConnectionInput,
): Promise<Connection> {
  // owner_user_id é definido pelo banco (default auth.uid()); o cliente não pode enviá-lo.
  const { data, error } = await client
    .from("connections")
    .insert({
      display_name: input.displayName,
      context_type: input.contextType ?? null,
    })
    .select(COLUMNS)
    .single();
  if (error) throw new Error(`createConnection failed: ${error.code}`);
  return connectionRowSchema.parse(data);
}
