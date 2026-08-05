"use client";

import { useState } from "react";
import { useTheme } from "@/app/themeProvider";
import { Bot, Monitor, Layers, PenTool, Sparkles, Zap } from "lucide-react";

// ── Experience data with category ─────────────────────────
const EXPERIENCES = [
  {
    id:       "kinetiks-1",
    company:  "KINETIKS",
    role:     "AI Solutions Contractor",
    type:     "Contract",
    period:   "Nov 2024",
    location: "Remote · San Francisco, US",
    Icon:     Zap,
    category: "tech",
    desc:     "Built a winning conceptual prototype — responsible for AI framework diagrams and core code functionality for the KINETIKS competition.",
  },
  {
    id:       "hu-dev-1",
    company:  "Hack United",
    role:     "Web Developer",
    type:     "Contract",
    period:   "May – Jul 2025",
    location: "Remote · New York, US",
    Icon:     Monitor,
    category: "tech",
    desc:     "Developed front-end experiences with Next.js, smooth scroll animations, and interactive effects. Collaborated with executives on UI/UX direction.",
  },
  {
    id:       "hu-media-1",
    company:  "Hack United",
    role:     "Multimedia Designer & Social Media Creative",
    type:     "Full-time",
    period:   "Jul 2025 – Present",
    location: "Remote · New York, US",
    Icon:     Layers,
    category: "design",
    desc:     "Creating multimedia content and social media visuals that drive engagement and communicate the Hack United brand across platforms.",
  },
  {
    id:       "max-intern-1",
    company:  "Maximally.in",
    role:     "Visual Designer Intern",
    type:     "Internship",
    period:   "Aug – Sep 2025",
    location: "Remote · India",
    Icon:     Sparkles,
    category: "design",
    desc:     "Designed posters, carousels, hackathon logos, headers, and backgrounds for India's boldest youth AI hackathon.",
  },
  {
    id:       "max-vd-dev-1",
    company:  "Maximally.in",
    role:     "Visual Designer & Web Developer",
    type:     "Part-time",
    period:   "Sep – Oct 2025",
    location: "Remote · India",
    Icon:     PenTool,
    category: "design",
    desc:     "Led graphic design, web development, and brand identity. Built platforms with Vite, TypeScript, and Tailwind while developing scalable design systems.",
  },
  {
    id:       "hu-ai-1",
    company:  "Hack United",
    role:     "AI Automation Developer",
    type:     "Contract",
    period:   "Mar – Apr 2026",
    location: "Remote · New York, US",
    Icon:     Bot,
    category: "tech",
    desc:     "Engineered AI automation pipelines and developer tooling to streamline internal workflows and accelerate the team's build velocity.",
  },
];

const STATS = [
  { value: "1.5+", label: "Years"     },
  { value: "6",    label: "Roles"     },
  { value: "3",    label: "Companies" },
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
    iconColor:       "rgba(148,180,255,0.9)",
    cardBg:          "rgba(8,18,55,0.75)",
    cardBorder:      "rgba(59,130,246,0.2)",
    cardHoverBorder: "rgba(59,130,246,0.6)",
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
    fontFamily:      "var(--font-playfair)",
    monoFont:        "var(--font-dm-mono)",
    eyebrow:         "// experience.log",
    accentLine:      "rgba(59,130,246,0.4)",
    statBorder:      "rgba(59,130,246,0.14)",
    connectorBg:     "linear-gradient(to bottom, rgba(59,130,246,0.7), rgba(59,130,246,0.15))",
    layoutMode:      "tech",
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
    iconColor:       "rgba(20,100,35,0.9)",
    cardBg:          "rgba(240,255,242,0.85)",
    cardBorder:      "rgba(40,130,50,0.22)",
    cardHoverBorder: "rgba(40,130,50,0.65)",
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
    fontFamily:      "var(--font-cinzel)",
    monoFont:        "var(--font-dm-mono)",
    eyebrow:         "✦ Chronicle of Works ✦",
    accentLine:      "rgba(40,130,50,0.4)",
    statBorder:      "rgba(40,130,50,0.16)",
    connectorBg:     "linear-gradient(to bottom, rgba(40,130,50,0.7), rgba(40,130,50,0.15))",
    layoutMode:      "design",
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
    iconColor:       "rgba(139,196,248,0.9)",
    cardBg:          "rgba(8,18,55,0.75)",
    cardBorder:      "rgba(100,160,240,0.2)",
    cardHoverBorder: "rgba(139,196,248,0.6)",
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
    fontFamily:      "var(--font-cinzel)",
    monoFont:        "var(--font-dm-mono)",
    eyebrow:         "✦ Lore & Legend ✦",
    accentLine:      "rgba(100,160,240,0.4)",
    statBorder:      "rgba(100,160,240,0.14)",
    connectorBg:     "linear-gradient(to bottom, rgba(100,160,240,0.7), rgba(100,160,240,0.15))",
    layoutMode:      "design",
  },
};

// ── ExperienceCard ────────────────────────────────────────
function ExperienceCard({ exp, p, side, delay }) {
  const [hovered, setHovered] = useState(false);
  const { Icon } = exp;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background:       hovered ? p.cardBg : "rgba(255,255,255,0.018)",
        border:           `1.5px solid ${hovered ? p.cardHoverBorder : p.cardBorder}`,
        borderRadius:     14,
        padding:          "18px 16px 16px",
        backdropFilter:   "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        transition:       "border-color 0.22s, transform 0.22s, box-shadow 0.22s, background 0.22s",
        transform:        hovered
          ? `translateX(${side === "left" ? -5 : 5}px)`
          : "translateX(0)",
        boxShadow:        hovered ? `0 6px 28px ${p.lineGlow}` : "none",
        cursor:           "default",
        position:         "relative",
        overflow:         "hidden",
        animation:        `fadeUp 0.55s cubic-bezier(0.22,1,0.36,1) ${delay}s both`,
      }}
    >
      {/* Top accent */}
      <div style={{
        position: "absolute", top: 0, left: "18%", right: "18%", height: 1.5,
        background: `linear-gradient(90deg, transparent, ${p.nodeRing}, transparent)`,
        opacity: 0.5,
      }} />

      {/* Company + Icon row */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 9 }}>
        <div style={{
          width: 22, height: 22, display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}>
          <Icon size={15} color={p.iconColor} strokeWidth={1.8} />
        </div>
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
        fontSize:     "clamp(0.84rem, 1.1vw, 1rem)",
        fontWeight:   700,
        lineHeight:   1.2,
        color:        p.roleColor,
        marginBottom: 8,
        letterSpacing:"-0.01em",
      }}>
        {exp.role}
      </h3>

      {/* Divider */}
      <div style={{
        height: 1, marginBottom: 10,
        background: `linear-gradient(90deg, ${p.accentLine}, transparent)`,
      }} />

      {/* Description */}
      <p style={{
        fontFamily:   p.monoFont,
        fontSize:     "clamp(0.6rem, 0.74vw, 0.7rem)",
        lineHeight:   1.7,
        color:        p.descColor,
        marginBottom: 14,
      }}>
        {exp.desc}
      </p>

      {/* Badges */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
        <span style={{
          fontFamily:    p.monoFont,
          fontSize:      "0.52rem",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          padding:       "3px 9px",
          borderRadius:  999,
          background:    p.badgeBg,
          border:        `1px solid ${p.badgeBorder}`,
          color:         p.badgeColor,
        }}>
          {exp.type}
        </span>
        <span style={{
          fontFamily:    p.monoFont,
          fontSize:      "0.52rem",
          letterSpacing: "0.05em",
          color:         p.subColor,
          opacity:       0.8,
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
  const isDesignMode = p.layoutMode === "design";

  // Filter experiences based on mode
  const filteredExperiences = EXPERIENCES.filter(exp => {
    if (isDesignMode) {
      return exp.category === "design";
    } else {
      return exp.category === "tech";
    }
  });

  // Adjust stats based on filtered experiences
  const techCount = EXPERIENCES.filter(e => e.category === "tech").length;
  const designCount = EXPERIENCES.filter(e => e.category === "design").length;
  const displayedCount = isDesignMode ? designCount : techCount;
  const companyCount = new Set(filteredExperiences.map(e => e.company)).size;

  const adjustedStats = [
    { value: "1.5+", label: "Years"     },
    { value: displayedCount.toString(), label: "Roles"     },
    { value: companyCount.toString(), label: "Companies" },
  ];

  const SPINE_DELAY  = 0.1;
  const FIRST_ITEM   = 0.28;
  const ITEM_STAGGER = 0.12;

  return (
    <div
      className="w-full relative overflow-hidden"
      style={{ fontFamily: p.fontFamily, minHeight: "100vh" }}
    >
      {/* ── Backgrounds ── */}
      {p.bgImage && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${p.bgImage}')` }}
        />
      )}
      <div
        className="absolute inset-0"
        style={{ background: p.bgGradient, transition: "background 0.7s" }}
      />
      {p.showGrid && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(${p.gridColor} 1px, transparent 1px),
              linear-gradient(90deg, ${p.gridColor} 1px, transparent 1px)
            `,
            backgroundSize: "55px 55px",
          }}
        />
      )}

      <div className="relative z-10" style={{ padding: "80px 48px 96px" }}>

        {/* ── Header ── */}
        <div
          style={{
            marginBottom: 72,
            animation: `fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) 0s both`,
          }}
        >
          <style>{`
            @keyframes fadeUp {
              from { opacity: 0; transform: translateY(20px); }
              to   { opacity: 1; transform: translateY(0); }
            }
            @keyframes scaleIn {
              from { opacity: 0; transform: scale(0.3); }
              to   { opacity: 1; transform: scale(1); }
            }
            @keyframes growY {
              from { transform: scaleY(0); }
              to   { transform: scaleY(1); }
            }
            @keyframes slideX {
              from { transform: scaleX(0); }
              to   { transform: scaleX(1); }
            }
          `}</style>

          <div style={{
            display: "flex", alignItems: "flex-end",
            justifyContent: "space-between", flexWrap: "wrap", gap: 20,
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
                fontFamily:          p.fontFamily,
                fontSize:            "clamp(2.2rem, 4vw, 3.4rem)",
                fontWeight:          700,
                lineHeight:          0.92,
                letterSpacing:       "-0.02em",
                backgroundImage:     p.headingGradient,
                backgroundClip:      "text",
                WebkitBackgroundClip:"text",
                color:               "transparent",
              }}>
                {p.sectionLabel}
              </h1>
            </div>

            {/* Stats */}
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {adjustedStats.map((s) => (
                <div key={s.label} style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "8px 16px", borderRadius: 999,
                  background: "rgba(255,255,255,0.04)",
                  border: `1px solid ${p.statBorder}`,
                  backdropFilter: "blur(12px)",
                }}>
                  <span style={{
                    fontFamily:          p.fontFamily,
                    fontSize:            "1.2rem",
                    fontWeight:          700,
                    backgroundImage:     p.headingGradient,
                    backgroundClip:      "text",
                    WebkitBackgroundClip:"text",
                    color:               "transparent",
                    lineHeight:          1,
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
          <div style={{
            height: 1.5, marginTop: 24,
            transformOrigin: "left center",
            background: `linear-gradient(90deg, ${p.lineColor} 0%, ${p.lineGlow} 65%, transparent 100%)`,
            animation: `slideX 1.1s cubic-bezier(0.22,1,0.36,1) 0.15s both`,
          }} />
        </div>

        {/* ── Timeline ── */}
        {filteredExperiences.length > 0 ? (
          <div style={{ position: "relative", maxWidth: 900, margin: "0 auto" }}>

            {/* Spine */}
            <div style={{
              position: "absolute",
              left: "50%",
              top: 0,
              bottom: 0,
              width: 2,
              marginLeft: -1,
              overflow: "hidden",
              zIndex: 0,
            }}>
              <div style={{
                width: "100%",
                height: "100%",
                transformOrigin: "top center",
                background: p.connectorBg,
                boxShadow: `0 0 10px ${p.lineGlow}`,
                animation: `growY 1.4s cubic-bezier(0.22,1,0.36,1) ${SPINE_DELAY}s both`,
              }} />
            </div>

            {/* Items */}
            {filteredExperiences.map((exp, i) => {
              const side  = i % 2 === 0 ? "left" : "right";
              const delay = FIRST_ITEM + i * ITEM_STAGGER;
              const { Icon } = exp;

              return (
                <div
                  key={exp.id}
                  style={{
                    display:        "flex",
                    alignItems:     "center",
                    justifyContent: "center",
                    marginBottom:   i < filteredExperiences.length - 1 ? 40 : 0,
                    position:       "relative",
                  }}
                >
                  {/* Left card slot */}
                  <div style={{
                    flex:       1,
                    paddingRight: 28,
                    display:    "flex",
                    justifyContent: "flex-end",
                  }}>
                    {side === "left" ? (
                      <div style={{ width: "100%", maxWidth: 340 }}>
                        <ExperienceCard exp={exp} p={p} side="left" delay={delay} />
                      </div>
                    ) : (
                      <p style={{
                        fontFamily:    p.yearFont,
                        fontSize:      "0.52rem",
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                        color:         p.yearColor,
                        textAlign:     "right",
                        opacity:       0.8,
                        lineHeight:    1.5,
                        animation:     `fadeUp 0.45s ease ${delay + 0.1}s both`,
                      }}>
                        {exp.period}
                      </p>
                    )}
                  </div>

                  {/* Centre node */}
                  <div style={{
                    position:   "relative",
                    zIndex:     2,
                    flexShrink: 0,
                    display:    "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}>
                    <div style={{
                      width:        46,
                      height:       46,
                      borderRadius: exp.type === "Contract" ? 12 : "50%",
                      background:   p.nodeBg,
                      border:       `2px solid ${p.nodeRing}`,
                      boxShadow:    `0 0 0 5px ${p.lineGlow}, 0 0 18px ${p.nodeGlow}`,
                      display:      "flex",
                      alignItems:   "center",
                      justifyContent: "center",
                      animation:    `scaleIn 0.45s cubic-bezier(0.34,1.56,0.64,1) ${delay}s both`,
                    }}>
                      <Icon size={18} color={p.iconColor} strokeWidth={1.8} />
                    </div>
                  </div>

                  {/* Right card slot */}
                  <div style={{
                    flex:      1,
                    paddingLeft: 28,
                    display:   "flex",
                    justifyContent: "flex-start",
                  }}>
                    {side === "right" ? (
                      <div style={{ width: "100%", maxWidth: 340 }}>
                        <ExperienceCard exp={exp} p={p} side="right" delay={delay} />
                      </div>
                    ) : (
                      <p style={{
                        fontFamily:    p.yearFont,
                        fontSize:      "0.52rem",
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                        color:         p.yearColor,
                        textAlign:     "left",
                        opacity:       0.8,
                        lineHeight:    1.5,
                        animation:     `fadeUp 0.45s ease ${delay + 0.1}s both`,
                      }}>
                        {exp.period}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}

            {/* End cap */}
            <div style={{
              display: "flex", justifyContent: "center", marginTop: 40,
              animation: `fadeUp 0.5s ease ${FIRST_ITEM + filteredExperiences.length * ITEM_STAGGER}s both`,
            }}>
              <div style={{
                width:        10,
                height:       10,
                borderRadius: "50%",
                background:   p.lineColor,
                boxShadow:    `0 0 12px ${p.nodeGlow}`,
                position:     "relative",
                zIndex:       2,
              }} />
            </div>
          </div>
        ) : (
          <div style={{
            textAlign: "center",
            padding: "80px 0",
            color: p.subColor,
            fontFamily: p.monoFont,
            fontSize: "0.7rem",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
          }}>
            No experiences found in this mode.
          </div>
        )}
      </div>
    </div>
  );
}