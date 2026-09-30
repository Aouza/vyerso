"use server";

import { redirect } from "next/navigation";
import { requireUser } from "@/features/auth/session";
import { createSupabaseServerClient } from "@/infrastructure/supabase/server";
import { copy } from "./copy";
import { createConnection } from "./queries";
import { createConnectionInputSchema } from "./schema";

export type CreateConnectionState = { error: string | null };

export async function createConnectionAction(
  _prev: CreateConnectionState,
  formData: FormData,
): Promise<CreateConnectionState> {
  await requireUser();

  const parsed = createConnectionInputSchema.safeParse({
    displayName: formData.get("displayName") ?? "",
    contextType: formData.get("contextType") ?? "",
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? copy.genericError };
  }

  try {
    const supabase = await createSupabaseServerClient();
    await createConnection(supabase, parsed.data);
  } catch {
    return { error: copy.genericError };
  }
  redirect("/connections");
}
