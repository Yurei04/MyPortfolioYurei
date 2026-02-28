"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/app/themeProvider";

const slides = [
  {
    src: "/images/sphere.jpg",
    title: "Project One",
    description: "A full-stack web application with real-time data sync and AI-powered recommendations.",
    tags: ["Next.js", "TypeScript", "OpenAI"],
    href: "/projects/project-one",
  },
  {
    src: "/images/sphere.jpg",
    title: "Project Two",
    description: "Scalable microservices architecture deployed on the edge with sub-50ms latency.",
    tags: ["Node.js", "Docker", "Redis"],
    href: "/projects/project-two",
  },
  {
    src: "/images/sphere.jpg",
    title: "Project Three",
    description: "LLM-powered document intelligence platform with vector search and RAG pipeline.",
    tags: ["Python", "LangChain", "Pinecone"],
    href: "/projects/project-three",
  },
  {
    src: "/images/sphere.jpg",
    title: "Project Four",
    description: "Cross-platform mobile app with offline-first sync and local ML inference.",
    tags: ["React Native", "SQLite", "TFLite"],
    href: "/projects/project-four",
  },
];

// ── Card styles per theme ────────────────────────────────────
const CARD_THEME = {
  tech: {
    bg:           "rgba(4,10,28,0.92)",
    border:       "rgba(59,130,246,0.22)",
    shadow:       "0 16px 60px rgba(0,0,0,0.65), 0 0 0 1px rgba(99,160,255,0.06)",
    titleColor:   "rgba(220,235,255,0.95)",
    descColor:    "rgba(148,180,255,0.65)",
    tagColor:     "rgba(99,160,255,0.85)",
    tagBg:        "rgba(30,70,180,0.15)",
    tagBorder:    "rgba(59,130,246,0.22)",
    ctaColor:     "rgba(99,160,255,0.9)",
    ctaHover:     "rgba(180,210,255,1)",
    ctaBorder:    "rgba(59,130,246,0.3)",
    ctaBorderHov: "rgba(99,160,255,0.7)",
    counterBg:    "rgba(4,10,28,0.7)",
    counterBorder:"rgba(59,130,246,0.25)",
    counterColor: "rgba(148,180,255,0.7)",
    arrowBg:      "rgba(4,10,28,0.65)",
    arrowBorder:  "rgba(59,130,246,0.22)",
    arrowColor:   "rgba(148,180,255,0.8)",
    arrowHoverBg: "rgba(29,78,216,0.5)",
    arrowHoverBd: "rgba(99,160,255,0.5)",
    dotActive:    "rgba(99,160,255,0.9)",
    dotInactive:  "rgba(99,160,255,0.25)",
    dotGlow:      "rgba(99,160,255,0.6)",
    shimmer:      "linear-gradient(90deg, transparent, rgba(99,160,255,0.5), transparent)",
    separator:    "linear-gradient(90deg, transparent, rgba(59,130,246,0.3), transparent)",
    imgGradient:  "linear-gradient(to bottom, transparent 40%, rgba(4,10,28,0.95) 100%)",
    titleFont:    "'Playfair Display', Georgia, serif",
    monoFont:     "'DM Mono', monospace",
    borderRadius: 16,
  },
  "fantasy-morning": {
    bg:           "rgba(240,255,240,0.82)",
    border:       "rgba(80,160,80,0.28)",
    shadow:       "0 16px 60px rgba(0,0,0,0.18), 0 0 0 1px rgba(80,160,80,0.08)",
    titleColor:   "rgba(20,60,30,0.95)",
    descColor:    "rgba(40,90,50,0.7)",
    tagColor:     "rgba(30,110,40,0.9)",
    tagBg:        "rgba(80,160,80,0.12)",
    tagBorder:    "rgba(80,160,80,0.3)",
    ctaColor:     "rgba(30,110,40,0.9)",
    ctaHover:     "rgba(10,70,20,1)",
    ctaBorder:    "rgba(80,160,80,0.4)",
    ctaBorderHov: "rgba(50,130,50,0.8)",
    counterBg:    "rgba(240,255,240,0.75)",
    counterBorder:"rgba(80,160,80,0.3)",
    counterColor: "rgba(40,100,50,0.75)",
    arrowBg:      "rgba(240,255,240,0.7)",
    arrowBorder:  "rgba(80,160,80,0.3)",
    arrowColor:   "rgba(30,100,40,0.8)",
    arrowHoverBg: "rgba(80,180,80,0.2)",
    arrowHoverBd: "rgba(60,150,60,0.6)",
    dotActive:    "rgba(60,150,60,0.9)",
    dotInactive:  "rgba(60,150,60,0.25)",
    dotGlow:      "rgba(60,150,60,0.5)",
    shimmer:      "linear-gradient(90deg, transparent, rgba(80,160,80,0.4), transparent)",
    separator:    "linear-gradient(90deg, transparent, rgba(80,160,80,0.3), transparent)",
    imgGradient:  "linear-gradient(to bottom, transparent 40%, rgba(240,255,240,0.95) 100%)",
    titleFont:    "'Cinzel', Georgia, serif",
    monoFont:     "'Lora', Georgia, serif",
    borderRadius: 20,
  },
  "fantasy-night": {
    bg:           "rgba(8,16,40,0.88)",
    border:       "rgba(70,130,210,0.22)",
    shadow:       "0 16px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(139,196,248,0.05)",
    titleColor:   "rgba(200,228,255,0.95)",
    descColor:    "rgba(139,196,248,0.65)",
    tagColor:     "rgba(139,196,248,0.85)",
    tagBg:        "rgba(30,70,160,0.15)",
    tagBorder:    "rgba(70,130,210,0.25)",
    ctaColor:     "rgba(139,196,248,0.9)",
    ctaHover:     "rgba(200,228,255,1)",
    ctaBorder:    "rgba(70,130,210,0.35)",
    ctaBorderHov: "rgba(139,196,248,0.7)",
    counterBg:    "rgba(8,16,40,0.75)",
    counterBorder:"rgba(70,130,210,0.28)",
    counterColor: "rgba(139,196,248,0.7)",
    arrowBg:      "rgba(8,16,40,0.65)",
    arrowBorder:  "rgba(70,130,210,0.25)",
    arrowColor:   "rgba(139,196,248,0.8)",
    arrowHoverBg: "rgba(40,80,180,0.4)",
    arrowHoverBd: "rgba(139,196,248,0.5)",
    dotActive:    "rgba(139,196,248,0.9)",
    dotInactive:  "rgba(139,196,248,0.22)",
    dotGlow:      "rgba(139,196,248,0.55)",
    shimmer:      "linear-gradient(90deg, transparent, rgba(139,196,248,0.45), transparent)",
    separator:    "linear-gradient(90deg, transparent, rgba(70,130,210,0.3), transparent)",
    imgGradient:  "linear-gradient(to bottom, transparent 40%, rgba(8,16,40,0.95) 100%)",
    titleFont:    "'Cinzel', Georgia, serif",
    monoFont:     "'Lora', Georgia, serif",
    borderRadius: 20,
  },
};

export default function HeroCarousel() {
  const { theme } = useTheme();
  const c = CARD_THEME[theme] ?? CARD_THEME.tech;

  const [current, setCurrent]   = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused]     = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(t);
  }, [paused]);

  const go = (idx) => { setDirection(idx > current ? 1 : -1); setCurrent(idx); };
  const prev = () => { setDirection(-1); setCurrent((p) => (p - 1 + slides.length) % slides.length); };
  const next = () => { setDirection(1);  setCurrent((p) => (p + 1) % slides.length); };

  const slide = slides[current];

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{
        position: "relative",
        width: 300,
        height: 400,
        borderRadius: c.borderRadius,
        overflow: "hidden",
        border: `1px solid ${c.border}`,
        background: c.bg,
        boxShadow: c.shadow,
        backdropFilter: "blur(12px)",
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        transition: "background 0.6s, border-color 0.6s, box-shadow 0.6s",
      }}
    >
      {/* Image area */}
      <div style={{ position: "relative", height: 180, flexShrink: 0, overflow: "hidden" }}>
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            initial={{ x: direction * 80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction * -80, opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: "absolute", inset: 0 }}
          >
            <Image fill src={slide.src} alt={slide.title} style={{ objectFit: "cover" }} />
            <div style={{ position: "absolute", inset: 0, background: c.imgGradient }} />
          </motion.div>
        </AnimatePresence>

        {/* Slide counter */}
        <div
          style={{
            position: "absolute", top: 10, right: 10, zIndex: 10,
            background: c.counterBg,
            border: `1px solid ${c.counterBorder}`,
            borderRadius: 20, padding: "2px 8px",
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.6rem", color: c.counterColor,
            letterSpacing: "0.1em", backdropFilter: "blur(6px)",
          }}
        >
          {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
        </div>

        {/* Arrows */}
        {[{ fn: prev, side: "left", icon: "‹" }, { fn: next, side: "right", icon: "›" }].map(
          ({ fn, side, icon }) => (
            <button
              key={side}
              onClick={fn}
              style={{
                position: "absolute", [side]: 8, top: "50%", transform: "translateY(-50%)",
                zIndex: 20, background: c.arrowBg, border: `1px solid ${c.arrowBorder}`,
                borderRadius: 6, color: c.arrowColor, width: 26, height: 26,
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", fontSize: "0.9rem", backdropFilter: "blur(6px)",
                transition: "background 0.2s, border-color 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = c.arrowHoverBg;
                e.currentTarget.style.borderColor = c.arrowHoverBd;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = c.arrowBg;
                e.currentTarget.style.borderColor = c.arrowBorder;
              }}
            >
              {icon}
            </button>
          )
        )}
      </div>

      {/* Content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "14px 16px 14px", gap: 8, position: "relative" }}>
        <div style={{ position: "absolute", top: 0, left: 16, right: 16, height: "1px", background: c.separator }} />

        <AnimatePresence mode="wait">
          <motion.h3
            key={current + "-title"}
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35 }}
            style={{ margin: 0, color: c.titleColor, fontSize: "0.95rem", fontWeight: 600, fontFamily: c.titleFont, letterSpacing: "0.01em" }}
          >
            {slide.title}
          </motion.h3>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div
            key={current + "-tags"}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.05 }}
            style={{ display: "flex", flexWrap: "wrap", gap: 5 }}
          >
            {slide.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: "'DM Mono', monospace", fontSize: "0.58rem",
                  letterSpacing: "0.08em", color: c.tagColor,
                  background: c.tagBg, border: `1px solid ${c.tagBorder}`,
                  borderRadius: 4, padding: "2px 7px", textTransform: "uppercase",
                  transition: "color 0.5s, background 0.5s",
                }}
              >
                {tag}
              </span>
            ))}
          </motion.div>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.p
            key={current + "-desc"}
            initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.35, delay: 0.08 }}
            style={{ margin: 0, color: c.descColor, fontSize: "0.72rem", lineHeight: 1.55, fontFamily: c.monoFont, flex: 1, transition: "color 0.5s" }}
          >
            {slide.description}
          </motion.p>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div
            key={current + "-cta"}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.12 }}
          >
            <Link
              href={slide.href}
              style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                fontFamily: "'DM Mono', monospace", fontSize: "0.65rem",
                letterSpacing: "0.12em", textTransform: "uppercase",
                color: c.ctaColor, textDecoration: "none",
                borderBottom: `1px solid ${c.ctaBorder}`, paddingBottom: 1,
                transition: "color 0.2s, border-color 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = c.ctaHover;
                e.currentTarget.style.borderBottomColor = c.ctaBorderHov;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = c.ctaColor;
                e.currentTarget.style.borderBottomColor = c.ctaBorder;
              }}
            >
              View Project
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots */}
      <div style={{ display: "flex", justifyContent: "center", gap: 5, paddingBottom: 12 }}>
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            style={{
              width: i === current ? 20 : 5, height: 5, borderRadius: 3,
              border: "none",
              background: i === current ? c.dotActive : c.dotInactive,
              cursor: "pointer", padding: 0,
              transition: "width 0.3s ease, background 0.3s ease",
              boxShadow: i === current ? `0 0 8px ${c.dotGlow}` : "none",
            }}
          />
        ))}
      </div>

      {/* Top shimmer */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: c.shimmer, zIndex: 10 }} />
    </div>
  );
}