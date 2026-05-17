
import ExperiencePage from "@/pages/experiencePage/page";
import HeroPage from "@/pages/hero/page";
import SkillsPage from "@/pages/skillsPage/page"; 
import ThemeSwitcher from "./themeSwitch"; 
import ProjectsPage from "@/pages/projectPage/page";
import ContactPage from "@/pages/contactPage/page";

export default function Home() {
  return (
    <div className="w-full">
      <ThemeSwitcher />
      <HeroPage />
      <ExperiencePage />
      <SkillsPage />
      <ProjectsPage />
      <ContactPage />
    </div>
  );
}
