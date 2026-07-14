import Link from "next/link";
import BookingWidget from "@/components/BookingWidget";
import Icon from "@/components/Icon";
import { coreServiceList, priceLabel, articles, COMPANY, type Category } from "@/lib/data";

const catClass = (c: Category) =>
  c === "Medical" ? "cat-medical" : c === "Nursing & care" ? "cat-nursing" : "cat-therapy";

const features = [
  { icon: "calendar", cat: "cat-medical", t: "Same-day slots", d: "Book before 6 PM for a same-evening visit at home." },
  { icon: "shield", cat: "cat-nursing", t: "DHA-licensed team", d: "Every clinician licensed and reference-checked." },
  { icon: "wellness", cat: "cat-therapy", t: "Transparent pricing", d: "Clear prices up front — no surprises at the door." },
  { icon: "refresh", cat: "cat-medical", t: "We follow up", d: "A friendly WhatsApp check-in after every visit." },
];

export default function HomePage() {
  const latest = articles.slice(0, 3);

  return (
    <>
      {/* HERO — immersive, full-bleed */}
      <section className="hero-x">
        <span className="blob blob-a" aria-hidden="true" />
        <span className="blob blob-b" aria-hidden="true" />
        <span className="blob blob-c" aria-hidden="true" />
        <div className="wrap">
          <div className="hero-x-inner">
            <div>
              <span className="kick">Home healthcare · Dubai · since {COMPANY.since}</span>
              <h1>Hospital-grade care, <em>in the comfort of home.</em></h1>
              <p className="lead">
                DHA-licensed doctors, nurses and physiotherapists at your door — often the same day.
                No queues, no waiting rooms.
              </p>
              <div className="trust">
                <span>Caring for Dubai since <b>{COMPANY.since}</b></span>
                <span><b>DHA</b> licensed</span>
                <span><b>MOHAP</b> approved</span>
                <span><span className="star">★</span> <b>4.9</b> · 2,000+ families</span>
              </div>
            </div>

            {/* Ambient media that dissolves into the background. Drop a looping
                clip at public/hero.mp4 to replace the animation. */}
            <div className="hero-media">
              <video className="hero-video" autoPlay muted loop playsInline preload="none" poster="">
                <source src="/hero.mp4" type="video/mp4" />
              </video>
              <div className="hero-anim" aria-hidden="true">
                <span className="ring r1" />
                <span className="ring r2" />
                <span className="ring r3" />
                <svg className="ecg" viewBox="0 0 220 80" preserveAspectRatio="xMidYMid meet">
                  <path d="M4 40 H74 L84 40 L94 16 L106 64 L116 40 L124 30 L132 40 H216" />
                </svg>
                <span className="core">
                  <svg viewBox="0 0 24 24"><path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 5.5-7 10-7 10z" fill="var(--red-500)" /></svg>
                </span>
              </div>
            </div>
          </div>

          {/* Booking / search bar — full width, underneath */}
          <div className="hero-search">
            <BookingWidget />
          </div>

          <div className="hero-strip">
            <span className="lbl2">Insurance &amp; direct billing</span>
            <div className="ins">
              <span>ESAAD</span><span>Al Sanad</span><span>Al Saada</span><span>Saico</span><span>Almadallah</span>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="wrap home-sec">
        <div className="features">
          {features.map((f) => (
            <div className="feature" key={f.t}>
              <span className={`ic ${f.cat}`}><Icon name={f.icon} /></span>
              <h4>{f.t}</h4>
              <p>{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="wrap home-sec tight">
        <div className="sec-hd" style={{ marginBottom: 24 }}>
          <div>
            <span className="kicker">What we offer</span>
            <h2 className="sec">Care that comes to you</h2>
            <p>Licensed care at your doorstep — transparent prices, same-day slots.</p>
          </div>
          <Link className="btn btn-quiet btn-sm" href="/services">All services →</Link>
        </div>
        <div className="grid4">
          {coreServiceList.map((s) => (
            <Link className="svc" key={s.slug} href={s.slug === "wellness" ? "/services/wellness" : `/services/${s.slug}`}>
              <span className={`ic ${catClass(s.category)}`}><Icon name={s.icon} /></span>
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
            <span className="ic cat-therapy"><Icon name="wellness" /></span>
            <h3>Wellness services</h3>
            <p>IV drips, NAD+, panels &amp; more.</p>
            <div className="foot">
              <span className="price">from AED 150<small>8 services</small></span>
              <span className="slot"><span className="dot" />Explore</span>
            </div>
          </Link>
        </div>

        <div className="steps warm" style={{ marginTop: 28 }}>
          <div className="s"><span className="n">1</span><span>Choose service &amp; time</span></div>
          <div className="s"><span className="n">2</span><span>Confirm address · pay now or on visit</span></div>
          <div className="s"><span className="n">3</span><span>Open the door — a friendly clinician arrives</span></div>
        </div>
      </section>

      {/* WELLNESS BAND */}
      <section className="wrap home-sec tight">
        <div className="wellphoto">
          <span className="ph">Wellness, delivered at home</span>
          <div className="ovl">
            <b>Wellness, delivered at home.</b>
            <Link className="btn btn-primary btn-sm" href="/services/wellness">Explore wellness →</Link>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="wrap home-sec tight">
        <div className="band ink">
          <div className="stat"><div className="big">{COMPANY.since}</div><div className="lb">Serving Dubai homes</div></div>
          <div className="stat"><div className="big">DHA</div><div className="lb">FL-0064861</div></div>
          <div className="stat"><div className="big">MOHAP</div><div className="lb">ZM0ETT1A-090224</div></div>
          <div className="insurers">
            <span>ESAAD</span><span>Al Sanad</span><span>Al Saada</span><span>Saico</span><span>Almadallah</span>
          </div>
        </div>
      </section>

      {/* JOURNAL PREVIEW */}
      <section className="wrap home-sec tight">
        <div className="sec-hd" style={{ marginBottom: 24 }}>
          <div>
            <span className="kicker">From our journal</span>
            <h2 className="sec">Health guidance from our team</h2>
          </div>
          <Link className="btn btn-quiet btn-sm" href="/journal">Read the journal →</Link>
        </div>
        <div className="jgrid">
          {latest.map((a) => (
            <Link className="pcard" key={a.slug} href={`/journal/${a.slug}`}>
              <div className="imgph img">{a.category}</div>
              <div className="body">
                <span className={`tag${a.category === "News & press" ? " orange" : ""}`} style={{ alignSelf: "flex-start", marginBottom: 8 }}>
                  <span className="dot" />{a.category}
                </span>
                <h3 style={{ fontSize: 16 }}>{a.title}</h3>
                <div className="foot" style={{ marginTop: "auto", paddingTop: 12, display: "flex", justifyContent: "space-between" }}>
                  <span className="muted" style={{ fontSize: 12 }}>{a.readMins} min read</span>
                  <span className="btn btn-quiet btn-sm">Read</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="wrap home-sec tight">
        <div className="quoteband">
          <span className="stars" aria-label="5 stars">★★★★★</span>
          <p>
            &ldquo;The nurse arrived the same evening we called. Professional, kind, and my mother felt
            completely at ease.&rdquo;
          </p>
          <cite>Google review · verified family</cite>
        </div>
      </section>

      {/* CTA */}
      <section className="wrap home-sec">
        <div className="ctaband">
          <div className="txt">
            <h2>Ready when you are.</h2>
            <p>Book a DHA-licensed doctor, nurse or physiotherapist to your door — often the same day.</p>
          </div>
          <div className="actions">
            <Link className="btn btn-white btn-lg" href="/services">Book a visit</Link>
            <a className="btn btn-clear btn-lg" href={COMPANY.whatsapp} target="_blank" rel="noreferrer">WhatsApp us</a>
          </div>
        </div>
      </section>
    </>
  );
}
