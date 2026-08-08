import { articles, jobs, packages, services } from "@/lib/data";
import { serviceOptions } from "@/lib/variants";

export interface SearchItem {
  id: string;
  title: string;
  description: string;
  section: string;
  href: string;
  icon: string;
  keywords: string;
}

const SERVICE_SYNONYMS: Record<string, string> = {
  "doctor-visit": "doctor gp physician consultation prescription diagnosis sick hotel visit",
  physiotherapy: "physio physiotherapist rehabilitation rehab sports injury pain mobility exercise therapy",
  "home-nursing": "nurse nursing wound care caregiver injection drip post operative shift",
  "elderly-care": "elderly senior older adult geriatric caregiver companionship",
  "newborn-child-care": "newborn baby infant child children pediatric paediatric maternity mother",
  "chronic-disease": "diabetes hypertension blood pressure long term condition care plan",
  "lab-tests": "lab laboratory blood test diagnostic testing sample collection screening profile",
  teleconsultation: "online doctor video call remote consultation telemedicine",
  "travel-medical": "medical travel nurse escort treatment journey",
  "mens-health": "male hormone weight health",
  "womens-health": "female hormone pcos perimenopause health",
  "corporate-wellness": "company workplace employee business vaccination screening",
  "iv-therapy": "iv drip infusion hydration energy immunity recovery wellness",
  "nad-therapy": "nad infusion energy longevity anti aging",
  "oxygen-therapy": "oxygen respiratory breathing recovery",
  "im-shots": "injection vitamin b12 vitamin d intramuscular shot",
  "flu-vaccination": "flu vaccine vaccination immunisation immunization",
  "genetic-testing": "dna genetics test kit traits health risks",
};

const PAGE_ITEMS: SearchItem[] = [
  { id: "page-home", title: "Home Care", description: "Doctors, nurses, physiotherapy and diagnostics at home.", section: "Page", href: "/", icon: "heart", keywords: "home healthcare dubai care" },
  { id: "page-services", title: "All Services", description: "Browse every home healthcare service.", section: "Page", href: "/services", icon: "search", keywords: "all services catalogue treatments" },
  { id: "page-dispensary", title: "The Dispensary", description: "IV therapy, wellness, testing and treatment options.", section: "Page", href: "/dispensary", icon: "pill", keywords: "dispensary products wellness treatments" },
  { id: "page-health", title: "Your Health", description: "Free health calculators and practical tools.", section: "Page", href: "/your-health", icon: "heart", keywords: "bmi calories water health calculator tools" },
  { id: "page-packages", title: "Care Packages", description: "Packages for recurring and ongoing care.", section: "Page", href: "/packages", icon: "calendar", keywords: "packages plans recurring prepaid" },
  { id: "page-contact", title: "Contact HealthServe", description: "Call, WhatsApp or send an enquiry.", section: "Page", href: "/contact", icon: "user", keywords: "contact phone whatsapp email location" },
  { id: "page-help", title: "Help Centre", description: "Answers about booking, care, payments and policies.", section: "Page", href: "/help", icon: "doc", keywords: "help faq support booking cancellation refund" },
  { id: "page-about", title: "About HealthServe", description: "Our team, standards and story.", section: "Page", href: "/about", icon: "shield", keywords: "about company dha mohap license standards" },
  { id: "page-careers", title: "Careers", description: "Explore open healthcare roles in Dubai.", section: "Page", href: "/careers", icon: "user", keywords: "career jobs vacancies nurse physiotherapist hiring" },
];

const serviceItems: SearchItem[] = services.map((service) => ({
  id: `service-${service.slug}`,
  title: service.name,
  description: service.blurb,
  section: service.bucket === "dispensary" ? "Dispensary" : "Service",
  href: `/services/${service.slug}`,
  icon: service.icon,
  keywords: [service.shortName, service.heroTitle, service.heroBlurb, service.category, SERVICE_SYNONYMS[service.slug] ?? ""].join(" "),
}));

const productItems: SearchItem[] = services.flatMap((service) => {
  const seen = new Set<string>();
  return (serviceOptions[service.slug] ?? []).flatMap((option) => {
    const key = option.name.trim().toLowerCase();
    if (seen.has(key)) return [];
    seen.add(key);
    return [{
      id: `product-${service.slug}-${seen.size}`,
      title: option.name,
      description: `${service.shortName}${option.label ? ` · ${option.label}` : ""}`,
      section: option.addon ? "Add-on test" : "Treatment option",
      href: `/services/${service.slug}#catalogue`,
      icon: service.icon,
      keywords: `${service.name} ${service.blurb} ${option.label ?? ""} ${SERVICE_SYNONYMS[service.slug] ?? ""}`,
    }];
  });
});

const articleItems: SearchItem[] = articles.map((article) => ({
  id: `article-${article.slug}`,
  title: article.title,
  description: article.excerpt,
  section: "Journal",
  href: `/journal/${article.slug}`,
  icon: "doc",
  keywords: `${article.category} ${article.body.join(" ")}`,
}));

const packageItems: SearchItem[] = packages.map((item) => ({
  id: `package-${item.slug}`,
  title: item.name,
  description: `${item.tagline} · ${item.features.join(" · ")}`,
  section: "Package",
  href: "/packages",
  icon: "calendar",
  keywords: `${item.perUnit} ${item.features.join(" ")}`,
}));

const jobItems: SearchItem[] = jobs.map((job) => ({
  id: `job-${job.slug}`,
  title: job.title,
  description: `${job.type} · ${job.location}`,
  section: "Career",
  href: `/careers/${job.slug}`,
  icon: "user",
  keywords: `${job.summary} ${job.responsibilities.join(" ")}`,
}));

export const SITE_SEARCH_ITEMS: SearchItem[] = [
  ...PAGE_ITEMS,
  ...serviceItems,
  ...productItems,
  ...articleItems,
  ...packageItems,
  ...jobItems,
];

function normalize(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9+]+/g, " ")
    .trim();
}

function editDistance(a: string, b: string): number {
  if (!a.length) return b.length;
  if (!b.length) return a.length;
  const previous = Array.from({ length: b.length + 1 }, (_, index) => index);
  for (let row = 1; row <= a.length; row += 1) {
    const current = [row];
    for (let column = 1; column <= b.length; column += 1) {
      current[column] = Math.min(
        current[column - 1] + 1,
        previous[column] + 1,
        previous[column - 1] + (a[row - 1] === b[column - 1] ? 0 : 1),
      );
    }
    previous.splice(0, previous.length, ...current);
  }
  return previous[b.length];
}

function similarity(a: string, b: string): number {
  const longest = Math.max(a.length, b.length);
  return longest ? 1 - editDistance(a, b) / longest : 1;
}

function scoreItem(item: SearchItem, rawQuery: string): number | null {
  const query = normalize(rawQuery);
  if (!query) return null;
  const title = normalize(item.title);
  const description = normalize(item.description);
  const keywords = normalize(item.keywords);
  const haystack = `${title} ${description} ${keywords}`;

  if (title === query) return 0;
  if (title.startsWith(query)) return 8 + (title.length - query.length) / 100;
  const titleIndex = title.indexOf(query);
  if (titleIndex >= 0) return 18 + titleIndex / 100;
  const contentIndex = `${description} ${keywords}`.indexOf(query);
  if (contentIndex >= 0) return 32 + contentIndex / 100;

  const queryWords = query.split(" ").filter(Boolean);
  const haystackWords = haystack.split(" ").filter(Boolean);
  const wordScores = queryWords.map((queryWord) => {
    if (haystackWords.includes(queryWord)) return 1;
    if (haystackWords.some((word) => word.startsWith(queryWord) || queryWord.startsWith(word))) return 0.9;
    return haystackWords.reduce((best, word) => Math.max(best, similarity(queryWord, word)), 0);
  });
  const average = wordScores.reduce((sum, value) => sum + value, 0) / wordScores.length;
  const minimum = Math.min(...wordScores);
  if (average >= 0.74 && minimum >= 0.58) return 60 + (1 - average) * 30;

  const wholeTitleSimilarity = similarity(query, title);
  if (query.length >= 4 && wholeTitleSimilarity >= 0.68) return 82 + (1 - wholeTitleSimilarity) * 10;
  return null;
}

export function searchSite(query: string, limit = 8): SearchItem[] {
  if (!query.trim()) return [];
  return SITE_SEARCH_ITEMS
    .map((item) => ({ item, score: scoreItem(item, query) }))
    .filter((entry): entry is { item: SearchItem; score: number } => entry.score != null)
    .sort((a, b) => a.score - b.score || a.item.title.localeCompare(b.item.title))
    .slice(0, limit)
    .map((entry) => entry.item);
}
