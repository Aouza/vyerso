"use client";

import Link from "next/link";
import { useState } from "react";
import { nosCopy } from "@/features/marketing/nos/copy";
import { ArrowIcon } from "./primitives";

const c = nosCopy.interest;

/**
 * Captura de e-mail desativada: onde guardar a lista é a OD-11 (aberta) e a
 * política de privacidade ainda é DRAFT. Enquanto isso o formulário não envia
 * nada. Ativar = trocar INTEREST_CAPTURE_ENABLED e ligar uma Server Action.
 * A pergunta de um toque é opcional e não contém dado de conversa.
 */
const INTEREST_CAPTURE_ENABLED = false;

export function InterestForm() {
  const [topic, setTopic] = useState<string | null>(null);
  const disabled = !INTEREST_CAPTURE_ENABLED;

  return (
    <form className="flex w-full flex-col gap-6">
      <fieldset className="m-0 flex flex-col gap-3 border-0 p-0">
        <legend className="mb-3 p-0 text-sm font-semibold text-nos-muted">
          {c.questionLabel}
        </legend>
        <div className="flex flex-wrap gap-2.5">
          {c.options.map((option) => (
            <label
              key={option}
              className={`cursor-pointer rounded-full border px-4 py-2.5 text-[15px] font-medium has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-nos-teal ${
                topic === option
                  ? "border-nos-ink bg-nos-ink text-white"
                  : "border-nos-ink/20 bg-white text-nos-ink"
              }`}
            >
              <input
                type="radio"
                name="topic"
                value={option}
                checked={topic === option}
                onChange={() => setTopic(option)}
                className="sr-only"
              />
              {option}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="flex flex-col gap-3">
        <p className="m-0 text-lg font-bold tracking-[-0.02em]">
          {c.emailTitle}
        </p>
        <div className="flex flex-col gap-2.5 md:flex-row">
          <label htmlFor="nos-email" className="sr-only">
            {c.emailLabel}
          </label>
          <input
            id="nos-email"
            type="email"
            name="email"
            autoComplete="email"
            placeholder={c.emailPlaceholder}
            disabled={disabled}
            className="box-border min-w-0 flex-[1_1_260px] rounded-full border border-nos-ink/20 bg-white px-6 py-4 text-base text-nos-ink placeholder:text-nos-faint disabled:opacity-70 md:text-[17px]"
          />
          <button
            type="submit"
            disabled={disabled}
            className="inline-flex shrink-0 items-center justify-between gap-3 rounded-full bg-nos-ink py-1.5 pl-6 pr-1.5 text-[17px] font-semibold text-white disabled:cursor-not-allowed disabled:opacity-80"
          >
            {c.submit}
            <span className="grid size-11 place-items-center rounded-full bg-nos-coral text-nos-ink">
              <ArrowIcon />
            </span>
          </button>
        </div>
        {disabled && (
          <p
            role="status"
            className="m-0 text-sm font-semibold text-nos-teal-deep"
          >
            {c.pending}
          </p>
        )}
        <p className="m-0 text-xs text-nos-soft md:text-[13px]">
          {c.consent}{" "}
          <Link href="/nos#privacidade" className="text-nos-ink">
            {c.policy}
          </Link>
        </p>
      </div>
    </form>
  );
}
