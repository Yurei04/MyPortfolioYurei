"use client";

import { motion } from "framer-motion";
import ExperiencePage from "@/pages/experiencePage/page";
import HeroPage from "@/pages/hero/page";
import SkillsPage from "@/pages/skillsPage/page"; 
import ThemeSwitcher from "./themeSwitch"; 
import ProjectsPage from "@/pages/projectPage/page";
import ContactPage from "@/pages/contactPage/page";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -50,
    transition: {
      duration: 0.6,
      ease: "easeIn",
    },
  },
};

export default function Home() {
  return (
    <motion.div 
      className="w-full"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div 
        variants={sectionVariants}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <ThemeSwitcher />
      </motion.div>

      <motion.div
        variants={sectionVariants}
        whileInView="visible"
        initial="hidden"
        exit="exit"
        viewport={{ once: false, amount: 0.3 }}
      >
        <HeroPage />
      </motion.div>

      <motion.div
        variants={sectionVariants}
        whileInView="visible"
        initial="hidden"
        exit="exit"
        viewport={{ once: false, amount: 0.3 }}
      >
        <ExperiencePage />
      </motion.div>

      <motion.div
        variants={sectionVariants}
        whileInView="visible"
        initial="hidden"
        exit="exit"
        viewport={{ once: false, amount: 0.3 }}
      >
        <SkillsPage />
      </motion.div>

      <ProjectsPage />

      <motion.div
        variants={sectionVariants}
        whileInView="visible"
        initial="hidden"
        exit="exit"
        viewport={{ once: false, amount: 0.3 }}
      >
        <ContactPage />
      </motion.div>
    </motion.div>
  );
}