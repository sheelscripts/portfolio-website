// Hand-authored SVG of a 6-DOF robotic arm in industrial silhouette.
// Sized to match the (now more compact) R3F scene proportions.

export function RoboticArmFallback({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      {/* base plate */}
      <ellipse cx="100" cy="266" rx="52" ry="7" stroke="currentColor" strokeWidth="1.2" />
      <rect x="48" y="256" width="104" height="9" stroke="currentColor" strokeWidth="1.2" />
      {[34, 62, 90, 118, 146, 174].map((x) => (
        <circle key={x} cx={x} cy="261" r="1.2" fill="currentColor" opacity="0.6" />
      ))}
      {/* decorative bracket */}
      <rect x="154" y="244" width="12" height="14" stroke="currentColor" strokeWidth="1" />
      <circle cx="160" cy="251" r="1.4" fill="var(--color-heat)" />

      {/* shoulder yaw motor */}
      <rect x="90" y="236" width="20" height="18" stroke="currentColor" strokeWidth="1.2" />
      <rect x="93" y="239" width="14" height="12" fill="var(--color-heat)" opacity="0.85" />

      {/* shoulder pitch joint */}
      <circle cx="100" cy="222" r="7.5" stroke="currentColor" strokeWidth="1.2" fill="var(--color-bg)" />
      <circle cx="100" cy="222" r="3.4" fill="var(--color-heat)" />

      {/* upper arm (tilted) */}
      <g style={{ transformOrigin: "100px 222px", transform: "rotate(-18deg)" }}>
        <rect x="91" y="158" width="18" height="64" stroke="currentColor" strokeWidth="1.5" />
        <line x1="98" y1="162" x2="98" y2="218" stroke="var(--color-heat)" strokeWidth="2" />
        {/* elbow joint */}
        <circle cx="100" cy="158" r="5.5" stroke="currentColor" strokeWidth="1.2" fill="var(--color-bg)" />
        <circle cx="100" cy="158" r="2.6" fill="var(--color-heat)" />
        {/* forearm */}
        <g style={{ transformOrigin: "100px 158px", transform: "rotate(40deg)" }}>
          <rect x="92" y="112" width="16" height="48" stroke="currentColor" strokeWidth="1.5" />
          <line x1="96" y1="116" x2="96" y2="156" stroke="var(--color-heat)" strokeWidth="2" />
          {/* wrist roll */}
          <rect x="93" y="104" width="14" height="12" stroke="currentColor" strokeWidth="1" />
          <rect x="95" y="106" width="10" height="8" fill="var(--color-heat)" opacity="0.85" />
          {/* wrist pitch */}
          <circle cx="100" cy="100" r="4.5" stroke="currentColor" strokeWidth="1.2" fill="var(--color-bg)" />
          {/* gripper base */}
          <rect x="89" y="86" width="22" height="12" stroke="currentColor" strokeWidth="1.2" />
          {/* fingers */}
          <rect x="86" y="68" width="5" height="20" stroke="currentColor" strokeWidth="1.2" />
          <rect x="109" y="68" width="5" height="20" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="88.5" cy="74" r="1.2" fill="var(--color-heat)" />
          <circle cx="111.5" cy="74" r="1.2" fill="var(--color-heat)" />
        </g>
      </g>

      <text x="100" y="280" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="currentColor" opacity="0.5" letterSpacing="2">
        DOF · 6
      </text>
    </svg>
  );
}
