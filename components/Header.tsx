"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Logo from "./Logo";
import Icon from "./Icon";
import { useCart } from "@/lib/cart";
import { COMPANY, PROMOS } from "@/lib/data";

type NavItem = { label: string; href?: string; parked?: string };

const NAV: NavItem[] = [
  { href: "/", label: "Home Care" },
  { href: "/dispensary", label: "The Dispensary" },
  { href: "/services", label: "All Services" },
  { href: "/your-health", label: "Your Health" },
  { href: "/journal", label: "Journal" },
];

export default function Header() {
  const pathname = usePathname();
  const { count } = useCart();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      {/* Top utility bar — single light row */}
      <div className="topbar">
        <div className="wrap topbar-in">
          <span className="tb-left">
            <a className="ph" href={COMPANY.phoneHref}>{COMPANY.phoneLabel}</a> · 8:30 AM – 6:30 PM daily
          </span>
          <div className="tb-promo">
            <div className="track">
              {[...PROMOS, ...PROMOS].map((p, i) => (
                <span key={i}>{p}<span className="b">&nbsp;&nbsp;•</span></span>
              ))}
            </div>
          </div>
          <span className="tb-right">Dubai, UAE <span className="sep">·</span> English</span>
        </div>
      </div>

      <nav className="main">
        <div className="wrap">
          <div className="navrow">
            <Link className="hs-logo" href="/" aria-label="HealthServe — Home Healthcare">
              <Logo width={150} />
            </Link>
            <div className="links">
              {NAV.map((n) =>
                n.href ? (
                  <Link key={n.label} href={n.href} aria-current={isActive(n.href) ? "page" : undefined}>
                    {n.label}
                  </Link>
                ) : (
                  <a key={n.label} href="#" className="parked" title={n.parked} onClick={(e) => e.preventDefault()}>
                    {n.label}
                  </a>
                ),
              )}
            </div>
            <div className="navact">
              {count > 0 && (
                <Link className="navcart" href="/cart" aria-label={`Cart, ${count} items`}>
                  <Icon name="cart" size={16} />
                  <span className="cnt">{count}</span>
                </Link>
              )}
              <Link className="btn-booknow" href="/services">Book Now</Link>
              <Link className="btn-login" href="/login">
                <Icon name="user" size={16} /> Log in
              </Link>
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
            {NAV.map((n) =>
              n.href ? (
                <Link key={n.label} href={n.href} onClick={() => setOpen(false)}>
                  {n.label}
                </Link>
              ) : (
                <a key={n.label} href="#" className="parked" title={n.parked} onClick={(e) => e.preventDefault()}>
                  {n.label} <span className="muted" style={{ fontSize: 12 }}>· soon</span>
                </a>
              ),
            )}
            <a href={COMPANY.whatsapp} target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>WhatsApp us</a>
          </div>
        </div>
      </nav>
    </>
  );
}
