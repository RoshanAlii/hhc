import Link from "next/link";
import Image from "next/image";
import BookingWidget from "@/components/BookingWidget";
import Placeholder from "@/components/Placeholder";
import Icon from "@/components/Icon";
import { coreServiceList, priceLabel, articles, COMPANY, type Category } from "@/lib/data";
import heroImage from "@/public/img/hero.png";
import esaadLogo from "@/public/img/insurance/esaad.png";
import saicoLogo from "@/public/img/insurance/saico.webp";
import almadallahLogo from "@/public/img/insurance/almadallah.png";

const toneFor = (c: Category): "orange" | "green" | "red" =>
  c === "Medical" ? "orange" : c === "Nursing & care" ? "green" : "red";

const features = [
  { icon: "calendar", cat: "cat-medical", t: "Same-day slots" },
  { icon: "shield", cat: "cat-nursing", t: "DHA-licensed team" },
  { icon: "wellness", cat: "cat-therapy", t: "Transparent pricing" },
  { icon: "refresh", cat: "cat-medical", t: "We follow up" },
];

export default function HomePage() {
  const latest = articles.slice(0, 3);

  return (
    <>
      {/* HERO */}
      <section className="hero-lite">
        <div className="hero-bg" aria-hidden="true">
          <Image src={heroImage} alt="" fill priority sizes="100vw" />
        </div>
        <div className="wrap">
          <div className="hero-lite-inner">
            <div className="hero-copy">
              <span className="kick2"><span className="d" />Home Healthcare · Dubai · Since {COMPANY.since}</span>
              <h1>Hospital-grade care, <em>in the comfort of home.</em></h1>
              <p className="lead">Licensed doctors, nurses and physiotherapists at your door. No queues, no waiting rooms.</p>
              <div className="trust">
                <span><b>DHA</b> licensed</span>
                <span><b>MOHAP</b> approved</span>
                <span><Icon name="star" size={14} /> <b>4.9</b> · 25,000+ families</span>
              </div>
              <div className="hero-actions">
                <Link className="btn btn-primary btn-lg" href="/services">Book a visit <Icon name="arrow" size={17} /></Link>
                <a className="btn btn-secondary btn-lg" href={COMPANY.whatsapp} target="_blank" rel="noreferrer">WhatsApp us</a>
              </div>
            </div>
          </div>

          <div className="hero-book"><BookingWidget /></div>

          <div className="hero-strip-lite insurance-capsule">
            <span className="lbl2">Insurance &amp; direct billing</span>
            <div className="ins">
              <span className="ins-brand esaad"><Image src={esaadLogo} alt="ESAAD" /></span>
              <span className="ins-brand wordmark sanad"><b>سند</b><small>AL SANAD</small></span>
              <span className="ins-brand wordmark saada"><b>السعادة</b><small>AL SAADA</small></span>
              <span className="ins-brand saico"><Image src={saicoLogo} alt="SAICO" /></span>
              <span className="ins-brand almadallah"><Image src={almadallahLogo} alt="Almadallah Healthcare Management" /></span>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="wrap home-sec tight home-services">
        <div className="sec-hd" style={{ marginBottom: 24 }}>
          <div>
            <span className="kicker">What we offer</span>
            <h2 className="sec">Care that comes to you</h2>
            <p>Licensed care at your doorstep - transparent prices, same-day slots.</p>
          </div>
          <Link className="btn btn-primary btn-sm" href="/services">All services <Icon name="arrow" size={14} /></Link>
        </div>
        <div className="grid3">
          {coreServiceList.map((s) => (
            <Link className="icard" key={s.slug} href={`/services/${s.slug}`}>
              <Placeholder caption={s.photo} tone={toneFor(s.category)} />
              <div className="b">
                <h3>{s.shortName}</h3>
                <p>{s.blurb}</p>
                <div className="foot">
                  <span className="price">
                    {priceLabel(s)}
                    <small>{s.priceType === "from" ? s.unit : "quote"}</small>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="howrow">
          <div className="how-s"><span className="n">1</span><div><b>Choose service &amp; time</b><span>Pick what you need and a slot that suits you.</span></div></div>
          <div className="how-s"><span className="n">2</span><div><b>Confirm address</b><span>Pay now or on the visit - your choice.</span></div></div>
          <div className="how-s"><span className="n">3</span><div><b>Open the door</b><span>A friendly, licensed clinician arrives.</span></div></div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="wrap home-sec tight">
        <div className="features">
          {features.map((f) => (
            <div className="feature" key={f.t}>
              <span className={`ic ${f.cat}`}><Icon name={f.icon} /></span>
              <h4>{f.t}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* WELLNESS BAND */}
      <section className="wrap home-sec tight">
        <div className="promoband green">
          <div className="txt">
            <span className="k">The Dispensary</span>
            <h2>IV drips, NAD+ and vitamin shots - without leaving the sofa.</h2>
            <p>Clinician-administered wellness, delivered to your door.</p>
          </div>
          <Link className="btn btn-primary btn-lg" href="/dispensary">Explore the Dispensary</Link>
        </div>
      </section>

      {/* STATS */}
      <section className="wrap home-sec tight">
        <div className="band soft">
          <div className="stat"><div className="big">{COMPANY.since}</div><div className="lb">Serving Dubai homes</div></div>
          <div className="stat"><div className="big">DHA</div><div className="lb">Licence FL-0064861</div></div>
          <div className="stat"><div className="big">MOHAP</div><div className="lb">ZM0ETT1A-090224</div></div>
          <div className="stat"><div className="big">25,000+</div><div className="lb">Families cared for</div></div>
        </div>
      </section>

      {/* JOURNAL */}
      <section className="wrap home-sec tight">
        <div className="sec-hd" style={{ marginBottom: 24 }}>
          <div>
            <span className="kicker">From our journal</span>
            <h2 className="sec">Health guidance from our team</h2>
          </div>
          <Link className="btn btn-primary btn-sm" href="/journal">Read the journal <Icon name="arrow" size={14} /></Link>
        </div>
        <div className="jgrid">
          {latest.map((a) => (
            <Link className="icard" key={a.slug} href={`/journal/${a.slug}`}>
              <Placeholder caption={a.photo} tone="neutral" />
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
          <span className="stars" aria-label="5 out of 5 stars">{[0,1,2,3,4].map(i=><Icon key={i} name="star" size={15} />)}</span>
          <p>&ldquo;The nurse arrived the same evening we called. Professional, kind, and my mother felt completely at ease.&rdquo;</p>
          <cite>Google review · verified family</cite>
        </div>
      </section>

      {/* FOR YOUR ORGANISATION */}
      <section className="wrap home-sec">
        <div className="promoband green">
          <div className="txt">
            <h2>For your organisation</h2>
            <p>Corporate wellness days, on-site nurses and group vaccinations - one provider, one invoice.</p>
          </div>
          <Link className="btn btn-primary btn-lg" href="/organizations">Inquire</Link>
        </div>
      </section>
    </>
  );
}
