import Link from "next/link";
import type { ReactNode } from "react";

/** Destaque do produto: toda menção ao Nós usa este componente. */
export function NosMark() {
  return (
    <span className="rounded-[0.4em] bg-nos-teal-tint px-[0.3em] font-accent font-medium italic text-nos-teal">
      Nós
    </span>
  );
}

/** Palavra de destaque em itálico serifado dentro de um título. */
export function Accent({
  children,
  className = "text-nos-orange-deep",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <em className={`font-accent font-normal italic ${className}`}>
      {children}
    </em>
  );
}

export function Eyebrow({
  children,
  tone = "teal",
}: {
  children: ReactNode;
  tone?: "teal" | "coral";
}) {
  return (
    <p
      className={
        tone === "teal"
          ? "m-0 inline-flex self-start rounded-full bg-nos-teal-tint px-3 py-[5px] text-xs font-semibold uppercase tracking-[0.12em] text-nos-teal"
          : "m-0 inline-flex self-start text-xs font-semibold uppercase tracking-[0.12em] text-nos-coral"
      }
    >
      {children}
    </p>
  );
}

export function ArrowIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function LockIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

export function CheckCircleIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`shrink-0 ${className}`}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M8 12.5l3 3 5-6" />
    </svg>
  );
}

export function CrossCircleIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`shrink-0 ${className}`}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M9 9l6 6M15 9l-6 6" />
    </svg>
  );
}

/** CTA principal da página: leva sempre à lista de espera. */
export function CtaLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-3.5 rounded-full bg-nos-ink py-2 pl-7 pr-2 text-[17px] font-semibold text-white no-underline shadow-[0_14px_30px_rgba(20,23,31,0.25)] ${className}`}
    >
      {children}
      <span className="grid size-11 place-items-center rounded-full bg-nos-coral text-nos-ink">
        <ArrowIcon />
      </span>
    </Link>
  );
}

/** Conteúdo dos títulos de seção, para manter a escala tipográfica única. */
export function SectionTitle({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`m-0 text-[30px] font-bold leading-[1.08] tracking-[-0.03em] md:text-[46px] md:leading-[1.06] ${className}`}
    >
      {children}
    </h2>
  );
}
