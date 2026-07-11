"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/account", label: "Overview" },
  { href: "/account", label: "My bookings" },
  { href: "/account", label: "Orders" },
  { href: "/account", label: "Results & invoices" },
  { href: "/account", label: "Addresses" },
  { href: "/account/profile", label: "Profile" },
  { href: "/help", label: "Help" },
];

export default function AccountNav() {
  const pathname = usePathname();
  return (
    <div className="snav">
      {LINKS.map((l, i) => (
        <Link key={i} href={l.href} className={pathname === l.href && (i === 0 || l.label === "Profile") ? "on" : undefined}>
          {l.label}
        </Link>
      ))}
    </div>
  );
}
