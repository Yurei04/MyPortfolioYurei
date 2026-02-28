"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/app/themeProvider";
import { EXPERIENCES } from "../../../public/data/experienceData"; 

const PANEL_THEME = {
  tech: {
    bg: "rgba(4,10,28,0.88)", border: "rgba(59,130,246,0.18)",
    shadow: "0 16px 60px rgba(0,0,0,0.5)", headerBorder: "rgba(59,130,246,0.12)",
    dotColor: "rgba(99,160,255,0.85)", dotShadow: "0 0 8px rgba(99,160,255,0.6)",
    labelColor: "rgba(148,180,255,0.65)",
    lineGradient: "linear-gradient(to bottom, rgba(59,130,246,0.5), rgba(59,130,246,0.1) 90%, transparent)",
    nodeWork: "rgba(99,160,255,0.9)", nodeWorkBorder: "2px solid rgba(4,10,28,1)",
    nodeWorkShadow: "0 0 10px rgba(99,160,255,0.5)",
    nodeEdu: "rgba(59,130,246,0.4)", nodeEduBorder: "1px solid rgba(99,160,255,0.5)",
    cardBgExpanded: "rgba(20,50,140,0.18)", cardBg: "rgba(10,20,55,0.35)",
    cardBorderExp: "rgba(59,130,246,0.3)", cardBorder: "rgba(59,130,246,0.1)",
    cardBgHover: "rgba(15,35,100,0.3)", cardBorderHov: "rgba(59,130,246,0.22)",
    roleColor: "rgba(210,230,255,0.9)", companyColor: "rgba(99,160,255,0.7)",
    periodColor: "rgba(99,130,200,0.55)", chevronColor: "rgba(99,160,255,0.5)",
    dividerColor: "rgba(59,130,246,0.12)", descColor: "rgba(148,180,255,0.65)",
    tagColor: "rgba(99,160,255,0.8)", tagBg: "rgba(30,70,180,0.15)", tagBorder: "rgba(59,130,246,0.2)",
    shimmerBg: "linear-gradient(90deg, transparent, rgba(59,130,246,0.25), transparent)",
    titleFont: "'Playfair Display', Georgia, serif", monoFont: "'DM Mono', monospace",
    borderRadius: 16, headerLabel: "Experience",
  },
  "fantasy-morning": {
    bg: "rgba(235,255,238,0.88)", border: "rgba(70,150,70,0.2)",
    shadow: "0 16px 60px rgba(0,0,0,0.14)", headerBorder: "rgba(70,150,70,0.15)",
    dotColor: "rgba(60,140,60,0.9)", dotShadow: "0 0 8px rgba(60,140,60,0.5)",
    labelColor: "rgba(40,90,50,0.65)",
    lineGradient: "linear-gradient(to bottom, rgba(70,150,70,0.5), rgba(70,150,70,0.1) 90%, transparent)",
    nodeWork: "rgba(60,140,60,0.9)", nodeWorkBorder: "2px solid rgba(235,255,238,1)",
    nodeWorkShadow: "0 0 10px rgba(60,140,60,0.4)",
    nodeEdu: "rgba(80,160,80,0.4)", nodeEduBorder: "1px solid rgba(60,140,60,0.5)",
    cardBgExpanded: "rgba(60,160,60,0.1)", cardBg: "rgba(60,160,60,0.06)",
    cardBorderExp: "rgba(70,150,70,0.3)", cardBorder: "rgba(70,150,70,0.12)",
    cardBgHover: "rgba(60,160,60,0.1)", cardBorderHov: "rgba(70,150,70,0.25)",
    roleColor: "rgba(20,60,30,0.92)", companyColor: "rgba(50,120,50,0.75)",
    periodColor: "rgba(70,120,70,0.55)", chevronColor: "rgba(60,140,60,0.55)",
    dividerColor: "rgba(70,150,70,0.15)", descColor: "rgba(40,90,50,0.7)",
    tagColor: "rgba(30,110,40,0.85)", tagBg: "rgba(60,160,60,0.1)", tagBorder: "rgba(70,150,70,0.25)",
    shimmerBg: "linear-gradient(90deg, transparent, rgba(70,150,70,0.2), transparent)",
    titleFont: "'Cinzel', Georgia, serif", monoFont: "'Lora', Georgia, serif",
    borderRadius: 20, headerLabel: "My Journey",
  },
  "fantasy-night": {
    bg: "rgba(8,16,40,0.88)", border: "rgba(70,130,210,0.18)",
    shadow: "0 16px 60px rgba(0,0,0,0.55)", headerBorder: "rgba(70,130,210,0.14)",
    dotColor: "rgba(139,196,248,0.85)", dotShadow: "0 0 8px rgba(139,196,248,0.5)",
    labelColor: "rgba(139,196,248,0.6)",
    lineGradient: "linear-gradient(to bottom, rgba(70,130,210,0.5), rgba(70,130,210,0.1) 90%, transparent)",
    nodeWork: "rgba(139,196,248,0.9)", nodeWorkBorder: "2px solid rgba(8,16,40,1)",
    nodeWorkShadow: "0 0 10px rgba(139,196,248,0.45)",
    nodeEdu: "rgba(70,130,210,0.4)", nodeEduBorder: "1px solid rgba(139,196,248,0.45)",
    cardBgExpanded: "rgba(30,70,160,0.15)", cardBg: "rgba(15,30,75,0.35)",
    cardBorderExp: "rgba(70,130,210,0.3)", cardBorder: "rgba(70,130,210,0.1)",
    cardBgHover: "rgba(20,45,110,0.3)", cardBorderHov: "rgba(70,130,210,0.22)",
    roleColor: "rgba(200,228,255,0.92)", companyColor: "rgba(139,196,248,0.7)",
    periodColor: "rgba(100,150,210,0.55)", chevronColor: "rgba(139,196,248,0.5)",
    dividerColor: "rgba(70,130,210,0.14)", descColor: "rgba(139,196,248,0.65)",
    tagColor: "rgba(139,196,248,0.82)", tagBg: "rgba(30,70,160,0.15)", tagBorder: "rgba(70,130,210,0.22)",
    shimmerBg: "linear-gradient(90deg, transparent, rgba(70,130,210,0.25), transparent)",
    titleFont: "'Cinzel', Georgia, serif", monoFont: "'Lora', Georgia, serif",
    borderRadius: 20, headerLabel: "My Journey",
  },
};

function AnimateHeight({ isOpen, children }) {
  return (
    <motion.div
      initial={false}
      animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      style={{ overflow: "hidden" }}
    >
      {children}
    </motion.div>
  );
}

export default function ExperienceTimeline() {
  const { theme } = useTheme();
  const c = PANEL_THEME[theme] ?? PANEL_THEME.tech;
  const [expanded, setExpanded] = useState(null);

  return (
    <div style={{
      width: 300, background: c.bg, border: `1px solid ${c.border}`,
      borderRadius: c.borderRadius, backdropFilter: "blur(12px)",
      boxShadow: c.shadow, overflow: "hidden", flexShrink: 0,
      transition: "background 0.6s, border-color 0.6s, box-shadow 0.6s",
    }}>
      <div style={{ padding: "14px 16px 12px", borderBottom: `1px solid ${c.headerBorder}`, display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ width: 7, height: 7, borderRadius: "50%", background: c.dotColor, boxShadow: c.dotShadow, display: "inline-block", animation: "pulse 2s ease-in-out infinite" }} />
        <style>{`@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(.85)}}`}</style>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.16em", textTransform: "uppercase", color: c.labelColor, transition: "color 0.5s" }}>
          {c.headerLabel}
        </span>
      </div>

      <div style={{ padding: "16px 16px 16px 0", position: "relative" }}>
        <div style={{ position: "absolute", left: 27, top: 16, bottom: 16, width: 1, background: c.lineGradient, transition: "background 0.6s" }} />

        {EXPERIENCES.map((exp, i) => {
          const isExpanded = expanded === i;
          const isEdu = exp.type === "edu";
          return (
            <motion.div key={exp.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: "flex", gap: 12, marginBottom: i < EXPERIENCES.length - 1 ? 16 : 0, paddingLeft: 16 }}
            >
              <div style={{ flexShrink: 0, width: 22, display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 2 }}>
                <div style={{ width: isEdu ? 10 : 11, height: isEdu ? 10 : 11, borderRadius: isEdu ? 2 : "50%", background: isEdu ? c.nodeEdu : c.nodeWork, border: isEdu ? c.nodeEduBorder : c.nodeWorkBorder, boxShadow: isEdu ? "none" : c.nodeWorkShadow, transition: "transform 0.2s, background 0.5s", transform: isExpanded ? "scale(1.2)" : "scale(1)" }} />
              </div>
              <div onClick={() => setExpanded(isExpanded ? null : i)}
                style={{ flex: 1, cursor: "pointer", background: isExpanded ? c.cardBgExpanded : c.cardBg, border: `1px solid ${isExpanded ? c.cardBorderExp : c.cardBorder}`, borderRadius: 10, padding: "10px 12px", transition: "background 0.25s, border-color 0.25s" }}
                onMouseEnter={(e) => { if (!isExpanded) { e.currentTarget.style.background = c.cardBgHover; e.currentTarget.style.borderColor = c.cardBorderHov; } }}
                onMouseLeave={(e) => { if (!isExpanded) { e.currentTarget.style.background = c.cardBg; e.currentTarget.style.borderColor = c.cardBorder; } }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ color: c.roleColor, fontSize: "0.78rem", fontWeight: 600, fontFamily: c.titleFont, lineHeight: 1.2, marginBottom: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", transition: "color 0.5s" }}>{exp.role}</div>
                    <div style={{ color: c.companyColor, fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.06em", transition: "color 0.5s" }}>{exp.company}</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
                    <span style={{ color: c.periodColor, fontFamily: "'DM Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.06em", whiteSpace: "nowrap", transition: "color 0.5s" }}>{exp.period}</span>
                    <motion.svg animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.25 }} width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 3.5L5 6.5L8 3.5" stroke={c.chevronColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </motion.svg>
                  </div>
                </div>
                <AnimateHeight isOpen={isExpanded}>
                  <div style={{ marginTop: 10, paddingTop: 10, borderTop: `1px solid ${c.dividerColor}` }}>
                    <p style={{ margin: "0 0 8px", color: c.descColor, fontSize: "0.66rem", fontFamily: c.monoFont, lineHeight: 1.6, transition: "color 0.5s" }}>{exp.description}</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                      {exp.tags.map((tag) => (
                        <span key={tag} style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.08em", color: c.tagColor, background: c.tagBg, border: `1px solid ${c.tagBorder}`, borderRadius: 4, padding: "2px 6px", textTransform: "uppercase", transition: "color 0.5s, background 0.5s" }}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </AnimateHeight>
              </div>
            </motion.div>
          );
        })}
      </div>
      <div style={{ height: 1, background: c.shimmerBg, transition: "background 0.6s" }} />
    </div>
  );
}