"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Logo from "./Logo";
import Icon from "./Icon";

export default function LoginFlow() {
  const router = useRouter();
  const [step, setStep] = useState<"mobile" | "code">("mobile");
  const [mobile, setMobile] = useState("");
  const [digits, setDigits] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const [seconds, setSeconds] = useState(0);
  const [previewCode, setPreviewCode] = useState("");
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (seconds <= 0) return;
    const t = setInterval(() => setSeconds((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [seconds]);

  function sendCode() {
    if (!/^[+\d][\d\s]{7,}$/.test(mobile.trim())) {
      setError("Enter a valid mobile number.");
      return;
    }
    setError("");
    setPreviewCode(String(Math.floor(1000 + Math.random() * 9000)));
    setStep("code");
    setSeconds(24);
    setTimeout(() => inputs.current[0]?.focus(), 50);
  }

  function setDigit(i: number, v: string) {
    if (!/^\d?$/.test(v)) return;
    const next = [...digits];
    next[i] = v;
    setDigits(next);
    if (v && i < 3) inputs.current[i + 1]?.focus();
  }

  function verify() {
    if (digits.join("") === previewCode) {
      localStorage.setItem("healthserve.session.v1", JSON.stringify({ mobile, createdAt: Date.now() }));
      window.dispatchEvent(new Event("healthserve-session-change"));
      router.push("/account");
    } else {
      setError("That code isn't right. Please check the four digits and try again.");
    }
  }

  const masked = mobile.replace(/\d(?=\d{4})/g, "•");

  return (
    <div className="wrap" style={{ paddingBlock: 56, maxWidth: 880 }}>
      <div className="grid2">
        <div className="panel" style={{ textAlign: "center" }}>
          <Link className="hs-logo" href="/" style={{ justifyContent: "center", display: "inline-flex" }}><Logo width={160} tagline={false} /></Link>
          <h1 style={{ fontSize: 24, fontWeight: "var(--fw-extra)", margin: "16px 0 6px" }}>Welcome back</h1>
          <p className="muted" style={{ fontSize: 14 }}>Log in with your mobile - no passwords.</p>
          <div className={`field${step === "mobile" && error ? " invalid" : ""}`} style={{ textAlign: "start", marginTop: 18 }}>
            <label>Mobile number</label>
            <input placeholder="+971" value={mobile} onChange={(e) => setMobile(e.target.value)} disabled={step === "code"} />
            {step === "mobile" && error && <span className="err">{error}</span>}
          </div>
          <button className="btn btn-primary btn-full btn-lg" onClick={sendCode} type="button" disabled={step === "code"}>
            Send code
          </button>
          <p className="muted" style={{ fontSize: 12, marginTop: 12 }}>New here? Your account is created automatically.</p>
        </div>

        <div className="panel" style={{ textAlign: "center", opacity: step === "code" ? 1 : 0.55 }}>
          <h2 style={{ fontSize: 20, fontWeight: "var(--fw-bold)", marginBottom: 4 }}>Enter the code</h2>
          <p className="muted" style={{ fontSize: 13 }}>{step === "code" ? `Sent to ${masked || "your mobile"}` : "We'll text you a 4-digit code"}</p>
          {step === "code" && <div className="portal-info" style={{ textAlign: "start", marginTop: 14 }}><Icon name="shield" size={18} /><div><b>Preview verification code</b><span>Enter {previewCode} to continue in this website demo.</span></div></div>}
          <div style={{ display: "flex", gap: 10, justifyContent: "center", margin: "18px 0" }}>
            {digits.map((d, i) => (
              <input
                key={i}
                ref={(el) => { inputs.current[i] = el; }}
                value={d}
                onChange={(e) => setDigit(i, e.target.value)}
                inputMode="numeric"
                maxLength={1}
                disabled={step !== "code"}
                aria-label={`Digit ${i + 1}`}
                style={{ width: 48, height: 56, textAlign: "center", borderRadius: 8, fontSize: 22, fontWeight: 700, border: "1px solid var(--border-default)", background: "#fff" }}
              />
            ))}
          </div>
          {step === "code" && error && <p className="err" style={{ color: "var(--danger)", fontSize: 13, marginBottom: 8 }}>{error}</p>}
          <button className="btn btn-primary btn-full btn-lg" onClick={verify} type="button" disabled={step !== "code"}>Verify</button>
          <p className="muted" style={{ fontSize: 13, marginTop: 12 }}>
            {seconds > 0 ? `Resend in 0:${seconds.toString().padStart(2, "0")}` : <button className="linkbtn" onClick={() => setSeconds(24)} type="button">Resend code</button>}
            {" · "}<button className="linkbtn" onClick={() => { setStep("mobile"); setError(""); }} type="button">Change number</button>
          </p>
        </div>
      </div>
    </div>
  );
}
