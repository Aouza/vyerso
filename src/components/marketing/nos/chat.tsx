import type { CSSProperties, ReactNode } from "react";

type Voice = "you" | "person";

const AVATAR: Record<Voice, string> = {
  you: "bg-nos-peach-avatar text-nos-orange-deep",
  person: "bg-nos-teal-bubble text-nos-teal",
};

export function Avatar({ voice, size = 34 }: { voice: Voice; size?: number }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-flex shrink-0 items-center justify-center rounded-full border-2 border-white font-bold ${AVATAR[voice]}`}
      style={{ width: size, height: size, fontSize: size * 0.41 }}
    >
      {voice === "you" ? "V" : "P"}
    </span>
  );
}

/** Balão de conversa. Você = laranja (direita), Pessoa = verde-água (esquerda). */
export function Bubble({
  voice,
  children,
  className = "",
}: {
  voice: Voice;
  children: ReactNode;
  className?: string;
}) {
  const tone =
    voice === "you"
      ? "bg-nos-peach-bubble rounded-[18px_18px_4px_18px]"
      : "bg-nos-teal-bubble rounded-[18px_18px_18px_4px]";
  return (
    <span
      className={`px-4 py-2.5 text-[15px] font-medium shadow-[0_12px_28px_rgba(20,23,31,0.12)] ${tone} ${className}`}
    >
      {children}
    </span>
  );
}

export function TypingDots({ tone = "teal" }: { tone?: "teal" | "light" }) {
  const dot = tone === "teal" ? "bg-nos-teal" : "bg-[#6ec5b8]";
  return (
    <span className="inline-flex gap-[5px]" role="img" aria-label="Digitando">
      {[0, 0.2, 0.4].map((delay) => (
        <span
          key={delay}
          className={`nos-anim nos-type inline-block size-[7px] rounded-full ${dot}`}
          style={{ animationDelay: `${delay}s` }}
        />
      ))}
    </span>
  );
}

/** Balão que flutua em volta do card do hero. */
export function FloatingBubble({
  voice,
  children,
  delay = 0,
  className,
  style,
}: {
  voice: Voice;
  children: ReactNode;
  delay?: number;
  className: string;
  style?: CSSProperties;
}) {
  const row = voice === "you" ? "flex-row" : "flex-row-reverse";
  return (
    <div
      className={`nos-anim nos-float absolute z-[2] flex items-end gap-2 ${row} ${className}`}
      style={{ animationDelay: `${delay}s`, ...style }}
      aria-hidden="true"
    >
      {voice === "you" ? (
        <>
          <Bubble voice="you">{children}</Bubble>
          <Avatar voice="you" />
        </>
      ) : (
        <>
          <Bubble voice="person" className="flex items-center">
            {children}
          </Bubble>
          <Avatar voice="person" />
        </>
      )}
    </div>
  );
}
