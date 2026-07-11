"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { formatAED, formatSlot, VAT_RATE } from "@/lib/data";

const PROMO_CODES: Record<string, number> = { WELCOME10: 0.1, HEALTH15: 0.15 };

export default function CartView() {
  const { items, subtotal, removeItem, setQty, ready } = useCart();
  const [code, setCode] = useState("");
  const [applied, setApplied] = useState<{ code: string; rate: number } | null>(null);
  const [error, setError] = useState("");

  function applyPromo() {
    const key = code.trim().toUpperCase();
    if (PROMO_CODES[key]) {
      setApplied({ code: key, rate: PROMO_CODES[key] });
      setError("");
    } else {
      setApplied(null);
      setError("That code isn't valid.");
    }
  }

  if (!ready) {
    return <div className="wrap" style={{ paddingBlock: 60 }}><p className="muted">Loading your cart…</p></div>;
  }

  if (items.length === 0) {
    return (
      <div className="wrap">
        <div className="empty">
          <h1 style={{ fontSize: 26, fontWeight: "var(--fw-extra)", marginBottom: 8 }}>Your cart is empty</h1>
          <p style={{ marginBottom: 20 }}>Browse our services and add a visit to get started.</p>
          <Link className="btn btn-primary" href="/services">Explore services</Link>
        </div>
      </div>
    );
  }

  const discount = applied ? Math.round(subtotal * applied.rate) : 0;
  const taxable = subtotal - discount;
  const vat = Math.round(taxable * VAT_RATE);
  const total = taxable + vat;

  return (
    <div className="wrap" style={{ paddingBlock: 40 }}>
      <h1 style={{ fontSize: 30, fontWeight: "var(--fw-extra)" }}>Your cart</h1>
      <p className="muted" style={{ fontSize: 14, margin: "4px 0 20px" }}>
        {items.length} {items.length === 1 ? "item" : "items"}
      </p>

      <div className="two">
        <div>
          {items.map((it) => (
            <div className="li" key={it.key}>
              <div className="imgph th" />
              <div className="m">
                <div className="t">{it.name}</div>
                <div className="sub">{[it.meta, it.kind === "service" ? formatSlot(it.date, it.time) : null].filter(Boolean).join(" · ")}</div>
                {it.kind === "service" && it.slug !== "doctor-visit" ? (
                  <div className="qty">
                    <button onClick={() => setQty(it.key, it.qty - 1)} aria-label="Decrease">−</button>
                    <b>{it.qty}</b>
                    <button onClick={() => setQty(it.key, it.qty + 1)} aria-label="Increase">+</button>
                  </div>
                ) : (
                  <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
                    <button className="chip" style={{ padding: "4px 12px" }} onClick={() => removeItem(it.key)} type="button">Remove</button>
                  </div>
                )}
              </div>
              <b>{formatAED(it.price * it.qty)}</b>
            </div>
          ))}
          <Link className="btn btn-quiet btn-sm" style={{ marginTop: 16 }} href="/services">← Continue browsing</Link>
        </div>

        <aside className="aside">
          <div className="lbl">Summary</div>
          <div className="srow"><span>Subtotal</span><span>{formatAED(subtotal)}</span></div>
          {applied && (
            <div className="srow"><span>Promo · {applied.code}</span><span style={{ color: "var(--green-700)" }}>−{formatAED(discount)}</span></div>
          )}
          <div className="srow"><span>VAT (5%)</span><span>{formatAED(vat)}</span></div>
          <div className={`field${error ? " invalid" : ""}`} style={{ marginBlock: 10 }}>
            <label>Promo code</label>
            <div style={{ display: "flex", gap: 8 }}>
              <input placeholder="Enter code" value={code} onChange={(e) => setCode(e.target.value)} />
              <button className="btn btn-quiet btn-sm" onClick={applyPromo} type="button">Apply</button>
            </div>
            {error && <span className="err">{error}</span>}
            {applied && !error && <span className="err" style={{ color: "var(--green-700)" }}>Code applied — {Math.round(applied.rate * 100)}% off.</span>}
          </div>
          <div className="srow total"><span>Total</span><b>{formatAED(total)}</b></div>
          <Link className="btn btn-primary btn-full btn-lg" style={{ marginTop: 12 }} href="/checkout">Checkout</Link>
          <p className="muted" style={{ textAlign: "center", fontSize: 12, marginTop: 10 }}>Card · Tabby · Pay on visit</p>
        </aside>
      </div>
    </div>
  );
}
