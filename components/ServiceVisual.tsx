import Icon from "@/components/Icon";

export default function ServiceVisual({
  icon,
  eyebrow,
  title,
  tone = "forest",
  large = false,
}: {
  icon: string;
  eyebrow?: string;
  title: string;
  tone?: "forest" | "copper" | "ink" | "sage" | "plum";
  large?: boolean;
}) {
  return (
    <div className={`service-visual ${large ? "large" : ""}`} data-tone={tone} aria-hidden="true">
      <span className="service-visual-orbit" />
      <span className="service-visual-grid" />
      <span className="service-visual-icon"><Icon name={icon} size={large ? 34 : 27} /></span>
      <span className="service-visual-copy">
        {eyebrow && <small>{eyebrow}</small>}
        <b>{title}</b>
      </span>
    </div>
  );
}
