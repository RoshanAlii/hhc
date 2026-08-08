import type { MetadataRoute } from "next";

export const dynamic = "force-static";
import { articles, services } from "@/lib/data";

const base = "https://healthservehhc.co";

export default function sitemap(): MetadataRoute.Sitemap {
  const core = ["", "/services", "/dispensary", "/packages", "/about", "/contact", "/journal", "/organizations", "/help", "/cancellation", "/privacy", "/terms"];
  return [
    ...core.map((path) => ({ url: `${base}${path}`, changeFrequency: path === "" ? "weekly" as const : "monthly" as const, priority: path === "" ? 1 : path === "/services" ? 0.9 : 0.7 })),
    ...services.filter((service) => !service.phase2).map((service) => ({ url: `${base}/services/${service.slug}`, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...articles.map((article) => ({ url: `${base}/journal/${article.slug}`, changeFrequency: "yearly" as const, priority: 0.6 })),
  ];
}
