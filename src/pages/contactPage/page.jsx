"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/app/themeProvider";
import {
  FaEnvelope as Mail,
  FaPhone as Phone,
  FaMapMarkerAlt as MapPin,
  FaGithub as GitHub,
  FaLinkedin as LinkedinIcon,
  FaGlobe as Globe,
  FaPaperPlane as Send,
  FaCopy as Copy,
  FaCheck as Check,
  FaExternalLinkAlt as ExternalLink,
  FaTwitter as TwitterIcon,
  FaInstagram as InstagramIcon,
  FaCommentDots as MessageCircle,
} from "react-icons/fa"

// ── Contact data — replace with your real info ─────────────
const CONTACT_ITEMS = [
  {
    id: "email",
    label: "Email",
    value: "hello@yourname.dev",
    display: "hello@yourname.dev",
    Icon: Mail,
    accent: "#6ea0ff",
    href: "mailto:hello@yourname.dev",
    copyable: true,
    desc: "Best way to reach me. I typically reply within 24 hours.",
  },
  {
    id: "phone",
    label: "Phone",
    value: "+63 912 345 6789",
    display: "+63 912 345 6789",
    Icon: Phone,
    accent: "#34d399",
    href: "tel:+639123456789",
    copyable: true,
    desc: "Available for calls on weekdays, 9AM–6PM PHT.",
  },
  {
    id: "location",
    label: "Location",
    value: "Baguio City, Philippines",
    display: "Baguio City, PH",
    Icon: MapPin,
    accent: "#fb923c",
    href: "https://maps.google.com/?q=Baguio+City+Philippines",
    copyable: false,
    desc: "Open to remote work worldwide and local opportunities in PH.",
  },
];

const SOCIAL_LINKS = [
  {
    id: "github",
    label: "GitHub",
    handle: "@yourhandle",
    Icon: GitHub,
    accent: "#e2e8f0",
    href: "https://github.com/yourhandle",
    desc: "Source code & open-source",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    handle: "Your Name",
    Icon: LinkedinIcon,
    accent: "#0ea5e9",
    href: "https://linkedin.com/in/yourprofile",
    desc: "Professional network",
  },
  {
    id: "devpost",
    label: "Devpost",
    handle: "@yourhandle",
    Icon: Globe,
    accent: "#a78bfa",
    href: "https://devpost.com/yourhandle",
    desc: "Hackathon submissions",
  },
  {
    id: "twitter",
    label: "Twitter / X",
    handle: "@yourhandle",
    Icon: TwitterIcon,
    accent: "#38bdf8",
    href: "https://twitter.com/yourhandle",
    desc: "Thoughts & updates",
  },
  {
    id: "instagram",
    label: "Instagram",
    handle: "@yourhandle",
    Icon: InstagramIcon,
    accent: "#f472b6",
    href: "https://instagram.com/yourhandle",
    desc: "Life beyond the screen",
  },
];

const AVAILABILITY = {
  status: "open",   // "open" | "busy" | "closed"
  label:  "Open to opportunities",
  sub:    "Hackathons, freelance & internships",
};

// ── Theme tokens ───────────────────────────────────────────
const T = {
  tech: {
    bgImage:      "/images/techImages/tech1background.png",
    bgGradient: `
      radial-gradient(ellipse 80% 60% at 10% 90%, rgba(17,51,153,0.55) 0%, transparent 60%),
      radial-gradient(ellipse 60% 50% at 90% 10%, rgba(10,35,110,0.45) 0%, transparent 55%),
      linear-gradient(135deg, rgba(2,4,14,0.88) 0%, rgba(5,9,26,0.84) 50%, rgba(3,7,16,0.9) 100%)`,
    showGrid:     true,
    gridColor:    "rgba(40,100,255,0.035)",
    lineColor:    "rgba(59,130,246,0.6)",
    lineGlow:     "rgba(59,130,246,0.18)",
    headingGrad:  "linear-gradient(135deg, #e0ecff 0%, #6ea0ff 55%, #3b6fd4 100%)",
    sub:          "rgba(148,180,255,0.52)",
    eyebrow:      "// contact.init",
    sectionLabel: "Let's Talk",
    tagline:      "Got a project, idea, or just want to say hi? My inbox is open.",
    fontFamily:   "var(--font-playfair)",
    mono:         "var(--font-dm-mono)",
    cardBg:       "rgba(8,18,55,0.58)",
    cardBd:       "rgba(59,130,246,0.14)",
    cardHoverBd:  "rgba(59,130,246,0.45)",
    cardHoverBg:  "rgba(59,130,246,0.06)",
    labelC:       "rgba(148,180,255,0.5)",
    valueC:       "#ffffff",
    descC:        "rgba(180,210,255,0.65)",
    dividerC:     "rgba(59,130,246,0.1)",
    pillBg:       "rgba(59,130,246,0.1)",
    pillBd:       "rgba(59,130,246,0.22)",
    pillC:        "rgba(148,180,255,0.85)",
    copyBg:       "rgba(59,130,246,0.14)",
    copyHBg:      "rgba(59,130,246,0.28)",
    availOpen:    "#22d3ee",
    availBusy:    "#fb923c",
    availClosed:  "#f87171",
    availBg:      "rgba(34,211,238,0.08)",
    availBd:      "rgba(34,211,238,0.25)",
    socialBg:     "rgba(8,18,55,0.5)",
    socialBd:     "rgba(59,130,246,0.12)",
    socialHoverBg:"rgba(59,130,246,0.08)",
  },
  "fantasy-morning": {
    bgImage:      "/images/fantasyImages/morning/bkg1Morning.png",
    bgGradient: `
      radial-gradient(ellipse 90% 50% at 95% 5%, rgba(255,230,120,0.25) 0%, transparent 55%),
      radial-gradient(ellipse 70% 60% at 10% 80%, rgba(80,160,90,0.18) 0%, transparent 60%),
      linear-gradient(170deg, rgba(240,255,240,0.55) 0%, rgba(200,240,210,0.5) 50%, rgba(140,200,150,0.6) 100%)`,
    showGrid:     false,
    gridColor:    "transparent",
    lineColor:    "rgba(40,130,50,0.65)",
    lineGlow:     "rgba(40,130,50,0.14)",
    headingGrad:  "linear-gradient(135deg, #0d3318 0%, #1e6b30 55%, #3da856 100%)",
    sub:          "rgba(20,80,30,0.58)",
    eyebrow:      "✦ Reach Out ✦",
    sectionLabel: "Send a Scroll",
    tagline:      "Whether it's a quest, a commission, or a greeting — I welcome all messages.",
    fontFamily:   "var(--font-cinzel)",
    mono:         "var(--font-dm-mono)",
    cardBg:       "rgba(235,255,240,0.78)",
    cardBd:       "rgba(40,130,50,0.15)",
    cardHoverBd:  "rgba(40,130,50,0.5)",
    cardHoverBg:  "rgba(40,130,50,0.05)",
    labelC:       "rgba(20,80,30,0.5)",
    valueC:       "rgba(8,40,15,1)",
    descC:        "rgba(30,70,40,0.68)",
    dividerC:     "rgba(40,130,50,0.1)",
    pillBg:       "rgba(40,130,50,0.09)",
    pillBd:       "rgba(40,130,50,0.2)",
    pillC:        "rgba(15,70,25,0.85)",
    copyBg:       "rgba(40,130,50,0.12)",
    copyHBg:      "rgba(40,130,50,0.24)",
    availOpen:    "#16a34a",
    availBusy:    "#d97706",
    availClosed:  "#dc2626",
    availBg:      "rgba(22,163,74,0.08)",
    availBd:      "rgba(22,163,74,0.25)",
    socialBg:     "rgba(235,255,240,0.65)",
    socialBd:     "rgba(40,130,50,0.12)",
    socialHoverBg:"rgba(40,130,50,0.06)",
  },
  "fantasy-night": {
    bgImage:      "/images/fantasyImages/night/bkg1Night.png",
    bgGradient: `
      radial-gradient(ellipse 70% 50% at 80% 10%, rgba(30,60,130,0.5) 0%, transparent 55%),
      radial-gradient(ellipse 80% 60% at 10% 80%, rgba(10,25,70,0.4) 0%, transparent 60%),
      linear-gradient(170deg, rgba(6,14,28,0.65) 0%, rgba(10,22,55,0.6) 60%, rgba(4,8,20,0.72) 100%)`,
    showGrid:     false,
    gridColor:    "transparent",
    lineColor:    "rgba(100,160,240,0.58)",
    lineGlow:     "rgba(100,160,240,0.15)",
    headingGrad:  "linear-gradient(135deg, #dff0ff 0%, #8bc4f8 55%, #4a8fd4 100%)",
    sub:          "rgba(139,196,248,0.52)",
    eyebrow:      "✦ Reach Out ✦",
    sectionLabel: "Send a Scroll",
    tagline:      "Whether it's a quest, a commission, or a greeting — I welcome all messages.",
    fontFamily:   "var(--font-cinzel)",
    mono:         "var(--font-dm-mono)",
    cardBg:       "rgba(8,18,55,0.58)",
    cardBd:       "rgba(100,160,240,0.14)",
    cardHoverBd:  "rgba(139,196,248,0.45)",
    cardHoverBg:  "rgba(100,160,240,0.06)",
    labelC:       "rgba(139,196,248,0.48)",
    valueC:       "#ffffff",
    descC:        "rgba(170,215,255,0.62)",
    dividerC:     "rgba(100,160,240,0.1)",
    pillBg:       "rgba(100,160,240,0.1)",
    pillBd:       "rgba(100,160,240,0.22)",
    pillC:        "rgba(139,196,248,0.85)",
    copyBg:       "rgba(100,160,240,0.14)",
    copyHBg:      "rgba(100,160,240,0.28)",
    availOpen:    "#22d3ee",
    availBusy:    "#fb923c",
    availClosed:  "#f87171",
    availBg:      "rgba(34,211,238,0.08)",
    availBd:      "rgba(34,211,238,0.25)",
    socialBg:     "rgba(8,18,55,0.5)",
    socialBd:     "rgba(100,160,240,0.12)",
    socialHoverBg:"rgba(100,160,240,0.07)",
  },
};

// ── Copy button ────────────────────────────────────────────
function CopyButton({ value, p }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <motion.button
      onClick={handleCopy}
      whileHover={{ scale: 1.08, background: p.copyHBg }}
      whileTap={{ scale: 0.92 }}
      style={{
        width: 28, height: 28, borderRadius: 7,
        background: p.copyBg,
        border: `1px solid ${copied ? "rgba(34,211,238,0.4)" : "rgba(255,255,255,0.08)"}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer", outline: "none", flexShrink: 0,
        transition: "border-color 0.2s, background 0.18s",
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {copied
          ? <motion.span key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
              <Check size={12} color="#22d3ee" />
            </motion.span>
          : <motion.span key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
              <Copy size={12} color={p.labelC} />
            </motion.span>
        }
      </AnimatePresence>
    </motion.button>
  );
}

// ── Contact card ───────────────────────────────────────────
function ContactCard({ item, p, delay }) {
  const { Icon } = item;
  return (
    <motion.a
      href={item.href}
      target={item.href.startsWith("http") ? "_blank" : undefined}
      rel="noopener noreferrer"
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ borderColor: p.cardHoverBd, background: p.cardHoverBg }}
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 16,
        padding: "18px 20px",
        borderRadius: 16,
        background: p.cardBg,
        border: `1px solid ${p.cardBd}`,
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        textDecoration: "none",
        cursor: "pointer",
        transition: "border-color 0.2s, background 0.18s",
      }}
    >
      {/* Icon */}
      <div style={{
        width: 44, height: 44, borderRadius: 12, flexShrink: 0,
        background: `${item.accent}14`,
        border: `1.5px solid ${item.accent}30`,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <Icon size={19} color={item.accent} strokeWidth={1.6} />
      </div>

      {/* Text */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontFamily: p.mono, fontSize: "0.44rem",
          letterSpacing: "0.22em", textTransform: "uppercase",
          color: p.labelC, marginBottom: 4,
        }}>
          {item.label}
        </div>
        <div style={{
          fontFamily: p.fontFamily, fontSize: "clamp(0.82rem, 1vw, 0.96rem)",
          fontWeight: 700, color: p.valueC, letterSpacing: "-0.01em",
          marginBottom: 5,
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
        }}>
          {item.display}
        </div>
        <div style={{
          fontFamily: p.mono, fontSize: "0.55rem",
          lineHeight: 1.6, color: p.descC,
        }}>
          {item.desc}
        </div>
      </div>

      {/* Copy or link icon */}
      {item.copyable
        ? <CopyButton value={item.value} p={p} />
        : (
          <div style={{
            width: 28, height: 28, borderRadius: 7,
            background: p.copyBg,
            border: "1px solid rgba(255,255,255,0.07)",
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>
            <ExternalLink size={12} color={p.labelC} />
          </div>
        )
      }
    </motion.a>
  );
}

// ── Social pill ────────────────────────────────────────────
function SocialCard({ item, p, delay }) {
  const { Icon } = item;
  return (
    <motion.a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ borderColor: `${item.accent}60`, background: p.socialHoverBg, y: -2 }}
      whileTap={{ scale: 0.96 }}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "13px 16px",
        borderRadius: 13,
        background: p.socialBg,
        border: `1px solid ${p.socialBd}`,
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        textDecoration: "none",
        cursor: "pointer",
        transition: "all 0.18s",
        flex: "1 1 0",
        minWidth: 0,
      }}
    >
      <div style={{
        width: 34, height: 34, borderRadius: 9, flexShrink: 0,
        background: `${item.accent}12`,
        border: `1.5px solid ${item.accent}28`,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <Icon size={15} color={item.accent} strokeWidth={1.7} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontFamily: p.fontFamily, fontSize: "0.76rem",
          fontWeight: 700, color: p.valueC, letterSpacing: "-0.01em",
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
        }}>
          {item.label}
        </div>
        <div style={{
          fontFamily: p.mono, fontSize: "0.46rem",
          color: p.labelC, marginTop: 2,
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
        }}>
          {item.handle}
        </div>
      </div>
      <ExternalLink size={11} color={p.labelC} style={{ flexShrink: 0, opacity: 0.5 }} />
    </motion.a>
  );
}

// ── Availability badge ─────────────────────────────────────
function AvailBadge({ p }) {
  const statusColor = AVAILABILITY.status === "open"
    ? p.availOpen
    : AVAILABILITY.status === "busy"
    ? p.availBusy
    : p.availClosed;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.05 }}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "8px 14px",
        borderRadius: 999,
        background: p.availBg,
        border: `1px solid ${statusColor}44`,
        backdropFilter: "blur(12px)",
        marginBottom: 24,
      }}
    >
      {/* Pulsing dot */}
      <div style={{ position: "relative", width: 8, height: 8, flexShrink: 0 }}>
        <div style={{
          position: "absolute", inset: 0, borderRadius: "50%",
          background: statusColor,
          animation: AVAILABILITY.status === "open" ? "pulse 2s ease infinite" : "none",
        }} />
      </div>
      <div>
        <span style={{
          fontFamily: p.mono, fontSize: "0.5rem",
          letterSpacing: "0.12em", color: statusColor, fontWeight: 700,
        }}>
          {AVAILABILITY.label}
        </span>
        <span style={{
          fontFamily: p.mono, fontSize: "0.46rem",
          color: p.labelC, marginLeft: 8,
        }}>
          {AVAILABILITY.sub}
        </span>
      </div>
    </motion.div>
  );
}

// ── Main ───────────────────────────────────────────────────
export default function ContactPage() {
  const { theme } = useTheme();
  const p         = T[theme] ?? T.tech;

  return (
    <div style={{
      position: "relative",
      width: "100%",
      height: "100dvh",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      fontFamily: p.fontFamily,
    }}>
      <style>{`
        @keyframes fadeUp  { from { opacity:0; transform:translateY(14px) } to { opacity:1; transform:translateY(0) } }
        @keyframes slideX  { from { transform:scaleX(0) } to { transform:scaleX(1) } }
        @keyframes pulse   { 0%,100% { opacity:1; transform:scale(1) } 50% { opacity:0.4; transform:scale(1.6) } }
      `}</style>

      {/* Backgrounds */}
      {p.bgImage && (
        <div style={{
          position: "absolute", inset: 0, zIndex: 0,
          backgroundImage: `url('${p.bgImage}')`,
          backgroundSize: "cover", backgroundPosition: "center",
        }} />
      )}
      <div style={{
        position: "absolute", inset: 0, zIndex: 1,
        background: p.bgGradient, transition: "background 0.7s",
      }} />
      {p.showGrid && (
        <div style={{
          position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
          backgroundImage: `linear-gradient(${p.gridColor} 1px, transparent 1px), linear-gradient(90deg, ${p.gridColor} 1px, transparent 1px)`,
          backgroundSize: "55px 55px",
        }} />
      )}

      {/* Content */}
      <div style={{
        position: "relative", zIndex: 10,
        flex: 1, minHeight: 0,
        display: "flex",
        flexDirection: "column",
        padding: "44px 56px 36px",
        gap: 0,
      }}>

        {/* ── Header ── */}
        <div style={{
          flexShrink: 0, marginBottom: 32,
          animation: "fadeUp 0.65s cubic-bezier(0.22,1,0.36,1) both",
        }}>
          <p style={{
            fontFamily: p.mono, fontSize: "0.62rem",
            letterSpacing: "0.34em", textTransform: "uppercase",
            color: p.sub, marginBottom: 8,
          }}>
            {p.eyebrow}
          </p>
          <div style={{
            display: "flex", alignItems: "flex-end",
            justifyContent: "space-between", flexWrap: "wrap", gap: 14,
          }}>
            <h1 style={{
              fontFamily: p.fontFamily,
              fontSize: "clamp(1.9rem, 3.5vw, 2.9rem)",
              fontWeight: 700, lineHeight: 0.92, letterSpacing: "-0.02em",
              backgroundImage: p.headingGrad,
              backgroundClip: "text", WebkitBackgroundClip: "text", color: "transparent",
              margin: 0,
            }}>
              {p.sectionLabel}
            </h1>
            <AvailBadge p={p} />
          </div>
          <div style={{
            height: 1.5, marginTop: 18, transformOrigin: "left center",
            background: `linear-gradient(90deg, ${p.lineColor} 0%, ${p.lineGlow} 60%, transparent 100%)`,
            animation: "slideX 1s cubic-bezier(0.22,1,0.36,1) 0.1s both",
          }} />
        </div>

        {/* ── Two-column body ── */}
        <div style={{
          flex: 1, minHeight: 0,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 28,
        }}>

          {/* LEFT — direct contacts + tagline */}
          <div style={{
            display: "flex", flexDirection: "column", gap: 0,
            animation: "fadeUp 0.5s ease 0.12s both",
          }}>
            {/* Tagline */}
            <p style={{
              fontFamily: p.mono, fontSize: "0.65rem",
              lineHeight: 1.8, color: p.descC,
              marginBottom: 24, marginTop: 2,
            }}>
              {p.tagline}
            </p>

            {/* Contact cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {CONTACT_ITEMS.map((item, i) => (
                <ContactCard key={item.id} item={item} p={p} delay={0.14 + i * 0.08} />
              ))}
            </div>

            {/* Bottom note */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              style={{
                marginTop: "auto",
                paddingTop: 20,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <div style={{ width: 3, height: 22, borderRadius: 2, background: p.lineColor, opacity: 0.4 }} />
              <span style={{
                fontFamily: p.mono, fontSize: "0.52rem",
                lineHeight: 1.7, color: p.labelC,
              }}>
                Response time is usually within a day. I'm based in{" "}
                <span style={{ color: p.sub, fontWeight: 600 }}>GMT+8 (PHT)</span>.
              </span>
            </motion.div>
          </div>

          {/* RIGHT — socials */}
          <div style={{
            display: "flex", flexDirection: "column",
            animation: "fadeUp 0.5s ease 0.18s both",
          }}>
            {/* Section label */}
            <div style={{
              display: "flex", alignItems: "center", gap: 12, marginBottom: 16, marginTop: 2,
            }}>
              <span style={{
                fontFamily: p.mono, fontSize: "0.46rem",
                letterSpacing: "0.28em", textTransform: "uppercase",
                color: p.sub, opacity: 0.65, flexShrink: 0,
              }}>
                Socials & Links
              </span>
              <div style={{
                flex: 1, height: 1,
                background: `linear-gradient(90deg, ${p.dividerC} 0%, transparent 80%)`,
              }} />
            </div>

            {/* Social grid — 2 cols */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 10,
            }}>
              {SOCIAL_LINKS.map((item, i) => (
                <SocialCard key={item.id} item={item} p={p} delay={0.2 + i * 0.07} />
              ))}
            </div>

            {/* CTA card */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.55 }}
              style={{
                marginTop: "auto",
                padding: "20px 22px",
                borderRadius: 16,
                background: p.cardBg,
                border: `1px solid ${p.cardBd}`,
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 16,
              }}
            >
              <div>
                <div style={{
                  fontFamily: p.fontFamily, fontSize: "0.92rem",
                  fontWeight: 700, color: p.valueC, marginBottom: 5,
                }}>
                  Prefer email?
                </div>
                <div style={{
                  fontFamily: p.mono, fontSize: "0.55rem",
                  color: p.descC, lineHeight: 1.6,
                }}>
                  Send me a message directly and I'll get back to you.
                </div>
              </div>
              <motion.a
                href="mailto:hello@yourname.dev"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 7,
                  padding: "10px 18px",
                  borderRadius: 10,
                  background: `${p.lineColor}20`,
                  border: `1.5px solid ${p.lineColor}50`,
                  color: p.valueC,
                  fontFamily: p.mono,
                  fontSize: "0.5rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  fontWeight: 700,
                  textDecoration: "none",
                  flexShrink: 0,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                <Send size={12} />
                Send Mail
              </motion.a>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
}