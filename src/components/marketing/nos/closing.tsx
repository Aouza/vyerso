import Link from "next/link";
import { INTEREST_PATH, nosCopy } from "@/features/marketing/nos/copy";
import {
  Accent,
  CheckCircleIcon,
  CtaLink,
  Eyebrow,
  Logo,
  NosMark,
} from "./primitives";

const o = nosCopy.objections;
const iv = nosCopy.invite;
const fc = nosCopy.finalCta;
const ft = nosCopy.footer;

/** Seção 11: objeções reais, não um FAQ decorativo. */
export function Objections() {
  return (
    <section
      id="faq"
      className="mx-auto flex max-w-[820px] flex-col gap-3 px-4 pb-12 md:gap-7 md:px-8 md:pb-24"
    >
      <h2 className="m-0 px-1 text-[28px] font-bold leading-[1.08] tracking-[-0.03em] md:px-0 md:text-[40px]">
        {o.titleBefore}
        <Accent>{o.titleAccent}</Accent>
      </h2>
      <div className="flex flex-col gap-3">
        {o.items.map((it) => (
          <div
            key={it.q}
            className="rounded-[20px] bg-white px-5 py-[18px] md:rounded-[22px] md:px-7 md:py-6"
          >
            <h3 className="m-0 text-[17px] font-bold md:text-[19px]">{it.q}</h3>
            <p className="m-0 mt-1.5 text-[15px] text-nos-muted md:mt-2 md:text-base">
              {"a" in it ? (
                it.a
              ) : (
                <>
                  {it.before}
                  <NosMark />
                  {it.after}
                </>
              )}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

/** Seção 10: convite à descoberta. Sem preço: a fake door mede interesse em experimentar. */
export function Invite() {
  return (
    <section
      id="oferta"
      className="mx-auto max-w-[1160px] px-4 pb-12 md:px-8 md:pb-24"
    >
      <div className="flex flex-wrap items-center gap-6 rounded-[28px] bg-white px-[18px] py-[26px] shadow-[0_18px_44px_rgba(20,23,31,0.08)] md:gap-12 md:rounded-[40px] md:p-14">
        <div className="flex flex-[1_1_340px] flex-col gap-4 md:gap-[18px]">
          <Eyebrow>{iv.eyebrow}</Eyebrow>
          <h2 className="m-0 text-[30px] font-bold leading-[1.06] tracking-[-0.035em] md:text-[46px] md:leading-[1.04]">
            {iv.titleBefore}
            <NosMark /> <Accent>{iv.titleAccent}</Accent>
          </h2>
          <p className="m-0 text-[15px] text-nos-muted md:text-lg">{iv.body}</p>
          <CtaLink
            href={INTEREST_PATH}
            className="justify-between self-stretch md:self-start"
          >
            {iv.cta}
          </CtaLink>
        </div>
        <div className="flex flex-[1_1_340px] flex-col gap-3 rounded-[22px] bg-nos-warm p-5 md:gap-3.5 md:rounded-[28px] md:p-8">
          <p className="m-0 text-lg font-bold md:text-xl md:tracking-[-0.02em]">
            {iv.listTitle}
          </p>
          {iv.items.map((t) => (
            <div
              key={t}
              className="flex items-start gap-2.5 text-[15px] md:gap-3 md:text-base"
            >
              <CheckCircleIcon className="text-nos-teal md:mt-0.5" />
              <span>{t}</span>
            </div>
          ))}
          <p className="m-0 mt-0.5 text-[13px] text-nos-soft md:mt-1.5 md:text-sm">
            {iv.note}
          </p>
        </div>
      </div>
    </section>
  );
}

/** Seção 12: fecha o loop aberto no hero. */
export function FinalCta() {
  return (
    <section
      id="fim"
      className="mx-auto max-w-[1160px] px-4 pb-12 md:px-8 md:pb-24"
    >
      <div
        className="flex flex-col items-center gap-3.5 rounded-[28px] px-5 py-9 text-center shadow-[0_24px_60px_rgba(20,23,31,0.08)] md:gap-[18px] md:rounded-[36px] md:px-8 md:py-16"
        style={{
          background:
            "radial-gradient(60% 80% at 80% 0%, rgba(255,138,102,0.35), transparent), radial-gradient(50% 70% at 10% 100%, rgba(110,197,184,0.35), transparent), #fff",
        }}
      >
        <h2 className="m-0 max-w-[760px] text-[32px] font-bold leading-[1.06] tracking-[-0.035em] md:text-[50px] md:leading-[1.04]">
          {fc.titleBefore}
          <Accent className="text-nos-orange-deep">{fc.titleAccent}</Accent>
        </h2>
        <p className="m-0 max-w-[540px] text-[15px] text-nos-muted md:text-lg">
          {fc.body}
        </p>
        <CtaLink
          href={INTEREST_PATH}
          className="mt-2 justify-between self-stretch md:self-center"
        >
          {fc.cta}
        </CtaLink>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-nos-ink/10">
      <div className="mx-auto flex max-w-[1160px] flex-wrap justify-between gap-6 px-5 pb-11 pt-3 text-[13px] text-nos-soft md:px-8 md:pb-14 md:pt-10 md:text-sm">
        <div className="flex max-w-[480px] flex-col gap-2">
          <Logo className="h-9 w-auto self-start md:h-10" />
          <span>{ft.tagline}</span>
          <span>{ft.disclaimer}</span>
        </div>
        <div className="flex items-start gap-6">
          {ft.links.map((l) => (
            <Link key={l.href} href={l.href} className="no-underline">
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
