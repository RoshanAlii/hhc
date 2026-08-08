import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/lib/cart";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "HealthServe — Home healthcare in Dubai",
    template: "%s | HealthServe",
  },
  description:
    "Hospital-grade care in the comfort of home. DHA-licensed doctors, nurses and physiotherapists with appointments coordinated across Dubai.",
  metadataBase: new URL("https://healthservehhc.co"),
  openGraph: {
    type: "website",
    locale: "en_AE",
    siteName: "HealthServe Home Healthcare",
    title: "HealthServe — Premium home healthcare in Dubai",
    description: "Licensed doctors, nurses and physiotherapists delivering attentive care across Dubai homes.",
    images: [{ url: "/img/hero-premium-v2.jpg", width: 1823, height: 863, alt: "HealthServe home healthcare in Dubai" }],
  },
  twitter: { card: "summary_large_image", images: ["/img/hero-premium-v2.jpg"] },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr">
      <body>
        <a className="skip-link" href="#main-content">Skip to main content</a>
        <CartProvider>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
        </CartProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalOrganization",
            name: "HealthServe Home Healthcare",
            url: "https://healthservehhc.co",
            telephone: "+97143577657",
            email: "info@healthservehhc.co",
            address: { "@type": "PostalAddress", addressLocality: "Dubai", addressCountry: "AE" },
            areaServed: { "@type": "City", name: "Dubai" },
          }) }}
        />
      </body>
    </html>
  );
}
