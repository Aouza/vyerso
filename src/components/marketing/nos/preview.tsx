import { nosCopy } from "@/features/marketing/nos/copy";
import {
  Accent,
  ArrowIcon,
  CheckCircleIcon,
  Eyebrow,
  LockIcon,
  SectionTitle,
} from "./primitives";

const p = nosCopy.preview;
const d = nosCopy.discoveries;
const mech = nosCopy.mechanism;

/** Seção 4: o Free Reveal só no formato. Nada de "quando", "quanto" ou duração. */
export function Preview() {
  return (
    <section
      id="previa"
      className="mx-auto max-w-[1160px] px-4 pb-12 md:px-8 md:pb-24"
    >
      <div className="flex flex-wrap gap-8 rounded-[28px] bg-white px-[18px] py-[26px] shadow-[0_24px_60px_rgba(20,23,31,0.08)] md:gap-12 md:rounded-[36px] md:p-[52px]">
        <div className="flex flex-[1_1_320px] flex-col gap-6 md:gap-7">
          <div className="flex flex-col gap-4">
            <Eyebrow>{p.eyebrow}</Eyebrow>
            <SectionTitle>
              {p.titleBefore}
              <Accent className="text-nos-teal">{p.titleAccent}</Accent>
              {p.titleAfter}
            </SectionTitle>
            <p className="m-0 text-[15px] text-nos-soft md:text-lg">{p.body}</p>
          </div>
          <div className="flex flex-col gap-3">
            <p className="m-0 text-[13px] font-semibold uppercase tracking-[0.1em] text-nos-teal">
              {p.freeLabel}
            </p>
            {p.free.map((t) => (
              <div key={t} className="flex items-start gap-3 text-base">
                <CheckCircleIcon className="mt-0.5 text-nos-teal" />
                <span>{t}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <p className="m-0 text-[13px] font-semibold uppercase tracking-[0.1em] text-nos-faint">
              {p.fullLabel}
            </p>
            {p.full.map((t) => (
              <div
                key={t}
                className="flex items-start gap-3 text-base text-nos-muted"
              >
                <span className="mt-0.5 shrink-0 text-nos-faint">
                  <LockIcon size={22} />
                </span>
                <span>{t}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-[1_1_480px] flex-col gap-3.5 rounded-[22px] bg-nos-warm p-3.5 md:rounded-[28px] md:p-[22px]">
          <div className="flex items-center justify-between px-1">
            <p className="m-0 text-[13px] text-nos-soft">{p.panelLabel}</p>
            <p className="m-0 rounded-[10px] border border-nos-ink/15 px-2.5 py-[3px] text-xs text-nos-muted">
              {p.exampleBadge}
            </p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {p.metrics.map((mt) => (
              <div
                key={mt.label}
                className="flex-[1_1_140px] rounded-[16px] bg-white px-3.5 py-3 md:rounded-[18px] md:px-4 md:py-3.5"
              >
                <p className="m-0 flex items-center gap-1.5 text-xs text-nos-soft">
                  <span className="inline-block size-[7px] rounded-full bg-nos-teal" />
                  {mt.label}
                </p>
                <p className="m-0 mt-2 text-2xl font-bold leading-none tracking-[-0.03em] md:text-[28px]">
                  {mt.value}
                </p>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-3 rounded-[18px] border-2 border-nos-teal bg-white p-4 md:rounded-[20px] md:px-6 md:py-[22px]">
            <div className="flex items-center justify-between gap-2.5">
              <p className="m-0 text-xs font-bold uppercase tracking-[0.1em] text-nos-teal">
                {p.findingLabel}
              </p>
              <span className="rounded-full bg-nos-teal-tint px-2.5 py-[3px] text-xs font-semibold text-nos-teal">
                {p.findingBadge}
              </span>
            </div>
            <p className="m-0 text-[22px] font-bold leading-[1.14] tracking-[-0.03em] md:text-[26px]">
              {p.findingBefore}
              <Accent>{p.findingAccent}</Accent>
              {p.findingAfter}
            </p>
            <p className="m-0 text-[13px] text-nos-muted md:text-sm">
              {p.findingNote}
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3.5 rounded-[18px] bg-white p-4 md:rounded-[20px] md:px-6 md:py-5">
            <div className="flex max-w-[300px] flex-col gap-1">
              <p className="m-0 text-lg font-bold tracking-[-0.02em] md:text-xl">
                {p.periodsTitle}
              </p>
              <p className="m-0 text-[13px] text-nos-soft">{p.periodsNote}</p>
            </div>
            <span className="inline-flex items-center gap-3 rounded-full bg-nos-ink py-1.5 pl-5 pr-1.5 text-sm font-semibold text-white">
              {p.periodsCta}
              <span className="grid size-9 place-items-center rounded-full bg-nos-coral text-nos-ink">
                <ArrowIcon size={16} />
              </span>
            </span>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {p.locked.map((t) => (
              <div
                key={t.title}
                className="relative min-h-[88px] flex-[1_1_150px] overflow-hidden rounded-[16px] bg-white p-4"
              >
                <div
                  className="flex flex-col gap-2 blur-[5px]"
                  aria-hidden="true"
                >
                  <p className="m-0 text-[15px] font-bold">{t.title}</p>
                  <span className="block h-2 w-[90%] rounded-full bg-[#e3ded5]" />
                  <span className="block h-2 w-[70%] rounded-full bg-[#e3ded5]" />
                </div>
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-white/35">
                  <LockIcon size={22} />
                  <span className="text-xs font-semibold">{t.label}</span>
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

/** Seção 5: as perguntas que a análise ajuda a investigar. */
export function Discoveries() {
  return (
    <section
      id="descobertas"
      className="mx-auto flex max-w-[1160px] flex-col gap-3 px-4 pb-12 md:gap-10 md:px-8 md:pb-24"
    >
      <div className="flex max-w-[760px] flex-col gap-3 px-1 pb-1.5 md:gap-3.5 md:px-0 md:pb-0">
        <Eyebrow>{d.eyebrow}</Eyebrow>
        <SectionTitle>
          {d.titleBefore}
          <Accent>{d.titleAccent}</Accent>
          {d.titleAfter}
        </SectionTitle>
      </div>
      <div className="flex flex-wrap gap-3 md:gap-4">
        {d.items.map((it) => (
          <div
            key={it.title}
            className="flex-[1_1_300px] rounded-[20px] bg-white px-5 py-[18px] shadow-[0_10px_26px_rgba(20,23,31,0.06)] md:rounded-3xl md:px-7 md:py-[26px]"
          >
            <h3 className="m-0 text-lg font-bold md:text-[21px] md:tracking-[-0.02em]">
              {it.title}
            </h3>
            <p className="m-0 mt-1 text-[15px] text-nos-muted md:mt-2 md:text-base">
              {it.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

/** Seção 6: por que olhar o histórico inteiro. */
export function Mechanism() {
  return (
    <section
      id="mecanismo"
      className="mx-auto max-w-[1160px] px-4 pb-12 md:px-8 md:pb-24"
    >
      <div className="flex flex-col gap-5 rounded-[28px] bg-white px-[18px] py-[26px] shadow-[0_18px_44px_rgba(20,23,31,0.08)] md:gap-9 md:rounded-[36px] md:p-[52px]">
        <h2 className="m-0 max-w-[760px] text-[28px] font-bold leading-[1.08] tracking-[-0.03em] md:text-[40px] md:leading-[1.06]">
          {mech.titleBefore}
          <Accent>{mech.titleAccent}</Accent>
        </h2>
        <div className="flex flex-wrap gap-5 md:gap-6">
          {mech.items.map((it, i) => (
            <div
              key={it.title}
              className="flex flex-[1_1_260px] items-start gap-3.5 md:flex-col md:gap-3"
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-nos-ink font-bold text-white md:size-11">
                {i + 1}
              </span>
              <div>
                <h3 className="m-0 text-lg font-bold md:text-[21px] md:tracking-[-0.02em]">
                  {it.title}
                </h3>
                <p className="m-0 mt-1 text-[15px] text-nos-muted md:text-base">
                  {it.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
