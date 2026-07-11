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
