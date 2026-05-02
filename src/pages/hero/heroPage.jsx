"use client";

import HeroCarousel from "@/components/heroComp/heroCarousel";
import ClockStatus from "@/components/heroComp/clockStatus";
import ExperienceTimeline from "@/components/experienceComp/exprienceTimeline";
import { useTheme } from "@/app/themeProvider";
import { motion } from "framer-motion";
import { useState } from "react";

// ── Animation helpers ─────────────────────────────────────
const fadeUp = (delay = 0, x = 0) => ({
  initial:    { opacity: 0, y: 28, x },
  animate:    { opacity: 1, y: 0, x: 0 },
  transition: { duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] },
});

// ── Per-theme config ──────────────────────────────────────
const THEME_CONFIG = {
  tech: {
    bgImage:   null,
    bgGradient: `
      radial-gradient(ellipse 80% 60% at 10% 90%, rgba(17,51,153,0.55) 0%, transparent 60%),
      radial-gradient(ellipse 60% 50% at 90% 10%, rgba(10,35,110,0.45) 0%, transparent 55%),
      radial-gradient(ellipse 55% 65% at 50% 45%, rgba(8,22,80,0.3) 0%, transparent 65%),
      linear-gradient(135deg, #02040e 0%, #05091a 35%, #070f24 65%, #030710 100%)
    `,
    showGrid:  true,
    gridColor: "rgba(40,100,255,0.035)",
    showNoise: true,
    overlayColor: null,
    nameColor:        "#e8f0ff",
    nameHoverColor:   "#a0c4ff",
    nameHoverShadow:  "0 0 24px rgba(99,160,255,0.6)",
    titleColor:       "rgba(148,180,255,0.75)",
    titleHoverColor:  "rgba(180,210,255,0.9)",
    borderColor:      "rgba(59,130,246,0.5)",
    borderHoverColor: "rgba(99,160,255,0.8)",
    headingGradient:       "linear-gradient(135deg, #c8d8ff 0%, #6ea0ff 50%, #3b6fd4 100%)",
    headingHoverGradient:  "linear-gradient(135deg, #ffffff 0%, #a8c8ff 40%, #6ea0ff 100%)",
    headingHoverShadow:    "drop-shadow(0 0 30px rgba(99,160,255,0.35))",
    separatorBg:     "linear-gradient(90deg, rgba(59,130,246,0.9) 0%, rgba(99,160,255,0.35) 80%, transparent 100%)",
    handleColor:     "rgba(148,180,255,0.6)",
    handleHoverColor:"rgba(180,210,255,0.85)",
    handleShadow:    "0 0 18px rgba(99,160,255,0.5)",
    scrollColor:     "rgba(99,160,255,0.3)",
    headingLine1:    "Full Stack",
    headingLine2:    "AI DEVELOPER",
    titleTags:       ["Full Stack Developer", "AI Developer"],
    fontFamily:      "'Playfair Display', Georgia, serif",
    // Side panel label
    panelLabel:      "// recent.work",
    panelLabelColor: "rgba(99,140,220,0.5)",
    accentPill:      { bg: "rgba(30,70,180,0.15)", border: "rgba(59,130,246,0.25)", color: "rgba(148,180,255,0.8)" },
  },

  "fantasy-morning": {
    bgImage:   "/images/fantasyImages/morning/bkg4Morning.png",
    bgGradient: `
      radial-gradient(ellipse 90% 50% at 95% 5%, rgba(255,230,120,0.45) 0%, transparent 55%),
      radial-gradient(ellipse 70% 60% at 10% 80%, rgba(80,160,90,0.35) 0%, transparent 60%),
      linear-gradient(170deg, rgba(200,240,255,0.15) 0%, rgba(120,200,140,0.2) 50%, rgba(60,120,70,0.4) 100%)
    `,
    showGrid:  false,
    showNoise: false,
    overlayColor: null,
    nameColor:        "#1a3020",
    nameHoverColor:   "#0d2015",
    nameHoverShadow:  "0 0 20px rgba(60,140,60,0.35)",
    titleColor:       "rgba(40,90,50,0.85)",
    titleHoverColor:  "rgba(20,60,30,0.95)",
    borderColor:      "rgba(70,150,70,0.55)",
    borderHoverColor: "rgba(50,130,50,0.85)",
    headingGradient:       "linear-gradient(135deg, #1a4a24 0%, #2e8040 50%, #4aaf5e 100%)",
    headingHoverGradient:  "linear-gradient(135deg, #0d2e15 0%, #226030 40%, #38954c 100%)",
    headingHoverShadow:    "drop-shadow(0 0 28px rgba(60,160,60,0.3))",
    separatorBg:     "linear-gradient(90deg, rgba(60,140,60,0.85) 0%, rgba(90,170,70,0.3) 80%, transparent 100%)",
    handleColor:     "rgba(40,90,50,0.7)",
    handleHoverColor:"rgba(20,60,30,0.95)",
    handleShadow:    "0 0 16px rgba(60,150,60,0.4)",
    scrollColor:     "rgba(60,150,60,0.3)",
    headingLine1:    "Creative",
    headingLine2:    "DESIGNER",
    titleTags:       ["Visual Designer", "World Builder"],
    fontFamily:      "'Cinzel', Georgia, serif",
    panelLabel:      "✦ recent work ✦",
    panelLabelColor: "rgba(60,120,60,0.5)",
    accentPill:      { bg: "rgba(60,150,60,0.1)", border: "rgba(70,150,70,0.28)", color: "rgba(30,90,40,0.85)" },
  },

  "fantasy-night": {
    bgImage:   "/images/fantasyImages/night/bkg1Night.png",
    bgGradient: `
      radial-gradient(ellipse 70% 50% at 80% 10%, rgba(30,60,130,0.5) 0%, transparent 55%),
      radial-gradient(ellipse 80% 60% at 10% 80%, rgba(10,25,70,0.45) 0%, transparent 60%),
      linear-gradient(170deg, rgba(6,14,28,0.5) 0%, rgba(10,22,55,0.45) 60%, rgba(4,8,20,0.6) 100%)
    `,
    showGrid:  false,
    showNoise: true,
    overlayColor: "rgba(4,8,22,0.25)",
    nameColor:        "#c8e4ff",
    nameHoverColor:   "#e8f4ff",
    nameHoverShadow:  "0 0 24px rgba(139,196,248,0.55)",
    titleColor:       "rgba(139,196,248,0.75)",
    titleHoverColor:  "rgba(200,228,255,0.9)",
    borderColor:      "rgba(70,130,210,0.4)",
    borderHoverColor: "rgba(139,196,248,0.7)",
    headingGradient:       "linear-gradient(135deg, #c8e4ff 0%, #8bc4f8 50%, #4a8fd4 100%)",
    headingHoverGradient:  "linear-gradient(135deg, #ffffff 0%, #c8e4ff 40%, #8bc4f8 100%)",
    headingHoverShadow:    "drop-shadow(0 0 30px rgba(139,196,248,0.35))",
    separatorBg:     "linear-gradient(90deg, rgba(70,130,210,0.85) 0%, rgba(139,196,248,0.3) 80%, transparent 100%)",
    handleColor:     "rgba(139,196,248,0.6)",
    handleHoverColor:"rgba(200,228,255,0.9)",
    handleShadow:    "0 0 18px rgba(139,196,248,0.5)",
    scrollColor:     "rgba(139,196,248,0.3)",
    headingLine1:    "Creative",
    headingLine2:    "DESIGNER",
    titleTags:       ["Visual Designer", "World Builder"],
    fontFamily:      "'Cinzel', Georgia, serif",
    panelLabel:      "✦ lore & legend ✦",
    panelLabelColor: "rgba(100,150,210,0.5)",
    accentPill:      { bg: "rgba(30,70,160,0.15)", border: "rgba(70,130,210,0.25)", color: "rgba(139,196,248,0.85)" },
  },
};

// ── Scroll Indicator ──────────────────────────────────────
function ScrollIndicator({ color }) {
  return (
    <motion.div
      animate={{ y: [0, 6, 0] }}
      transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      style={{
        display:        "flex",
        flexDirection:  "column",
        alignItems:     "center",
        gap:            3,
        opacity:        0.5,
      }}
    >
      <div style={{
        width:        1,
        height:       28,
        background:   `linear-gradient(to bottom, transparent, ${color})`,
      }} />
      <div style={{
        width:        5,
        height:       5,
        borderRadius: "50%",
        background:   color,
      }} />
    </motion.div>
  );
}

// ── Hero Page ─────────────────────────────────────────────
export default function HeroPage() {
  const { theme } = useTheme();
  const cfg = THEME_CONFIG[theme] ?? THEME_CONFIG.tech;

  const [nameHovered,      setNameHovered]      = useState(false);
  const [portfolioHovered, setPortfolioHovered] = useState(false);
  const [yureiHovered,     setYureiHovered]     = useState(false);

  return (
    <div
      style={{
        width:        "100%",
        minHeight:    "100vh",
        position:     "relative",
        overflow:     "hidden",
        fontFamily:   cfg.fontFamily,
        transition:   "font-family 0.6s",
        display:      "flex",
        flexDirection:"column",
      }}
    >
      {/* ── Backgrounds ── */}
      {cfg.bgImage && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${cfg.bgImage}')`, zIndex: 0 }}
        />
      )}
      <div className="absolute inset-0" style={{ background: cfg.bgGradient, transition: "background 0.7s ease", zIndex: 1 }} />
      {cfg.overlayColor && (
        <div className="absolute inset-0" style={{ background: cfg.overlayColor, zIndex: 2 }} />
      )}
      {cfg.showGrid && (
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: `linear-gradient(${cfg.gridColor} 1px, transparent 1px), linear-gradient(90deg, ${cfg.gridColor} 1px, transparent 1px)`,
          backgroundSize:  "55px 55px",
          zIndex:          2,
        }} />
      )}
      {cfg.showNoise && (
        <div className="absolute inset-0 pointer-events-none opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`,
          backgroundSize:  "180px 180px",
          zIndex:          3,
        }} />
      )}

      {/* ── Main two-column layout ── */}
      <div
        style={{
          position:   "relative",
          zIndex:     10,
          flex:       1,
          display:    "grid",
          gridTemplateColumns: "1fr 320px",
          gap:        0,
          padding:    "80px 32px 0 48px", // top = navbar offset
          minHeight:  "calc(100vh - 80px)",
        }}
      >
        {/* ══ LEFT COLUMN ══════════════════════════════ */}
        <div
          style={{
            display:       "flex",
            flexDirection: "column",
            justifyContent:"space-between",
            paddingRight:  40,
            paddingBottom: 32,
          }}
        >
          {/* ── Name block (top) ── */}
          <motion.div
            {...fadeUp(0.1)}
            onMouseEnter={() => setNameHovered(true)}
            onMouseLeave={() => setNameHovered(false)}
            style={{ display: "inline-flex", flexDirection: "column", gap: 4, cursor: "default", alignSelf: "flex-start" }}
          >
            <motion.span
              animate={{
                color:      nameHovered ? cfg.nameHoverColor : cfg.nameColor,
                textShadow: nameHovered ? cfg.nameHoverShadow : "0 0 0px transparent",
              }}
              transition={{ duration: 0.3 }}
              style={{ fontSize: "1.25rem", fontWeight: 600, letterSpacing: "0.01em" }}
            >
              James Yuri R. Avila
            </motion.span>

            <motion.div
              animate={{ borderLeftColor: nameHovered ? cfg.borderHoverColor : cfg.borderColor }}
              transition={{ duration: 0.3 }}
              style={{
                marginTop:     4,
                display:       "flex",
                flexDirection: "column",
                gap:           2,
                paddingLeft:   14,
                borderLeft:    `2px solid ${cfg.borderColor}`,
              }}
            >
              {cfg.titleTags.map((t, i) => (
                <span
                  key={i}
                  style={{
                    color:          nameHovered ? cfg.titleHoverColor : cfg.titleColor,
                    fontSize:       "0.72rem",
                    letterSpacing:  "0.12em",
                    textTransform:  "uppercase",
                    fontFamily:     "'DM Mono', monospace",
                    transition:     "color 0.3s",
                  }}
                >
                  {t}
                </span>
              ))}
            </motion.div>

            <div style={{ marginTop: 14 }}>
              <ClockStatus />
            </div>
          </motion.div>

          {/* ── Spacer ── */}
          <div style={{ flex: 1 }} />

          {/* ── Big heading + separator + handle (bottom) ── */}
          <div>
            <motion.h1
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              onMouseEnter={() => setPortfolioHovered(true)}
              onMouseLeave={() => setPortfolioHovered(false)}
              style={{
                fontSize:         "clamp(3.5rem, 8vw, 6.5rem)",
                fontWeight:       700,
                lineHeight:       0.92,
                letterSpacing:    "-0.025em",
                color:            "transparent",
                backgroundClip:   "text",
                WebkitBackgroundClip: "text",
                backgroundImage:  portfolioHovered ? cfg.headingHoverGradient : cfg.headingGradient,
                marginBottom:     "0.6rem",
                cursor:           "default",
                filter:           portfolioHovered ? cfg.headingHoverShadow : "none",
                transition:       "filter 0.4s, background-image 0.5s",
              }}
            >
              {cfg.headingLine1}
              <br />
              {cfg.headingLine2}
            </motion.h1>

            {/* Separator + handle */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.6 }}
              style={{ display: "flex", alignItems: "center", gap: 16, paddingBottom: 8 }}
            >
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  flex:            1,
                  transformOrigin: "left center",
                  height:          "1.5px",
                  background:      cfg.separatorBg,
                  transition:      "background 0.6s",
                }}
              />

              <motion.span
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 1.0 }}
                onMouseEnter={() => setYureiHovered(true)}
                onMouseLeave={() => setYureiHovered(false)}
                style={{
                  color:       yureiHovered ? cfg.handleHoverColor : cfg.handleColor,
                  fontSize:    "clamp(0.9rem, 1.6vw, 1.2rem)",
                  fontWeight:  400,
                  letterSpacing: "0.05em",
                  fontStyle:   "italic",
                  whiteSpace:  "nowrap",
                  cursor:      "default",
                  textShadow:  yureiHovered ? cfg.handleShadow : "none",
                  transition:  "color 0.3s, text-shadow 0.3s",
                }}
              >
                @YureiYuri
              </motion.span>

              <ScrollIndicator color={cfg.scrollColor} />
            </motion.div>
          </div>
        </div>

        {/* ══ RIGHT COLUMN ═════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{
            display:        "flex",
            flexDirection:  "column",
            gap:            14,
            paddingBottom:  32,
            overflowY:      "auto",
            overflowX:      "visible",
            scrollbarWidth: "none",
            maxHeight:      "calc(100vh - 100px)",
          }}
        >
          {/* Panel eyebrow label */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            style={{
              fontFamily:    "'DM Mono', monospace",
              fontSize:      "0.58rem",
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color:         cfg.panelLabelColor,
              marginBottom:  -4,
              textAlign:     "right",
              transition:    "color 0.6s",
            }}
          >
            {cfg.panelLabel}
          </motion.p>

          <HeroCarousel />
          <ExperienceTimeline />
        </motion.div>
      </div>
    </div>
  );
}