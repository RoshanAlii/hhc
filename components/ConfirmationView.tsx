"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { loadOrder, type Order } from "@/lib/cart";
import { formatAED, formatSlot } from "@/lib/data";

export default function ConfirmationView() {
  const [order, setOrder] = useState<Order | null | undefined>(undefined);

  useEffect(() => {
    setOrder(loadOrder());
  }, []);

  if (order === undefined) {
    return <div className="wrap" style={{ paddingBlock: 60 }}><p className="muted">Loading…</p></div>;
  }

  if (!order) {
    return (
      <div className="wrap">
        <div className="empty">
          <h1 style={{ fontSize: 26, fontWeight: "var(--fw-extra)", marginBottom: 8 }}>No recent order</h1>
          <p style={{ marginBottom: 20 }}>Once you complete a booking, your confirmation will appear here.</p>
          <Link className="btn btn-primary" href="/services">Book a visit</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="confirm">
      <div className="checkic">
        <svg width="28" height="28" viewBox="0 0 24 24" style={{ stroke: "var(--green-600)", fill: "none", strokeWidth: 2.2, strokeLinecap: "round", strokeLinejoin: "round" }}>
          <path d="M5 12l5 5L20 6" />
        </svg>
      </div>
      <h1 style={{ fontSize: 30, fontWeight: "var(--fw-extra)" }}>You&rsquo;re booked.</h1>
      <p className="muted" style={{ marginTop: 8 }}>
        Confirmation sent on WhatsApp. Your clinician arrives on <b>{order.slot}</b> — we&rsquo;ll message when they&rsquo;re on the way.
      </p>

      <div className="receipt">
        <div className="srow"><span>Order</span><b>{order.id}</b></div>
        {order.items.map((it) => (
          <div className="srow" key={it.key}>
            <span>
              {it.name}{it.qty > 1 ? ` × ${it.qty}` : ""}
              {it.kind === "service" && (it.date || it.time) && (
                <><br /><small className="muted">{formatSlot(it.date, it.time)}</small></>
              )}
            </span>
            <span>{formatAED(it.price * it.qty)}</span>
          </div>
        ))}
        <div className="srow"><span>VAT (5%)</span><span>{formatAED(order.vat)}</span></div>
        <div className="srow"><span>Paid · {order.card ? `Card ${order.card}` : order.payment}</span><span>{order.card ? formatAED(order.total) : "—"}</span></div>
        <div className="srow total"><span>Total paid</span><b>{formatAED(order.total)}</b></div>
      </div>

      <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
        <Link className="btn btn-primary" href="/account">Track booking</Link>
        <Link className="btn btn-outline" href="/account">Add to calendar</Link>
        <Link className="btn btn-quiet" href="/account">Download invoice</Link>
      </div>

      <div className="band" style={{ marginTop: 32, textAlign: "start" }}>
        <div style={{ flex: 1, minWidth: 200 }}>
          <b style={{ color: "var(--text-strong)" }}>Need regular nursing?</b>
          <p className="muted" style={{ fontSize: 13, marginTop: 4 }}>The 10-hour Nursing Block saves ≈ 11% per hour.</p>
        </div>
        <Link className="btn btn-outline btn-sm" href="/packages">See packages</Link>
      </div>
    </div>
  );
}
