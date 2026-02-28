"use client";

import { useTheme } from "./themeProvider";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Computer, Moon, Sparkles, Sun } from "lucide-react"

// ── Toast messages per theme ───────────────────────────────
const TOAST_MESSAGES = {
  tech:              { icon: "⌨️", title: "Developer Mode",  sub: "Switching to the tech world" },
  "fantasy-morning": { icon: "🌿", title: "Fantasy — Dawn",  sub: "The world wakes in golden light" },
  "fantasy-night":   { icon: "🌙", title: "Fantasy — Night", sub: "Stars light the ancient ruins" },
};

// ── Active pill colors per theme ───────────────────────────
const ACTIVE_STYLE = {
  tech: {
    bg:     "rgba(30, 80, 220, 0.75)",
    border: "rgba(99,160,255,0.55)",
    shadow: "0 0 20px rgba(60,120,255,0.4), inset 0 1px 0 rgba(255,255,255,0.15)",
    color:  "rgba(220,235,255,1)",
  },
  "fantasy-morning": {
    bg:     "rgba(50, 130, 55, 0.72)",
    border: "rgba(100,200,100,0.5)",
    shadow: "0 0 20px rgba(60,160,60,0.35), inset 0 1px 0 rgba(255,255,255,0.15)",
    color:  "rgba(210,255,210,1)",
  },
  "fantasy-night": {
    bg:     "rgba(25, 55, 155, 0.72)",
    border: "rgba(139,196,248,0.45)",
    shadow: "0 0 20px rgba(100,160,240,0.35), inset 0 1px 0 rgba(255,255,255,0.15)",
    color:  "rgba(210,235,255,1)",
  },
};

function Toast({ message, visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 18, scale: 0.9,  filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0,   scale: 1,    filter: "blur(0px)" }}
          exit={{   opacity: 0, y: -12,  scale: 0.94, filter: "blur(4px)" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "fixed",
            top: 96,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 60,
            display: "flex",
            alignItems: "center",
            gap: 14,
            padding: "14px 22px 14px 14px",
            borderRadius: 18,
            background: "rgba(8, 12, 30, 0.70)",
            backdropFilter: "blur(28px) saturate(1.8)",
            WebkitBackdropFilter: "blur(28px) saturate(1.8)",
            border: "1px solid rgba(255,255,255,0.11)",
            boxShadow: "0 10px 50px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.07)",
            pointerEvents: "none",
            minWidth: 240,
            overflow: "hidden",
          }}
        >
          {/* Icon */}
          <div style={{
            width: 40, height: 40, borderRadius: 12, flexShrink: 0,
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "1.2rem",
          }}>
            {message.icon}
          </div>

          {/* Text */}
          <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <span style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.74rem", fontWeight: 600,
              letterSpacing: "0.06em",
              color: "rgba(255,255,255,0.92)",
            }}>
              {message.title}
            </span>
            <span style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.6rem",
              letterSpacing: "0.04em",
              color: "rgba(255,255,255,0.42)",
            }}>
              {message.sub}
            </span>
          </div>

          {/* Bottom progress bar */}
          <motion.div
            style={{
              position: "absolute",
              bottom: 0, left: 0,
              height: 2,
              borderRadius: "0 0 18px 18px",
              background: "linear-gradient(90deg, rgba(99,160,255,0.9), rgba(139,196,248,0.3))",
            }}
            initial={{ width: "100%" }}
            animate={{ width: "0%" }}
            transition={{ duration: 2.6, ease: "linear" }}
          />

          {/* Top shimmer */}
          <div style={{
            position: "absolute", top: 0, left: "10%", right: "10%", height: 1,
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
          }} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function ThemeSwitcher() {
  const { theme, setTheme, isFantasy, isNight, toggleDayNight } = useTheme();

  const [toast, setToast]         = useState(null);
  const [toastVisible, setVisible] = useState(false);
  const [timerId, setTimerId]      = useState(null);

  const fireToast = (t) => {
    if (timerId) clearTimeout(timerId);
    setToast(TOAST_MESSAGES[t]);
    setVisible(true);
    const id = setTimeout(() => setVisible(false), 2700);
    setTimerId(id);
  };

  const handleSetTheme = (t) => {
    setTheme(t);
    fireToast(t);
  };

  const handleToggle = () => {
    const next = isNight ? "fantasy-morning" : "fantasy-night";
    toggleDayNight();
    fireToast(next);
  };

  const act = ACTIVE_STYLE[theme] ?? ACTIVE_STYLE.tech;

  return (
    <>
      {/* ── Toast notification ── */}
      <Toast message={toast ?? TOAST_MESSAGES.tech} visible={toastVisible} />

      {/* ── Switcher pill ── */}
      <div
        style={{
          position: "fixed",
          top: 24,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 50,
          display: "flex",
          alignItems: "center",
          gap: 4,
          padding: "6px 8px",
          borderRadius: 999,
          background: "rgba(8, 12, 28, 0.52)",
          backdropFilter: "blur(32px) saturate(2)",
          WebkitBackdropFilter: "blur(32px) saturate(2)",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 16px 56px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.06)",
        }}
      >
        {/* Top inner shimmer */}
        <div style={{
          position: "absolute", top: 0, left: "20%", right: "20%", height: 1,
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.16), transparent)",
          pointerEvents: "none",
        }} />

        {/* ── Tech button ── */}
        <motion.button
          onClick={() => handleSetTheme("tech")}
          whileTap={{ scale: 0.94 }}
          style={{
            display: "flex", alignItems: "center", gap: 9,
            padding: "11px 26px",
            borderRadius: 999,
            background: theme === "tech" ? act.bg : "transparent",
            border: `1px solid ${theme === "tech" ? act.border : "transparent"}`,
            boxShadow: theme === "tech" ? act.shadow : "none",
            color: theme === "tech" ? act.color : "rgba(255,255,255,0.38)",
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.73rem", fontWeight: 600,
            letterSpacing: "0.13em", textTransform: "uppercase",
            cursor: "pointer",
            transition: "all 0.35s cubic-bezier(0.22,1,0.36,1)",
            whiteSpace: "nowrap",
          }}
          onMouseEnter={(e) => { if (theme !== "tech") e.currentTarget.style.color = "rgba(255,255,255,0.75)"; }}
          onMouseLeave={(e) => { if (theme !== "tech") e.currentTarget.style.color = "rgba(255,255,255,0.38)"; }}
        >
          <span style={{ fontSize: "1rem", lineHeight: 1 }}><Computer /></span>
          Tech
        </motion.button>

        {/* Divider */}
        <div style={{ width: 1, height: 26, background: "rgba(255,255,255,0.09)", flexShrink: 0 }} />

        {/* ── Fantasy button ── */}
        <motion.button
          onClick={() => handleSetTheme(isNight ? "fantasy-night" : "fantasy-morning")}
          whileTap={{ scale: 0.94 }}
          style={{
            display: "flex", alignItems: "center", gap: 9,
            padding: "11px 26px",
            borderRadius: 999,
            background: isFantasy ? act.bg : "transparent",
            border: `1px solid ${isFantasy ? act.border : "transparent"}`,
            boxShadow: isFantasy ? act.shadow : "none",
            color: isFantasy ? act.color : "rgba(255,255,255,0.38)",
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.73rem", fontWeight: 600,
            letterSpacing: "0.13em", textTransform: "uppercase",
            cursor: "pointer",
            transition: "all 0.35s cubic-bezier(0.22,1,0.36,1)",
            whiteSpace: "nowrap",
          }}
          onMouseEnter={(e) => { if (!isFantasy) e.currentTarget.style.color = "rgba(255,255,255,0.75)"; }}
          onMouseLeave={(e) => { if (!isFantasy) e.currentTarget.style.color = "rgba(255,255,255,0.38)"; }}
        >
          <span style={{ fontSize: "1rem", lineHeight: 1 }}><Sparkles /></span>
          Fantasy
        </motion.button>

        {/* ── Day/Night toggle — animates in when fantasy ── */}
        <AnimatePresence>
          {isFantasy && (
            <motion.div
              key="day-night"
              initial={{ width: 0, opacity: 0, marginLeft: 0 }}
              animate={{ width: "auto", opacity: 1, marginLeft: 4 }}
              exit={{   width: 0, opacity: 0, marginLeft: 0 }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              style={{ overflow: "hidden", display: "flex", alignItems: "center" }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8, paddingRight: 4 }}>
                {/* Divider */}
                <div style={{ width: 1, height: 26, background: "rgba(255,255,255,0.09)", flexShrink: 0 }} />

                <span style={{ fontSize: "0.9rem", lineHeight: 1 }}><Sun /></span>

                {/* Toggle */}
                <motion.button
                  onClick={handleToggle}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Toggle day and night"
                  style={{
                    position: "relative",
                    width: 54, height: 30,
                    borderRadius: 999, cursor: "pointer",
                    background: isNight
                      ? "rgba(25,55,150,0.6)"
                      : "rgba(220,160,20,0.3)",
                    border: `1px solid ${isNight ? "rgba(139,196,248,0.35)" : "rgba(255,200,50,0.4)"}`,
                    boxShadow: isNight
                      ? "0 0 14px rgba(100,160,240,0.3), inset 0 1px 0 rgba(255,255,255,0.08)"
                      : "0 0 14px rgba(255,190,30,0.25), inset 0 1px 0 rgba(255,255,255,0.08)",
                    flexShrink: 0,
                    transition: "background 0.4s, border-color 0.4s, box-shadow 0.4s",
                  }}
                >
                  <motion.span
                    animate={{ x: isNight ? 25 : 3 }}
                    transition={{ type: "spring", stiffness: 420, damping: 32 }}
                    style={{
                      position: "absolute",
                      top: 4, left: 0,
                      width: 20, height: 20,
                      borderRadius: "50%",
                      background: isNight
                        ? "linear-gradient(135deg, #b8dcff, #6aaee8)"
                        : "linear-gradient(135deg, #ffe566, #ffb820)",
                      boxShadow: isNight
                        ? "0 2px 8px rgba(100,160,240,0.55)"
                        : "0 2px 8px rgba(255,180,20,0.7)",
                    }}
                  />
                </motion.button>

                <span style={{ fontSize: "0.9rem", lineHeight: 1 }}><Moon /></span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}