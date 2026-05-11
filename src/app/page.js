import AboutPage from "@/pages/aboutPage/aboutPage";
import ExperiencePage from "@/pages/experiencePage/experiencePage";
import HeroPage from "@/pages/hero/heroPage";

import SkillsPage from "@/pages/skillsPage/skillsPage";
import ThemeSwitcher from "./themeSwitch";
import ProjectsPage from "@/pages/projectPage/projectPage";

export default function Home() {
  return (
    <div className="w-full">
      <ThemeSwitcher />
      <HeroPage />
      <AboutPage />
      <ExperiencePage />
      <SkillsPage />
      <ProjectsPage />
    </div>
  );
}
