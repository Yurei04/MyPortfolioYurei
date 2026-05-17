"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/app/themeProvider";
import {
  Code2, Globe, Palette, Layers, Database,
  Box, Zap, GitBranch, Terminal, FlaskConical,
  BrainCircuit, Eye, Shield, Smartphone,
  ChevronDown, Cpu, Calendar, Wrench,
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
    desc: "Framework of choice for production apps. Powers Carbonated, Opitulare, Terrarium, and Workable with server-side rendering, optimized image handling, and seamless Vercel deployments.",
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
    id: "figma", name: "Figma", category: "Tools",
    level: "Advanced", proficiency: 4, accent: "#ff6b6b", Icon: Palette,
    tags: ["UI Design", "Prototyping", "Components", "Design Systems"],
    desc: "Used for prototyping and high-fidelity design before implementation. Design systems built in Figma underpin the visual identity of Opitulare, Workable, and Byteon.",
    projects: ["Opitulare", "Workable", "Byteon"],
    since: "2023",
  },
  {
    id: "git", name: "Git / GitHub", category: "Tools",
    level: "Advanced", proficiency: 4, accent: "#f0532a", Icon: GitBranch,
    tags: ["Version Control", "Branching", "PRs", "CI/CD", "GitHub Pages"],
    desc: "Used across all projects for version control, team collaboration, and deployment. Comfortable with branch strategies, pull requests, rebasing, and GitHub Actions.",
    projects: ["All Projects"],
    since: "2022",
  },
  {
    id: "chrome-extensions", name: "Chrome Extensions", category: "Tools",
    level: "Advanced", proficiency: 4, accent: "#fbbf24", Icon: Smartphone,
    tags: ["Manifest V3", "Content Scripts", "Background Workers", "Storage API"],
    desc: "Built three distinct Chrome extensions for Carbonated — Juice, Pop, and Coffee — using Chrome Manifest V3. Each tracks and visualizes carbon footprint of browser activity.",
    projects: ["Carbonated"],
    since: "2025",
  },
  {
    id: "vercel", name: "Vercel / Deploy", category: "Tools",
    level: "Advanced", proficiency: 4, accent: "#e2e8f0", Icon: Globe,
    tags: ["Serverless", "Edge Functions", "Deploy Previews", "Domains"],
    desc: "Primary deployment platform for all production Next.js projects. Live on Vercel: Carbonated, Opitulare, Terrarium. Comfortable with env vars, previews, and serverless configuration.",
    projects: ["Carbonated", "Opitulare", "Terrarium"],
    since: "2023",
  },
];

const CATEGORIES = ["All", "Languages", "Frontend", "Backend", "AI/ML", "Tools"];

const CATEGORY_ICONS = {
  Languages: Code2,
  Frontend:  Box,
  Backend:   Terminal,
  "AI/ML":   BrainCircuit,
  Tools:     Wrench,
};

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
    bgImage:        "/images/techImages/tech1background.png",
    bgGradient: `
      radial-gradient(ellipse 80% 60% at 10% 90%, rgba(17,51,153,0.55) 0%, transparent 60%),
      radial-gradient(ellipse 60% 50% at 90% 10%, rgba(10,35,110,0.45) 0%, transparent 55%),
      linear-gradient(135deg, rgba(2,4,14,0.88) 0%, rgba(5,9,26,0.84) 50%, rgba(3,7,16,0.9) 100%)`,
    showGrid:       true,
    gridColor:      "rgba(40,100,255,0.035)",
    lineColor:      "rgba(59,130,246,0.6)",
    lineGlow:       "rgba(59,130,246,0.18)",
    headingGrad:    "linear-gradient(135deg, #e0ecff 0%, #6ea0ff 55%, #3b6fd4 100%)",
    sub:            "rgba(148,180,255,0.52)",
    eyebrow:        "// skills.index",
    sectionLabel:   "Skills",
    fontFamily:     "var(--font-playfair)",
    mono:           "var(--font-dm-mono)",
    statBd:         "rgba(59,130,246,0.13)",
    sidebarBg:      "rgba(6,14,44,0.72)",
    sidebarBd:      "rgba(59,130,246,0.14)",
    catBtnBg:       "transparent",
    catBtnActiveBg: "rgba(59,130,246,0.16)",
    catBtnBd:       "rgba(59,130,246,0.08)",
    catBtnActiveBd: "rgba(59,130,246,0.5)",
    catBtnC:        "rgba(148,180,255,0.48)",
    catBtnActiveC:  "rgba(210,228,255,1)",
    levelDotTrack:  "rgba(59,130,246,0.15)",
    dividerC:       "rgba(59,130,246,0.1)",
    rowBg:          "rgba(8,18,55,0.5)",
    rowBgOpen:      "rgba(10,22,65,0.72)",
    rowBorder:      "rgba(59,130,246,0.1)",
    rowHoverBg:     "rgba(59,130,246,0.055)",
    expandBg:       "rgba(5,12,40,0.78)",
    trackBg:        "rgba(59,130,246,0.15)",
    titleC:         "#ffffff",
    descC:          "rgba(190,215,255,0.72)",
    chevronC:       "rgba(100,140,255,0.38)",
    badgeBg:        "rgba(59,130,246,0.1)",
    badgeBd:        "rgba(59,130,246,0.2)",
    badgeC:         "rgba(148,180,255,0.85)",
    projectBg:      "rgba(59,130,246,0.07)",
    projectBd:      "rgba(59,130,246,0.22)",
    metaLabelC:     "rgba(120,160,255,0.44)",
    scrollThumb:    "rgba(59,130,246,0.25)",
  },
  "fantasy-morning": {
    bgImage:        "/images/fantasyImages/morning/bkg1Morning.png",
    bgGradient: `
      radial-gradient(ellipse 90% 50% at 95% 5%, rgba(255,230,120,0.25) 0%, transparent 55%),
      radial-gradient(ellipse 70% 60% at 10% 80%, rgba(80,160,90,0.18) 0%, transparent 60%),
      linear-gradient(170deg, rgba(240,255,240,0.55) 0%, rgba(200,240,210,0.5) 50%, rgba(140,200,150,0.6) 100%)`,
    showGrid:       false,
    gridColor:      "transparent",
    lineColor:      "rgba(40,130,50,0.65)",
    lineGlow:       "rgba(40,130,50,0.14)",
    headingGrad:    "linear-gradient(135deg, #0d3318 0%, #1e6b30 55%, #3da856 100%)",
    sub:            "rgba(20,80,30,0.58)",
    eyebrow:        "✦ Arts & Abilities ✦",
    sectionLabel:   "The Arsenal",
    fontFamily:     "var(--font-cinzel)",
    mono:           "var(--font-dm-mono)",
    statBd:         "rgba(40,130,50,0.15)",
    sidebarBg:      "rgba(230,252,234,0.84)",
    sidebarBd:      "rgba(40,130,50,0.15)",
    catBtnBg:       "transparent",
    catBtnActiveBg: "rgba(40,130,50,0.14)",
    catBtnBd:       "rgba(40,130,50,0.08)",
    catBtnActiveBd: "rgba(40,130,50,0.5)",
    catBtnC:        "rgba(20,80,30,0.44)",
    catBtnActiveC:  "rgba(8,45,15,1)",
    levelDotTrack:  "rgba(40,130,50,0.14)",
    dividerC:       "rgba(40,130,50,0.1)",
    rowBg:          "rgba(240,255,242,0.65)",
    rowBgOpen:      "rgba(235,255,240,0.84)",
    rowBorder:      "rgba(40,130,50,0.13)",
    rowHoverBg:     "rgba(40,130,50,0.05)",
    expandBg:       "rgba(220,248,226,0.78)",
    trackBg:        "rgba(40,130,50,0.14)",
    titleC:         "rgba(8,40,15,1)",
    descC:          "rgba(30,70,40,0.78)",
    chevronC:       "rgba(20,100,35,0.38)",
    badgeBg:        "rgba(40,130,50,0.09)",
    badgeBd:        "rgba(40,130,50,0.2)",
    badgeC:         "rgba(15,70,25,0.85)",
    projectBg:      "rgba(40,130,50,0.07)",
    projectBd:      "rgba(40,130,50,0.2)",
    metaLabelC:     "rgba(20,90,35,0.42)",
    scrollThumb:    "rgba(40,130,50,0.25)",
  },
  "fantasy-night": {
    bgImage:        "/images/fantasyImages/night/bkg1Night.png",
    bgGradient: `
      radial-gradient(ellipse 70% 50% at 80% 10%, rgba(30,60,130,0.5) 0%, transparent 55%),
      radial-gradient(ellipse 80% 60% at 10% 80%, rgba(10,25,70,0.4) 0%, transparent 60%),
      linear-gradient(170deg, rgba(6,14,28,0.65) 0%, rgba(10,22,55,0.6) 60%, rgba(4,8,20,0.72) 100%)`,
    showGrid:       false,
    gridColor:      "transparent",
    lineColor:      "rgba(100,160,240,0.58)",
    lineGlow:       "rgba(100,160,240,0.15)",
    headingGrad:    "linear-gradient(135deg, #dff0ff 0%, #8bc4f8 55%, #4a8fd4 100%)",
    sub:            "rgba(139,196,248,0.52)",
    eyebrow:        "✦ Abilities & Mastery ✦",
    sectionLabel:   "Tome of Skills",
    fontFamily:     "var(--font-cinzel)",
    mono:           "var(--font-dm-mono)",
    statBd:         "rgba(100,160,240,0.13)",
    sidebarBg:      "rgba(5,12,36,0.8)",
    sidebarBd:      "rgba(100,160,240,0.14)",
    catBtnBg:       "transparent",
    catBtnActiveBg: "rgba(100,160,240,0.15)",
    catBtnBd:       "rgba(100,160,240,0.08)",
    catBtnActiveBd: "rgba(139,196,248,0.5)",
    catBtnC:        "rgba(139,196,248,0.44)",
    catBtnActiveC:  "rgba(220,240,255,1)",
    levelDotTrack:  "rgba(100,160,240,0.14)",
    dividerC:       "rgba(100,160,240,0.1)",
    rowBg:          "rgba(8,18,55,0.5)",
    rowBgOpen:      "rgba(10,22,65,0.72)",
    rowBorder:      "rgba(100,160,240,0.1)",
    rowHoverBg:     "rgba(100,160,240,0.05)",
    expandBg:       "rgba(4,10,32,0.78)",
    trackBg:        "rgba(100,160,240,0.14)",
    titleC:         "#ffffff",
    descC:          "rgba(170,215,255,0.72)",
    chevronC:       "rgba(100,160,240,0.38)",
    badgeBg:        "rgba(100,160,240,0.1)",
    badgeBd:        "rgba(100,160,240,0.2)",
    badgeC:         "rgba(139,196,248,0.85)",
    projectBg:      "rgba(100,160,240,0.07)",
    projectBd:      "rgba(100,160,240,0.22)",
    metaLabelC:     "rgba(100,160,240,0.42)",
    scrollThumb:    "rgba(100,160,240,0.25)",
  },
};

// ── Segment proficiency bar ────────────────────────────────
function ProfBar({ proficiency, accent, trackBg, size = "md" }) {
  const w = size === "lg" ? 28 : 22;
  const h = size === "lg" ? 4  : 3;
  return (
    <div style={{ display: "flex", gap: 3, alignItems: "center" }}>
      {[1,2,3,4,5].map((i) => (
        <div key={i} style={{
          width: w, height: h, borderRadius: 2,
          background: i <= proficiency ? accent : trackBg,
          boxShadow: i <= proficiency ? `0 0 6px ${accent}55` : "none",
          transition: "background 0.3s",
        }} />
      ))}
    </div>
  );
}

// ── Sidebar ────────────────────────────────────────────────
function Sidebar({ filter, onFilter, p }) {
  const counts = CATEGORIES.reduce((acc, cat) => {
    acc[cat] = cat === "All" ? SKILLS.length : SKILLS.filter((s) => s.category === cat).length;
    return acc;
  }, {});

  const levelCounts = Object.entries(LEVELS).map(([key, meta]) => ({
    key, ...meta,
    count: SKILLS.filter((s) => s.level === key).length,
  }));

  return (
    <div style={{
      width: 220,
      flexShrink: 0,
      height: "100%",
      display: "flex",
      flexDirection: "column",
      background: p.sidebarBg,
      border: `1px solid ${p.sidebarBd}`,
      borderRadius: 18,
      overflow: "hidden",
      backdropFilter: "blur(24px)",
      WebkitBackdropFilter: "blur(24px)",
    }}>
      {/* Category section */}
      <div style={{ padding: "20px 16px 16px", flex: "0 0 auto" }}>
        <span style={{
          fontFamily: p.mono, fontSize: "0.44rem",
          letterSpacing: "0.28em", textTransform: "uppercase",
          color: p.sub, display: "block", marginBottom: 12,
        }}>
          Category
        </span>
        <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {CATEGORIES.map((cat) => {
            const isA     = filter === cat;
            const CatIcon = cat !== "All" ? CATEGORY_ICONS[cat] : null;
            return (
              <motion.button
                key={cat}
                onClick={() => onFilter(cat)}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: "flex", alignItems: "center",
                  justifyContent: "space-between", gap: 8,
                  width: "100%", padding: "8px 11px", borderRadius: 9,
                  border: `1px solid ${isA ? p.catBtnActiveBd : p.catBtnBd}`,
                  background: isA ? p.catBtnActiveBg : p.catBtnBg,
                  cursor: "pointer", outline: "none",
                  transition: "all 0.16s", textAlign: "left",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                  {CatIcon && (
                    <CatIcon size={11} color={isA ? p.catBtnActiveC : p.catBtnC}
                      strokeWidth={1.8} style={{ flexShrink: 0 }} />
                  )}
                  <span style={{
                    fontFamily: p.mono, fontSize: "0.5rem",
                    letterSpacing: "0.1em", textTransform: "uppercase",
                    color: isA ? p.catBtnActiveC : p.catBtnC,
                    fontWeight: isA ? 700 : 400, transition: "color 0.16s",
                  }}>
                    {cat}
                  </span>
                </div>
                <span style={{
                  fontFamily: p.mono, fontSize: "0.44rem",
                  color: isA ? p.catBtnActiveC : p.catBtnC, opacity: 0.55,
                }}>
                  {counts[cat]}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: 1, margin: "0 14px", background: p.dividerC, flexShrink: 0 }} />

      {/* Level legend */}
      <div style={{ padding: "16px 16px 20px", flex: "0 0 auto" }}>
        <span style={{
          fontFamily: p.mono, fontSize: "0.44rem",
          letterSpacing: "0.28em", textTransform: "uppercase",
          color: p.sub, display: "block", marginBottom: 12,
        }}>
          Proficiency
        </span>
        <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
          {levelCounts.map(({ key, color, count }) => (
            <div key={key} style={{ display: "flex", alignItems: "center", gap: 9 }}>
              <div style={{
                width: 8, height: 8, borderRadius: "50%", flexShrink: 0,
                background: color, boxShadow: `0 0 6px ${color}77`,
              }} />
              <span style={{ fontFamily: p.mono, fontSize: "0.48rem", letterSpacing: "0.08em", color: p.sub, flex: 1 }}>
                {key}
              </span>
              <span style={{ fontFamily: p.mono, fontSize: "0.44rem", color: p.sub, opacity: 0.45 }}>
                {count}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Skill Row ──────────────────────────────────────────────
function SkillRow({ skill, p, isOpen, onToggle, index }) {
  const { Icon }  = skill;
  const levelMeta = LEVELS[skill.level] ?? LEVELS["Intermediate"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.3, delay: index * 0.025, ease: [0.22, 1, 0.36, 1] }}
      style={{ borderRadius: 14, overflow: "hidden", marginBottom: 7 }}
    >
      {/* Header */}
      <motion.div
        onClick={onToggle}
        whileHover={{ background: p.rowHoverBg }}
        style={{
          display: "grid",
          gridTemplateColumns: "4px 44px 1fr auto auto auto 26px",
          alignItems: "center",
          gap: 16,
          padding: "14px 18px 14px 14px",
          background: isOpen ? p.rowBgOpen : p.rowBg,
          border: `1px solid ${isOpen ? skill.accent + "40" : p.rowBorder}`,
          borderBottom: isOpen ? "none" : undefined,
          borderRadius: isOpen ? "14px 14px 0 0" : 14,
          cursor: "pointer",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          transition: "border-color 0.2s, background 0.18s",
          userSelect: "none",
        }}
      >
        {/* Accent pill */}
        <div style={{
          width: 4, height: 30, borderRadius: 2,
          background: skill.accent,
          boxShadow: `0 0 10px ${skill.accent}55`,
          opacity: isOpen ? 1 : 0.45,
          transition: "opacity 0.2s",
        }} />

        {/* Icon */}
        <div style={{
          width: 40, height: 40, borderRadius: 10,
          background: `${skill.accent}12`,
          border: `1.5px solid ${skill.accent}30`,
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}>
          <Icon size={17} color={skill.accent} strokeWidth={1.6} />
        </div>

        {/* Name + tags */}
        <div style={{ minWidth: 0 }}>
          <div style={{
            fontFamily: p.fontFamily,
            fontSize: "clamp(0.8rem, 1vw, 0.94rem)",
            fontWeight: 700, color: p.titleC, letterSpacing: "-0.01em",
            marginBottom: 4, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
          }}>
            {skill.name}
          </div>
          <div style={{ display: "flex", gap: 5, flexWrap: "nowrap", overflow: "hidden" }}>
            {skill.tags.slice(0, 4).map((tag) => (
              <span key={tag} style={{
                fontFamily: p.mono, fontSize: "0.39rem",
                letterSpacing: "0.08em", textTransform: "uppercase",
                padding: "2px 7px", borderRadius: 999, flexShrink: 0,
                background: p.badgeBg, border: `1px solid ${p.badgeBd}`, color: p.badgeC,
              }}>
                {tag}
              </span>
            ))}
            {skill.tags.length > 4 && (
              <span style={{ fontFamily: p.mono, fontSize: "0.39rem", color: p.sub, alignSelf: "center", flexShrink: 0 }}>
                +{skill.tags.length - 4}
              </span>
            )}
          </div>
        </div>

        {/* Since */}
        <div style={{ flexShrink: 0, textAlign: "right" }}>
          <div style={{ fontFamily: p.mono, fontSize: "0.4rem", letterSpacing: "0.14em", textTransform: "uppercase", color: p.sub, opacity: 0.55 }}>
            Since
          </div>
          <div style={{ fontFamily: p.mono, fontSize: "0.52rem", color: p.sub, fontWeight: 600, marginTop: 1 }}>
            {skill.since}
          </div>
        </div>

        {/* Proficiency bar */}
        <div style={{ flexShrink: 0 }}>
          <ProfBar proficiency={skill.proficiency} accent={skill.accent} trackBg={p.trackBg} />
        </div>

        {/* Level pill */}
        <div style={{
          flexShrink: 0,
          padding: "4px 10px", borderRadius: 999,
          background: `${levelMeta.color}12`,
          border: `1px solid ${levelMeta.color}35`,
        }}>
          <span style={{
            fontFamily: p.mono, fontSize: "0.42rem",
            letterSpacing: "0.1em", textTransform: "uppercase",
            color: levelMeta.color, fontWeight: 700, whiteSpace: "nowrap",
          }}>
            {skill.level}
          </span>
        </div>

        {/* Chevron */}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.22 }}
          style={{ color: p.chevronC, display: "flex", justifyContent: "center" }}
        >
          <ChevronDown size={14} />
        </motion.div>
      </motion.div>

      {/* Expanded panel */}
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
              background: p.expandBg,
              border: `1px solid ${skill.accent}35`,
              borderTop: "none",
              borderRadius: "0 0 14px 14px",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
            }}>
              <div style={{
                height: 1,
                background: `linear-gradient(90deg, ${skill.accent}60 0%, ${skill.accent}18 40%, transparent 100%)`,
              }} />

              {/* Two-column body */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 280px" }}>
                {/* Left — desc + tags */}
                <div style={{ padding: "20px 22px 20px 26px", borderRight: `1px solid ${skill.accent}18` }}>
                  <p style={{
                    fontFamily: p.mono, fontSize: "0.62rem",
                    lineHeight: 1.84, color: p.descC, margin: "0 0 16px",
                  }}>
                    {skill.desc}
                  </p>
                  <span style={{
                    fontFamily: p.mono, fontSize: "0.41rem",
                    letterSpacing: "0.22em", textTransform: "uppercase",
                    color: p.metaLabelC, display: "block", marginBottom: 8,
                  }}>
                    Technologies
                  </span>
                  <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                    {skill.tags.map((tag) => (
                      <span key={tag} style={{
                        fontFamily: p.mono, fontSize: "0.4rem",
                        letterSpacing: "0.09em", textTransform: "uppercase",
                        padding: "3px 8px", borderRadius: 999,
                        background: p.badgeBg, border: `1px solid ${p.badgeBd}`, color: p.badgeC,
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right — meta */}
                <div style={{ padding: "20px 22px", display: "flex", flexDirection: "column", gap: 18 }}>
                  <div>
                    <span style={{
                      fontFamily: p.mono, fontSize: "0.41rem",
                      letterSpacing: "0.22em", textTransform: "uppercase",
                      color: p.metaLabelC, display: "block", marginBottom: 10,
                    }}>
                      Proficiency
                    </span>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <ProfBar proficiency={skill.proficiency} accent={skill.accent} trackBg={p.trackBg} size="lg" />
                      <span style={{ fontFamily: p.mono, fontSize: "0.48rem", color: levelMeta.color, fontWeight: 700 }}>
                        {skill.proficiency}/5
                      </span>
                    </div>
                  </div>

                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 9 }}>
                      <Cpu size={9} color={p.metaLabelC} />
                      <span style={{
                        fontFamily: p.mono, fontSize: "0.41rem",
                        letterSpacing: "0.22em", textTransform: "uppercase", color: p.metaLabelC,
                      }}>
                        Used in
                      </span>
                    </div>
                    <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                      {skill.projects.map((proj) => (
                        <span key={proj} style={{
                          fontFamily: p.mono, fontSize: "0.43rem", letterSpacing: "0.05em",
                          padding: "4px 10px", borderRadius: 999,
                          background: p.projectBg, border: `1px solid ${p.projectBd}`, color: skill.accent,
                        }}>
                          {proj}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: 6 }}>
                    <Calendar size={9} color={p.metaLabelC} />
                    <span style={{
                      fontFamily: p.mono, fontSize: "0.43rem",
                      letterSpacing: "0.14em", textTransform: "uppercase", color: p.sub,
                    }}>
                      Using since {skill.since}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Category divider ───────────────────────────────────────
function CategoryDivider({ label, count, p }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 10, marginTop: 4 }}>
      <span style={{
        fontFamily: p.mono, fontSize: "0.46rem",
        letterSpacing: "0.28em", textTransform: "uppercase",
        color: p.sub, opacity: 0.6, flexShrink: 0,
      }}>
        {label}
      </span>
      <div style={{
        flex: 1, height: 1,
        background: `linear-gradient(90deg, ${p.dividerC} 0%, transparent 80%)`,
      }} />
      <span style={{ fontFamily: p.mono, fontSize: "0.41rem", color: p.sub, opacity: 0.38, flexShrink: 0 }}>
        {count}
      </span>
    </div>
  );
}

// ── Main ───────────────────────────────────────────────────
export default function SkillsPage() {
  const { theme } = useTheme();
  const p         = T[theme] ?? T.tech;
  const [filter,  setFilter] = useState("All");
  const [openId,  setOpenId] = useState(null);

  const handleFilter = (cat) => { setFilter(cat); setOpenId(null); };

  const filtered = filter === "All" ? SKILLS : SKILLS.filter((s) => s.category === filter);
  const grouped  = filter === "All"
    ? CATEGORIES.slice(1).reduce((acc, cat) => {
        const group = SKILLS.filter((s) => s.category === cat);
        if (group.length) acc.push({ cat, skills: group });
        return acc;
      }, [])
    : null;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100dvh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        fontFamily: p.fontFamily,
      }}
    >
      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(14px) } to { opacity:1; transform:translateY(0) } }
        @keyframes slideX { from { transform:scaleX(0) } to { transform:scaleX(1) } }
        .skill-scroll::-webkit-scrollbar { width: 4px; }
        .skill-scroll::-webkit-scrollbar-track { background: transparent; }
        .skill-scroll::-webkit-scrollbar-thumb { background: var(--scroll-thumb); border-radius: 2px; }
      `}</style>

      {/* ── Backgrounds (fills full viewport) ── */}
      {p.bgImage && (
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `url('${p.bgImage}')`,
          backgroundSize: "cover", backgroundPosition: "center",
          zIndex: 0,
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

      {/* ── Header — fixed height, never scrolls ── */}
      <div
        style={{
          position: "relative", zIndex: 10,
          padding: "44px 48px 28px",
          flexShrink: 0,
          animation: "fadeUp 0.65s cubic-bezier(0.22,1,0.36,1) both",
        }}
      >
        <p style={{
          fontFamily: p.mono, fontSize: "0.62rem",
          letterSpacing: "0.34em", textTransform: "uppercase",
          color: p.sub, marginBottom: 8,
        }}>
          {p.eyebrow}
        </p>
        <div style={{
          display: "flex", alignItems: "flex-end",
          justifyContent: "space-between", flexWrap: "wrap", gap: 16,
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
          <div style={{ display: "flex", gap: 8 }}>
            {STATS.map((s) => (
              <div key={s.label} style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "6px 13px", borderRadius: 999,
                background: "rgba(255,255,255,0.04)",
                border: `1px solid ${p.statBd}`,
                backdropFilter: "blur(12px)",
              }}>
                <span style={{
                  fontFamily: p.fontFamily, fontSize: "1rem", fontWeight: 700,
                  backgroundImage: p.headingGrad,
                  backgroundClip: "text", WebkitBackgroundClip: "text", color: "transparent", lineHeight: 1,
                }}>
                  {s.value}
                </span>
                <span style={{
                  fontFamily: p.mono, fontSize: "0.5rem",
                  letterSpacing: "0.14em", textTransform: "uppercase", color: p.sub,
                }}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div style={{
          height: 1.5, marginTop: 18, transformOrigin: "left center",
          background: `linear-gradient(90deg, ${p.lineColor} 0%, ${p.lineGlow} 60%, transparent 100%)`,
          animation: "slideX 1s cubic-bezier(0.22,1,0.36,1) 0.1s both",
        }} />
      </div>

      {/* ── Body — takes all remaining height, never overflows ── */}
      <div
        style={{
          position: "relative", zIndex: 10,
          flex: 1,
          minHeight: 0,           // critical: allows flex child to shrink below content size
          display: "flex",
          gap: 24,
          padding: "0 48px 32px",
          overflow: "hidden",
        }}
      >
        {/* Sidebar — full height, static */}
        <div style={{ flexShrink: 0, height: "100%", animation: "fadeUp 0.45s ease 0.1s both" }}>
          <Sidebar filter={filter} onFilter={handleFilter} p={p} />
        </div>

        {/* Skill list — scrollable */}
        <div
          className="skill-scroll"
          style={{
            "--scroll-thumb": p.scrollThumb,
            flex: 1,
            minWidth: 0,
            height: "100%",
            overflowY: "auto",
            overflowX: "hidden",
            paddingRight: 6,
            animation: "fadeUp 0.45s ease 0.16s both",
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              {grouped
                ? grouped.map(({ cat, skills }, gi) => (
                    <div key={cat} style={{ marginBottom: gi < grouped.length - 1 ? 32 : 0 }}>
                      <CategoryDivider
                        label={cat}
                        count={`${skills.length} skill${skills.length > 1 ? "s" : ""}`}
                        p={p}
                      />
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
                    </div>
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
              {/* Bottom breathing room */}
              <div style={{ height: 16 }} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}