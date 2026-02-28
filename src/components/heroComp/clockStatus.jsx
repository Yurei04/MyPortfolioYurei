"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/app/themeProvider";

const STATUS = "Available for work";

function useClock() {
  const [time, setTime] = useState(null);
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-PH", {
          hour: "2-digit", minute: "2-digit", second: "2-digit",
          hour12: false, timeZone: "Asia/Manila",
        })
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

// ── Colors per theme ──────────────────────────────────────
const CLOCK_THEME = {
  tech: {
    dotActive:    "rgba(147,197,253,0.95)",
    dotIdle:      "rgba(99,160,255,0.7)",
    dotGlowOn:    "0 0 0 3px rgba(59,130,246,0.2), 0 0 10px 3px rgba(29,78,216,0.5)",
    dotGlowOff:   "0 0 0 2px rgba(59,130,246,0.1)",
    timeColor:    "rgba(148,180,255,0.75)",
    tzColor:      "rgba(99,140,220,0.5)",
    statusColor:  "rgba(148,180,255,0.6)",
    greenDot:     "rgba(52,211,153,0.9)",
    greenRing:    "rgba(52,211,153,0.5)",
    greenShadow:  "0 0 6px 2px rgba(52,211,153,0.4)",
  },
  "fantasy-morning": {
    dotActive:    "rgba(80,180,80,0.95)",
    dotIdle:      "rgba(60,150,60,0.7)",
    dotGlowOn:    "0 0 0 3px rgba(60,150,60,0.2), 0 0 10px 3px rgba(40,130,40,0.4)",
    dotGlowOff:   "0 0 0 2px rgba(60,150,60,0.1)",
    timeColor:    "rgba(40,90,50,0.8)",
    tzColor:      "rgba(60,120,60,0.55)",
    statusColor:  "rgba(40,90,50,0.65)",
    greenDot:     "rgba(52,200,100,0.9)",
    greenRing:    "rgba(52,200,100,0.45)",
    greenShadow:  "0 0 6px 2px rgba(52,200,100,0.35)",
  },
  "fantasy-night": {
    dotActive:    "rgba(180,220,255,0.95)",
    dotIdle:      "rgba(139,196,248,0.7)",
    dotGlowOn:    "0 0 0 3px rgba(100,160,230,0.2), 0 0 10px 3px rgba(70,130,210,0.45)",
    dotGlowOff:   "0 0 0 2px rgba(70,130,210,0.1)",
    timeColor:    "rgba(139,196,248,0.78)",
    tzColor:      "rgba(100,150,210,0.52)",
    statusColor:  "rgba(139,196,248,0.62)",
    greenDot:     "rgba(80,220,160,0.9)",
    greenRing:    "rgba(80,220,160,0.45)",
    greenShadow:  "0 0 6px 2px rgba(80,220,160,0.35)",
  },
};

export default function ClockStatus() {
  const { theme } = useTheme();
  const c = CLOCK_THEME[theme] ?? CLOCK_THEME.tech;

  const time = useClock();
  const [secPulse, setSecPulse] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setSecPulse(true);
      setTimeout(() => setSecPulse(false), 400);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{ display: "inline-flex", flexDirection: "column", gap: 6, fontFamily: "'DM Mono', monospace" }}
    >
      {/* Clock row */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <motion.div
          animate={{
            boxShadow: secPulse ? c.dotGlowOn : c.dotGlowOff,
            background: secPulse ? c.dotActive : c.dotIdle,
          }}
          transition={{ duration: 0.25 }}
          style={{ width: 6, height: 6, borderRadius: "50%", flexShrink: 0 }}
        />

        <AnimatePresence mode="wait">
          {time && (
            <motion.span
              key={time}
              initial={{ opacity: 0.6 }}
              animate={{ opacity: 1 }}
              style={{
                color: c.timeColor,
                fontSize: "0.68rem",
                letterSpacing: "0.18em",
                transition: "color 0.5s",
              }}
            >
              {time}
            </motion.span>
          )}
        </AnimatePresence>

        <span style={{ color: c.tzColor, fontSize: "0.55rem", letterSpacing: "0.12em", textTransform: "uppercase", transition: "color 0.5s" }}>
          PHT
        </span>
      </div>

      {/* Status row */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ position: "relative", width: 7, height: 7, flexShrink: 0 }}>
          <motion.span
            animate={{ scale: [1, 1.9, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute", inset: 0, borderRadius: "50%",
              background: c.greenRing,
            }}
          />
          <span
            style={{
              position: "absolute", inset: 0, borderRadius: "50%",
              background: c.greenDot,
              boxShadow: c.greenShadow,
              transition: "background 0.5s, box-shadow 0.5s",
            }}
          />
        </span>

        <span style={{ color: c.statusColor, fontSize: "0.58rem", letterSpacing: "0.14em", textTransform: "uppercase", transition: "color 0.5s" }}>
          {STATUS}
        </span>
      </div>
    </motion.div>
  );
}