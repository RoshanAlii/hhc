import type { Metadata } from "next";
import Link from "next/link";
import HelpSearch from "@/components/HelpSearch";

export const metadata: Metadata = { title: "Help centre" };

export default function HelpPage() {
  return (
    <>
      <header className="pagehd wrap">
        <span className="crumb"><Link href="/">Home</Link> / <b>Help</b></span>
        <h1>How can we help?</h1>
        <HelpSearch />
      </header>
    </>
  );
}
