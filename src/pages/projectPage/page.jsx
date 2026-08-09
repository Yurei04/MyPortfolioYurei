"use client";

import { useTheme } from "@/app/themeProvider";
import DesignPortfolioShowcase from "@/components/projectsComp/DesignProjectShowCase";
import TechProjectShowCase from "@/components/projectsComp/TechProjectShowCase";

export default function ProjectsPage() {
  const { theme } = useTheme();

  const isDesignMode = theme.includes("fantasy");
  const isMorning = theme === "fantasy-morning";
  const isNight = theme === "fantasy-night";

  return (
    <div
      className="min-h-screen w-full transition-all duration-500"
      style={{
        backgroundImage: isMorning
          ? "url('/images/fantasyImages/morning/bkg3Morning.png')"
          : isNight
          ? "url('/images/fantasyImages/night/bkg3Night.png')"
          : "url('/images/tech-background.png')",
        backgroundSize: "cover",    
        backgroundPosition: "center", 
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed" 
      }}
    >
      {isDesignMode ? (
        <DesignPortfolioShowcase theme={theme} />
      ) : (
        <TechProjectShowCase />
      )}
    </div>
  );
}