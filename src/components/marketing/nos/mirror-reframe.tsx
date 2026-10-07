import { nosCopy } from "@/features/marketing/nos/copy";
import { TypingDots } from "./chat";
import { MonthBars } from "./illustrations";
import { Accent, Eyebrow, SectionTitle } from "./primitives";

const m = nosCopy.mirror;
const r = nosCopy.reframe;

/** Seção 2: as frases aparecem como mensagens, uma a uma. */
export function Mirror() {
  return (
    <section
      id="espelho"
      className="mx-auto max-w-[1160px] px-4 pb-12 md:px-8 md:pb-24"
    >
      <div className="flex flex-wrap items-center gap-8 rounded-[28px] bg-nos-ink p-5 py-8 text-white md:gap-12 md:rounded-[40px] md:px-14 md:py-16">
        <div className="flex flex-[1_1_340px] flex-col gap-[18px]">
          <Eyebrow tone="coral">{m.eyebrow}</Eyebrow>
          <h2 className="m-0 text-[32px] font-bold leading-[1.05] tracking-[-0.035em] md:text-[46px] md:leading-[1.04]">
            {m.titleBefore}
            <Accent className="text-nos-coral">{m.titleAccent}</Accent>
          </h2>
          <p className="m-0 text-[17px] text-[#b5bac6] md:text-lg">
            {m.question}
          </p>
          <p className="m-0 text-[13px] text-[#8a92a3] md:text-sm">{m.note}</p>
        </div>
        <div className="flex flex-[1_1_340px] flex-col gap-2 md:gap-3">
          {m.lines.map((line, i) => (
            <div
              key={line}
              className="nos-anim nos-in rounded-[16px_16px_16px_5px] bg-white/[0.08] px-4 py-3.5 text-base md:rounded-[20px_20px_20px_6px] md:px-[22px] md:py-[18px] md:text-lg"
              style={{ animationDelay: `${i * 0.7}s` }}
            >
              {line}
            </div>
          ))}
          <div
            className="nos-anim nos-in self-start rounded-[16px_16px_16px_5px] bg-[rgba(110,197,184,0.18)] px-4 py-3.5"
            style={{ animationDelay: `${m.lines.length * 0.7}s` }}
          >
            <TypingDots tone="light" />
          </div>
        </div>
      </div>
    </section>
  );
}

/** Seção 3: uma mensagem isolada contra meses de conversa. */
export function Reframe() {
  return (
    <section
      id="reframe"
      className="mx-auto flex max-w-[1160px] flex-col gap-4 px-4 pb-12 md:gap-10 md:px-8 md:pb-24"
    >
      <div className="flex max-w-[760px] flex-col gap-3 px-1 md:gap-3.5 md:px-0">
        <Eyebrow>{r.eyebrow}</Eyebrow>
        <SectionTitle>
          {r.titleBefore}
          <Accent>{r.titleAccent}</Accent>
        </SectionTitle>
        <p className="m-0 text-[15px] text-nos-muted md:text-lg">{r.body}</p>
      </div>
      <div className="flex flex-wrap gap-4 md:gap-5">
        <div className="flex flex-[1_1_280px] flex-col justify-between gap-2.5 rounded-3xl bg-white p-6 shadow-[0_12px_30px_rgba(20,23,31,0.06)] md:gap-6 md:rounded-[28px] md:p-8">
          <p className="m-0 text-[11px] font-semibold uppercase tracking-[0.1em] text-nos-faint md:text-xs">
            {r.singleLabel}
          </p>
          <p className="m-0 font-accent text-[64px] italic leading-none tracking-[-0.02em] md:text-[88px]">
            {r.singleMessage}
          </p>
          <p className="m-0 text-[15px] text-nos-muted md:text-base">
            {r.singleNote}
          </p>
        </div>
        <div className="flex flex-[2_1_440px] flex-col gap-3.5 rounded-3xl border border-nos-teal/25 bg-nos-teal-tint p-6 md:gap-5 md:rounded-[28px] md:p-8">
          <p className="m-0 text-[11px] font-semibold uppercase tracking-[0.1em] text-nos-teal md:text-xs">
            {r.manyLabel}
          </p>
          <p className="m-0 text-2xl font-bold leading-[1.1] tracking-[-0.03em] md:text-[32px]">
            {r.manyTitle}
          </p>
          <div className="flex flex-wrap gap-2 md:gap-2.5">
            {r.chips.map((chip) => (
              <span
                key={chip}
                className="rounded-full bg-white px-3.5 py-2 text-sm font-medium md:px-[18px] md:py-2.5 md:text-[15px]"
              >
                {chip}
              </span>
            ))}
          </div>
          <MonthBars
            alt={r.barsAlt}
            start={r.barsStart}
            end={r.barsEnd}
            labelSize={16}
          />
        </div>
      </div>
    </section>
  );
}
