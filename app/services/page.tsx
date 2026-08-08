import type { Metadata } from "next";
import Link from "next/link";
import ServicesGrid from "@/components/ServicesGrid";

export const metadata: Metadata = {
  title: "Care that comes to you",
  description: "Nine clinical services delivered at home by DHA-licensed professionals. Transparent prices, same-day slots across most of Dubai.",
};

export default function ServicesPage() {
  return (
    <>
      <header className="pagehd wrap warmtop">
        <span className="crumb"><Link href="/">Home</Link> / <b>Services</b></span>
        <h1>Care that comes to you</h1>
        <p>Nine clinical services delivered at home by DHA-licensed professionals. Transparent prices, same-day slots across most of Dubai.</p>
      </header>
      <ServicesGrid />
    </>
  );
}
