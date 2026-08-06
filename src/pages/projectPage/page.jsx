"use client";

import { useTheme } from "@/app/themeProvider";
import DesignPortfolioShowcase from "@/components/projectsComp/DesignProjectShowCase";
import TechProjectShowCase from "@/components/projectsComp/TechProjectShowCase";

export default function ProjectsPage() {
  const { theme } = useTheme();
  
  // Determine which showcase to display
  const isDesignMode = theme.includes("fantasy");

  return (
    <>
      {isDesignMode ? (
        // Design Mode: Scroll-driven visual portfolio
        <DesignPortfolioShowcase theme={theme} />
      ) : (
        // Tech Mode: Grid-based project showcase (unchanged)
        <TechProjectShowCase />
      )}
    </>
  );
}
