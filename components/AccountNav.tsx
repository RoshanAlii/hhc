"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "@/components/Icon";

export const ACCOUNT_LINKS = [
  { href: "/account", label: "Overview", icon: "heart" },
  { href: "/account/bookings", label: "My bookings", icon: "calendar" },
  { href: "/account/results", label: "Results & reports", icon: "lab" },
  { href: "/account/care", label: "Care & packages", icon: "nursing" },
  { href: "/account/billing", label: "Payments & invoices", icon: "doc" },
  { href: "/account/family", label: "Family profiles", icon: "user" },
  { href: "/account/addresses", label: "Addresses", icon: "delivery" },
  { href: "/account/profile", label: "Profile & preferences", icon: "shield" },
];

export default function AccountNav({ mobile = false }: { mobile?: boolean }) {
  const pathname = usePathname();
  const links = mobile ? ACCOUNT_LINKS.slice(0, 4) : ACCOUNT_LINKS;
  return (
    <nav className={mobile ? "portal-mobile-nav" : "snav portal-snav"} aria-label="Account navigation">
      {links.map((link) => {
        const active = link.href === "/account" ? pathname === link.href : pathname.startsWith(link.href);
        return <Link key={link.href} href={link.href} className={active ? "on" : undefined}><Icon name={link.icon} size={17} /><span>{link.label}</span></Link>;
      })}
      {mobile && <Link href="/account/profile" className={pathname.startsWith("/account/profile") ? "on" : undefined}><Icon name="menu" size={17} /><span>More</span></Link>}
    </nav>
  );
}
