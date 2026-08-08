"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import Icon from "@/components/Icon";
import { useCart } from "@/lib/cart";
import { COMPANY, formatAED, localDate, type Service } from "@/lib/data";
import type { Product } from "@/lib/variants";

type Group = { name: string; description: string; products: Product[] };

function categoryFor(slug: string, name: string): string {
  const n = name.toLowerCase();
  if (slug === "physiotherapy") {
    if (/child|elderly|maternity|chest/.test(n)) return "Specialist physiotherapy";
    if (/neurolog|stroke/.test(n)) return "Neurological rehabilitation";
    if (/sport|post operative/.test(n)) return "Sports & post-operative";
    if (/back|neck|bone|joint|pain|needling|cupping/.test(n)) return "Pain, joints & mobility";
    return "Assessment & recovery";
  }
  if (slug === "lab-tests") {
    if (/hormone|pregnan|women|female|male|fertility|pcos|prostate|antenatal|nipt|premarital|couple|parents/.test(n)) return "Family & hormones";
    if (/heart|lipid|cholesterol|diabet|weight|fitness|smoking|alcohol|insulin|electrolyte/.test(n)) return "Lifestyle & heart";
    if (/vitamin|mineral|bone|hair|skin|iron/.test(n)) return "Nutrition, skin & hair";
    if (/allerg|intolerance|digest|stool|gut/.test(n)) return "Allergy & digestive";
    if (/cancer|std|infection|flu|fever|uti|dengue|urine/.test(n)) return "Screening & infection";
    return "General health";
  }
  if (slug === "iv-therapy") {
    if (/skin|glow|hair|beauty|aging/.test(n)) return "Beauty & longevity";
    if (/immun|stress|memory|energy|vitamin/.test(n)) return "Energy & immunity";
    if (/heart|gut|liver|diabet|blood|iron/.test(n)) return "Clinical support";
    if (/detox|chelation|metal/.test(n)) return "Detox support";
    if (/fertility|female|male/.test(n)) return "Hormone & fertility";
    return "Wellness essentials";
  }
  if (slug === "home-nursing" || slug === "elderly-care") {
    if (/care giver|caregiver/.test(n)) return "Daily caregiver support";
    if (/24|12|8|4hr/.test(n)) return "Extended nursing shifts";
    return "Nurse visits";
  }
  if (/child|maternity|women|pregnan/.test(n)) return "Family care";
  if (/elderly|caregiver|geriatric/.test(n)) return "Daily support";
  if (/consult|assessment|doctor/.test(n)) return "Consultations";
  if (/vitamin|injection|shot/.test(n)) return "Vitamins & injections";
  return "All options";
}

function groupDescription(name: string): string {
  const descriptions: Record<string, string> = {
    "Assessment & recovery": "Start with an assessment or choose a general rehabilitation plan.",
    "Pain, joints & mobility": "Target pain, stiffness and movement limitations with focused care.",
    "Sports & post-operative": "Structured recovery after injury, surgery or intensive activity.",
    "Neurological rehabilitation": "Specialist support for neurological conditions and stroke recovery.",
    "Specialist physiotherapy": "Age- and condition-specific care for children, maternity and older adults.",
    "Family & hormones": "Hormone, fertility, pregnancy and family-focused health profiles.",
    "Lifestyle & heart": "Understand cardiovascular, metabolic and lifestyle-related risks.",
    "Nutrition, skin & hair": "Check deficiencies and markers affecting energy, skin, hair and bones.",
    "Allergy & digestive": "Explore allergy, intolerance and digestive-health concerns.",
    "Screening & infection": "Focused screening for common infections and health risks.",
    "General health": "Routine profiles and full-body checks for a clearer health baseline.",
    "Beauty & longevity": "Clinician-led drips supporting skin, hair and healthy ageing.",
    "Energy & immunity": "Hydration, vitamin, energy and immune-support formulations.",
    "Clinical support": "Targeted wellness support for specific clinical needs.",
    "Detox support": "Clinician-assessed detox and chelation programmes.",
    "Hormone & fertility": "Supportive formulations for hormonal and fertility goals.",
    "Daily caregiver support": "Flexible non-clinical help with daily routines and companionship.",
    "Extended nursing shifts": "Longer nursing coverage for recovery and ongoing care.",
    "Nurse visits": "Short skilled-nursing visits for focused clinical needs.",
  };
  return descriptions[name] ?? "Choose the option that best matches your care needs.";
}

function productDescription(name: string, category: string): string {
  const n = name.toLowerCase();
  if (/assessment/.test(n)) return "A clinician-led evaluation and personalised treatment plan.";
  if (/back|neck/.test(n)) return "Focused treatment for back or neck discomfort and movement.";
  if (/sport/.test(n)) return "Recover strength, movement and confidence after a sports injury.";
  if (/child/.test(n)) return "Gentle, age-appropriate support for movement and development.";
  if (/stroke/.test(n)) return "Structured rehabilitation supporting function after a stroke.";
  if (/post operative/.test(n)) return "Guided rehabilitation after surgery, paced to your recovery.";
  if (/elderly|geriatric/.test(n)) return "Mobility, balance and independence support for older adults.";
  if (/maternity/.test(n)) return "Safe movement and recovery support during and after pregnancy.";
  if (/pain/.test(n)) return "A focused plan to reduce pain and improve everyday function.";
  if (/profile|test|screen/.test(n)) return "At-home sample collection with clear digital results.";
  if (/drip|iv/.test(n)) return "Clinician-administered IV support delivered in your home.";
  return groupDescription(category);
}

export default function ProductCatalog({ service, products, canBook = true }: { service: Service; products: Product[]; canBook?: boolean }) {
  const { addItem } = useCart();
  const router = useRouter();
  const [q, setQ] = useState("");
  const [activeGroup, setActiveGroup] = useState("");
  const [visibleCount, setVisibleCount] = useState(8);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [optionIndex, setOptionIndex] = useState(0);
  const [added, setAdded] = useState("");

  const groups = useMemo<Group[]>(() => {
    const map = new Map<string, Product[]>();
    products.forEach((product) => {
      const category = categoryFor(service.slug, product.name);
      map.set(category, [...(map.get(category) ?? []), product]);
    });
    return [...map.entries()].map(([name, groupedProducts]) => ({ name, description: groupDescription(name), products: groupedProducts }));
  }, [products, service.slug]);

  const selectedGroup = activeGroup || groups[0]?.name || "";
  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (term) return products.filter((product) => product.name.toLowerCase().includes(term));
    return groups.find((group) => group.name === selectedGroup)?.products ?? [];
  }, [groups, products, q, selectedGroup]);
  const visible = filtered.slice(0, visibleCount);
  const categoryDescription = q ? `Showing the closest matches across all ${products.length} services.` : groups.find((group) => group.name === selectedGroup)?.description;

  function chooseGroup(name: string) {
    setActiveGroup(name);
    setQ("");
    setVisibleCount(8);
  }

  function openProduct(product: Product) {
    setActiveProduct(product);
    setOptionIndex(0);
  }

  function add(product: Product, go: boolean) {
    const option = product.options[optionIndex] ?? product.options[0];
    addItem({
      key: `${service.slug}:${product.name}:${optionIndex}`,
      slug: service.slug,
      name: `${service.shortName} - ${product.name}`,
      meta: option.label,
      price: option.price,
      kind: "service",
      date: localDate(),
      time: "18:00",
    });
    setActiveProduct(null);
    if (go) router.push("/checkout");
    else {
      setAdded(product.name);
      setTimeout(() => setAdded(""), 2200);
    }
  }

  return (
    <div className="guided-catalogue">
      <div className="catalogue-intro">
        <span className="kicker">What do you need help with?</span>
        <h3>Choose a care category</h3>
        <p>Start with the goal that feels closest. You can change categories at any time.</p>
      </div>

      {groups.length > 1 && (
        <div className="catalogue-tabs" role="tablist" aria-label="Service categories">
          {groups.map((group) => (
            <button key={group.name} type="button" role="tab" aria-selected={!q && selectedGroup === group.name} className={!q && selectedGroup === group.name ? "on" : ""} onClick={() => chooseGroup(group.name)}>
              <span>{group.name}</span><small>{group.products.length}</small>
            </button>
          ))}
        </div>
      )}

      <div className="catalogue-tools">
        <div>
          <h3>{q ? "Search results" : selectedGroup}</h3>
          <p>{categoryDescription}</p>
        </div>
        {products.length > 6 && (
          <div className="optsearch">
            <Icon name="search" size={16} />
            <input value={q} onChange={(event) => { setQ(event.target.value); setVisibleCount(8); }} placeholder={`Search ${products.length} services…`} aria-label="Search services" />
            <span className="optcount">{filtered.length}</span>
          </div>
        )}
      </div>

      <div className="catalogue-list">
        {visible.map((product) => (
          <article className="catalogue-card" key={product.name}>
            <span className="catalogue-card-icon"><Icon name={service.icon} size={19} /></span>
            <div className="catalogue-card-copy">
              <h3>{product.name}</h3>
              <p>{productDescription(product.name, categoryFor(service.slug, product.name))}</p>
              <div className="catalogue-meta">
                <span>{product.options.length > 1 ? `${product.options.length} packages` : product.options[0]?.label || "Single visit"}</span>
                <span>Care at home</span>
              </div>
            </div>
            <div className="catalogue-card-action">
              <span className="from">From <b>{formatAED(product.from)}</b></span>
              <button className="btn btn-primary btn-sm" type="button" onClick={() => openProduct(product)}>{canBook ? "View & book" : "View options"}</button>
            </div>
          </article>
        ))}
      </div>

      {!visible.length && <div className="catalogue-empty">No matching service found. Try a shorter search.</div>}
      {visibleCount < filtered.length && <button className="btn btn-quiet catalogue-more" type="button" onClick={() => setVisibleCount((count) => count + 8)}>Show more in this category</button>}

      {activeProduct && (
        <div className="catalogue-modal" role="dialog" aria-modal="true" aria-labelledby="catalogue-modal-title">
          <button className="catalogue-backdrop" type="button" aria-label="Close service options" onClick={() => setActiveProduct(null)} />
          <div className="catalogue-sheet">
            <button className="catalogue-close" type="button" aria-label="Close" onClick={() => setActiveProduct(null)}>×</button>
            <span className="kicker">{categoryFor(service.slug, activeProduct.name)}</span>
            <h2 id="catalogue-modal-title">{activeProduct.name}</h2>
            <p>{productDescription(activeProduct.name, categoryFor(service.slug, activeProduct.name))}</p>
            <div className="package-list" role="radiogroup" aria-label="Choose a package">
              {activeProduct.options.map((option, index) => (
                <button className={`package-option${optionIndex === index ? " on" : ""}`} type="button" role="radio" aria-checked={optionIndex === index} key={`${option.label}-${index}`} onClick={() => setOptionIndex(index)}>
                  <span><b>{option.label || "1 session"}</b><small>{index === 0 ? "Good for getting started" : "Better value for ongoing care"}</small></span>
                  <strong>{formatAED(option.price)}</strong>
                </button>
              ))}
            </div>
            {canBook ? (
              <div className="catalogue-sheet-actions">
                <button className="btn btn-outline" type="button" onClick={() => add(activeProduct, false)}>Add to booking</button>
                <button className="btn btn-primary" type="button" onClick={() => add(activeProduct, true)}>Book now</button>
              </div>
            ) : (
              <a className="btn btn-primary btn-full" href={COMPANY.whatsapp} target="_blank" rel="noreferrer">Enquire on WhatsApp</a>
            )}
          </div>
        </div>
      )}

      {added && (
        <div className="toast-live" role="status"><div className="toast"><div className="ic">✓</div><div><div className="t">Added to your booking</div><div className="s">{added} · <Link href="/checkout">Check out</Link> · <Link href="/cart">View cart</Link></div></div></div></div>
      )}
    </div>
  );
}
