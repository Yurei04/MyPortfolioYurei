"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/app/themeProvider";
import { useRef } from "react";

// ── Skills data ───────────────────────────────────────────
const SKILLS = [
  { label: "Next.js",      category: "dev"    },
  { label: "TypeScript",   category: "dev"    },
  { label: "React",        category: "dev"    },
  { label: "Python",       category: "dev"    },
  { label: "TailwindCSS",  category: "dev"    },
  { label: "Framer Motion",category: "dev"    },
  { label: "LangChain",    category: "ai"     },
  { label: "OpenAI API",   category: "ai"     },
  { label: "RAG",          category: "ai"     },
  { label: "Figma",        category: "design" },
  { label: "Illustrator",  category: "design" },
  { label: "Photoshop",    category: "design" },
  { label: "Branding",     category: "design" },
  { label: "Node.js",      category: "dev"    },
  { label: "Docker",       category: "dev"    },
  { label: "Vite",         category: "dev"    },
  { label: "Canva",        category: "design" },
  { label: "Prompt Eng.",  category: "ai"     },
];

// ── Per-theme styling ─────────────────────────────────────
const BAR_THEME = {
  tech: {
    bg:            "rgba(5,9,26,0.85)",
    border:        "rgba(59,130,246,0.14)",
    separatorColor:"rgba(59,130,246,0.12)",
    // Per-category
    categories: {
      dev:    { bg: "rgba(29,78,216,0.14)", border: "rgba(59,130,246,0.28)", color: "rgba(148,180,255,0.88)" },
      ai:     { bg: "rgba(88,28,135,0.18)", border: "rgba(139,92,246,0.32)", color: "rgba(196,181,253,0.9)"  },
      design: { bg: "rgba(6,78,59,0.18)",   border: "rgba(52,211,153,0.3)",  color: "rgba(110,231,183,0.88)" },
    },
    dotColor:  "rgba(59,130,246,0.7)",
    labelColor:"rgba(99,140,220,0.5)",
    monoFont:  "'DM Mono', monospace",
  },
  "fantasy-morning": {
    bg:            "rgba(235,255,238,0.82)",
    border:        "rgba(70,150,70,0.16)",
    separatorColor:"rgba(70,150,70,0.1)",
    categories: {
      dev:    { bg: "rgba(60,150,60,0.1)",  border: "rgba(60,150,60,0.28)",  color: "rgba(30,90,40,0.88)"  },
      ai:     { bg: "rgba(250,204,21,0.1)", border: "rgba(180,140,20,0.28)", color: "rgba(100,70,10,0.88)" },
      design: { bg: "rgba(80,150,220,0.1)", border: "rgba(60,120,200,0.28)", color: "rgba(30,70,140,0.88)" },
    },
    dotColor:  "rgba(60,150,60,0.7)",
    labelColor:"rgba(60,120,60,0.45)",
    monoFont:  "'DM Mono', monospace",
  },
  "fantasy-night": {
    bg:            "rgba(7,14,38,0.85)",
    border:        "rgba(70,130,210,0.14)",
    separatorColor:"rgba(70,130,210,0.1)",
    categories: {
      dev:    { bg: "rgba(30,70,160,0.15)", border: "rgba(70,130,210,0.3)",  color: "rgba(139,196,248,0.9)" },
      ai:     { bg: "rgba(88,28,135,0.18)", border: "rgba(139,92,246,0.3)",  color: "rgba(196,181,253,0.9)" },
      design: { bg: "rgba(6,78,59,0.18)",   border: "rgba(52,211,153,0.28)", color: "rgba(110,231,183,0.85)"},
    },
    dotColor:  "rgba(100,160,240,0.7)",
    labelColor:"rgba(100,150,210,0.48)",
    monoFont:  "'DM Mono', monospace",
  },
};

// ── Duplicated for infinite scroll illusion ───────────────
const DOUBLED = [...SKILLS, ...SKILLS];

export default function SkillsBar() {
  const { theme } = useTheme();
  const b = BAR_THEME[theme] ?? BAR_THEME.tech;
  const trackRef = useRef(null);

  return (
    <div
      style={{
        width:      "100%",
        background: b.bg,
        borderTop:   `1px solid ${b.border}`,
        borderBottom:`1px solid ${b.border}`,
        overflow:   "hidden",
        position:   "relative",
        transition: "background 0.6s, border-color 0.6s",
      }}
    >
      {/* Left/right fade masks */}
      <div style={{
        position:   "absolute",
        inset:      0,
        background: `linear-gradient(90deg, ${b.bg} 0%, transparent 8%, transparent 92%, ${b.bg} 100%)`,
        zIndex:     2,
        pointerEvents:"none",
        transition: "background 0.6s",
      }} />

      <motion.div
        ref={trackRef}
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
        style={{
          display:    "flex",
          alignItems: "center",
          gap:        10,
          padding:    "10px 0",
          width:      "max-content",
        }}
      >
        {DOUBLED.map((skill, i) => {
          const cat = b.categories[skill.category];
          return (
            <span
              key={`${skill.label}-${i}`}
              style={{
                fontFamily:    b.monoFont,
                fontSize:      "0.58rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color:         cat.color,
                background:    cat.bg,
                border:        `1px solid ${cat.border}`,
                borderRadius:  999,
                padding:       "4px 12px",
                whiteSpace:    "nowrap",
                flexShrink:    0,
                transition:    "all 0.6s",
              }}
            >
              {skill.label}
            </span>
          );
        })}
      </motion.div>
    </div>
  );
}