import Link from "next/link";
import Image from "next/image";
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
      {/* HERO — light, warm, with the brand illustration */}
      <section className="hero-lite">
        <div className="wrap">
          <div className="hero-lite-inner">
            <div>
              <span className="kick2"><span className="d" />Home Healthcare · Dubai · Since {COMPANY.since}</span>
              <h1>Hospital-grade care, <em>in the comfort of home.</em></h1>
              <p className="lead">Licensed doctors, nurses and physiotherapists at your door. No queues, no waiting rooms.</p>
              <div className="trust">
                <span><b>DHA</b> licensed</span>
                <span><b>MOHAP</b> approved</span>
                <span><span className="star">★</span> <b>4.9</b> · 25,000+ families</span>
              </div>
              <div className="hero-actions">
                <Link className="btn btn-primary btn-lg" href="/services">Book a visit</Link>
                <a className="btn btn-outline btn-lg" href={COMPANY.whatsapp} target="_blank" rel="noreferrer">WhatsApp us</a>
              </div>
            </div>
            <div className="hero-art">
              <Image src="/img/hero.png" width={1100} height={920} alt="A licensed clinician caring for an elderly patient at home" priority />
            </div>
          </div>

          <div className="hero-book">
            <BookingWidget />
          </div>

          <div className="hero-strip-lite">
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

      {/* SERVICES — real illustrations */}
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
            <Link className="icard" key={s.slug} href={`/services/${s.slug}`}>
              <Image className="ph" src={s.image!} width={640} height={360} alt={s.shortName} />
              <div className="b">
                <h3>{s.shortName}</h3>
                <p>{s.blurb}</p>
                <div className="foot">
                  <span className="price">
                    {priceLabel(s)}
                    <small>{s.priceType === "from" ? s.unit : s.priceType === "program" ? "tailored" : "quote"}</small>
                  </span>
                  <span className="slot"><span className="dot" />{s.nextSlot.split(" ")[0]}</span>
                </div>
              </div>
            </Link>
          ))}
          <Link className="icard" href="/services/wellness">
            <div className="ph" style={{ background: "linear-gradient(120deg,var(--green-200),var(--green-500))", aspectRatio: "16/9" }} />
            <div className="b">
              <h3>Wellness services</h3>
              <p>IV drips, NAD+, panels &amp; more.</p>
              <div className="foot">
                <span className="price">from AED 150<small>8 services</small></span>
                <span className="slot"><span className="dot" />Explore</span>
              </div>
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
          <div className="stat"><div className="big">25,000+</div><div className="lb">Families cared for</div></div>
        </div>
      </section>

      {/* JOURNAL PREVIEW — real illustrations */}
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
            <Link className="icard" key={a.slug} href={`/journal/${a.slug}`}>
              <Image className="ph" src={a.image!} width={760} height={440} alt={a.title} />
              <div className="b">
                <span className={`tag${a.category === "News & press" ? " orange" : ""}`} style={{ alignSelf: "flex-start", marginBottom: 8 }}>
                  <span className="dot" />{a.category}
                </span>
                <h3 style={{ fontSize: 16 }}>{a.title}</h3>
                <div className="foot">
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
