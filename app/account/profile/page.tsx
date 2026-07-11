import type { Metadata } from "next";

export const metadata: Metadata = { title: "Profile" };

export default function ProfilePage() {
  return (
    <div className="wrap" style={{ paddingBlock: 40, maxWidth: 960 }}>
      <span className="tag dark" style={{ marginBottom: 16 }}><span className="dot" />R2 preview</span>
      <h1 style={{ fontSize: 26, fontWeight: "var(--fw-extra)", marginBottom: 20 }}>Profile</h1>
      <div className="grid2">
        <div className="panel">
          <div className="lbl">Personal details</div>
          <div className="field"><label>Full name</label><input defaultValue="Member" /></div>
          <div className="field"><label>Mobile</label><input defaultValue="+971 •• ••• 4291 · verified" /></div>
          <div className="field"><label>Email</label><input placeholder="you@example.com" /></div>
          <div className="field"><label>Date of birth</label><input placeholder="DD / MM / YYYY" /></div>
          <button className="btn btn-primary btn-sm" type="button">Save changes</button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div className="panel">
            <div className="lbl">Saved addresses</div>
            <div className="pay"><span>Home · Oud Metha, Villa —</span><a href="#" style={{ fontSize: 13 }}>Edit</a></div>
            <div className="pay"><span>Office · DIFC —</span><a href="#" style={{ fontSize: 13 }}>Edit</a></div>
            <button className="btn btn-quiet btn-sm" style={{ marginTop: 8 }} type="button">+ Add address</button>
          </div>
          <div className="panel">
            <div className="lbl">Preferences</div>
            <div className="srow"><span>WhatsApp updates</span><span className="tag"><span className="dot" />On</span></div>
            <div className="srow"><span>Language</span><b>English · العربية</b></div>
          </div>
        </div>
      </div>
    </div>
  );
}
