import type { Metadata } from "next";
import Link from "next/link";
import ServicesGrid from "@/components/ServicesGrid";

export const metadata: Metadata = {
  title: "Home healthcare services in Dubai",
  description: "Explore doctor visits, nursing, physiotherapy, elderly care, newborn support, chronic care, lab testing and specialist home healthcare pathways in Dubai.",
};

export default function ServicesPage() {
  return (
    <>
      <header className="pagehd wrap warmtop">
        <span className="crumb"><Link href="/">Home</Link> / <b>Services</b></span>
        <span className="premium-kicker dark"><span />Care pathways · Dubai homes</span>
        <h1>Find the right care,<br />without the clinical maze.</h1>
        <p>Start with a primary service, a recovery goal or a health need. Each path leads to clear treatment options and a care coordinator who can help.</p>
      </header>
      <ServicesGrid />
    </>
  );
}
