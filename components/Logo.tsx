import React from "react";

// Official HealthServe logo recreation (SVG). Swap with brand PNG in production.
export default function Logo({ width = 196, tagline = true }: { width?: number; tagline?: boolean }) {
  const height = (width / 300) * 84;
  return (
    <svg width={width} height={height} viewBox="0 0 300 84" role="img" aria-label="HealthServe — Home Healthcare">
      <rect x="57" y="10" width="10" height="18" fill="#D97F34" />
      <path d="M4 40 L42 6 L80 40" fill="none" stroke="#D97F34" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 40 h56 v40 h-56 z" fill="#FFFFFF" stroke="#CCCCCC" strokeWidth="2" />
      <path d="M20 70 q22 14 44 0 l0 7 q-22 10 -44 0 z" fill="#73A060" />
      <path d="M42 68 C30 58 26 50 31 44.5 c4-4.5 10-3 11 1 c1-4 7-5.5 11-1 c5 5.5 1 13.5 -11 23.5 z" fill="#D8232C" />
      {tagline && (
        <text x="298" y="14" textAnchor="end" fontFamily="Lato,sans-serif" fontStyle="italic" fontWeight="700" fontSize="12" fill="#73A060" letterSpacing="1">
          HEALING LIVES
        </text>
      )}
      <text x="92" y="50" fontFamily="Lato,sans-serif" fontWeight="900" fontSize="31" fill="#575757" letterSpacing=".5">
        HEALTH
        <tspan fontWeight="700">Serve</tspan>
      </text>
      <text x="94" y="76" fontFamily="'Segoe Script','Brush Script MT',cursive" fontSize="20" fontStyle="italic" fill="#6E6E6E">
        Home Healthcare
      </text>
    </svg>
  );
}
