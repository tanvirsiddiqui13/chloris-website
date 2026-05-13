"use client";

import { useState } from "react";

// ── palette ──────────────────────────────────────────────────────────────────
const C = {
  amber:     "#C88A12",
  forest:    "#1A3C2A",
  black:     "#111111",
  cream:     "#E9D8BE",
  offwhite:  "#F5F0E8",
  terracotta:"#8B3A1A",
} as const;

// ── font shorthand ────────────────────────────────────────────────────────────
const sr = { fontFamily: "var(--font-cormorant)" } as const;
const sn = { fontFamily: "var(--font-inter)" }     as const;

// ── data ──────────────────────────────────────────────────────────────────────
const VARIANTS = [
  {
    name:    "Forest Walk",
    flavour: "Dark chocolate · Creamy · Warmth that stays",
    mood:    "The one that sets you up.",
    price:   14,
    accent:  "#2E6B45",
  },
  {
    name:    "Amber Mist",
    flavour: "Citric · Nutty · Sugarcane · Golden light",
    mood:    "The one that makes everything feel possible.",
    price:   15,
    accent:  C.amber,
  },
  {
    name:    "Dark Nectar",
    flavour: "Chocolate · Brown sugar · Dense volcanic earth",
    mood:    "Once you try it, everything else feels a compromise.",
    price:   16,
    accent:  C.terracotta,
  },
] as const;

const QUESTIONS = [
  { q: "What does this moment need?",   opts: ["Steadiness",        "A lift"]            },
  { q: "What's the day been like?",     opts: ["Full and relentless","Quietly draining"]  },
  { q: "How do you want this to land?", opts: ["Deep and grounding", "Bright and alive"]  },
];

// q1=0(Steadiness)+q2=0(Full)+q3=0(Deep)    → Forest Walk
// q1=0(Steadiness)+q2=1(Quietly)+q3=0(Deep) → Dark Nectar
// everything else                             → Amber Mist
function getBlend(ans: number[]): (typeof VARIANTS)[number] {
  const [q1, q2, q3] = ans;
  if (q1 === 0 && q2 === 0 && q3 === 0) return VARIANTS[0];
  if (q1 === 0 && q2 === 1 && q3 === 0) return VARIANTS[2];
  return VARIANTS[1];
}

// ── mood answer button ────────────────────────────────────────────────────────
function MoodBtn({ label, onClick }: { label: string; onClick: () => void }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        ...sn,
        fontSize: 16,
        color: hov ? C.amber : C.black,
        padding: "12px 32px",
        border: `1px solid ${hov ? C.amber : C.black}`,
        background: "none",
        cursor: "pointer",
        transition: "all 0.15s",
      }}
    >
      {label}
    </button>
  );
}

// ── page ──────────────────────────────────────────────────────────────────────
export default function Home() {
  const [answers, setAnswers] = useState<number[]>([]);
  const [result,  setResult]  = useState<(typeof VARIANTS)[number] | null>(null);
  const [buyV,    setBuyV]    = useState(0);
  const [grind,   setGrind]   = useState<"whole" | "ground">("whole");
  const [qty,     setQty]     = useState(1);
  const [sub,     setSub]     = useState(false);

  const curQ  = answers.length;
  const price = (VARIANTS[buyV].price * qty * (sub ? 0.9 : 1)).toFixed(2);

  function answer(i: number) {
    const next = [...answers, i];
    setAnswers(next);
    if (next.length === 3) setResult(getBlend(next));
  }

  function resetMood() { setAnswers([]); setResult(null); }

  return (
    <div>

      {/* ── NAV ── */}
      <nav
        className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-12"
        style={{ background: C.forest, borderBottom: `2px solid ${C.amber}`, height: 64 }}
      >
        <a
          href="#"
          style={{ ...sr, color: C.cream, fontSize: 20, letterSpacing: "0.3em", fontWeight: 500, textDecoration: "none" }}
        >
          CHLORIS
        </a>
        <div className="flex gap-8">
          {[["Our Story", "#proof"], ["Shop", "#buy"]].map(([label, href]) => (
            <a
              key={label}
              href={href}
              style={{ ...sn, color: C.cream, fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", textDecoration: "none" }}
            >
              {label}
            </a>
          ))}
        </div>
      </nav>

      {/* ── SECTION 1: HERO ── */}
      <section className="min-h-screen flex flex-col" style={{ background: C.forest }}>
        <div className="flex-1 flex flex-col justify-center px-[6vw] md:px-[10vw] pt-16">
          <p
            className="mb-8 text-[11px] uppercase tracking-[0.2em]"
            style={{ ...sn, color: C.amber }}
          >
            SPECIALTY COFFEE · FROM ETERNAL SPRING
          </p>

          <h1
            className="leading-[1.05] max-w-[800px]"
            style={{ ...sr, fontStyle: "italic", color: C.cream, fontSize: "clamp(52px, 8vw, 96px)" }}
          >
            Where the day<br />gets its colour.
          </h1>

          <p className="mt-6 text-lg" style={{ ...sn, color: C.cream, opacity: 0.8 }}>
            Not stronger. More alive.
          </p>

          <a
            href="#canvas"
            className="mt-12 self-start"
            style={{
              ...sn,
              background: C.amber,
              color: C.black,
              display: "inline-block",
              padding: "18px 48px",
              fontWeight: 500,
              fontSize: 13,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              textDecoration: "none",
            }}
          >
            FIND YOUR BLEND
          </a>
        </div>
        <div style={{ height: 6, background: C.amber }} />
      </section>

      {/* ── SECTION 2: MANIFESTO ── */}
      <section
        className="text-center px-[6vw] md:px-[10vw] py-24 md:py-[120px]"
        style={{ background: C.amber }}
      >
        <p
          className="mx-auto max-w-[900px] leading-[1.2]"
          style={{ ...sr, fontStyle: "italic", color: C.black, fontSize: "clamp(36px, 5vw, 64px)" }}
        >
          Not a badge. Not a lecture.<br />
          Not another beige promise<br />
          dressed up as taste.
        </p>
        <p className="mt-10 text-lg" style={{ ...sn, color: C.black, opacity: 0.8 }}>
          A small warmth in the hand. A little gold in the ordinary.
        </p>
      </section>

      {/* ── SECTION 3: WHY CHLORIS ── */}
      <section
        className="px-[6vw] md:px-[10vw] py-24 md:py-[120px]"
        style={{ background: C.black }}
      >
        <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-12 md:gap-20">
          <div>
            <p
              className="text-[11px] uppercase tracking-[0.15em] mb-6"
              style={{ ...sn, color: C.amber }}
            >
              WHY CHLORIS
            </p>
            <h2
              className="leading-[1.1]"
              style={{ ...sr, color: C.cream, fontSize: "clamp(40px, 5vw, 64px)" }}
            >
              Most days arrive grey.<br />
              Coffee made that worse.
            </h2>
          </div>

          <div className="flex flex-col justify-center gap-6">
            <p style={{ ...sn, color: C.cream, fontSize: 17, lineHeight: 1.8, opacity: 0.85 }}>
              Most coffee has become either a caffeine transaction or a tasteful beige object.
              It wakes people up, but it does not make the day feel more alive.
            </p>
            <p style={{ ...sn, color: C.cream, fontSize: 17, lineHeight: 1.8, opacity: 0.85 }}>
              Chloris is the opposite. Warmth, colour and deliberate energy — for every part
              of the day, not just the first four minutes of it.
            </p>
          </div>
        </div>

        <div
          className="mt-20 pt-20 text-center"
          style={{ borderTop: "1px solid rgba(200,138,18,0.3)" }}
        >
          <p style={{ ...sr, fontStyle: "italic", color: C.cream, fontSize: "clamp(28px, 4vw, 48px)" }}>
            &ldquo;That air is in the cup.&rdquo;
          </p>
        </div>
      </section>

      {/* ── SECTION 4: THE CANVAS ── */}
      <section
        id="canvas"
        className="px-[6vw] md:px-[10vw] py-24 md:py-[120px]"
        style={{ background: C.offwhite }}
      >
        <p className="text-[11px] uppercase tracking-[0.15em] mb-4" style={{ ...sn, color: C.amber }}>
          THREE EXPRESSIONS · ONE PLATEAU
        </p>
        <h2 className="mb-16" style={{ ...sr, color: C.black, fontSize: "clamp(36px, 5vw, 64px)" }}>
          Find your mood.
        </h2>

        {/* variant rows */}
        <div>
          {VARIANTS.map((v) => (
            <div
              key={v.name}
              className="flex items-stretch py-10 gap-8"
              style={{ borderBottom: "1px solid rgba(0,0,0,0.12)" }}
            >
              <div className="flex-shrink-0 w-1" style={{ background: v.accent }} />
              <div className="flex-1 grid grid-cols-1 md:grid-cols-[2fr_2fr_auto] gap-3 md:gap-6 items-center">
                <div>
                  <p style={{ ...sr, fontSize: 32, color: C.black }}>{v.name}</p>
                  <p className="mt-2 text-sm" style={{ ...sn, color: "#555555" }}>{v.flavour}</p>
                </div>
                <p style={{ ...sr, fontStyle: "italic", color: C.amber, fontSize: 20 }}>{v.mood}</p>
                <p className="text-base font-medium md:text-right" style={{ ...sn, color: C.black }}>
                  From £{v.price}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* mood finder */}
        <div className="mt-20 pt-16" style={{ borderTop: `2px solid ${C.amber}` }}>
          <p className="text-lg font-medium mb-12" style={{ ...sn, color: C.black }}>
            Not sure? Answer three questions.
          </p>

          {result ? (
            <div className="fade-up">
              <p className="text-[11px] uppercase tracking-[0.15em] mb-3" style={{ ...sn, color: C.amber }}>
                YOUR BLEND
              </p>
              <p
                style={{ ...sr, fontStyle: "italic", color: C.black, fontSize: "clamp(40px,6vw,72px)", lineHeight: 1.1 }}
              >
                {result.name}
              </p>
              <p className="mt-4 text-base" style={{ ...sn, color: "#555555" }}>{result.mood}</p>
              <a
                href="#buy"
                className="inline-block mt-8"
                style={{
                  ...sn,
                  background: C.amber,
                  color: C.black,
                  padding: "18px 48px",
                  fontWeight: 500,
                  fontSize: 13,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                }}
              >
                SHOP THIS BLEND
              </a>
              <button
                onClick={resetMood}
                className="block mt-4 text-sm cursor-pointer"
                style={{ ...sn, background: "none", border: "none", color: "#555555", padding: 0 }}
              >
                Start again
              </button>
            </div>
          ) : (
            <div className="fade-up" key={curQ}>
              <p className="text-xs mb-6" style={{ ...sn, color: "#555555" }}>
                Question {curQ + 1} of 3
              </p>
              <p className="mb-8" style={{ ...sr, color: C.black, fontSize: 28 }}>
                {QUESTIONS[curQ].q}
              </p>
              <div className="flex flex-wrap gap-4">
                {QUESTIONS[curQ].opts.map((opt, i) => (
                  <MoodBtn key={opt} label={opt} onClick={() => answer(i)} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── SECTION 5: THE PROOF ── */}
      <section
        id="proof"
        className="px-[6vw] md:px-[10vw] py-24 md:py-[120px]"
        style={{ background: C.forest }}
      >
        <p className="text-[11px] uppercase tracking-[0.15em] mb-4" style={{ ...sn, color: C.amber }}>
          FROM ETERNAL SPRING
        </p>
        <h2 className="mb-16" style={{ ...sr, color: C.cream, fontSize: "clamp(36px,5vw,56px)" }}>
          A place that cannot be replicated.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20">
          <div>
            {[
              {
                label: "ALTITUDE",
                text:  "1,500 metres above sea level. Cool air. Still mornings. The plateau that never rushes.",
              },
              {
                label: "SOIL",
                text:  "Red volcanic earth, centuries deep. The kind of soil that gives coffee its character without being asked.",
              },
              {
                label: "PROCESS",
                text:  "Honey processed. The fruit left on the bean while it dries slowly in highland air. At the speed the mountain allows.",
              },
            ].map((p) => (
              <div
                key={p.label}
                className="mb-12 pl-6"
                style={{ borderLeft: `2px solid ${C.amber}` }}
              >
                <p className="text-[11px] uppercase tracking-[0.15em] mb-3" style={{ ...sn, color: C.amber }}>
                  {p.label}
                </p>
                <p className="text-base leading-[1.7]" style={{ ...sn, color: C.cream }}>
                  {p.text}
                </p>
              </div>
            ))}
          </div>

          <div
            className="flex flex-col items-center justify-center gap-3"
            style={{
              border: "1px solid rgba(200,138,18,0.4)",
              background: "rgba(200,138,18,0.06)",
              aspectRatio: "4/5",
            }}
          >
            <p style={{ ...sr, fontStyle: "italic", color: C.cream, fontSize: 20 }}>
              The plateau, in season.
            </p>
            <p className="text-[11px]" style={{ ...sn, color: C.cream, opacity: 0.5 }}>
              Photography coming soon
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION 6: BUY ── */}
      <section
        id="buy"
        className="px-[6vw] md:px-[10vw] py-24 md:py-[120px]"
        style={{ background: C.offwhite }}
      >
        <p className="text-[11px] uppercase tracking-[0.15em] mb-4" style={{ ...sn, color: C.amber }}>
          CHOOSE YOURS
        </p>
        <h2 className="mb-16" style={{ ...sr, color: C.black, fontSize: "clamp(36px,5vw,56px)" }}>
          Pick your expression.
        </h2>

        {/* variant cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {VARIANTS.map((v, i) => (
            <button
              key={v.name}
              onClick={() => setBuyV(i)}
              className="text-left cursor-pointer transition-all duration-200"
              style={{
                padding: "40px 32px",
                border: buyV === i ? `1px solid ${C.amber}` : "1px solid rgba(0,0,0,0.15)",
                borderLeft: buyV === i ? `4px solid ${C.amber}` : "1px solid rgba(0,0,0,0.15)",
                background: buyV === i ? "white" : "transparent",
                boxShadow: buyV === i ? "0 4px 24px rgba(200,138,18,0.12)" : "none",
              }}
            >
              <p style={{ ...sr, fontSize: 28, color: C.black }}>{v.name}</p>
              <p className="mt-2 text-xs" style={{ ...sn, color: "#555555" }}>{v.flavour}</p>
              <p className="mt-6 text-lg font-medium" style={{ ...sn, color: C.black }}>£{v.price}</p>
            </button>
          ))}
        </div>

        {/* controls */}
        <div className="max-w-md">

          {/* grind */}
          <div className="mb-8">
            <p className="text-[11px] uppercase tracking-[0.1em] mb-4" style={{ ...sn, color: "#555555" }}>
              GRIND
            </p>
            <div className="flex gap-8">
              {(["whole", "ground"] as const).map((g) => (
                <button
                  key={g}
                  onClick={() => setGrind(g)}
                  className="text-xs uppercase tracking-[0.1em] cursor-pointer transition-colors"
                  style={{
                    ...sn,
                    background: "none",
                    border: "none",
                    borderBottom: grind === g ? `2px solid ${C.amber}` : "2px solid transparent",
                    color: grind === g ? C.amber : "#555555",
                    padding: "0 0 4px",
                  }}
                >
                  {g === "whole" ? "WHOLE BEAN" : "GROUND"}
                </button>
              ))}
            </div>
          </div>

          {/* quantity */}
          <div className="mb-8">
            <p className="text-[11px] uppercase tracking-[0.1em] mb-4" style={{ ...sn, color: "#555555" }}>
              QUANTITY
            </p>
            <div className="flex items-center gap-6">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="w-9 h-9 flex items-center justify-center cursor-pointer transition-opacity hover:opacity-50"
                style={{ ...sn, background: "none", border: "1px solid rgba(0,0,0,0.2)", color: C.black, fontSize: 18 }}
              >
                −
              </button>
              <span className="text-lg w-6 text-center tabular-nums" style={{ ...sn, color: C.black }}>
                {qty}
              </span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="w-9 h-9 flex items-center justify-center cursor-pointer transition-opacity hover:opacity-50"
                style={{ ...sn, background: "none", border: "1px solid rgba(0,0,0,0.2)", color: C.black, fontSize: 18 }}
              >
                +
              </button>
            </div>
          </div>

          {/* purchase type */}
          <div className="mb-10">
            <p className="text-[11px] uppercase tracking-[0.1em] mb-4" style={{ ...sn, color: "#555555" }}>
              PURCHASE TYPE
            </p>
            <div className="flex flex-wrap gap-4 items-center">
              <button
                onClick={() => setSub(false)}
                className="text-xs uppercase tracking-[0.1em] cursor-pointer transition-colors"
                style={{
                  ...sn,
                  background: "none",
                  border: "none",
                  borderBottom: !sub ? `2px solid ${C.amber}` : "2px solid transparent",
                  color: !sub ? C.amber : "#555555",
                  padding: "0 0 4px",
                }}
              >
                ONE-TIME PURCHASE
              </button>
              <button
                onClick={() => setSub(true)}
                className="text-xs uppercase tracking-[0.1em] cursor-pointer transition-all"
                style={{
                  ...sn,
                  background: sub ? C.amber : "none",
                  border: "none",
                  color: sub ? C.black : "#555555",
                  padding: sub ? "8px 20px" : "0 0 4px",
                  borderBottom: sub ? "none" : "2px solid transparent",
                }}
              >
                SUBSCRIBE &amp; SAVE 10%
              </button>
            </div>
          </div>

          {/* price + CTA */}
          <p className="mb-6" style={{ ...sr, fontSize: 36, color: C.black }}>
            £{price}
          </p>
          <button
            className="w-full py-5 text-sm uppercase tracking-[0.15em] font-medium cursor-pointer transition-opacity hover:opacity-85"
            style={{ ...sn, background: C.amber, color: C.black, border: "none" }}
          >
            ADD TO CART
          </button>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        className="px-[6vw] md:px-[10vw] pt-20 pb-10"
        style={{ background: C.black, borderTop: `6px solid ${C.amber}` }}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <span style={{ ...sr, color: C.cream, fontSize: 28, letterSpacing: "0.3em" }}>
            CHLORIS
          </span>
          <div className="flex flex-wrap gap-6">
            {["Our Story", "Shop", "Coffee Tips", "Contact"].map((l) => (
              <a
                key={l}
                href="#"
                style={{ ...sn, color: C.cream, fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none" }}
              >
                {l}
              </a>
            ))}
          </div>
        </div>

        <p className="mt-4 text-sm" style={{ ...sn, color: C.cream, opacity: 0.6 }}>
          From eternal spring.
        </p>

        <div className="mt-12 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          <p className="text-[11px]" style={{ ...sn, color: "#555555" }}>
            © 2026 Chloris. All warmth reserved.
          </p>
        </div>
      </footer>

    </div>
  );
}
