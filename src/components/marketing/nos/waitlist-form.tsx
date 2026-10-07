import { nosCopy } from "@/features/marketing/nos/copy";
import { ArrowIcon } from "./primitives";

const fc = nosCopy.finalCta;

/**
 * Captura de e-mail desativada: onde guardar a lista é a OD-11 (aberta) e a
 * política de privacidade ainda é DRAFT. Enquanto isso o formulário não envia
 * nada. Ativar = trocar WAITLIST_ENABLED e ligar uma Server Action (Fase 2).
 */
const WAITLIST_ENABLED = false;

export function WaitlistForm() {
  const disabled = !WAITLIST_ENABLED;
  return (
    <div className="flex w-full max-w-[540px] flex-col items-center gap-3.5">
      <form className="flex w-full flex-col gap-2.5 md:flex-row">
        <label htmlFor="nos-email" className="sr-only">
          {fc.emailLabel}
        </label>
        <input
          id="nos-email"
          type="email"
          name="email"
          autoComplete="email"
          placeholder={fc.emailPlaceholder}
          disabled={disabled}
          className="box-border min-w-0 flex-[1_1_260px] rounded-full border border-nos-ink/20 bg-white px-6 py-4 text-base text-nos-ink placeholder:text-nos-faint disabled:opacity-70 md:py-[18px] md:text-[17px]"
        />
        <button
          type="submit"
          disabled={disabled}
          className="inline-flex shrink-0 items-center justify-between gap-3 rounded-full bg-nos-ink py-1.5 pl-6 pr-1.5 text-[17px] font-semibold text-white disabled:cursor-not-allowed disabled:opacity-80 md:justify-center md:pl-[26px]"
        >
          {fc.submit}
          <span className="grid size-11 place-items-center rounded-full bg-nos-coral text-nos-ink">
            <ArrowIcon />
          </span>
        </button>
      </form>
      {disabled && (
        <p
          role="status"
          className="m-0 text-sm font-semibold text-nos-teal-deep"
        >
          {fc.pending}
        </p>
      )}
      <p className="m-0 max-w-[460px] text-xs text-nos-soft md:text-[13px]">
        {fc.consent}{" "}
        <a href="#privacidade" className="text-nos-ink">
          {fc.policy}
        </a>
      </p>
    </div>
  );
}
