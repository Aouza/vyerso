import type { ReactNode } from "react";
import { nosCopy } from "@/features/marketing/nos/copy";
import {
  AnalysisIllustration,
  ConfirmIllustration,
  ExportIllustration,
  PrivacyFlow,
} from "./illustrations";
import {
  Accent,
  CheckCircleIcon,
  CrossCircleIcon,
  Eyebrow,
  LockIcon,
  NosMark,
  SectionTitle,
} from "./primitives";

const h = nosCopy.how;
const df = nosCopy.different;
const pv = nosCopy.privacy;

const FEATURE_ICONS = [
  <path key="a" d="M4 6.5h16v13H4zM4 10.5h16M8.5 3.5v4M15.5 3.5v4" />,
  <path
    key="b"
    d="M10.5 18a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15zM16 16l5 5"
  />,
  <g key="c">
    <path d="M12 3l8 3v6c0 4.5-3.2 8-8 9-4.8-1-8-4.5-8-9V6z" />
    <path d="M8.5 12l2.5 2.5L15.5 10" />
  </g>,
];

function IconTile({ children }: { children: ReactNode }) {
  return (
    <span className="grid size-11 shrink-0 place-items-center rounded-[13px] bg-nos-teal-tint text-nos-teal md:size-12 md:rounded-[14px]">
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {children}
      </svg>
    </span>
  );
}

function Step({
  index,
  tint,
  art,
  title,
  children,
}: {
  index: number;
  tint: string;
  art: ReactNode;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-[1_1_290px] flex-col gap-3.5 rounded-3xl bg-white px-3 pb-[22px] pt-3 shadow-[0_12px_30px_rgba(20,23,31,0.06)] md:gap-[18px] md:rounded-[28px] md:px-4 md:pb-7 md:pt-4">
      <div
        className={`flex justify-center rounded-[18px] md:rounded-[20px] ${tint}`}
      >
        {art}
      </div>
      <div className="flex items-start gap-3.5 px-2.5 md:px-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-nos-ink font-bold text-white">
          {index}
        </span>
        <div>
          <h3 className="m-0 text-lg font-bold md:text-[21px] md:tracking-[-0.02em]">
            {title}
          </h3>
          <p className="m-0 mt-1 text-[15px] text-nos-muted md:mt-1.5 md:text-base">
            {children}
          </p>
        </div>
      </div>
    </div>
  );
}

/** Seção 8: três passos, cada um com um desenho que mostra o que acontece. */
export function HowItWorks() {
  const [s1, s2, s3] = h.steps;
  return (
    <section
      id="como"
      className="mx-auto flex max-w-[1160px] flex-col gap-[18px] px-4 pb-12 md:gap-10 md:px-8 md:pb-24"
    >
      <SectionTitle className="px-1 md:px-0">
        {h.titleBefore}
        <Accent>{h.titleAccent}</Accent>
      </SectionTitle>
      <div className="flex flex-wrap gap-4 md:gap-5">
        <Step
          index={1}
          tint="bg-nos-peach"
          art={<ExportIllustration alt={h.alts.export} />}
          title={s1.title}
        >
          {s1.text}
        </Step>
        <Step
          index={2}
          tint="bg-nos-teal-tint"
          art={<ConfirmIllustration alt={h.alts.confirm} />}
          title={s2.title}
        >
          {s2.text}
        </Step>
        <Step
          index={3}
          tint="bg-nos-warm"
          art={
            <AnalysisIllustration
              alt={h.alts.analysis}
              periodsLabel={nosCopy.hero.card.chipPeriods}
            />
          }
          title={s3.titleAfter}
        >
          {s3.textBefore}
          <NosMark />
          {s3.textAfter}
        </Step>
      </div>
      <p className="m-0 px-1 text-sm text-nos-muted md:px-0 md:text-base">
        {h.note}
      </p>
    </section>
  );
}

/** Seção 7: por que isso é diferente. Limites, evidência e tempo. */
export function Different() {
  return (
    <section
      id="diferente"
      className="mx-auto flex max-w-[1160px] flex-col gap-3.5 px-4 pb-12 md:gap-10 md:px-8 md:pb-24"
    >
      <div className="flex max-w-[760px] flex-col gap-3 px-1 pb-1 md:gap-3.5 md:px-0 md:pb-0">
        <Eyebrow>{df.eyebrow}</Eyebrow>
        <SectionTitle>
          {df.titleBefore}
          <Accent>{df.titleAccent}</Accent>
        </SectionTitle>
        <p className="m-0 text-[15px] text-nos-muted md:text-lg">
          {df.before}
          <NosMark />
          {df.after}
        </p>
      </div>

      <div className="flex flex-col gap-3.5 md:flex-row md:flex-wrap md:gap-5">
        {df.items.map((it, i) => (
          <div
            key={it.title}
            className="flex flex-[1_1_280px] items-start gap-3.5 rounded-[22px] bg-white p-[18px] shadow-[0_10px_26px_rgba(20,23,31,0.06)] md:flex-col md:gap-3.5 md:rounded-[28px] md:p-7 md:shadow-[0_16px_40px_rgba(20,23,31,0.06)]"
          >
            <IconTile>{FEATURE_ICONS[i]}</IconTile>
            <div>
              <h3 className="m-0 text-[17px] font-bold md:text-[21px] md:tracking-[-0.02em]">
                {it.title}
              </h3>
              <p className="m-0 mt-0.5 text-sm text-nos-muted md:mt-3.5 md:text-base">
                {it.text}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3.5 md:flex-row md:flex-wrap md:gap-4">
        <div className="flex-[1_1_340px] rounded-[20px] bg-white px-5 py-4 shadow-[0_10px_26px_rgba(20,23,31,0.06)] md:rounded-3xl md:px-7 md:py-6">
          <p className="m-0 text-[11px] font-semibold uppercase tracking-[0.1em] text-nos-faint md:text-xs">
            {df.genericLabel}
          </p>
          <p className="m-0 mt-1 text-base text-nos-soft md:mt-2 md:text-[19px]">
            {df.generic}
          </p>
        </div>
        <div className="flex-[1_1_340px] rounded-[20px] border border-nos-teal/30 bg-nos-teal-tint px-5 py-4 md:rounded-3xl md:px-7 md:py-6">
          <p className="m-0 text-[11px] font-semibold uppercase tracking-[0.1em] text-nos-teal md:text-xs">
            O <NosMark />
          </p>
          <p className="m-0 mt-1 text-base font-medium md:mt-2 md:text-[19px]">
            {df.nosText}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3.5 md:flex-row md:flex-wrap md:gap-4">
        <div className="flex-[1_1_340px] rounded-[20px] bg-white px-5 py-4 shadow-[0_10px_26px_rgba(20,23,31,0.06)] md:rounded-3xl md:px-7 md:py-[22px]">
          <p className="m-0 text-[11px] uppercase tracking-[0.1em] text-nos-faint md:text-xs">
            {df.notSayLabel}
          </p>
          <p className="m-0 mt-1 text-[17px] text-nos-soft line-through decoration-nos-orange md:mt-1.5 md:text-xl">
            {df.notSay}
          </p>
        </div>
        <div className="flex-[1_1_340px] rounded-[20px] border border-nos-teal/30 bg-nos-teal-tint px-5 py-4 md:rounded-3xl md:px-7 md:py-[22px]">
          <p className="m-0 text-[11px] font-semibold uppercase tracking-[0.1em] text-nos-teal md:text-xs">
            {df.sayLabel}
          </p>
          <p className="m-0 mt-1 text-[17px] font-medium md:mt-1.5 md:text-xl">
            {df.say}
          </p>
        </div>
      </div>
    </section>
  );
}

/** Seção 9: privacidade em duas camadas. Garantias simples e detalhes sob demanda. */
export function Privacy() {
  const icons = [
    <path key="t" d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13" />,
    <g key="f">
      <path d="M7 3h7l5 5v13H7z" />
      <path d="M14 3v5h5M10 13h6M10 17h4" />
    </g>,
    <g key="l">
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </g>,
  ];
  return (
    <section
      id="privacidade"
      className="mx-auto max-w-[1160px] px-4 pb-12 md:px-8 md:pb-24"
    >
      <div className="flex flex-col gap-4 rounded-[30px] border border-nos-teal/20 bg-gradient-to-b from-nos-teal-tint to-[#eaf5f2] px-4 py-7 md:gap-10 md:rounded-[40px] md:p-14">
        <div className="flex flex-wrap items-end justify-between gap-6 px-1 md:px-0">
          <div className="flex flex-[1_1_480px] flex-col gap-3 md:gap-4">
            <p className="m-0 inline-flex items-center gap-2 self-start rounded-full bg-white py-1.5 pl-2.5 pr-3.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-nos-teal md:text-xs">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#0f6b61"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 3l8 3v6c0 4.5-3.2 8-8 9-4.8-1-8-4.5-8-9V6z" />
                <path d="M8.5 12l2.5 2.5L15.5 10" />
              </svg>
              {pv.badge}
            </p>
            <h2 className="m-0 text-[32px] font-bold leading-[1.05] tracking-[-0.035em] md:text-[48px] md:leading-[1.04]">
              {pv.titleBefore}
              <Accent className="text-nos-teal">{pv.titleAccent}</Accent>
            </h2>
            <p className="m-0 max-w-[600px] text-[15px] text-nos-teal-deep md:text-lg">
              {pv.body}
            </p>
          </div>
          <a
            href="#faq"
            className="inline-flex items-center gap-1.5 pb-1.5 font-semibold text-nos-teal no-underline"
          >
            {pv.policyLink}
          </a>
        </div>

        <div className="flex flex-col gap-2.5 md:flex-row md:flex-wrap md:gap-4">
          {pv.guarantees.map((g, i) => (
            <div
              key={g}
              className="flex flex-[1_1_260px] items-center gap-3.5 rounded-[20px] bg-white p-[18px] shadow-[0_10px_26px_rgba(15,107,97,0.1)] md:flex-col md:items-start md:gap-3 md:rounded-3xl md:p-6 md:shadow-[0_14px_34px_rgba(15,107,97,0.1)]"
            >
              <IconTile>{icons[i]}</IconTile>
              <h3 className="m-0 text-base font-bold md:text-xl md:tracking-[-0.02em]">
                {g}
              </h3>
            </div>
          ))}
        </div>
        <p className="m-0 px-1 text-xs text-nos-teal-deep md:px-0 md:text-sm">
          {pv.note}
        </p>

        <details className="group rounded-[18px] bg-white/55 px-3.5 py-1 md:rounded-[20px] md:px-[22px] md:py-1.5">
          <summary className="flex min-h-12 cursor-pointer items-center text-[15px] font-semibold text-nos-teal md:text-base">
            {pv.more}
          </summary>
          <div className="flex flex-col gap-[22px] pb-[18px] pt-2.5 md:gap-10 md:pb-[22px] md:pt-3">
            <div className="rounded-[22px] bg-white px-2 pb-1 pt-4 shadow-[0_10px_26px_rgba(15,107,97,0.08)] md:rounded-[28px] md:px-4 md:pt-6">
              <PrivacyFlow alt={pv.flowAlt} labels={pv.flowLabels} />
            </div>

            <div>
              <p className="m-0 mb-2.5 px-1 text-xs font-semibold uppercase tracking-[0.1em] text-nos-teal-deep md:mb-3.5 md:text-[13px]">
                {pv.pathLabel}
              </p>
              <div className="flex flex-col gap-0 md:flex-row md:flex-wrap md:gap-[22px]">
                {pv.steps.map((s, i) => {
                  const erased = i === 2;
                  return (
                    <div
                      key={s.title}
                      className="flex flex-1 flex-col md:flex-[1_1_210px]"
                    >
                      <div
                        className={`flex h-full items-start gap-3.5 rounded-[22px] p-[18px] md:flex-col md:gap-3 md:rounded-[26px] md:p-6 ${
                          erased
                            ? "bg-nos-teal text-white shadow-[0_16px_36px_rgba(15,107,97,0.35)]"
                            : "bg-white shadow-[0_10px_26px_rgba(15,107,97,0.1)]"
                        }`}
                      >
                        <p
                          className={`m-0 text-[11px] font-bold md:order-first ${erased ? "" : "text-nos-faint"}`}
                        >
                          {erased ? (
                            <span className="rounded-full bg-white px-[9px] py-0.5 text-nos-teal">
                              {s.tag}
                            </span>
                          ) : (
                            s.tag
                          )}
                        </p>
                        <div>
                          <h3 className="m-0 text-[17px] font-bold md:text-[19px] md:tracking-[-0.02em]">
                            {s.title}
                          </h3>
                          <p
                            className={`m-0 mt-1 text-sm md:text-[15px] ${erased ? "text-[#d4ebe7]" : "text-nos-muted"}`}
                          >
                            {s.text}
                          </p>
                        </div>
                      </div>
                      {i < pv.steps.length - 1 && (
                        <span
                          className="flex h-[22px] items-center justify-center text-nos-teal md:hidden"
                          aria-hidden="true"
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M5 9l7 7 7-7" />
                          </svg>
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-wrap gap-4 md:gap-6">
              <div className="flex flex-[1_1_440px] flex-wrap gap-6 rounded-[22px] bg-white p-5 shadow-[0_10px_26px_rgba(15,107,97,0.08)] md:rounded-[28px] md:p-7">
                <div className="flex flex-[1_1_200px] flex-col gap-3.5">
                  <p className="m-0 text-xs font-bold uppercase tracking-[0.1em] text-nos-teal">
                    {pv.keepLabel}
                  </p>
                  {pv.keep.map((t) => (
                    <div
                      key={t}
                      className="flex items-start gap-3 text-[15px] md:text-base"
                    >
                      <CheckCircleIcon className="text-nos-teal" />
                      <span>{t}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-[1_1_200px] flex-col gap-3.5">
                  <p className="m-0 text-xs font-bold uppercase tracking-[0.1em] text-nos-orange-deep">
                    {pv.neverLabel}
                  </p>
                  {pv.never.map((t) => (
                    <div
                      key={t}
                      className="flex items-start gap-3 text-[15px] md:text-base"
                    >
                      <CrossCircleIcon className="text-nos-orange-deep" />
                      <span>{t}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-[1_1_400px] flex-col gap-0.5 rounded-[22px] bg-white p-[18px] shadow-[0_10px_26px_rgba(15,107,97,0.08)] md:rounded-[28px] md:p-6">
                <div className="flex items-center justify-between gap-2 pb-3">
                  <p className="m-0 text-base font-bold md:text-[17px]">
                    {pv.control.title}
                  </p>
                  <p className="m-0 whitespace-nowrap rounded-[10px] border border-nos-ink/15 px-2.5 py-[3px] text-xs text-nos-muted">
                    {pv.control.badge}
                  </p>
                </div>
                {pv.control.items.map((it, i) => (
                  <div
                    key={it.title}
                    className="flex items-center gap-3 border-t border-nos-ink/10 py-3 md:gap-3.5 md:py-3.5"
                  >
                    <span
                      className={`grid size-9 shrink-0 place-items-center rounded-[11px] md:size-10 md:rounded-xl ${
                        i === 0
                          ? "bg-nos-teal-tint text-nos-teal"
                          : i === 1
                            ? "bg-nos-warm text-nos-ink"
                            : "bg-nos-peach text-nos-orange-deep"
                      }`}
                    >
                      {i === 0 ? (
                        <LockIcon size={18} />
                      ) : i === 1 ? (
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <circle cx="12" cy="8" r="4" />
                          <path d="M4 21c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5" />
                        </svg>
                      ) : (
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13" />
                        </svg>
                      )}
                    </span>
                    <div className="flex-1">
                      <p className="m-0 text-sm font-semibold md:text-[15px]">
                        {it.title}
                      </p>
                      <p className="m-0 text-xs text-nos-soft md:text-[13px]">
                        {it.text}
                      </p>
                    </div>
                    <span
                      className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold md:text-[13px] ${
                        i === 0
                          ? "bg-nos-teal-tint font-bold text-nos-teal"
                          : i === 1
                            ? "border border-nos-ink/20"
                            : "border border-nos-orange-deep text-nos-orange-deep"
                      }`}
                    >
                      {it.action}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <p className="m-0 px-1 text-xs text-nos-teal-deep md:px-0 md:text-[13px]">
              {pv.footnote}
            </p>
          </div>
        </details>
      </div>
    </section>
  );
}
