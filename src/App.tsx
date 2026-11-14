import React, { useState, useEffect } from "react";
import { Navbar } from "./components/portfolio/Navbar";
import { HeroSection } from "./components/portfolio/HeroSection";
import { ProjectsSection } from "./components/portfolio/ProjectsSection";
import { SkillsSection } from "./components/portfolio/SkillsSection";
import { TimelineSection } from "./components/portfolio/TimelineSection";
import { CertificationsSection } from "./components/portfolio/CertificationsSection";
import { ContactSection } from "./components/portfolio/ContactSection";
import { ResumeModal } from "./components/portfolio/ResumeModal";

export default function App() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  // Intersection observer or scroll spy to update the floating dock navigation
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "projects", "skills", "timeline", "certifications", "contact"];
      const scrollPosition = window.scrollY + 250;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId === "hero" ? "index" : sectionId === "certifications" ? "certs" : sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f4f5] selection:bg-emerald-400 selection:text-black">
      {/* Top Navbar & Floating Dock */}
      <Navbar
        onOpenResume={() => setIsResumeOpen(true)}
        activeSection={activeSection}
      />

      {/* Main Portfolio Sections */}
      <main>
        <HeroSection onOpenResume={() => setIsResumeOpen(true)} />
        <ProjectsSection />
        <SkillsSection />
        <TimelineSection />
        <CertificationsSection />
        <ContactSection />
      </main>

      {/* Curriculum Vitae Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  );
}
