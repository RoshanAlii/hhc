"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import AccountNav from "@/components/AccountNav";
import Icon from "@/components/Icon";

type Screen = "overview" | "bookings" | "results" | "care" | "billing" | "family" | "addresses" | "profile";
type Booking = { id: string; service: string; meta: string; patient: string; date: string; time: string; address: string; status: "Confirmed" | "Pending" | "Completed" | "Cancelled"; clinician?: string; amount: number };
type FamilyMember = { id: string; name: string; relation: string; initials: string };
type Address = { id: string; label: string; detail: string; emirate: string; primary?: boolean };

const initialBookings: Booking[] = [
  { id: "HS-48291", service: "Doctor visit", meta: "General Practitioner", patient: "You", date: "Today", time: "6:00 PM", address: "Oud Metha, Dubai", status: "Confirmed", clinician: "Dr Amina Rahman", amount: 314 },
  { id: "HS-48306", service: "IV Therapy", meta: "Hydration & recovery", patient: "You", date: "Thu, 13 Aug", time: "8:30 PM", address: "Oud Metha, Dubai", status: "Pending", amount: 419 },
  { id: "HS-47118", service: "Blood panel", meta: "Comprehensive wellness", patient: "Mariam", date: "28 Jul", time: "9:00 AM", address: "DIFC, Dubai", status: "Completed", clinician: "Nurse Leena", amount: 467 },
];
const initialFamily: FamilyMember[] = [{ id: "me", name: "Member", relation: "Account holder", initials: "ME" }, { id: "mariam", name: "Mariam", relation: "Mother", initials: "MA" }];
const initialAddresses: Address[] = [{ id: "home", label: "Home", detail: "Villa 14, Oud Metha", emirate: "Dubai", primary: true }, { id: "office", label: "Office", detail: "Gate Avenue, DIFC", emirate: "Dubai" }];

function downloadFile(name: string, content: string) {
  const url = URL.createObjectURL(new Blob([content], { type: "text/plain" }));
  const anchor = document.createElement("a"); anchor.href = url; anchor.download = name; anchor.click(); URL.revokeObjectURL(url);
}

export default function PortalView({ screen }: { screen: Screen }) {
  const [bookings, setBookings] = useState(initialBookings);
  const [family, setFamily] = useState(initialFamily);
  const [addresses, setAddresses] = useState(initialAddresses);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("healthserve.portal.v1");
      if (saved) { const data = JSON.parse(saved); setBookings(data.bookings ?? initialBookings); setFamily(data.family ?? initialFamily); setAddresses(data.addresses ?? initialAddresses); }
    } catch { /* retain safe sample data */ }
  }, []);
  useEffect(() => { try { localStorage.setItem("healthserve.portal.v1", JSON.stringify({ bookings, family, addresses })); } catch { /* ignore */ } }, [bookings, family, addresses]);
  useEffect(() => { if (!notice) return; const timeout = window.setTimeout(() => setNotice(""), 3200); return () => clearTimeout(timeout); }, [notice]);

  const upcoming = bookings.filter((item) => item.status === "Confirmed" || item.status === "Pending");
  const title = { overview: "Your care, at a glance", bookings: "My bookings", results: "Results & reports", care: "Care & packages", billing: "Payments & invoices", family: "Family profiles", addresses: "Saved addresses", profile: "Profile & preferences" }[screen];

  function updateBooking(id: string, status: Booking["status"]) {
    if (status === "Cancelled" && !window.confirm("Cancel this appointment? Our care team will be notified.")) return;
    setBookings((items) => items.map((item) => item.id === id ? { ...item, status, ...(status === "Pending" ? { date: "New slot requested", time: "Awaiting confirmation" } : {}) } : item));
    setNotice(status === "Cancelled" ? "Appointment cancelled." : "Reschedule request sent to the care team.");
  }

  return (
    <div className="portal-page">
      {notice && <div className="portal-toast" role="status"><Icon name="check" size={16} />{notice}</div>}
      <div className="wrap portal-shell">
        <aside className="portal-sidebar">
          <div className="portal-member"><span>ME</span><div><b>Member</b><small>HealthServe member</small></div></div>
          <AccountNav />
          <div className="portal-support"><Icon name="heart" size={19} /><b>Need help?</b><span>Our care coordinators are available daily.</span><Link href="/help">Contact support</Link></div>
        </aside>
        <main className="portal-main">
          <header className="portal-header"><div><span className="kicker">My HealthServe</span><h1>{title}</h1><p>Manage healthcare for you and your family in one secure place.</p></div><div className="portal-head-actions"><button className="portal-bell" aria-label="Notifications"><Icon name="bell" /><i>2</i></button><Link className="btn btn-primary" href="/services">Book care</Link></div></header>
          {screen === "overview" && <Overview upcoming={upcoming} />}
          {screen === "bookings" && <Bookings bookings={bookings} updateBooking={updateBooking} />}
          {screen === "results" && <Results setNotice={setNotice} />}
          {screen === "care" && <Care />}
          {screen === "billing" && <Billing bookings={bookings} />}
          {screen === "family" && <Family family={family} setFamily={setFamily} setNotice={setNotice} />}
          {screen === "addresses" && <Addresses addresses={addresses} setAddresses={setAddresses} setNotice={setNotice} />}
          {screen === "profile" && <Profile setNotice={setNotice} />}
        </main>
      </div>
      <AccountNav mobile />
    </div>
  );
}

function Overview({ upcoming }: { upcoming: Booking[] }) {
  const next = upcoming[0];
  return <>
    <section className="portal-next">
      <div className="portal-next-top"><span><Icon name="calendar" />Next home visit</span><span className={`portal-status ${next?.status.toLowerCase()}`}>{next?.status}</span></div>
      <div className="portal-next-body"><div><small>{next?.date} · {next?.time}</small><h2>{next?.service}</h2><p>{next?.meta} · for {next?.patient}</p><div className="portal-clinician"><span>AR</span><div><small>Assigned clinician</small><b>{next?.clinician ?? "Being assigned"}</b></div></div></div><div className="portal-next-actions"><Link className="btn btn-primary" href="/account/bookings">Track & manage</Link><a className="btn btn-outline" href="https://wa.me/97143577657">WhatsApp care team</a></div></div>
      <div className="portal-timeline"><span className="done">Confirmed</span><i /><span className="current">Clinician assigned</span><i /><span>On the way</span><i /><span>Completed</span></div>
    </section>
    <div className="portal-quick-grid"><Link href="/account/results"><span className="portal-quick-icon blue"><Icon name="lab" /></span><div><small>New result</small><b>Wellness blood panel</b><p>Ready to view securely</p></div><Icon name="arrow" size={17} /></Link><Link href="/account/care"><span className="portal-quick-icon green"><Icon name="nursing" /></span><div><small>Active package</small><b>4 nursing hours left</b><p>Valid until 30 September</p></div><Icon name="arrow" size={17} /></Link><Link href="/account/billing"><span className="portal-quick-icon orange"><Icon name="doc" /></span><div><small>Documents</small><b>2 claim-ready invoices</b><p>Download for insurance</p></div><Icon name="arrow" size={17} /></Link></div>
    <section className="portal-card"><div className="portal-section-head"><div><h2>Coming up</h2><p>Your upcoming care schedule</p></div><Link href="/account/bookings">View all</Link></div>{upcoming.map((item) => <BookingRow booking={item} key={item.id} />)}</section>
    <div className="portal-actions"><Link href="/services"><Icon name="calendar" />Book a new service</Link><Link href="/account/family"><Icon name="user" />Manage family</Link><Link href="/account/results"><Icon name="lab" />View health records</Link></div>
  </>;
}

function BookingRow({ booking, actions }: { booking: Booking; actions?: React.ReactNode }) {
  return <article className="portal-booking-row"><span className="portal-booking-icon"><Icon name={booking.service.includes("IV") ? "wellness" : booking.service.includes("Blood") ? "lab" : "doctor"} /></span><div><small>{booking.date} · {booking.time}</small><b>{booking.service}</b><p>{booking.meta} · {booking.patient} · {booking.address}</p></div><span className={`portal-status ${booking.status.toLowerCase()}`}>{booking.status}</span>{actions}</article>;
}

function Bookings({ bookings, updateBooking }: { bookings: Booking[]; updateBooking: (id: string, status: Booking["status"]) => void }) {
  const [filter, setFilter] = useState("Upcoming");
  const visible = bookings.filter((item) => filter === "All" || filter === "Upcoming" ? filter === "All" || ["Confirmed", "Pending"].includes(item.status) : item.status === filter);
  return <section className="portal-card"><div className="portal-tabs">{["Upcoming", "Completed", "Cancelled", "All"].map((tab) => <button className={filter === tab ? "on" : ""} onClick={() => setFilter(tab)} key={tab}>{tab}</button>)}</div><div className="portal-bookings-list">{visible.length ? visible.map((item) => <BookingRow booking={item} key={item.id} actions={<div className="portal-row-actions">{["Confirmed", "Pending"].includes(item.status) ? <><button onClick={() => updateBooking(item.id, "Pending")}>Reschedule</button><button className="danger" onClick={() => updateBooking(item.id, "Cancelled")}>Cancel</button></> : <Link href="/services">Book again</Link>}</div>} />) : <Empty icon="calendar" title="No bookings here" text="Your appointments will appear in this section." />}</div></section>;
}

function Results({ setNotice }: { setNotice: (value: string) => void }) {
  const results = [{ name: "Comprehensive wellness panel", date: "Collected 28 Jul 2026", patient: "Mariam", status: "Ready", note: "18 markers · Doctor review available" }, { name: "Doctor visit summary", date: "Visit 14 Jul 2026", patient: "You", status: "Reviewed", note: "Care notes and prescription summary" }];
  return <><div className="portal-info"><Icon name="shield" /><div><b>Your health documents are private</b><span>Results are displayed only for the selected family profile.</span></div></div><section className="portal-card"><div className="portal-section-head"><div><h2>Latest documents</h2><p>Clinical reports and visit summaries</p></div><button className="btn btn-outline btn-sm" onClick={() => setNotice("Doctor review request sent.")}>Request doctor review</button></div>{results.map((result) => <article className="portal-result" key={result.name}><span><Icon name={result.name.includes("panel") ? "lab" : "doc"} /></span><div><small>{result.date} · {result.patient}</small><b>{result.name}</b><p>{result.note}</p></div><span className="portal-status confirmed">{result.status}</span><button className="btn btn-quiet btn-sm" onClick={() => downloadFile(`${result.name}.txt`, `${result.name}\n${result.date}\n${result.note}`)}>View & download</button></article>)}</section></>;
}

function Care() { return <div className="portal-care-grid"><section className="portal-card portal-package"><span className="tag"><span className="dot" />Active</span><h2>Nursing Block</h2><p>Flexible care hours for visits at home.</p><div className="portal-balance"><b>4</b><span>of 10 hours remaining</span></div><div className="portal-meter"><i style={{ width: "40%" }} /></div><small>Valid until 30 September 2026</small><Link className="btn btn-primary btn-full" href="/services/home-nursing">Book next visit</Link></section><section className="portal-card"><div className="portal-section-head"><div><h2>Care plan</h2><p>Recovery and ongoing support</p></div><span className="portal-status confirmed">On track</span></div><div className="portal-care-step done"><span><Icon name="check" /></span><div><b>Initial assessment</b><small>Completed 12 July</small></div></div><div className="portal-care-step current"><span>2</span><div><b>Four home sessions</b><small>2 of 4 completed</small></div></div><div className="portal-care-step"><span>3</span><div><b>Progress review</b><small>Scheduled after session 4</small></div></div></section></div>; }

function Billing({ bookings }: { bookings: Booking[] }) { return <section className="portal-card"><div className="portal-section-head"><div><h2>Invoices and payments</h2><p>VAT invoices and insurance-ready documents</p></div><span className="tag"><span className="dot" />All paid</span></div><div className="portal-table-head"><span>Invoice</span><span>Service</span><span>Amount</span><span>Status</span><span /></div>{bookings.map((item) => <div className="portal-invoice" key={item.id}><span><b>{item.id}</b><small>{item.date}</small></span><span>{item.service}</span><strong>AED {item.amount}</strong><span className="portal-status confirmed">Paid</span><button onClick={() => downloadFile(`${item.id}-invoice.txt`, `HealthServe VAT Invoice\n${item.id}\n${item.service}\nAED ${item.amount}`)}>Download</button></div>)}</section>; }

function Family({ family, setFamily, setNotice }: { family: FamilyMember[]; setFamily: React.Dispatch<React.SetStateAction<FamilyMember[]>>; setNotice: (value: string) => void }) {
  const [adding, setAdding] = useState(false); const [name, setName] = useState(""); const [relation, setRelation] = useState("");
  function add() { if (!name.trim() || !relation.trim()) return; setFamily((items) => [...items, { id: Date.now().toString(), name, relation, initials: name.slice(0, 2).toUpperCase() }]); setName(""); setRelation(""); setAdding(false); setNotice("Family profile added."); }
  return <><div className="portal-profile-grid">{family.map((member) => <article className="portal-family-card" key={member.id}><span>{member.initials}</span><div><h2>{member.name}</h2><p>{member.relation}</p></div><div><Link href="/account/bookings">Bookings</Link><Link href="/account/results">Results</Link></div></article>)}<button className="portal-add-card" onClick={() => setAdding(true)}><b>+</b><span>Add family member</span><small>Manage care for a parent, child or partner</small></button></div>{adding && <section className="portal-card portal-inline-form"><div className="portal-section-head"><h2>Add family member</h2><button onClick={() => setAdding(false)}>Close</button></div><div className="grid2"><div className="field"><label>Full name</label><input value={name} onChange={(e) => setName(e.target.value)} /></div><div className="field"><label>Relationship</label><input value={relation} onChange={(e) => setRelation(e.target.value)} placeholder="Parent, child, partner…" /></div></div><button className="btn btn-primary" onClick={add}>Save profile</button></section>}</>;
}

function Addresses({ addresses, setAddresses, setNotice }: { addresses: Address[]; setAddresses: React.Dispatch<React.SetStateAction<Address[]>>; setNotice: (value: string) => void }) {
  const [adding, setAdding] = useState(false); const [label, setLabel] = useState(""); const [detail, setDetail] = useState("");
  function add() { if (!label.trim() || !detail.trim()) return; setAddresses((items) => [...items, { id: Date.now().toString(), label, detail, emirate: "Dubai" }]); setAdding(false); setLabel(""); setDetail(""); setNotice("Address saved."); }
  return <><div className="portal-address-grid">{addresses.map((address) => <article className="portal-address" key={address.id}><span><Icon name="delivery" /></span><div><small>{address.label}{address.primary && " · Default"}</small><b>{address.detail}</b><p>{address.emirate}, UAE</p></div><div>{!address.primary && <button onClick={() => setAddresses((items) => items.map((item) => ({ ...item, primary: item.id === address.id })))}>Make default</button>}<button className="danger" onClick={() => setAddresses((items) => items.filter((item) => item.id !== address.id))}>Remove</button></div></article>)}</div><button className="btn btn-primary" onClick={() => setAdding(true)}>+ Add address</button>{adding && <section className="portal-card portal-inline-form"><div className="grid2"><div className="field"><label>Label</label><input value={label} onChange={(e) => setLabel(e.target.value)} placeholder="Home" /></div><div className="field"><label>Villa, building and street</label><input value={detail} onChange={(e) => setDetail(e.target.value)} /></div></div><div className="portal-form-actions"><button className="btn btn-primary" onClick={add}>Save address</button><button className="btn btn-quiet" onClick={() => setAdding(false)}>Cancel</button></div></section>}</>;
}

function Profile({ setNotice }: { setNotice: (value: string) => void }) {
  const [profile, setProfile] = useState({ name: "Member", mobile: "+971 50 123 4291", email: "member@example.com", dob: "", language: "English", whatsapp: true, emailUpdates: true });
  const update = (key: string, value: string | boolean) => setProfile((current) => ({ ...current, [key]: value }));
  return <div className="portal-profile-layout"><section className="portal-card"><div className="portal-section-head"><div><h2>Personal details</h2><p>Used for appointments and clinical communication</p></div><span className="portal-status confirmed">Mobile verified</span></div><div className="grid2"><div className="field"><label>Full name</label><input value={profile.name} onChange={(e) => update("name", e.target.value)} /></div><div className="field"><label>Mobile number</label><input value={profile.mobile} onChange={(e) => update("mobile", e.target.value)} /></div><div className="field"><label>Email address</label><input type="email" value={profile.email} onChange={(e) => update("email", e.target.value)} /></div><div className="field"><label>Date of birth</label><input type="date" value={profile.dob} onChange={(e) => update("dob", e.target.value)} /></div></div><button className="btn btn-primary" onClick={() => setNotice("Profile changes saved.")}>Save changes</button></section><section className="portal-card"><div className="portal-section-head"><div><h2>Communication preferences</h2><p>Choose how we keep you updated</p></div></div><label className="portal-toggle"><span><b>WhatsApp appointment updates</b><small>Confirmations and clinician arrival messages</small></span><input type="checkbox" checked={profile.whatsapp} onChange={(e) => update("whatsapp", e.target.checked)} /><i /></label><label className="portal-toggle"><span><b>Email results and invoices</b><small>Secure links when documents are ready</small></span><input type="checkbox" checked={profile.emailUpdates} onChange={(e) => update("emailUpdates", e.target.checked)} /><i /></label><div className="field"><label>Preferred language</label><select value={profile.language} onChange={(e) => update("language", e.target.value)}><option>English</option><option>العربية</option></select></div><button className="btn btn-outline" onClick={() => setNotice("Preferences updated.")}>Update preferences</button></section></div>;
}

function Empty({ icon, title, text }: { icon: string; title: string; text: string }) { return <div className="portal-empty"><span><Icon name={icon} /></span><b>{title}</b><p>{text}</p></div>; }
