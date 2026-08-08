"use client";

import Link from "next/link";
import Icon from "@/components/Icon";
import { useCart } from "@/lib/cart";
import { formatAED, formatSlot } from "@/lib/data";

export default function CartView() {
  const { items, subtotal, removeItem, setQty, ready } = useCart();
  if (!ready) return <div className="wrap" style={{ paddingBlock: 60 }}><p className="muted">Loading your care request…</p></div>;
  if (!items.length) return <div className="wrap"><div className="empty"><h1>Your care request is empty</h1><p>Browse home healthcare and add the services you want to discuss.</p><Link className="btn btn-primary" href="/services">Explore services</Link></div></div>;

  return (
    <div className="wrap request-page">
      <span className="premium-kicker dark"><span />Review selections</span>
      <h1>Your care request.</h1>
      <p className="request-lead">Nothing here is booked or charged yet. A care coordinator will confirm the details with you.</p>
      <div className="two">
        <div>
          {items.map((item) => (
            <article className="li request-line" key={item.key}>
              <span className="request-line-icon"><Icon name={item.kind === "package" ? "calendar" : "heart"} size={20} /></span>
              <div className="m"><div className="t">{item.name}</div><div className="sub">{[item.meta, item.kind === "service" ? formatSlot(item.date, item.time) : null].filter(Boolean).join(" · ")}</div>
                {item.kind === "service" && item.slug !== "doctor-visit" ? <div className="qty"><button onClick={() => setQty(item.key, item.qty - 1)} aria-label={`Decrease ${item.name}`}>−</button><b>{item.qty}</b><button onClick={() => setQty(item.key, item.qty + 1)} aria-label={`Increase ${item.name}`}>+</button></div> : null}
                <button className="linkbtn" onClick={() => removeItem(item.key)} type="button">Remove</button>
              </div>
              <b>{formatAED(item.price * item.qty)}</b>
            </article>
          ))}
          <Link className="text-link" href="/services">← Add another service</Link>
        </div>
        <aside className="aside request-summary">
          <div className="lbl">Estimate</div>
          <div className="srow"><span>Selected care</span><span>{formatAED(subtotal)}</span></div>
          <div className="srow total"><span>Estimated subtotal</span><b>{formatAED(subtotal)}</b></div>
          <p className="form-privacy">Final pricing, VAT and availability are confirmed before a booking is created.</p>
          <Link className="btn btn-primary btn-full btn-lg" href="/checkout">Continue care request</Link>
        </aside>
      </div>
    </div>
  );
}
