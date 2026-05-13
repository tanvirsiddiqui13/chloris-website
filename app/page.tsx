"use client";

import { useState } from "react";

const Y = "#C88A12";
const MUTED = "#555555";
const RULE = "#E8E5DF";
const TEXT = "#111111";
const BG = "#FAFAF8";

const VARIANTS = [
  { name: "Forest Walk", mood: "Clean · Bright · Morning clarity", price: 14 },
  { name: "Amber Mist",  mood: "Round · Warm · Golden hour",       price: 15 },
  { name: "Dark Nectar", mood: "Deep · Rich · After dark",          price: 16 },
];

const QUESTIONS = [
  { q: "What does this morning need?",       a: ["Clarity and lightness", "Warmth and comfort"] },
  { q: "What does your afternoon feel like?", a: ["Sun through leaves",    "Long golden shadows"] },
  { q: "How do you want the day to end?",    a: ["Gently, with ease",     "Deeply, with intention"] },
];

function recommend(answers: number[]): string {
  const sum = answers.reduce((a, b) => a + b, 0);
  if (sum <= 1) return "Forest Walk";
  if (sum === 3) return "Dark Nectar";
  return "Amber Mist";
}

export default function Home() {
  const [moodAns, setMoodAns]     = useState<(number | null)[]>([null, null, null]);
  const [moodResult, setMoodResult] = useState<string | null>(null);
  const [variant, setVariant]     = useState(0);
  const [grind, setGrind]         = useState<"whole" | "ground">("whole");
  const [qty, setQty]             = useState(1);
  const [sub, setSub]             = useState(false);

  function handleMood(qi: number, ai: number) {
    const next = [...moodAns];
    next[qi] = ai;
    setMoodAns(next);
    if (next.every((a) => a !== null)) setMoodResult(recommend(next as number[]));
  }

  const totalPrice = (VARIANTS[variant].price * qty * (sub ? 0.9 : 1)).toFixed(2);

  return (
    <div style={{ backgroundColor: BG, color: TEXT }}>

      {/* ── NAV ── */}
      <nav
        className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-14 py-5"
        style={{ backgroundColor: BG, borderBottom: `1px solid ${RULE}` }}
      >
        <a
          href="#"
          className="text-xl md:text-2xl font-light tracking-[0.22em]"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          CHLORIS
        </a>
        <div className="flex gap-6 md:gap-10 text-[11px] tracking-[0.18em] uppercase" style={{ color: MUTED }}>
          <a href="#buy"   className="transition-colors hover:text-[#111]">Shop</a>
          <a href="#proof" className="transition-colors hover:text-[#111]">Our Story</a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="min-h-screen flex flex-col justify-center px-6 md:px-14 lg:px-24 pt-28 pb-16">
        <div className="max-w-5xl">
          <p className="text-[11px] tracking-[0.28em] uppercase mb-10" style={{ color: Y }}>
            Đà Lạt Plateau · Vietnam
          </p>
          <h1
            className="font-light leading-[0.92] mb-8"
            style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(3.2rem, 9vw, 8rem)" }}
          >
            Where the day
            <br />
            gets its colour.
          </h1>
          <p
            className="text-xl md:text-2xl mb-14"
            style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", color: MUTED }}
          >
            From eternal spring.
          </p>
          <a
            href="#canvas"
            className="inline-block px-9 py-4 text-[11px] tracking-[0.22em] uppercase transition-opacity hover:opacity-75"
            style={{ backgroundColor: Y, color: BG }}
          >
            Find your blend
          </a>
        </div>
      </section>

      {/* ── WHY CHLORIS ── */}
      <section className="px-6 md:px-14 lg:px-24 py-28 md:py-36" style={{ borderTop: `1px solid ${RULE}` }}>
        <div className="max-w-2xl">
          <p className="text-[11px] tracking-[0.28em] uppercase mb-12" style={{ color: Y }}>
            Why Chloris
          </p>
          <h2
            className="font-normal leading-tight mb-10"
            style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)" }}
          >
            Nobody talks about what coffee actually is.
          </h2>
          <p className="text-base md:text-lg leading-[1.9] mb-16" style={{ color: MUTED }}>
            It&apos;s agricultural. Like wine. Like a cigar. It&apos;s made by a place. The sun that hit
            it. The soil underneath it. The air it grew in. You genuinely cannot replicate that.
          </p>
          <blockquote
            style={{
              fontFamily: "var(--font-cormorant)",
              fontStyle: "italic",
              fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
              lineHeight: 1.35,
            }}
          >
            &ldquo;That air is in the cup.&rdquo;
          </blockquote>
        </div>
      </section>

      {/* ── THE CANVAS ── */}
      <section id="canvas" className="px-6 md:px-14 lg:px-24 py-28 md:py-36" style={{ borderTop: `1px solid ${RULE}` }}>
        <p className="text-[11px] tracking-[0.28em] uppercase mb-4" style={{ color: Y }}>
          The Canvas
        </p>
        <h2
          className="font-normal mb-16"
          style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)" }}
        >
          Three expressions. One plateau.
        </h2>

        {/* Variant rows */}
        <div className="mb-24">
          {VARIANTS.map((v, i) => (
            <div key={v.name}>
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between py-5 gap-1 sm:gap-0">
                <span
                  className="text-xl md:text-2xl font-normal"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  {v.name}
                </span>
                <span className="text-sm hidden md:block" style={{ color: MUTED }}>{v.mood}</span>
                <span className="text-[12px] tracking-wider" style={{ color: MUTED }}>
                  From £{v.price}
                </span>
              </div>
              <p className="text-sm mb-3 md:hidden" style={{ color: MUTED }}>{v.mood}</p>
              {i < VARIANTS.length - 1 && (
                <div className="h-px" style={{ backgroundColor: Y, opacity: 0.25 }} />
              )}
            </div>
          ))}
        </div>

        {/* Mood finder */}
        <div className="max-w-xl">
          <p className="text-[11px] tracking-[0.22em] uppercase mb-12" style={{ color: MUTED }}>
            Not sure which? Answer three questions.
          </p>
          <div className="space-y-12">
            {QUESTIONS.map((q, qi) => (
              <div key={qi}>
                <p
                  className="text-xl mb-5"
                  style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic" }}
                >
                  {q.q}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-10">
                  {q.a.map((opt, ai) => (
                    <button
                      key={ai}
                      onClick={() => handleMood(qi, ai)}
                      className="text-left text-sm tracking-wide transition-all w-fit"
                      style={{
                        color: moodAns[qi] === ai ? Y : MUTED,
                        borderBottom: moodAns[qi] === ai ? `1px solid ${Y}` : "1px solid transparent",
                        paddingBottom: "2px",
                      }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {moodResult && (
            <div className="mt-16 pt-12" style={{ borderTop: `1px solid ${Y}` }}>
              <p className="text-[11px] tracking-[0.28em] uppercase mb-3" style={{ color: Y }}>
                Your blend
              </p>
              <p
                className="font-normal"
                style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(1.8rem, 3vw, 2.4rem)" }}
              >
                {moodResult}
              </p>
              <a
                href="#buy"
                className="inline-block mt-6 text-[11px] tracking-[0.2em] uppercase transition-opacity hover:opacity-60"
                style={{ color: Y, borderBottom: `1px solid ${Y}`, paddingBottom: "2px" }}
              >
                Shop this blend →
              </a>
            </div>
          )}
        </div>
      </section>

      {/* ── THE PROOF ── */}
      <section id="proof" className="px-6 md:px-14 lg:px-24 py-28 md:py-36" style={{ borderTop: `1px solid ${RULE}` }}>
        <div className="grid md:grid-cols-2 gap-16 md:gap-20 items-start">
          {/* Left */}
          <div>
            <p className="text-[11px] tracking-[0.28em] uppercase mb-12" style={{ color: Y }}>
              The Proof
            </p>
            <h2
              className="font-normal leading-tight mb-14"
              style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)" }}
            >
              Born from eternal spring.
            </h2>
            <div>
              {[
                {
                  label: "Altitude",
                  value: "1,500m above sea level",
                  detail: "The Đà Lạt Plateau sits high enough that temperatures rarely exceed 25°C — a natural refrigerator that slows fruit development and concentrates flavour.",
                },
                {
                  label: "Soil",
                  value: "Volcanic basalt",
                  detail: "Rich in minerals laid down over millennia. The kind of terroir winemakers would mortgage their vineyards for.",
                },
                {
                  label: "Process",
                  value: "Honey processed",
                  detail: "Pulped but not washed. The sticky fruit mucilage dries on the bean, imparting sweetness without fermentation's edge.",
                },
              ].map((p) => (
                <div key={p.label} className="py-8" style={{ borderBottom: `1px solid ${RULE}` }}>
                  <p className="text-[11px] tracking-[0.22em] uppercase mb-2" style={{ color: Y }}>
                    {p.label}
                  </p>
                  <p className="text-lg mb-2 font-normal" style={{ fontFamily: "var(--font-cormorant)" }}>
                    {p.value}
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: MUTED }}>{p.detail}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — image placeholder */}
          <div
            className="flex items-center justify-center md:sticky md:top-24"
            style={{ backgroundColor: "#E8E5DF", minHeight: "520px" }}
          >
            <p className="text-[11px] tracking-[0.22em] uppercase" style={{ color: MUTED }}>
              Plateau image
            </p>
          </div>
        </div>
      </section>

      {/* ── BUY ── */}
      <section id="buy" className="px-6 md:px-14 lg:px-24 py-28 md:py-36" style={{ borderTop: `1px solid ${RULE}` }}>
        <p className="text-[11px] tracking-[0.28em] uppercase mb-4" style={{ color: Y }}>
          Shop
        </p>
        <h2
          className="font-normal mb-16"
          style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)" }}
        >
          Choose yours.
        </h2>

        {/* Blend */}
        <div className="mb-14">
          <p className="text-[11px] tracking-[0.22em] uppercase mb-6" style={{ color: MUTED }}>Blend</p>
          <div className="flex flex-col sm:flex-row gap-3">
            {VARIANTS.map((v, i) => (
              <button
                key={v.name}
                onClick={() => setVariant(i)}
                className="text-left px-6 py-5 transition-all min-w-[160px]"
                style={{
                  border: variant === i ? `1px solid ${Y}` : `1px solid ${RULE}`,
                  backgroundColor: variant === i ? "rgba(200,138,18,0.04)" : "transparent",
                }}
              >
                <p
                  className="text-base font-normal mb-1"
                  style={{ fontFamily: "var(--font-cormorant)", color: variant === i ? TEXT : MUTED }}
                >
                  {v.name}
                </p>
                <p className="text-xs" style={{ color: MUTED }}>£{v.price} / 250g</p>
              </button>
            ))}
          </div>
        </div>

        {/* Grind */}
        <div className="mb-14">
          <p className="text-[11px] tracking-[0.22em] uppercase mb-6" style={{ color: MUTED }}>Grind</p>
          <div className="flex gap-10">
            {(["whole", "ground"] as const).map((g) => (
              <button
                key={g}
                onClick={() => setGrind(g)}
                className="text-sm tracking-wide capitalize transition-all"
                style={{
                  color: grind === g ? TEXT : MUTED,
                  borderBottom: grind === g ? `1px solid ${TEXT}` : "1px solid transparent",
                  paddingBottom: "2px",
                }}
              >
                {g === "whole" ? "Whole Bean" : "Ground"}
              </button>
            ))}
          </div>
        </div>

        {/* Quantity */}
        <div className="mb-14">
          <p className="text-[11px] tracking-[0.22em] uppercase mb-6" style={{ color: MUTED }}>Quantity</p>
          <div className="flex items-center gap-5">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="w-9 h-9 flex items-center justify-center transition-opacity hover:opacity-40"
              style={{ border: `1px solid ${RULE}` }}
            >
              −
            </button>
            <span className="text-base w-5 text-center tabular-nums">{qty}</span>
            <button
              onClick={() => setQty((q) => q + 1)}
              className="w-9 h-9 flex items-center justify-center transition-opacity hover:opacity-40"
              style={{ border: `1px solid ${RULE}` }}
            >
              +
            </button>
          </div>
        </div>

        {/* Purchase type */}
        <div className="mb-14">
          <p className="text-[11px] tracking-[0.22em] uppercase mb-6" style={{ color: MUTED }}>
            Purchase type
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-10">
            {[
              { label: "One-time purchase", value: false },
              { label: "Subscribe & save 10%", value: true },
            ].map((opt) => (
              <button
                key={String(opt.value)}
                onClick={() => setSub(opt.value)}
                className="text-left text-sm tracking-wide transition-all w-fit"
                style={{
                  color: sub === opt.value ? TEXT : MUTED,
                  borderBottom: sub === opt.value ? `1px solid ${TEXT}` : "1px solid transparent",
                  paddingBottom: "2px",
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>
          {sub && (
            <p className="mt-4 text-xs tracking-wide" style={{ color: Y }}>
              10% off every delivery. Cancel anytime.
            </p>
          )}
        </div>

        {/* Price + CTA */}
        <div className="flex items-center gap-8 flex-wrap">
          <p
            className="font-light"
            style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(1.6rem, 3vw, 2.2rem)" }}
          >
            £{totalPrice}
          </p>
          <button
            className="px-10 py-4 text-[11px] tracking-[0.22em] uppercase transition-opacity hover:opacity-75"
            style={{ backgroundColor: Y, color: BG }}
          >
            Add to Cart
          </button>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        className="px-6 md:px-14 lg:px-24 py-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
        style={{ borderTop: `1px solid ${RULE}` }}
      >
        <span
          className="text-lg tracking-[0.22em] font-light"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          CHLORIS
        </span>
        <p className="text-xs" style={{ color: MUTED }}>
          © {new Date().getFullYear()} Chloris. Single-origin specialty coffee from Đà Lạt, Vietnam.
        </p>
      </footer>
    </div>
  );
}
