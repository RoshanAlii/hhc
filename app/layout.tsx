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
    "Hospital-grade care in the comfort of home. DHA-licensed doctors, nurses and physiotherapists at your door across Dubai — often the same day.",
  metadataBase: new URL("https://healthservehhc.co"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr">
      <body>
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
