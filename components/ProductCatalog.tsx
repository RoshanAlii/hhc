"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useCart } from "@/lib/cart";
import { COMPANY, formatAED, localDate, type Service } from "@/lib/data";
import type { Product } from "@/lib/variants";

// Lists a category's distinct products (e.g. the 16 physio types) as bookable
// cards. Each card lets you pick an option (session pack / dose) and add it to
// the booking; the appointment date/time is set at checkout.
export default function ProductCatalog({ service, products, canBook = true }: { service: Service; products: Product[]; canBook?: boolean }) {
  const { addItem } = useCart();
  const router = useRouter();
  const [q, setQ] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [sel, setSel] = useState<Record<string, number>>({});
  const [added, setAdded] = useState("");

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    return t ? products.filter((p) => p.name.toLowerCase().includes(t)) : products;
  }, [q, products]);
  const capped = !showAll && !q && filtered.length > 12 ? filtered.slice(0, 12) : filtered;
  const searchable = products.length > 8;

  function add(p: Product, go: boolean) {
    const i = sel[p.name] ?? 0;
    const o = p.options[i];
    addItem({
      key: `${service.slug}:${p.name}:${i}`,
      slug: service.slug,
      name: `${service.shortName} — ${p.name}`,
      meta: o.label,
      price: o.price,
      kind: "service",
      date: localDate(),
      time: "18:00",
    });
    if (go) {
      router.push("/checkout");
    } else {
      setAdded(p.name);
      setTimeout(() => setAdded(""), 2200);
    }
  }

  return (
    <>
      {searchable && (
        <div className="optsearch" style={{ maxWidth: 460, marginBottom: 16 }}>
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={`Search ${products.length} options…`} aria-label="Search" />
          <span className="optcount">{filtered.length}</span>
        </div>
      )}
      <div className="grid3">
        {capped.map((p) => {
          const i = sel[p.name] ?? 0;
          const o = p.options[i];
          return (
            <article className="prodcard" key={p.name}>
              <h3>{p.name}</h3>
              {p.options.length > 1 && (
                <select
                  className="pc-select"
                  value={i}
                  onChange={(e) => setSel((s) => ({ ...s, [p.name]: Number(e.target.value) }))}
                  aria-label={`${p.name} option`}
                >
                  {p.options.map((op, idx) => (
                    <option key={idx} value={idx}>{op.label || "1 session"} — {formatAED(op.price)}</option>
                  ))}
                </select>
              )}
              <div className="pc-foot">
                <span className="price">
                  {formatAED(o.price)}
                  {o.mrp && o.mrp > o.price ? <s style={{ color: "var(--text-muted)", fontWeight: 400, fontSize: 12, marginInlineStart: 6 }}>{formatAED(o.mrp)}</s> : null}
                </span>
                {canBook ? (
                  <button className="btn btn-primary btn-sm" onClick={() => add(p, false)} type="button">Add</button>
                ) : (
                  <a className="btn btn-quiet btn-sm" href={COMPANY.whatsapp} target="_blank" rel="noreferrer">Enquire</a>
                )}
              </div>
            </article>
          );
        })}
      </div>
      {!showAll && !q && filtered.length > 12 && (
        <button type="button" className="linkbtn" style={{ marginTop: 12, fontSize: 14 }} onClick={() => setShowAll(true)}>
          Show all {filtered.length} options
        </button>
      )}

      {added && (
        <div className="toast-live" role="status">
          <div className="toast">
            <div className="ic">
              <svg width="16" height="16" viewBox="0 0 24 24" style={{ stroke: "var(--green-600)", fill: "none", strokeWidth: 2 }}><path d="M5 12l5 5L20 6" /></svg>
            </div>
            <div>
              <div className="t">Added to your booking</div>
              <div className="s">{added} · <Link href="/checkout">Check out</Link> · <Link href="/cart">View cart</Link></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
