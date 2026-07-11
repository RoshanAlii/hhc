"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart, saveOrder, type Order } from "@/lib/cart";
import { formatAED } from "@/lib/data";

const METHODS = [
  { id: "card", label: "Card · Visa / Mastercard" },
  { id: "tabby", label: "Tabby — 4 interest-free payments" },
  { id: "onvisit", label: "Pay on visit — cash or card at the door" },
];

export default function CheckoutView() {
  const router = useRouter();
  const { items, subtotal, vat, total, clear, ready } = useCart();
  const [method, setMethod] = useState("card");
  const [form, setForm] = useState({ name: "", mobile: "", address: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  if (ready && items.length === 0) {
    return (
      <div className="wrap">
        <div className="empty">
          <h1 style={{ fontSize: 26, fontWeight: "var(--fw-extra)", marginBottom: 8 }}>Nothing to check out</h1>
          <p style={{ marginBottom: 20 }}>Add a service to your booking first.</p>
          <Link className="btn btn-primary" href="/services">Explore services</Link>
        </div>
      </div>
    );
  }

  function set(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function validate() {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Please enter your name.";
    if (!/^[+\d][\d\s]{7,}$/.test(form.mobile.trim())) e.mobile = "Enter a valid mobile number.";
    if (!form.address.trim()) e.address = "Please enter your address.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function confirm() {
    if (!validate()) return;
    setSubmitting(true);
    const order: Order = {
      id: "HS-" + Math.floor(10000 + Math.random() * 90000),
      items,
      subtotal,
      vat,
      total,
      payment: METHODS.find((m) => m.id === method)!.label,
      card: method === "card" ? "····4291" : undefined,
      slot: "Today 6:00 PM",
      createdAt: Date.now(),
    };
    saveOrder(order);
    clear();
    router.push("/order/confirmation");
  }

  return (
    <div className="wrap" style={{ paddingBlock: 40 }}>
      <h1 style={{ fontSize: 30, fontWeight: "var(--fw-extra)", marginBottom: 20 }}>Checkout</h1>
      <div className="two">
        <div className="panel">
          <div className="stephd"><span className="sn done">✓</span><b>Contact</b><span className="muted" style={{ marginInlineStart: "auto", fontSize: 13 }}>Guest checkout</span></div>
          <div className="grid2">
            <div className={`field${errors.name ? " invalid" : ""}`}>
              <label>Full name</label>
              <input value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Your name" />
              {errors.name && <span className="err">{errors.name}</span>}
            </div>
            <div className={`field${errors.mobile ? " invalid" : ""}`}>
              <label>Mobile (OTP verification)</label>
              <input value={form.mobile} onChange={(e) => set("mobile", e.target.value)} placeholder="+971" />
              {errors.mobile && <span className="err">{errors.mobile}</span>}
            </div>
          </div>

          <div className="stephd"><span className="sn done">✓</span><b>Address &amp; time</b></div>
          <div className={`field${errors.address ? " invalid" : ""}`}>
            <label>Address · Oud Metha</label>
            <input value={form.address} onChange={(e) => set("address", e.target.value)} placeholder="Villa / apartment, street" />
            {errors.address && <span className="err">{errors.address}</span>}
          </div>
          <span className="tag"><span className="dot" />Serviceable · Today 6:00 PM confirmed</span>

          <div className="stephd"><span className="sn">3</span><b>Payment</b></div>
          {METHODS.map((m) => (
            <button key={m.id} type="button" className={`pay${method === m.id ? " on" : ""}`} onClick={() => setMethod(m.id)}>
              <span>{m.label}</span>
              <span className={`radio${method === m.id ? " on" : ""}`} />
            </button>
          ))}
          <p className="muted" style={{ fontSize: 12, marginTop: 8 }}>Secured by the payment gateway · No Apple Pay</p>
          <div className="policy-note">
            <b>Cancellation:</b> free 2+ hours before your slot · partial fee under 2 hours · visit fee once the clinician arrives.{" "}
            <Link href="/cancellation">Full policy</Link>
          </div>
        </div>

        <aside className="aside">
          <div className="lbl">Order</div>
          {items.map((it) => (
            <div className="srow" key={it.key}>
              <span>{it.name}{it.qty > 1 ? ` × ${it.qty}` : ""}</span>
              <span>{formatAED(it.price * it.qty)}</span>
            </div>
          ))}
          <div className="srow"><span>VAT (5%)</span><span>{formatAED(vat)}</span></div>
          <div className="srow total"><span>Total</span><b>{formatAED(total)}</b></div>
          <button className="btn btn-primary btn-full btn-lg" style={{ marginTop: 12 }} onClick={confirm} disabled={submitting} type="button">
            {submitting ? "Confirming…" : "Pay & confirm"}
          </button>
          <p className="muted" style={{ textAlign: "center", fontSize: 12, marginTop: 8 }}>
            You agree to the <Link href="/privacy">Terms</Link> &amp; <Link href="/cancellation">Cancellation policy</Link>
          </p>
        </aside>
      </div>
    </div>
  );
}
