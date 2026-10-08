import type { Metadata } from "next";
import Link from "next/link";
import { InterestForm } from "@/components/marketing/nos/interest-form";
import {
  Accent,
  CheckCircleIcon,
  Eyebrow,
  Logo,
  NosMark,
} from "@/components/marketing/nos/primitives";
import { nosCopy } from "@/features/marketing/nos/copy";

const c = nosCopy.interest;

export const metadata: Metadata = {
  title: "Quase lá: o Nós ainda está abrindo",
  robots: { index: false, follow: false },
};

/**
 * Fake door: quem clica no CTA da /nos chega aqui. Dizemos com clareza que o
 * produto ainda não está disponível e que nada foi cobrado, antes de pedir o
 * e-mail. A visita a esta URL é o sinal de intenção (medição formal: OD-21).
 */
export default function InterestPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-[640px] flex-col gap-8 px-5 py-8 md:py-16">
      <Link href="/nos" aria-label="Vyerso" className="self-start">
        <Logo />
      </Link>
      <Link
        href="/nos"
        className="self-start text-sm font-semibold text-nos-muted no-underline"
      >
        ← {c.back}
      </Link>

      <div className="flex flex-col gap-4">
        <Eyebrow>{c.eyebrow}</Eyebrow>
        <h1 className="m-0 text-[36px] font-bold leading-[1.05] tracking-[-0.035em] md:text-[52px]">
          {c.titleBefore}
          <Accent>{c.titleAccent}</Accent>
        </h1>
        <p className="m-0 text-base text-nos-muted md:text-lg">
          {c.bodyBefore}
          <NosMark />
          {c.bodyAfter}
        </p>
      </div>

      <ul className="m-0 flex list-none flex-col gap-3 rounded-3xl bg-white p-6 shadow-[0_12px_30px_rgba(20,23,31,0.06)]">
        {c.truth.map((t) => (
          <li key={t} className="flex items-start gap-3 text-base">
            <CheckCircleIcon className="mt-0.5 text-nos-teal" />
            <span>{t}</span>
          </li>
        ))}
      </ul>

      <div className="rounded-3xl bg-nos-warm p-6 md:p-8">
        <InterestForm />
      </div>
    </main>
  );
}
