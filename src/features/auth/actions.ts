"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { createSupabaseServerClient } from "@/infrastructure/supabase/server";

export type LoginState = {
  status: "idle" | "sent" | "error";
  message: string;
};

const emailSchema = z.email();

// Mesma mensagem exista ou não a conta: sem enumeração de usuários.
const SENT: LoginState = {
  status: "sent",
  message:
    "Se o e-mail estiver correto, enviamos um link de acesso. Confira sua caixa de entrada.",
};

export async function signInWithEmail(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const parsed = emailSchema.safeParse(
    String(formData.get("email") ?? "").trim(),
  );
  if (!parsed.success) {
    return { status: "error", message: "Informe um e-mail válido." };
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithOtp({
    email: parsed.data,
    options: { shouldCreateUser: true },
  });
  if (error) {
    return {
      status: "error",
      message:
        "Não foi possível enviar o link agora. Tente novamente em alguns minutos.",
    };
  }
  return SENT;
}

export async function signOut() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/login");
}
