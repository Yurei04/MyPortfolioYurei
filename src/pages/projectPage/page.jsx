"use client";

import { useTheme } from "@/app/themeProvider";
import DesignPortfolioShowcase from "@/components/projectsComp/DesignProjectShowCase";
import TechProjectShowCase from "@/components/projectsComp/TechProjectShowCase";

export default function ProjectsPage() {
  const { theme } = useTheme();

  const isDesignMode = theme.includes("fantasy");

  return (
    <div
      className="min-h-screen w-full"
      style={{
        backgroundImage: isDesignMode
          ? "url('/images/fantasyImages/morning/bkg3Morning.png')"
          : "url(/images/fantasyImages/night/bkg3Night.png')",
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