"use client";

import { useRouter } from "next/navigation";
import { packages, formatAED } from "@/lib/data";
import { useCart } from "@/lib/cart";

export default function PackagesGrid() {
  const router = useRouter();
  const { addItem } = useCart();

  function choose(slug: string) {
    const p = packages.find((x) => x.slug === slug)!;
    addItem({ key: `pkg:${p.slug}`, slug: p.slug, name: p.name, meta: p.tagline, price: p.price, kind: "package" });
    router.push("/cart");
  }

  return (
    <div className="grid3" style={{ marginTop: 32 }}>
      {packages.map((p) => (
        <div className={`pkg${p.highlight ? " hl" : ""}`} key={p.slug}>
          {p.ribbon && <span className="rib">{p.ribbon}</span>}
          <h3>{p.name}</h3>
          <p className="muted" style={{ fontSize: 13 }}>{p.tagline}</p>
          <div className="pr">{formatAED(p.price)}</div>
          <p className="muted" style={{ fontSize: 12 }}>{p.perUnit}</p>
          <ul>{p.features.map((f) => <li key={f}>{f}</li>)}</ul>
          <button
            className={`btn btn-full ${p.highlight ? "btn-primary" : "btn-outline"}`}
            style={{ marginTop: "auto" }}
            onClick={() => choose(p.slug)}
            type="button"
          >
            Choose
          </button>
        </div>
      ))}
    </div>
  );
}
