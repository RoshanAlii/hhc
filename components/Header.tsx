"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Logo from "./Logo";
import Icon from "./Icon";
import { useCart } from "@/lib/cart";
import { COMPANY } from "@/lib/data";

type NavItem = { label: string; href: string };

const NAV: NavItem[] = [
  { href: "/services", label: "Services" },
  { href: "/dispensary", label: "The Dispensary" },
  { href: "/packages", label: "Care plans" },
  { href: "/about", label: "Why HealthServe" },
  { href: "/journal", label: "Insights" },
];

export default function Header() {
  const pathname = usePathname();
  const { count } = useCart();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      {/* Quiet proof-and-contact utility bar. */}
      <div className="topbar">
        <div className="wrap topbar-in">
          <span className="tb-left">
            DHA-licensed home healthcare <span className="hours">· Dubai · Since {COMPANY.since}</span>
          </span>
          <span className="tb-right">
            <a href={COMPANY.phoneHref}>{COMPANY.phoneLabel}</a>
            <span className="sep">·</span>
            <span>{COMPANY.hours}</span>
            <span className="sep">·</span>
            <a href={COMPANY.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a>
          </span>
        </div>
      </div>

      <nav className="main">
        <div className="wrap">
          <div className="navrow">
            <Link className="hs-logo" href="/" aria-label="HealthServe — Home Healthcare">
              <Logo width={150} />
            </Link>
            <div className="links">
              {NAV.map((n) => (
                <Link key={n.label} href={n.href} aria-current={isActive(n.href) ? "page" : undefined}>
                  {n.label}
                </Link>
              ))}
            </div>
            <div className="navact">
              {count > 0 && (
                <Link className="navcart" href="/cart" aria-label={`Cart, ${count} items`}>
                  <Icon name="cart" size={16} />
                  <span className="cnt">{count}</span>
                </Link>
              )}
              <Link className="btn-booknow" href="/services">Find care <Icon name="arrow" size={15} /></Link>
              <button
                className="navtoggle"
                type="button"
                aria-label="Menu"
                aria-expanded={open}
                onClick={() => setOpen((o) => !o)}
              >
                <Icon name="menu" size={18} />
              </button>
            </div>
          </div>
          <div className={`mobilemenu${open ? " open" : ""}`}>
            {NAV.map((n) => (
              <Link key={n.label} href={n.href} onClick={() => setOpen(false)}>
                {n.label}
              </Link>
            ))}
            <a href={COMPANY.whatsapp} target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>WhatsApp us</a>
          </div>
        </div>
      </nav>
    </>
  );
}
