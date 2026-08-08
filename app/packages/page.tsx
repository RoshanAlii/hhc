import type { Metadata } from "next";
import Link from "next/link";
import PackagesGrid from "@/components/PackagesGrid";

export const metadata: Metadata = {
  title: "Care packages",
  description: "Better value for ongoing care — every package delivered by the same DHA-licensed team, with priority scheduling.",
};

export default function PackagesPage() {
  return (
    <>
      <header className="pagehd wrap">
        <span className="crumb"><Link href="/">Home</Link> / <b>Packages</b></span>
        <h1>Better value for ongoing care.</h1>
        <p>Every package is delivered by the same DHA-licensed team, with priority scheduling.</p>
      </header>
      <div className="wrap" style={{ paddingBottom: 80 }}>
        <PackagesGrid />
        <details style={{ marginTop: 24, maxWidth: 640 }}>
          <summary>How do I track remaining hours?</summary>
          <p>We send a usage statement on WhatsApp after every visit. Online balance tracking arrives with accounts later this year.</p>
        </details>
      </div>
    </>
  );
}
