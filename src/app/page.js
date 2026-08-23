"use client";

import { motion } from "framer-motion";
import HeroPage from "@/pages/hero/page";
import ThemeSwitcher from "./themeSwitch"; 
import ProjectsPage from "@/pages/projectPage/page";
import ContactPage from "@/pages/contactPage/page";
import dynamic from "next/dynamic";

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

const HeavyExperience = dynamic(() => 
  import("@/pages/experiencePage/page"),
  {
    loading: () => <p>Loading experience Page...</p>,
  }
)

const HeavySkills = dynamic(() => 
  import("@/pages/skillsPage/page"),
  {
    loading: () => <p>Loading Skills Page...</p>,
  }
)

const HeavyProjects = dynamic(() => 
  import("@/pages/projectPage/page"),
  {
    loading: () => <p>Loading Projects Page...</p>,
  }
)

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
        className="[content-contain] [content-visibility-auto] [contain-intrinsic-size-[0_800px]]"
      >
        <HeavyExperience />
      </motion.div>

      <motion.div
        variants={sectionVariants}
        whileInView="visible"
        initial="hidden"
        exit="exit"
        viewport={{ once: false, amount: 0.3 }}
        className="[content-contain] [content-visibility-auto] [contain-intrinsic-size-[0_800px]]"
      >
        <HeavySkills />
      </motion.div>

      <div className="[content-contain] [content-visibility-auto] [contain-intrinsic-size-[0_800px]]">
        <HeavyProjects />
      </div>

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