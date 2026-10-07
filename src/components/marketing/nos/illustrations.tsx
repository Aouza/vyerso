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

const BAND_TINTS = ["#fff3ec", "#e3f2ef", "#fff3ec", "#e3f2ef"];

/** Seção 4: linha do tempo do relatório completo (exemplo ilustrativo). */
export function Timeline({
  alt,
  periods,
  changeLabel,
  start,
  end,
}: {
  alt: string;
  periods: readonly string[];
  changeLabel: string;
  start: string;
  end: string;
}) {
  const desktopBands = [
    [40, 210],
    [254, 242],
    [500, 236],
    [740, 220],
  ];
  const desktopLabels = [145, 375, 618, 850];
  const mobileBands = [14, 98, 182, 266];
  return (
    <>
      <svg
        viewBox="0 0 1000 340"
        width="100%"
        className="hidden md:block"
        role="img"
        aria-label={alt}
      >
        {desktopBands.map(([x, w], i) => (
          <rect
            key={x}
            className="nos-anim nos-band"
            style={delay(i * 0.5)}
            x={x}
            y="60"
            width={w}
            height="210"
            rx="14"
            fill={BAND_TINTS[i]}
          />
        ))}
        <g
          fontFamily={FONT}
          fontSize="16"
          fontWeight="600"
          fill="#6b7383"
          textAnchor="middle"
        >
          {desktopLabels.map((x, i) => (
            <text key={x} x={x} y="46">
              {periods[i]}
            </text>
          ))}
        </g>
        <line
          x1="40"
          y1="270"
          x2="960"
          y2="270"
          stroke="#14171f"
          strokeOpacity="0.2"
          strokeWidth="2"
        />
        <path
          className="nos-anim nos-draw"
          pathLength={100}
          d="M40 168 C 120 158 180 182 250 168 S 380 176 500 160 S 600 122 740 92 S 860 82 960 80"
          fill="none"
          stroke="#e8552f"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          className="nos-anim nos-draw"
          style={delay(0.25)}
          pathLength={100}
          d="M40 182 C 120 192 200 170 250 184 S 380 178 500 192 S 600 222 740 240 S 860 246 960 248"
          fill="none"
          stroke="#0f6b61"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <line
          className="nos-anim nos-band"
          style={delay(2)}
          x1="500"
          y1="60"
          x2="500"
          y2="270"
          stroke="#14171f"
          strokeWidth="2"
          strokeDasharray="6 6"
        />
        <g className="nos-anim nos-pop" style={delay(2)}>
          <rect
            x="448"
            y="280"
            width="104"
            height="30"
            rx="15"
            fill="#14171f"
          />
          <text
            x="500"
            y="300"
            textAnchor="middle"
            fontFamily={FONT}
            fontSize="15"
            fontWeight="700"
            fill="#fff"
          >
            {changeLabel}
          </text>
        </g>
        {[250, 500, 740].map((x, i) => (
          <circle
            key={x}
            className="nos-anim nos-band"
            style={delay(0.6 + i * 0.5)}
            cx={x}
            cy="270"
            r="6"
            fill="#fff"
            stroke="#14171f"
            strokeWidth="3"
          />
        ))}
        <g fontFamily={FONT} fontSize="14" fill="#2f5f59">
          <text x="40" y="332">
            {start}
          </text>
          <text x="960" y="332" textAnchor="end">
            {end}
          </text>
        </g>
      </svg>

      <svg
        viewBox="0 0 360 290"
        width="100%"
        className="block md:hidden"
        role="img"
        aria-label={alt}
      >
        {mobileBands.map((x, i) => (
          <rect
            key={x}
            className="nos-anim nos-band"
            style={delay(i * 0.5)}
            x={x}
            y="44"
            width="80"
            height="170"
            rx="10"
            fill={i % 2 === 0 ? "#fff3ec" : "#fff"}
          />
        ))}
        <g
          fontFamily={FONT}
          fontSize="11"
          fontWeight="600"
          fill="#6b7383"
          textAnchor="middle"
        >
          {mobileBands.map((x, i) => (
            <text key={x} x={x + 40} y="34">
              {periods[i]}
            </text>
          ))}
        </g>
        <line
          x1="14"
          y1="214"
          x2="346"
          y2="214"
          stroke="#14171f"
          strokeOpacity="0.2"
          strokeWidth="2"
        />
        <path
          className="nos-anim nos-draw"
          pathLength={100}
          d="M14 132 C 40 126 64 142 94 132 S 140 136 178 124 S 214 98 262 76 S 318 66 346 64"
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
          d="M14 142 C 40 150 64 134 94 144 S 140 140 178 152 S 214 174 262 188 S 318 194 346 196"
          fill="none"
          stroke="#0f6b61"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <line
          className="nos-anim nos-band"
          style={delay(2)}
          x1="178"
          y1="44"
          x2="178"
          y2="214"
          stroke="#14171f"
          strokeWidth="2"
          strokeDasharray="5 5"
        />
        <g className="nos-anim nos-pop" style={delay(2)}>
          <rect x="132" y="224" width="92" height="26" rx="13" fill="#14171f" />
          <text
            x="178"
            y="241"
            textAnchor="middle"
            fontFamily={FONT}
            fontSize="13"
            fontWeight="700"
            fill="#fff"
          >
            {changeLabel}
          </text>
        </g>
        <g fontFamily={FONT} fontSize="12" fill="#2f5f59">
          <text x="14" y="278">
            {start}
          </text>
          <text x="346" y="278" textAnchor="end">
            {end}
          </text>
        </g>
      </svg>
    </>
  );
}

const RHYTHM = [54, 60, 50, 56, 28, 22, 26, 30, 24, 28];

/** Seção 6: uma microdemonstração por pergunta. */
export function Micro({
  kind,
  alt,
  labels,
}: {
  kind: string;
  alt: string;
  labels?: readonly string[];
}) {
  return (
    <svg
      viewBox="0 0 240 90"
      width="100%"
      className="block"
      role="img"
      aria-label={alt}
    >
      {kind === "initiative" && (
        <>
          <line
            x1="10"
            y1="76"
            x2="230"
            y2="76"
            stroke="#14171f"
            strokeOpacity="0.15"
            strokeWidth="2"
          />
          <path
            className="nos-anim nos-draw"
            pathLength={100}
            d="M10 44 C 50 40 80 48 110 42 S 180 30 230 18"
            fill="none"
            stroke="#e8552f"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            className="nos-anim nos-draw"
            style={delay(0.25)}
            pathLength={100}
            d="M10 50 C 50 54 80 46 110 52 S 180 62 230 70"
            fill="none"
            stroke="#0f6b61"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </>
      )}
      {kind === "rhythm" && (
        <>
          <line
            x1="10"
            y1="80"
            x2="230"
            y2="80"
            stroke="#14171f"
            strokeOpacity="0.15"
            strokeWidth="2"
          />
          {RHYTHM.map((h, i) => (
            <rect
              key={i}
              className="nos-anim nos-grow"
              style={delay(i * 0.1)}
              x={14 + i * 20}
              y={80 - h}
              width="14"
              height={h}
              rx="3"
              fill="#0f6b61"
              fillOpacity={i < 4 ? 1 : 0.55}
            />
          ))}
        </>
      )}
      {kind === "start" && (
        <>
          <line
            x1="10"
            y1="76"
            x2="230"
            y2="76"
            stroke="#14171f"
            strokeOpacity="0.15"
            strokeWidth="2"
          />
          <path
            className="nos-anim nos-draw"
            pathLength={100}
            d="M10 30 L 100 32 C 112 32 116 52 128 54 L 230 56"
            fill="none"
            stroke="#e8552f"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line
            className="nos-anim nos-band"
            style={delay(1.5)}
            x1="116"
            y1="10"
            x2="116"
            y2="76"
            stroke="#14171f"
            strokeWidth="2"
            strokeDasharray="4 4"
          />
          <circle
            className="nos-anim nos-pop"
            style={delay(1.5)}
            cx="116"
            cy="46"
            r="6"
            fill="#fff"
            stroke="#14171f"
            strokeWidth="3"
          />
        </>
      )}
      {kind === "phase" && (
        <>
          <line
            x1="8"
            y1="70"
            x2="112"
            y2="70"
            stroke="#14171f"
            strokeOpacity="0.15"
            strokeWidth="2"
          />
          <line
            x1="128"
            y1="70"
            x2="232"
            y2="70"
            stroke="#14171f"
            strokeOpacity="0.15"
            strokeWidth="2"
          />
          <path
            className="nos-anim nos-draw"
            pathLength={100}
            d="M8 36 L 38 36 L 52 58 L 66 58 L 80 36 L 112 36"
            fill="none"
            stroke="#0f6b61"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            className="nos-anim nos-draw"
            style={delay(0.3)}
            pathLength={100}
            d="M128 36 L 158 36 L 172 58 L 232 58"
            fill="none"
            stroke="#e8552f"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <g
            fontFamily={FONT}
            fontSize="11"
            fontWeight="600"
            fill="#4b5363"
            textAnchor="middle"
          >
            <text x="60" y="86">
              {labels?.[0]}
            </text>
            <text x="180" y="86">
              {labels?.[1]}
            </text>
          </g>
        </>
      )}
      {kind === "constant" &&
        [24, 46, 68].map((y, i) => (
          <path
            key={y}
            className="nos-anim nos-draw"
            style={delay(i * 0.2)}
            pathLength={100}
            d={`M10 ${y} L 230 ${y}`}
            fill="none"
            stroke="#0f6b61"
            strokeWidth="4"
            strokeLinecap="round"
          />
        ))}
    </svg>
  );
}
