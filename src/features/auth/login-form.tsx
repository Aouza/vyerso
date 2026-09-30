"use client";

import { useActionState } from "react";
import { signInWithEmail, type LoginState } from "./actions";

const initial: LoginState = { status: "idle", message: "" };

export function LoginForm() {
  const [state, action, pending] = useActionState(signInWithEmail, initial);

  return (
    <form action={action} className="flex w-full max-w-sm flex-col gap-3">
      <label htmlFor="email" className="text-sm font-medium">
        E-mail
      </label>
      <input
        id="email"
        name="email"
        type="email"
        autoComplete="email"
        required
        className="rounded-md border border-zinc-300 px-3 py-2"
      />
      <button
        type="submit"
        disabled={pending}
        className="rounded-md bg-black px-3 py-2 text-white disabled:opacity-50"
      >
        {pending ? "Enviando…" : "Receber link de acesso"}
      </button>
      {state.message && (
        <p
          role="status"
          className={
            state.status === "error" ? "text-red-600" : "text-zinc-700"
          }
        >
          {state.message}
        </p>
      )}
    </form>
  );
}
