import type { Metadata } from "next";
import { Figtree, Fraunces } from "next/font/google";
import "./nos.css";

const figtree = Figtree({
  variable: "--font-nos-figtree",
  subsets: ["latin"],
});

// Só o itálico: usado nos destaques ("quando.", "Nós").
const fraunces = Fraunces({
  variable: "--font-nos-fraunces",
  subsets: ["latin"],
  style: ["italic"],
});

export const metadata: Metadata = {
  title: "Nós: veja como a conversa de vocês mudou ao longo do tempo",
  description:
    "O Nós analisa a história das suas conversas e mostra como a forma de vocês se comunicarem mudou. Sem nota de compatibilidade, com evidências.",
};

export default function NosLayout({ children }: LayoutProps<"/nos">) {
  return (
    <div
      className={`${figtree.variable} ${fraunces.variable} font-figtree bg-nos-warm text-nos-ink`}
      style={{
        backgroundImage: "linear-gradient(180deg, #ffefe6 0, #f6f3ee 760px)",
      }}
    >
      {children}
    </div>
  );
}
