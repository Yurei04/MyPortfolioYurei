"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Play, ChevronDown, ChevronRight, ChevronLeft, X } from "lucide-react";
import Image from "next/image";

// ── Design Projects Data ───────────────────────────────────
const DESIGN_PROJECTS = [
  {
    id: "hu-media-1",
    title: "Hack United Media",
    subtitle: "Multimedia Design & Social Content",
    period: "Jul 2025 – Present",
    accent: "#8b5cf6",
    description: "Creating multimedia content and social media visuals that drive engagement and communicate the Hack United brand across all platforms.",
    tags: ["Multimedia", "Social Media", "Creative Design", "Branding"],
    bgImage: "/images/projects/hu-bg.jpg",
    media: [
      { type: "image", src: "/images/designProjects/HUPROFPOSTER copy.png", title: "Social Post 1" },
      { type: "image", src: "/images/designProjects/HUUHV6CAROUSEL.png", title: "Social Post 2" },
      { type: "image", src: "/images/projects/hu-media-3.png", title: "Campaign Visual" },
      { type: "video", src: "/images/designProjects/HUwrapped_1080x1920.mp4", thumbnail: "/images/fantasyImages/morning/bkg4Morning.png", title: "Promo Video" },
      { type: "video", src: "/images/designProjects/PROMO VID 2_1080x1920.mp4", thumbnail: "/images/fantasyImages/morning/bkg4Morning.png", title: "Promo Video" },
      { type: "video", src: "/images/designProjects/V6 normal vid_1080x1920.mp4", thumbnail: "/images/fantasyImages/morning/bkg4Morning.png", title: "Promo Video" }
    ],
    skills: ["Adobe Creative Suite", "Social Media Strategy", "Visual Branding", "Content Creation"],
  },
  {
    id: "max-intern-1",
    title: "Maximally.in Design",
    subtitle: "Visual Designer Intern",
    period: "Aug – Sep 2025",
    accent: "#8b5cf6",
    description: "Designed posters, carousels, hackathon logos, headers, and backgrounds for India's boldest youth AI hackathon with a focus on bold visuals and modern aesthetics.",
    tags: ["Graphic Design", "Branding", "Logo Design", "Visual Identity"],
    bgImage: "/images/projects/max-bg.jpg",
    media: [
      { type: "image", src: "/images/projects/max-design-1.png", title: "Logo Design" },
      { type: "image", src: "/images/projects/max-design-2.png", title: "Poster" },
      { type: "image", src: "/images/projects/max-design-3.png", title: "Header" },
      { type: "image", src: "/images/projects/max-design-4.png", title: "Background" },
      { type: "video", src: "https://www.youtube.com/embed/example", thumbnail: "/images/projects/max-video.png", title: "Motion Graphics" },
    ],
    skills: ["Logo Design", "Poster Design", "Brand Identity", "Digital Illustration"],
  },
  {
    id: "freelance-1",
    title: "Freelance Video & Photo Editing",
    subtitle: "Design & Web Development",
    period: "Sep – Oct 2025",
    accent: "#8b5cf6",
    description: "Led comprehensive graphic design and web development initiatives. Built scalable design systems with modern tools while maintaining visual consistency across all touchpoints.",
    tags: ["Design Systems", "Web Design", "UI/UX", "Brand Strategy"],
    bgImage: "/images/projects/design-system-bg.jpg",
    media: [
      { type: "image", src: "/images/projects/max-vd.png", title: "Design System UI" },
      { type: "video", src: "https://www.youtube.com/embed/example", thumbnail: "/images/projects/max-vd-video.png", title: "System Demo" },
      { type: "image", src: "/images/projects/max-components.png", title: "Component Library" },
      { type: "image", src: "/images/projects/max-tokens.png", title: "Design Tokens" },
    ],
    skills: ["Design Systems", "UI Design", "Figma Prototyping", "Web Development"],
  },
];

// ── Unified Color Theme with Light Text & Glass Effects ────
const DESIGN_THEME = {
  "fantasy-morning": {
    // Light color palette for visibility
    text: "rgba(255, 255, 255, 1)",
    subText: "rgba(230, 240, 250, 0.95)",
    labelText: "rgba(210, 230, 255, 0.90)",
    accentColor: "#8b5cf6",
    fontFamily: "var(--font-cinzel)",
  },

  "fantasy-night": {
    // Light color palette for visibility
    text: "rgba(255, 255, 255, 1)",
    subText: "rgba(230, 240, 250, 0.95)",
    labelText: "rgba(210, 230, 255, 0.90)",
    accentColor: "#8b5cf6",
    fontFamily: "var(--font-cinzel)",
  },
};

// ── Horizontal Scrolling Media Carousel ────────────────────
function MediaCarousel({ mediaItems, accentColor, bgImage }) {
  const scrollRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isAutoScroll, setIsAutoScroll] = useState(true);
  const [showLightbox, setShowLightbox] = useState(false);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleMediaClick = (index) => {
    setSelectedIndex(index);
    setShowLightbox(true);
    setIsAutoScroll(false);
  };

  return (
    <div className="relative w-full">
      {/* Carousel Container with Glass Effect */}
      <div 
        className="relative rounded-2xl"
        style={{
        background:
          "linear-gradient(135deg, rgba(255, 250, 220, 0.18) 0%, rgba(240, 255, 220, 0.14) 50%, rgba(220, 255, 220, 0.18) 100%)",
        border: "2px solid rgba(255, 255, 220, 0.25)",
        backdropFilter: "blur(2px) saturate(180%)",
        WebkitBackdropFilter: "blur(2px) saturate(180%)",
        borderRadius: "24px",
        boxShadow:
          "0 8px 32px rgba(180, 200, 120, 0.15), inset 0 1px 0 rgba(255,255,255,0.25)",
      }}
      >
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-6 pt-6 px-6 scroll-smooth"
          style={{ scrollBehavior: "smooth" }}
        >
          {mediaItems.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: false }}
              className="relative flex-shrink-0 w-80 h-64 rounded-xl overflow-hidden cursor-pointer group"
              onClick={() => handleMediaClick(idx)}
            >
              {/* Media Item */}
              <Image
                src={item.type === "video" ? item.thumbnail : item.src}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />

              {/* Play Button for Videos */}
              {item.type === "video" && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="w-16 h-16 rounded-full flex items-center justify-center backdrop-blur-md"
                    style={{
                      background: "rgba(139, 92, 246, 0.8)",
                      border: "2px solid rgba(255, 255, 255, 0.3)",
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Play size={28} className="text-white fill-white ml-1" />
                  </motion.div>
                </div>
              )}

              {/* Title Badge */}
              <div
                className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t"
                style={{
                  background: `linear-gradient(to top, rgba(0,0,0,0.8), transparent)`,
                }}
              >
                <p className="text-white text-sm font-semibold truncate">
                  {item.title}
                </p>
              </div>

              {/* Media Type Badge */}
              <div className="absolute top-3 right-3">
                <span
                  className="text-xs px-2 py-1 rounded-full font-mono text-white backdrop-blur-md"
                  style={{
                    background: "rgba(139, 92, 246, 0.6)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                  }}
                >
                  {item.type === "video" ? "Video" : "Image"}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Scroll Controls */}
        <motion.button
          onClick={() => scroll("left")}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full transition-all"
          style={{
            background: "rgba(0, 0, 0, 0.5)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            backdropFilter: "blur(10px)",
          }}
          whileHover={{ scale: 1.15, background: "rgba(0, 0, 0, 0.7)" }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronLeft size={24} style={{ color: "#ffffff" }} />
        </motion.button>

        <motion.button
          onClick={() => scroll("right")}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full transition-all"
          style={{
            background: "rgba(0, 0, 0, 0.5)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            backdropFilter: "blur(10px)",
          }}
          whileHover={{ scale: 1.15, background: "rgba(0, 0, 0, 0.7)" }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronRight size={24} style={{ color: "#ffffff" }} />
        </motion.button>
      </div>

      {/* Counter */}
      <div className="px-6 pb-6 flex justify-between items-center">
        <p
          className="text-xs font-mono tracking-widest uppercase"
          style={{
            color: "#ffffff",
            textShadow: "0 1px 6px rgba(0, 0, 0, 0.8)",
          }}
        >
          {mediaItems.length} Items
        </p>
        <div className="flex gap-2">
          {mediaItems.map((_, i) => (
            <motion.div
              key={i}
              className="h-1 rounded-full"
              style={{
                width: i === selectedIndex ? 24 : 8,
                background: i === selectedIndex ? "#8b5cf6" : "rgba(139, 92, 246, 0.4)",
                boxShadow: i === selectedIndex ? "0 0 8px rgba(139, 92, 246, 0.6)" : "none",
              }}
              animate={{ width: i === selectedIndex ? 24 : 8 }}
            />
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {showLightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowLightbox(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 w-full h-full"
            style={{
              background:
                "linear-gradient(135deg, rgba(255, 252, 220, 0.22) 0%, rgba(240, 255, 220, 0.18) 50%, rgba(220, 255, 220, 0.22) 100%)",
              backdropFilter: "blur(30px) saturate(220%)",
              WebkitBackdropFilter: "blur(30px) saturate(220%)",
              border: "1.5px solid rgba(255, 255, 220, 0.35)",
              borderRadius: "32px",
              boxShadow: `
                0 20px 60px rgba(180, 200, 120, 0.18),
                inset 0 1px 0 rgba(255,255,255,0.35),
                inset 0 -1px 0 rgba(220,255,220,0.15)
              `,
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full aspect-video rounded-2xl overflow-hidden"
              style={{
                background: "rgba(0, 0, 0, 0.95)",
                border: "1px solid rgba(139, 92, 246, 0.4)",
                boxShadow: "0 20px 60px rgba(0, 0, 0, 0.8)",
              }}
            >
              {mediaItems[selectedIndex].type === "video" ? (
                <iframe
                  src={mediaItems[selectedIndex].src}
                  className="w-full h-full"
                  allowFullScreen
                  title={mediaItems[selectedIndex].title}
                />
              ) : (
                <Image
                  src={mediaItems[selectedIndex].src}
                  alt={mediaItems[selectedIndex].title}
                  fill
                  className="object-contain"
                />
              )}

              {/* Close Button */}
              <button
                onClick={() => setShowLightbox(false)}
                className="absolute top-4 right-4 p-2 rounded-full transition-all"
                style={{
                  background: "rgba(0, 0, 0, 0.6)",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  backdropFilter: "blur(10px)",
                }}
                onMouseEnter={(e) => e.target.style.background = "rgba(0, 0, 0, 0.8)"}
                onMouseLeave={(e) => e.target.style.background = "rgba(0, 0, 0, 0.6)"}
              >
                <X size={24} style={{ color: "#ffffff" }} />
              </button>

              {/* Navigation */}
              {mediaItems.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setSelectedIndex(
                        selectedIndex === 0 ? mediaItems.length - 1 : selectedIndex - 1
                      )
                    }
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full transition-all"
                    style={{
                      background: "rgba(0, 0, 0, 0.6)",
                      border: "1px solid rgba(255, 255, 255, 0.3)",
                      backdropFilter: "blur(10px)",
                    }}
                    onMouseEnter={(e) => e.target.style.background = "rgba(0, 0, 0, 0.8)"}
                    onMouseLeave={(e) => e.target.style.background = "rgba(0, 0, 0, 0.6)"}
                  >
                    <ChevronLeft size={24} style={{ color: "#ffffff" }} />
                  </button>
                  <button
                    onClick={() =>
                      setSelectedIndex(
                        selectedIndex === mediaItems.length - 1 ? 0 : selectedIndex + 1
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full transition-all"
                    style={{
                      background: "rgba(0, 0, 0, 0.6)",
                      border: "1px solid rgba(255, 255, 255, 0.3)",
                      backdropFilter: "blur(10px)",
                    }}
                    onMouseEnter={(e) => e.target.style.background = "rgba(0, 0, 0, 0.8)"}
                    onMouseLeave={(e) => e.target.style.background = "rgba(0, 0, 0, 0.6)"}
                  >
                    <ChevronRight size={24} style={{ color: "#ffffff" }} />
                  </button>
                </>
              )}

              {/* Info */}
              <div className="absolute bottom-0 left-0 right-0 p-6" style={{ background: "linear-gradient(to top, rgba(0, 0, 0, 0.95), rgba(0, 0, 0, 0.7), transparent)" }}>
                <p style={{ color: "#ffffff", textShadow: "0 2px 8px rgba(0, 0, 0, 0.8)" }} className="text-white font-semibold">
                  {mediaItems[selectedIndex].title}
                </p>
                <p style={{ color: "#ffffff", textShadow: "0 1px 4px rgba(0, 0, 0, 0.8)" }} className="text-sm">
                  {selectedIndex + 1} / {mediaItems.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Project Card with Enhanced Media ───────────────────────
function DesignProjectCard({ project, theme, index }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -100]);

  return (
    <motion.div
      ref={containerRef}
      style={{ opacity, y }}
      className="relative w-full mb-32"
    >
      {/* Content Section */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: false, margin: "-100px" }}
        className="mb-12"
      >
        {/* Project number */}
        <div className="mb-6">
          <span
            className="text-6xl font-bold opacity-30"
            style={{
              color: theme.accentColor,
            }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Title */}
        <h2
          className="text-4xl lg:text-5xl font-bold mb-3 leading-tight"
          style={{
            fontFamily: theme.fontFamily,
            color: "#ffffff",
            textShadow: "0 3px 15px rgba(0, 0, 0, 0.8), 0 1px 5px rgba(0, 0, 0, 0.6)",
          }}
        >
          {project.title}
        </h2>

        {/* Subtitle */}
        <p
          className="text-lg mb-4"
          style={{ 
            fontFamily: theme.fontFamily,
            color: "#ffffff",
            textShadow: "0 2px 10px rgba(0, 0, 0, 0.8)",
          }}
        >
          {project.subtitle}
        </p>

        {/* Divider */}
        <motion.div
          className="w-16 h-1 mb-6 rounded-full"
          style={{ background: "#8b5cf6" }}
          initial={{ width: 0 }}
          whileInView={{ width: 64 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />

        {/* Description */}
        <p
          className="text-sm leading-relaxed mb-8 max-w-xl"
          style={{ 
            fontFamily: "'DM Mono', monospace",
            color: "#ffffff",
            textShadow: "0 2px 8px rgba(0, 0, 0, 0.8)",
          }}
        >
          {project.description}
        </p>

        {/* Period */}
        <p
          className="text-xs font-mono tracking-widest uppercase mb-8"
          style={{
            color: "#ffffff",
            textShadow: "0 2px 8px rgba(0, 0, 0, 0.8)",
          }}
        >
          {project.period}
        </p>

        {/* Skills */}
        <div className="mb-8">
          <p
            className="text-xs font-mono tracking-widest uppercase mb-3"
            style={{
              color: "#ffffff",
              textShadow: "0 1px 6px rgba(0, 0, 0, 0.8)",
            }}
          >
            Skills
          </p>
          <div className="flex flex-wrap gap-2 mb-8">
            {project.skills.map((skill) => (
              <motion.span
                key={skill}
                className="text-xs font-mono px-3 py-1.5 rounded-md"
                style={{
                  background: "rgba(139, 92, 246, 0.35)",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  color: "#ffffff",
                  backdropFilter: "blur(8px)",
                  textShadow: "0 1px 4px rgba(0, 0, 0, 0.8)",
                }}
                whileHover={{ scale: 1.05, background: "rgba(139, 92, 246, 0.5)" }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 rounded-full font-mono"
              style={{
                background: "rgba(139, 92, 246, 0.3)",
                border: "1px solid rgba(255, 255, 255, 0.25)",
                color: "#ffffff",
                backdropFilter: "blur(8px)",
                textShadow: "0 1px 4px rgba(0, 0, 0, 0.8)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Media Carousel */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: false, margin: "-100px" }}
        className="mb-16"
      >
        <MediaCarousel
          mediaItems={project.media}
          accentColor={theme.accentColor}
          bgImage={project.bgImage}
        />
      </motion.div>

      {/* Divider */}
      <motion.div
        className="mt-24 h-px"
        style={{
          background:
          "linear-gradient(90deg, transparent, rgba(220, 255, 180, 0.45) 30%, rgba(255, 245, 180, 0.55) 50%, rgba(220, 255, 180, 0.45) 70%, transparent)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      />
    </motion.div>
  );
}

// ── Hero Section ───────────────────────────────────────────
function DesignHero({ theme }) {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const y = useTransform(scrollY, [0, 300], [0, 100]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="relative h-screen flex flex-col items-center justify-center text-center pointer-events-none overflow-hidden"
    >
      <div className="mb-8">
        <span
          className="text-sm font-mono tracking-widest uppercase"
          style={{
            color: "#ffffff",
            textShadow: "0 2px 10px rgba(0, 0, 0, 0.8)",
          }}
        >
          ✦ Portfolio Showcase ✦
        </span>
      </div>

      <h1
        className="text-6xl lg:text-8xl font-bold leading-tight mb-6"
        style={{
          fontFamily: theme.fontFamily,
          color: "#ffffff",
          textShadow: "0 4px 20px rgba(0, 0, 0, 0.8), 0 2px 10px rgba(0, 0, 0, 0.6)",
        }}
      >
        Design <br /> Works
      </h1>

      <p
        className="text-lg max-w-md mb-12"
        style={{ 
          fontFamily: "'DM Mono', monospace",
          color: "#ffffff",
          textShadow: "0 2px 10px rgba(0, 0, 0, 0.8)",
        }}
      >
        Explore my multimedia gallery with images and videos
      </p>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="pointer-events-auto cursor-pointer"
      >
        <ChevronDown size={28} style={{ color: "#ffffff", filter: "drop-shadow(0 2px 10px rgba(0, 0, 0, 0.8))" }} />
      </motion.div>
    </motion.div>
  );
}

// ── Main Component ─────────────────────────────────────────
export default function DesignPortfolioShowcase({
  theme = "fantasy-morning",
}) {
  const themeConfig = DESIGN_THEME[theme] || DESIGN_THEME["fantasy-morning"];

  return (
    <div
      className="w-full relative overflow-hidden"
      style={{ 
        fontFamily: themeConfig.fontFamily, 
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, rgba(220, 245, 220, 0.4) 0%, rgba(235, 250, 220, 0.35) 45%, rgba(255, 245, 200, 0.55) 100%)",
      }}
    >
      {/* Hero */}
      <DesignHero theme={themeConfig} />

      {/* Projects */}
      <div className="px-6 lg:px-12 py-20">
        <div className="max-w-6xl mx-auto">
          {DESIGN_PROJECTS.map((project, idx) => (
            <DesignProjectCard
              key={project.id}
              project={project}
              theme={themeConfig}
              index={idx}
            />
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 lg:px-12 py-20 text-center">
        <p
          className="text-sm font-mono tracking-widest uppercase"
          style={{
            color: "#ffffff",
            textShadow: "0 2px 8px rgba(0, 0, 0, 0.8)",
          }}
        >
          End of showcase
        </p>
      </div>
    </div>
  );
}