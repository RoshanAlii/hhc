import Link from "next/link";
import BookingWidget from "@/components/BookingWidget";
import Icon from "@/components/Icon";
import { coreServiceList, priceLabel, COMPANY } from "@/lib/data";

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <div className="wrap">
        <header className="hero-solo">
          <span className="eyebrow">Home healthcare · Dubai</span>
          <h1>Hospital-grade care, in the comfort of home.</h1>
          <p className="lead">
            DHA-licensed doctors, nurses and physiotherapists at your door — often the same day.
            No queues, no waiting rooms.
          </p>
          <div className="trust">
            <span>Caring for Dubai homes since <b>{COMPANY.since}</b></span>
            <span><b>DHA</b> licensed</span>
            <span><b>MOHAP</b> approved</span>
            <span><span className="star">★</span> <b>4.9</b></span>
          </div>
          <BookingWidget />
        </header>
      </div>

      {/* SERVICES */}
      <section className="wrap" style={{ paddingBlock: 56 }}>
        <div className="sec-hd" style={{ marginBottom: 28 }}>
          <div>
            <h2 className="sec">Our services</h2>
            <p>Licensed care at your doorstep — transparent prices, same-day slots.</p>
          </div>
          <Link className="btn btn-quiet btn-sm" href="/services">All services →</Link>
        </div>
        <div className="grid4">
          {coreServiceList.map((s) => (
            <Link className="svc" key={s.slug} href={s.slug === "wellness" ? "/services/wellness" : `/services/${s.slug}`}>
              <span className="ic"><Icon name={s.icon} /></span>
              <h3>{s.shortName}</h3>
              <p>{s.blurb}</p>
              <div className="foot">
                <span className="price">
                  {priceLabel(s)}
                  <small>{s.priceType === "from" ? s.unit : s.priceType === "program" ? "tailored" : "quote"}</small>
                </span>
                <span className="slot"><span className="dot" />{s.nextSlot.split(" ")[0]}</span>
              </div>
            </Link>
          ))}
          <Link className="svc" href="/services/wellness">
            <span className="ic"><Icon name="wellness" /></span>
            <h3>Wellness services</h3>
            <p>IV drips, NAD+, panels &amp; more.</p>
            <div className="foot">
              <span className="price">from AED 150<small>8 services</small></span>
              <span className="slot"><span className="dot" />Explore</span>
            </div>
          </Link>
        </div>
      </section>

      {/* STEPS */}
      <div className="wrap">
        <div className="steps">
          <div className="s"><span className="n">1</span><span>Choose service &amp; time</span></div>
          <div className="s"><span className="n">2</span><span>Confirm address · pay now or on visit</span></div>
          <div className="s"><span className="n">3</span><span>Open the door — clinician arrives</span></div>
        </div>
      </div>

      {/* WELLNESS BAND */}
      <section className="wrap" style={{ paddingBlock: "48px 0" }}>
        <div className="wellphoto">
          <span className="ph">Wellness, delivered at home</span>
          <div className="ovl">
            <b>Wellness, delivered at home.</b>
            <Link className="btn btn-primary btn-sm" href="/services/wellness">Explore wellness →</Link>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="wrap" style={{ paddingBlock: "40px 0" }}>
        <div className="band">
          <div className="stat"><div className="big">{COMPANY.since}</div><div className="lb">Serving Dubai homes</div></div>
          <div className="stat"><div className="big">DHA</div><div className="lb">FL-0064861</div></div>
          <div className="stat"><div className="big">MOHAP</div><div className="lb">ZM0ETT1A-090224</div></div>
          <div className="insurers">
            <span>ESAAD</span><span>Al Sanad</span><span>Al Saada</span><span>Saico</span><span>Almadallah</span>
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="wrap" style={{ paddingBlock: "24px 56px" }}>
        <div className="quoteband">
          <span className="stars" aria-label="5 stars">★★★★★</span>
          <p>
            &ldquo;The nurse arrived the same evening we called. Professional, kind, and my mother felt
            completely at ease.&rdquo;
          </p>
          <cite>Google review · verified family</cite>
        </div>
      </section>
    </>
  );
}
