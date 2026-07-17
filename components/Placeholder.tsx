import React from "react";

// Solid-shape image placeholder that matches the brand design's image slots:
// a soft, tinted rounded box with an image icon, a caption and a "browse files"
// hint. Used everywhere a photo will eventually go.
export default function Placeholder({
  caption,
  tone = "orange",
  className = "",
  style,
}: {
  caption?: string;
  tone?: "orange" | "green" | "red" | "neutral";
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div className={`ph-shape ${className}`} data-tone={tone} style={style}>
      <svg className="ph-ic" width="26" height="26" viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <circle cx="9" cy="10" r="2" />
        <path d="M4 18l5-4 4 3 3-3 4 4" />
      </svg>
      {caption && <span className="ph-cap">{caption}</span>}
      <span className="ph-sub">or browse files</span>
    </div>
  );
}
