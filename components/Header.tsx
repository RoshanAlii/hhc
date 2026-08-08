"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import Icon from "./Icon";
import NavSearch from "./NavSearch";
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

const EMIRATES = ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Umm Al Quwain", "Ras Al Khaimah", "Fujairah"];

export default function Header() {
  const pathname = usePathname();
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  const [emirate, setEmirate] = useState("Dubai");
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    setEmirate(window.localStorage.getItem("healthserve-emirate") || "Dubai");
    setLanguage(window.localStorage.getItem("healthserve-language") || "en");
  }, []);

  function changeEmirate(value: string) {
    setEmirate(value);
    window.localStorage.setItem("healthserve-emirate", value);
  }

  function changeLanguage(value: string) {
    setLanguage(value);
    window.localStorage.setItem("healthserve-language", value);
    document.documentElement.lang = value;
  }

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      {/* Top utility bar - single light row */}
      <div className="topbar">
        <div className="wrap topbar-in">
          <span className="tb-left">
            <a className="ph" href={COMPANY.phoneHref}>{COMPANY.phoneLabel}</a><span className="tb-hours"> · 8:30 AM – 6:30 PM daily</span>
          </span>
          <div className="tb-promo">
            <div className="track">
              {[...PROMOS, ...PROMOS].map((p, i) => (
                <span key={i}>{p}<span className="b" aria-hidden="true" /></span>
              ))}
            </div>
          </div>
          <div className="tb-right">
            <label className="sr-only" htmlFor="emirate-select">Emirate</label>
            <select id="emirate-select" value={emirate} onChange={(event) => changeEmirate(event.target.value)}>
              {EMIRATES.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
            <span className="sep">·</span>
            <label className="sr-only" htmlFor="language-select">Language</label>
            <select id="language-select" value={language} onChange={(event) => changeLanguage(event.target.value)}>
              <option value="en">English</option>
              <option value="ar">العربية</option>
            </select>
          </div>
        </div>
      </div>

      <nav className="main">
        <div className="wrap">
          <div className="navrow">
            <Link className="hs-logo" href="/" aria-label="HealthServe - Home Healthcare">
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
              <NavSearch />
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
