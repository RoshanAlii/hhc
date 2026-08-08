import React from "react";

const GENERATED_IMAGES = {
  clinical: "/img/generated/home-clinical-care.jpg",
  physiotherapy: "/img/generated/home-physiotherapy.jpg",
  diagnostics: "/img/generated/home-diagnostics.jpg",
  family: "/img/generated/home-family-care.jpg",
} as const;

function imageFor(caption = "") {
  const value = caption.toLowerCase();
  if (/physio|exercise|rehabilitation|mobility|injury|pain/.test(value)) return GENERATED_IMAGES.physiotherapy;
  if (/newborn|baby|child|elderly|caregiver|nursing|nurse assisting|family/.test(value)) return GENERATED_IMAGES.family;
  if (/blood|iv |infusion|oxygen|vitamin|vaccin|dna|peptide|wellness|laboratory|health panel/.test(value)) return GENERATED_IMAGES.diagnostics;
  return GENERATED_IMAGES.clinical;
}

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
    <div className={`ph-shape ph-photo ${className}`} data-tone={tone} style={style}>
      <img src={imageFor(caption)} alt={caption || "HealthServe home healthcare professional"} loading="lazy" />
    </div>
  );
}
