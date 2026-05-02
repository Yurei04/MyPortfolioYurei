"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/app/themeProvider";
import Link from "next/link";
import { useState } from "react";

// ── Per-theme tokens ──────────────────────────────────────
const NAV_THEME = {
  tech: {
    bg:            "rgba(4,10,28,0.72)",
    border:        "rgba(59,130,246,0.22)",
    shadow:        "0 8px 32px rgba(0,0,0,0.45), 0 0 0 1px rgba(99,160,255,0.04)",
    nameColor:     "rgba(220,235,255,0.92)",
    nameFont:      "'Playfair Display', Georgia, serif",
    linkColor:     "rgba(148,180,255,0.55)",
    linkHover:     "rgba(200,225,255,0.92)",
    linkHoverBg:   "rgba(59,130,246,0.12)",
    activeColor:   "rgba(200,225,255,0.95)",
    activeBg:      "rgba(59,130,246,0.18)",
    activeBorder:  "rgba(99,160,255,0.38)",
    divider:       "rgba(59,130,246,0.14)",
    monoFont:      "'DM Mono', monospace",
    modeIcons:     ["</>", "✦", "☽"],
  },
  "fantasy-morning": {
    bg:            "rgba(235,255,235,0.76)",
    border:        "rgba(70,150,70,0.22)",
    shadow:        "0 8px 32px rgba(0,0,0,0.1), 0 0 0 1px rgba(70,150,70,0.06)",
    nameColor:     "rgba(20,60,30,0.92)",
    nameFont:      "'Cinzel', Georgia, serif",
    linkColor:     "rgba(40,90,50,0.55)",
    linkHover:     "rgba(15,60,25,0.92)",
    linkHoverBg:   "rgba(60,150,60,0.1)",
    activeColor:   "rgba(15,60,25,0.95)",
    activeBg:      "rgba(60,150,60,0.14)",
    activeBorder:  "rgba(60,150,60,0.38)",
    divider:       "rgba(70,150,70,0.14)",
    monoFont:      "'DM Mono', monospace",
    modeIcons:     ["</>", "✦", "☽"],
  },
  "fantasy-night": {
    bg:            "rgba(8,16,40,0.76)",
    border:        "rgba(70,130,210,0.2)",
    shadow:        "0 8px 32px rgba(0,0,0,0.55), 0 0 0 1px rgba(139,196,248,0.04)",
    nameColor:     "rgba(200,228,255,0.92)",
    nameFont:      "'Cinzel', Georgia, serif",
    linkColor:     "rgba(139,196,248,0.52)",
    linkHover:     "rgba(200,228,255,0.92)",
    linkHoverBg:   "rgba(70,130,210,0.14)",
    activeColor:   "rgba(200,228,255,0.95)",
    activeBg:      "rgba(70,130,210,0.18)",
    activeBorder:  "rgba(139,196,248,0.35)",
    divider:       "rgba(70,130,210,0.14)",
    monoFont:      "'DM Mono', monospace",
    modeIcons:     ["</>", "✦", "☽"],
  },
};

const MODES = [
  { key: "tech",            icon: "</>", title: "Dev Mode" },
  { key: "fantasy-morning", icon: "✦",   title: "Design Mode" },
  { key: "fantasy-night",   icon: "☽",   title: "Night Mode" },
];

const NAV_LINKS = [
  { label: "Work",       href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "About",      href: "#about" },
  { label: "Contact",    href: "#contact" },
];

// ── Tooltip ───────────────────────────────────────────────
function Tooltip({ children, label }) {
  const [visible, setVisible] = useState(false);
  return (
    <div
      style={{ position: "relative" }}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div style={{
          position: "absolute",
          bottom: -30,
          left: "50%",
          transform: "translateX(-50%)",
          background: "rgba(0,0,0,0.75)",
          color: "#fff",
          fontSize: "0.58rem",
          letterSpacing: "0.08em",
          padding: "3px 8px",
          borderRadius: 6,
          whiteSpace: "nowrap",
          pointerEvents: "none",
          fontFamily: "'DM Mono', monospace",
          textTransform: "uppercase",
          zIndex: 200,
        }}>
          {label}
        </div>
      )}
    </div>
  );
}

// ── NavBar ────────────────────────────────────────────────
export default function NavBar() {
  const { theme, setTheme } = useTheme();
  const c = NAV_THEME[theme] ?? NAV_THEME.tech;

  return (
    <motion.nav
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
      aria-label="Main navigation"
      style={{
        position:        "fixed",
        top:             16,
        left:            "50%",
        transform:       "translateX(-50%)",
        zIndex:          100,
        display:         "flex",
        alignItems:      "center",
        height:          44,
        background:      c.bg,
        border:          `1px solid ${c.border}`,
        borderRadius:    999,
        backdropFilter:  "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        boxShadow:       c.shadow,
        transition:      "background 0.6s, border-color 0.6s, box-shadow 0.6s",
        userSelect:      "none",
      }}
    >
      {/* ── Logo / Name ──────── */}
      <Link
        href="/"
        style={{
          fontFamily:    c.nameFont,
          fontSize:      "0.82rem",
          fontWeight:    600,
          letterSpacing: "0.015em",
          color:         c.nameColor,
          textDecoration:"none",
          padding:       "0 16px 0 18px",
          whiteSpace:    "nowrap",
          transition:    "color 0.3s",
          lineHeight:    1,
        }}
      >
        James Yuri
      </Link>

      {/* ── Divider ──────────── */}
      <Divider c={c} />

      {/* ── Nav links ────────── */}
      <div style={{ display: "flex", alignItems: "center", padding: "0 10px", gap: 2 }}>
        {NAV_LINKS.map(({ label, href }) => (
          <NavLink key={label} href={href} c={c}>{label}</NavLink>
        ))}
      </div>

      {/* ── Divider ──────────── */}
      <Divider c={c} />

      {/* ── Theme switcher ───── */}
      <div style={{ display: "flex", alignItems: "center", padding: "0 8px", gap: 3 }}>
        {MODES.map(({ key, icon, title }) => (
          <Tooltip key={key} label={title}>
            <motion.button
              onClick={() => setTheme(key)}
              whileTap={{ scale: 0.9 }}
              style={{
                fontFamily:    c.monoFont,
                fontSize:      key === "fantasy-morning" ? "0.78rem" : key === "fantasy-night" ? "0.88rem" : "0.68rem",
                width:         32,
                height:        32,
                borderRadius:  999,
                border:        theme === key ? `1px solid ${c.activeBorder}` : "1px solid transparent",
                background:    theme === key ? c.activeBg : "transparent",
                color:         theme === key ? c.activeColor : c.linkColor,
                cursor:        "pointer",
                display:       "flex",
                alignItems:    "center",
                justifyContent:"center",
                transition:    "all 0.25s",
                padding:       0,
              }}
            >
              {icon}
            </motion.button>
          </Tooltip>
        ))}
      </div>

      {/* ── Right padding ────── */}
      <div style={{ width: 6 }} />
    </motion.nav>
  );
}

// ── Sub-components ────────────────────────────────────────
function Divider({ c }) {
  return (
    <div style={{
      width:      1,
      height:     20,
      flexShrink: 0,
      background: c.divider,
      transition: "background 0.6s",
    }} />
  );
}

function NavLink({ href, children, c }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily:    "'DM Mono', monospace",
        fontSize:      "0.6rem",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color:         hovered ? c.linkHover : c.linkColor,
        textDecoration:"none",
        padding:       "5px 11px",
        borderRadius:  999,
        background:    hovered ? c.linkHoverBg : "transparent",
        transition:    "all 0.2s",
        whiteSpace:    "nowrap",
      }}
    >
      {children}
    </a>
  );
}