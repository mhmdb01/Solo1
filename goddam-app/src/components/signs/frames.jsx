// Frame primitives: the colored outer shapes that every road sign pictogram sits inside.
// Each frame renders a 100x100 viewBox and centers its children (the pictogram) inside.

export function TriangleFrame({ children }) {
  return (
    <svg viewBox="0 0 100 100" className="sign-svg">
      <polygon points="50,6 95,90 5,90" fill="#fff" stroke="var(--color-stop)" strokeWidth="7" strokeLinejoin="round" />
      <g>{children}</g>
    </svg>
  )
}

export function InvertedTriangleFrame({ children }) {
  return (
    <svg viewBox="0 0 100 100" className="sign-svg">
      <polygon points="5,10 95,10 50,94" fill="#fff" stroke="var(--color-stop)" strokeWidth="7" strokeLinejoin="round" />
      <g>{children}</g>
    </svg>
  )
}

export function DiamondFrame({ children, banned = false }) {
  return (
    <svg viewBox="0 0 100 100" className="sign-svg">
      <polygon points="50,4 96,50 50,96 4,50" fill="#fff" />
      <polygon points="50,10 90,50 50,90 10,50" fill="var(--color-accent)" />
      {banned && (
        <line x1="18" y1="18" x2="82" y2="82" stroke="var(--color-asphalt)" strokeWidth="8" />
      )}
      <g>{children}</g>
    </svg>
  )
}

export function OctagonFrame({ children }) {
  return (
    <svg viewBox="0 0 100 100" className="sign-svg">
      <polygon
        points="32,4 68,4 96,32 96,68 68,96 32,96 4,68 4,32"
        fill="var(--color-stop)"
        stroke="#fff"
        strokeWidth="4"
      />
      <g>{children}</g>
    </svg>
  )
}

export function CircleFrame({ children }) {
  return (
    <svg viewBox="0 0 100 100" className="sign-svg">
      <circle cx="50" cy="50" r="46" fill="#fff" stroke="var(--color-ink)" strokeWidth="6" />
      <g>{children}</g>
    </svg>
  )
}
