"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Logo from "./Logo";
import Icon from "./Icon";
import { useCart } from "@/lib/cart";
import { COMPANY, PROMOS } from "@/lib/data";

const NAV = [
  { href: "/", label: "Home Care" },
  { href: "/services", label: "All Services" },
  { href: "/packages", label: "Packages" },
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
      <div className="promo" aria-label="Offers">
        <div className="track">
          {[...PROMOS, ...PROMOS].map((p, i) => (
            <span key={i}>{p}</span>
          ))}
        </div>
      </div>

      <div className="wrap">
        <div className="util">
          <span className="lft">
            <a href={COMPANY.phoneHref}>{COMPANY.phoneLabel}</a> · 8:30 AM – 6:30 PM daily
          </span>
          <button className="sel" type="button">Dubai ▾</button>
          <button className="sel" type="button">English ▾</button>
        </div>
      </div>

      <nav className="main">
        <div className="wrap">
          <div className="navrow">
            <Link className="hs-logo" href="/" aria-label="HealthServe — Home Healthcare">
              <Logo width={186} />
            </Link>
            <div className="links">
              {NAV.map((n) => (
                <Link key={n.href} href={n.href} aria-current={isActive(n.href) ? "page" : undefined}>
                  {n.label}
                </Link>
              ))}
            </div>
            <div className="navact">
              <a className="btn btn-quiet btn-sm" href={COMPANY.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a>
              <Link className="btn btn-primary btn-sm" href="/services">Book Now</Link>
              <Link className="iconbtn" href="/cart" aria-label={`Cart, ${count} items`}>
                <Icon name="cart" size={17} />
                {count > 0 && <span className="cnt">{count}</span>}
              </Link>
              <Link className="iconbtn" href="/login" aria-label="Log in / Register">
                <Icon name="user" size={16} />
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
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} onClick={() => setOpen(false)}>
                {n.label}
              </Link>
            ))}
            <Link href="/about" onClick={() => setOpen(false)}>About</Link>
            <Link href="/contact" onClick={() => setOpen(false)}>Contact</Link>
          </div>
        </div>
      </nav>
    </>
  );
}
