import { COMPANY } from "@/lib/data";

export default function ApplyForm({ role }: { role: string }) {
  const subject = encodeURIComponent(`Application: ${role}`);
  const body = encodeURIComponent(`Hello HealthServe HR,\n\nI would like to apply for ${role}. I will attach my CV to this email.\n\nName:\nMobile:\nLinkedIn (optional):\n\nThank you.`);
  return (
    <section className="panel" aria-labelledby="apply-title">
      <div className="lbl">Apply for this role</div>
      <h2 id="apply-title" className="blk">Send your CV directly to HealthServe.</h2>
      <p className="muted" style={{ fontSize: 15, marginBottom: 18 }}>Your email app will open with the role and a short application template. Attach your CV before sending.</p>
      <a className="btn btn-primary btn-full" href={`mailto:${COMPANY.email}?subject=${subject}&body=${body}`}>Open email application</a>
      <p className="form-privacy">Recipient: {COMPANY.email}. No application data is collected by this website.</p>
    </section>
  );
}
