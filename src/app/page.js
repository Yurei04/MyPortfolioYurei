import AboutPage from "@/pages/aboutPage/aboutPage";
import ExperiencePage from "@/pages/experiencePage/experiencePage";
import HeroPage from "@/pages/hero/heroPage";
import ProjectPage from "@/pages/projectPage/projectPage";
import SkillsPage from "@/pages/skillsPage/skillsPage";
import ThemeSwitcher from "./themeSwitch";

export default function Home() {
  return (
    <div className="w-full">
      <ThemeSwitcher />
      <HeroPage />
      <AboutPage />
      <ExperiencePage />
      <SkillsPage />
      <ProjectPage />
    </div>
  );
}
