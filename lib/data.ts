// HealthServe content + data model.
// Prices are sample AED values so cart/checkout math works end-to-end.

export const COMPANY = {
  name: "Healthserve Home Healthcare LLC",
  phoneLabel: "04 357 7657",
  phoneHref: "tel:+97143577657",
  whatsapp: "https://wa.me/971543061896",
  whatsappLabel: "+971 54 306 1896",
  email: "info@healthservehhc.co",
  dha: "DHA FL-0064861",
  mohap: "MOHAP ZM0ETT1A-090224",
  address: "Oud Metha, Dubai",
  hours: "Daily 8:30 AM – 6:30 PM",
  since: 2016,
};

export const VAT_RATE = 0.05;

export const PROMOS = [
  "Free first doctor consultation on home visits",
  "Same-day home nursing across Dubai",
  "New wellness & IV packages now open",
  "Book before 6 PM for same-evening visits",
];

export type Category = "Medical" | "Nursing & care" | "Therapy & wellness";
export type PriceType = "from" | "fixed" | "enquire" | "soon";
export type Bucket = "services" | "dispensary";
export type Cta = "book" | "enquire" | "soon";

export interface Variant {
  id: string;
  name: string;
  price: number;
}

export interface Service {
  slug: string;
  name: string;
  shortName: string;
  bucket: Bucket;
  category: Category;
  icon: string;
  cta: Cta; // book = purchasable w/ slot · enquire = talk to us · soon = Phase 2
  homeCare: boolean; // shown in the home "Care that comes to you" grid
  phase2?: boolean;
  blurb: string;
  price: number | null;
  priceType: PriceType;
  unit: string;
  nextSlot: string;
  featured?: boolean;
  photo?: string;
  heroTitle: string;
  heroBlurb: string;
  variants?: Variant[];
  includes: string[];
  howItWorks: string[];
  faqs: { q: string; a: string }[];
}

const GENERIC_HOW = [
  "Choose a service and time that suits you \u2014 same-day slots across most of Dubai.",
  "A DHA-licensed clinician arrives at your door, fully equipped.",
  "You get a clear plan and a claim-ready invoice, with WhatsApp follow-up.",
];
const GENERIC_FAQ = [
  { q: "Which areas do you cover?", a: "Most of Dubai. Enter your area at booking and we confirm instantly." },
  { q: "Can I claim on insurance?", a: "We issue claim-ready invoices; direct billing with select partners." },
  { q: "Can I reschedule?", a: "Yes \u2014 free up to 2 hours before your slot. See our cancellation policy." },
];

interface SvcInput {
  slug: string; name: string; shortName?: string; bucket: Bucket; category: Category;
  icon: string; cta: Cta; homeCare?: boolean; phase2?: boolean;
  price?: number | null; priceType?: PriceType; unit?: string; nextSlot?: string;
  featured?: boolean; photo?: string; blurb: string; heroTitle?: string; heroBlurb?: string;
  variants?: Variant[]; includes?: string[]; howItWorks?: string[]; faqs?: { q: string; a: string }[];
}

function svc(i: SvcInput): Service {
  const price = i.price ?? null;
  const priceType: PriceType = i.priceType ?? (i.phase2 ? "soon" : price != null ? "from" : "enquire");
  const nextSlot = i.nextSlot ?? (i.phase2 ? "Coming soon" : i.cta === "book" ? "Today" : "Enquire");
  return {
    slug: i.slug, name: i.name, shortName: i.shortName ?? i.name, bucket: i.bucket, category: i.category,
    icon: i.icon, cta: i.cta, homeCare: i.homeCare ?? false, phase2: i.phase2,
    blurb: i.blurb, price, priceType, unit: i.unit ?? "per session", nextSlot,
    featured: i.featured, photo: i.photo,
    heroTitle: i.heroTitle ?? i.name + " \u2014 delivered at home.",
    heroBlurb: i.heroBlurb ?? i.blurb,
    variants: i.variants,
    includes: i.includes ?? [
      "Delivered by a DHA-licensed clinician", "Clear plan and next steps",
      "Claim-ready invoice", "WhatsApp follow-up after the visit",
    ],
    howItWorks: i.howItWorks ?? GENERIC_HOW,
    faqs: i.faqs ?? GENERIC_FAQ,
  };
}

// ===== All Services bucket (page /services) ==============================
const serviceItems: Service[] = [
  svc({
    slug: "doctor-visit", name: "Doctors Visit & Consultation", shortName: "Doctors visit & consultation",
    bucket: "services", category: "Medical", icon: "doctor", cta: "book", homeCare: true, featured: true,
    price: 299, unit: "per visit", photo: "Doctor examining a patient at home",
    blurb: "A DHA-licensed GP at your door for assessment, treatment and prescriptions \u2014 often within hours.",
    heroTitle: "A doctor at your door \u2014 often within hours.",
    heroBlurb: "DHA-licensed GPs visit you at home, your office or your hotel for assessment, treatment and prescriptions. No clinic, no waiting room.",
    variants: [ { id: "gp", name: "GP visit (9\u20139)", price: 299 }, { id: "express", name: "Express (9pm\u20139am)", price: 375 } ],
    includes: ["Full clinical assessment and vitals", "Diagnosis and a clear treatment plan", "Prescriptions where appropriate", "Referral for labs or specialist care", "Visit summary shared with you and your physician"],
  }),
  svc({
    slug: "physiotherapy", name: "Physiotherapy & Fitness", shortName: "Physiotherapy & fitness",
    bucket: "services", category: "Therapy & wellness", icon: "physio", cta: "book", homeCare: true,
    price: 95, unit: "per session", nextSlot: "Tomorrow", photo: "Physiotherapist guiding a home exercise",
    blurb: "Personalised recovery and mobility programs at home \u2014 16 physio types, 1/3/6/12-session packs.",
    heroBlurb: "Personalised rehabilitation, post-surgical recovery and mobility programs by licensed physiotherapists \u2014 assessment free on 6+ session packs.",
  }),
  svc({
    slug: "home-nursing", name: "Home Nursing Services", shortName: "Home nursing",
    bucket: "services", category: "Nursing & care", icon: "nursing", cta: "enquire", homeCare: true,
    price: 149, unit: "per hour", photo: "Nurse assisting a patient at home",
    blurb: "Hourly to 24-hour shifts \u2014 including caregiver and maternity nursing.",
    heroBlurb: "DHA-licensed nurses for wound care, post-operative recovery, injections and maternity \u2014 hourly or 4/8/12/24-hour shifts.",
  }),
  svc({
    slug: "elderly-care", name: "Elderly Care Nursing", shortName: "Elderly care",
    bucket: "services", category: "Nursing & care", icon: "elderly", cta: "enquire", homeCare: true,
    price: 149, unit: "per shift", photo: "Caregiver with an elderly person at home",
    blurb: "Dignified daily care at home \u2014 4/8/12/24-hour shift tiers. Arabic-speaking carers on request.",
    heroBlurb: "Compassionate daily support \u2014 personal care, medication, mobility and companionship \u2014 in flexible shift tiers.",
  }),
  svc({
    slug: "newborn-child-care", name: "Newborn & Child Care", shortName: "Newborn & child care",
    bucket: "services", category: "Nursing & care", icon: "child", cta: "enquire", homeCare: true,
    price: 149, unit: "per visit", nextSlot: "Tomorrow", photo: "Nurse caring for a newborn baby",
    blurb: "Certified, gentle newborn nurse visits \u2014 female caregivers.",
    heroBlurb: "Newborn and paediatric support at home \u2014 feeding guidance, jaundice monitoring and overnight care from certified female nurses.",
  }),
  svc({
    slug: "chronic-disease", name: "Chronic Disease Management", shortName: "Chronic disease management",
    bucket: "services", category: "Medical", icon: "chronic", cta: "enquire", homeCare: true,
    price: null, unit: "care plan", photo: "Clinician reviewing a patient health plan",
    blurb: "Structured, care-plan-based programs designed with your physician.",
    heroBlurb: "Ongoing programs for diabetes, hypertension and other chronic conditions \u2014 coordinated with your treating physician.",
  }),
  svc({
    slug: "lab-tests", name: "Lab Tests at Home", shortName: "Lab tests",
    bucket: "services", category: "Medical", icon: "lab", cta: "book", homeCare: true,
    price: 89, unit: "per panel", photo: "Home blood sample collection",
    blurb: "71 lab profiles and panels plus sample collection \u2014 87 individual add-on tests.",
    heroBlurb: "Accredited home sample collection across 71 panels, with 87 add-on tests and results delivered securely to your phone.",
  }),
  svc({
    slug: "teleconsultation", name: "Teleconsultation", shortName: "Teleconsultation",
    bucket: "services", category: "Medical", icon: "doctor", cta: "book", homeCare: false,
    price: 149, unit: "per consult", photo: "Online GP consultation",
    blurb: "Online GP consult from wherever you are.",
    heroBlurb: "A DHA-licensed GP consultation by video \u2014 advice, prescriptions and referrals without leaving home.",
  }),
  svc({
    slug: "travel-medical", name: "Travel Medical Assistance", shortName: "Travel medical assistance",
    bucket: "services", category: "Medical", icon: "travel", cta: "enquire", homeCare: false,
    price: null, unit: "quote", photo: "Medical travel assistance support",
    blurb: "Customised nurse support for treatment journeys \u2014 free consult, no fixed price.",
    heroBlurb: "End-to-end medical support for patients travelling for treatment \u2014 coordination, escorts and continuity of care.",
  }),
  svc({
    slug: "mens-health", name: "Men's Health", shortName: "Men's health",
    bucket: "services", category: "Therapy & wellness", icon: "wellness", cta: "enquire", homeCare: false,
    price: null, unit: "quote", photo: "Men's health consultation at home",
    blurb: "Prescriber-gated men's health \u2014 hormone and weight lab panels.",
    heroBlurb: "Men's health assessments and related hormone/weight lab panels, prescriber-gated and reviewed by a clinician.",
  }),
  svc({
    slug: "womens-health", name: "Women's Health", shortName: "Women's health",
    bucket: "services", category: "Therapy & wellness", icon: "wellness", cta: "enquire", homeCare: false,
    price: null, unit: "quote", photo: "Women's health consultation at home",
    blurb: "Prescriber-gated women's health \u2014 hormone, PCOS and perimenopause panels.",
    heroBlurb: "Women's health assessments and related hormone, PCOS and perimenopause panels, prescriber-gated and clinician-reviewed.",
  }),
  svc({
    slug: "corporate-wellness", name: "Corporate Wellness", shortName: "Corporate wellness",
    bucket: "services", category: "Therapy & wellness", icon: "shield", cta: "enquire", homeCare: false,
    price: null, unit: "bespoke quote", photo: "On-site corporate wellness day",
    blurb: "On-site nurse, screenings and drives for teams \u2014 bespoke quote.",
    heroBlurb: "Workplace wellness \u2014 on-site nurses, screenings, IV bars and vaccination drives, tailored to your team.",
  }),
];

// ===== The Dispensary bucket (page /dispensary) =========================
const dispensaryItems: Service[] = [
  svc({
    slug: "iv-therapy", name: "IV Therapy", shortName: "IV therapy",
    bucket: "dispensary", category: "Therapy & wellness", icon: "wellness", cta: "book",
    price: 399, unit: "per session", photo: "IV drip administered at home",
    blurb: "15 fixed drips grouped into ~6 families \u2014 hydration to recovery.",
    heroBlurb: "Clinician-administered IV drips at home \u2014 hydration, immunity, recovery and beauty blends. Customised drips by enquiry.",
  }),
  svc({
    slug: "nad-therapy", name: "NAD+ IV Therapy", shortName: "NAD+ IV therapy",
    bucket: "dispensary", category: "Therapy & wellness", icon: "wellness", cta: "book",
    price: 449, unit: "per session", photo: "NAD+ infusion at home",
    blurb: "Longevity NAD+ infusion \u2014 dose tiers 100 / 250 / 500 mg.",
    heroBlurb: "A clinically administered NAD+ longevity infusion in dose tiers of 100, 250 and 500 mg, delivered slowly and safely at home.",
    variants: [ { id: "100", name: "100 mg", price: 449 }, { id: "250", name: "250 mg", price: 599 }, { id: "500", name: "500 mg", price: 899 } ],
  }),
  svc({
    slug: "oxygen-therapy", name: "Oxygen Therapy", shortName: "Oxygen therapy",
    bucket: "dispensary", category: "Therapy & wellness", icon: "wellness", cta: "enquire",
    price: null, unit: "quote", photo: "Oxygen therapy setup at home",
    blurb: "Recovery and respiratory support, set up and monitored at home.",
    heroBlurb: "Supplemental oxygen therapy for recovery and respiratory support, assessed and monitored by a licensed clinician.",
  }),
  svc({
    slug: "im-shots", name: "IM Shots", shortName: "IM shots",
    bucket: "dispensary", category: "Therapy & wellness", icon: "pill", cta: "book",
    price: 149, unit: "per shot", photo: "Vitamin injection at home",
    blurb: "Injection service plus Vitamin D and Vitamin B12 (Rx only).",
    heroBlurb: "Quick single-shot IM injections at home by a nurse \u2014 including Vitamin D and Vitamin B12 (prescription only).",
  }),
  svc({
    slug: "flu-vaccination", name: "Flu Vaccination", shortName: "Flu vaccination",
    bucket: "dispensary", category: "Therapy & wellness", icon: "shield", cta: "book",
    price: 299, unit: "per dose", photo: "Flu vaccination at home",
    blurb: "Seasonal flu vaccination at home \u2014 individual (group 3+ TBC).",
    heroBlurb: "Seasonal flu vaccination at home, administered by a licensed nurse for individuals and families.",
  }),
  svc({
    slug: "genetic-testing", name: "Genetic Testing", shortName: "Genetic testing",
    bucket: "dispensary", category: "Medical", icon: "lab", cta: "enquire",
    price: null, unit: "kit ships", photo: "Home DNA sample collection kit",
    blurb: "DNA insight with clinical review \u2014 kit ships to your door.",
    heroBlurb: "DNA-based insight into health risks and traits, with a clinical review to make results actionable. Kit ships to you.",
  }),
  // Peptides \u2014 Phase 2, pending DHA/MOHAP, shown as coming soon
  svc({ slug: "peptide-bpc-157", name: "Peptide \u2014 BPC-157", shortName: "BPC-157", bucket: "dispensary", category: "Therapy & wellness", icon: "pill", cta: "soon", phase2: true, price: null, photo: "Peptide therapy \u2014 coming soon", blurb: "Recovery and gut-health support. Launching once DHA/MOHAP cleared." }),
  svc({ slug: "peptide-tb-500", name: "Peptide \u2014 TB-500", shortName: "TB-500", bucket: "dispensary", category: "Therapy & wellness", icon: "pill", cta: "soon", phase2: true, price: null, photo: "Peptide therapy \u2014 coming soon", blurb: "Tissue repair and mobility. Launching once DHA/MOHAP cleared." }),
  svc({ slug: "peptide-aod-9604", name: "Peptide \u2014 AOD-9604", shortName: "AOD-9604", bucket: "dispensary", category: "Therapy & wellness", icon: "pill", cta: "soon", phase2: true, price: null, photo: "Peptide therapy \u2014 coming soon", blurb: "Metabolic support. Launching once DHA/MOHAP cleared." }),
  svc({ slug: "peptide-thymosin-alpha-1", name: "Peptide \u2014 Thymosin Alpha-1", shortName: "Thymosin Alpha-1", bucket: "dispensary", category: "Therapy & wellness", icon: "pill", cta: "soon", phase2: true, price: null, photo: "Peptide therapy \u2014 coming soon", blurb: "Immune-system support. Launching once DHA/MOHAP cleared." }),
];

export const services: Service[] = [...serviceItems, ...dispensaryItems];

export const serviceList = serviceItems;                                  // All Services page
export const homeServiceList = serviceItems.filter((s) => s.homeCare);    // Home "Care that comes to you"
export const dispensaryList = dispensaryItems;                            // The Dispensary page

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
// Back-compat alias (home grid used to read coreServiceList).
export const coreServiceList = homeServiceList;

// ---- Packages -----------------------------------------------------------
export interface Pkg {
  slug: string;
  name: string;
  tagline: string;
  price: number;
  perUnit: string;
  features: string[];
  highlight?: boolean;
  ribbon?: string;
}

export const packages: Pkg[] = [
  {
    slug: "physio-recovery",
    name: "Physio Recovery",
    tagline: "6-session program",
    price: 1290,
    perUnit: "≈ AED 215 / session",
    features: ["6 home sessions", "Personalised plan", "Progress report"],
  },
  {
    slug: "nursing-block",
    name: "Nursing Block",
    tagline: "10 prepaid nurse hours",
    price: 799,
    perUnit: "≈ AED 80 / hour",
    features: ["Use flexibly, anytime", "Priority scheduling", "Usage statement on WhatsApp"],
    highlight: true,
    ribbon: "BEST VALUE",
  },
  {
    slug: "wellness-baseline",
    name: "Wellness Baseline",
    tagline: "Twice-yearly health panels",
    price: 990,
    perUnit: "2 × home visits",
    features: ["2 full panels / year", "Results to your phone", "Doctor review call"],
  },
];

export function getPackage(slug: string): Pkg | undefined {
  return packages.find((p) => p.slug === slug);
}

// ---- Journal ------------------------------------------------------------
export interface Article {
  slug: string;
  title: string;
  category: "Health guide" | "News & press";
  readMins: number;
  excerpt: string;
  body: string[];
  relatedServiceSlug?: string;
  photo?: string; // caption for the solid-shape image placeholder
}

export const articles: Article[] = [
  {
    slug: "home-nurses-diabetes-hypertension",
    title: "Why home care nurses are imperative for diabetes and hypertension control",
    category: "Health guide",
    readMins: 5,
    excerpt: "Consistent monitoring at home is one of the strongest predictors of good long-term control.",
    body: [
      "Diabetes and hypertension are marathon conditions, not sprints. The difference between good and poor long-term control often comes down to consistency — regular monitoring, medication adherence and timely adjustments.",
      "A home care nurse brings that consistency into the home. Regular visits mean readings are taken in a familiar environment, medications are reviewed, and small problems are caught before they become emergencies.",
      "For families juggling work and caregiving, this continuity is invaluable — and it keeps the treating physician informed with reliable, real-world data.",
    ],
    relatedServiceSlug: "home-nursing",
  },
  {
    slug: "ultimate-guide-home-health-care",
    title: "The ultimate guide to home health care services",
    category: "Health guide",
    readMins: 8,
    excerpt: "What home health care covers, who it's for, and how to choose a licensed provider in Dubai.",
    body: [
      "Home health care brings clinical services — doctor visits, nursing, physiotherapy and lab tests — into the place people recover best: their own home.",
      "This guide walks through what's covered, how licensing works in Dubai, and the questions to ask before choosing a provider.",
      "The right provider is DHA-licensed, transparent about pricing, and coordinates care with your existing physician.",
    ],
    relatedServiceSlug: "doctor-visit",
  },
  {
    slug: "iv-drip-therapy-recovery",
    title: "Why IV drip therapy is the new trend for recovery",
    category: "Health guide",
    readMins: 4,
    excerpt: "IV therapy can support hydration and recovery — but only when it's clinically administered.",
    body: [
      "IV drip therapy has moved from hospitals into homes and offices. Done well, it can support hydration, recovery and immunity.",
      "The key word is clinical. Every drip should follow a screening, be tailored to the individual, and be administered by a licensed nurse.",
      "At HealthServe, IV therapy is never a spa menu — it's a clinician-delivered service.",
    ],
    relatedServiceSlug: "iv-therapy",
  },
  {
    slug: "newborn-baby-jaundice",
    title: "Understanding newborn baby jaundice",
    category: "Health guide",
    readMins: 6,
    excerpt: "A common, usually harmless condition — but knowing when to seek help matters.",
    body: [
      "Newborn jaundice is a yellow tint to a newborn's skin and the whites of the eyes — a sign of elevated bilirubin. It usually appears in the first five days of life, and in most cases resolves safely with monitoring.",
    ],
    relatedServiceSlug: "newborn-child-care",
  },
  {
    slug: "healthserve-khaleej-times",
    title: "HealthServe in Khaleej Times",
    category: "News & press",
    readMins: 2,
    excerpt: "Our approach to home healthcare featured in the national press.",
    body: [
      "We were proud to be featured in Khaleej Times for our work bringing hospital-grade care into Dubai homes.",
      "The piece highlighted our clinical standards, our training program, and the families we've cared for since 2016.",
    ],
  },
  {
    slug: "clinical-skills-training",
    title: "Clinical skills training for our nursing team",
    category: "News & press",
    readMins: 3,
    excerpt: "Continuous training keeps our clinical standards high and our care compassionate.",
    body: [
      "Since 2022 we've run a structured clinical and soft-skills training program for our nursing team.",
      "It's how we keep standards high — and how our people grow their careers with us.",
    ],
  },
];

// Placeholder captions for the journal image slots.
const articlePhotos: Record<string, string> = {
  "home-nurses-diabetes-hypertension": "Nurse checking blood pressure at home",
  "ultimate-guide-home-health-care": "Clinician with tablet in a home setting",
  "iv-drip-therapy-recovery": "IV drip wellness treatment at home",
};
articles.forEach((a) => {
  a.photo = articlePhotos[a.slug] ?? "Home healthcare in Dubai";
});

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

// The newborn jaundice article has richer body content for the flagship post.
const jaundice = getArticle("newborn-baby-jaundice");
if (jaundice) {
  jaundice.body = [
    "Newborn jaundice is a yellow tint to a newborn's skin and the whites of the eyes — a sign of elevated bilirubin. It usually appears in the first five days of life, and in most cases resolves safely with monitoring.",
    "Most jaundice is physiological — a normal part of a newborn's liver maturing. It typically peaks around day three to five and fades over the following week or two.",
    "Persistent or deepening yellowing, poor feeding, or unusual drowsiness warrant a clinical check. A home visit avoids exposing your newborn to clinic waiting rooms, and lets a clinician assess feeding and hydration in your own environment.",
  ];
}

// ---- Careers ------------------------------------------------------------
export interface Job {
  slug: string;
  title: string;
  type: string;
  location: string;
  summary: string;
  responsibilities: string[];
}

export const jobs: Job[] = [
  {
    slug: "registered-nurse",
    title: "Female Registered Nurse — DHA license/eligibility",
    type: "Full-time",
    location: "Dubai",
    summary: "Deliver skilled home nursing care to patients across Dubai as part of a supportive clinical team.",
    responsibilities: ["Provide skilled nursing care in patients' homes", "Maintain accurate clinical records", "Coordinate with treating physicians", "Uphold DHA clinical standards"],
  },
  {
    slug: "physiotherapist",
    title: "Female Physiotherapist",
    type: "Full-time",
    location: "Dubai",
    summary: "Design and deliver personalised home rehabilitation programs for a range of patients.",
    responsibilities: ["Assess patients and set rehabilitation goals", "Deliver home physiotherapy sessions", "Track and report progress", "Advise on home equipment and exercises"],
  },
  {
    slug: "admin-hr-assistant",
    title: "Admin / HR Assistant — UAE experience",
    type: "Full-time",
    location: "Dubai",
    summary: "Keep our operations running smoothly and support the team with HR and administrative work.",
    responsibilities: ["Support scheduling and coordination", "Assist with HR administration", "Maintain records and compliance documents", "Be a friendly first point of contact"],
  },
  {
    slug: "business-development-officer",
    title: "Business Development Officer — Healthcare",
    type: "Full-time",
    location: "Dubai",
    summary: "Grow our corporate and partner relationships across the Dubai healthcare landscape.",
    responsibilities: ["Develop corporate and insurer partnerships", "Identify new service opportunities", "Represent HealthServe professionally", "Work with clinical teams on proposals"],
  },
];

export function getJob(slug: string): Job | undefined {
  return jobs.find((j) => j.slug === slug);
}

// ---- Helpers ------------------------------------------------------------
export function formatAED(n: number): string {
  return "AED " + n.toLocaleString("en-AE");
}

// Format an appointment (yyyy-mm-dd + HH:MM) as "Fri 11 Jul · 6:00 PM".
export function formatSlot(date?: string, time?: string): string {
  if (!date || !time) return "Time not set";
  const d = new Date(`${date}T${time}`);
  if (isNaN(d.getTime())) return "Time not set";
  const day = d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" });
  const t = d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
  return `${day} · ${t}`;
}

// Local yyyy-mm-dd for today (+ optional day offset). Client-side only to
// avoid SSR/hydration timezone mismatches.
export function localDate(offsetDays = 0): string {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function priceLabel(s: Service): string {
  if (s.priceType === "soon" || s.phase2) return "Coming soon";
  if (s.price == null || s.priceType === "enquire") return "Enquire";
  return (s.priceType === "from" ? "from " : "") + formatAED(s.price);
}
