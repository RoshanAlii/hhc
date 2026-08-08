import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/account/", "/cart/", "/checkout/", "/login/", "/order/", "/components/"] },
    ],
    sitemap: "https://healthservehhc.co/sitemap.xml",
  };
}
