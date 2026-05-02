"use client";

import { useTheme } from "@/app/themeProvider";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

// ── Experience data ───────────────────────────────────────
const EXPERIENCES = [
  {
    id:      "skywaze-1",
    company: "Skywaze",
    role:    "AI Solutions Contractor",
    type:    "Contract",
    period:  "Nov 2024",
    location:"Remote · US",
    icon:    "🤖",
    desc:    "Built a winning conceptual prototype for the KINETIKS competition — responsible for framework diagrams and core code functionality.",
  },
  {
    id:      "hu-dev-1",
    company: "Hack United",
    role:    "Web Developer",
    type:    "Full-time",
    period:  "May – Jul 2025",
    location:"Remote · US",
    icon:    "💻",
    desc:    "Front-end with Next.js, smooth scroll animations and interactive effects. Collaborated with executives on UI/UX direction.",
  },
  {
    id:      "hu-design-1",
    company: "Hack United",
    role:    "Graphic Designer",
    type:    "Volunteer",
    period:  "Jul 2025 – Present",
    location:"Remote · US",
    icon:    "🎨",
    desc:    "Creating promotional and educational posters and infographics for social media.",
  },
  {
    id:      "max-intern-1",
    company: "Maximally",
    role:    "Visual Designer",
    type:    "Internship",
    period:  "Aug – Sep 2025",
    location:"Remote · India",
    icon:    "✦",
    desc:    "Designed posters, carousels, hackathon logos, headers, and backgrounds for India's boldest youth AI hackathon.",
  },
  {
    id:      "max-dev-1",
    company: "Maximally",
    role:    "Web Developer",
    type:    "Full-time",
    period:  "Sep 2025",
    location:"Remote · India",
    icon:    "⚡",
    desc:    "Built web platforms with Vite, TypeScript, and Tailwind CSS. Responsive, accessible, brand-cohesive at startup speed.",
  },
  {
    id:      "max-vd-1",
    company: "Maximally",
    role:    "Visual Designer",
    type:    "Part-time",
    period:  "Sep – Oct 2025",
    location:"Remote · India",
    icon:    "🖌️",
    desc:    "Led graphic design, web design, and brand identity. Developed scalable design systems and campaign visuals.",
  },
];

const STATS = [
  { value: "1+", label: "Year"      },
  { value: "6",  label: "Roles"     },
  { value: "3",  label: "Companies" },
];

// ── Theme tokens ──────────────────────────────────────────
const PAGE_THEME = {
  tech: {
    bgImage:    "/images/techImages/tech1background.png",
    bgGradient: `
      radial-gradient(ellipse 80% 60% at 10% 90%, rgba(17,51,153,0.55) 0%, transparent 60%),
      radial-gradient(ellipse 60% 50% at 90% 10%, rgba(10,35,110,0.45) 0%, transparent 55%),
      linear-gradient(135deg, rgba(2,4,14,0.88) 0%, rgba(5,9,26,0.84) 50%, rgba(3,7,16,0.9) 100%)
    `,
    showGrid:        true,
    gridColor:       "rgba(40,100,255,0.035)",
    lineColor:       "rgba(59,130,246,0.6)",
    lineGlow:        "rgba(59,130,246,0.18)",
    nodeBg:          "rgba(6,12,32,1)",
    nodeRing:        "rgba(59,130,246,0.85)",
    nodeGlow:        "rgba(59,130,246,0.6)",
    cardBg:          "rgba(8,18,55,0.7)",
    cardBorder:      "rgba(59,130,246,0.2)",
    cardHoverBorder: "rgba(59,130,246,0.55)",
    yearColor:       "rgba(148,180,255,0.85)",
    yearFont:        "'DM Mono', monospace",
    headingGradient: "linear-gradient(135deg, #e0ecff 0%, #6ea0ff 55%, #3b6fd4 100%)",
    subColor:        "rgba(148,180,255,0.65)",
    roleColor:       "#ffffff",
    companyColor:    "rgba(148,180,255,1)",
    descColor:       "rgba(190,215,255,0.78)",
    badgeBg:         "rgba(59,130,246,0.14)",
    badgeBorder:     "rgba(59,130,246,0.32)",
    badgeColor:      "rgba(148,180,255,0.95)",
    sectionLabel:    "Career Timeline",
    fontFamily:      "'Playfair Display', Georgia, serif",
    monoFont:        "'DM Mono', monospace",
    eyebrow:         "// experience.log",
    divider:         "rgba(59,130,246,0.14)",
    accentLine:      "rgba(59,130,246,0.4)",
    statBorder:      "rgba(59,130,246,0.14)",
  },
  "fantasy-morning": {
    bgImage:    "/images/fantasyImages/morning/bkg1Morning.png",
    bgGradient: `
      radial-gradient(ellipse 90% 50% at 95% 5%, rgba(255,230,120,0.25) 0%, transparent 55%),
      radial-gradient(ellipse 70% 60% at 10% 80%, rgba(80,160,90,0.18) 0%, transparent 60%),
      linear-gradient(170deg, rgba(240,255,240,0.55) 0%, rgba(200,240,210,0.5) 50%, rgba(140,200,150,0.6) 100%)
    `,
    showGrid:        false,
    lineColor:       "rgba(40,130,50,0.65)",
    lineGlow:        "rgba(40,130,50,0.14)",
    nodeBg:          "rgba(235,255,235,1)",
    nodeRing:        "rgba(40,130,50,0.8)",
    nodeGlow:        "rgba(40,140,50,0.5)",
    cardBg:          "rgba(240,255,242,0.8)",
    cardBorder:      "rgba(40,130,50,0.22)",
    cardHoverBorder: "rgba(40,130,50,0.6)",
    yearColor:       "rgba(15,70,25,0.9)",
    yearFont:        "'Cinzel', Georgia, serif",
    headingGradient: "linear-gradient(135deg, #0d3318 0%, #1e6b30 55%, #3da856 100%)",
    subColor:        "rgba(20,80,30,0.72)",
    roleColor:       "rgba(8,40,15,1)",
    companyColor:    "rgba(20,90,35,1)",
    descColor:       "rgba(30,70,40,0.82)",
    badgeBg:         "rgba(40,130,50,0.12)",
    badgeBorder:     "rgba(40,130,50,0.3)",
    badgeColor:      "rgba(15,70,25,0.9)",
    sectionLabel:    "The Journey",
    fontFamily:      "'Cinzel', Georgia, serif",
    monoFont:        "'DM Mono', monospace",
    eyebrow:         "✦ Chronicle of Works ✦",
    divider:         "rgba(40,130,50,0.16)",
    accentLine:      "rgba(40,130,50,0.4)",
    statBorder:      "rgba(40,130,50,0.16)",
  },
  "fantasy-night": {
    bgImage:    "/images/fantasyImages/night/bkg1Night.png",
    bgGradient: `
      radial-gradient(ellipse 70% 50% at 80% 10%, rgba(30,60,130,0.5) 0%, transparent 55%),
      radial-gradient(ellipse 80% 60% at 10% 80%, rgba(10,25,70,0.4) 0%, transparent 60%),
      linear-gradient(170deg, rgba(6,14,28,0.65) 0%, rgba(10,22,55,0.6) 60%, rgba(4,8,20,0.72) 100%)
    `,
    showGrid:        false,
    lineColor:       "rgba(100,160,240,0.58)",
    lineGlow:        "rgba(100,160,240,0.15)",
    nodeBg:          "rgba(7,14,38,1)",
    nodeRing:        "rgba(139,196,248,0.72)",
    nodeGlow:        "rgba(100,160,240,0.58)",
    cardBg:          "rgba(8,18,55,0.72)",
    cardBorder:      "rgba(100,160,240,0.2)",
    cardHoverBorder: "rgba(139,196,248,0.55)",
    yearColor:       "rgba(139,196,248,0.82)",
    yearFont:        "'Cinzel', Georgia, serif",
    headingGradient: "linear-gradient(135deg, #dff0ff 0%, #8bc4f8 55%, #4a8fd4 100%)",
    subColor:        "rgba(139,196,248,0.65)",
    roleColor:       "#ffffff",
    companyColor:    "rgba(139,196,248,1)",
    descColor:       "rgba(170,215,255,0.75)",
    badgeBg:         "rgba(100,160,240,0.14)",
    badgeBorder:     "rgba(100,160,240,0.3)",
    badgeColor:      "rgba(139,196,248,0.95)",
    sectionLabel:    "Star Map of Skills",
    fontFamily:      "'Cinzel', Georgia, serif",
    monoFont:        "'DM Mono', monospace",
    eyebrow:         "✦ Lore & Legend ✦",
    divider:         "rgba(100,160,240,0.15)",
    accentLine:      "rgba(100,160,240,0.4)",
    statBorder:      "rgba(100,160,240,0.14)",
  },
};

// ── ExperienceCard ────────────────────────────────────────
function ExperienceCard({ exp, p, isTop }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background:       hovered ? p.cardBg : "rgba(255,255,255,0.015)",
        border:           `1.5px solid ${hovered ? p.cardHoverBorder : p.cardBorder}`,
        borderRadius:     14,
        padding:          "16px 14px 14px",
        backdropFilter:   "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        transition:       "border-color 0.22s, transform 0.22s, box-shadow 0.22s, background 0.22s",
        transform:        hovered ? `translateY(${isTop ? -5 : 5}px)` : "translateY(0)",
        boxShadow:        hovered ? `0 8px 32px ${p.lineGlow}` : "none",
        cursor:           "default",
        position:         "relative",
        overflow:         "hidden",
      }}
    >
      {/* Top accent */}
      <div style={{
        position: "absolute", top: 0, left: "20%", right: "20%", height: 1.5,
        background: `linear-gradient(90deg, transparent, ${p.nodeRing}, transparent)`,
        opacity: 0.5,
      }} />

      {/* Icon badge */}
      <div style={{
        display:      "flex",
        alignItems:   "center",
        gap:          8,
        marginBottom: 8,
      }}>
        <span style={{
          fontSize:      "1.1rem",
          lineHeight:    1,
          filter:        "drop-shadow(0 0 4px rgba(255,255,255,0.1))",
        }}>
          {exp.icon}
        </span>
        <p style={{
          fontFamily:    p.monoFont,
          fontSize:      "0.58rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color:         p.companyColor,
          fontWeight:    600,
          margin:        0,
        }}>
          {exp.company}
        </p>
      </div>

      {/* Role */}
      <h3 style={{
        fontFamily:   p.fontFamily,
        fontSize:     "clamp(0.82rem, 1vw, 0.98rem)",
        fontWeight:   700,
        lineHeight:   1.2,
        color:        p.roleColor,
        marginBottom: 8,
        letterSpacing:"-0.01em",
      }}>
        {exp.role}
      </h3>

      {/* Rule */}
      <div style={{
        height:        1,
        marginBottom:  8,
        background:    `linear-gradient(90deg, ${p.accentLine}, transparent)`,
      }} />

      {/* Description */}
      <p style={{
        fontFamily:   p.monoFont,
        fontSize:     "clamp(0.58rem, 0.72vw, 0.68rem)",
        lineHeight:   1.65,
        color:        p.descColor,
        marginBottom: 12,
      }}>
        {exp.desc}
      </p>

      {/* Badges */}
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", alignItems: "center" }}>
        <span style={{
          fontFamily:    p.monoFont,
          fontSize:      "0.52rem",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          padding:       "3px 8px",
          borderRadius:  999,
          background:    p.badgeBg,
          border:        `1px solid ${p.badgeBorder}`,
          color:         p.badgeColor,
        }}>
          {exp.type}
        </span>
        <span style={{
          fontFamily:  p.monoFont,
          fontSize:    "0.52rem",
          letterSpacing:"0.05em",
          color:       p.subColor,
          opacity:     0.8,
        }}>
          {exp.location}
        </span>
      </div>
    </div>
  );
}

// ── Main Export ───────────────────────────────────────────
export default function ExperiencePage() {
  const { theme } = useTheme();
  const p = PAGE_THEME[theme] ?? PAGE_THEME.tech;

  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-60px 0px" });

  const SPINE_DELAY  = 0.15;
  const FIRST_ITEM   = 0.32;
  const ITEM_STAGGER = 0.14;

  return (
    <div className="w-full relative overflow-hidden" style={{ fontFamily: p.fontFamily }}>
      {/* Backgrounds */}
      {p.bgImage && (
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${p.bgImage}')` }} />
      )}
      <div className="absolute inset-0" style={{ background: p.bgGradient, transition: "background 0.7s" }} />
      {p.showGrid && (
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: `linear-gradient(${p.gridColor} 1px,transparent 1px),linear-gradient(90deg,${p.gridColor} 1px,transparent 1px)`,
          backgroundSize:  "55px 55px",
        }} />
      )}

      <div ref={sectionRef} className="relative z-10" style={{ padding: "80px 48px 72px" }}>
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: 64 }}
        >
          <div style={{
            display:         "flex",
            alignItems:      "flex-end",
            justifyContent:  "space-between",
            flexWrap:        "wrap",
            gap:             20,
          }}>
            <div>
              <p style={{
                fontFamily:    p.monoFont,
                fontSize:      "0.65rem",
                letterSpacing: "0.34em",
                textTransform: "uppercase",
                color:         p.subColor,
                marginBottom:  10,
              }}>
                {p.eyebrow}
              </p>
              <h1 style={{
                fontFamily:   p.fontFamily,
                fontSize:     "clamp(2.2rem, 4vw, 3.4rem)",
                fontWeight:   700,
                lineHeight:   0.92,
                letterSpacing:"-0.02em",
                backgroundImage: p.headingGradient,
                backgroundClip:  "text",
                WebkitBackgroundClip: "text",
                color:           "transparent",
              }}>
                {p.sectionLabel}
              </h1>
            </div>

            {/* Stats */}
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {STATS.map((s) => (
                <div key={s.label} style={{
                  display:       "flex",
                  alignItems:    "center",
                  gap:           10,
                  padding:       "8px 16px",
                  borderRadius:  999,
                  background:    "rgba(255,255,255,0.04)",
                  border:        `1px solid ${p.statBorder}`,
                  backdropFilter:"blur(12px)",
                }}>
                  <span style={{
                    fontFamily:      p.fontFamily,
                    fontSize:        "1.2rem",
                    fontWeight:      700,
                    backgroundImage: p.headingGradient,
                    backgroundClip:  "text",
                    WebkitBackgroundClip:"text",
                    color:           "transparent",
                    lineHeight:      1,
                  }}>
                    {s.value}
                  </span>
                  <span style={{
                    fontFamily:    p.monoFont,
                    fontSize:      "0.56rem",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color:         p.subColor,
                  }}>
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Accent line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            style={{
              height:          1.5,
              marginTop:       24,
              transformOrigin: "left center",
              background:      `linear-gradient(90deg, ${p.lineColor} 0%, ${p.lineGlow} 65%, transparent 100%)`,
            }}
          />
        </motion.div>

        {/* ── Horizontal Timeline ── */}
        <div style={{ position: "relative" }}>

          {/* Spine */}
          <div style={{
            position: "absolute", top: "50%", left: 0, right: 0,
            height: 2, marginTop: -1, overflow: "hidden", zIndex: 0,
          }}>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.3, delay: SPINE_DELAY, ease: [0.22, 1, 0.36, 1] }}
              style={{
                width: "100%", height: "100%",
                transformOrigin: "left center",
                background: `linear-gradient(90deg, transparent 0%, ${p.lineColor} 5%, ${p.lineColor} 95%, transparent 100%)`,
                boxShadow: `0 0 10px ${p.lineGlow}`,
              }}
            />
          </div>

          {/* Items grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: `repeat(${EXPERIENCES.length}, 1fr)`,
          }}>
            {EXPERIENCES.map((exp, i) => {
              const isTop = i % 2 === 0;
              const delay = FIRST_ITEM + i * ITEM_STAGGER;

              return (
                <div
                  key={`${exp.id}-${i}`}
                  style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: 0 }}
                >
                  {/* Top slot */}
                  <div style={{
                    width: "100%", padding: "0 5px", minHeight: 200,
                    display: "flex", flexDirection: "column", justifyContent: "flex-end",
                  }}>
                    {isTop && (
                      <motion.div
                        initial={{ opacity: 0, y: -28 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <ExperienceCard exp={exp} p={p} isTop={true} />
                      </motion.div>
                    )}
                  </div>

                  {/* Stem top */}
                  <motion.div
                    initial={{ scaleY: 0 }}
                    animate={inView ? { scaleY: 1 } : {}}
                    transition={{ duration: 0.3, delay: delay - 0.05, ease: "easeOut" }}
                    style={{
                      width: 1.5, height: 32, flexShrink: 0,
                      transformOrigin: "bottom center",
                      background: isTop ? p.lineColor : "transparent",
                      opacity: 0.65,
                    }}
                  />

                  {/* Node */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.25 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.45, delay, ease: [0.34, 1.56, 0.64, 1] }}
                    style={{
                      width: 44, height: 44, flexShrink: 0,
                      borderRadius: exp.type === "Contract" ? 10 : "50%",
                      background: p.nodeBg,
                      border: `2px solid ${p.nodeRing}`,
                      boxShadow: `0 0 0 5px ${p.lineGlow}, 0 0 18px ${p.nodeGlow}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "1.2rem",
                      position: "relative", zIndex: 2,
                    }}
                  >
                    {exp.icon}
                  </motion.div>

                  {/* Period */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.4, delay: delay + 0.15 }}
                    style={{
                      fontFamily:    p.yearFont,
                      fontSize:      "0.48rem",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color:         p.yearColor,
                      marginTop:     6,
                      textAlign:     "center",
                      lineHeight:    1.45,
                      padding:       "0 4px",
                      opacity:       0.85,
                    }}
                  >
                    {exp.period}
                  </motion.div>

                  {/* Stem bottom */}
                  <motion.div
                    initial={{ scaleY: 0 }}
                    animate={inView ? { scaleY: 1 } : {}}
                    transition={{ duration: 0.3, delay: delay - 0.05, ease: "easeOut" }}
                    style={{
                      width: 1.5, height: 32, flexShrink: 0,
                      marginTop: 7,
                      transformOrigin: "top center",
                      background: !isTop ? p.lineColor : "transparent",
                      opacity: 0.65,
                    }}
                  />

                  {/* Bottom slot */}
                  <div style={{
                    width: "100%", padding: "0 5px", minHeight: 200,
                    display: "flex", flexDirection: "column", justifyContent: "flex-start",
                  }}>
                    {!isTop && (
                      <motion.div
                        initial={{ opacity: 0, y: 28 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <ExperienceCard exp={exp} p={p} isTop={false} />
                      </motion.div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}