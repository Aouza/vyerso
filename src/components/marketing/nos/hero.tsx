import Link from "next/link";
import {
  HEADLINES,
  INTEREST_PATH,
  nosCopy,
  type HeadlineVariant,
} from "@/features/marketing/nos/copy";
import { Avatar, FloatingBubble, TypingDots } from "./chat";
import { Accent, CtaLink, LockIcon, Logo, NosMark } from "./primitives";

const c = nosCopy.hero;

export function Header() {
  return (
    <header className="mx-auto max-w-[1160px] px-4 py-3.5 md:px-8 md:py-5">
      <div className="flex items-center justify-between gap-6 rounded-full bg-white py-1.5 pl-5 pr-1.5 shadow-[0_10px_30px_rgba(20,23,31,0.07)] md:py-2.5 md:pl-7 md:pr-3">
        <Link
          href="#topo"
          aria-label={nosCopy.nav.brand}
          className="inline-flex min-h-11 items-center no-underline"
        >
          <Logo priority />
        </Link>
        <nav
          aria-label="Principal"
          className="hidden items-center gap-7 text-[15px] font-medium text-nos-muted md:flex"
        >
          {nosCopy.nav.links.map((l) => (
            <a key={l.href} href={l.href} className="no-underline">
              {l.label}
            </a>
          ))}
        </nav>
        <Link
          href={INTEREST_PATH}
          className="inline-flex min-h-11 items-center rounded-full bg-nos-ink px-[18px] text-sm font-semibold text-white no-underline md:px-[22px] md:text-[15px]"
        >
          {nosCopy.nav.cta}
        </Link>
      </div>
    </header>
  );
}

function FindingCard() {
  const k = c.card;
  return (
    <div className="relative z-[1] flex w-full max-w-[440px] rotate-[2.5deg] flex-col gap-3 rounded-3xl bg-white p-[18px] shadow-[0_40px_90px_rgba(20,23,31,0.2)] md:gap-3.5 md:rounded-[28px] md:p-6">
      <div className="flex items-center justify-between">
        <p className="m-0 text-xs text-nos-faint">{k.kicker}</p>
        <p className="m-0 rounded-[10px] border border-nos-ink/15 px-2.5 py-[3px] text-xs text-nos-muted">
          {k.badge}
        </p>
      </div>
      <div className="flex flex-col items-center gap-2 text-center">
        <div className="flex" aria-hidden="true">
          <Avatar voice="you" size={52} />
          <span className="-ml-3">
            <Avatar voice="person" size={52} />
          </span>
        </div>
        <p className="m-0 text-[19px] font-bold tracking-[-0.02em] md:text-[22px]">
          {k.title}
        </p>
        <p className="m-0 text-[13px] text-nos-soft">{k.subtitle}</p>
      </div>
      <div className="flex items-center gap-3.5 rounded-[18px] bg-nos-warm px-4 py-3">
        <svg
          width="52"
          height="52"
          viewBox="0 0 60 60"
          aria-hidden="true"
          className="shrink-0"
        >
          <circle
            cx="30"
            cy="30"
            r="25"
            fill="none"
            stroke="#e3ded5"
            strokeWidth="6"
          />
          <circle
            cx="30"
            cy="30"
            r="25"
            fill="none"
            stroke="#0f6b61"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray="145 157"
            transform="rotate(-90 30 30)"
          />
          <path
            d="M21 31l6 6 12-13"
            fill="none"
            stroke="#0f6b61"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div>
          <p className="m-0 text-xs text-nos-soft">{k.baseLabel}</p>
          <p className="m-0 text-[15px] font-bold">{k.baseValue}</p>
        </div>
      </div>
      <div className="flex flex-col gap-1.5 rounded-[18px] bg-nos-peach px-4 py-3.5 md:rounded-[20px] md:px-5 md:py-[18px]">
        <p className="m-0 text-xs text-nos-soft">{k.findingLabel}</p>
        <p className="m-0 text-[21px] font-bold leading-[1.14] tracking-[-0.03em] md:text-[26px]">
          {k.findingBefore}
          <Accent className="text-nos-orange-deep">{k.findingAccent}</Accent>
          {k.findingAfter}
        </p>
        <p className="m-0 text-[13px] text-nos-muted">{k.periods}</p>
      </div>
      <div className="relative overflow-hidden rounded-[16px] bg-nos-warm px-3.5 py-3">
        <div className="blur-[4px]" aria-hidden="true">
          <p className="m-0 text-sm font-bold">{k.lockedTitle}</p>
          <span className="mt-2 block h-[7px] w-40 rounded-full bg-[#e3ded5]" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center gap-2 bg-white/35">
          <LockIcon size={18} />
          <span className="text-xs font-semibold">{k.lockedLabel}</span>
        </div>
      </div>
      <div className="flex gap-2 text-xs text-nos-muted">
        <span className="rounded-full bg-nos-teal-tint px-2.5 py-1 font-semibold text-nos-teal">
          {k.chipPeriods}
        </span>
        <span className="rounded-full bg-nos-warm px-2.5 py-1">
          {k.chipEvidence}
        </span>
      </div>
    </div>
  );
}

export function Hero({ variant = "controle" }: { variant?: HeadlineVariant }) {
  const h = HEADLINES[variant];
  return (
    <section id="topo" className="relative overflow-hidden">
      <svg
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        width="100%"
        height="320"
        aria-hidden="true"
        className="absolute bottom-0 left-0 hidden md:block"
      >
        <defs>
          <linearGradient id="nos-arc" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#ff8a66" stopOpacity="0" />
            <stop offset="0.45" stopColor="#ff8a66" />
            <stop offset="1" stopColor="#0f6b61" />
          </linearGradient>
        </defs>
        <path
          d="M-20 270 C 300 300, 620 130, 930 168 S 1320 60, 1480 92"
          fill="none"
          stroke="url(#nos-arc)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle
          cx="930"
          cy="168"
          r="9"
          fill="#fff"
          stroke="#0f6b61"
          strokeWidth="4"
        />
      </svg>
      <div className="relative mx-auto flex max-w-[1160px] flex-wrap items-start gap-10 px-5 pt-6 md:px-8 md:pt-12">
        <div className="flex flex-[1_1_440px] flex-col items-start gap-[18px] pb-10 md:gap-[22px] md:pb-[72px] md:pt-6">
          <p className="m-0 inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.1em] text-nos-muted md:text-[13px] md:tracking-[0.12em]">
            <span className="inline-block size-2 rounded-full bg-nos-orange" />
            {c.eyebrow}
          </p>
          <h1 className="m-0 text-[46px] font-bold leading-none tracking-[-0.04em] md:text-[72px]">
            {h.lead}{" "}
            <Accent className="text-nos-orange-deep">{h.accent}</Accent>
          </h1>
          <p className="m-0 max-w-[500px] text-lg md:text-xl">{c.lead}</p>
          <p className="m-0 max-w-[500px] text-base text-nos-muted md:text-lg">
            {c.productBefore}
            <NosMark />
            {c.productAfter}
          </p>
          <CtaLink
            href={INTEREST_PATH}
            className="self-stretch justify-between md:self-start"
          >
            {c.cta}
          </CtaLink>
          <p className="m-0 inline-flex items-center gap-2 text-[13px] text-nos-muted md:text-sm">
            <span className="text-nos-teal">
              <LockIcon size={16} />
            </span>
            <span>
              {c.privacyBefore}
              <a href="#privacidade" className="font-semibold text-nos-teal">
                {c.privacyLink}
              </a>
            </span>
          </p>
          <p className="m-0 flex flex-wrap items-center gap-2.5 text-[13px] text-nos-muted">
            <span className="text-[11px] uppercase tracking-[0.1em] text-nos-faint">
              {c.sourceLabel}
            </span>
            <span className="inline-flex items-center gap-1.5 font-semibold text-nos-ink">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#0f6b61"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 20.5l1.6-5.4A8.4 8.4 0 1 1 21 11.5z" />
              </svg>
              {c.source}
            </span>
          </p>
        </div>

        <div className="flex flex-[1_1_380px] justify-center">
          <div className="relative flex h-[560px] w-full max-w-[480px] justify-center pt-5 md:h-[640px] md:pt-[34px]">
            <FindingCard />
            <FloatingBubble voice="you" className="right-0 top-0 md:-right-2.5">
              {c.bubbles.you}
            </FloatingBubble>
            <FloatingBubble
              voice="person"
              delay={1.2}
              className="left-0 top-[250px] md:-left-8"
            >
              {c.bubbles.person}
            </FloatingBubble>
            <FloatingBubble
              voice="person"
              delay={2.4}
              className="bottom-[150px] right-0 md:-right-3.5"
            >
              <TypingDots />
            </FloatingBubble>
            <div className="absolute bottom-[22px] left-0 z-[2] w-[220px] -rotate-4 rounded-2xl bg-nos-ink px-4 py-3 text-white shadow-[0_18px_40px_rgba(20,23,31,0.28)] md:bottom-[26px] md:w-[250px] md:rounded-[18px] md:px-[18px] md:py-3.5">
              <p className="m-0 text-[11px] text-[#b5bac6] md:text-xs">
                {c.floatTitle}
              </p>
              <p className="m-0 mt-0.5 text-[13px] leading-[1.35] md:text-sm">
                {c.floatBefore}
                <strong className="text-nos-coral">{c.floatAccent}</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
