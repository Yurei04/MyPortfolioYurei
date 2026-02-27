"use client";

import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {

  const [theme, setThemeState] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("portfolio-theme") || "tech";
    }
    return "tech";
  });

  const setTheme = (newTheme) => {
    setThemeState(newTheme);
  };

  // Sync DOM + localStorage when theme changes
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  const isFantasy = theme.startsWith("fantasy");
  const isNight = theme === "fantasy-night";
  const toggleDayNight = () =>
    setTheme(isNight ? "fantasy-morning" : "fantasy-night");

  return (
    <ThemeContext.Provider
      value={{ theme, setTheme, isFantasy, isNight, toggleDayNight }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
}