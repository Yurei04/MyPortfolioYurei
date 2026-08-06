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
    accent: "#d946ef",
    gradient: "linear-gradient(135deg, #6b2c91 0%, #8b3dae 50%, #5a1f78 100%)",
    description: "Creating multimedia content and social media visuals that drive engagement and communicate the Hack United brand across all platforms.",
    tags: ["Multimedia", "Social Media", "Creative Design", "Branding"],
    bgImage: "/images/projects/hu-bg.jpg", // Optional background image
    media: [
      { type: "image", src: "/images/projects/hu-media-1.png", title: "Social Post 1" },
      { type: "image", src: "/images/projects/hu-media-2.png", title: "Social Post 2" },
      { type: "image", src: "/images/projects/hu-media-3.png", title: "Campaign Visual" },
      { type: "video", src: "https://www.youtube.com/embed/example", thumbnail: "/images/projects/hu-video.png", title: "Promo Video" },
    ],
    skills: ["Adobe Creative Suite", "Social Media Strategy", "Visual Branding", "Content Creation"],
  },
  {
    id: "max-intern-1",
    title: "Maximally.in Design",
    subtitle: "Visual Designer Intern",
    period: "Aug – Sep 2025",
    accent: "#fb923c",
    gradient: "linear-gradient(135deg, #f59e0b 0%, #f97316 50%, #ea580c 100%)",
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
    id: "max-vd-dev-1",
    title: "Maximally Design System",
    subtitle: "Design & Web Development",
    period: "Sep – Oct 2025",
    accent: "#60a5fa",
    gradient: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 50%, #1e40af 100%)",
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

// ── Color Theme for Design Mode ────────────────────────────
const DESIGN_THEME = {
  "fantasy-morning": {
    backgroundImage: "/images/fantasyImages/morning/bkg2Morning.png",

    cardBg: "rgba(240,255,242,0.88)",
    cardBorder: "rgba(40,130,50,0.19)",
    text: "rgba(8,40,15,1)",
    subText: "rgba(30,70,40,0.82)",
    labelText: "rgba(20,80,30,0.68)",
    borderColor: "rgba(40,130,50,0.3)",
    headingGrad: "linear-gradient(135deg, #0d3318 0%, #1e6b30 55%, #3da856 100%)",
    fontFamily: "var(--font-cinzel)",
  },

  "fantasy-night": {
    backgroundImage: "/images/fantasyImages/night/bkg1Night.png",

    cardBg: "rgba(8,18,55,0.82)",
    cardBorder: "rgba(100,160,240,0.17)",
    text: "#ffffff",
    subText: "rgba(170,215,255,0.75)",
    labelText: "rgba(139,196,248,0.62)",
    borderColor: "rgba(100,160,240,0.3)",
    headingGrad: "linear-gradient(135deg, #dff0ff 0%, #8bc4f8 55%, #4a8fd4 100%)",
    fontFamily: "var(--font-cinzel)",
  },
};

// Helper function to build full background gradient
const buildBackgroundGradient = (theme) => {
  return `
    ${theme.radialBg1},
    ${theme.radialBg2},
    ${theme.linearBg}
  `;
};

// ── Horizontal Scrolling Media Carousel ────────────────────
function MediaCarousel({ mediaItems, projectAccent, bgImage }) {
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
      {/* Background image with overlay */}
      {bgImage && (
        <div className="absolute inset-0 rounded-2xl overflow-hidden -z-10">
          <Image
            src={bgImage}
            alt="Project background"
            fill
            className="object-cover opacity-20"
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${projectAccent}30 0%, rgba(0,0,0,0.3) 100%)`,
            }}
          />
        </div>
      )}

      {/* Carousel Container */}
      <div className="relative">
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
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ background: projectAccent }}
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
                  style={{ background: `${projectAccent}90` }}
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
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full backdrop-blur-md transition-all"
          style={{ background: `${projectAccent}80` }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronLeft size={24} className="text-white" />
        </motion.button>

        <motion.button
          onClick={() => scroll("right")}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full backdrop-blur-md transition-all"
          style={{ background: `${projectAccent}80` }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronRight size={24} className="text-white" />
        </motion.button>
      </div>

      {/* Counter */}
      <div className="px-6 pb-6 flex justify-between items-center">
        <p
          className="text-xs font-mono tracking-widest uppercase"
          style={{ color: projectAccent }}
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
                background: i === selectedIndex ? projectAccent : `${projectAccent}40`,
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
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full aspect-video bg-black rounded-2xl overflow-hidden"
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
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-md"
              >
                <X size={24} className="text-white" />
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
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-md"
                  >
                    <ChevronLeft size={24} className="text-white" />
                  </button>
                  <button
                    onClick={() =>
                      setSelectedIndex(
                        selectedIndex === mediaItems.length - 1 ? 0 : selectedIndex + 1
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-md"
                  >
                    <ChevronRight size={24} className="text-white" />
                  </button>
                </>
              )}

              {/* Info */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-white font-semibold">
                  {mediaItems[selectedIndex].title}
                </p>
                <p className="text-white/60 text-sm">
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
            className="text-6xl font-bold opacity-10"
            style={{
              backgroundImage: theme.headingGrad,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
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
            backgroundImage: theme.headingGrad,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          {project.title}
        </h2>

        {/* Subtitle */}
        <p
          className="text-lg mb-4"
          style={{ color: theme.subText, fontFamily: theme.fontFamily }}
        >
          {project.subtitle}
        </p>

        {/* Divider */}
        <motion.div
          className="w-16 h-1 mb-6 rounded-full"
          style={{ background: project.accent }}
          initial={{ width: 0 }}
          whileInView={{ width: 64 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />

        {/* Description */}
        <p
          className="text-sm leading-relaxed mb-8 max-w-xl"
          style={{ color: theme.subText, fontFamily: "'DM Mono', monospace" }}
        >
          {project.description}
        </p>

        {/* Period */}
        <p
          className="text-xs font-mono tracking-widest uppercase mb-8"
          style={{ color: theme.labelText, opacity: 0.7 }}
        >
          {project.period}
        </p>

        {/* Skills */}
        <div className="mb-8">
          <p
            className="text-xs font-mono tracking-widest uppercase mb-3"
            style={{ color: theme.labelText }}
          >
            Skills
          </p>
          <div className="flex flex-wrap gap-2 mb-8">
            {project.skills.map((skill) => (
              <motion.span
                key={skill}
                className="text-xs font-mono px-3 py-1.5 rounded-md"
                style={{
                  background: `${project.accent}20`,
                  border: `1px solid ${project.accent}50`,
                  color: project.accent,
                }}
                whileHover={{ scale: 1.05 }}
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
              className="text-xs px-2 py-1 rounded-full"
              style={{
                background: `${project.accent}15`,
                border: `1px solid ${project.accent}40`,
                color: project.accent,
                fontFamily: "'DM Mono', monospace",
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
          projectAccent={project.accent}
          bgImage={project.bgImage}
        />
      </motion.div>

      {/* Divider */}
      <motion.div
        className="mt-24 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${project.accent}40, transparent)`,
        }}
      />
    </motion.div>
  );
}

// ── Hero Section ───────────────────────────────────────────
function DesignHero({ theme, bgImage }) {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const y = useTransform(scrollY, [0, 300], [0, 100]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="relative h-screen flex flex-col items-center justify-center text-center pointer-events-none overflow-hidden"
    >
      {/* Background Image with Overlay */}
      {bgImage && (
        <div className="absolute inset-0 -z-10">
          <Image
            src={bgImage}
            alt="Hero background"
            fill
            className="object-cover opacity-30"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.5) 100%)",
            }}
          />
        </div>
      )}

      <div className="mb-8">
        <span
          className="text-sm font-mono tracking-widest uppercase"
          style={{ color: theme.labelText }}
        >
          ✦ Portfolio Showcase ✦
        </span>
      </div>

      <h1
        className="text-6xl lg:text-8xl font-bold leading-tight mb-6"
        style={{
          fontFamily: theme.fontFamily,
          backgroundImage: theme.headingGrad,
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        Design <br /> Works
      </h1>

      <p
        className="text-lg max-w-md mb-12"
        style={{ color: theme.subText, fontFamily: "'DM Mono', monospace" }}
      >
        Explore my multimedia gallery with images and videos
      </p>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="pointer-events-auto cursor-pointer"
      >
        <ChevronDown size={24} style={{ color: theme.labelText }} />
      </motion.div>
    </motion.div>
  );
}

// ── Main Component ─────────────────────────────────────────
export default function DesignPortfolioShowcase({
  theme = "fantasy-morning",
  heroBackgroundImage = null,
}) {
  const themeConfig = DESIGN_THEME[theme] || DESIGN_THEME["fantasy-morning"];

  return (
    <div
      className="w-full relative overflow-hidden"
      style={{ fontFamily: themeConfig.fontFamily, minHeight: "100vh" }}
    >
      {/* Background */}
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url(${themeConfig.backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Hero */}
        <DesignHero theme={themeConfig} bgImage={heroBackgroundImage} />

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
            style={{ color: themeConfig.labelText }}
          >
            End of showcase
          </p>
        </div>
      </div>
    </div>
  );
}