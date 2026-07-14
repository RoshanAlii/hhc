"use client";

import { useState } from "react";

function num(v: string): number | null {
  const n = parseFloat(v);
  return isNaN(n) || n <= 0 ? null : n;
}

function Result({ value, label, tone = "green" }: { value: string; label: string; tone?: "green" | "orange" | "red" }) {
  const bg = tone === "green" ? "var(--surface-care-soft)" : tone === "orange" ? "var(--surface-brand-soft)" : "var(--red-50)";
  const fg = tone === "green" ? "var(--green-700)" : tone === "orange" ? "var(--orange-700)" : "var(--red-600)";
  const border = tone === "green" ? "var(--green-200)" : tone === "orange" ? "var(--orange-200)" : "var(--red-100)";
  return (
    <div style={{ background: bg, border: `1px solid ${border}`, borderRadius: "var(--radius-md)", padding: "12px 14px", marginTop: 12 }}>
      <div style={{ fontSize: 22, fontWeight: "var(--fw-extra)", color: fg }}>{value}</div>
      <div style={{ fontSize: 13, color: "var(--text-body)", marginTop: 2 }}>{label}</div>
    </div>
  );
}

function Tool({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="panel" style={{ padding: "var(--space-6)" }}>
      <div className="lbl">{title}</div>
      {children}
    </div>
  );
}

/* ---- BMI ---------------------------------------------------------------- */
function BmiTool() {
  const [h, setH] = useState("");
  const [w, setW] = useState("");
  const height = num(h), weight = num(w);
  let out = null;
  if (height && weight) {
    const bmi = weight / Math.pow(height / 100, 2);
    const cat = bmi < 18.5 ? ["Underweight", "orange"] : bmi < 25 ? ["Healthy weight", "green"] : bmi < 30 ? ["Overweight", "orange"] : ["Obese", "red"];
    out = <Result value={bmi.toFixed(1)} label={`BMI · ${cat[0]}`} tone={cat[1] as "green" | "orange" | "red"} />;
  }
  return (
    <Tool title="BMI calculator">
      <div className="grid2">
        <div className="field" style={{ marginBottom: 8 }}><label>Height (cm)</label><input inputMode="decimal" value={h} onChange={(e) => setH(e.target.value)} placeholder="170" /></div>
        <div className="field" style={{ marginBottom: 8 }}><label>Weight (kg)</label><input inputMode="decimal" value={w} onChange={(e) => setW(e.target.value)} placeholder="68" /></div>
      </div>
      {out ?? <p className="muted" style={{ fontSize: 13 }}>Enter your height and weight to see your Body Mass Index.</p>}
    </Tool>
  );
}

/* ---- Daily calories (Mifflin–St Jeor) ---------------------------------- */
function CalorieTool() {
  const [sex, setSex] = useState("female");
  const [age, setAge] = useState("");
  const [h, setH] = useState("");
  const [w, setW] = useState("");
  const [act, setAct] = useState("1.375");
  const a = num(age), height = num(h), weight = num(w);
  let out = null;
  if (a && height && weight) {
    const bmr = 10 * weight + 6.25 * height - 5 * a + (sex === "male" ? 5 : -161);
    const cals = Math.round((bmr * parseFloat(act)) / 10) * 10;
    out = <Result value={`${cals.toLocaleString()} kcal`} label="Estimated daily calories to maintain weight" tone="orange" />;
  }
  return (
    <Tool title="Daily calorie needs">
      <div className="grid2">
        <div className="field" style={{ marginBottom: 8 }}><label>Sex</label><select value={sex} onChange={(e) => setSex(e.target.value)}><option value="female">Female</option><option value="male">Male</option></select></div>
        <div className="field" style={{ marginBottom: 8 }}><label>Age</label><input inputMode="numeric" value={age} onChange={(e) => setAge(e.target.value)} placeholder="32" /></div>
        <div className="field" style={{ marginBottom: 8 }}><label>Height (cm)</label><input inputMode="decimal" value={h} onChange={(e) => setH(e.target.value)} placeholder="170" /></div>
        <div className="field" style={{ marginBottom: 8 }}><label>Weight (kg)</label><input inputMode="decimal" value={w} onChange={(e) => setW(e.target.value)} placeholder="68" /></div>
      </div>
      <div className="field" style={{ marginBottom: 8 }}>
        <label>Activity level</label>
        <select value={act} onChange={(e) => setAct(e.target.value)}>
          <option value="1.2">Sedentary (little exercise)</option>
          <option value="1.375">Light (1–3 days/week)</option>
          <option value="1.55">Moderate (3–5 days/week)</option>
          <option value="1.725">Active (6–7 days/week)</option>
          <option value="1.9">Very active (physical job)</option>
        </select>
      </div>
      {out ?? <p className="muted" style={{ fontSize: 13 }}>Estimate the calories you need each day to maintain your weight.</p>}
    </Tool>
  );
}

/* ---- Ideal weight range ------------------------------------------------- */
function IdealWeightTool() {
  const [h, setH] = useState("");
  const height = num(h);
  let out = null;
  if (height) {
    const m = height / 100;
    const lo = Math.round(18.5 * m * m);
    const hi = Math.round(24.9 * m * m);
    out = <Result value={`${lo}–${hi} kg`} label="Healthy weight range for your height" tone="green" />;
  }
  return (
    <Tool title="Healthy weight range">
      <div className="field" style={{ marginBottom: 8 }}><label>Height (cm)</label><input inputMode="decimal" value={h} onChange={(e) => setH(e.target.value)} placeholder="170" /></div>
      {out ?? <p className="muted" style={{ fontSize: 13 }}>See the weight range considered healthy for your height.</p>}
    </Tool>
  );
}

/* ---- Water intake ------------------------------------------------------- */
function WaterTool() {
  const [w, setW] = useState("");
  const weight = num(w);
  let out = null;
  if (weight) {
    const liters = (weight * 0.035).toFixed(1);
    const glasses = Math.round((weight * 0.035 * 1000) / 250);
    out = <Result value={`${liters} L`} label={`About ${glasses} glasses of water a day`} tone="green" />;
  }
  return (
    <Tool title="Daily water intake">
      <div className="field" style={{ marginBottom: 8 }}><label>Weight (kg)</label><input inputMode="decimal" value={w} onChange={(e) => setW(e.target.value)} placeholder="68" /></div>
      {out ?? <p className="muted" style={{ fontSize: 13 }}>A simple guide to how much water to drink each day.</p>}
    </Tool>
  );
}

/* ---- Waist-to-height ratio --------------------------------------------- */
function WaistTool() {
  const [waist, setWaist] = useState("");
  const [h, setH] = useState("");
  const wv = num(waist), height = num(h);
  let out = null;
  if (wv && height) {
    const r = wv / height;
    const cat = r < 0.5 ? ["Healthy", "green"] : r < 0.6 ? ["Increased risk", "orange"] : ["High risk", "red"];
    out = <Result value={r.toFixed(2)} label={`Waist-to-height · ${cat[0]}`} tone={cat[1] as "green" | "orange" | "red"} />;
  }
  return (
    <Tool title="Waist-to-height ratio">
      <div className="grid2">
        <div className="field" style={{ marginBottom: 8 }}><label>Waist (cm)</label><input inputMode="decimal" value={waist} onChange={(e) => setWaist(e.target.value)} placeholder="80" /></div>
        <div className="field" style={{ marginBottom: 8 }}><label>Height (cm)</label><input inputMode="decimal" value={h} onChange={(e) => setH(e.target.value)} placeholder="170" /></div>
      </div>
      {out ?? <p className="muted" style={{ fontSize: 13 }}>A quick indicator of metabolic health — aim below 0.5.</p>}
    </Tool>
  );
}

/* ---- Heart-rate zones --------------------------------------------------- */
function HeartRateTool() {
  const [age, setAge] = useState("");
  const a = num(age);
  let out = null;
  if (a && a < 120) {
    const max = Math.round(220 - a);
    const fatLo = Math.round(max * 0.6), fatHi = Math.round(max * 0.7);
    const cardLo = Math.round(max * 0.7), cardHi = Math.round(max * 0.85);
    out = (
      <>
        <Result value={`${max} bpm`} label="Estimated maximum heart rate" tone="orange" />
        <div className="srow" style={{ marginTop: 8 }}><span>Fat-burn zone</span><b>{fatLo}–{fatHi} bpm</b></div>
        <div className="srow"><span>Cardio zone</span><b>{cardLo}–{cardHi} bpm</b></div>
      </>
    );
  }
  return (
    <Tool title="Heart-rate zones">
      <div className="field" style={{ marginBottom: 8 }}><label>Age</label><input inputMode="numeric" value={age} onChange={(e) => setAge(e.target.value)} placeholder="32" /></div>
      {out ?? <p className="muted" style={{ fontSize: 13 }}>Find your target zones for fat-burn and cardio training.</p>}
    </Tool>
  );
}

export default function HealthTools() {
  return (
    <div className="grid2" style={{ marginTop: 12 }}>
      <BmiTool />
      <CalorieTool />
      <IdealWeightTool />
      <WaterTool />
      <WaistTool />
      <HeartRateTool />
    </div>
  );
}
