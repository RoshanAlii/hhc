import Link from "next/link";
import Logo from "./Logo";
import { COMPANY } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="site">
      <div className="wrap">
        <div className="fcols">
          <div>
            <Link className="hs-logo" href="/"><Logo width={170} tagline={false} /></Link>
            <p>DHA-licensed home healthcare provider. {COMPANY.address}. {COMPANY.hours}.</p>
          </div>
          <div>
            <h4>Services</h4>
            <Link href="/services/doctor-visit">Doctor visits</Link>
            <Link href="/services/home-nursing">Home nursing</Link>
            <Link href="/services/physiotherapy">Physiotherapy</Link>
            <Link href="/services/wellness">Wellness &amp; IV</Link>
            <Link href="/packages">Packages</Link>
          </div>
          <div>
            <h4>Company</h4>
            <Link href="/about">About</Link>
            <Link href="/journal">Journal</Link>
            <Link href="/careers">Careers</Link>
            <Link href="/organizations">For organizations</Link>
            <Link href="/contact">Contact</Link>
          </div>
          <div>
            <h4>Support</h4>
            <Link href="/help">Help centre</Link>
            <Link href="/cancellation">Cancellation &amp; refund</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/privacy">Terms</Link>
          </div>
        </div>
        <div className="legal">
          <span>© 2026 {COMPANY.name} · {COMPANY.dha} · {COMPANY.mohap}</span>
          <span>
            <a href={COMPANY.phoneHref}>{COMPANY.phoneLabel}</a> ·{" "}
            <a href={COMPANY.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a> · {COMPANY.email}
          </span>
        </div>
      </div>
    </footer>
  );
}
