"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart";
import { COMPANY, formatAED, formatSlot, localDate } from "@/lib/data";

export default function CheckoutView() {
  const { items, subtotal, updateItem, ready } = useCart();
  const [form, setForm] = useState({ name: "", mobile: "", address: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [today, setToday] = useState("");
  useEffect(() => setToday(localDate()), []);

  if (ready && items.length === 0) {
    return <div className="wrap"><div className="empty"><h1>No services selected</h1><p>Add a service before continuing your care request.</p><Link className="btn btn-primary" href="/services">Explore services</Link></div></div>;
  }

  const appointments = items.filter((item) => item.kind === "service");
  const set = (field: string, value: string) => setForm((state) => ({ ...state, [field]: value }));

  function continueInWhatsApp() {
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!/^[+\d][\d\s-]{7,}$/.test(form.mobile.trim())) next.mobile = "Enter a valid mobile number.";
    if (!form.address.trim()) next.address = "Please enter your Dubai area or address.";
    if (appointments.some((item) => !item.date || !item.time)) next.slot = "Choose a preferred date and time for each appointment.";
    setErrors(next);
    if (Object.keys(next).length) return;

    const selections = items.map((item, index) => {
      const slot = item.kind === "service" ? ` · preferred ${formatSlot(item.date, item.time)}` : "";
      return `${index + 1}. ${item.name}${item.meta ? ` · ${item.meta}` : ""}${slot} · ${formatAED(item.price * item.qty)}`;
    }).join("\n");
    const text = [
      "Hello HealthServe, I would like to request the following care:",
      selections,
      `Estimated subtotal: ${formatAED(subtotal)}`,
      `Name: ${form.name.trim()}`,
      `Mobile: ${form.mobile.trim()}`,
      `Area / address: ${form.address.trim()}`,
      "Please confirm suitability, availability and the final price before booking.",
    ].join("\n\n");
    window.open(`${COMPANY.whatsapp}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="wrap request-page">
      <span className="premium-kicker dark"><span />No payment collected</span>
      <h1>Review your care request.</h1>
      <p className="request-lead">Share your preferred services and timing with our care coordinator. Your booking is created only after the team confirms suitability, availability and price with you.</p>
      <div className="two">
        <section className="panel" aria-labelledby="request-details-title">
          <h2 className="blk" id="request-details-title">Your details</h2>
          <div className="grid2">
            <div className={`field${errors.name ? " invalid" : ""}`}><label htmlFor="request-name">Full name</label><input id="request-name" value={form.name} onChange={(e) => set("name", e.target.value)} autoComplete="name" />{errors.name && <span className="err" role="alert">{errors.name}</span>}</div>
            <div className={`field${errors.mobile ? " invalid" : ""}`}><label htmlFor="request-mobile">Mobile</label><input id="request-mobile" value={form.mobile} onChange={(e) => set("mobile", e.target.value)} placeholder="+971" inputMode="tel" autoComplete="tel" />{errors.mobile && <span className="err" role="alert">{errors.mobile}</span>}</div>
          </div>
          <div className={`field${errors.address ? " invalid" : ""}`}><label htmlFor="request-address">Dubai area or address</label><input id="request-address" value={form.address} onChange={(e) => set("address", e.target.value)} placeholder="Area, building or villa" autoComplete="street-address" />{errors.address && <span className="err" role="alert">{errors.address}</span>}</div>

          <h2 className="blk">Preferred appointments</h2>
          {appointments.map((item, index) => (
            <div className="request-appointment" key={item.key}>
              <b>{index + 1}. {item.name}{item.meta ? ` · ${item.meta}` : ""}</b>
              <div className="grid2">
                <div className="field"><label htmlFor={`date-${index}`}>Preferred date</label><input id={`date-${index}`} type="date" min={today} value={item.date ?? ""} onChange={(e) => updateItem(item.key, { date: e.target.value })} /></div>
                <div className="field"><label htmlFor={`time-${index}`}>Preferred time</label><input id={`time-${index}`} type="time" value={item.time ?? ""} onChange={(e) => updateItem(item.key, { time: e.target.value })} /></div>
              </div>
            </div>
          ))}
          {errors.slot && <span className="err" role="alert">{errors.slot}</span>}
        </section>

        <aside className="aside request-summary">
          <div className="lbl">Request summary</div>
          {items.map((item) => <div className="srow" key={item.key}><span>{item.name}{item.qty > 1 ? ` × ${item.qty}` : ""}</span><span>{formatAED(item.price * item.qty)}</span></div>)}
          <div className="srow total"><span>Estimated subtotal</span><b>{formatAED(subtotal)}</b></div>
          <p className="form-privacy">This is not a confirmed booking or charge. The care team confirms any fees, VAT, clinical suitability and timing with you.</p>
          <button className="btn btn-primary btn-full btn-lg" onClick={continueInWhatsApp} type="button">Review request in WhatsApp</button>
          <Link className="btn btn-quiet btn-full" style={{ marginTop: 8 }} href="/cart">Edit selections</Link>
        </aside>
      </div>
    </div>
  );
}
