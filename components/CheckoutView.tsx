"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Icon from "@/components/Icon";
import { useCart, saveOrder, type Order } from "@/lib/cart";
import { formatAED, formatSlot, localDate } from "@/lib/data";

const METHODS = [
  { id: "card", label: "Credit or debit card", description: "Visa and Mastercard", mark: "VISA · MC", tone: "card" },
  { id: "tabby", label: "Pay with Tabby", description: "4 interest-free payments", mark: "tabby", tone: "tabby" },
  { id: "onvisit", label: "Pay on visit", description: "Cash or card at your door", mark: "AED", tone: "visit" },
];
const EMIRATES = ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Umm Al Quwain", "Ras Al Khaimah", "Fujairah"];

export default function CheckoutView() {
  const router = useRouter();
  const { items, subtotal, vat, total, updateItem, clear, ready } = useCart();
  const [method, setMethod] = useState("card");
  const [form, setForm] = useState({ name: "", mobile: "", address: "", emirate: "Dubai" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [today, setToday] = useState("");

  useEffect(() => {
    setToday(localDate());
    document.body.classList.add("checkout-mode");
    return () => document.body.classList.remove("checkout-mode");
  }, []);

  const appointments = items.filter((item) => item.kind === "service");
  const contactComplete = Boolean(form.name.trim() && /^[+\d][\d\s]{7,}$/.test(form.mobile.trim()));
  const visitComplete = Boolean(form.address.trim() && appointments.every((item) => item.date && item.time));
  const confirmLabel = method === "onvisit" ? "Confirm booking" : `Pay ${formatAED(total)} securely`;

  if (ready && items.length === 0) {
    return <div className="wrap"><div className="empty checkout-empty"><span className="checkout-empty-icon"><Icon name="cart" size={25} /></span><h1>Nothing to check out</h1><p>Add a service to your booking and return when you&rsquo;re ready.</p><Link className="btn btn-primary" href="/services">Explore services</Link></div></div>;
  }

  function set(field: string, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    if (errors[field]) setErrors((current) => ({ ...current, [field]: "" }));
  }

  function validate() {
    const nextErrors: Record<string, string> = {};
    if (!form.name.trim()) nextErrors.name = "Please enter your full name.";
    if (!/^[+\d][\d\s]{7,}$/.test(form.mobile.trim())) nextErrors.mobile = "Enter a valid UAE mobile number.";
    if (!form.address.trim()) nextErrors.address = "Please enter the visit address.";
    if (appointments.some((item) => !item.date || !item.time)) nextErrors.slot = "Choose a date and time for every appointment.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function confirm() {
    if (!validate()) return;
    setSubmitting(true);
    const first = appointments[0] ?? items[0];
    const order: Order = {
      id: "HS-" + Math.floor(10000 + Math.random() * 90000),
      items,
      subtotal,
      vat,
      total,
      payment: METHODS.find((item) => item.id === method)!.label,
      card: method === "card" ? "····4291" : undefined,
      slot: formatSlot(first?.date, first?.time),
      createdAt: Date.now(),
    };
    saveOrder(order);
    clear();
    router.push("/order/confirmation");
  }

  return (
    <main className="checkout-page">
      <div className="wrap checkout-wrap">
        <div className="checkout-heading">
          <span className="kicker">Secure appointment booking</span>
          <h1>Complete your booking</h1>
          <p>Confirm your details and we&rsquo;ll arrange the rest.</p>
        </div>

        <div className="checkout-progress" aria-label="Checkout progress">
          {[
            { number: 1, label: "Your details", complete: contactComplete },
            { number: 2, label: "Visit details", complete: visitComplete },
            { number: 3, label: "Payment", complete: false, active: contactComplete && visitComplete },
          ].map((step, index) => (
            <div className={`checkout-progress-step${step.complete ? " complete" : ""}${step.active ? " active" : ""}`} key={step.label}>
              <span>{step.complete ? <Icon name="check" size={15} /> : step.number}</span><b>{step.label}</b>{index < 2 && <i />}
            </div>
          ))}
        </div>

        <div className="checkout-layout">
          <div className="checkout-form-card">
            <section className="checkout-section contact-section">
              <header><span><Icon name="user" size={20} /></span><div><small>Step 1</small><h2>Your details</h2><p>We use these details for appointment updates.</p></div>{contactComplete && <em><Icon name="check" size={14} /> Complete</em>}</header>
              <div className="grid2">
                <div className={`field${errors.name ? " invalid" : ""}`}><label htmlFor="checkout-name">Full name</label><input id="checkout-name" value={form.name} onChange={(event) => set("name", event.target.value)} placeholder="Your full name" autoComplete="name" />{errors.name && <span className="err">{errors.name}</span>}</div>
                <div className={`field${errors.mobile ? " invalid" : ""}`}><label htmlFor="checkout-mobile">Mobile number</label><div className="phone-field"><span>+971</span><input id="checkout-mobile" value={form.mobile} onChange={(event) => set("mobile", event.target.value)} placeholder="50 123 4567" inputMode="tel" autoComplete="tel" /></div>{errors.mobile && <span className="err">{errors.mobile}</span>}<small className="field-help">Used for OTP and WhatsApp confirmation</small></div>
              </div>
            </section>

            <section className="checkout-section visit-section">
              <header><span><Icon name="calendar" size={20} /></span><div><small>Step 2</small><h2>Visit details</h2><p>Tell us where and when the clinician should arrive.</p></div>{visitComplete && <em><Icon name="check" size={14} /> Complete</em>}</header>
              <div className="grid2 checkout-address-row">
                <div className={`field${errors.address ? " invalid" : ""}`}><label htmlFor="checkout-address">Home address</label><input id="checkout-address" value={form.address} onChange={(event) => set("address", event.target.value)} placeholder="Villa, apartment, street and area" autoComplete="street-address" />{errors.address && <span className="err">{errors.address}</span>}</div>
                <div className="field"><label htmlFor="checkout-emirate">Emirate</label><select id="checkout-emirate" value={form.emirate} onChange={(event) => set("emirate", event.target.value)}>{EMIRATES.map((emirate) => <option key={emirate}>{emirate}</option>)}</select></div>
              </div>
              <div className="appointment-list">
                {appointments.map((item) => (
                  <article className="appointment-editor" key={item.key}>
                    <span className="appointment-icon"><Icon name="wellness" size={19} /></span>
                    <div className="appointment-name"><b>{item.name}</b>{item.meta && <small>{item.meta}</small>}</div>
                    <div className="field"><label>Date</label><input type="date" min={today} value={item.date ?? ""} onChange={(event) => updateItem(item.key, { date: event.target.value })} /></div>
                    <div className="field"><label>Time</label><input type="time" value={item.time ?? ""} onChange={(event) => updateItem(item.key, { time: event.target.value })} /></div>
                  </article>
                ))}
              </div>
              {errors.slot && <span className="err checkout-slot-error">{errors.slot}</span>}
              <div className="service-confirmed"><Icon name="check" size={15} /><span><b>Serviceable address</b> · Exact arrival time confirmed when booked</span></div>
            </section>

            <section className="checkout-section payment-section">
              <header><span><Icon name="shield" size={20} /></span><div><small>Step 3</small><h2>Choose payment</h2><p>Select the payment method that works for you.</p></div></header>
              <div className="payment-grid">
                {METHODS.map((item) => (
                  <button key={item.id} type="button" className={`payment-tile${method === item.id ? " selected" : ""}`} onClick={() => setMethod(item.id)} aria-pressed={method === item.id}>
                    <span className={`payment-mark ${item.tone}`}>{item.mark}</span><span className="payment-copy"><b>{item.label}</b><small>{item.description}</small></span><span className="payment-check">{method === item.id && <Icon name="check" size={14} />}</span>
                  </button>
                ))}
              </div>
              <div className="checkout-security"><Icon name="shield" size={16} /><span><b>Protected checkout</b><small>Secure processing · Instant confirmation · No card details stored</small></span></div>
              <div className="policy-note"><b>Flexible cancellation:</b> free 2+ hours before your slot. <Link href="/cancellation">Read the full policy</Link></div>
            </section>
          </div>

          <aside className="checkout-summary">
            <div className="summary-title"><div><span className="kicker">Your appointment</span><h2>Order summary</h2></div><Link href="/cart">Edit</Link></div>
            <div className="summary-items">
              {items.map((item) => (
                <article className="summary-item" key={item.key}>
                  <span className="summary-item-icon"><Icon name={item.kind === "service" ? "wellness" : "cart"} size={19} /></span>
                  <div><b>{item.name}{item.qty > 1 ? ` × ${item.qty}` : ""}</b>{item.meta && <small>{item.meta}</small>}{item.kind === "service" && <span><Icon name="calendar" size={12} /> {formatSlot(item.date, item.time)}</span>}</div>
                  <strong>{formatAED(item.price * item.qty)}</strong>
                </article>
              ))}
            </div>
            <div className="summary-address"><Icon name="delivery" size={18} /><div><small>Home visit</small><b>{form.address || "Address added at checkout"}</b><span>{form.emirate}, UAE</span></div></div>
            <div className="summary-totals"><div><span>Subtotal</span><b>{formatAED(subtotal)}</b></div><div><span>VAT (5%)</span><b>{formatAED(vat)}</b></div><div className="grand-total"><span>Total</span><b>{formatAED(total)}</b></div></div>
            <button className="btn btn-primary btn-full btn-lg checkout-confirm" onClick={confirm} disabled={submitting} type="button">{submitting ? "Confirming…" : confirmLabel}</button>
            <div className="summary-trust"><span><Icon name="shield" size={14} /> DHA licensed</span><span><Icon name="check" size={14} /> Instant confirmation</span></div>
            <p className="checkout-terms">By confirming, you agree to our <Link href="/privacy">Terms</Link> and <Link href="/cancellation">cancellation policy</Link>.</p>
          </aside>
        </div>
      </div>

      <div className="checkout-mobile-bar"><div><small>Total</small><b>{formatAED(total)}</b></div><button className="btn btn-primary" type="button" onClick={confirm} disabled={submitting}>{submitting ? "Confirming…" : method === "onvisit" ? "Confirm booking" : "Pay securely"}</button></div>
    </main>
  );
}
