import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import { COMPANY, formatAED } from "@/lib/data";

export const metadata: Metadata = {
  title: "The Dispensary — IV drips, peptides & wellness",
  description:
    "HealthServe's wellness dispensary: IV therapy, clinician-prescribed peptides, vitamin injections, supplements and longevity programs — administered or delivered at home.",
};

type Product = { name: string; desc: string; price?: number };
type Group = {
  key: string;
  title: string;
  blurb: string;
  icon: string;
  cat: string;
  pricePrefix?: string;
  noPriceLabel?: string;
  cta: string;
  href: string; // "wa" => WhatsApp, otherwise an internal path
  products: Product[];
};

const WA = "wa";

const catalogue: Group[] = [
  {
    key: "iv",
    title: "IV therapy & drips",
    blurb: "Clinician-administered infusions at home — hydration to recovery.",
    icon: "wellness",
    cat: "cat-therapy",
    pricePrefix: "from ",
    cta: "Book",
    href: "/services/iv-therapy",
    products: [
      { name: "Hydration Boost", desc: "Rehydrate and replenish electrolytes.", price: 450 },
      { name: "Immunity Defense", desc: "High-dose vitamin C, zinc and antioxidants.", price: 500 },
      { name: "NAD+ Longevity", desc: "Cellular energy and longevity protocol.", price: 1200 },
      { name: "Recovery & Energy", desc: "Post-illness, jet-lag and fatigue support.", price: 550 },
      { name: "Beauty Glow", desc: "Glutathione and biotin for skin and hair.", price: 600 },
      { name: "Myers' Cocktail", desc: "The classic vitamin-and-mineral blend.", price: 500 },
    ],
  },
  {
    key: "peptides",
    title: "Peptides",
    blurb: "Prescription peptide therapies, dispensed only after a clinician consultation.",
    icon: "pill",
    cat: "cat-medical",
    noPriceLabel: "Rx · consult",
    cta: "Enquire",
    href: WA,
    products: [
      { name: "BPC-157", desc: "Recovery and gut-health support." },
      { name: "TB-500", desc: "Tissue repair and mobility." },
      { name: "Ipamorelin", desc: "Growth-hormone and recovery support." },
      { name: "CJC-1295", desc: "Longevity and vitality protocol." },
      { name: "GHK-Cu", desc: "Skin, collagen and hair support." },
      { name: "Thymosin Alpha-1", desc: "Immune-system modulation." },
    ],
  },
  {
    key: "injections",
    title: "Vitamin injections & boosters",
    blurb: "Quick single-shot boosters, administered at home by a nurse.",
    icon: "shield",
    cat: "cat-nursing",
    pricePrefix: "from ",
    cta: "Order",
    href: WA,
    products: [
      { name: "Vitamin B12", desc: "Energy and nervous-system support.", price: 150 },
      { name: "Vitamin D", desc: "For deficiency and immunity.", price: 200 },
      { name: "Glutathione push", desc: "Antioxidant and skin brightening.", price: 300 },
      { name: "Biotin", desc: "Hair, skin and nails.", price: 180 },
      { name: "Vitamin C", desc: "Immunity and collagen support.", price: 200 },
      { name: "Iron (Ferric)", desc: "For iron-deficiency, clinician-assessed.", price: 350 },
    ],
  },
  {
    key: "supplements",
    title: "Supplements & vitamins",
    blurb: "Pharmacist-approved daily supplements, delivered to your door.",
    icon: "heart",
    cat: "cat-therapy",
    cta: "Order",
    href: WA,
    products: [
      { name: "Omega-3 Fish Oil", desc: "Heart and brain support.", price: 120 },
      { name: "Magnesium Glycinate", desc: "Sleep, muscles and calm.", price: 95 },
      { name: "Vitamin D3 + K2", desc: "Bone and immune health.", price: 110 },
      { name: "Probiotics", desc: "Gut and digestive balance.", price: 140 },
      { name: "Coenzyme Q10", desc: "Cellular energy and heart health.", price: 160 },
      { name: "Collagen Peptides", desc: "Skin, joints and hair.", price: 180 },
    ],
  },
  {
    key: "longevity",
    title: "Longevity & hormone programs",
    blurb: "Clinician-led programs, built around your labs and goals.",
    icon: "refresh",
    cat: "cat-medical",
    noPriceLabel: "Consultation",
    cta: "Book consult",
    href: WA,
    products: [
      { name: "NAD+ Program", desc: "A course of infusions for energy and longevity." },
      { name: "Hormone optimisation", desc: "Assessment and clinician-guided therapy." },
      { name: "Weight management", desc: "Medically-supervised metabolic program." },
    ],
  },
];

function priceLabel(g: Group, p: Product): string {
  if (p.price != null) return (g.pricePrefix ?? "") + formatAED(p.price);
  return g.noPriceLabel ?? "Enquire";
}

export default function DispensaryPage() {
  return (
    <>
      <header className="pagehd wrap warmtop">
        <span className="crumb"><Link href="/">Home</Link> / <b>The Dispensary</b></span>
        <span className="tag orange" style={{ marginTop: 10 }}><span className="dot" />IV · Peptides · Supplements · delivered or at home</span>
        <h1>The Dispensary.</h1>
        <p>Our wellness pharmacy — IV drips, clinician-prescribed peptides, vitamin injections, supplements and longevity programs, administered at home or delivered to your door across Dubai.</p>
      </header>

      <div className="wrap" style={{ paddingBottom: 24 }}>
        {catalogue.map((g) => (
          <section key={g.key} style={{ paddingBlock: "28px 4px" }}>
            <div className="sec-hd" style={{ marginBottom: 20 }}>
              <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                <span className={`ic ${g.cat}`}><Icon name={g.icon} /></span>
                <div>
                  <h2 className="sec" style={{ fontSize: 22 }}>{g.title}</h2>
                  <p style={{ marginTop: 2 }}>{g.blurb}</p>
                </div>
              </div>
            </div>
            <div className="grid3">
              {g.products.map((p) => (
                <article className="svc" style={{ minHeight: 0 }} key={p.name}>
                  <h3 style={{ fontSize: 17 }}>{p.name}</h3>
                  <p>{p.desc}</p>
                  <div className="foot">
                    <span className="price">{priceLabel(g, p)}{p.price != null && <small>per session</small>}</span>
                    {g.href === WA ? (
                      <a className="btn btn-quiet btn-sm" href={COMPANY.whatsapp} target="_blank" rel="noreferrer">{g.cta}</a>
                    ) : (
                      <Link className="btn btn-quiet btn-sm" href={g.href}>{g.cta}</Link>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}

        <div className="policy-note" style={{ marginTop: 20 }}>
          <b>Please note:</b> peptides, hormone therapies and other prescription items are dispensed only after a
          consultation with a DHA-licensed clinician. Nothing here is a recommendation to use a specific product.
        </div>
      </div>

      {/* Pharmacy / prescription band */}
      <section className="wrap" style={{ paddingBlock: "8px 24px" }}>
        <div className="band">
          <div style={{ flex: 1, minWidth: 240 }}>
            <div className="lbl">Home pharmacy</div>
            <b style={{ color: "var(--text-strong)", fontSize: 18 }}>Prescriptions &amp; refills, delivered.</b>
            <p className="muted" style={{ fontSize: 14, marginTop: 4 }}>Send us your prescription and our pharmacists prepare and deliver it — with cold-chain handling where needed.</p>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <a className="btn btn-primary" href={COMPANY.whatsapp} target="_blank" rel="noreferrer">Send a prescription</a>
            <a className="btn btn-outline" href={COMPANY.phoneHref}>Call {COMPANY.phoneLabel}</a>
          </div>
        </div>
      </section>

      <section className="wrap" style={{ paddingBlock: "8px 64px" }}>
        <div className="ctaband">
          <div className="txt">
            <h2>Not sure what you need?</h2>
            <p>Talk to a HealthServe clinician about the right drip, program or supplement for your goals.</p>
          </div>
          <div className="actions">
            <a className="btn btn-white btn-lg" href={COMPANY.whatsapp} target="_blank" rel="noreferrer">Ask a clinician</a>
            <Link className="btn btn-clear btn-lg" href="/services/wellness">Explore wellness</Link>
          </div>
        </div>
      </section>
    </>
  );
}
