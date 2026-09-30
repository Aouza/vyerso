"use client";

import { useActionState } from "react";
import { createConnectionAction, type CreateConnectionState } from "./actions";
import { copy } from "./copy";

const initial: CreateConnectionState = { error: null };

export function CreateConnectionForm() {
  const [state, action, pending] = useActionState(
    createConnectionAction,
    initial,
  );

  return (
    <form action={action} className="flex w-full max-w-sm flex-col gap-3">
      <label htmlFor="displayName" className="text-sm font-medium">
        {copy.nameLabel}
      </label>
      <input
        id="displayName"
        name="displayName"
        placeholder={copy.namePlaceholder}
        required
        className="rounded-md border border-zinc-300 px-3 py-2"
      />
      <label htmlFor="contextType" className="text-sm font-medium">
        {copy.contextLabel}
      </label>
      <select
        id="contextType"
        name="contextType"
        className="rounded-md border border-zinc-300 px-3 py-2"
      >
        {copy.contextOptions.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <button
        type="submit"
        disabled={pending}
        className="rounded-md bg-black px-3 py-2 text-white disabled:opacity-50"
      >
        {pending ? copy.submitting : copy.submit}
      </button>
      {state.error && (
        <p role="alert" className="text-red-600">
          {state.error}
        </p>
      )}
    </form>
  );
}
