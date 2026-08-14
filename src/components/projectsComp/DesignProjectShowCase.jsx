"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, ChevronDown, ChevronRight, ChevronLeft, X, Calendar, Zap, Menu } from "lucide-react";
import Image from "next/image";

// ── Design Projects Data ───────────────────────────────────
const DESIGN_PROJECTS = [
  {
    id: "hu-media-1",
    title: "Hack United Media",
    subtitle: "Multimedia Design & Social Content",
    period: "Jul 2025 – Jul 2026",
    accent: "#8b5cf6",
    description: "Creating multimedia content and social media visuals that drive engagement and communicate the Hack United brand across all platforms.",
    tags: ["Multimedia", "Social Media", "Creative Design", "Branding"],
    bgImage: "/images/projects/hu-bg.jpg",
    media: [
      { type: "image", src: "/images/designProjects/HUPROFPOSTER copy.png", title: "Social Post 1" },
      { type: "image", src: "/images/designProjects/HUUHV6CAROUSEL.png", title: "Social Post 2" },
      { type: "video", src: "/images/designProjects/10271.mp4", title: "Promo Video" },
      { type: "video", src: "/images/designProjects/HUwrapped_1080x1920.mp4", title: "Promo Video" },
      { type: "video", src: "/images/designProjects/PROMO VID 2_1080x1920.mp4", title: "Promo Video" },
      { type: "video", src: "/images/designProjects/V6 normal vid_1080x1920.mp4", title: "Promo Video" }
    ],
    skills: ["Adobe Creative Suite", "Social Media Strategy", "Visual Branding", "Content Creation"],
  },
  {
    id: "max-intern-1",
    title: "Maximally.in Design",
    subtitle: "Visual Designer",
    period: "Aug – Sep 2025",
    accent: "#8b5cf6",
    description: "Designed posters, carousels, hackathon logos, headers, and backgrounds for India's boldest youth AI hackathon with a focus on bold visuals and modern aesthetics.",
    tags: ["Graphic Design", "Branding", "Logo Design", "Visual Identity"],
    bgImage: "/images/projects/max-bg.jpg",
    media: [
      { type: "image", src: "/images/designProjects/POSTERMXLYGRAND.png", title: "Poster" },
      { type: "image", src: "/images/designProjects/MXPOSTER.png", title: "Poster" },
      { type: "image", src: "/images/designProjects/POSTERMXLY10HACK.png", title: "Poster" },
      { type: "image", src: "/images/designProjects/header bkg w Title.png", title: "Hackathon Header" },
      { type: "image", src: "/images/designProjects/headerbkgwtitle.png", title: "Hackathon Header" },
    ],
    skills: ["Logo Design", "Poster Design", "Brand Identity", "Digital Illustration"],
  },
  {
    id: "freelance-1",
    title: "AI-Generated Media Assets & UGC",
    subtitle: "Multi-Platform Generative AI Creation",
    period: "July 2025 - Present",
    accent: "#8b5cf6",
    description: "Comprehensive generative AI media production portfolio featuring diverse creative assets. Produced 40+ professional-grade images and multiple video assets spanning anime illustration, fantasy worldbuilding, medieval game art, pixel art, and product advertising.",
    tags: [
      "Generative AI",
      "Video Generation",
      "Image Generation",
      "UGC Content",
      "Fantasy Art",
      "Anime Illustration",
      "Product Marketing",
      "RPG Assets"
    ],
    bgImage: "/images/projects/ai-media-bg.jpg",
    media: [
      {
        type: "video",
        src: "/images/designProjects/video (1).mp4",
        title: "Lipstick Product - Vertical UGC Advertisement (9:16)",
        category: "Product Marketing"
      },
      {
        type: "video",
        src: "/images/designProjects/video (2).mp4",
        title: "Lipstick Product - Vertical UGC Advertisement (9:16)",
        category: "Product Marketing"
      },
      {
        type: "video",
        src: "/images/designProjects/video (3).mp4",
        title: "Woman Knight Cinematic",
        category: "Fantasy Video"
      },
      {
        type: "video",
        src: "/images/designProjects/video (4).mp4",
        title: "Epic Dramatic Close-up Scene",
        category: "Cinematic"
      },

      { type: "image", src: "/images/designProjects/image (1).png", title: "Fantasy-Styled Mechanical Construct", category: "Fantasy Art" },
      { type: "image", src: "/images/designProjects/image (2).png", title: "Highly Detailed Fantasy Ring", category: "Fantasy Props" },
      { type: "image", src: "/images/designProjects/image (3).png", title: "Medieval Fantasy Dialog Box UI", category: "Game UI" },
      { type: "image", src: "/images/designProjects/image (4).png", title: "Shadowy Desolate Landscape", category: "Fantasy Art" },
      { type: "image", src: "/images/designProjects/image (5).png", title: "Large Fantasy Tree", category: "Fantasy Art" },
      { type: "image", src: "/images/designProjects/image (6).png", title: "Medieval Fantasy Stone Wall - Variant 1", category: "Fantasy Art" },
      { type: "image", src: "/images/designProjects/image (7).png", title: "Medieval Fantasy Stone Wall - Variant 2", category: "Fantasy Art" },
      { type: "image", src: "/images/designProjects/image (8).png", title: "Vast Medieval Battlefield Scene", category: "Fantasy Art" },

      { type: "image", src: "/images/designProjects/image (9).png", title: "RPG First-Person Perspective - Scene 1", category: "RPG Assets" },
      { type: "image", src: "/images/designProjects/image (10).png", title: "RPG First-Person Perspective - Scene 2", category: "RPG Assets" },
      { type: "image", src: "/images/designProjects/image (11).png", title: "RPG First-Person Perspective - Scene 3", category: "RPG Assets" },
      { type: "image", src: "/images/designProjects/image (12).png", title: "RPG First-Person Perspective - Scene 4", category: "RPG Assets" },
      { type: "image", src: "/images/designProjects/image (13).png", title: "RPG First-Person Perspective - Scene 5", category: "RPG Assets" },
      { type: "image", src: "/images/designProjects/image (14).png", title: "RPG First-Person Perspective - Scene 6", category: "RPG Assets" },
      { type: "image", src: "/images/designProjects/image (15).png", title: "RPG First-Person Perspective - Scene 7", category: "RPG Assets" },
      { type: "image", src: "/images/designProjects/image (16).png", title: "RPG First-Person Perspective - Scene 8", category: "RPG Assets" },
      { type: "image", src: "/images/designProjects/image (17).png", title: "RPG First-Person Perspective - Scene 9", category: "RPG Assets" },
      { type: "image", src: "/images/designProjects/image (18).png", title: "RPG First-Person Perspective - Scene 10", category: "RPG Assets" },
      { type: "image", src: "/images/designProjects/image (19).png", title: "RPG First-Person Perspective - Scene 11", category: "RPG Assets" },
      { type: "image", src: "/images/designProjects/image (20).png", title: "RPG First-Person Perspective - Scene 12", category: "RPG Assets" },
      { type: "image", src: "/images/designProjects/image (21).png", title: "RPG First-Person Perspective - Scene 13", category: "RPG Assets" },
      { type: "image", src: "/images/designProjects/image (22).png", title: "RPG First-Person Perspective - Scene 14", category: "RPG Assets" },
      { type: "image", src: "/images/designProjects/image (23).png", title: "RPG First-Person Perspective - Scene 15", category: "RPG Assets" },

      { type: "image", src: "/images/designProjects/image (24).png", title: "Male Crusader Knight - Full Armor 1", category: "Character Design" },
      { type: "image", src: "/images/designProjects/image (25).png", title: "Male Crusader Knight - Full Armor 2", category: "Character Design" },
      { type: "image", src: "/images/designProjects/image (26).png", title: "Enemy Knight - Combat Ready 1", category: "Character Design" },
      { type: "image", src: "/images/designProjects/image (27).png", title: "Enemy Knight - Combat Ready 2", category: "Character Design" },
      { type: "image", src: "/images/designProjects/image (28).png", title: "Enemy Knight - Combat Ready 3", category: "Character Design" },
      { type: "image", src: "/images/designProjects/image (29).png", title: "Enemy Knight - Combat Ready 4", category: "Character Design" },
      { type: "image", src: "/images/designProjects/image (30).png", title: "Enemy Knight - Combat Ready 5", category: "Character Design" },
      { type: "image", src: "/images/designProjects/image (31).png", title: "Two Fully Armored Knights in Battle - Variant 1", category: "Character Design" },
      { type: "image", src: "/images/designProjects/image (32).png", title: "Two Fully Armored Knights in Battle - Variant 2", category: "Character Design" },

      { type: "image", src: "/images/designProjects/image (33).png", title: "Anime-Style Illustration - Character 1", category: "Anime Art" },
      { type: "image", src: "/images/designProjects/image (34).png", title: "Anime-Style Illustration - Character 2", category: "Anime Art" },
      { type: "image", src: "/images/designProjects/image (35).png", title: "Full-Color Anime Character - Variant 1", category: "Anime Art" },
      { type: "image", src: "/images/designProjects/image (36).png", title: "Full-Color Anime Character - Variant 2", category: "Anime Art" },
      { type: "image", src: "/images/designProjects/image (37).png", title: "Wide Front-Facing Anime-Style Character", category: "Anime Art" },

      { type: "image", src: "/images/designProjects/image (38).png", title: "Front-Facing Pixel Art Portrait - Variant 1", category: "Pixel Art" },
      { type: "image", src: "/images/designProjects/image (39).png", title: "Front-Facing Pixel Art Portrait - Variant 2", category: "Pixel Art" },

      { type: "image", src: "/images/designProjects/image (40).png", title: "Futuristic Digital Logo Design", category: "Digital Design" },
    ],
    skills: [
      "AI Prompt Engineering",
      "Generative AI (Hailuo)",
      "Video Production",
      "Image Generation",
      "Content Strategy",
      "Creative Direction",
      "Asset Management",
      "UGC Content Creation",
      "Fantasy Worldbuilding",
      "Character Design",
      "Game Asset Creation",
      "Multi-Platform Content"
    ],
  }
];

const DESIGN_THEME = {
  "fantasy-morning": {
    text: "rgba(30, 35, 50, 1)",
    subText: "rgba(60, 70, 95, 0.95)",
    labelText: "rgba(80, 100, 140, 0.85)",
    accentColor: "#8b5cf6",
    fontFamily: "var(--font-cinzel)",
    bgGradient: "linear-gradient(180deg, rgba(220, 245, 220, 0.4) 0%, rgba(235, 250, 220, 0.35) 45%, rgba(255, 245, 200, 0.55) 100%)",
    sidebarBg: "rgba(255, 255, 255, 0.6)",
    cardBg: "rgba(255, 255, 255, 0.5)",
    cardHover: "rgba(255, 255, 255, 0.7)",
    detailBg: "rgba(240, 250, 240, 0.8)",
    border: "rgba(139, 92, 246, 0.2)",
  },
  "fantasy-night": {
    text: "rgba(230, 240, 255, 1)",
    subText: "rgba(200, 220, 255, 0.95)",
    labelText: "rgba(180, 210, 255, 0.85)",
    accentColor: "#8b5cf6",
    fontFamily: "var(--font-cinzel)",
    bgGradient: "linear-gradient(180deg, rgba(15, 25, 50, 0.9) 0%, rgba(20, 35, 70, 0.85) 45%, rgba(25, 40, 80, 0.9) 100%)",
    sidebarBg: "rgba(20, 35, 70, 0.6)",
    cardBg: "rgba(30, 50, 100, 0.4)",
    cardHover: "rgba(40, 70, 130, 0.6)",
    detailBg: "rgba(15, 30, 60, 0.7)",
    border: "rgba(139, 92, 246, 0.3)",
  },
  tech: {
    text: "rgba(200, 220, 255, 1)",
    subText: "rgba(170, 200, 255, 0.95)",
    labelText: "rgba(150, 190, 255, 0.85)",
    accentColor: "#3f8fff",
    fontFamily: "'DM Mono', monospace",
    bgGradient: "linear-gradient(180deg, rgba(10, 20, 50, 0.95) 0%, rgba(15, 30, 70, 0.9) 50%, rgba(10, 25, 60, 0.95) 100%)",
    sidebarBg: "rgba(20, 40, 100, 0.5)",
    cardBg: "rgba(25, 45, 110, 0.4)",
    cardHover: "rgba(35, 65, 150, 0.6)",
    detailBg: "rgba(10, 25, 60, 0.7)",
    border: "rgba(63, 143, 255, 0.2)",
  },
};

// ── Mobile Project Selector ───────────────────────────────
function MobileProjectSelector({ projects, selectedIndex, onSelect, theme }) {
  const themeConfig = DESIGN_THEME[theme];
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="lg:hidden w-full mb-6 relative z-50">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 rounded-lg border"
        style={{
          background: themeConfig.detailBg,
          borderColor: `${projects[selectedIndex].accent}66`,
          boxShadow: `0 4px 16px ${projects[selectedIndex].accent}22`,
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="text-left flex-1 min-w-0">
          <p className="text-xs font-mono tracking-widest uppercase" style={{ color: themeConfig.labelText }}>
            Current Project
          </p>
          <p className="text-sm font-semibold line-clamp-1 mt-1" style={{ color: themeConfig.text }}>
            {projects[selectedIndex].title}
          </p>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="ml-3"
        >
          <ChevronDown size={20} style={{ color: projects[selectedIndex].accent }} />
        </motion.div>
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40"
            />

            {/* Menu */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="absolute left-0 right-0 top-full mt-2 rounded-lg overflow-hidden border z-50"
              style={{
                background: themeConfig.detailBg,
                borderColor: themeConfig.border,
                backdropFilter: "blur(12px)",
                maxHeight: "70vh",
                overflowY: "auto",
                boxShadow: `0 12px 32px rgba(0,0,0,0.3)`,
              }}
            >
              {projects.map((proj, idx) => (
                <motion.button
                  key={proj.id}
                  onClick={() => {
                    onSelect(idx);
                    setIsOpen(false);
                  }}
                  className="w-full text-left p-4 border-b last:border-b-0 transition-all"
                  style={{
                    background: selectedIndex === idx ? `${proj.accent}33` : "transparent",
                    borderColor: themeConfig.border,
                  }}
                  whileHover={{ background: `${proj.accent}22` }}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="w-3 h-3 rounded-full mt-1.5 flex-shrink-0"
                      style={{
                        background: selectedIndex === idx ? proj.accent : `${proj.accent}66`,
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold line-clamp-1" style={{ color: themeConfig.text }}>
                        {proj.title}
                      </p>
                      <p className="text-xs line-clamp-1 mt-1" style={{ color: themeConfig.labelText }}>
                        {proj.subtitle}
                      </p>
                    </div>
                    <span
                      className="text-xs px-2.5 py-1 rounded-full font-mono whitespace-nowrap flex-shrink-0 mt-0.5"
                      style={{
                        background: `${proj.accent}44`,
                        color: proj.accent,
                      }}
                    >
                      {proj.media.length}
                    </span>
                  </div>
                </motion.button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Media Item Component ────────────────────────────────────
function MediaItem({ item, accent, onSelect }) {
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <motion.button
      onClick={() => onSelect(item)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      style={{
        all: "unset",
        cursor: "pointer",
      }}
      className="relative rounded-lg overflow-hidden group w-full"
    >
      <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-gradient-to-br from-black/20 to-black/40">
        {item.type === "video" ? (
          <>
            <video
              src={item.src}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              crossOrigin="anonymous"
              muted
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{
                  background: `${accent}dd`,
                  border: "1px solid rgba(255, 255, 255, 0.5)",
                }}
                whileHover={{ scale: 1.2 }}
              >
                <Play size={14} className="text-white fill-white ml-0.5" />
              </motion.div>
            </div>
          </>
        ) : !imgError ? (
          <>
            {/* Loading skeleton */}
            {!imgLoaded && (
              <div
                className="absolute inset-0 animate-pulse"
                style={{ background: `${accent}11` }}
              />
            )}
            {/* Regular img tag for better compatibility */}
            <img
              src={item.src}
              alt={item.title}
              onLoad={() => setImgLoaded(true)}
              onError={() => {
                setImgError(true);
                setImgLoaded(false);
              }}
              className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 ${
                !imgLoaded ? "opacity-0" : "opacity-100"
              }`}
              crossOrigin="anonymous"
              loading="lazy"
            />
          </>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center" style={{ background: `${accent}22` }}>
            <span className="text-xs text-center px-2" style={{ color: accent }}>
              Image unavailable
            </span>
          </div>
        )}
      </div>
    </motion.button>
  );
}

// ── Media Lightbox ─────────────────────────────────────────
function MediaLightbox({ media, accent, onClose }) {
  const [index, setIndex] = useState(0);

  const currentItem = media[index];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-2 lg:p-4 backdrop-blur-sm"
      style={{ background: "rgba(0, 0, 0, 0.8)" }}
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl"
        style={{ aspectRatio: "16/10", maxHeight: "90vh" }}
      >
        {/* Media */}
        {currentItem.type === "video" ? (
          <video
            src={currentItem.src}
            autoPlay
            controls
            className="w-full h-full rounded-lg lg:rounded-xl object-contain"
          />
        ) : (
          <Image
            src={currentItem.src}
            alt={currentItem.title}
            fill
            className="object-contain rounded-lg lg:rounded-xl"
          />
        )}

        {/* Close */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="absolute -top-10 lg:-top-12 right-0 p-1.5 lg:p-2"
          style={{ color: "#ffffff" }}
        >
          <X size={20} className="lg:w-6 lg:h-6" />
        </motion.button>

        {/* Info */}
        <div className="absolute bottom-0 left-0 right-0 p-3 lg:p-4 rounded-b-lg lg:rounded-b-xl" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85), rgba(0,0,0,0.4), transparent)" }}>
          <p style={{ color: "#ffffff" }} className="text-xs lg:text-sm font-semibold mb-1 line-clamp-2">
            {currentItem.title}
          </p>
          <p style={{ color: "rgba(255, 255, 255, 0.7)" }} className="text-xs">
            {index + 1} / {media.length}
          </p>
        </div>

        {/* Navigation */}
        {media.length > 1 && (
          <>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIndex((i) => (i - 1 + media.length) % media.length)}
              className="absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 p-1.5 lg:p-2 rounded-lg"
              style={{ background: "rgba(0, 0, 0, 0.6)", border: "1px solid rgba(255, 255, 255, 0.2)" }}
            >
              <ChevronLeft size={18} className="lg:w-5 lg:h-5" style={{ color: "#ffffff" }} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIndex((i) => (i + 1) % media.length)}
              className="absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 p-1.5 lg:p-2 rounded-lg"
              style={{ background: "rgba(0, 0, 0, 0.6)", border: "1px solid rgba(255, 255, 255, 0.2)" }}
            >
              <ChevronRight size={18} className="lg:w-5 lg:h-5" style={{ color: "#ffffff" }} />
            </motion.button>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}

// ── Project Selector Card ──────────────────────────────────
function ProjectCard({ project, isSelected, onClick, theme }) {
  const themeConfig = DESIGN_THEME[theme];

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      style={{
        all: "unset",
        cursor: "pointer",
      }}
      className="w-full lg:w-auto text-left flex-shrink-0 lg:flex-shrink"
    >
      <div
        className="relative p-3 lg:p-4 rounded-lg transition-all duration-300 border min-w-max lg:min-w-0"
        style={{
          background: isSelected ? themeConfig.cardHover : themeConfig.cardBg,
          borderColor: isSelected ? `${project.accent}66` : themeConfig.border,
          boxShadow: isSelected ? `0 8px 24px ${project.accent}22` : "none",
        }}
      >
        {/* Accent line */}
        <div
          className="absolute left-0 top-0 bottom-0 w-1 rounded-l-lg"
          style={{
            background: project.accent,
            opacity: isSelected ? 1 : 0.3,
          }}
        />

        <div className="pl-2 lg:pl-3">
          <h3
            className="font-semibold text-xs lg:text-sm mb-1 line-clamp-1"
            style={{ color: themeConfig.text }}
          >
            {project.title}
          </h3>
          <p
            className="text-xs line-clamp-1"
            style={{ color: themeConfig.labelText }}
          >
            {project.subtitle}
          </p>

          {/* Media count */}
          <div className="flex items-center gap-2 mt-2">
            <span
              className="text-xs px-2 py-1 rounded-full font-mono whitespace-nowrap"
              style={{
                background: `${project.accent}22`,
                color: project.accent,
              }}
            >
              {project.media.length} assets
            </span>
          </div>
        </div>
      </div>
    </motion.button>
  );
}

// ── Pagination Component ──────────────────────────────────
function MediaPagination({ currentPage, totalPages, onPageChange, accent }) {
  return (
    <div className="flex items-center justify-between mt-8 pt-6 border-t" style={{ borderColor: `${accent}22` }}>
      <motion.button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 0}
        whileHover={{ scale: currentPage === 0 ? 1 : 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 px-3 py-2 rounded-lg disabled:opacity-40"
        style={{
          background: `${accent}22`,
          border: `1px solid ${accent}44`,
          cursor: currentPage === 0 ? "not-allowed" : "pointer",
        }}
      >
        <ChevronLeft size={16} style={{ color: accent }} />
        <span className="text-sm font-mono" style={{ color: accent }}>Prev</span>
      </motion.button>

      <div className="flex items-center gap-2">
        {Array.from({ length: totalPages }).map((_, idx) => (
          <motion.button
            key={idx}
            onClick={() => onPageChange(idx)}
            className="w-2 h-2 rounded-full transition-all"
            style={{
              background: idx === currentPage ? accent : `${accent}44`,
            }}
            whileHover={{ scale: 1.3 }}
          />
        ))}
      </div>

      <motion.button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages - 1}
        whileHover={{ scale: currentPage === totalPages - 1 ? 1 : 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 px-3 py-2 rounded-lg disabled:opacity-40"
        style={{
          background: `${accent}22`,
          border: `1px solid ${accent}44`,
          cursor: currentPage === totalPages - 1 ? "not-allowed" : "pointer",
        }}
      >
        <span className="text-sm font-mono" style={{ color: accent }}>Next</span>
        <ChevronRight size={16} style={{ color: accent }} />
      </motion.button>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────
export default function DesignPortfolioRedesigned({ theme = "fantasy-morning" }) {
  const themeConfig = DESIGN_THEME[theme];
  const [selectedProject, setSelectedProject] = useState(0);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [mediaPage, setMediaPage] = useState(0);

  const project = DESIGN_PROJECTS[selectedProject];
  
  // Pagination logic: 2 rows per page (4 cols = 2x2 on desktop, 2 cols on mobile = 2x1)
  const itemsPerPage = 8; // 2 rows × 4 columns on desktop
  const totalPages = Math.ceil(project.media.length / itemsPerPage);
  const startIdx = mediaPage * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const paginatedMedia = project.media.slice(startIdx, endIdx);

  return (
    <div
      style={{
        background: themeConfig.bgGradient,
        color: themeConfig.text,
        fontFamily: themeConfig.fontFamily,
        minHeight: "100vh",
      }}
      className="relative overflow-hidden"
    >
      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px) } to { opacity: 1; transform: translateY(0) } }
        .fade-in { animation: fadeUp 0.6s ease both; }
      `}</style>

      {/* Header */}
      <div className="sticky top-0 z-40 backdrop-blur-sm" style={{ borderBottom: `1px solid ${themeConfig.border}` }}>
        <div className="px-4 lg:px-6 py-4 lg:py-6">
          <div className="mb-2 lg:mb-4">
            <p className="text-xs font-mono tracking-widest uppercase" style={{ color: themeConfig.labelText }}>
              ✦ Design Portfolio ✦
            </p>
          </div>
          <h1
            className="text-2xl lg:text-4xl font-bold"
            style={{ fontFamily: themeConfig.fontFamily }}
          >
            Design Works
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 lg:px-6 py-8 lg:py-12">
        <div className="max-w-7xl mx-auto">
          {/* Mobile Project Selector - Top Nav */}
          <div className="lg:hidden mb-6">
            <MobileProjectSelector
              projects={DESIGN_PROJECTS}
              selectedIndex={selectedProject}
              onSelect={(idx) => {
                setSelectedProject(idx);
                setSelectedMedia(null);
                setMediaPage(0);
              }}
              theme={theme}
            />
          </div>

          {/* Main Grid: Desktop has sidebar, mobile is single column */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
            {/* Desktop Sidebar - Project List */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="hidden lg:block lg:col-span-1 h-fit lg:sticky lg:top-28"
            >
              <p className="text-xs font-mono tracking-widest uppercase mb-3 lg:mb-4" style={{ color: themeConfig.labelText }}>
                Projects ({DESIGN_PROJECTS.length})
              </p>
              
              <div className="lg:space-y-3 flex lg:flex-col gap-3 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0">
                {DESIGN_PROJECTS.map((proj, idx) => (
                  <div key={proj.id} className="flex-shrink-0 w-full lg:flex-shrink">
                    <ProjectCard
                      project={proj}
                      isSelected={selectedProject === idx}
                      onClick={() => {
                        setSelectedProject(idx);
                        setSelectedMedia(null);
                        setMediaPage(0);
                      }}
                      theme={theme}
                    />
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Main Content - Project Details & Media */}
            <motion.div
              key={selectedProject}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="col-span-1 lg:col-span-3 space-y-6 lg:space-y-8"
            >
            {/* Project Header */}
            <div>
              <div className="mb-4 lg:mb-6">
                <span
                  className="text-3xl lg:text-5xl font-bold opacity-20"
                  style={{ color: project.accent }}
                >
                  {String(selectedProject + 1).padStart(2, "0")}
                </span>
              </div>

              <h2
                className="text-2xl lg:text-3xl font-bold mb-2"
                style={{ fontFamily: themeConfig.fontFamily }}
              >
                {project.title}
              </h2>

              <p className="text-sm lg:text-base mb-3 lg:mb-4" style={{ color: themeConfig.subText }}>
                {project.subtitle}
              </p>

              <motion.div
                className="w-10 lg:w-12 h-1 mb-4 lg:mb-6 rounded-full"
                style={{ background: project.accent }}
                initial={{ width: 0 }}
                animate={{ width: "auto" }}
                transition={{ duration: 0.6 }}
              />

              <p className="text-xs lg:text-sm leading-relaxed mb-4 lg:mb-6" style={{ color: themeConfig.subText }}>
                {project.description}
              </p>

              {/* Meta Info */}
              <div className="grid grid-cols-2 gap-3 lg:gap-4 mb-6 lg:mb-8">
                <div>
                  <p className="text-xs font-mono tracking-widest uppercase mb-2" style={{ color: themeConfig.labelText }}>
                    Period
                  </p>
                  <p className="text-xs lg:text-sm flex items-center gap-2" style={{ color: themeConfig.text }}>
                    <Calendar size={14} style={{ color: project.accent }} />
                    <span className="line-clamp-2">{project.period}</span>
                  </p>
                </div>
                <div>
                  <p className="text-xs font-mono tracking-widest uppercase mb-2" style={{ color: themeConfig.labelText }}>
                    Assets
                  </p>
                  <p className="text-xs lg:text-sm flex items-center gap-2" style={{ color: themeConfig.text }}>
                    <Zap size={14} style={{ color: project.accent }} />
                    {project.media.length} items
                  </p>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6 lg:mb-8">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 lg:px-3 py-1 rounded-full font-mono"
                    style={{
                      background: `${project.accent}22`,
                      border: `1px solid ${project.accent}44`,
                      color: themeConfig.text,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Skills */}
              <div>
                <p className="text-xs font-mono tracking-widest uppercase mb-3" style={{ color: themeConfig.labelText }}>
                  Skills Used
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.skills.map((skill) => (
                    <motion.span
                      key={skill}
                      className="text-xs font-mono px-2 lg:px-3 py-1 lg:py-1.5 rounded-md"
                      style={{
                        background: `${project.accent}33`,
                        border: `1px solid ${project.accent}66`,
                        color: themeConfig.text,
                      }}
                      whileHover={{ scale: 1.05, background: `${project.accent}55` }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>

            {/* Divider */}
            <div style={{ height: "1px", background: `linear-gradient(90deg, ${project.accent}00, ${project.accent}66, ${project.accent}00)` }} />

            {/* Media Showcase */}
            <div>
              <div className="flex items-center justify-between mb-4 lg:mb-6">
                <p className="text-xs font-mono tracking-widest uppercase" style={{ color: themeConfig.labelText }}>
                  Media Gallery
                </p>
                <span className="text-xs font-mono px-2 py-1 rounded" style={{ background: `${project.accent}22`, color: project.accent }}>
                  {startIdx + 1}–{Math.min(endIdx, project.media.length)} of {project.media.length}
                </span>
              </div>

              {/* Responsive Grid: 2 cols on mobile, 4 on desktop = 2 rows display */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-4">
                {paginatedMedia.map((item, idx) => (
                  <motion.div
                    key={startIdx + idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.03 }}
                  >
                    <MediaItem
                      item={item}
                      accent={project.accent}
                      onSelect={() => {
                        setSelectedMedia(startIdx + idx);
                      }}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <MediaPagination
                  currentPage={mediaPage}
                  totalPages={totalPages}
                  onPageChange={setMediaPage}
                  accent={project.accent}
                />
              )}
            </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedMedia !== null && (
          <MediaLightbox
            media={project.media}
            accent={project.accent}
            onClose={() => setSelectedMedia(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}