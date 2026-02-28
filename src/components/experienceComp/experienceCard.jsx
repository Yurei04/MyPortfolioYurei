"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/app/themeProvider";

// ── Card theme tokens ──────────────────────────────────────
const CARD_THEME = {
  tech: {
    bg:            "rgba(6, 12, 32, 0.82)",
    bgHover:       "rgba(10, 20, 50, 0.9)",
    border:        "rgba(59,130,246,0.18)",
    borderHover:   "rgba(99,160,255,0.45)",
    shadow:        "0 8px 40px rgba(0,0,0,0.5)",
    shadowHover:   "0 16px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(99,160,255,0.12)",
    glowHover:     "0 0 40px rgba(60,120,255,0.15)",
    radius:        10,
    roleColor:     "rgba(220,235,255,0.95)",
    companyColor:  "rgba(99,160,255,0.8)",
    periodColor:   "rgba(80,120,200,0.6)",
    descColor:     "rgba(148,180,255,0.65)",
    tagColor:      "rgba(99,160,255,0.85)",
    tagBg:         "rgba(30,70,180,0.15)",
    tagBorder:     "rgba(59,130,246,0.25)",
    highlightColor:"rgba(99,160,255,0.9)",
    highlightBg:   "rgba(20,60,180,0.15)",
    highlightBord: "rgba(59,130,246,0.3)",
    divider:       "rgba(59,130,246,0.12)",
    iconBg:        "rgba(20,50,160,0.3)",
    iconBorder:    "rgba(59,130,246,0.3)",
    accentBar:     "linear-gradient(180deg, rgba(59,130,246,0.8), rgba(99,160,255,0.2))",
    titleFont:     "'Playfair Display', Georgia, serif",
    monoFont:      "'DM Mono', monospace",
    locationColor: "rgba(80,120,200,0.55)",
  },
  "fantasy-morning": {
    bg:            "rgba(235,252,235,0.78)",
    bgHover:       "rgba(220,248,220,0.9)",
    border:        "rgba(70,150,70,0.2)",
    borderHover:   "rgba(60,150,60,0.5)",
    shadow:        "0 8px 40px rgba(0,0,0,0.1)",
    shadowHover:   "0 16px 50px rgba(0,0,0,0.15), 0 0 0 1px rgba(60,150,60,0.1)",
    glowHover:     "0 0 40px rgba(60,160,60,0.12)",
    radius:        16,
    roleColor:     "rgba(15,50,20,0.95)",
    companyColor:  "rgba(40,120,50,0.85)",
    periodColor:   "rgba(60,110,60,0.6)",
    descColor:     "rgba(30,80,40,0.7)",
    tagColor:      "rgba(25,105,35,0.9)",
    tagBg:         "rgba(60,160,60,0.1)",
    tagBorder:     "rgba(70,150,70,0.3)",
    highlightColor:"rgba(25,105,35,0.9)",
    highlightBg:   "rgba(60,160,60,0.1)",
    highlightBord: "rgba(70,150,70,0.35)",
    divider:       "rgba(70,150,70,0.15)",
    iconBg:        "rgba(60,160,60,0.12)",
    iconBorder:    "rgba(70,150,70,0.3)",
    accentBar:     "linear-gradient(180deg, rgba(60,150,60,0.7), rgba(80,180,80,0.15))",
    titleFont:     "'Cinzel', Georgia, serif",
    monoFont:      "'Lora', Georgia, serif",
    locationColor: "rgba(60,110,60,0.55)",
  },
  "fantasy-night": {
    bg:            "rgba(7,14,38,0.82)",
    bgHover:       "rgba(12,22,55,0.9)",
    border:        "rgba(70,130,210,0.18)",
    borderHover:   "rgba(139,196,248,0.4)",
    shadow:        "0 8px 40px rgba(0,0,0,0.55)",
    shadowHover:   "0 16px 60px rgba(0,0,0,0.65), 0 0 0 1px rgba(139,196,248,0.1)",
    glowHover:     "0 0 40px rgba(100,160,240,0.12)",
    radius:        14,
    roleColor:     "rgba(200,228,255,0.95)",
    companyColor:  "rgba(139,196,248,0.8)",
    periodColor:   "rgba(100,150,210,0.6)",
    descColor:     "rgba(139,196,248,0.62)",
    tagColor:      "rgba(139,196,248,0.85)",
    tagBg:         "rgba(30,70,160,0.15)",
    tagBorder:     "rgba(70,130,210,0.28)",
    highlightColor:"rgba(139,196,248,0.9)",
    highlightBg:   "rgba(30,70,160,0.15)",
    highlightBord: "rgba(70,130,210,0.35)",
    divider:       "rgba(70,130,210,0.14)",
    iconBg:        "rgba(25,55,145,0.3)",
    iconBorder:    "rgba(70,130,210,0.3)",
    accentBar:     "linear-gradient(180deg, rgba(70,130,210,0.7), rgba(139,196,248,0.15))",
    titleFont:     "'Cinzel', Georgia, serif",
    monoFont:      "'Lora', Georgia, serif",
    locationColor: "rgba(100,150,210,0.55)",
  },
};

export default function ExperienceCard({ exp, index = 0, side = "left" }) {
  const { theme } = useTheme();
  const c = CARD_THEME[theme] ?? CARD_THEME.tech;
  const [hovered, setHovered] = useState(false);
  const isEdu = exp.type === "edu";

  return (
    <motion.div
      initial={{ opacity: 0, x: side === "left" ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        background: hovered ? c.bgHover : c.bg,
        border: `1px solid ${hovered ? c.borderHover : c.border}`,
        borderRadius: c.radius,
        boxShadow: hovered ? `${c.shadowHover}, ${c.glowHover}` : c.shadow,
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        padding: "28px 28px 24px",
        transition: "all 0.4s cubic-bezier(0.22,1,0.36,1)",
        cursor: "default",
        overflow: "hidden",
      }}
    >
      {/* Left accent bar */}
      <div style={{
        position: "absolute",
        left: 0, top: "12%", bottom: "12%",
        width: 3,
        borderRadius: "0 4px 4px 0",
        background: c.accentBar,
        opacity: hovered ? 1 : 0.5,
        transition: "opacity 0.4s",
      }} />

      {/* Top shimmer */}
      <div style={{
        position: "absolute",
        top: 0, left: "10%", right: "10%", height: 1,
        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
        pointerEvents: "none",
      }} />

      {/* ── Header row ── */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 16 }}>

        {/* Icon */}
        <div style={{
          width: 44, height: 44, borderRadius: isEdu ? 10 : "50%",
          background: c.iconBg,
          border: `1px solid ${c.iconBorder}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "1.3rem", flexShrink: 0,
          transition: "transform 0.3s",
          transform: hovered ? "scale(1.08)" : "scale(1)",
        }}>
          {exp.icon}
        </div>

        {/* Role + company */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontFamily: c.titleFont,
            fontSize: "1rem", fontWeight: 700,
            color: c.roleColor,
            marginBottom: 4,
            lineHeight: 1.2,
            transition: "color 0.3s",
          }}>
            {exp.role}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <span style={{
              fontFamily: c.monoFont,
              fontSize: "0.72rem",
              color: c.companyColor,
              fontWeight: 600,
              transition: "color 0.3s",
            }}>
              {exp.company}
            </span>
            <span style={{ color: c.divider, fontSize: "0.6rem" }}>•</span>
            <span style={{
              fontFamily: c.monoFont,
              fontSize: "0.62rem",
              color: c.locationColor,
              transition: "color 0.3s",
            }}>
              📍 {exp.location}
            </span>
          </div>
        </div>

        {/* Period + duration badge */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4, flexShrink: 0 }}>
          <span style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.65rem",
            color: c.periodColor,
            letterSpacing: "0.06em",
            whiteSpace: "nowrap",
          }}>
            {exp.period}
          </span>
          <span style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.56rem",
            letterSpacing: "0.1em",
            padding: "2px 8px",
            borderRadius: 999,
            background: c.tagBg,
            border: `1px solid ${c.tagBorder}`,
            color: c.tagColor,
            textTransform: "uppercase",
          }}>
            {exp.duration}
          </span>
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: c.divider, marginBottom: 16 }} />

      {/* Description */}
      <p style={{
        fontFamily: c.monoFont,
        fontSize: "0.78rem",
        lineHeight: 1.75,
        color: c.descColor,
        marginBottom: 18,
        transition: "color 0.3s",
      }}>
        {exp.description}
      </p>

      {/* Highlight badge */}
      {exp.highlight && (
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          padding: "4px 12px",
          borderRadius: 999,
          background: c.highlightBg,
          border: `1px solid ${c.highlightBord}`,
          marginBottom: 16,
        }}>
          <span style={{ fontSize: "0.6rem" }}>✦</span>
          <span style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.6rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: c.highlightColor,
          }}>
            {exp.highlight}
          </span>
        </div>
      )}

      {/* Tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {exp.tags.map((tag) => (
          <span
            key={tag}
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.58rem",
              letterSpacing: "0.09em",
              textTransform: "uppercase",
              color: c.tagColor,
              background: c.tagBg,
              border: `1px solid ${c.tagBorder}`,
              borderRadius: 4,
              padding: "3px 9px",
              transition: "color 0.4s, background 0.4s",
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}