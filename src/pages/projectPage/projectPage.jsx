"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/app/themeProvider";
import {
  Brain, Globe, Gamepad2, Shield, Mic, Heart,
  Trophy, Medal, Star, ExternalLink, Tag, Calendar,
  X, ChevronLeft, ChevronRight, LayoutGrid,
  Maximize2, Terminal, Leaf
} from "lucide-react";
import Image from "next/image";

// ── Project Data ───────────────────────────────────────────
const PROJECTS = [
  {
    id:       "coalitus",
    title:    "Coalitus Collective",
    period:   "Apr – May 2026",
    image:    "/images/projects/coalitus.png",
    gradient: "linear-gradient(135deg, #1a1060 0%, #2d1b6e 40%, #0d2060 100%)",
    accent:   "#7c5af5",
    Icon:     Brain,
    award:    null,
    category: "AI/ML",
    tags:     ["AI", "Machine Learning", "DistilBERT", "Well-being", "Hugging Face", "NLP"],
    desc:     "A multi-model AI platform for well-being, integrating four specialized ML models: Emotion Classifier, Topic Classifier, Cognitive Distortion Classifier, and Stress Triage — running in parallel to transform conversations into actionable insights. Each model is also deployed independently on Hugging Face. A dedicated website showcases the system with interactive access to all tools.",
    link:     "#",
  },
  {
    id:       "byteon",
    title:    "Byteon",
    period:   "Sep 2025 – Apr 2026",
    image:    "/images/projects/byteon.png",
    gradient: "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)",
    accent:   "#38bdf8",
    Icon:     Globe,
    award:    null,
    category: "Web",
    tags:     ["Web Dev", "Web Design", "Visual Novel", "Hackathon Platform"],
    desc:     "A tech-driven hackathon platform featuring visual novel gameplay and tips from veteran hackathon participants. Byteon brings together innovators, developers, and designers to create impactful digital solutions while fostering learning, teamwork, and real-world problem-solving.",
    link:     "#",
  },
  {
    id: "carbonated",
    title: "Carbonated",
    period: "2025",
    image: "/images/projects/carbonated.png",
    gradient: "linear-gradient(135deg, #0b1220 0%, #1f2937 50%, #000000 100%)",
    accent: "#22c55e",
    Icon: Leaf,
    award: { place: "Finalist", event: "Hack-Earth" },
    category: "Web + Browser Extension",
    tags: [
      "Sustainability",
      "Carbon Footprint",
      "Browser Extensions",
      "Data Visualization",
      "Next.js",
    ],
    desc:
      "An interactive retro-futuristic platform that visualizes the carbon footprint of digital activity through a vending machine interface. Includes three browser extensions—Carbonated Juice, Carbonated Pop, and Carbonated Coffee—alongside a live emissions dashboard and a global map covering 190+ countries. Built with Next.js, React, Tailwind CSS, and Chrome Manifest V3 to promote awareness of digital sustainability.",
    link: "https://carbonated.vercel.app",
  },
  {
    id:       "workable",
    title:    "Workable",
    period:   "Mar – Dec 2025",
    image:    "/images/projects/workable.png",
    gradient: "linear-gradient(135deg, #1a3a2a 0%, #0d4f2a 50%, #163d28 100%)",
    accent:   "#34d399",
    Icon:     Heart,
    award:    null,
    category: "Web",
    tags:     ["Full-Stack", "Accessibility", "Inclusive Design", "UX", "Career Tech"],
    desc:     "An inclusive job-matching web app for people with disabilities, built at the University of the Cordilleras. Uses surveys to recommend realistic, accessible career paths with non-discriminatory, accessibility-first UX design. Focused on bridging the gap between PWDs and meaningful employment opportunities.",
    link:     "#",
  },
  {
    id: "coders-guild-citcs",
    title: "Coder's Guild",
    period: "2025",
    image: "/images/projects/coders.png",
    gradient: "linear-gradient(135deg, #0a0a0a 0%, #111827 50%, #000000 100%)",
    accent: "#a855f7",
    Icon: Terminal,
    award: { place: "1st Place", event: "New Type Work Hacks" },
    category: "Web",
    tags: [
      "Cyberpunk",
      "UI/UX",
      "Interactive Website",
      "Chatbot",
      "Education",
      "Guild Platform",
    ],
    desc:
      "A cyberpunk-themed website inspired by CITCS Week and CITCS Night, designed to showcase the Coder's Guild mission, opportunities, and community spirit. Features include an interactive chatbot, membership page, knowledge tests, and engagement tools to support learning, collaboration, and career advancement. Built using HTML, CSS, and JavaScript with a strong focus on UI/UX, parallax effects, and dynamic visuals.",
    link: "https://yurei04.github.io",
  },
  {
    id: "opitulare",
    title: "Opitulare",
    period: "2025",
    image: "/images/projects/opitulare.png",
    gradient: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #020617 100%)",
    accent: "#38bdf8",
    Icon: Shield,
    award: { place: "1st Place", event: "Vox Astra Hackathon" },
    category: "Web",
    tags: [
      "Social Impact",
      "Awareness",
      "Safety Tools",
      "Next.js",
      "Discreet Systems",
    ],
    desc:
      "A discreet awareness and support platform designed to educate users about abuse worldwide while providing subtle tools for safe outreach. Features include informational blog content, global data visualization, and prototypes such as '1 Button, Thousand Lives' and 'Extend Help' for confidential assistance. Built with Next.js, React, Tailwind CSS, and MUI, focusing on accessibility, privacy-aware design, and impactful deployment.",
    link: "https://opitulare.vercel.app",
  },
  {
    id:       "hexencore",
    title:    "HexenCore",
    period:   "Sep – Oct 2025",
    image:    "/images/projects/hexencore.png",
    gradient: "linear-gradient(135deg, #1a0533 0%, #2e0854 50%, #120326 100%)",
    accent:   "#c084fc",
    Icon:     Star,
    award:    null,
    category: "AI/ML",
    tags:     ["AI", "Web Dev", "Creative", "Edu Hacks AI Fest 2025"],
    desc:     "An AI named Sumire living inside a digital world — inspired by Halo the game and Porter Robinson's Shelter. Users can interact with her through a deeply immersive, anime-influenced interface. Built for Edu Hacks AI Fest 2025, it explores the idea of AI as a companion inhabiting a constructed reality.",
    link:     "#",
  },
  {
    id:       "miru",
    title:    "Miru",
    period:   "Aug 2025",
    image:    "/images/projects/miru.png",
    gradient: "linear-gradient(135deg, #0c2340 0%, #1a3a5e 50%, #0a1d33 100%)",
    accent:   "#60a5fa",
    Icon:     Shield,
    award:    { place: "3rd Place", event: "NeuroHacks 2025" },
    category: "AI/ML",
    tags:     ["ML/AI", "Computer Vision", "Web Dev", "Health Tech", "Real-time"],
    desc:     "A real-time detector using ML/AI that identifies people, animals, or objects from camera input or uploaded images — designed to help people who experience hallucinations or difficulty distinguishing reality. Miru gives clear, real-time feedback to ground users in their environment. Won 3rd Place at NeuroHacks 2025.",
    link:     "#",
  },
  {
    id: "terrarium",
    title: "Terrarium",
    period: "2025",
    image: "/images/projects/terrarium.png",
    gradient: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0b1220 100%)",
    accent: "#22d3ee",
    Icon: Gamepad2,
    award: null,
    category: "Game",
    tags: [
      "Health & Well-being",
      "Interactive Learning",
      "Mini-Games",
      "Next.js",
      "Full-Stack",
    ],
    desc:
      "An interactive Neal.fun-inspired health and well-being platform featuring 10 mini-games and storytelling experiences. Includes Germ World, Myth or Medicine, Wellness Map, Build Your Balance, Your Body In Numbers, Health Time Machine, Chat Care, Life Line, Anti Germs, and Health Checklist. Built with Next.js, Tailwind CSS, Node.js, and modern UI libraries to create an engaging and educational experience focused on physical and mental wellness.",
    link: "https://terrarium-delta.vercel.app",
  },
  {
    id:       "taskete",
    title:    "Taskete",
    period:   "Dec 2024",
    image:    "/images/projects/taskete.png",
    gradient: "linear-gradient(135deg, #3d1a00 0%, #5c2800 50%, #2a1200 100%)",
    accent:   "#fb923c",
    Icon:     Mic,
    award:    { place: "3rd Place", event: "MiniMedi 2024" },
    category: "AI/ML",
    tags:     ["Front-End", "Healthcare", "Emergency Dispatch", "MediHacks"],
    desc:     "Inspired by the Handler One system from anime 86 — integrates dispatcher and responder functionalities for emergency medical contexts. The design focuses on EDC (Emergency Dispatch Conversation) and MCSM (Micro Credentialing System for Medicine). Won 3rd Place at MiniMedi 2024.",
    link:     "#",
  },
  {
    id: "sustainable-travel-guide",
    title: "Sustainable Travel Guide",
    period: "2024",
    image: "/images/projects/sustainable.png",
    gradient: "linear-gradient(135deg, #14532d 0%, #166534 50%, #052e16 100%)",
    accent: "#22c55e",
    Icon: Globe,
    award: {place: "website Award", event: "Mega Hackathon 2024"},
    category: "Web",
    tags: ["Sustainability", "Travel", "Eco-Friendly", "Interactive Maps", "Education"],
    desc:
      "A comprehensive eco-friendly travel platform designed to educate and empower travelers to make environmentally conscious decisions. Features guides on sustainable transportation, accommodations, and activities, along with interactive maps, traveler insights, and the latest trends in sustainable tourism. Built using HTML, CSS, and JavaScript to create a responsive and interactive experience.",
    link: "https://devpost.com/software/scholar-s-quest",
  },
  {
    id:       "soteria",
    title:    "Soteria",
    period:   "Jul 2024",
    image:    "/images/projects/soteria.png",
    gradient: "linear-gradient(135deg, #1a0000 0%, #3d0a0a 50%, #220000 100%)",
    accent:   "#f87171",
    Icon:     Shield,
    award:    null,
    category: "AI/ML",
    tags:     ["AI", "Python", "Cybersecurity", "YARA", "Tkinter", "Solo Build"],
    desc:     "An AI-powered chatbot that detects and analyzes malicious files in real time, going beyond traditional antivirus solutions. Built solo with Python, Tkinter, CustomTkinter, and YARA. Features file management, voice/text interaction, and security tips. Submitted to STEMist Hacks III.",
    link:     "#",
  },
  {
    id:       "vox",
    title:    "Vox Aequalis",
    period:   "Mar – May 2024",
    image:    "/images/projects/vox.png",
    gradient: "linear-gradient(135deg, #1a1a00 0%, #2e2d00 50%, #1e1c00 100%)",
    accent:   "#facc15",
    Icon:     Globe,
    award:    null,
    category: "Web",
    tags:     ["Full-Stack", "NLTK", "React", "Next.js", "Flask", "Ethical AI"],
    desc:     "A full-stack platform (Equal Voice) analyzing user input to highlight fair job opportunities, visualize bias data, and provide AI chatbot support. Implemented Python NLTK for intent classification with ML, React/Next.js and Flask. Built for GNEC Hackathon 2025 Spring.",
    link:     "#",
  },
  {
    id:       "elementia",
    title:    "Elementia",
    period:   "Jan – Mar 2024",
    image:    "/images/projects/elementia.jpeg",
    gradient: "linear-gradient(135deg, #001a33 0%, #002a52 50%, #001020 100%)",
    accent:   "#22d3ee",
    Icon:     Gamepad2,
    award:    null,
    category: "Game",
    tags:     ["Web Dev", "Game Design", "Turn-Based", "Strategy", "Genshin-Inspired"],
    desc:     "A debut turn-based strategy web game inspired by Genshin Impact. Players harness seven distinct elements with unique strengths and weaknesses, managing health and energy against AI opponents. Successful attacks earn energy for powerful skills and elemental burst combos.",
    link:     "#",
  },
  {
    id:       "outlast",
    title:    "Outlast",
    period:   "Jan 2024",
    image:    "/images/projects/outlast.png",
    gradient: "linear-gradient(135deg, #001a00 0%, #002e00 50%, #001200 100%)",
    accent:   "#4ade80",
    Icon:     Globe,
    award:    { place: "2nd Place", event: "SandCode 2024" },
    category: "Web",
    tags:     ["HTML", "CSS", "JavaScript", "Mapping", "P2P Comm"],
    desc:     "A survival scenario prototype built as a first-year student in my very first hackathon — earning 2nd Place Overall at SandCode 2024. Features a location-based mapping system to track danger zones and highlight safe areas, plus a peer-to-peer communication system for dispersed survivor groups.",
    link:     "#",
  },
];

const CATEGORIES = ["All", "AI/ML", "Web", "Game"];
const SIZES = [
  { id: "sm", label: "S", cols: "repeat(auto-fill, minmax(190px, 1fr))", imgH: 120, bodyPad: "10px 12px" },
  { id: "md", label: "M", cols: "repeat(auto-fill, minmax(270px, 1fr))", imgH: 164, bodyPad: "14px 14px" },
  { id: "lg", label: "L", cols: "repeat(auto-fill, minmax(370px, 1fr))", imgH: 210, bodyPad: "18px 18px" },
];
const STATS = [
  { value: "10", label: "Projects" },
  { value: "4",  label: "Awards"   },
  { value: "3+", label: "Years"    },
];

// ── Theme tokens ───────────────────────────────────────────
const T = {
  tech: {
    bgImage:          "/images/techImages/tech1background.png",
    bgGradient: `
      radial-gradient(ellipse 80% 60% at 10% 90%, rgba(17,51,153,0.55) 0%, transparent 60%),
      radial-gradient(ellipse 60% 50% at 90% 10%, rgba(10,35,110,0.45) 0%, transparent 55%),
      linear-gradient(135deg, rgba(2,4,14,0.88) 0%, rgba(5,9,26,0.84) 50%, rgba(3,7,16,0.9) 100%)`,
    showGrid:         true,
    gridColor:        "rgba(40,100,255,0.035)",
    lineColor:        "rgba(59,130,246,0.6)",
    lineGlow:         "rgba(59,130,246,0.18)",
    cardBg:           "rgba(8,18,55,0.82)",
    cardBorder:       "rgba(59,130,246,0.17)",
    cardHoverBorder:  "rgba(59,130,246,0.7)",
    headingGrad:      "linear-gradient(135deg, #e0ecff 0%, #6ea0ff 55%, #3b6fd4 100%)",
    sub:              "rgba(148,180,255,0.62)",
    title:            "#ffffff",
    desc:             "rgba(190,215,255,0.78)",
    badgeBg:          "rgba(59,130,246,0.14)",
    badgeBd:          "rgba(59,130,246,0.3)",
    badgeC:           "rgba(148,180,255,0.95)",
    awardBg:          "rgba(234,179,8,0.14)",
    awardBd:          "rgba(234,179,8,0.42)",
    awardC:           "rgba(250,204,21,1)",
    filterBg:         "rgba(59,130,246,0.08)",
    filterActiveBg:   "rgba(59,130,246,0.24)",
    filterBd:         "rgba(59,130,246,0.2)",
    filterActiveC:    "rgba(200,220,255,1)",
    filterC:          "rgba(148,180,255,0.48)",
    sectionLabel:     "Projects",
    fontFamily:       "var(--font-playfair)",
    mono:             "var(--font-dm-mono)",
    eyebrow:          "// projects.showcase",
    statBd:           "rgba(59,130,246,0.13)",
    overlayBg:        "rgba(0,5,25,0.92)",
    modalBg:          "rgba(5,12,40,0.98)",
    modalBd:          "rgba(59,130,246,0.24)",
    navBg:            "rgba(6,12,35,0.9)",
    navBd:            "rgba(59,130,246,0.2)",
    thumbActiveBd:    "rgba(59,130,246,0.95)",
    thumbBd:          "rgba(59,130,246,0.18)",
    sizeActiveBg:     "rgba(59,130,246,0.26)",
    sizeActiveC:      "rgba(200,220,255,1)",
    arrowBg:          "rgba(59,130,246,0.12)",
    arrowHBg:         "rgba(59,130,246,0.3)",
    iconC:            "rgba(148,180,255,0.88)",
    imgOverlay:       "linear-gradient(to top, rgba(5,10,35,0.97) 0%, rgba(5,10,35,0.65) 38%, transparent 100%)",
  },
  "fantasy-morning": {
    bgImage:          "/images/fantasyImages/morning/bkg1Morning.png",
    bgGradient: `
      radial-gradient(ellipse 90% 50% at 95% 5%, rgba(255,230,120,0.25) 0%, transparent 55%),
      radial-gradient(ellipse 70% 60% at 10% 80%, rgba(80,160,90,0.18) 0%, transparent 60%),
      linear-gradient(170deg, rgba(240,255,240,0.55) 0%, rgba(200,240,210,0.5) 50%, rgba(140,200,150,0.6) 100%)`,
    showGrid:         false,
    gridColor:        "transparent",
    lineColor:        "rgba(40,130,50,0.65)",
    lineGlow:         "rgba(40,130,50,0.14)",
    cardBg:           "rgba(240,255,242,0.88)",
    cardBorder:       "rgba(40,130,50,0.19)",
    cardHoverBorder:  "rgba(40,130,50,0.7)",
    headingGrad:      "linear-gradient(135deg, #0d3318 0%, #1e6b30 55%, #3da856 100%)",
    sub:              "rgba(20,80,30,0.68)",
    title:            "rgba(8,40,15,1)",
    desc:             "rgba(30,70,40,0.82)",
    badgeBg:          "rgba(40,130,50,0.09)",
    badgeBd:          "rgba(40,130,50,0.26)",
    badgeC:           "rgba(15,70,25,0.9)",
    awardBg:          "rgba(180,120,0,0.11)",
    awardBd:          "rgba(180,120,0,0.38)",
    awardC:           "rgba(110,65,0,1)",
    filterBg:         "rgba(40,130,50,0.07)",
    filterActiveBg:   "rgba(40,130,50,0.2)",
    filterBd:         "rgba(40,130,50,0.2)",
    filterActiveC:    "rgba(8,50,18,1)",
    filterC:          "rgba(20,80,30,0.46)",
    sectionLabel:     "The Codex",
    fontFamily:       "var(--font-cinzel)",
    mono:             "var(--font-dm-mono)",
    eyebrow:          "✦ Works & Wonders ✦",
    statBd:           "rgba(40,130,50,0.15)",
    overlayBg:        "rgba(5,20,8,0.9)",
    modalBg:          "rgba(10,35,15,0.98)",
    modalBd:          "rgba(40,130,50,0.24)",
    navBg:            "rgba(235,255,238,0.93)",
    navBd:            "rgba(40,130,50,0.2)",
    thumbActiveBd:    "rgba(40,130,50,0.95)",
    thumbBd:          "rgba(40,130,50,0.18)",
    sizeActiveBg:     "rgba(40,130,50,0.2)",
    sizeActiveC:      "rgba(8,40,15,1)",
    arrowBg:          "rgba(40,130,50,0.1)",
    arrowHBg:         "rgba(40,130,50,0.26)",
    iconC:            "rgba(20,100,35,0.88)",
    imgOverlay:       "linear-gradient(to top, rgba(8,35,12,0.97) 0%, rgba(8,35,12,0.65) 38%, transparent 100%)",
  },
  "fantasy-night": {
    bgImage:          "/images/fantasyImages/night/bkg1Night.png",
    bgGradient: `
      radial-gradient(ellipse 70% 50% at 80% 10%, rgba(30,60,130,0.5) 0%, transparent 55%),
      radial-gradient(ellipse 80% 60% at 10% 80%, rgba(10,25,70,0.4) 0%, transparent 60%),
      linear-gradient(170deg, rgba(6,14,28,0.65) 0%, rgba(10,22,55,0.6) 60%, rgba(4,8,20,0.72) 100%)`,
    showGrid:         false,
    gridColor:        "transparent",
    lineColor:        "rgba(100,160,240,0.58)",
    lineGlow:         "rgba(100,160,240,0.15)",
    cardBg:           "rgba(8,18,55,0.82)",
    cardBorder:       "rgba(100,160,240,0.17)",
    cardHoverBorder:  "rgba(139,196,248,0.7)",
    headingGrad:      "linear-gradient(135deg, #dff0ff 0%, #8bc4f8 55%, #4a8fd4 100%)",
    sub:              "rgba(139,196,248,0.62)",
    title:            "#ffffff",
    desc:             "rgba(170,215,255,0.75)",
    badgeBg:          "rgba(100,160,240,0.11)",
    badgeBd:          "rgba(100,160,240,0.26)",
    badgeC:           "rgba(139,196,248,0.95)",
    awardBg:          "rgba(234,179,8,0.13)",
    awardBd:          "rgba(234,179,8,0.4)",
    awardC:           "rgba(250,204,21,1)",
    filterBg:         "rgba(100,160,240,0.07)",
    filterActiveBg:   "rgba(100,160,240,0.21)",
    filterBd:         "rgba(100,160,240,0.2)",
    filterActiveC:    "rgba(220,240,255,1)",
    filterC:          "rgba(139,196,248,0.46)",
    sectionLabel:     "Artefacts",
    fontFamily:       "var(--font-cinzel)",
    mono:             "var(--font-dm-mono)",
    eyebrow:          "✦ Relics & Realms ✦",
    statBd:           "rgba(100,160,240,0.13)",
    overlayBg:        "rgba(2,6,20,0.92)",
    modalBg:          "rgba(4,10,32,0.98)",
    modalBd:          "rgba(100,160,240,0.22)",
    navBg:            "rgba(5,12,38,0.92)",
    navBd:            "rgba(100,160,240,0.2)",
    thumbActiveBd:    "rgba(139,196,248,0.95)",
    thumbBd:          "rgba(100,160,240,0.18)",
    sizeActiveBg:     "rgba(100,160,240,0.21)",
    sizeActiveC:      "rgba(220,240,255,1)",
    arrowBg:          "rgba(100,160,240,0.11)",
    arrowHBg:         "rgba(100,160,240,0.28)",
    iconC:            "rgba(139,196,248,0.88)",
    imgOverlay:       "linear-gradient(to top, rgba(3,8,28,0.97) 0%, rgba(3,8,28,0.65) 38%, transparent 100%)",
  },
};

// ── Award icon ─────────────────────────────────────────────
function AwardBadge({ award, p }) {
  const AIcon = award.place === "1st Place" ? Trophy : award.place === "2nd Place" ? Medal : Star;
  return (
    <div style={{
      position:       "absolute",
      top:            12,
      right:          12,
      display:        "flex",
      alignItems:     "center",
      gap:            4,
      background:     p.awardBg,
      border:         `1px solid ${p.awardBd}`,
      borderRadius:   999,
      padding:        "3px 8px 3px 6px",
      backdropFilter: "blur(10px)",
    }}>
      <AIcon size={9} color={p.awardC} />
      <span style={{ fontFamily: p.mono, fontSize: "0.43rem", letterSpacing: "0.1em", color: p.awardC, fontWeight: 700 }}>
        {award.place}
      </span>
    </div>
  );
}

// ── Grid Card ──────────────────────────────────────────────
function ProjectCard({ project, p, delay, onSelect, isSelected, sz }) {
  const { Icon } = project;
  const isSmall = sz.id === "sm";

  return (
    <motion.div
      layoutId={`card-${project.id}`}
      onClick={() => !isSelected && onSelect(project.id)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isSelected ? 0 : 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{
        layout:  { type: "spring", stiffness: 340, damping: 38 },
        opacity: { duration: 0.15 },
        y:       { duration: 0.42, delay, ease: [0.22, 1, 0.36, 1] },
      }}
      whileHover={isSelected ? {} : { y: -6, borderColor: p.cardHoverBorder }}
      whileTap={isSelected ? {} : { scale: 0.975 }}
      style={{
        border:              `1.5px solid ${p.cardBorder}`,
        borderRadius:        16,
        overflow:            "hidden",
        background:          p.cardBg,
        backdropFilter:      "blur(22px)",
        WebkitBackdropFilter:"blur(22px)",
        cursor:              isSelected ? "default" : "pointer",
        display:             "flex",
        flexDirection:       "column",
        pointerEvents:       isSelected ? "none" : "auto",
        boxShadow:           "0 4px 24px rgba(0,0,0,0.22)",
      }}
    >
      {/* Thumbnail */}
      <div style={{ position: "relative", height: sz.imgH, flexShrink: 0, overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: project.gradient, transition: "transform 0.4s", }} />
        {project.image && (
          <Image
            src={project.image}
            alt={project.title}
            width={100}
            height={100}
            onError={(e) => { e.target.style.display = "none"; }}
            style={{
              position: "absolute", inset: 0,
              width: "100%", height: "100%",
              objectFit: "cover", opacity: 0.72,
              mixBlendMode: "luminosity",
            }}
          />
        )}
        <div style={{ position: "absolute", inset: 0, background: p.imgOverlay }} />
        {/* Glow orb */}
        <div style={{
          position: "absolute", top: -28, right: -28,
          width: 80, height: 80, borderRadius: "50%",
          background: project.accent, opacity: 0.2, filter: "blur(24px)",
        }} />
        {/* Category pill */}
        <div style={{ position: "absolute", top: 11, left: 11, display: "flex", alignItems: "center", gap: 5 }}>
          <div style={{
            width: 26, height: 26, borderRadius: 7,
            background: "rgba(0,0,0,0.44)",
            border: `1px solid ${project.accent}55`,
            display: "flex", alignItems: "center", justifyContent: "center",
            backdropFilter: "blur(8px)",
          }}>
            <Icon size={12} color={project.accent} strokeWidth={1.8} />
          </div>
          {!isSmall && (
            <span style={{
              fontFamily: p.mono, fontSize: "0.46rem",
              letterSpacing: "0.17em", textTransform: "uppercase",
              color: "rgba(255,255,255,0.7)",
              background: "rgba(0,0,0,0.38)",
              padding: "2px 7px", borderRadius: 999,
              backdropFilter: "blur(8px)",
            }}>
              {project.category}
            </span>
          )}
        </div>
        {project.award && <AwardBadge award={project.award} p={p} />}
        {!isSmall && (
          <div style={{ position: "absolute", bottom: 11, left: 11, display: "flex", alignItems: "center", gap: 5 }}>
            <Calendar size={8} color="rgba(255,255,255,0.5)" />
            <span style={{
              fontFamily: p.mono, fontSize: "0.43rem",
              letterSpacing: "0.12em", textTransform: "uppercase",
              color: "rgba(255,255,255,0.5)",
            }}>
              {project.period}
            </span>
          </div>
        )}
        <div style={{ position: "absolute", bottom: 9, right: 9, opacity: 0.35 }}>
          <Maximize2 size={10} color="rgba(255,255,255,0.9)" />
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: sz.bodyPad, display: "flex", flexDirection: "column", flex: 1 }}>
        <h3 style={{
          fontFamily: p.fontFamily,
          fontSize: isSmall ? "0.75rem" : sz.id === "lg" ? "clamp(0.95rem,1.2vw,1.08rem)" : "clamp(0.85rem,1.05vw,0.98rem)",
          fontWeight: 700, lineHeight: 1.2, color: p.title,
          marginBottom: 6, letterSpacing: "-0.01em",
        }}>
          {project.title}
        </h3>
        <div style={{ height: 1, marginBottom: isSmall ? 6 : 9, background: `linear-gradient(90deg, ${project.accent}55, transparent)` }} />
        {sz.id !== "sm" && (
          <p style={{
            fontFamily: p.mono, fontSize: sz.id === "lg" ? "0.63rem" : "0.59rem",
            lineHeight: 1.74, color: p.desc,
            marginBottom: 10,
            display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
          }}>
            {project.desc}
          </p>
        )}
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          {project.tags.slice(0, isSmall ? 2 : sz.id === "lg" ? 4 : 3).map((tag) => (
            <span key={tag} style={{
              fontFamily: p.mono, fontSize: "0.42rem",
              letterSpacing: "0.08em", textTransform: "uppercase",
              padding: "2px 6px", borderRadius: 999,
              background: p.badgeBg, border: `1px solid ${p.badgeBd}`, color: p.badgeC,
            }}>
              {tag}
            </span>
          ))}
          {project.tags.length > (isSmall ? 2 : sz.id === "lg" ? 4 : 3) && (
            <span style={{ fontFamily: p.mono, fontSize: "0.42rem", color: p.sub, opacity: 0.6, alignSelf: "center" }}>
              +{project.tags.length - (isSmall ? 2 : sz.id === "lg" ? 4 : 3)}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ── Expanded Modal ─────────────────────────────────────────
function ProjectModal({ project, p, filtered, onClose, onNavigateTo }) {
  const stripRef = useRef(null);
  const { Icon } = project;
  const currentIdx = filtered.findIndex((pr) => pr.id === project.id);
  const prev = filtered[(currentIdx - 1 + filtered.length) % filtered.length];
  const next = filtered[(currentIdx + 1) % filtered.length];

  // Keyboard nav
  useEffect(() => {
    const fn = (e) => {
      if (e.key === "Escape")      onClose();
      if (e.key === "ArrowRight")  onNavigateTo(filtered[(currentIdx + 1) % filtered.length].id);
      if (e.key === "ArrowLeft")   onNavigateTo(filtered[(currentIdx - 1 + filtered.length) % filtered.length].id);
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [currentIdx, filtered, onClose, onNavigateTo]);

  // Auto-scroll active thumb into view
  useEffect(() => {
    if (!stripRef.current) return;
    const el = stripRef.current.querySelector("[data-active='true']");
    if (el) el.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [project.id]);

  const AwardIcon2 = project.award
    ? (project.award.place === "1st Place" ? Trophy : project.award.place === "2nd Place" ? Medal : Star)
    : null;

  return (
    <>
      {/* ── Backdrop ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        style={{
          position: "fixed", inset: 0, zIndex: 900,
          background: "rgba(0,0,0,0.87)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      />

      {/* ── Modal layer: flex row = [arrow] [card] [arrow] ── */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 910,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // bottom padding reserves space for the thumbnail strip
        paddingBottom: 90,
        paddingLeft: 16,
        paddingRight: 16,
        pointerEvents: "none",
      }}>
        {/* ── Left arrow ── */}
        <motion.button
          onClick={() => onNavigateTo(prev.id)}
          whileHover={{ scale: 1.14, background: p.arrowHBg }}
          whileTap={{ scale: 0.9 }}
          title={prev.title}
          style={{
            flexShrink: 0,
            width: 46, height: 46, borderRadius: "50%",
            background: p.arrowBg, border: `1.5px solid ${p.modalBd}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", color: p.iconC, outline: "none",
            backdropFilter: "blur(12px)",
            pointerEvents: "auto",
            marginRight: 16,
          }}
        >
          <ChevronLeft size={18} />
        </motion.button>

        {/* ── Expanded card (shares layoutId with grid card) ── */}
        <motion.div
          layoutId={`card-${project.id}`}
          transition={{ type: "spring", stiffness: 290, damping: 36 }}
          style={{
            width:        "min(940px, 100%)",
            height:       "min(580px, 80vh)",
            borderRadius: 22,
            overflow:     "hidden",
            border:       `1.5px solid ${p.modalBd}`,
            background:   p.modalBg,
            boxShadow:    `0 32px 90px rgba(0,0,0,0.65), 0 0 0 1px ${p.modalBd}`,
            display:      "flex",
            flexDirection:"row",
            pointerEvents:"auto",
            flexShrink: 0,
          }}
        >
          {/* LEFT – image pane */}
          <div style={{ width: "42%", flexShrink: 0, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, background: project.gradient }} />
            {project.image && (
              <Image
                src={project.image}
                alt={project.title}
                onError={(e) => { e.target.style.display = "none"; }}
                width={100}
                height={100}
                style={{
                  position: "absolute", inset: 0,
                  width: "100%", height: "100%",
                  objectFit: "cover", opacity: 0.7,
                  mixBlendMode: "luminosity",
                }}
              />
            )}
            <div style={{
              position: "absolute", inset: 0,
              background: `linear-gradient(145deg, ${project.accent}1a 0%, transparent 50%, rgba(0,0,0,0.28) 100%)`,
            }} />
            {/* Glow */}
            <div style={{
              position: "absolute", top: -60, right: -60,
              width: 220, height: 220, borderRadius: "50%",
              background: project.accent, opacity: 0.22, filter: "blur(60px)",
            }} />
            {/* Category */}
            <div style={{ position: "absolute", top: 20, left: 20, display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: "rgba(0,0,0,0.44)", border: `1.5px solid ${project.accent}66`,
                display: "flex", alignItems: "center", justifyContent: "center",
                backdropFilter: "blur(10px)",
              }}>
                <Icon size={17} color={project.accent} strokeWidth={1.8} />
              </div>
              <span style={{
                fontFamily: p.mono, fontSize: "0.52rem",
                letterSpacing: "0.2em", textTransform: "uppercase",
                color: "rgba(255,255,255,0.74)",
                background: "rgba(0,0,0,0.4)", padding: "3px 10px",
                borderRadius: 999, backdropFilter: "blur(8px)",
              }}>
                {project.category}
              </span>
            </div>
            {/* Award panel */}
            {project.award && (
              <div style={{ position: "absolute", bottom: 20, left: 20 }}>
                <div style={{
                  display: "flex", alignItems: "center", gap: 7,
                  background: p.awardBg, border: `1.5px solid ${p.awardBd}`,
                  borderRadius: 10, padding: "8px 14px",
                  backdropFilter: "blur(12px)",
                }}>
                  <AwardIcon2 size={14} color={p.awardC} />
                  <div>
                    <div style={{ fontFamily: p.mono, fontSize: "0.6rem", color: p.awardC, fontWeight: 700 }}>
                      {project.award.place}
                    </div>
                    <div style={{ fontFamily: p.mono, fontSize: "0.48rem", color: p.awardC, opacity: 0.72 }}>
                      {project.award.event}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT – content pane */}
          <div style={{ flex: 1, padding: "26px 28px 24px", display: "flex", flexDirection: "column", overflowY: "auto" }}>
            {/* Close */}
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.12, background: p.arrowHBg }}
                whileTap={{ scale: 0.92 }}
                style={{
                  width: 32, height: 32, borderRadius: "50%",
                  background: p.arrowBg, border: `1px solid ${p.modalBd}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", color: p.iconC, outline: "none",
                }}
              >
                <X size={14} />
              </motion.button>
            </div>
            {/* Period */}
            <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 10 }}>
              <Calendar size={10} color={p.sub} />
              <span style={{ fontFamily: p.mono, fontSize: "0.5rem", letterSpacing: "0.16em", textTransform: "uppercase", color: p.sub }}>
                {project.period}
              </span>
            </div>
            {/* Title */}
            <h2 style={{
              fontFamily: p.fontFamily,
              fontSize: "clamp(1.4rem, 2.2vw, 1.85rem)",
              fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.02em",
              backgroundImage: p.headingGrad,
              backgroundClip: "text", WebkitBackgroundClip: "text",
              color: "transparent", marginBottom: 12,
            }}>
              {project.title}
            </h2>
            <div style={{ height: 1.5, marginBottom: 16, background: `linear-gradient(90deg, ${project.accent}77, transparent)` }} />
            {/* Desc */}
            <p style={{
              fontFamily: p.mono, fontSize: "0.64rem",
              lineHeight: 1.84, color: p.desc,
              marginBottom: 20, flex: 1,
            }}>
              {project.desc}
            </p>
            {/* Tags */}
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 22, alignItems: "center" }}>
              <Tag size={10} color={p.sub} style={{ flexShrink: 0 }} />
              {project.tags.map((tag) => (
                <span key={tag} style={{
                  fontFamily: p.mono, fontSize: "0.46rem", letterSpacing: "0.1em",
                  textTransform: "uppercase", padding: "3px 8px", borderRadius: 999,
                  background: p.badgeBg, border: `1px solid ${p.badgeBd}`, color: p.badgeC,
                }}>
                  {tag}
                </span>
              ))}
            </div>
            {/* Link */}
            {project.link && project.link !== "#" && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 7,
                  fontFamily: p.mono, fontSize: "0.56rem",
                  letterSpacing: "0.18em", textTransform: "uppercase",
                  color: project.accent, textDecoration: "none",
                  padding: "8px 18px", borderRadius: 9,
                  background: `${project.accent}18`,
                  border: `1px solid ${project.accent}44`,
                  alignSelf: "flex-start",
                }}
              >
                View Project <ExternalLink size={11} />
              </a>
            )}
          </div>
        </motion.div>

        {/* ── Right arrow ── */}
        <motion.button
          onClick={() => onNavigateTo(next.id)}
          whileHover={{ scale: 1.14, background: p.arrowHBg }}
          whileTap={{ scale: 0.9 }}
          title={next.title}
          style={{
            flexShrink: 0,
            width: 46, height: 46, borderRadius: "50%",
            background: p.arrowBg, border: `1.5px solid ${p.modalBd}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", color: p.iconC, outline: "none",
            backdropFilter: "blur(12px)",
            pointerEvents: "auto",
            marginLeft: 16,
          }}
        >
          <ChevronRight size={18} />
        </motion.button>
      </div>

      {/* ── Project strip navbar (bottom of screen) ── */}
      <motion.div
        initial={{ y: 70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 70, opacity: 0 }}
        transition={{ type: "spring", stiffness: 310, damping: 33, delay: 0.06 }}
        style={{
          position: "fixed", bottom: 0, left: 0, right: 0,
          zIndex: 920,
          display: "flex", justifyContent: "center",
          padding: "0 32px 18px",
          pointerEvents: "none",
        }}
      >
        <div
          ref={stripRef}
          style={{
            background: p.navBg,
            border: `1.5px solid ${p.navBd}`,
            borderRadius: 18,
            padding: "10px 14px",
            backdropFilter: "blur(26px)",
            WebkitBackdropFilter: "blur(26px)",
            display: "flex",
            alignItems: "center",
            gap: 7,
            maxWidth: "min(860px, 90vw)",
            overflowX: "auto",
            scrollbarWidth: "none",
            pointerEvents: "auto",
            boxShadow: "0 8px 36px rgba(0,0,0,0.35)",
          }}
        >
          {filtered.map((pr) => {
            const isActive = pr.id === project.id;
            const { Icon: ThIcon } = pr;
            return (
              <motion.button
                key={pr.id}
                data-active={isActive}
                onClick={() => onNavigateTo(pr.id)}
                whileHover={{ scale: 1.07 }}
                whileTap={{ scale: 0.93 }}
                title={pr.title}
                animate={{ width: isActive ? 115 : 44 }}
                transition={{ type: "spring", stiffness: 320, damping: 32 }}
                style={{
                  flexShrink: 0,
                  height: 44,
                  borderRadius: 10,
                  overflow: "hidden",
                  border: `2px solid ${isActive ? p.thumbActiveBd : p.thumbBd}`,
                  cursor: "pointer",
                  position: "relative",
                  outline: "none",
                  boxShadow: isActive ? `0 0 16px ${p.lineGlow}` : "none",
                }}
              >
                <div style={{ position: "absolute", inset: 0, background: pr.gradient }} />
                <div style={{
                  position: "absolute", inset: 0,
                  display: "flex", alignItems: "center", gap: 6,
                  padding: "0 10px",
                }}>
                  <ThIcon size={12} color={pr.accent} strokeWidth={1.8} style={{ flexShrink: 0 }} />
                  {isActive && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      style={{
                        fontFamily: p.mono, fontSize: "0.45rem",
                        letterSpacing: "0.05em",
                        color: "rgba(255,255,255,0.88)",
                        whiteSpace: "nowrap",
                        overflow: "hidden", textOverflow: "ellipsis",
                      }}
                    >
                      {pr.title}
                    </motion.span>
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    </>
  );
}

// ── Main Page ──────────────────────────────────────────────
export default function ProjectsPage() {
  const { theme }  = useTheme();
  const p          = T[theme] ?? T.tech;
  const [filter,   setFilter]   = useState("All");
  const [selected, setSelected] = useState(null);
  const [sizeId,   setSizeId]   = useState("md");

  const filtered = filter === "All" ? PROJECTS : PROJECTS.filter((pr) => pr.category === filter);
  const sz       = SIZES.find((s) => s.id === sizeId) ?? SIZES[1];
  const selProj  = PROJECTS.find((pr) => pr.id === selected) ?? null;

  // If active filter hides the selected project, close modal
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (selected && !filtered.find((pr) => pr.id === selected)) setSelected(null);
  }, [filter, filtered, selected]);

  return (
    <div className="w-full relative overflow-hidden" style={{ fontFamily: p.fontFamily, minHeight: "100vh", paddingBottom: 40 }}>
      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(20px) } to { opacity:1; transform:translateY(0) } }
        @keyframes slideX { from { transform:scaleX(0) } to { transform:scaleX(1) } }
        *::-webkit-scrollbar { display:none; }
      `}</style>

      {/* Backgrounds */}
      {p.bgImage && <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${p.bgImage}')` }} />}
      <div className="absolute inset-0" style={{ background: p.bgGradient, transition: "background 0.7s" }} />
      {p.showGrid && (
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: `linear-gradient(${p.gridColor} 1px, transparent 1px), linear-gradient(90deg, ${p.gridColor} 1px, transparent 1px)`,
          backgroundSize: "55px 55px",
        }} />
      )}

      <div className="relative z-10" style={{ padding: "80px 48px 40px" }}>

        {/* Header */}
        <div style={{ marginBottom: 50, animation: "fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) both" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 20 }}>
            <div>
              <p style={{ fontFamily: p.mono, fontSize: "0.65rem", letterSpacing: "0.34em", textTransform: "uppercase", color: p.sub, marginBottom: 10 }}>
                {p.eyebrow}
              </p>
              <h1 style={{
                fontFamily: p.fontFamily, fontSize: "clamp(2.2rem, 4vw, 3.4rem)",
                fontWeight: 700, lineHeight: 0.92, letterSpacing: "-0.02em",
                backgroundImage: p.headingGrad,
                backgroundClip: "text", WebkitBackgroundClip: "text", color: "transparent",
              }}>
                {p.sectionLabel}
              </h1>
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {STATS.map((s) => (
                <div key={s.label} style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "8px 16px", borderRadius: 999,
                  background: "rgba(255,255,255,0.04)",
                  border: `1px solid ${p.statBd}`,
                  backdropFilter: "blur(12px)",
                }}>
                  <span style={{
                    fontFamily: p.fontFamily, fontSize: "1.2rem", fontWeight: 700,
                    backgroundImage: p.headingGrad,
                    backgroundClip: "text", WebkitBackgroundClip: "text", color: "transparent", lineHeight: 1,
                  }}>
                    {s.value}
                  </span>
                  <span style={{ fontFamily: p.mono, fontSize: "0.56rem", letterSpacing: "0.14em", textTransform: "uppercase", color: p.sub }}>
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div style={{
            height: 1.5, marginTop: 24, transformOrigin: "left center",
            background: `linear-gradient(90deg, ${p.lineColor} 0%, ${p.lineGlow} 65%, transparent 100%)`,
            animation: "slideX 1.1s cubic-bezier(0.22,1,0.36,1) 0.15s both",
          }} />
        </div>

        {/* ── Filter tabs + Size controls (inline, same row) ── */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          marginBottom: 34,
          flexWrap: "wrap",
          animation: "fadeUp 0.5s ease 0.18s both",
        }}>
          {/* Category filters */}
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {CATEGORIES.map((cat) => {
              const isA = filter === cat;
              return (
                <motion.button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    fontFamily: p.mono, fontSize: "0.53rem", letterSpacing: "0.2em",
                    textTransform: "uppercase", padding: "6px 16px", borderRadius: 999,
                    border: `1px solid ${isA ? p.cardHoverBorder : p.filterBd}`,
                    background: isA ? p.filterActiveBg : p.filterBg,
                    color: isA ? p.filterActiveC : p.filterC,
                    cursor: "pointer", backdropFilter: "blur(12px)", outline: "none",
                    transition: "background 0.18s, color 0.18s, border-color 0.18s",
                  }}
                >
                  {cat}
                  <span style={{ marginLeft: 6, opacity: 0.5 }}>
                    {cat === "All" ? PROJECTS.length : PROJECTS.filter((pr) => pr.category === cat).length}
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* Card size controls — inline, right side */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            background: p.navBg,
            border: `1.5px solid ${p.navBd}`,
            borderRadius: 999,
            padding: "5px 8px",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            boxShadow: "0 4px 16px rgba(0,0,0,0.22)",
          }}>
            <LayoutGrid size={12} color={p.sub} style={{ marginRight: 3, opacity: 0.65 }} />
            <span style={{
              fontFamily: p.mono, fontSize: "0.46rem", letterSpacing: "0.18em",
              textTransform: "uppercase", color: p.sub, marginRight: 4, opacity: 0.65,
              whiteSpace: "nowrap",
            }}>
              Size
            </span>
            {SIZES.map((s) => {
              const isA = sizeId === s.id;
              return (
                <motion.button
                  key={s.id}
                  onClick={() => setSizeId(s.id)}
                  whileHover={{ scale: 1.12 }}
                  whileTap={{ scale: 0.88 }}
                  style={{
                    width: 30, height: 30, borderRadius: 999,
                    border: `1px solid ${isA ? p.cardHoverBorder : p.navBd}`,
                    background: isA ? p.sizeActiveBg : "transparent",
                    color: isA ? p.sizeActiveC : p.filterC,
                    fontFamily: p.mono, fontSize: "0.58rem", fontWeight: 700,
                    cursor: "pointer", outline: "none",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "all 0.18s", letterSpacing: "0.04em",
                  }}
                >
                  {s.label}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Grid */}
        <motion.div layout style={{ display: "grid", gridTemplateColumns: sz.cols, gap: 16 }}>
          <AnimatePresence>
            {filtered.map((proj, i) => (
              <ProjectCard
                key={proj.id}
                project={proj}
                p={p}
                delay={0.04 * i}
                onSelect={setSelected}
                isSelected={selected === proj.id}
                sz={sz}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "80px 0", color: p.sub, fontFamily: p.mono, fontSize: "0.7rem", letterSpacing: "0.22em", textTransform: "uppercase" }}>
            No projects found.
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selProj && (
          <ProjectModal
            key={selProj.id}
            project={selProj}
            p={p}
            filtered={filtered}
            onClose={() => setSelected(null)}
            onNavigateTo={setSelected}
          />
        )}
      </AnimatePresence>
    </div>
  );
}