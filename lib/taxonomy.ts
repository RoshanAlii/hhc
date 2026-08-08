export interface CarePath {
  id: string;
  name: string;
  description: string;
  href: string;
  icon: string;
}

export interface CatalogueGroup {
  id: string;
  name: string;
  description: string;
  pattern: RegExp;
}

export const PHYSIO_GROUPS: CatalogueGroup[] = [
  {
    id: "assessment-general",
    name: "Assessment & general physiotherapy",
    description: "Start with a home assessment or a personalised general treatment session.",
    pattern: /assessment|^physiotherapy session$/i,
  },
  {
    id: "musculoskeletal-pain",
    name: "Musculoskeletal & pain relief",
    description: "Care for back, neck, joint and persistent musculoskeletal pain.",
    pattern: /bone and joint|back and neck|pain management/i,
  },
  {
    id: "sports-performance",
    name: "Sports & advanced therapies",
    description: "Sports-injury rehabilitation, dry needling and dry cupping at home.",
    pattern: /sports injury|dry needling|dry cupping/i,
  },
  {
    id: "neurological-stroke",
    name: "Neurological & stroke rehabilitation",
    description: "Structured support for neurological recovery, movement and independence.",
    pattern: /neurological|stroke/i,
  },
  {
    id: "recovery-mobility",
    name: "Recovery & mobility",
    description: "Post-operative, general rehabilitation and older-adult mobility programmes.",
    pattern: /rehabilitation|post operative|elderly/i,
  },
  {
    id: "family-specialist",
    name: "Family & specialist physiotherapy",
    description: "Paediatric, maternity and chest physiotherapy delivered with specialist care.",
    pattern: /child|maternity|chest/i,
  },
];

export const LAB_GROUPS: CatalogueGroup[] = [
  { id: "essential-health", name: "Essential health checks", description: "Everyday blood, urine, vitamin and full-body profiles.", pattern: /blood count|urine|vitamin|mineral|full body|yearly|essential/i },
  { id: "heart-metabolic", name: "Heart & metabolic health", description: "Diabetes, cholesterol, weight, heart and lifestyle-impact profiles.", pattern: /diabet|lipid|cholesterol|heart|weight|insulin|sedentary|smoking|alcohol|energy|electrolyte/i },
  { id: "women-family", name: "Women, pregnancy & family", description: "Women’s hormones, fertility, pregnancy, post-delivery and family profiles.", pattern: /female|women|pregnan|antenatal|nipt|pcos|perimenopause|mother|couple|parents/i },
  { id: "men-hormones", name: "Men’s health & hormones", description: "Male wellness, hormone, fertility and prostate screening.", pattern: /male|men|prostate|hormone|fertility/i },
  { id: "organs-digestion", name: "Organs, thyroid & digestion", description: "Kidney, liver, thyroid, digestive and related function testing.", pattern: /kidney|liver|thyroid|digest|stool|gut/i },
  { id: "allergy-immunity", name: "Allergy, immunity & infection", description: "Allergy, intolerance, fever, flu, infection and immune-system profiles.", pattern: /allerg|intolerance|fever|flu|dengue|uti|std|infection/i },
  { id: "specialist-screening", name: "Specialist screening", description: "Cancer, heavy-metal, bone, arthritis and advanced specialist profiles.", pattern: /cancer|metal|bone|arthritis|premarital|saliva|hair|skin/i },
];

export const IV_GROUPS: CatalogueGroup[] = [
  { id: "hydration-performance", name: "Hydration, energy & performance", description: "Clinician-led hydration and performance-focused infusions.", pattern: /hydration|energy|fitness|multi vitamin/i },
  { id: "immunity-stress", name: "Immunity & stress support", description: "Wellness infusions designed around recovery and resilience goals.", pattern: /immunity|antistress|antioxidant/i },
  { id: "skin-hair", name: "Skin, hair & radiance", description: "Glutathione, skin-radiance and hair-focused treatment plans.", pattern: /skin|glow|radiant|hair|beauty/i },
  { id: "longevity-nad", name: "NAD+ & ageing support", description: "Clinician-reviewed NAD+ and ageing-support programmes.", pattern: /anti-aging|anti aging|nad/i },
  { id: "clinical-support", name: "Clinician-led specialty support", description: "Organ, metabolic, iron and chelation therapies subject to assessment.", pattern: /heart|cardio|gut|liver|diabetic|iron|blood|chelation|detox|metal/i },
  { id: "fertility-balance", name: "Fertility & hormonal balance", description: "Specialist plans requiring clinical assessment before treatment.", pattern: /fertility|female balance/i },
];

export const NURSING_PATHS: CarePath[] = [
  { id: "nurse-visit", name: "Nurse visit & procedures", description: "A focused nurse visit for clinical support at home.", href: "/services/home-nursing#options", icon: "nursing" },
  { id: "post-operative", name: "Post-operative nursing", description: "Recovery support coordinated with your treating team.", href: "/services/home-nursing#post-operative", icon: "refresh" },
  { id: "shift-nursing", name: "Shift nursing", description: "Flexible 4, 8, 12 and 24-hour nursing coverage.", href: "/services/home-nursing#options", icon: "calendar" },
  { id: "caregiver", name: "Caregiver support", description: "Daily living, mobility and companionship support.", href: "/services/home-nursing#options", icon: "heart" },
  { id: "elderly", name: "Elderly care", description: "Dignified, personalised support for older adults.", href: "/services/elderly-care", icon: "elderly" },
  { id: "mother-baby", name: "Mother, newborn & child care", description: "Home support for new families, babies and children.", href: "/services/newborn-child-care", icon: "child" },
];

export const SPECIALIST_PATHS: CarePath[] = [
  { id: "teleconsultation", name: "Teleconsultation", description: "Speak with a GP by video from wherever you are.", href: "/services/teleconsultation", icon: "doctor" },
  { id: "mens-health", name: "Men’s health", description: "Clinician-led assessments and relevant diagnostic pathways.", href: "/services/mens-health", icon: "heart" },
  { id: "womens-health", name: "Women’s health", description: "Hormone, PCOS and perimenopause assessment pathways.", href: "/services/womens-health", icon: "heart" },
  { id: "travel-medical", name: "Travel medical assistance", description: "Continuity and nursing support for treatment journeys.", href: "/services/travel-medical", icon: "travel" },
  { id: "corporate", name: "Corporate healthcare", description: "On-site nursing, screening and workforce wellness.", href: "/organizations", icon: "shield" },
];

export function catalogueGroupsFor(slug: string): CatalogueGroup[] {
  if (slug === "physiotherapy") return PHYSIO_GROUPS;
  if (slug === "lab-tests") return LAB_GROUPS;
  if (slug === "iv-therapy") return IV_GROUPS;
  return [];
}
