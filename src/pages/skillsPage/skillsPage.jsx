"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/app/themeProvider";
import {
  Code2, Globe, Palette, Layers, Database,
  Box, Zap, GitBranch, Terminal, FlaskConical,
  BrainCircuit, Eye, Shield, Smartphone,
  ChevronDown, Cpu, Calendar,
} from "lucide-react";

// ── Data ───────────────────────────────────────────────────
const SKILLS = [
  {
    id: "javascript", name: "JavaScript", category: "Languages",
    level: "Expert", proficiency: 5, accent: "#f7df1e", Icon: Code2,
    tags: ["ES6+", "Async/Await", "DOM", "Web APIs", "Modules"],
    desc: "Primary language across every project since 2022. Used for client-side logic, browser extensions (Chrome Manifest V3), interactive animations, game logic, and complex UI state management.",
    projects: ["Carbonated", "Coder's Guild", "Outlast", "Elementia", "Sustainable Travel Guide"],
    since: "2022",
  },
  {
    id: "typescript", name: "TypeScript", category: "Languages",
    level: "Advanced", proficiency: 4, accent: "#3178c6", Icon: Code2,
    tags: ["Static Typing", "Interfaces", "Generics", "Type Guards"],
    desc: "Used across Next.js and full-stack projects to enforce type safety and reduce runtime errors. Valuable in larger codebases like Byteon and Coalitus where multiple models and components interact.",
    projects: ["Byteon", "Coalitus", "Opitulare", "Workable"],
    since: "2023",
  },
  {
    id: "python", name: "Python", category: "Languages",
    level: "Advanced", proficiency: 4, accent: "#ffd845", Icon: Terminal,
    tags: ["ML/AI", "Flask", "Tkinter", "YARA", "NLTK"],
    desc: "Central to AI/ML work — DistilBERT fine-tuning in Coalitus, YARA-based file scanning in Soteria, and NLTK intent classification in Vox Aequalis. Also used for Flask API backends.",
    projects: ["Coalitus", "Soteria", "Vox Aequalis", "Miru"],
    since: "2023",
  },
  {
    id: "html-css", name: "HTML & CSS", category: "Languages",
    level: "Expert", proficiency: 5, accent: "#e44d26", Icon: Layers,
    tags: ["Semantic HTML", "Flexbox", "Grid", "Animations", "Accessibility"],
    desc: "Foundation of every web project. Deep expertise building pixel-perfect, accessible interfaces — from parallax effects in Coder's Guild to the retro-futuristic vending machine UI in Carbonated.",
    projects: ["Coder's Guild", "Outlast", "Carbonated", "Sustainable Travel Guide"],
    since: "2022",
  },
  {
    id: "sql", name: "SQL", category: "Languages",
    level: "Intermediate", proficiency: 3, accent: "#00aeff", Icon: Database,
    tags: ["PostgreSQL", "Schema Design", "Queries", "Joins"],
    desc: "Applied in Workable for user-survey data and career mapping, and in Byteon for participant and project tracking across hackathon workflows.",
    projects: ["Workable", "Byteon"],
    since: "2024",
  },
  {
    id: "react", name: "React", category: "Frontend",
    level: "Expert", proficiency: 5, accent: "#61dafb", Icon: Box,
    tags: ["Hooks", "Context", "Component Design", "State", "Performance"],
    desc: "Core framework behind nearly every frontend build. Powers Terrarium's 10 mini-games, Coalitus's multi-model dashboard, and Opitulare's privacy-aware UX. Custom hooks and component architecture are a strong focus.",
    projects: ["Coalitus", "Terrarium", "Opitulare", "Vox Aequalis", "Carbonated"],
    since: "2023",
  },
  {
    id: "nextjs", name: "Next.js", category: "Frontend",
    level: "Advanced", proficiency: 4, accent: "#e2e8f0", Icon: Globe,
    tags: ["App Router", "SSR", "SSG", "API Routes", "Vercel"],
    desc: "Framework of choice for production apps. Powers Carbonated, Opitulare, Terrarium, and Workable with server-side rendering, optimized image handling, and Vercel deployments.",
    projects: ["Carbonated", "Opitulare", "Terrarium", "Workable"],
    since: "2023",
  },
  {
    id: "tailwind", name: "Tailwind CSS", category: "Frontend",
    level: "Expert", proficiency: 5, accent: "#38bdf8", Icon: Palette,
    tags: ["Utility-First", "Responsive", "Dark Mode", "Custom Config"],
    desc: "Primary styling system for all modern projects. Used extensively in Carbonated, Opitulare, and Terrarium for rapid, consistent, responsive design. Comfortable with custom configs and arbitrary values.",
    projects: ["Carbonated", "Opitulare", "Terrarium", "Workable"],
    since: "2023",
  },
  {
    id: "framer-motion", name: "Framer Motion", category: "Frontend",
    level: "Advanced", proficiency: 4, accent: "#d63bff", Icon: Zap,
    tags: ["Animations", "Layout", "Gestures", "AnimatePresence"],
    desc: "Powers the fluid, physics-based animations throughout this portfolio. Deeply familiar with layoutId, AnimatePresence, spring dynamics, and gesture-based interactions.",
    projects: ["Portfolio", "Coalitus", "Byteon"],
    since: "2024",
  },
  {
    id: "flask", name: "Flask", category: "Backend",
    level: "Intermediate", proficiency: 3, accent: "#94a3b8", Icon: FlaskConical,
    tags: ["REST APIs", "Python", "NLTK", "Routing", "CORS"],
    desc: "Used as the backend layer in Vox Aequalis, serving a Python NLTK intent-classification model via REST API consumed by the Next.js frontend. Comfortable building lightweight ML inference services.",
    projects: ["Vox Aequalis", "Soteria"],
    since: "2024",
  },
  {
    id: "nodejs", name: "Node.js", category: "Backend",
    level: "Intermediate", proficiency: 3, accent: "#68a063", Icon: Terminal,
    tags: ["Express", "REST APIs", "Middleware", "Auth", "Full-Stack"],
    desc: "Backend runtime for full-stack JavaScript projects. Used in Terrarium's well-being API and in Workable's inclusive career-matching backend. Comfortable with Express routing and authentication patterns.",
    projects: ["Terrarium", "Workable"],
    since: "2024",
  },
  {
    id: "huggingface", name: "Hugging Face", category: "AI/ML",
    level: "Advanced", proficiency: 4, accent: "#ff9a00", Icon: BrainCircuit,
    tags: ["DistilBERT", "Transformers", "Fine-tuning", "Model Hub"],
    desc: "Core platform for Coalitus Collective — four specialized DistilBERT models fine-tuned and deployed: Emotion Classifier, Topic Classifier, Cognitive Distortion Classifier, and Stress Triage.",
    projects: ["Coalitus"],
    since: "2025",
  },
  {
    id: "computer-vision", name: "Computer Vision", category: "AI/ML",
    level: "Intermediate", proficiency: 3, accent: "#60a5fa", Icon: Eye,
    tags: ["Real-time Detection", "Camera Input", "Object Recognition"],
    desc: "Applied in Miru — a real-time object and person detector built to help users experiencing hallucinations ground themselves in reality. Awarded 3rd Place at NeuroHacks 2025.",
    projects: ["Miru"],
    since: "2025",
  },
  {
    id: "nltk", name: "NLP / NLTK", category: "AI/ML",
    level: "Intermediate", proficiency: 3, accent: "#a78bfa", Icon: BrainCircuit,
    tags: ["Intent Classification", "Tokenization", "Sentiment", "Pipelines"],
    desc: "Used in Vox Aequalis to analyze job-listing language for bias patterns. Integrated with Flask for real-time predictions. Informs the NLP layer in Coalitus.",
    projects: ["Vox Aequalis", "Coalitus"],
    since: "2024",
  },
  {
    id: "yara", name: "YARA / Cybersecurity", category: "AI/ML",
    level: "Intermediate", proficiency: 3, accent: "#f87171", Icon: Shield,
    tags: ["YARA Rules", "Malware Detection", "File Scanning"],
    desc: "Core detection engine of Soteria — an AI-powered cybersecurity chatbot built solo with Python and Tkinter. YARA rules scan files for malicious patterns in real-time, beyond signature-based detection.",
    projects: ["Soteria"],
    since: "2024",
  },
  {
    id: "figma", name: "Figma", category: "Design",
    level: "Advanced", proficiency: 4, accent: "#ff6b6b", Icon: Palette,
    tags: ["UI Design", "Prototyping", "Components", "Design Systems"],
    desc: "Used for prototyping and high-fidelity design before implementation. Design systems built in Figma underpin the visual identity of Opitulare, Workable, and Byteon.",
    projects: ["Opitulare", "Workable", "Byteon"],
    since: "2023",
  },
  {
    id: "git", name: "Git / GitHub", category: "Design",
    level: "Advanced", proficiency: 4, accent: "#f0532a", Icon: GitBranch,
    tags: ["Version Control", "Branching", "PRs", "CI/CD", "GitHub Pages"],
    desc: "Used across all projects for version control, team collaboration, and deployment. Comfortable with branch strategies, pull requests, rebasing, and GitHub Actions.",
    projects: ["All Projects"],
    since: "2022",
  },
  {
    id: "chrome-extensions", name: "Chrome Extensions", category: "Design",
    level: "Advanced", proficiency: 4, accent: "#fbbf24", Icon: Smartphone,
    tags: ["Manifest V3", "Content Scripts", "Background Workers", "Storage API"],
    desc: "Built three distinct Chrome extensions for Carbonated — Juice, Pop, and Coffee — using Chrome Manifest V3. Each tracks and visualizes carbon footprint of browser activity.",
    projects: ["Carbonated"],
    since: "2025",
  },
  {
    id: "vercel", name: "Vercel / Deploy", category: "Design",
    level: "Advanced", proficiency: 4, accent: "#e2e8f0", Icon: Globe,
    tags: ["Serverless", "Edge Functions", "Deploy Previews", "Domains"],
    desc: "Primary deployment platform for all production Next.js projects. Live on Vercel: Carbonated, Opitulare, Terrarium. Comfortable with env vars, previews, and serverless configuration.",
    projects: ["Carbonated", "Opitulare", "Terrarium"],
    since: "2023",
  },
];

const CATEGORIES = ["All", "Languages", "Frontend", "Backend", "AI/ML", "Design"];

const LEVELS = {
  Expert:       { fill: 5, color: "#22d3ee" },
  Advanced:     { fill: 4, color: "#a78bfa" },
  Intermediate: { fill: 3, color: "#fb923c" },
  Learning:     { fill: 2, color: "#6ee7b7" },
};

const STATS = [
  { value: "18", label: "Skills"  },
  { value: "5",  label: "Domains" },
  { value: "3+", label: "Years"   },
];

// ── Theme tokens ───────────────────────────────────────────
const T = {
  tech: {
    bgImage:       "/images/techImages/tech1background.png",
    bgGradient: `
      radial-gradient(ellipse 80% 60% at 10% 90%, rgba(17,51,153,0.55) 0%, transparent 60%),
      radial-gradient(ellipse 60% 50% at 90% 10%, rgba(10,35,110,0.45) 0%, transparent 55%),
      linear-gradient(135deg, rgba(2,4,14,0.88) 0%, rgba(5,9,26,0.84) 50%, rgba(3,7,16,0.9) 100%)`,
    showGrid:      true,
    gridColor:     "rgba(40,100,255,0.035)",
    lineColor:     "rgba(59,130,246,0.6)",
    lineGlow:      "rgba(59,130,246,0.18)",
    headingGrad:   "linear-gradient(135deg, #e0ecff 0%, #6ea0ff 55%, #3b6fd4 100%)",
    sub:           "rgba(148,180,255,0.55)",
    eyebrow:       "// skills.index",
    sectionLabel:  "Skills",
    fontFamily:    "var(--font-playfair)",
    mono:          "var(--font-dm-mono)",
    statBd:        "rgba(59,130,246,0.13)",
    rowBg:         "rgba(8,18,55,0.55)",
    rowBorder:     "rgba(59,130,246,0.12)",
    rowHoverBg:    "rgba(59,130,246,0.07)",
    expandBg:      "rgba(4,10,34,0.7)",
    trackBg:       "rgba(59,130,246,0.15)",
    categoryC:     "rgba(100,150,255,0.6)",
    categoryBd:    "rgba(59,130,246,0.14)",
    titleC:        "#ffffff",
    descC:         "rgba(190,215,255,0.72)",
    chevronC:      "rgba(100,140,255,0.42)",
    filterBg:      "rgba(59,130,246,0.07)",
    filterActiveBg:"rgba(59,130,246,0.2)",
    filterBd:      "rgba(59,130,246,0.18)",
    filterActiveBd:"rgba(59,130,246,0.6)",
    filterActiveC: "rgba(200,220,255,1)",
    filterC:       "rgba(148,180,255,0.45)",
    badgeBg:       "rgba(59,130,246,0.1)",
    badgeBd:       "rgba(59,130,246,0.22)",
    badgeC:        "rgba(148,180,255,0.88)",
    projectBg:     "rgba(59,130,246,0.08)",
    projectBd:     "rgba(59,130,246,0.25)",
  },
  "fantasy-morning": {
    bgImage:       "/images/fantasyImages/morning/bkg1Morning.png",
    bgGradient: `
      radial-gradient(ellipse 90% 50% at 95% 5%, rgba(255,230,120,0.25) 0%, transparent 55%),
      radial-gradient(ellipse 70% 60% at 10% 80%, rgba(80,160,90,0.18) 0%, transparent 60%),
      linear-gradient(170deg, rgba(240,255,240,0.55) 0%, rgba(200,240,210,0.5) 50%, rgba(140,200,150,0.6) 100%)`,
    showGrid:      false,
    gridColor:     "transparent",
    lineColor:     "rgba(40,130,50,0.65)",
    lineGlow:      "rgba(40,130,50,0.14)",
    headingGrad:   "linear-gradient(135deg, #0d3318 0%, #1e6b30 55%, #3da856 100%)",
    sub:           "rgba(20,80,30,0.6)",
    eyebrow:       "✦ Arts & Abilities ✦",
    sectionLabel:  "The Arsenal",
    fontFamily:    "var(--font-cinzel)",
    mono:          "var(--font-dm-mono)",
    statBd:        "rgba(40,130,50,0.15)",
    rowBg:         "rgba(240,255,242,0.72)",
    rowBorder:     "rgba(40,130,50,0.16)",
    rowHoverBg:    "rgba(40,130,50,0.06)",
    expandBg:      "rgba(220,245,225,0.7)",
    trackBg:       "rgba(40,130,50,0.14)",
    categoryC:     "rgba(20,90,35,0.55)",
    categoryBd:    "rgba(40,130,50,0.14)",
    titleC:        "rgba(8,40,15,1)",
    descC:         "rgba(30,70,40,0.78)",
    chevronC:      "rgba(20,100,35,0.4)",
    filterBg:      "rgba(40,130,50,0.07)",
    filterActiveBg:"rgba(40,130,50,0.18)",
    filterBd:      "rgba(40,130,50,0.18)",
    filterActiveBd:"rgba(40,130,50,0.6)",
    filterActiveC: "rgba(8,50,18,1)",
    filterC:       "rgba(20,80,30,0.42)",
    badgeBg:       "rgba(40,130,50,0.09)",
    badgeBd:       "rgba(40,130,50,0.22)",
    badgeC:        "rgba(15,70,25,0.88)",
    projectBg:     "rgba(40,130,50,0.07)",
    projectBd:     "rgba(40,130,50,0.22)",
  },
  "fantasy-night": {
    bgImage:       "/images/fantasyImages/night/bkg1Night.png",
    bgGradient: `
      radial-gradient(ellipse 70% 50% at 80% 10%, rgba(30,60,130,0.5) 0%, transparent 55%),
      radial-gradient(ellipse 80% 60% at 10% 80%, rgba(10,25,70,0.4) 0%, transparent 60%),
      linear-gradient(170deg, rgba(6,14,28,0.65) 0%, rgba(10,22,55,0.6) 60%, rgba(4,8,20,0.72) 100%)`,
    showGrid:      false,
    gridColor:     "transparent",
    lineColor:     "rgba(100,160,240,0.58)",
    lineGlow:      "rgba(100,160,240,0.15)",
    headingGrad:   "linear-gradient(135deg, #dff0ff 0%, #8bc4f8 55%, #4a8fd4 100%)",
    sub:           "rgba(139,196,248,0.55)",
    eyebrow:       "✦ Abilities & Mastery ✦",
    sectionLabel:  "Tome of Skills",
    fontFamily:    "var(--font-cinzel)",
    mono:          "var(--font-dm-mono)",
    statBd:        "rgba(100,160,240,0.13)",
    rowBg:         "rgba(8,18,55,0.55)",
    rowBorder:     "rgba(100,160,240,0.12)",
    rowHoverBg:    "rgba(100,160,240,0.06)",
    expandBg:      "rgba(4,10,32,0.7)",
    trackBg:       "rgba(100,160,240,0.14)",
    categoryC:     "rgba(139,196,248,0.55)",
    categoryBd:    "rgba(100,160,240,0.14)",
    titleC:        "#ffffff",
    descC:         "rgba(170,215,255,0.72)",
    chevronC:      "rgba(100,160,240,0.42)",
    filterBg:      "rgba(100,160,240,0.07)",
    filterActiveBg:"rgba(100,160,240,0.19)",
    filterBd:      "rgba(100,160,240,0.18)",
    filterActiveBd:"rgba(139,196,248,0.6)",
    filterActiveC: "rgba(220,240,255,1)",
    filterC:       "rgba(139,196,248,0.42)",
    badgeBg:       "rgba(100,160,240,0.1)",
    badgeBd:       "rgba(100,160,240,0.22)",
    badgeC:        "rgba(139,196,248,0.88)",
    projectBg:     "rgba(100,160,240,0.08)",
    projectBd:     "rgba(100,160,240,0.25)",
  },
};

// ── Proficiency bar ────────────────────────────────────────
function ProfBar({ proficiency, accent, trackBg }) {
  return (
    <div style={{ display: "flex", gap: 3, alignItems: "center" }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          style={{
            width: 20, height: 3, borderRadius: 2,
            background: i <= proficiency ? accent : trackBg,
            boxShadow: i <= proficiency ? `0 0 5px ${accent}55` : "none",
            transition: "background 0.3s",
          }}
        />
      ))}
    </div>
  );
}

// ── Skill Row (accordion item) ─────────────────────────────
function SkillRow({ skill, p, isOpen, onToggle, index }) {
  const { Icon } = skill;
  const levelMeta = LEVELS[skill.level] ?? LEVELS["Intermediate"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, delay: index * 0.03, ease: [0.22, 1, 0.36, 1] }}
      style={{ borderRadius: 12, overflow: "hidden", marginBottom: 6 }}
    >
      {/* Row header */}
      <motion.div
        onClick={onToggle}
        whileHover={{ background: p.rowHoverBg }}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          padding: "13px 18px",
          background: p.rowBg,
          border: `1px solid ${isOpen ? skill.accent + "44" : p.rowBorder}`,
          borderBottom: isOpen ? "none" : undefined,
          borderRadius: isOpen ? "12px 12px 0 0" : 12,
          cursor: "pointer",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          transition: "border-color 0.2s, background 0.2s",
          userSelect: "none",
        }}
      >
        {/* Accent line */}
        <div style={{
          width: 3, height: 26, borderRadius: 2, flexShrink: 0,
          background: skill.accent,
          boxShadow: `0 0 8px ${skill.accent}55`,
          opacity: isOpen ? 1 : 0.5,
          transition: "opacity 0.2s",
        }} />

        {/* Icon */}
        <div style={{
          width: 34, height: 34, borderRadius: 9, flexShrink: 0,
          background: `${skill.accent}14`,
          border: `1px solid ${skill.accent}33`,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <Icon size={15} color={skill.accent} strokeWidth={1.7} />
        </div>

        {/* Name */}
        <div style={{ flex: "0 0 160px" }}>
          <span style={{
            fontFamily: p.fontFamily,
            fontSize: "clamp(0.78rem, 1vw, 0.88rem)",
            fontWeight: 700, color: p.titleC, letterSpacing: "-0.01em",
          }}>
            {skill.name}
          </span>
        </div>

        {/* Tags — first 3 */}
        <div style={{ flex: 1, display: "flex", gap: 5, flexWrap: "nowrap", overflow: "hidden" }}>
          {skill.tags.slice(0, 3).map((tag) => (
            <span key={tag} style={{
              fontFamily: p.mono, fontSize: "0.42rem",
              letterSpacing: "0.09em", textTransform: "uppercase",
              padding: "2px 7px", borderRadius: 999, flexShrink: 0,
              background: p.badgeBg, border: `1px solid ${p.badgeBd}`, color: p.badgeC,
            }}>
              {tag}
            </span>
          ))}
          {skill.tags.length > 3 && (
            <span style={{ fontFamily: p.mono, fontSize: "0.42rem", color: p.sub, alignSelf: "center", flexShrink: 0 }}>
              +{skill.tags.length - 3}
            </span>
          )}
        </div>

        {/* Proficiency bar */}
        <div style={{ flexShrink: 0 }}>
          <ProfBar proficiency={skill.proficiency} accent={skill.accent} trackBg={p.trackBg} />
        </div>

        {/* Level label */}
        <div style={{ flexShrink: 0, width: 90, textAlign: "right" }}>
          <span style={{
            fontFamily: p.mono, fontSize: "0.46rem",
            letterSpacing: "0.12em", textTransform: "uppercase",
            color: levelMeta.color, fontWeight: 700,
          }}>
            {skill.level}
          </span>
        </div>

        {/* Chevron */}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.22 }}
          style={{ flexShrink: 0, color: p.chevronC, display: "flex" }}
        >
          <ChevronDown size={15} />
        </motion.div>
      </motion.div>

      {/* Expanded content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div style={{
              padding: "18px 22px 20px",
              background: p.expandBg,
              border: `1px solid ${skill.accent}33`,
              borderTop: "none",
              borderRadius: "0 0 12px 12px",
              backdropFilter: "blur(18px)",
              WebkitBackdropFilter: "blur(18px)",
              display: "flex", flexDirection: "column", gap: 14,
            }}>
              <div style={{
                height: 1,
                background: `linear-gradient(90deg, ${skill.accent}55 0%, transparent 70%)`,
              }} />

              {/* Description */}
              <p style={{
                fontFamily: p.mono, fontSize: "0.62rem",
                lineHeight: 1.82, color: p.descC, margin: 0,
              }}>
                {skill.desc}
              </p>

              {/* Bottom row */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: 24, flexWrap: "wrap" }}>
                {/* Used in */}
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 7 }}>
                    <Cpu size={9} color={p.sub} />
                    <span style={{
                      fontFamily: p.mono, fontSize: "0.44rem",
                      letterSpacing: "0.18em", textTransform: "uppercase", color: p.sub,
                    }}>
                      Used in
                    </span>
                  </div>
                  <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                    {skill.projects.map((proj) => (
                      <span key={proj} style={{
                        fontFamily: p.mono, fontSize: "0.44rem", letterSpacing: "0.06em",
                        padding: "3px 9px", borderRadius: 999,
                        background: p.projectBg, border: `1px solid ${p.projectBd}`,
                        color: skill.accent,
                      }}>
                        {proj}
                      </span>
                    ))}
                  </div>
                </div>

                {/* All tags */}
                <div style={{ flex: 1 }}>
                  <div style={{ marginBottom: 7 }}>
                    <span style={{
                      fontFamily: p.mono, fontSize: "0.44rem",
                      letterSpacing: "0.18em", textTransform: "uppercase", color: p.sub,
                    }}>
                      Technologies
                    </span>
                  </div>
                  <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                    {skill.tags.map((tag) => (
                      <span key={tag} style={{
                        fontFamily: p.mono, fontSize: "0.41rem",
                        letterSpacing: "0.09em", textTransform: "uppercase",
                        padding: "2px 7px", borderRadius: 999,
                        background: p.badgeBg, border: `1px solid ${p.badgeBd}`, color: p.badgeC,
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Since */}
                <div style={{ display: "flex", alignItems: "center", gap: 5, alignSelf: "flex-end" }}>
                  <Calendar size={9} color={p.sub} />
                  <span style={{
                    fontFamily: p.mono, fontSize: "0.44rem",
                    letterSpacing: "0.14em", color: p.sub, textTransform: "uppercase",
                  }}>
                    Since {skill.since}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Category section (used when filter = "All") ────────────
function CategorySection({ category, skills, p, openId, setOpenId }) {
  return (
    <div style={{ marginBottom: 36 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
        <span style={{
          fontFamily: p.mono, fontSize: "0.5rem",
          letterSpacing: "0.3em", textTransform: "uppercase",
          color: p.categoryC, fontWeight: 600,
        }}>
          {category}
        </span>
        <div style={{
          flex: 1, height: 1,
          background: `linear-gradient(90deg, ${p.categoryBd} 0%, transparent 80%)`,
        }} />
        <span style={{ fontFamily: p.mono, fontSize: "0.44rem", letterSpacing: "0.16em", color: p.sub, opacity: 0.55 }}>
          {skills.length} {skills.length === 1 ? "skill" : "skills"}
        </span>
      </div>
      <AnimatePresence>
        {skills.map((skill, i) => (
          <SkillRow
            key={skill.id}
            skill={skill}
            p={p}
            index={i}
            isOpen={openId === skill.id}
            onToggle={() => setOpenId(openId === skill.id ? null : skill.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────
export default function SkillsPage() {
  const { theme } = useTheme();
  const p         = T[theme] ?? T.tech;
  const [filter,  setFilter]  = useState("All");
  const [openId,  setOpenId]  = useState(null);

  const handleFilter = (cat) => { setFilter(cat); setOpenId(null); };

  const filtered = filter === "All"
    ? SKILLS
    : SKILLS.filter((s) => s.category === filter);

  const grouped = filter === "All"
    ? CATEGORIES.slice(1).reduce((acc, cat) => {
        const group = SKILLS.filter((s) => s.category === cat);
        if (group.length) acc.push({ cat, skills: group });
        return acc;
      }, [])
    : null;

  return (
    <div className="w-full relative overflow-hidden" style={{ fontFamily: p.fontFamily, minHeight: "100vh", paddingBottom: 60 }}>
      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(16px) } to { opacity:1; transform:translateY(0) } }
        @keyframes slideX { from { transform:scaleX(0) } to { transform:scaleX(1) } }
        *::-webkit-scrollbar { display:none; }
      `}</style>

      {/* Backgrounds */}
      {p.bgImage && (
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${p.bgImage}')` }} />
      )}
      <div className="absolute inset-0" style={{ background: p.bgGradient, transition: "background 0.7s" }} />
      {p.showGrid && (
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: `linear-gradient(${p.gridColor} 1px, transparent 1px), linear-gradient(90deg, ${p.gridColor} 1px, transparent 1px)`,
          backgroundSize: "55px 55px",
        }} />
      )}

      <div className="relative z-10" style={{ padding: "80px 48px 40px", maxWidth: 920, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: 52, animation: "fadeUp 0.65s cubic-bezier(0.22,1,0.36,1) both" }}>
          <p style={{
            fontFamily: p.mono, fontSize: "0.63rem",
            letterSpacing: "0.34em", textTransform: "uppercase",
            color: p.sub, marginBottom: 10,
          }}>
            {p.eyebrow}
          </p>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 18 }}>
            <h1 style={{
              fontFamily: p.fontFamily, fontSize: "clamp(2.2rem, 4vw, 3.2rem)",
              fontWeight: 700, lineHeight: 0.92, letterSpacing: "-0.02em",
              backgroundImage: p.headingGrad,
              backgroundClip: "text", WebkitBackgroundClip: "text", color: "transparent",
              margin: 0,
            }}>
              {p.sectionLabel}
            </h1>
            <div style={{ display: "flex", gap: 8 }}>
              {STATS.map((s) => (
                <div key={s.label} style={{
                  display: "flex", alignItems: "center", gap: 8,
                  padding: "7px 14px", borderRadius: 999,
                  background: "rgba(255,255,255,0.04)",
                  border: `1px solid ${p.statBd}`,
                  backdropFilter: "blur(12px)",
                }}>
                  <span style={{
                    fontFamily: p.fontFamily, fontSize: "1.1rem", fontWeight: 700,
                    backgroundImage: p.headingGrad,
                    backgroundClip: "text", WebkitBackgroundClip: "text", color: "transparent", lineHeight: 1,
                  }}>
                    {s.value}
                  </span>
                  <span style={{
                    fontFamily: p.mono, fontSize: "0.52rem",
                    letterSpacing: "0.14em", textTransform: "uppercase", color: p.sub,
                  }}>
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div style={{
            height: 1.5, marginTop: 22, transformOrigin: "left center",
            background: `linear-gradient(90deg, ${p.lineColor} 0%, ${p.lineGlow} 60%, transparent 100%)`,
            animation: "slideX 1s cubic-bezier(0.22,1,0.36,1) 0.12s both",
          }} />
        </div>

        {/* Filter tabs */}
        <div style={{
          display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 40,
          animation: "fadeUp 0.5s ease 0.16s both",
        }}>
          {CATEGORIES.map((cat) => {
            const isA  = filter === cat;
            const count = cat === "All" ? SKILLS.length : SKILLS.filter((s) => s.category === cat).length;
            return (
              <motion.button
                key={cat}
                onClick={() => handleFilter(cat)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                style={{
                  fontFamily: p.mono, fontSize: "0.52rem",
                  letterSpacing: "0.2em", textTransform: "uppercase",
                  padding: "6px 15px", borderRadius: 999,
                  border: `1px solid ${isA ? p.filterActiveBd : p.filterBd}`,
                  background: isA ? p.filterActiveBg : p.filterBg,
                  color: isA ? p.filterActiveC : p.filterC,
                  cursor: "pointer", backdropFilter: "blur(10px)", outline: "none",
                  transition: "all 0.18s",
                }}
              >
                {cat}
                <span style={{ marginLeft: 5, opacity: 0.5 }}>{count}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Skill list */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            {grouped
              ? grouped.map(({ cat, skills }) => (
                  <CategorySection
                    key={cat}
                    category={cat}
                    skills={skills}
                    p={p}
                    openId={openId}
                    setOpenId={setOpenId}
                  />
                ))
              : filtered.map((skill, i) => (
                  <SkillRow
                    key={skill.id}
                    skill={skill}
                    p={p}
                    index={i}
                    isOpen={openId === skill.id}
                    onToggle={() => setOpenId(openId === skill.id ? null : skill.id)}
                  />
                ))
            }
          </motion.div>
        </AnimatePresence>

      </div>
    </div>
  );
}