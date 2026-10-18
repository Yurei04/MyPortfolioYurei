"use client";

import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Play, ChevronLeft, ChevronRight, X, Calendar, Layers, RotateCw } from "lucide-react";

/* ─────────────────────────────────────────────────────────────
   Images use next/image (optimized, lazy, responsive srcset).
   What was wrong in the original and what changed:
   1. Images were hidden with opacity-0 until onLoad fired. If the
      image loaded before hydration, it stayed invisible. Images are
      now always visible; the shimmer sits *behind* them instead.
   2. `fill` + aspect-square cropped artwork and needs a sized parent.
      Sizes are unknown here, so each Image uses the documented
      width={0} height={0} sizes=… style={{ width:"100%", height:"auto" }}
      pattern and keeps its natural proportions in the masonry grid.
   3. `sizes` was "100vw / 400px" for every tile. It now matches the
      real column widths so Next serves small files instead of full PNGs.
   4. The lightbox always opened on item 0 and ignored the clicked
      item. It now opens on the one you clicked.
   Videos stay as <video> (next/image can't render video); their paths
   are URL-encoded because the filenames contain spaces.
   ───────────────────────────────────────────────────────────── */

// ── Data ───────────────────────────────────────────────────
const DESIGN_PROJECTS = [
  {
    id: "hu-media-1",
    title: "Hack United Media",
    subtitle: "Multimedia design and social content",
    period: "Jul 2025 – Jul 2026",
    accent: "#8b5cf6",
    description:
      "Multimedia content and social visuals that drive engagement and carry the Hack United brand across every platform.",
    tags: ["Multimedia", "Social Media", "Creative Design", "Branding"],
    media: [
      { type: "image", src: "/images/designProjects/HUPROFPOSTER copy.png", title: "Social Post 1" },
      { type: "image", src: "/images/designProjects/HUUHV6CAROUSEL.png", title: "Social Post 2" },
      { type: "video", src: "/images/designProjects/10271.mp4", title: "Promo Video 1" },
      { type: "video", src: "/images/designProjects/HUwrapped_1080x1920.mp4", title: "Hack United Wrapped" },
      { type: "video", src: "/images/designProjects/PROMO VID 2_1080x1920.mp4", title: "Promo Video 2" },
      { type: "video", src: "/images/designProjects/V6 normal vid_1080x1920.mp4", title: "Promo Video 3" },
    ],
    skills: ["Adobe Creative Suite", "Social Media Strategy", "Visual Branding", "Content Creation"],
  },
  {
    id: "max-intern-1",
    title: "Maximally.in Design",
    subtitle: "Visual designer",
    period: "Aug – Sep 2025",
    accent: "#8b5cf6",
    description:
      "Posters, carousels, hackathon logos, headers and backgrounds for India's boldest youth AI hackathon, built around bold visuals and a modern look.",
    tags: ["Graphic Design", "Branding", "Logo Design", "Visual Identity"],
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
    title: "AI-Generated Media and UGC",
    subtitle: "Multi-platform generative AI creation",
    period: "Jul 2025 – Present",
    accent: "#8b5cf6",
    description:
      "A generative AI production portfolio: 40+ professional-grade images and several video assets across anime illustration, fantasy worldbuilding, medieval game art, pixel art and product advertising.",
    tags: [
      "Generative AI", "Video Generation", "Image Generation", "UGC Content",
      "Fantasy Art", "Anime Illustration", "Product Marketing", "RPG Assets",
    ],
    media: [
      { type: "video", src: "/images/designProjects/video (1).mp4", title: "Lipstick – Vertical UGC Ad (9:16)", category: "Product Marketing" },
      { type: "video", src: "/images/designProjects/video (2).mp4", title: "Lipstick – Vertical UGC Ad (9:16)", category: "Product Marketing" },
      { type: "video", src: "/images/designProjects/video (3).mp4", title: "Woman Knight Cinematic", category: "Fantasy Video" },
      { type: "video", src: "/images/designProjects/video (4).mp4", title: "Epic Dramatic Close-up Scene", category: "Cinematic" },

      { type: "image", src: "/images/designProjects/image (1).png", title: "Fantasy-Styled Mechanical Construct", category: "Fantasy Art" },
      { type: "image", src: "/images/designProjects/image (2).png", title: "Highly Detailed Fantasy Ring", category: "Fantasy Props" },
      { type: "image", src: "/images/designProjects/image (3).png", title: "Medieval Fantasy Dialog Box UI", category: "Game UI" },
      { type: "image", src: "/images/designProjects/image (4).png", title: "Shadowy Desolate Landscape", category: "Fantasy Art" },
      { type: "image", src: "/images/designProjects/image (5).png", title: "Large Fantasy Tree", category: "Fantasy Art" },
      { type: "image", src: "/images/designProjects/image (6).png", title: "Medieval Stone Wall – Variant 1", category: "Fantasy Art" },
      { type: "image", src: "/images/designProjects/image (7).png", title: "Medieval Stone Wall – Variant 2", category: "Fantasy Art" },
      { type: "image", src: "/images/designProjects/image (8).png", title: "Vast Medieval Battlefield Scene", category: "Fantasy Art" },

      ...Array.from({ length: 15 }, (_, i) => ({
        type: "image",
        src: `/images/designProjects/image (${i + 9}).png`,
        title: `RPG First-Person Perspective – Scene ${i + 1}`,
        category: "RPG Assets",
      })),

      { type: "image", src: "/images/designProjects/image (24).png", title: "Male Crusader Knight – Full Armor 1", category: "Character Design" },
      { type: "image", src: "/images/designProjects/image (25).png", title: "Male Crusader Knight – Full Armor 2", category: "Character Design" },
      { type: "image", src: "/images/designProjects/image (26).png", title: "Enemy Knight – Combat Ready 1", category: "Character Design" },
      { type: "image", src: "/images/designProjects/image (27).png", title: "Enemy Knight – Combat Ready 2", category: "Character Design" },
      { type: "image", src: "/images/designProjects/image (28).png", title: "Enemy Knight – Combat Ready 3", category: "Character Design" },
      { type: "image", src: "/images/designProjects/image (29).png", title: "Enemy Knight – Combat Ready 4", category: "Character Design" },
      { type: "image", src: "/images/designProjects/image (30).png", title: "Enemy Knight – Combat Ready 5", category: "Character Design" },
      { type: "image", src: "/images/designProjects/image (31).png", title: "Two Armored Knights in Battle – Variant 1", category: "Character Design" },
      { type: "image", src: "/images/designProjects/image (32).png", title: "Two Armored Knights in Battle – Variant 2", category: "Character Design" },

      { type: "image", src: "/images/designProjects/image (33).png", title: "Anime Illustration – Character 1", category: "Anime Art" },
      { type: "image", src: "/images/designProjects/image (34).png", title: "Anime Illustration – Character 2", category: "Anime Art" },
      { type: "image", src: "/images/designProjects/image (35).png", title: "Full-Color Anime Character – Variant 1", category: "Anime Art" },
      { type: "image", src: "/images/designProjects/image (36).png", title: "Full-Color Anime Character – Variant 2", category: "Anime Art" },
      { type: "image", src: "/images/designProjects/image (37).png", title: "Wide Front-Facing Anime Character", category: "Anime Art" },

      { type: "image", src: "/images/designProjects/image (38).png", title: "Front-Facing Pixel Art Portrait – Variant 1", category: "Pixel Art" },
      { type: "image", src: "/images/designProjects/image (39).png", title: "Front-Facing Pixel Art Portrait – Variant 2", category: "Pixel Art" },

      { type: "image", src: "/images/designProjects/image (40).png", title: "Futuristic Digital Logo Design", category: "Digital Design" },
    ],
    skills: [
      "AI Prompt Engineering", "Generative AI (Hailuo)", "Video Production", "Image Generation",
      "Content Strategy", "Creative Direction", "Asset Management", "UGC Content Creation",
      "Fantasy Worldbuilding", "Character Design", "Game Asset Creation", "Multi-Platform Content",
    ],
  },
];

const THEMES = {
  "fantasy-morning": {
    text: "rgba(30, 35, 50, 1)",
    subText: "rgba(60, 70, 95, 0.95)",
    labelText: "rgba(80, 100, 140, 0.9)",
    fontFamily: "var(--font-cinzel)",
    bgGradient:
      "linear-gradient(180deg, rgba(220,245,220,0.4) 0%, rgba(235,250,220,0.35) 45%, rgba(255,245,200,0.55) 100%)",
    panel: "rgba(255,255,255,0.55)",
    tile: "rgba(30,35,50,0.08)",
    chip: "rgba(255,255,255,0.6)",
    border: "rgba(139,92,246,0.22)",
  },
  "fantasy-night": {
    text: "rgba(230, 240, 255, 1)",
    subText: "rgba(200, 220, 255, 0.95)",
    labelText: "rgba(180, 210, 255, 0.85)",
    fontFamily: "var(--font-cinzel)",
    bgGradient:
      "linear-gradient(180deg, rgba(15,25,50,0.92) 0%, rgba(20,35,70,0.88) 45%, rgba(25,40,80,0.92) 100%)",
    panel: "rgba(20,35,70,0.6)",
    tile: "rgba(255,255,255,0.06)",
    chip: "rgba(30,50,100,0.45)",
    border: "rgba(139,92,246,0.35)",
  },
  tech: {
    text: "rgba(200, 220, 255, 1)",
    subText: "rgba(170, 200, 255, 0.95)",
    labelText: "rgba(150, 190, 255, 0.85)",
    fontFamily: "'DM Mono', monospace",
    bgGradient:
      "linear-gradient(180deg, rgba(10,20,50,0.97) 0%, rgba(15,30,70,0.93) 50%, rgba(10,25,60,0.97) 100%)",
    panel: "rgba(20,40,100,0.45)",
    tile: "rgba(255,255,255,0.06)",
    chip: "rgba(25,45,110,0.45)",
    border: "rgba(63,143,255,0.25)",
  },
};

const PAGE_SIZE = 12;

// Only used for <video> src (next/image handles its own URLs).
const enc = (src) => src.split("/").map(encodeURIComponent).join("/");

// ── Gallery tile ───────────────────────────────────────────
function Tile({ item, accent, theme, onOpen }) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const mediaRef = useRef(null);
  const videoSrc = enc(item.src);

  const playPreview = () => {
    const v = mediaRef.current;
    if (v && item.type === "video") v.play().catch(() => {});
  };
  const stopPreview = () => {
    const v = mediaRef.current;
    if (v && item.type === "video") {
      v.pause();
      v.currentTime = 0.1;
    }
  };

  return (
    <button
      type="button"
      onClick={onOpen}
      onMouseEnter={playPreview}
      onMouseLeave={stopPreview}
      aria-label={`Open ${item.title}`}
      className="group relative block w-full overflow-hidden rounded-xl text-left outline-none focus-visible:ring-2"
      style={{
        background: THEMES[theme].tile,
        border: `1px solid ${THEMES[theme].border}`,
        // keeps the tile from collapsing to 0 height while the file loads
        minHeight: loaded ? undefined : 180,
        ["--tw-ring-color"]: accent,
      }}
    >
      {failed ? (
        <div className="flex h-48 flex-col items-center justify-center gap-3 px-4 text-center">
          <p className="text-xs" style={{ color: THEMES[theme].subText }}>
            Couldn&apos;t load this file. Check that it exists at
            <br />
            <span className="break-all opacity-80">{item.src}</span>
          </p>
          <span
            role="button"
            tabIndex={0}
            onClick={(e) => {
              e.stopPropagation();
              setFailed(false);
              setLoaded(false);
              setAttempt((n) => n + 1);
            }}
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs"
            style={{ background: `${accent}2a`, color: accent, border: `1px solid ${accent}55` }}
          >
            <RotateCw size={12} /> Retry
          </span>
        </div>
      ) : item.type === "video" ? (
        <video
          ref={mediaRef}
          src={`${videoSrc}#t=0.1`}
          muted
          loop
          playsInline
          preload="metadata"
          onLoadedData={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className="block h-auto w-full"
        />
      ) : (
        <Image
          key={attempt}
          src={item.src}
          alt={item.title}
          width={0}
          height={0}
          sizes="(min-width: 1280px) 22vw, (min-width: 768px) 30vw, 48vw"
          quality={80}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className="block transition-transform duration-500 group-hover:scale-[1.03]"
          style={{ width: "100%", height: "auto" }}
        />
      )}

      {/* loading shimmer */}
      {!loaded && !failed && (
        <div className="pointer-events-none absolute inset-0 animate-pulse" style={{ background: `${accent}14` }} />
      )}

      {/* video badge */}
      {item.type === "video" && !failed && (
        <span
          className="absolute left-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-full backdrop-blur"
          style={{ background: `${accent}e6`, border: "1px solid rgba(255,255,255,0.5)" }}
        >
          <Play size={12} className="ml-0.5 fill-white text-white" />
        </span>
      )}

      {/* caption on hover / focus */}
      {loaded && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-1 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 pt-10 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
          <p className="line-clamp-2 text-xs font-semibold text-white">{item.title}</p>
          {item.category && <p className="mt-0.5 text-[11px] text-white/70">{item.category}</p>}
        </div>
      )}
    </button>
  );
}

// ── Lightbox ───────────────────────────────────────────────
function Lightbox({ items, startIndex, accent, onClose }) {
  const [index, setIndex] = useState(startIndex);
  const thumbsRef = useRef(null);
  const item = items[index];

  const prev = useCallback(() => setIndex((i) => (i - 1 + items.length) % items.length), [items.length]);
  const next = useCallback(() => setIndex((i) => (i + 1) % items.length), [items.length]);

  // keyboard + scroll lock
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose, prev, next]);

  // keep the active thumbnail centred
  useEffect(() => {
    const active = thumbsRef.current?.querySelector('[data-active="true"]');
    active?.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
  }, [index, items]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex flex-col backdrop-blur-md"
      style={{ background: "rgba(6, 8, 16, 0.92)" }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
    >
      {/* top bar */}
      <div className="flex items-start justify-between gap-4 px-4 py-3 lg:px-6" onClick={(e) => e.stopPropagation()}>
        <div className="min-w-0">
          <p className="line-clamp-1 text-sm font-semibold text-white">{item.title}</p>
          <p className="mt-0.5 text-xs text-white/60">
            {index + 1} of {items.length}
            {item.category ? ` · ${item.category}` : ""}
          </p>
        </div>
        <button
          onClick={onClose}
          aria-label="Close"
          className="rounded-full p-2 text-white/80 transition hover:bg-white/10 hover:text-white"
        >
          <X size={22} />
        </button>
      </div>

      {/* stage */}
      <div className="relative flex min-h-0 flex-1 items-center justify-center px-2 lg:px-16">
        <button
          onClick={(e) => { e.stopPropagation(); prev(); }}
          aria-label="Previous"
          className="absolute left-2 z-10 rounded-full bg-black/50 p-2.5 text-white transition hover:bg-black/80 lg:left-5"
          style={{ border: "1px solid rgba(255,255,255,0.18)" }}
        >
          <ChevronLeft size={22} />
        </button>

        <AnimatePresence mode="wait">
          <motion.div
            key={item.src}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="flex h-full w-full items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {item.type === "video" ? (
              <video
                src={enc(item.src)}
                controls
                autoPlay
                playsInline
                className="max-h-full max-w-full rounded-lg"
                style={{ boxShadow: `0 20px 80px ${accent}33` }}
              />
            ) : (
              <Image
                src={item.src}
                alt={item.title}
                width={0}
                height={0}
                sizes="100vw"
                quality={90}
                priority
                className="rounded-lg object-contain"
                style={{
                  width: "auto",
                  height: "auto",
                  maxWidth: "100%",
                  maxHeight: "100%",
                  boxShadow: `0 20px 80px ${accent}33`,
                }}
              />
            )}
          </motion.div>
        </AnimatePresence>

        <button
          onClick={(e) => { e.stopPropagation(); next(); }}
          aria-label="Next"
          className="absolute right-2 z-10 rounded-full bg-black/50 p-2.5 text-white transition hover:bg-black/80 lg:right-5"
          style={{ border: "1px solid rgba(255,255,255,0.18)" }}
        >
          <ChevronRight size={22} />
        </button>
      </div>

      {/* thumbnail strip */}
      <div
        ref={thumbsRef}
        onClick={(e) => e.stopPropagation()}
        className="flex gap-2 overflow-x-auto px-4 py-3 lg:justify-center lg:px-6"
      >
        {items.map((t, i) => (
          <button
            key={t.src + i}
            data-active={i === index}
            onClick={() => setIndex(i)}
            aria-label={`Go to ${t.title}`}
            className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-md transition"
            style={{
              opacity: i === index ? 1 : 0.45,
              outline: i === index ? `2px solid ${accent}` : "none",
              outlineOffset: 2,
            }}
          >
            {t.type === "video" ? (
              <>
                <video src={`${enc(t.src)}#t=0.1`} muted preload="metadata" className="h-full w-full object-cover" />
                <Play size={12} className="absolute left-1 top-1 fill-white text-white" />
              </>
            ) : (
              <Image src={t.src} alt="" fill sizes="56px" quality={50} className="object-cover" />
            )}
          </button>
        ))}
      </div>
    </motion.div>
  );
}

// ── Main component ─────────────────────────────────────────
export default function DesignPortfolio({ theme = "fantasy-morning" }) {
  const t = THEMES[theme] || THEMES["fantasy-morning"];
  const [projectIdx, setProjectIdx] = useState(0);
  const [filter, setFilter] = useState("All");
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [openIndex, setOpenIndex] = useState(null);

  const project = DESIGN_PROJECTS[projectIdx];
  const accent = project.accent;

  // Filters: All / Images / Videos, plus any categories the project defines.
  const filters = useMemo(() => {
    const hasImg = project.media.some((m) => m.type === "image");
    const hasVid = project.media.some((m) => m.type === "video");
    const cats = [...new Set(project.media.map((m) => m.category).filter(Boolean))];
    return ["All", ...(hasImg && hasVid ? ["Images", "Videos"] : []), ...cats];
  }, [project]);

  const filtered = useMemo(() => {
    if (filter === "All") return project.media;
    if (filter === "Images") return project.media.filter((m) => m.type === "image");
    if (filter === "Videos") return project.media.filter((m) => m.type === "video");
    return project.media.filter((m) => m.category === filter);
  }, [project, filter]);

  const shown = filtered.slice(0, visible);
  const remaining = filtered.length - shown.length;

  const switchProject = (i) => {
    setProjectIdx(i);
    setFilter("All");
    setVisible(PAGE_SIZE);
    setOpenIndex(null);
  };
  const switchFilter = (f) => {
    setFilter(f);
    setVisible(PAGE_SIZE);
  };

  return (
    <div
      className="relative min-h-screen"
      style={{ background: t.bgGradient, color: t.text, fontFamily: t.fontFamily }}
    >
      {/* Header + project tabs */}
      <header
        className="sticky top-0 z-30 backdrop-blur-md"
        style={{ borderBottom: `1px solid ${t.border}`, background: t.panel }}
      >
        <div className="mx-auto max-w-7xl px-4 pt-4 lg:px-6 lg:pt-5">
          <h1 className="text-2xl font-bold lg:text-3xl">Design Works</h1>

          <nav className="-mx-1 mt-3 flex gap-1 overflow-x-auto pb-0" aria-label="Projects">
            {DESIGN_PROJECTS.map((p, i) => {
              const active = i === projectIdx;
              return (
                <button
                  key={p.id}
                  onClick={() => switchProject(i)}
                  aria-current={active ? "page" : undefined}
                  className="relative flex-shrink-0 whitespace-nowrap px-3 py-2.5 text-sm font-semibold transition-colors"
                  style={{ color: active ? t.text : t.labelText }}
                >
                  {p.title}
                  <span
                    className="ml-2 rounded-full px-2 py-0.5 text-[11px] font-mono"
                    style={{ background: `${p.accent}${active ? "33" : "1a"}`, color: p.accent }}
                  >
                    {p.media.length}
                  </span>
                  {active && (
                    <motion.span
                      layoutId="tab-underline"
                      className="absolute inset-x-2 -bottom-px h-0.5 rounded-full"
                      style={{ background: p.accent }}
                    />
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 lg:px-6 lg:py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-12">
          {/* Project info */}
          <aside className="lg:sticky lg:top-32 lg:h-fit">
            <AnimatePresence mode="wait">
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <h2 className="text-2xl font-bold leading-tight lg:text-3xl">{project.title}</h2>
                <p className="mt-1.5 text-sm" style={{ color: t.subText }}>{project.subtitle}</p>
                <div className="my-5 h-1 w-12 rounded-full" style={{ background: accent }} />

                <p className="text-sm leading-relaxed" style={{ color: t.subText }}>{project.description}</p>

                <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <dt className="text-xs" style={{ color: t.labelText }}>Period</dt>
                    <dd className="mt-1 flex items-center gap-2">
                      <Calendar size={14} style={{ color: accent }} />
                      <span>{project.period}</span>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs" style={{ color: t.labelText }}>Assets</dt>
                    <dd className="mt-1 flex items-center gap-2">
                      <Layers size={14} style={{ color: accent }} />
                      <span>{project.media.length} items</span>
                    </dd>
                  </div>
                </dl>

                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full px-3 py-1 text-xs"
                      style={{ background: `${accent}1f`, border: `1px solid ${accent}44` }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="mb-2 mt-7 text-xs" style={{ color: t.labelText }}>Skills used</p>
                <ul className="flex flex-wrap gap-1.5">
                  {project.skills.map((s) => (
                    <li
                      key={s}
                      className="rounded-md px-2.5 py-1 text-xs"
                      style={{ background: t.chip, border: `1px solid ${t.border}` }}
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </aside>

          {/* Gallery */}
          <section aria-label={`${project.title} gallery`} className="min-w-0">
            {/* filters */}
            {filters.length > 2 && (
              <div className="-mx-1 mb-5 flex gap-2 overflow-x-auto px-1 pb-2">
                {filters.map((f) => {
                  const active = f === filter;
                  return (
                    <button
                      key={f}
                      onClick={() => switchFilter(f)}
                      className="flex-shrink-0 rounded-full px-3.5 py-1.5 text-xs transition"
                      style={{
                        background: active ? accent : t.chip,
                        color: active ? "#fff" : t.text,
                        border: `1px solid ${active ? accent : t.border}`,
                      }}
                    >
                      {f}
                    </button>
                  );
                })}
              </div>
            )}

            <p className="mb-4 text-xs" style={{ color: t.labelText }}>
              Showing {shown.length} of {filtered.length}
            </p>

            {/* Masonry: columns keep every asset's real aspect ratio */}
            <div className="columns-2 gap-3 md:columns-3 xl:columns-4 lg:gap-4">
              {shown.map((item, i) => (
                <div key={`${project.id}-${filter}-${item.src}-${i}`} className="mb-3 break-inside-avoid lg:mb-4">
                  <Tile item={item} accent={accent} theme={theme in THEMES ? theme : "fantasy-morning"} onOpen={() => setOpenIndex(i)} />
                </div>
              ))}
            </div>

            {remaining > 0 && (
              <div className="mt-8 flex justify-center">
                <button
                  onClick={() => setVisible((v) => v + PAGE_SIZE)}
                  className="rounded-full px-6 py-2.5 text-sm font-semibold transition hover:brightness-110"
                  style={{ background: accent, color: "#fff", boxShadow: `0 8px 24px ${accent}44` }}
                >
                  Show {Math.min(PAGE_SIZE, remaining)} more
                </button>
              </div>
            )}
          </section>
        </div>
      </main>

      <AnimatePresence>
        {openIndex !== null && (
          <Lightbox
            items={shown}
            startIndex={openIndex}
            accent={accent}
            onClose={() => setOpenIndex(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}