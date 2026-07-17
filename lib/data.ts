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
export type PriceType = "from" | "fixed" | "program" | "enquire";

export interface Variant {
  id: string;
  name: string;
  price: number;
}

export interface Service {
  slug: string;
  name: string;
  shortName: string;
  group: "core" | "wellness";
  category: Category;
  icon: string;
  blurb: string;
  price: number | null;
  priceType: PriceType;
  unit: string;
  nextSlot: string;
  featured?: boolean;
  image?: string;
  heroTitle: string;
  heroBlurb: string;
  variants?: Variant[];
  includes: string[];
  howItWorks: string[];
  faqs: { q: string; a: string }[];
}

const doctorVisit: Service = {
  slug: "doctor-visit",
  name: "Doctor visit & consultation",
  shortName: "Doctors visit & consultation",
  group: "core",
  category: "Medical",
  icon: "doctor",
  blurb: "A DHA-licensed GP at your door for assessment, treatment and prescriptions — often within hours.",
  price: 350,
  priceType: "from",
  unit: "per visit",
  nextSlot: "Today 6:00 PM",
  featured: true,
  heroTitle: "A doctor at your door — often within hours.",
  heroBlurb:
    "DHA-licensed general practitioners visit you at home, your office, or your hotel for assessment, treatment and prescriptions. No clinic, no waiting room.",
  variants: [
    { id: "gp", name: "GP visit", price: 350 },
    { id: "specialist", name: "Specialist", price: 550 },
    { id: "video", name: "Video first", price: 150 },
  ],
  includes: [
    "Full clinical assessment and vitals",
    "Diagnosis and a clear treatment plan",
    "Prescriptions where appropriate",
    "Referral for labs or specialist care — samples can be taken at the same visit",
    "Visit summary shared with you, and your regular physician on request",
  ],
  howItWorks: [
    "Choose a time — same-evening slots available when you book before 6 PM.",
    "Your doctor arrives with everything needed for a standard consultation.",
    "You get a clear plan — and we follow up on WhatsApp.",
  ],
  faqs: [
    { q: "How soon can a doctor arrive?", a: "Often within 2–3 hours inside Dubai. Book before 6 PM for a same-evening visit." },
    { q: "Which areas do you cover?", a: "Most of Dubai. Enter your area at booking and we confirm instantly." },
    { q: "Can I claim on insurance?", a: "We issue claim-ready invoices for reimbursement; direct billing with select partners — see About." },
    { q: "What if the doctor recommends tests?", a: "We can take samples during the same visit via lab tests at home, results to your phone." },
  ],
};

function core(
  slug: string,
  name: string,
  category: Category,
  icon: string,
  price: number | null,
  priceType: PriceType,
  unit: string,
  nextSlot: string,
  blurb: string,
  heroTitle: string,
  heroBlurb: string,
  includes: string[],
  shortName = name,
): Service {
  return {
    slug, name, shortName, group: "core", category, icon, price, priceType, unit, nextSlot, blurb,
    heroTitle, heroBlurb, includes,
    howItWorks: [
      "Choose a service and time that suits you — same-day slots across most of Dubai.",
      "A DHA-licensed clinician arrives at your door, fully equipped.",
      "You get a clear plan and a claim-ready invoice, with WhatsApp follow-up.",
    ],
    faqs: [
      { q: "Which areas do you cover?", a: "Most of Dubai. Enter your area at booking and we confirm instantly." },
      { q: "Can I claim on insurance?", a: "We issue claim-ready invoices; direct billing with select partners." },
      { q: "Can I reschedule?", a: "Yes — free up to 2 hours before your slot. See our cancellation policy." },
    ],
  };
}

const coreServices: Service[] = [
  doctorVisit,
  core(
    "home-nursing", "Home nursing services", "Nursing & care", "nursing", 90, "from", "per hour", "Today",
    "Hourly to live-in skilled nursing, including maternity care.",
    "Skilled nursing, at home — hourly to 24/7.",
    "DHA-licensed nurses for wound care, post-operative recovery, injections, maternity and live-in care — delivered on your schedule.",
    ["Skilled and practical nursing at home", "Wound care, injections and post-op recovery", "Maternity and newborn support", "Hourly, daily, or live-in arrangements", "Care plan reported to your treating physician"],
    "Home nursing",
  ),
  core(
    "physiotherapy", "Physiotherapy & fitness", "Therapy & wellness", "physio", 250, "from", "per session", "Tomorrow",
    "Personalised recovery and mobility programs at home.",
    "Recover and move better — physiotherapy at home.",
    "Personalised rehabilitation, post-surgical recovery and mobility programs delivered by licensed physiotherapists in the comfort of your home.",
    ["Individualised assessment and goals", "Post-surgical and injury rehabilitation", "Mobility, strength and balance programs", "Progress reviews after each block", "Equipment guidance for the home"],
    "Physiotherapy",
  ),
  core(
    "elderly-care", "Elderly care nursing", "Nursing & care", "elderly", 85, "from", "per hour", "Today",
    "Dignified daily care at home. Arabic-speaking carers on request.",
    "Dignified elderly care, at home.",
    "Compassionate daily support — personal care, medication, mobility and companionship — from trained carers, with Arabic-speaking staff available.",
    ["Personal care and daily living support", "Medication management and reminders", "Mobility assistance and fall prevention", "Arabic-speaking carers on request", "Regular family updates"],
    "Elderly care",
  ),
  core(
    "newborn-child-care", "Newborn & child care", "Nursing & care", "child", 90, "from", "per hour", "Tomorrow",
    "Certified, gentle support — female caregivers.",
    "Gentle, certified care for your little ones.",
    "Newborn and paediatric support at home — feeding guidance, jaundice monitoring and overnight care from certified female caregivers.",
    ["Newborn feeding and settling support", "Jaundice monitoring and vitals", "Overnight and daytime care", "Certified female caregivers", "Guidance for new parents"],
    "Newborn & child care",
  ),
  core(
    "lab-tests", "Lab tests at home", "Medical", "lab", 300, "from", "per panel", "Today",
    "Blood draws and panels at home — results to your phone.",
    "Lab tests at home — results to your phone.",
    "Accredited home sample collection for a wide range of panels, with results delivered securely to your phone and a doctor review on request.",
    ["Home blood draw by a trained phlebotomist", "Wide range of accredited panels", "Secure digital results to your phone", "Optional doctor review call", "Samples can be taken during a doctor visit"],
    "Lab tests",
  ),
  core(
    "chronic-disease", "Chronic disease management", "Medical", "chronic", null, "program", "program", "Book",
    "Structured programs designed with your physician.",
    "Manage chronic conditions, at home.",
    "Structured, ongoing programs for diabetes, hypertension and other chronic conditions — coordinated with your treating physician and delivered by our home care team.",
    ["Personalised care plan with your physician", "Regular home monitoring and reviews", "Medication and lifestyle support", "Coordinated nursing and doctor visits", "Progress reporting to your care team"],
    "Chronic disease management",
  ),
  core(
    "travel-medical", "Travel medical assistance", "Medical", "travel", null, "enquire", "quote", "Enquire",
    "Medical support for treatment journeys abroad.",
    "Travel medical assistance.",
    "End-to-end medical support for patients travelling for treatment — coordination, escorts and continuity of care across borders.",
    ["Pre-travel medical assessment", "Medical escort and coordination", "Liaison with treating facilities", "Continuity of care on return", "Support for individuals and delegations"],
    "Travel medical assistance",
  ),
];

function wellness(slug: string, name: string, icon: string, price: number | null, priceType: PriceType, blurb: string, heroBlurb: string, includes: string[]): Service {
  return {
    slug, name, shortName: name, group: "wellness", category: "Therapy & wellness", icon,
    price, priceType, unit: "per session", nextSlot: priceType === "enquire" ? "Enquire" : "Today", blurb,
    heroTitle: name + " — clinician-delivered, at home.",
    heroBlurb,
    includes,
    howItWorks: [
      "Choose your wellness service and a time that suits you.",
      "A DHA-licensed clinician administers it at your home or office.",
      "You receive aftercare guidance and a summary on WhatsApp.",
    ],
    faqs: [
      { q: "Is this clinically administered?", a: "Yes — every drip, panel and program is administered by DHA-licensed clinicians." },
      { q: "Where can I book this?", a: "At your home or office, across most of Dubai." },
    ],
  };
}

const wellnessServices: Service[] = [
  wellness("iv-therapy", "IV therapy", "wellness", 450, "from", "6 drip families, hydration to recovery.",
    "Six IV drip families — from hydration to recovery — administered at home by DHA-licensed clinicians.",
    ["Clinical screening before every drip", "Hydration, recovery and immunity blends", "Administered by a licensed nurse", "30–45 minute sessions", "Aftercare guidance"]),
  wellness("nad-therapy", "NAD+ therapy", "wellness", 1200, "from", "Longevity protocol, clinically administered.",
    "A clinically administered NAD+ longevity protocol, delivered slowly and safely in the comfort of home.",
    ["Pre-session clinical review", "Slow, monitored NAD+ infusion", "Comfort and hydration support", "Administered by a licensed clinician"]),
  wellness("oxygen-therapy", "Oxygen therapy", "wellness", 400, "from", "Recovery and respiratory support.",
    "Supplemental oxygen therapy for recovery and respiratory support, set up and monitored at home.",
    ["Clinical assessment of suitability", "Equipment setup and monitoring", "Recovery and respiratory support", "Licensed clinician oversight"]),
  wellness("corporate-wellness", "Corporate wellness", "wellness", null, "enquire", "Programs for teams — enquire.",
    "Wellness programs for teams — screenings, IV bars and vaccination drives, delivered at your workplace.",
    ["On-site screenings and IV bars", "Vaccination and flu drives", "Tailored to your team size", "One provider, one invoice"]),
  wellness("mens-health", "Men's health", "wellness", 600, "from", "Panels and programs.",
    "Comprehensive men's health panels and programs with clinical review, at home.",
    ["Comprehensive health panel", "Home sample collection", "Doctor review of results", "Personalised recommendations"]),
  wellness("womens-health", "Women's health", "wellness", 600, "from", "Panels and programs.",
    "Comprehensive women's health panels and programs with clinical review, at home.",
    ["Comprehensive health panel", "Home sample collection", "Doctor review of results", "Personalised recommendations"]),
  wellness("genetic-testing", "Genetic testing", "wellness", 900, "from", "DNA insight with clinical review.",
    "DNA-based insight into health risks and traits, with a clinical review to make results actionable.",
    ["Simple home sample collection", "Accredited genetic analysis", "Clinical review of findings", "Actionable recommendations"]),
  wellness("flu-vaccination", "Flu vaccination", "wellness", 150, "from", "Seasonal, at home — individual or family.",
    "Seasonal flu vaccination at home for individuals and families, administered by a licensed nurse.",
    ["Licensed nurse administration", "Individual or family bookings", "Suitable for all ages on assessment", "Aftercare guidance"]),
];

export const services: Service[] = [...coreServices, ...wellnessServices];

// Attach the official brand illustrations to the core services (in order).
const serviceImages: Record<string, string> = {
  "doctor-visit": "/img/svc-1.png",
  "home-nursing": "/img/svc-2.png",
  "physiotherapy": "/img/svc-3.png",
  "elderly-care": "/img/svc-4.png",
  "newborn-child-care": "/img/svc-5.png",
  "lab-tests": "/img/svc-6.png",
  "chronic-disease": "/img/svc-7.png",
  "travel-medical": "/img/svc-8.png",
};
for (const s of services) {
  if (serviceImages[s.slug]) s.image = serviceImages[s.slug];
}

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
export const coreServiceList = coreServices;
export const wellnessServiceList = wellnessServices;

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
  image?: string;
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

// Attach the brand blog illustrations (cycled across the posts).
articles.forEach((a, i) => {
  a.image = `/img/post-${(i % 3) + 1}.png`;
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
  if (s.priceType === "enquire") return "Enquire";
  if (s.priceType === "program") return "Program";
  if (s.price == null) return "Enquire";
  return (s.priceType === "from" ? "from " : "") + formatAED(s.price);
}
