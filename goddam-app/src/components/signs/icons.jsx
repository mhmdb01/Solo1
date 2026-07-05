// Pictogram primitives. Each renders a <g> meant to sit inside a frame's 100x100 viewBox.
// Shared building blocks keep 45 signs buyable from ~25 vector primitives instead of 45
// hand-drawn one-offs; mirroring covers left/right variants of the same shape.

const INK = 'var(--color-ink)'
const STOP = 'var(--color-stop)'

function Mirror({ mirror, children }) {
  return <g transform={mirror ? 'translate(100,0) scale(-1,1)' : undefined}>{children}</g>
}

export function BentArrow({ mirror = false }) {
  return (
    <Mirror mirror={mirror}>
      <path
        d="M28 78 C28 45, 55 30, 78 30"
        fill="none"
        stroke={INK}
        strokeWidth="7"
        strokeLinecap="round"
      />
      <polygon points="78,20 90,30 78,40" fill={INK} />
    </Mirror>
  )
}

export function DoubleBendArrow({ mirror = false }) {
  return (
    <Mirror mirror={mirror}>
      <path
        d="M24 78 C24 55, 45 55, 45 40 C45 25, 62 25, 70 22"
        fill="none"
        stroke={INK}
        strokeWidth="6.5"
        strokeLinecap="round"
      />
      <polygon points="70,13 82,22 69,29" fill={INK} />
    </Mirror>
  )
}

export function SlopeProfile({ direction = 'down', percent = '12%' }) {
  const flipped = direction === 'up'
  return (
    <g transform={flipped ? 'translate(100,0) scale(-1,1)' : undefined}>
      <polygon points="15,78 85,78 85,66 30,30" fill="none" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
      <text
        x={flipped ? 100 - 55 : 55}
        y="68"
        fontSize="16"
        fontFamily="var(--font-body)"
        fill={INK}
        textAnchor="middle"
        transform={flipped ? 'scale(-1,1)' : undefined}
      >
        {percent}
      </text>
    </g>
  )
}

export function ConvergingLines({ side = 'both' }) {
  const leftOffset = side === 'right' ? 0 : 10
  const rightOffset = side === 'left' ? 0 : 10
  return (
    <g stroke={INK} strokeWidth="5" strokeLinecap="round">
      <line x1={20 + leftOffset} y1="20" x2="42" y2="80" />
      <line x1={80 - rightOffset} y1="20" x2="58" y2="80" />
    </g>
  )
}

export function SkiddingCar() {
  return (
    <g>
      <rect x="34" y="52" width="32" height="16" rx="4" fill={INK} />
      <rect x="42" y="42" width="16" height="14" rx="3" fill={INK} />
      <path d="M20 78 C30 72, 40 82, 50 78" fill="none" stroke={INK} strokeWidth="3.5" />
      <path d="M50 82 C60 76, 70 86, 80 82" fill="none" stroke={INK} strokeWidth="3.5" />
    </g>
  )
}

export function BumpProfile() {
  return (
    <path
      d="M15 75 Q30 75 38 55 Q46 35 54 55 Q62 75 85 75"
      fill="none"
      stroke={INK}
      strokeWidth="6"
      strokeLinecap="round"
    />
  )
}

export function GravelSpray() {
  return (
    <g>
      <rect x="30" y="55" width="30" height="15" rx="4" fill={INK} />
      <rect x="37" y="45" width="15" height="13" rx="3" fill={INK} />
      {[[70, 40], [78, 52], [72, 64], [82, 46]].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="3" fill={INK} />
      ))}
    </g>
  )
}

export function RippleRoad() {
  return (
    <g stroke={INK} strokeWidth="4.5" fill="none" strokeLinecap="round">
      <path d="M15 40 Q25 32 35 40 Q45 48 55 40 Q65 32 75 40 Q85 48 90 40" />
      <path d="M15 60 Q25 52 35 60 Q45 68 55 60 Q65 52 75 60 Q85 68 90 60" />
    </g>
  )
}

export function RailBarrier() {
  return (
    <g stroke={INK} strokeWidth="5" strokeLinecap="round">
      <line x1="15" y1="70" x2="85" y2="70" />
      <line x1="15" y1="70" x2="15" y2="40" />
      <line x1="85" y1="70" x2="85" y2="40" />
      <line x1="20" y1="35" x2="55" y2="50" strokeWidth="6" />
      <line x1="45" y1="35" x2="80" y2="50" strokeWidth="6" />
    </g>
  )
}

export function RailNoBarrier() {
  return (
    <g>
      <line x1="15" y1="65" x2="85" y2="65" stroke={INK} strokeWidth="5" />
      <circle cx="42" cy="45" r="16" fill="none" stroke={INK} strokeWidth="5" />
      <line x1="42" y1="45" x2="42" y2="30" stroke={INK} strokeWidth="5" />
      <line x1="42" y1="45" x2="53" y2="52" stroke={INK} strokeWidth="5" />
    </g>
  )
}

export function PedestrianFigure({ scale = 1, x = 50 }) {
  return (
    <g transform={`translate(${x - 50 * scale} 15) scale(${scale})`}>
      <circle cx="50" cy="25" r="8" fill={INK} />
      <path d="M50 35 L50 62 M50 45 L34 55 M50 45 L66 40 M50 62 L38 85 M50 62 L62 85" stroke={INK} strokeWidth="6" strokeLinecap="round" fill="none" />
    </g>
  )
}

export function ChildrenFigures() {
  return (
    <g>
      <PedestrianFigure scale={0.75} x={35} />
      <PedestrianFigure scale={0.55} x={68} />
    </g>
  )
}

export function WorkerFigure() {
  return (
    <g>
      <circle cx="38" cy="28" r="7" fill={INK} />
      <path d="M38 36 L38 60 M38 44 L58 30 M38 60 L28 85 M38 60 L48 85" stroke={INK} strokeWidth="6" strokeLinecap="round" fill="none" />
      <line x1="58" y1="30" x2="78" y2="65" stroke={INK} strokeWidth="4" />
    </g>
  )
}

export function BicycleShape() {
  return (
    <g fill="none" stroke={INK} strokeWidth="4.5">
      <circle cx="32" cy="65" r="14" />
      <circle cx="68" cy="65" r="14" />
      <path d="M32 65 L50 40 L68 65 M42 52 L60 52 M50 40 L46 30 L58 30" strokeLinecap="round" />
    </g>
  )
}

export function AnimalBlob({ variant = 'domestic' }) {
  const horns =
    variant === 'domestic' ? (
      <path d="M38 32 L32 22 M56 32 L62 22" stroke={INK} strokeWidth="4" strokeLinecap="round" />
    ) : (
      <path d="M38 30 L28 14 M38 30 L34 16 M58 30 L68 14 M58 30 L62 16" stroke={INK} strokeWidth="3" strokeLinecap="round" />
    )
  return (
    <g fill={INK}>
      {horns}
      <ellipse cx="48" cy="55" rx="26" ry="16" />
      <circle cx="30" cy="38" r="10" />
      <line x1="26" y1="70" x2="24" y2="85" stroke={INK} strokeWidth="5" />
      <line x1="70" y1="70" x2="72" y2="85" stroke={INK} strokeWidth="5" />
    </g>
  )
}

export function TrafficLightShape() {
  return (
    <g>
      <rect x="38" y="18" width="24" height="60" rx="6" fill={INK} />
      <circle cx="50" cy="32" r="6" fill={STOP} />
      <circle cx="50" cy="48" r="6" fill="var(--color-accent)" />
      <circle cx="50" cy="64" r="6" fill="var(--color-go)" />
    </g>
  )
}

export function RockfallShape() {
  return (
    <g fill={INK}>
      <polygon points="55,20 70,20 78,32 60,38" />
      <polygon points="20,68 45,58 55,72 25,82" />
      <line x1="60" y1="24" x2="42" y2="55" stroke={INK} strokeWidth="3" strokeDasharray="4 4" />
    </g>
  )
}

export function WindsockShape() {
  return (
    <g fill="none" stroke={INK} strokeWidth="5" strokeLinecap="round">
      <line x1="30" y1="20" x2="30" y2="85" />
      <path d="M30 30 L78 22 L66 38 L78 46 L30 42 Z" fill={INK} stroke="none" />
    </g>
  )
}

export function TwoWayArrows() {
  return (
    <g stroke={INK} strokeWidth="6" strokeLinecap="round">
      <line x1="38" y1="82" x2="38" y2="22" />
      <polygon points="38,14 47,28 29,28" fill={INK} />
      <line x1="62" y1="18" x2="62" y2="78" />
      <polygon points="62,86 71,72 53,72" fill={INK} />
    </g>
  )
}

export function Exclamation() {
  return (
    <g fill={INK}>
      <rect x="44" y="18" width="12" height="42" rx="5" />
      <circle cx="50" cy="76" r="7" />
    </g>
  )
}

export function AirplaneShape() {
  return (
    <g fill={INK}>
      <polygon points="50,15 56,55 85,68 85,74 56,64 54,80 64,88 64,92 50,88 36,92 36,88 46,80 44,64 15,74 15,68 44,55" />
    </g>
  )
}

export function SnowflakeShape() {
  return (
    <g stroke={INK} strokeWidth="4" strokeLinecap="round">
      {[0, 60, 120].map((deg) => (
        <line
          key={deg}
          x1="50"
          y1="20"
          x2="50"
          y2="80"
          transform={`rotate(${deg} 50 50)`}
        />
      ))}
    </g>
  )
}

export function CrossPriorityArrows() {
  return (
    <g stroke={INK} strokeWidth="5" strokeLinecap="round">
      <line x1="50" y1="15" x2="50" y2="85" />
      <line x1="15" y1="50" x2="85" y2="50" />
      <polygon points="85,50 74,44 74,56" fill={INK} />
      <polygon points="50,85 44,74 56,74" fill={INK} />
      <polygon points="15,50 26,44 26,56" fill={INK} />
      <polygon points="50,15 44,26 56,26" fill={INK} />
    </g>
  )
}

// Plain crossroad junction diagram (no arrows) — the advance-warning pictogram
// for "intersection with a non-priority road ahead". Kept visually distinct
// from CrossPriorityArrows so the two signs are never indistinguishable in a
// name-to-sign quiz question.
export function IntersectionLines() {
  return (
    <g stroke={INK} strokeWidth="6" strokeLinecap="round">
      <line x1="50" y1="18" x2="50" y2="82" />
      <line x1="20" y1="50" x2="80" y2="50" />
    </g>
  )
}

export function OppositePriorityArrows() {
  return (
    <g strokeLinecap="round">
      <line x1="38" y1="82" x2="38" y2="24" stroke={INK} strokeWidth="7" />
      <polygon points="38,14 48,28 28,28" fill={INK} />
      <line x1="62" y1="18" x2="62" y2="76" stroke={STOP} strokeWidth="7" />
      <polygon points="62,86 72,72 52,72" fill={STOP} />
    </g>
  )
}

export function RoundaboutArrows() {
  return (
    <g fill="none" stroke={INK} strokeWidth="6" strokeLinecap="round">
      <path d="M50 20 A30 30 0 0 1 78 42" />
      <polygon points="82,44 68,42 76,30" fill={INK} stroke="none" />
      <path d="M78 60 A30 30 0 0 1 50 82" />
      <polygon points="46,86 55,74 63,88" fill={INK} stroke="none" />
      <path d="M22 42 A30 30 0 0 1 22 60" />
      <polygon points="18,32 26,42 12,44" fill={INK} stroke="none" />
    </g>
  )
}

export function MergeArrow({ mirror = false }) {
  return (
    <Mirror mirror={mirror}>
      <line x1="60" y1="15" x2="60" y2="85" stroke={INK} strokeWidth="7" />
      <path d="M25 78 C25 55, 45 55, 58 45" fill="none" stroke={INK} strokeWidth="6" strokeLinecap="round" />
      <polygon points="63,38 68,52 52,50" fill={INK} />
    </Mirror>
  )
}

export function StopText() {
  return (
    <text x="50" y="62" fontSize="26" fontWeight="700" fontFamily="var(--font-heading)" fill="#fff" textAnchor="middle">
      STOP
    </text>
  )
}

export function MiniOctagon() {
  return (
    <g transform="translate(28,28) scale(0.42)">
      <polygon
        points="32,4 68,4 96,32 96,68 68,96 32,96 4,68 4,32"
        fill={STOP}
        stroke="#fff"
        strokeWidth="6"
      />
      <text x="50" y="64" fontSize="30" fontWeight="700" fontFamily="var(--font-heading)" fill="#fff" textAnchor="middle">
        STOP
      </text>
    </g>
  )
}

export function MiniInvertedTriangle() {
  return (
    <g transform="translate(28,28) scale(0.42)">
      <polygon points="5,10 95,10 50,94" fill="#fff" stroke={STOP} strokeWidth="10" strokeLinejoin="round" />
    </g>
  )
}

export function PalmStopShape() {
  return (
    <g fill={INK}>
      <rect x="40" y="18" width="20" height="42" rx="8" />
      <rect x="26" y="55" width="48" height="24" rx="10" />
    </g>
  )
}
