import Image from "next/image";
import Link from "next/link";
import {
  HEADLINES,
  INTEREST_PATH,
  nosCopy,
  type HeadlineVariant,
} from "@/features/marketing/nos/copy";
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
          className="inline-flex min-h-11 items-center whitespace-nowrap rounded-full bg-nos-ink px-4 text-[13px] font-semibold text-white no-underline sm:px-[18px] sm:text-sm md:px-[22px] md:text-[15px]"
        >
          {nosCopy.nav.cta}
        </Link>
      </div>
    </header>
  );
}

export function Hero({ variant = "controle" }: { variant?: HeadlineVariant }) {
  const h = HEADLINES[variant];
  return (
    <section id="topo" className="relative overflow-hidden">
      <div className="relative mx-auto flex max-w-[1240px] flex-col items-start gap-6 px-5 pb-10 pt-6 md:px-8 md:pb-16 md:pt-10 lg:flex-row lg:items-center lg:gap-0">
        <div className="relative z-10 flex w-full flex-col items-start gap-[18px] md:gap-[22px] lg:w-[min(500px,40vw)] lg:shrink-0">
          <p className="m-0 inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.1em] text-nos-muted md:text-[13px] md:tracking-[0.14em]">
            <span className="inline-block size-2 rounded-full bg-nos-orange" />
            {c.eyebrow}
          </p>
          <h1 className="m-0 text-[46px] font-bold leading-none tracking-[-0.04em] md:text-[76px] md:leading-[0.98]">
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

        {/*
          A imagem inteira tem margens transparentes (o conteúdo ocupa ~64% da
          largura). No desktop ela passa por baixo da coluna de texto e sangra à
          direita, para o conteúdo ficar grande o bastante para ler. No mobile
          ela é ampliada e centralizada no conteúdo.
        */}
        <figure className="pointer-events-none relative -mx-5 m-0 w-[calc(100%+2.5rem)] select-none overflow-hidden md:-mx-8 md:w-[calc(100%+4rem)] lg:mx-0 lg:w-[min(1000px,78vw)] lg:shrink-0 lg:-ml-[min(180px,14vw)] lg:overflow-visible">
          <Image
            src="/images/hero/chat-hero-v2.webp"
            alt={c.visual.alt}
            width={1536}
            height={1024}
            priority
            sizes="(min-width: 1024px) 1000px, 145vw"
            className="relative -ml-[25%] h-auto w-[142%] max-w-none lg:ml-0 lg:w-full"
          />
        </figure>
      </div>
    </section>
  );
}
