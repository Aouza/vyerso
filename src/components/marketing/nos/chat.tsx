/** Indicador de "digitando" (três pontos). Usado no bloco do espelho emocional. */
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
