import type { Metadata } from "next";
import Link from "next/link";
import JournalGrid from "@/components/JournalGrid";

export const metadata: Metadata = {
  title: "Journal",
  description: "Practical health guidance and news from HealthServe's clinical team — a decade of caring for Dubai homes.",
};

export default function JournalPage() {
  return (
    <>
      <header className="pagehd wrap">
        <span className="crumb"><Link href="/">Home</Link> / <b>Journal</b></span>
        <h1>Practical health guidance, from our clinical team.</h1>
        <p>Guides and news from a decade of caring for Dubai homes.</p>
      </header>
      <JournalGrid />
    </>
  );
}
