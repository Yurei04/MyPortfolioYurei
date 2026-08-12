"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Play, ChevronDown, ChevronRight, ChevronLeft, X, ChevronUp } from "lucide-react";
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
    title: "AI-Generated Media Assets & UGC Content Production",
    subtitle: "Multi-Platform Generative AI Creation",
    period: "July 2025 - Present",
    accent: "#8b5cf6",
    description: "Comprehensive generative AI media production portfolio featuring diverse creative assets across multiple platforms. Leveraged advanced AI tools (Hailuo AI) to generate high-quality marketing content, fantasy illustrations, RPG assets, and UGC-style advertisement videos. Produced 40+ professional-grade images and multiple video assets spanning anime illustration, fantasy worldbuilding, medieval game art, pixel art, and direct-response product advertising.",
    tags: [
      "Generative AI",
      "Video Generation",
      "Image Generation",
      "UGC Content",
      "AI Prompting",
      "Content Production",
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

      // IMAGES
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

// ── Theme Configuration ────────────────────────────────────
const DESIGN_THEME = {
  "fantasy-morning": {
    text: "rgba(30, 35, 50, 1)",
    subText: "rgba(60, 70, 95, 0.95)",
    labelText: "rgba(80, 100, 140, 0.85)",
    accentColor: "#8b5cf6",
    fontFamily: "var(--font-cinzel)",
    bgGradient: "linear-gradient(180deg, rgba(220, 245, 220, 0.4) 0%, rgba(235, 250, 220, 0.35) 45%, rgba(255, 245, 200, 0.55) 100%)",
    carouselBg: "rgba(255, 255, 255, 0.7)",
    carouselBorder: "rgba(139, 92, 246, 0.3)",
    cardBg: "rgba(255, 255, 255, 0.5)",
  },
  "fantasy-night": {
    text: "rgba(230, 240, 255, 1)",
    subText: "rgba(200, 220, 255, 0.95)",
    labelText: "rgba(180, 210, 255, 0.85)",
    accentColor: "#8b5cf6",
    fontFamily: "var(--font-cinzel)",
    bgGradient: "linear-gradient(180deg, rgba(15, 25, 50, 0.9) 0%, rgba(20, 35, 70, 0.85) 45%, rgba(25, 40, 80, 0.9) 100%)",
    carouselBg: "rgba(20, 35, 70, 0.7)",
    carouselBorder: "rgba(139, 92, 246, 0.4)",
    cardBg: "rgba(30, 50, 100, 0.4)",
  },
  tech: {
    text: "rgba(200, 220, 255, 1)",
    subText: "rgba(170, 200, 255, 0.95)",
    labelText: "rgba(150, 190, 255, 0.85)",
    accentColor: "#3f8fff",
    fontFamily: "'DM Mono', monospace",
    bgGradient: "linear-gradient(180deg, rgba(10, 20, 50, 0.95) 0%, rgba(15, 30, 70, 0.9) 50%, rgba(10, 25, 60, 0.95) 100%)",
    carouselBg: "rgba(20, 40, 100, 0.6)",
    carouselBorder: "rgba(63, 143, 255, 0.3)",
    cardBg: "rgba(25, 45, 110, 0.4)",
  },
};

// ── Video Thumbnail Component ──────────────────────────────
function VideoThumbnail({ src, title }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative w-full h-full bg-black rounded-lg overflow-hidden">
      {/* Video as thumbnail */}
      <video
        src={src}
        className="w-full h-full object-cover"
        onLoadedMetadata={() => setIsLoaded(true)}
        crossOrigin="anonymous"
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />
    </div>
  );
}

// ── Category-Based Media Grid ──────────────────────────────
function CategorizedMediaSection({ mediaItems, accentColor, theme }) {
  const themeConfig = DESIGN_THEME[theme] || DESIGN_THEME["fantasy-morning"];
  
  // Group media by category
  const groupedMedia = mediaItems.reduce((acc, item) => {
    const category = item.category || "Other";
    if (!acc[category]) acc[category] = [];
    acc[category].push(item);
    return acc;
  }, {});

  // Define category order and display limits
  const categoryOrder = [
    "Product Marketing",
    "Fantasy Video",
    "Cinematic",
    "Fantasy Art",
    "RPG Assets",
    "Character Design",
    "Anime Art",
    "Pixel Art",
    "Digital Design"
  ];

  const sortedCategories = categoryOrder.filter(cat => groupedMedia[cat]);

  return (
    <div className="space-y-8">
      {sortedCategories.map((category) => (
        <CategoryTab
          key={category}
          category={category}
          items={groupedMedia[category]}
          accentColor={accentColor}
          theme={theme}
          themeConfig={themeConfig}
        />
      ))}
    </div>
  );
}

// ── Individual Category Tab ────────────────────────────────
function CategoryTab({ category, items, accentColor, theme, themeConfig }) {
  const [isExpanded, setIsExpanded] = useState(category === "Product Marketing" || category === "Fantasy Video");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);
  const scrollRef = useRef(null);

  // Show only 6 items initially, allow expand for more
  const displayLimit = 6;
  const isExpandable = items.length > displayLimit;
  const displayedItems = isExpanded ? items : items.slice(0, displayLimit);

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
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: false }}
      className="space-y-4"
    >
      {/* Category Header */}
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 rounded-lg transition-all"
        style={{
          background: `${accentColor}22`,
          border: `1px solid ${accentColor}44`,
          backdropFilter: "blur(8px)",
        }}
        whileHover={{
          background: `${accentColor}33`,
        }}
      >
        <div className="flex items-center gap-3">
          <h3
            className="text-lg font-semibold"
            style={{ color: themeConfig.text }}
          >
            {category}
          </h3>
          <span
            className="text-xs px-2 py-1 rounded-full font-mono"
            style={{
              background: `${accentColor}44`,
              color: themeConfig.text,
            }}
          >
            {items.length}
          </span>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown size={20} style={{ color: themeConfig.text }} />
        </motion.div>
      </motion.button>

      {/* Media Grid/Carousel */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-4"
          >
            {/* Carousel for wider screens, Grid for smaller */}
            <div
              className="relative rounded-lg overflow-hidden"
              style={{
                background: themeConfig.carouselBg,
                border: `1px solid ${themeConfig.carouselBorder}`,
              }}
            >
              <div
                ref={scrollRef}
                className="flex gap-3 pb-4 pt-4 px-4 overflow-x-auto scroll-smooth"
                style={{ scrollBehavior: "smooth" }}
              >
                {displayedItems.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    className="relative flex-shrink-0 w-60 h-44 rounded-lg overflow-hidden cursor-pointer group shadow-md"
                    onClick={() => handleMediaClick(idx)}
                  >
                    {/* Media Display */}
                    {item.type === "video" ? (
                      <VideoThumbnail src={item.src} title={item.title} />
                    ) : (
                      <Image
                        src={item.src}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    )}

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />

                    {/* Play Button for Videos */}
                    {item.type === "video" && (
                      <div className="absolute inset-0 flex items-center justify-center group-hover:opacity-100 transition-opacity">
                        <motion.div
                          className="w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md"
                          style={{
                            background: `${accentColor}dd`,
                            border: "2px solid rgba(255, 255, 255, 0.4)",
                          }}
                          whileHover={{ scale: 1.15 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Play size={18} className="text-white fill-white ml-0.5" />
                        </motion.div>
                      </div>
                    )}

                    {/* Title Badge */}
                    <div
                      className="absolute bottom-0 left-0 right-0 p-2"
                      style={{
                        background: "linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent)",
                      }}
                    >
                      <p className="text-white text-xs font-semibold truncate line-clamp-2">
                        {item.title}
                      </p>
                    </div>

                    {/* Type Badge */}
                    <div className="absolute top-2 right-2">
                      <span
                        className="text-xs px-1.5 py-0.5 rounded-full font-mono text-white backdrop-blur-md"
                        style={{
                          background: `${accentColor}99`,
                          border: "1px solid rgba(255, 255, 255, 0.3)",
                        }}
                      >
                        {item.type === "video" ? "▶ Video" : "🖼 Image"}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Scroll Controls */}
              {displayedItems.length > 3 && (
                <>
                  <motion.button
                    onClick={() => scroll("left")}
                    className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-1.5 rounded-lg"
                    style={{
                      background: "rgba(0, 0, 0, 0.5)",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      backdropFilter: "blur(10px)",
                    }}
                    whileHover={{ scale: 1.1, background: "rgba(0, 0, 0, 0.7)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ChevronLeft size={16} style={{ color: "#ffffff" }} />
                  </motion.button>

                  <motion.button
                    onClick={() => scroll("right")}
                    className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-1.5 rounded-lg"
                    style={{
                      background: "rgba(0, 0, 0, 0.5)",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      backdropFilter: "blur(10px)",
                    }}
                    whileHover={{ scale: 1.1, background: "rgba(0, 0, 0, 0.7)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ChevronRight size={16} style={{ color: "#ffffff" }} />
                  </motion.button>
                </>
              )}
            </div>

            {/* Expand/Collapse Info */}
            {isExpandable && displayedItems.length === displayLimit && (
              <motion.button
                onClick={() => setIsExpanded(true)}
                className="w-full py-2 text-sm font-mono text-center transition-all"
                style={{
                  color: accentColor,
                  borderTop: `1px solid ${accentColor}44`,
                }}
                whileHover={{ scale: 1.02 }}
              >
                Show all {items.length} items →
              </motion.button>
            )}

            {/* Counter */}
            <div className="px-2 py-2 flex justify-between items-center text-xs font-mono">
              <span style={{ color: themeConfig.labelText }}>
                {displayedItems.length} / {items.length}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {showLightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowLightbox(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full aspect-video rounded-xl overflow-hidden"
              style={{
                background: "rgba(0, 0, 0, 0.97)",
                border: `2px solid ${accentColor}66`,
              }}
            >
              {displayedItems[selectedIndex].type === "video" ? (
                <video
                  src={displayedItems[selectedIndex].src}
                  autoPlay
                  controls
                  className="w-full h-full"
                />
              ) : (
                <Image
                  src={displayedItems[selectedIndex].src}
                  alt={displayedItems[selectedIndex].title}
                  fill
                  className="object-contain"
                />
              )}

              {/* Close Button */}
              <button
                onClick={() => setShowLightbox(false)}
                className="absolute top-4 right-4 p-2 rounded-lg transition-all"
                style={{
                  background: "rgba(0, 0, 0, 0.6)",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                }}
              >
                <X size={20} style={{ color: "#ffffff" }} />
              </button>

              {/* Info */}
              <div className="absolute bottom-0 left-0 right-0 p-4" style={{ background: "linear-gradient(to top, rgba(0, 0, 0, 0.95), rgba(0, 0, 0, 0.5), transparent)" }}>
                <p style={{ color: "#ffffff" }} className="text-sm font-semibold mb-1">
                  {displayedItems[selectedIndex].title}
                </p>
                <p style={{ color: "#ffffff", opacity: 0.7 }} className="text-xs">
                  {selectedIndex + 1} / {displayedItems.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Project Card with Categorized Media ───────────────────
function DesignProjectCard({ project, theme, index }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -100]);

  const themeConfig = DESIGN_THEME[theme] || DESIGN_THEME["fantasy-morning"];

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
            className="text-5xl lg:text-6xl font-bold opacity-20"
            style={{
              color: themeConfig.accentColor,
            }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Title */}
        <h2
          className="text-3xl lg:text-4xl font-bold mb-3 leading-tight"
          style={{
            fontFamily: themeConfig.fontFamily,
            color: themeConfig.text,
          }}
        >
          {project.title}
        </h2>

        {/* Subtitle */}
        <p
          className="text-base mb-4"
          style={{ 
            fontFamily: themeConfig.fontFamily,
            color: themeConfig.subText,
          }}
        >
          {project.subtitle}
        </p>

        {/* Divider */}
        <motion.div
          className="w-16 h-1 mb-6 rounded-full"
          style={{ background: themeConfig.accentColor }}
          initial={{ width: 0 }}
          whileInView={{ width: 64 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />

        {/* Description */}
        <p
          className="text-sm leading-relaxed mb-8 max-w-xl"
          style={{ 
            fontFamily: "'DM Mono', monospace",
            color: themeConfig.subText,
          }}
        >
          {project.description}
        </p>

        {/* Period */}
        <p
          className="text-xs font-mono tracking-widest uppercase mb-8"
          style={{
            color: themeConfig.labelText,
          }}
        >
          {project.period}
        </p>

        {/* Skills */}
        <div className="mb-8">
          <p
            className="text-xs font-mono tracking-widest uppercase mb-3"
            style={{
              color: themeConfig.labelText,
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
                  background: `${themeConfig.accentColor}33`,
                  border: `1px solid ${themeConfig.accentColor}66`,
                  color: themeConfig.text,
                  backdropFilter: "blur(8px)",
                }}
                whileHover={{ scale: 1.05, background: `${themeConfig.accentColor}55` }}
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
                background: `${themeConfig.accentColor}22`,
                border: `1px solid ${themeConfig.accentColor}44`,
                color: themeConfig.text,
                backdropFilter: "blur(8px)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Categorized Media Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: false, margin: "-100px" }}
        className="mb-16"
      >
        {project.media && project.media.length > 0 && project.media[0].category ? (
          <CategorizedMediaSection
            mediaItems={project.media}
            accentColor={themeConfig.accentColor}
            theme={theme}
          />
        ) : (
          // Fallback for projects without categories
          <div>
            <p style={{ color: themeConfig.labelText }} className="text-sm">
              {project.media?.length} media items
            </p>
          </div>
        )}
      </motion.div>

      {/* Divider */}
      <motion.div
        className="mt-24 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${themeConfig.accentColor}44 30%, ${themeConfig.accentColor}66 50%, ${themeConfig.accentColor}44 70%, transparent)`,
          backdropFilter: "blur(12px)",
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

  const themeConfig = DESIGN_THEME[theme] || DESIGN_THEME["fantasy-morning"];

  return (
    <motion.div
      style={{ opacity, y }}
      className="relative h-screen flex flex-col items-center justify-center text-center pointer-events-none overflow-hidden"
    >
      <div className="mb-8">
        <span
          className="text-sm font-mono tracking-widest uppercase"
          style={{
            color: themeConfig.text,
          }}
        >
          ✦ Portfolio Showcase ✦
        </span>
      </div>

      <h1
        className="text-6xl lg:text-7xl font-bold leading-tight mb-6"
        style={{
          fontFamily: themeConfig.fontFamily,
          color: themeConfig.text,
        }}
      >
        Design <br /> Works
      </h1>

      <p
        className="text-base max-w-md mb-12"
        style={{ 
          fontFamily: "'DM Mono', monospace",
          color: themeConfig.subText,
        }}
      >
        Explore my portfolio organized by project and media type
      </p>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="pointer-events-auto cursor-pointer"
      >
        <ChevronDown size={28} style={{ color: themeConfig.text }} />
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
        background: themeConfig.bgGradient,
      }}
    >
      {/* Hero */}
      <DesignHero theme={theme} />

      {/* Projects */}
      <div className="px-6 lg:px-12 py-20">
        <div className="max-w-6xl mx-auto">
          {DESIGN_PROJECTS.map((project, idx) => (
            <DesignProjectCard
              key={project.id}
              project={project}
              theme={theme}
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
            color: themeConfig.labelText,
          }}
        >
          End of showcase
        </p>
      </div>
    </div>
  );
}