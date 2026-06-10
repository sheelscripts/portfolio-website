// Brand mark — an "S" rendered as two articulated linkages folded into the
// letterform. 2px steel stroke with a single --heat joint pivot.
// viewBox is square 32x32; pass size via className/w-h on the <svg>.

export function Monogram({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="S monogram"
      role="img"
    >
      <circle cx="16" cy="16" r="15" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
      <circle cx="8" cy="10" r="1.6" fill="var(--color-heat)" />
      <circle cx="24" cy="22" r="1.6" fill="var(--color-heat)" />
      <path
        d="M 8 10 L 14 16 L 8 22 L 18 22 L 24 22"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
      <path
        d="M 14 16 L 18 16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="square"
      />
    </svg>
  );
}
