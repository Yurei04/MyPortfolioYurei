"use client";

import HeroCarousel from "@/components/heroComp/heroCarousel";
import ClockStatus from "@/components/heroComp/clockStatus";
import { useTheme } from "@/app/themeProvider";
import { motion } from "framer-motion";
import { useState } from "react";
import { Code2, Computer } from "lucide-react";

// ── Animation helpers ─────────────────────────────────────
const fadeUp = (delay = 0, x = 0) => ({
  initial:    { opacity: 0, y: 28, x },
  animate:    { opacity: 1, y: 0, x: 0 },
  transition: { duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] },
});

// ── SVG Social Icons ──────────────────────────────────────
const GithubIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);
const LinkedinIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);
const TwitterIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);
const MailIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="m2 7 10 7 10-7"/>
  </svg>
);

// ── Social links data — swap hrefs to match your real profiles ────
const SOCIAL_LINKS = [
  { Icon: GithubIcon,   href: "https://github.com/YureiYuri",          label: "GitHub"   },
  { Icon: LinkedinIcon, href: "https://linkedin.com/in/yourusername",  label: "LinkedIn" },
  { Icon: Code2,  href: "https://twitter.com/YureiYuri",         label: "Devpost"  },
  { Icon: MailIcon,     href: "mailto:hello@youremail.com",            label: "Email"    },
  { Icon: Computer,     href: "mailto:hello@youremail.com",            label: "HuggingFace"    },
];

// ── Per-theme config ──────────────────────────────────────
const THEME_CONFIG = {
  tech: {
    // backgrounds
    bgImage:    null,
    bgGradient: `
      radial-gradient(ellipse 80% 60% at 10% 90%, rgba(17,51,153,0.55) 0%, transparent 60%),
      radial-gradient(ellipse 60% 50% at 90% 10%, rgba(10,35,110,0.45) 0%, transparent 55%),
      radial-gradient(ellipse 55% 65% at 50% 45%, rgba(8,22,80,0.3)  0%, transparent 65%),
      linear-gradient(135deg, #02040e 0%, #05091a 35%, #070f24 65%, #030710 100%)
    `,
    showGrid:     true,
    gridColor:    "rgba(40,100,255,0.035)",
    showNoise:    true,
    overlayColor: null,

    // name block
    nameColor:        "#e8f0ff",
    nameHoverColor:   "#a0c4ff",
    nameHoverShadow:  "0 0 24px rgba(99,160,255,0.6)",
    titleColor:       "rgba(148,180,255,0.75)",
    titleHoverColor:  "rgba(180,210,255,0.9)",
    borderColor:      "rgba(59,130,246,0.5)",
    borderHoverColor: "rgba(99,160,255,0.8)",

    // big heading
    headingGradient:      "linear-gradient(135deg, #c8d8ff 0%, #6ea0ff 50%, #3b6fd4 100%)",
    headingHoverGradient: "linear-gradient(135deg, #ffffff 0%, #a8c8ff 40%, #6ea0ff 100%)",
    headingHoverShadow:   "drop-shadow(0 0 30px rgba(99,160,255,0.35))",
    headingLine1:         "Full Stack",
    headingLine2:         "AI DEVELOPER",

    // separator + handle
    separatorBg:     "linear-gradient(90deg, rgba(59,130,246,0.9) 0%, rgba(99,160,255,0.35) 80%, transparent 100%)",
    handleColor:     "rgba(148,180,255,0.6)",
    handleHoverColor:"rgba(180,210,255,0.85)",
    handleShadow:    "0 0 18px rgba(99,160,255,0.5)",
    scrollColor:     "rgba(99,160,255,0.3)",

    // identity
    titleTags:  ["Full Stack Developer", "AI Developer"],
    fontFamily: "'Playfair Display', Georgia, serif",

    // bio
    bio:      "I build full-stack systems and AI-powered tools — crafting products where intelligent design meets robust engineering. Clean code, meaningful experiences, always.",
    bioColor: "rgba(148,180,255,0.6)",

    // currently working on
    currentWork:       "Building an AI-powered code review tool",
    currentWorkBg:     "rgba(30,70,180,0.18)",
    currentWorkBorder: "rgba(59,130,246,0.3)",
    currentWorkColor:  "rgba(148,180,255,0.9)",
    currentWorkDot:    "#6ea0ff",

    // social links
    socialColor:      "rgba(99,140,220,0.5)",
    socialHoverColor: "rgba(148,180,255,0.95)",
    socialHoverBg:    "rgba(59,130,246,0.1)",
    socialBorder:     "rgba(59,130,246,0.18)",

    // right panel
    panelLabel:      "// recent.work",
    panelLabelColor: "rgba(99,140,220,0.45)",
  },

  "fantasy-morning": {
    bgImage:   "/images/fantasyImages/morning/bkg4Morning.png",
    bgGradient: `
      radial-gradient(ellipse 90% 50% at 95%  5%, rgba(255,230,120,0.45) 0%, transparent 55%),
      radial-gradient(ellipse 70% 60% at 10% 80%, rgba(80,160,90,0.35)   0%, transparent 60%),
      linear-gradient(170deg, rgba(200,240,255,0.15) 0%, rgba(120,200,140,0.2) 50%, rgba(60,120,70,0.4) 100%)
    `,
    showGrid:     false,
    showNoise:    false,
    overlayColor: null,

    nameColor:        "#1a3020",
    nameHoverColor:   "#0d2015",
    nameHoverShadow:  "0 0 20px rgba(60,140,60,0.35)",
    titleColor:       "rgba(40,90,50,0.85)",
    titleHoverColor:  "rgba(20,60,30,0.95)",
    borderColor:      "rgba(70,150,70,0.55)",
    borderHoverColor: "rgba(50,130,50,0.85)",

    headingGradient:      "linear-gradient(135deg, #1a4a24 0%, #2e8040 50%, #4aaf5e 100%)",
    headingHoverGradient: "linear-gradient(135deg, #0d2e15 0%, #226030 40%, #38954c 100%)",
    headingHoverShadow:   "drop-shadow(0 0 28px rgba(60,160,60,0.3))",
    headingLine1:         "Creative",
    headingLine2:         "DESIGNER",

    separatorBg:     "linear-gradient(90deg, rgba(60,140,60,0.85) 0%, rgba(90,170,70,0.3) 80%, transparent 100%)",
    handleColor:     "rgba(40,90,50,0.7)",
    handleHoverColor:"rgba(20,60,30,0.95)",
    handleShadow:    "0 0 16px rgba(60,150,60,0.4)",
    scrollColor:     "rgba(60,150,60,0.3)",

    titleTags:  ["Visual Designer", "World Builder"],
    fontFamily: "'Cinzel', Georgia, serif",

    bio:      "A world-builder and visual storyteller. I weave digital experiences that feel alive — blending artistry with code to create realms where creativity has no limits.",
    bioColor: "rgba(40,90,50,0.72)",

    currentWork:       "Crafting a realm atlas generator",
    currentWorkBg:     "rgba(60,140,60,0.1)",
    currentWorkBorder: "rgba(70,150,70,0.3)",
    currentWorkColor:  "rgba(30,90,40,0.9)",
    currentWorkDot:    "#4aaf5e",

    socialColor:      "rgba(40,100,50,0.5)",
    socialHoverColor: "rgba(20,70,30,0.95)",
    socialHoverBg:    "rgba(70,150,70,0.1)",
    socialBorder:     "rgba(70,150,70,0.2)",

    panelLabel:      "✦ recent work ✦",
    panelLabelColor: "rgba(60,120,60,0.45)",
  },

  "fantasy-night": {
    bgImage:   "/images/fantasyImages/night/bkg1Night.png",
    bgGradient: `
      radial-gradient(ellipse 70% 50% at 80% 10%, rgba(30,60,130,0.5)  0%, transparent 55%),
      radial-gradient(ellipse 80% 60% at 10% 80%, rgba(10,25,70,0.45)  0%, transparent 60%),
      linear-gradient(170deg, rgba(6,14,28,0.5) 0%, rgba(10,22,55,0.45) 60%, rgba(4,8,20,0.6) 100%)
    `,
    showGrid:     false,
    showNoise:    true,
    overlayColor: "rgba(4,8,22,0.25)",

    nameColor:        "#c8e4ff",
    nameHoverColor:   "#e8f4ff",
    nameHoverShadow:  "0 0 24px rgba(139,196,248,0.55)",
    titleColor:       "rgba(139,196,248,0.75)",
    titleHoverColor:  "rgba(200,228,255,0.9)",
    borderColor:      "rgba(70,130,210,0.4)",
    borderHoverColor: "rgba(139,196,248,0.7)",

    headingGradient:      "linear-gradient(135deg, #c8e4ff 0%, #8bc4f8 50%, #4a8fd4 100%)",
    headingHoverGradient: "linear-gradient(135deg, #ffffff 0%, #c8e4ff 40%, #8bc4f8 100%)",
    headingHoverShadow:   "drop-shadow(0 0 30px rgba(139,196,248,0.35))",
    headingLine1:         "Creative",
    headingLine2:         "DESIGNER",

    separatorBg:     "linear-gradient(90deg, rgba(70,130,210,0.85) 0%, rgba(139,196,248,0.3) 80%, transparent 100%)",
    handleColor:     "rgba(139,196,248,0.6)",
    handleHoverColor:"rgba(200,228,255,0.9)",
    handleShadow:    "0 0 18px rgba(139,196,248,0.5)",
    scrollColor:     "rgba(139,196,248,0.3)",

    titleTags:  ["Visual Designer", "World Builder"],
    fontFamily: "'Cinzel', Georgia, serif",

    bio:      "Under starlit skies I weave code and lore — crafting digital worlds where mystery meets precision, and every pixel tells a story worth exploring.",
    bioColor: "rgba(139,196,248,0.6)",

    currentWork:       "Weaving a lore management system",
    currentWorkBg:     "rgba(30,70,160,0.18)",
    currentWorkBorder: "rgba(70,130,210,0.3)",
    currentWorkColor:  "rgba(139,196,248,0.9)",
    currentWorkDot:    "#8bc4f8",

    socialColor:      "rgba(100,150,210,0.5)",
    socialHoverColor: "rgba(200,228,255,0.95)",
    socialHoverBg:    "rgba(70,130,210,0.12)",
    socialBorder:     "rgba(70,130,210,0.18)",

    panelLabel:      "✦ lore & legend ✦",
    panelLabelColor: "rgba(100,150,210,0.45)",
  },
};

// ── Scroll Indicator ──────────────────────────────────────
function ScrollIndicator({ color }) {
  return (
    <motion.div
      animate={{ y: [0, 6, 0] }}
      transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, opacity: 0.45 }}
    >
      <div style={{ width: 1, height: 26, background: `linear-gradient(to bottom, transparent, ${color})` }} />
      <div style={{ width: 5, height: 5, borderRadius: "50%", background: color }} />
    </motion.div>
  );
}

// ── Currently Working Pill ────────────────────────────────
function CurrentlyWorking({ cfg }) {
  return (
    <motion.div
      {...fadeUp(0.45)}
      style={{
        display:       "inline-flex",
        alignItems:    "center",
        gap:           8,
        padding:       "6px 14px 6px 10px",
        borderRadius:  100,
        background:    cfg.currentWorkBg,
        border:        `1px solid ${cfg.currentWorkBorder}`,
        backdropFilter:"blur(10px)",
        width:         "fit-content",
      }}
    >
      {/* Pulsing dot */}
      <motion.div
        animate={{ opacity: [1, 0.25, 1], scale: [1, 0.85, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        style={{
          width: 6, height: 6,
          borderRadius: "50%",
          background: cfg.currentWorkDot,
          flexShrink: 0,
        }}
      />
      <span style={{
        fontFamily:    "'DM Mono', monospace",
        fontSize:      "0.63rem",
        letterSpacing: "0.1em",
        color:         cfg.currentWorkColor,
        textTransform: "uppercase",
        whiteSpace:    "nowrap",
      }}>
        Now → {cfg.currentWork}
      </span>
    </motion.div>
  );
}

// ── Social Links ──────────────────────────────────────────
function SocialLinks({ cfg }) {
  const [hovered, setHovered] = useState(null);

  return (
    <motion.div
      {...fadeUp(0.95)}
      style={{ display: "flex", alignItems: "center", gap: 4 }}
    >
      {SOCIAL_LINKS.map(({ Icon, href, label }, i) => (
        <motion.a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
          whileHover={{ y: -2 }}
          transition={{ duration: 0.18 }}
          style={{
            display:         "flex",
            alignItems:      "center",
            justifyContent:  "center",
            width:           34,
            height:          34,
            borderRadius:    8,
            color:           hovered === i ? cfg.socialHoverColor : cfg.socialColor,
            background:      hovered === i ? cfg.socialHoverBg    : "transparent",
            border:          `1px solid ${hovered === i ? cfg.borderHoverColor : cfg.socialBorder}`,
            textDecoration:  "none",
            transition:      "color 0.22s, background 0.22s, border-color 0.22s",
            cursor:          "pointer",
          }}
        >
          <Icon />
        </motion.a>
      ))}

      {/* Thin divider */}
      <div style={{
        width:      1,
        height:     16,
        background: cfg.borderColor,
        margin:     "0 6px",
        opacity:    0.4,
      }} />

      <ScrollIndicator color={cfg.scrollColor} />
    </motion.div>
  );
}

// ── Theme-aware decorative accent (top-right) ─────────────
function DecorativeAccent({ theme, cfg }) {
  if (theme === "tech") {
    // Subtle glowing orb
    return (
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.07, 0.13, 0.07] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position:     "absolute",
          width:        480,
          height:       480,
          borderRadius: "50%",
          background:   "radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 70%)",
          top:          "-80px",
          right:        "120px",
          pointerEvents:"none",
          zIndex:       2,
        }}
      />
    );
  }
  if (theme === "fantasy-morning") {
    // Warm golden glow
    return (
      <motion.div
        animate={{ scale: [1, 1.06, 1], opacity: [0.12, 0.2, 0.12] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position:     "absolute",
          width:        420,
          height:       420,
          borderRadius: "50%",
          background:   "radial-gradient(circle, rgba(255,220,80,0.22) 0%, rgba(80,180,80,0.1) 50%, transparent 70%)",
          top:          "-60px",
          right:        "80px",
          pointerEvents:"none",
          zIndex:       2,
        }}
      />
    );
  }
  if (theme === "fantasy-night") {
    // Cool moon-like glow
    return (
      <motion.div
        animate={{ scale: [1, 1.08, 1], opacity: [0.08, 0.15, 0.08] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position:     "absolute",
          width:        400,
          height:       400,
          borderRadius: "50%",
          background:   "radial-gradient(circle, rgba(139,196,248,0.18) 0%, rgba(40,80,180,0.08) 55%, transparent 70%)",
          top:          "-70px",
          right:        "100px",
          pointerEvents:"none",
          zIndex:       2,
        }}
      />
    );
  }
  return null;
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
        width:         "100%",
        minHeight:     "100vh",
        position:      "relative",
        overflow:      "hidden",
        fontFamily:    cfg.fontFamily,
        transition:    "font-family 0.6s",
        display:       "flex",
        flexDirection: "column",
      }}
    >
      {/* ── Backgrounds ── */}
      {cfg.bgImage && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${cfg.bgImage}')`, zIndex: 0 }}
        />
      )}
      <div
        className="absolute inset-0"
        style={{ background: cfg.bgGradient, transition: "background 0.7s ease", zIndex: 1 }}
      />
      {cfg.overlayColor && (
        <div className="absolute inset-0" style={{ background: cfg.overlayColor, zIndex: 2 }} />
      )}
      {cfg.showGrid && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(${cfg.gridColor} 1px, transparent 1px), linear-gradient(90deg, ${cfg.gridColor} 1px, transparent 1px)`,
            backgroundSize:  "55px 55px",
            zIndex:          2,
          }}
        />
      )}
      {cfg.showNoise && (
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`,
            backgroundSize:  "180px 180px",
            zIndex:          3,
          }}
        />
      )}

      {/* ── Theme decorative accent ── */}
      <DecorativeAccent theme={theme} cfg={cfg} />

      {/* ════════════════════════════════════════════════
          Main two-column layout
          Left  → identity + bio + heading + socials
          Right → project carousel
      ════════════════════════════════════════════════ */}
      <div
        style={{
          position:            "relative",
          zIndex:              10,
          flex:                1,
          display:             "grid",
          gridTemplateColumns: "1fr 300px",
          gap:                 0,
          padding:             "80px 32px 0 48px",
          minHeight:           "calc(100vh - 80px)",
        }}
      >
        {/* ══ LEFT COLUMN ══════════════════════════════ */}
        <div
          style={{
            display:        "flex",
            flexDirection:  "column",
            justifyContent: "space-between",
            paddingRight:   40,
            paddingBottom:  32,
          }}
        >
          {/* ── TOP: Name + roles + clock + currently working ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

            {/* Name block */}
            <motion.div
              {...fadeUp(0.1)}
              onMouseEnter={() => setNameHovered(true)}
              onMouseLeave={() => setNameHovered(false)}
              style={{
                display:       "inline-flex",
                flexDirection: "column",
                gap:           4,
                cursor:        "default",
                alignSelf:     "flex-start",
              }}
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
                      color:         nameHovered ? cfg.titleHoverColor : cfg.titleColor,
                      fontSize:      "0.72rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      fontFamily:    "'DM Mono', monospace",
                      transition:    "color 0.3s",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </motion.div>

              <div style={{ marginTop: 10 }}>
                <ClockStatus />
              </div>
            </motion.div>

            {/* Currently working on pill */}
            <CurrentlyWorking cfg={cfg} />
          </div>

          {/* ── SPACER ── */}
          <div style={{ flex: 1 }} />

          {/* ── BOTTOM: Heading + bio + separator + handle + socials ── */}
          <div style={{ display: "flex", flexDirection: "column" }}>

            {/* Big heading */}
            <motion.h1
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              onMouseEnter={() => setPortfolioHovered(true)}
              onMouseLeave={() => setPortfolioHovered(false)}
              style={{
                fontSize:             "clamp(3.5rem, 8vw, 6.5rem)",
                fontWeight:           700,
                lineHeight:           0.92,
                letterSpacing:        "-0.025em",
                color:                "transparent",
                backgroundClip:       "text",
                WebkitBackgroundClip: "text",
                backgroundImage:      portfolioHovered ? cfg.headingHoverGradient : cfg.headingGradient,
                marginBottom:         "0.7rem",
                cursor:               "default",
                filter:               portfolioHovered ? cfg.headingHoverShadow : "none",
                transition:           "filter 0.4s, background-image 0.5s",
              }}
            >
              {cfg.headingLine1}
              <br />
              {cfg.headingLine2}
            </motion.h1>

            {/* Bio blurb — swap with your actual bio */}
            <motion.p
              {...fadeUp(0.5)}
              style={{
                fontFamily:    "'DM Mono', monospace",
                fontSize:      "0.78rem",
                lineHeight:    1.75,
                color:         cfg.bioColor,
                maxWidth:      400,
                marginBottom:  "1.25rem",
                letterSpacing: "0.008em",
                transition:    "color 0.5s",
              }}
            >
              {cfg.bio}
            </motion.p>

            {/* Separator + handle */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.6 }}
              style={{
                display:     "flex",
                alignItems:  "center",
                gap:         16,
                marginBottom: 14,
              }}
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
                  color:         yureiHovered ? cfg.handleHoverColor : cfg.handleColor,
                  fontSize:      "clamp(0.9rem, 1.6vw, 1.2rem)",
                  fontWeight:    400,
                  letterSpacing: "0.05em",
                  fontStyle:     "italic",
                  whiteSpace:    "nowrap",
                  cursor:        "default",
                  textShadow:    yureiHovered ? cfg.handleShadow : "none",
                  transition:    "color 0.3s, text-shadow 0.3s",
                }}
              >
                @YureiYuri
              </motion.span>
            </motion.div>

            {/* Social links + scroll indicator */}
            <SocialLinks cfg={cfg} />
          </div>
        </div>

        {/* ══ RIGHT COLUMN — project carousel ══════════ */}
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
          {/* Eyebrow label */}
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
        </motion.div>
      </div>
    </div>
  );
}