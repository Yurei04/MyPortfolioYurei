"use client";

import { useTheme } from "./themeProvider";

export default function ThemeSwitcher() {
  const { theme, setTheme, isFantasy, isNight, toggleDayNight } = useTheme();

  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2
                    bg-black/35 backdrop-blur-xl border border-white/10
                    rounded-full px-2 py-1.5 shadow-xl">

      {/* Tech Button */}
      <button
        onClick={() => setTheme("tech")}
        className={`rounded-full px-4 py-1.5 text-xs font-semibold tracking-widest uppercase
                    transition-all duration-300 cursor-pointer
                    ${theme === "tech"
                      ? "bg-accent text-black shadow-accent"
                      : "text-white/50 hover:text-white hover:bg-white/10"
                    }`}
      >
        Tech
      </button>

      {/* Fantasy Button */}
      <button
        onClick={() => setTheme(isNight ? "fantasy-night" : "fantasy-morning")}
        className={`rounded-full px-4 py-1.5 text-xs font-semibold tracking-widest uppercase
                    transition-all duration-300 cursor-pointer
                    ${isFantasy
                      ? "bg-accent text-black shadow-accent"
                      : "text-white/50 hover:text-white hover:bg-white/10"
                    }`}
      >
        Fantasy
      </button>

      {/* Day / Night Toggle — only visible in Fantasy */}
      <div
        className={`flex items-center gap-1.5 px-1 transition-all duration-300
                    ${isFantasy ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      >
        <span className="text-sm">☀️</span>

        <button
          onClick={toggleDayNight}
          aria-label="Toggle day and night"
          className={`relative w-11 h-6 rounded-full border transition-all duration-300 cursor-pointer
                      ${isNight
                        ? "bg-[rgba(139,196,248,0.25)] border-white/20"
                        : "bg-white/15 border-white/15"
                      }`}
        >
          <span
            className={`absolute top-[3px] left-[3px] w-4 h-4 rounded-full shadow-md
                        transition-all duration-300
                        ${isNight ? "translate-x-5 bg-[#8bc4f8]" : "translate-x-0 bg-white"}`}
          />
        </button>

        <span className="text-sm">🌙</span>
      </div>

    </div>
  );
}