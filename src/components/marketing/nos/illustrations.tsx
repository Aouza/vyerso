import type { CSSProperties } from "react";

const FONT = "var(--font-nos-figtree), sans-serif";
const delay = (s: number): CSSProperties => ({ animationDelay: `${s}s` });

/** Passo 1: o celular solta o arquivo .txt. */
export function ExportIllustration({ alt }: { alt: string }) {
  return (
    <svg
      viewBox="0 0 300 200"
      width="100%"
      className="block max-w-[340px]"
      role="img"
      aria-label={alt}
    >
      <circle cx="150" cy="104" r="80" fill="#fff" fillOpacity="0.6" />
      <rect
        x="62"
        y="22"
        width="104"
        height="160"
        rx="20"
        fill="#fff"
        stroke="#14171f"
        strokeWidth="3"
      />
      <rect x="98" y="30" width="32" height="5" rx="2.5" fill="#14171f" />
      <rect x="74" y="50" width="54" height="18" rx="9" fill="#dcefeb" />
      <rect x="100" y="76" width="54" height="18" rx="9" fill="#ffd9c7" />
      <rect x="74" y="102" width="40" height="18" rx="9" fill="#dcefeb" />
      <rect x="108" y="128" width="46" height="18" rx="9" fill="#ffd9c7" />
      <rect x="74" y="156" width="80" height="14" rx="7" fill="#f6f3ee" />
      <path
        className="nos-anim nos-pop"
        style={delay(0.3)}
        d="M170 124h20m-7-7 7 7-7 7"
        fill="none"
        stroke="#14171f"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <g className="nos-anim nos-slide">
        <rect
          x="198"
          y="92"
          width="52"
          height="68"
          rx="9"
          fill="#fff"
          stroke="#14171f"
          strokeWidth="3"
        />
        <path
          d="M234 92v14h16"
          fill="none"
          stroke="#14171f"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <text
          x="224"
          y="138"
          textAnchor="middle"
          fontFamily={FONT}
          fontSize="15"
          fontWeight="700"
          fill="#e8552f"
        >
          .txt
        </text>
      </g>
    </svg>
  );
}

/** Passo 2: o arquivo chega e "Você" é selecionado. */
export function ConfirmIllustration({ alt }: { alt: string }) {
  return (
    <svg
      viewBox="0 0 300 200"
      width="100%"
      className="block max-w-[340px]"
      role="img"
      aria-label={alt}
    >
      <g className="nos-anim nos-drop">
        <rect
          x="131"
          y="12"
          width="38"
          height="50"
          rx="7"
          fill="#fff"
          stroke="#14171f"
          strokeWidth="3"
        />
        <path
          d="M158 12v12h11"
          fill="none"
          stroke="#14171f"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <text
          x="150"
          y="46"
          textAnchor="middle"
          fontFamily={FONT}
          fontSize="12"
          fontWeight="700"
          fill="#e8552f"
        >
          .txt
        </text>
      </g>
      <rect
        x="30"
        y="74"
        width="240"
        height="112"
        rx="20"
        fill="#fff"
        fillOpacity="0.7"
        stroke="#14171f"
        strokeOpacity="0.2"
        strokeWidth="2"
        strokeDasharray="6 6"
      />
      <text
        x="150"
        y="96"
        textAnchor="middle"
        fontFamily={FONT}
        fontSize="12"
        fontWeight="600"
        fill="#2f5f59"
      >
        Qual deles é você?
      </text>
      <rect x="44" y="108" width="100" height="64" rx="16" fill="#fff3ec" />
      <circle cx="70" cy="140" r="16" fill="#fbe3d8" />
      <text
        x="70"
        y="146"
        textAnchor="middle"
        fontFamily={FONT}
        fontSize="16"
        fontWeight="700"
        fill="#c8401f"
      >
        V
      </text>
      <text
        x="94"
        y="145"
        fontFamily={FONT}
        fontSize="14"
        fontWeight="600"
        fill="#14171f"
      >
        Você
      </text>
      <rect x="156" y="108" width="100" height="64" rx="16" fill="#fff" />
      <circle cx="182" cy="140" r="16" fill="#dcefeb" />
      <text
        x="182"
        y="146"
        textAnchor="middle"
        fontFamily={FONT}
        fontSize="16"
        fontWeight="700"
        fill="#0f6b61"
      >
        P
      </text>
      <text
        x="206"
        y="145"
        fontFamily={FONT}
        fontSize="14"
        fontWeight="600"
        fill="#14171f"
      >
        Pessoa
      </text>
      <rect
        className="nos-anim nos-ring"
        x="44"
        y="108"
        width="100"
        height="64"
        rx="16"
        fill="none"
        stroke="#e8552f"
        strokeWidth="3"
      />
      <rect
        x="43"
        y="107"
        width="102"
        height="66"
        rx="17"
        fill="none"
        stroke="#e8552f"
        strokeWidth="3"
      />
      <g className="nos-anim nos-pop" style={delay(0.4)}>
        <circle cx="140" cy="110" r="11" fill="#e8552f" />
        <path
          d="M135 110l3.5 3.5 6-7"
          fill="none"
          stroke="#fff"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

/** Passo 3: a linha do tempo se desenha e aparecem 4 períodos. */
export function AnalysisIllustration({
  alt,
  periodsLabel,
}: {
  alt: string;
  periodsLabel: string;
}) {
  return (
    <svg
      viewBox="0 0 300 200"
      width="100%"
      className="block max-w-[340px]"
      role="img"
      aria-label={alt}
    >
      <rect x="20" y="16" width="260" height="168" rx="18" fill="#fff" />
      <rect
        className="nos-anim nos-band"
        x="34"
        y="30"
        width="56"
        height="110"
        rx="8"
        fill="#fff3ec"
      />
      <rect
        className="nos-anim nos-band"
        style={delay(0.5)}
        x="94"
        y="30"
        width="56"
        height="110"
        rx="8"
        fill="#e3f2ef"
      />
      <rect
        className="nos-anim nos-band"
        style={delay(1)}
        x="154"
        y="30"
        width="56"
        height="110"
        rx="8"
        fill="#fff3ec"
      />
      <rect
        className="nos-anim nos-band"
        style={delay(1.5)}
        x="214"
        y="30"
        width="52"
        height="110"
        rx="8"
        fill="#e3f2ef"
      />
      <line
        x1="34"
        y1="140"
        x2="266"
        y2="140"
        stroke="#14171f"
        strokeOpacity="0.2"
        strokeWidth="2"
      />
      <path
        className="nos-anim nos-draw"
        pathLength={100}
        d="M34 108 C54 96 70 118 92 102 S130 70 152 84 S196 100 214 76 S248 54 266 58"
        fill="none"
        stroke="#e8552f"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        className="nos-anim nos-draw"
        style={delay(0.25)}
        pathLength={100}
        d="M34 118 C60 124 78 108 96 118 S140 128 160 112 S206 120 224 108 S252 100 266 104"
        fill="none"
        stroke="#0f6b61"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        className="nos-anim nos-band"
        style={delay(0.6)}
        cx="92"
        cy="140"
        r="5"
        fill="#fff"
        stroke="#14171f"
        strokeWidth="3"
      />
      <circle
        className="nos-anim nos-band"
        style={delay(1.1)}
        cx="152"
        cy="140"
        r="5"
        fill="#fff"
        stroke="#14171f"
        strokeWidth="3"
      />
      <circle
        className="nos-anim nos-band"
        style={delay(1.6)}
        cx="212"
        cy="140"
        r="5"
        fill="#fff"
        stroke="#14171f"
        strokeWidth="3"
      />
      <rect x="92" y="150" width="116" height="24" rx="12" fill="#14171f" />
      <text
        x="150"
        y="166"
        textAnchor="middle"
        fontFamily={FONT}
        fontSize="12"
        fontWeight="700"
        fill="#fff"
      >
        {periodsLabel}
      </text>
    </svg>
  );
}

const MONTH_BARS = [
  40, 54, 46, 62, 50, 68, 58, 42, 64, 72, 52, 60, 48, 66, 54, 70, 44, 60,
];

/** 18 barras, uma por mês. Neutro: não sugere nenhuma mudança. */
export function MonthBars({
  alt,
  start,
  end,
  labelSize = 12,
}: {
  alt: string;
  start: string;
  end: string;
  labelSize?: number;
}) {
  return (
    <svg
      viewBox="0 0 560 120"
      width="100%"
      className="block"
      role="img"
      aria-label={alt}
    >
      <line
        x1="0"
        y1="92"
        x2="560"
        y2="92"
        stroke="#0f6b61"
        strokeOpacity="0.25"
        strokeWidth="2"
      />
      {MONTH_BARS.map((h, i) => (
        <rect
          key={i}
          className="nos-anim nos-grow"
          style={delay(i * 0.1)}
          x={6 + i * 30.5}
          y={92 - h}
          width="18"
          height={h}
          rx="4"
          fill="#0f6b61"
          fillOpacity="0.85"
        />
      ))}
      <text x="6" y="114" fontFamily={FONT} fontSize={labelSize} fill="#2f5f59">
        {start}
      </text>
      <text
        x="554"
        y="114"
        textAnchor="end"
        fontFamily={FONT}
        fontSize={labelSize}
        fill="#2f5f59"
      >
        {end}
      </text>
    </svg>
  );
}

const NODES = [125, 375, 625, 875];

/** Faixa da privacidade: o arquivo percorre as etapas e fica só o essencial. */
export function PrivacyFlow({
  alt,
  labels,
}: {
  alt: string;
  labels: readonly string[];
}) {
  const travel = { "--nos-travel": "500px" } as CSSProperties;
  return (
    <svg
      viewBox="0 0 1000 150"
      width="100%"
      className="block"
      role="img"
      aria-label={alt}
    >
      {[165, 415, 665].map((x) => (
        <line
          key={x}
          x1={x}
          y1="56"
          x2={x + 170}
          y2="56"
          stroke="#0f6b61"
          strokeOpacity="0.6"
          strokeWidth="3"
          strokeDasharray="3 9"
          strokeLinecap="round"
        />
      ))}
      {NODES.map((x, i) => (
        <circle
          key={x}
          cx={x}
          cy="56"
          r="38"
          fill={i === 2 ? "#0f6b61" : "#e3f2ef"}
          stroke={i === 2 ? undefined : "#0f6b61"}
          strokeWidth={i === 2 ? undefined : 3}
        />
      ))}
      <g
        transform="translate(125 56)"
        fill="none"
        stroke="#0f6b61"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M0 12V-12M-11-1l11-11 11 11M-15 18h30" />
      </g>
      <g
        transform="translate(375 56)"
        fill="none"
        stroke="#0f6b61"
        strokeWidth="4"
        strokeLinecap="round"
      >
        <path d="M-14 14V2M-3 14V-14M8 14V-4" />
      </g>
      <g
        transform="translate(625 56)"
        fill="none"
        stroke="#fff"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M-14-8h28M-5-8v-6h10v6M-11-8l2 22h18l2-22M-3 0v10M3 0v10" />
      </g>
      <g
        className="nos-anim nos-late"
        transform="translate(875 56)"
        fill="none"
        stroke="#0f6b61"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M-10-16h13l9 9v23h-22zM3-16v9h9M-5 2h10M-5 8h7" />
      </g>
      <g className="nos-anim nos-travel" style={travel}>
        <rect
          x="115"
          y="43"
          width="20"
          height="26"
          rx="4"
          fill="#e8552f"
          stroke="#fff"
          strokeWidth="2"
        />
      </g>
      <g
        fontFamily={FONT}
        fontSize="17"
        fontWeight="600"
        fill="#14171f"
        textAnchor="middle"
      >
        {NODES.map((x, i) => (
          <text key={x} x={x} y="128">
            {labels[i]}
          </text>
        ))}
      </g>
    </svg>
  );
}
