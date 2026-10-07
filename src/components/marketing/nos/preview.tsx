import Link from "next/link";
import { INTEREST_PATH, nosCopy } from "@/features/marketing/nos/copy";
import { Micro, Timeline } from "./illustrations";
import {
  Accent,
  ArrowIcon,
  CtaLink,
  Eyebrow,
  LockIcon,
  NosMark,
  SectionTitle,
} from "./primitives";

const m = nosCopy.mechanism;
const p = nosCopy.preview;
const d = nosCopy.discoveries;

/** Seção 4: a evolução das conversas, visível (exemplo do relatório completo). */
export function Mechanism() {
  return (
    <section
      id="mecanismo"
      className="mx-auto max-w-[1160px] px-4 pb-12 md:px-8 md:pb-24"
    >
      <div className="flex flex-col gap-[18px] rounded-[28px] bg-white px-4 py-[26px] shadow-[0_18px_44px_rgba(20,23,31,0.08)] md:gap-8 md:rounded-[40px] md:p-14">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div className="flex max-w-[700px] flex-col gap-3 md:gap-3.5">
            <Eyebrow>
              {m.eyebrowBefore}
              <NosMark />
              {m.eyebrowAfter}
            </Eyebrow>
            <SectionTitle>
              {m.titleBefore}
              <Accent>{m.titleAccent}</Accent>
            </SectionTitle>
            <p className="m-0 text-[15px] text-nos-muted md:text-lg">
              {m.bodyBefore}
              <NosMark />
              {m.bodyAfter}
            </p>
          </div>
          <p className="m-0 hidden rounded-[10px] border border-nos-ink/15 px-2.5 py-[3px] text-[13px] text-nos-muted md:block">
            {m.badge}
          </p>
        </div>

        <div className="flex flex-col gap-2 rounded-[22px] bg-nos-warm px-2.5 pb-2.5 pt-3.5 md:gap-6 md:bg-transparent md:p-0">
          <p className="m-0 self-start rounded-[9px] border border-nos-ink/15 px-2 py-0.5 text-[11px] text-nos-muted md:hidden">
            {m.badge}
          </p>
          <Timeline
            alt={m.alt}
            periods={m.periods}
            changeLabel={m.changeLabel}
            start={m.start}
            end={m.end}
          />
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 px-1 text-[13px] md:gap-x-10 md:px-0 md:text-sm">
            <span className="inline-flex items-center gap-2">
              <span className="inline-block h-1 w-[18px] rounded-sm bg-nos-orange md:h-[5px] md:w-[22px]" />
              {m.legendYou}
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="inline-block h-1 w-[18px] rounded-sm bg-nos-teal md:h-[5px] md:w-[22px]" />
              {m.legendPerson}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-3 md:flex-row md:gap-5">
          {m.captions.map((c) => (
            <div
              key={c.title}
              className="flex flex-1 flex-col gap-0.5 md:gap-1.5"
            >
              <h3 className="m-0 text-[17px] font-bold md:text-xl md:tracking-[-0.02em]">
                {c.title}
              </h3>
              <p className="m-0 text-sm text-nos-muted md:text-base">
                {c.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Seção 5: o Free Reveal só no formato. Nada de "quando", "quanto" ou duração. */
export function Preview() {
  return (
    <section
      id="previa"
      className="mx-auto max-w-[1160px] px-4 pb-12 md:px-8 md:pb-24"
    >
      <div className="flex flex-wrap items-center gap-5 rounded-[28px] bg-white px-4 py-[26px] shadow-[0_18px_44px_rgba(20,23,31,0.08)] md:gap-14 md:rounded-[40px] md:p-14">
        <div className="flex flex-[1_1_340px] flex-col gap-5 md:gap-7">
          <Eyebrow>{p.eyebrow}</Eyebrow>
          <SectionTitle>
            {p.titleBefore}
            <NosMark />
            {p.titleMid}
            <Accent>{p.titleAccent}</Accent>
          </SectionTitle>
          <div className="flex flex-col gap-3 md:gap-[18px]">
            {p.steps.map((s, i) => (
              <div key={s} className="flex items-center gap-3 md:gap-4">
                <span className="grid size-[34px] shrink-0 place-items-center rounded-full bg-nos-ink text-sm font-bold text-white md:size-10 md:text-base">
                  {i + 1}
                </span>
                <span className="text-lg font-semibold tracking-[-0.02em] md:text-[22px]">
                  {s}
                </span>
              </div>
            ))}
          </div>
          <p className="m-0 text-[13px] text-nos-soft md:text-sm">{p.note}</p>
          <CtaLink
            href={INTEREST_PATH}
            className="justify-between self-stretch md:self-start"
          >
            {p.cta}
          </CtaLink>
        </div>

        <div className="flex flex-[1_1_480px] flex-col gap-3 rounded-[22px] bg-nos-warm p-3.5 md:gap-4 md:rounded-[28px] md:p-6">
          <div className="flex items-center justify-between px-1">
            <p className="m-0 text-[13px] text-nos-soft md:text-sm">
              {p.panelLabel}
            </p>
            <p className="m-0 rounded-[10px] border border-nos-ink/15 px-2.5 py-[3px] text-xs text-nos-muted md:text-[13px]">
              {p.exampleBadge}
            </p>
          </div>

          <div className="flex flex-col gap-2 rounded-2xl bg-white px-4 py-3.5 md:gap-2.5 md:rounded-[20px] md:px-[22px] md:py-[18px]">
            <p className="m-0 text-sm font-semibold md:text-[15px]">
              {p.processing}
            </p>
            <div className="h-[7px] overflow-hidden rounded-full bg-[#efebe4] md:h-2">
              <div className="nos-anim nos-bar h-full w-full rounded-full bg-nos-teal" />
            </div>
          </div>

          <div className="flex gap-2 md:flex-wrap md:gap-2.5">
            {p.tiles.map((t) => (
              <div
                key={t.label}
                className="flex-1 rounded-[14px] bg-white p-3 md:min-w-[140px] md:rounded-[18px] md:px-4 md:py-3.5"
              >
                <p className="m-0 text-xl font-bold leading-none tracking-[-0.03em] md:text-[28px]">
                  {t.value}
                </p>
                <p className="m-0 mt-1 text-xs text-nos-soft md:mt-1.5 md:text-[13px]">
                  {t.label}
                </p>
              </div>
            ))}
          </div>

          <div
            className="nos-anim nos-in flex flex-col gap-2.5 rounded-[20px] border-2 border-nos-teal bg-white p-5 md:gap-3.5 md:rounded-3xl md:px-[30px] md:py-7"
            style={{ animationDuration: "9s", animationDelay: "1.2s" }}
          >
            <div className="flex flex-wrap items-center justify-between gap-2.5">
              <p className="m-0 text-[11px] font-bold uppercase tracking-[0.1em] text-nos-teal md:text-[13px]">
                {p.findingLabel}
              </p>
              <span className="rounded-full bg-nos-teal-tint px-2.5 py-[3px] text-[11px] font-semibold text-nos-teal md:px-3 md:text-[13px]">
                {p.findingBadge}
              </span>
            </div>
            <p className="m-0 text-[26px] font-bold leading-[1.12] tracking-[-0.03em] md:text-[34px]">
              {p.findingBefore}
              <Accent className="text-nos-orange-deep">
                {p.findingAccent}
              </Accent>
              {p.findingAfter}
            </p>
            <p className="m-0 text-sm text-nos-muted md:text-base">
              {p.periods}
            </p>
          </div>

          <p className="m-0 mt-1 px-1 text-[13px] font-semibold text-nos-muted md:mt-2 md:text-sm">
            {p.fullLabel}
          </p>
          <div className="flex flex-col gap-2 md:flex-row md:flex-wrap md:gap-2.5">
            {p.locked.map((t) => (
              <div
                key={t.title}
                className="relative overflow-hidden rounded-2xl bg-white px-4 py-3.5 md:min-h-24 md:flex-[1_1_150px] md:rounded-[18px] md:p-4"
              >
                <div
                  className="flex flex-col gap-2 blur-[4px] md:blur-[5px]"
                  aria-hidden="true"
                >
                  <p className="m-0 text-sm font-bold md:text-[15px]">
                    {t.title}
                  </p>
                  <span className="block h-[7px] w-3/4 rounded-full bg-[#e3ded5] md:h-2" />
                  <span className="hidden h-2 w-[70%] rounded-full bg-[#e3ded5] md:block" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center gap-2 bg-white/35 md:flex-col md:gap-1">
                  <LockIcon size={20} />
                  <span className="text-[13px] font-semibold md:text-sm">
                    {t.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <p className="m-0 px-1 text-xs text-nos-faint">{p.disclaimer}</p>
        </div>
      </div>
    </section>
  );
}

/** Seção 6: cada pergunta vem com uma microdemonstração diferente. */
export function Discoveries() {
  return (
    <section
      id="descobertas"
      className="mx-auto flex max-w-[1160px] flex-col gap-3 px-4 pb-12 md:gap-10 md:px-8 md:pb-24"
    >
      <div className="flex flex-wrap items-end justify-between gap-5 px-1 pb-1.5 md:px-0 md:pb-0">
        <div className="flex max-w-[700px] flex-col gap-3 md:gap-3.5">
          <Eyebrow>{d.eyebrow}</Eyebrow>
          <SectionTitle>
            {d.titleBefore}
            <Accent>{d.titleAccent}</Accent>
            {d.titleAfter}
          </SectionTitle>
        </div>
        <p className="m-0 rounded-[9px] border border-nos-ink/15 px-2 py-0.5 text-xs text-nos-muted md:rounded-[10px] md:px-2.5 md:py-[3px] md:text-[13px]">
          {d.badge}
        </p>
      </div>
      <div className="flex flex-wrap gap-3 md:gap-5">
        {d.items.map((it) => (
          <div
            key={it.key}
            className="flex flex-[1_1_320px] flex-col gap-3 rounded-[22px] bg-white p-4 shadow-[0_10px_26px_rgba(20,23,31,0.06)] md:gap-4 md:rounded-[28px] md:p-6 md:shadow-[0_16px_40px_rgba(20,23,31,0.06)]"
          >
            <div className="rounded-[14px] bg-nos-warm p-1.5 md:rounded-[18px] md:p-2">
              <Micro
                kind={it.key}
                alt={it.alt}
                labels={"labels" in it ? it.labels : undefined}
              />
            </div>
            <div>
              <h3 className="m-0 text-lg font-bold md:text-[22px] md:tracking-[-0.02em]">
                {it.title}
              </h3>
              <p className="m-0 mt-0.5 text-[15px] text-nos-muted md:mt-1 md:text-base">
                {it.text}
              </p>
            </div>
          </div>
        ))}
        <div className="hidden flex-[1_1_320px] flex-col justify-between gap-[18px] rounded-[28px] bg-nos-ink p-7 text-white md:flex">
          <p className="m-0 text-[26px] font-bold leading-[1.15] tracking-[-0.03em]">
            {d.callout}
          </p>
          <Link
            href={INTEREST_PATH}
            className="inline-flex items-center gap-3 self-start rounded-full bg-white py-1.5 pl-[22px] pr-1.5 text-base font-semibold text-nos-ink no-underline"
          >
            {d.cta}
            <span className="grid size-10 place-items-center rounded-full bg-nos-coral">
              <ArrowIcon size={18} />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
