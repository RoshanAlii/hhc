import React from "react";

const PATHS: Record<string, React.ReactNode> = {
  doctor: (
    <>
      <circle cx="12" cy="8" r="3.2" />
      <path d="M5 20a7 7 0 0 1 14 0" />
    </>
  ),
  physio: <path d="M4 17l5-5 4 4 7-7" />,
  nursing: <path d="M12 4v16M4 12h16" />,
  child: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
    </>
  ),
  elderly: <path d="M12 21s-7-4.5-7-10a7 7 0 0 1 14 0c0 5.5-7 10-7 10z" />,
  travel: <path d="M3 12h4l2-5 4 10 2-5h6" />,
  chronic: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a4 4 0 0 1 8 0v2" />
    </>
  ),
  wellness: <path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z" />,
  lab: <path d="M9 3h6v4l4 9a3 3 0 0 1-3 4H8a3 3 0 0 1-3-4l4-9z" />,
  cart: (
    <>
      <path d="M6 7h14l-1.5 10.5a2 2 0 0 1-2 1.5H9.5a2 2 0 0 1-2-1.5L6 7z" />
      <path d="M9 7a3 3 0 0 1 6 0" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="3.4" />
      <path d="M5 20a7 7 0 0 1 14 0" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4-4" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M8 3v4M16 3v4M3 10h18" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  check: <path d="M5 12l5 5L20 6" />,
  pill: (
    <>
      <rect x="2.5" y="9" width="19" height="6" rx="3" />
      <path d="M12 9v6" />
    </>
  ),
  delivery: (
    <>
      <rect x="1.5" y="6" width="13" height="10" rx="1.5" />
      <path d="M14.5 9h3.5l3 3v4h-6.5z" />
      <circle cx="6" cy="18.5" r="1.6" />
      <circle cx="17.5" cy="18.5" r="1.6" />
    </>
  ),
  shield: <path d="M12 3l7 3v5c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6z" />,
  doc: (
    <>
      <path d="M6 3h8l4 4v14H6z" />
      <path d="M14 3v4h4" />
      <path d="M9 13h6M9 16h6" />
    </>
  ),
  bell: (
    <>
      <path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2H4.5z" />
      <path d="M10 20a2 2 0 0 0 4 0" />
    </>
  ),
  heart: <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 5.5-7 10-7 10z" />,
  refresh: (
    <>
      <path d="M4 12a8 8 0 0 1 13.5-5.8L20 8" />
      <path d="M20 4v4h-4" />
      <path d="M20 12a8 8 0 0 1-13.5 5.8L4 16" />
      <path d="M4 20v-4h4" />
    </>
  ),
};

export default function Icon({
  name,
  size = 20,
  className = "svgi",
  style,
}: {
  name: string;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} style={style} aria-hidden="true">
      {PATHS[name] ?? PATHS.doctor}
    </svg>
  );
}
