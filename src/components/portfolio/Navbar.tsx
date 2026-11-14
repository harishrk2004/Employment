import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, Copy, Check, FileText, Menu, X } from "lucide-react";
import { PORTFOLIO_DATA } from "../../data/portfolioData";

interface NavbarProps {
  onOpenResume: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResume, activeSection }) => {
  const [time, setTime] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [backendOnline, setBackendOnline] = useState<boolean | null>(null);

  useEffect(() => {
    // Check backend connection health
    fetch("/api/health")
      .then((r) => r.ok ? r.json() : null)
      .then((d) => setBackendOnline(d?.status === "connected"))
      .catch(() => setBackendOnline(false));

    const updateTime = () => {
      const now = new Date();
      // Format to Indian Standard Time (IST)
      const istString = now.toLocaleTimeString("en-GB", {
        timeZone: "Asia/Kolkata",
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setTime(istString);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const navLinks = [
    { label: "INDEX", href: "#hero" },
    { label: "WORKS", href: "#projects" },
    { label: "SKILLS", href: "#skills" },
    { label: "TIMELINE", href: "#timeline" },
    { label: "CERTS", href: "#certifications" },
    { label: "CONTACT", href: "#contact" },
  ];

  return (
    <>
      {/* Top Editorial Status Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#09090b]/85 backdrop-blur-md border-b border-white/10 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand & Identity */}
          <div className="flex items-center gap-3">
            <a href="#hero" className="group flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-white group-hover:bg-emerald-400 transition-colors" />
              <span className="font-mono text-sm font-bold tracking-tight text-white uppercase group-hover:text-emerald-400 transition-colors">
                {PORTFOLIO_DATA.personal.name}
              </span>
            </a>
            <span className="hidden sm:inline-block text-white/20">|</span>
            <span className="hidden sm:inline-block text-[11px] font-mono text-zinc-400 tracking-wider">
              DATA ANALYST &bull; MCA '27
            </span>
          </div>

          {/* Center Info: Time & Availability Status */}
          <div className="hidden md:flex items-center gap-4 text-xs font-mono text-zinc-400">
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-zinc-200">OPEN TO WORK</span>
            </div>

            {/* Backend connectivity indicator */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/5 text-[11px]">
              <span
                className={`w-2 h-2 rounded-full ${
                  backendOnline === true
                    ? "bg-emerald-400"
                    : backendOnline === false
                    ? "bg-amber-400"
                    : "bg-zinc-500 animate-pulse"
                }`}
              />
              <span className="text-zinc-300">
                {backendOnline === true ? "API ONLINE" : backendOnline === false ? "API STANDBY" : "CHECKING API"}
              </span>
            </div>

            <span className="text-white/20">&bull;</span>
            <div className="text-zinc-400">
              <span className="text-zinc-500 mr-1.5">IST</span>
              <span className="text-zinc-200 tabular-nums">{time || "20:00:00"}</span>
              <span className="text-zinc-500 ml-1.5">VELLORE, IN</span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={handleCopyEmail}
              title="Copy Email Address"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono border border-white/10 bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white transition-all"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">COPIED</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-zinc-400" />
                  <span className="hidden sm:inline">EMAIL</span>
                </>
              )}
            </button>

            <button
              onClick={onOpenResume}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono border border-white/20 bg-white text-black hover:bg-zinc-200 font-semibold transition-all"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>RESUME</span>
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 rounded text-zinc-400 hover:text-white border border-white/10"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-white/10 bg-[#09090b] px-4 py-4 space-y-2 font-mono text-xs"
            >
              <div className="flex items-center justify-between pb-2 border-b border-white/5 text-zinc-400">
                <span>LOCAL TIME: {time} IST</span>
                <span className="text-emerald-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  AVAILABLE
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-2">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded bg-white/[0.02] border border-white/5 hover:bg-white/5 text-zinc-300 hover:text-white"
                  >
                    // {link.label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Floating Center Dock Navigation (Vertical Framer Style) */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 hidden md:block">
        <div className="flex items-center gap-1 px-3 py-2 rounded-full bg-[#111216]/90 backdrop-blur-lg border border-white/15 shadow-2xl">
          {navLinks.map((link) => {
            const isActive = activeSection === link.label.toLowerCase();
            return (
              <a
                key={link.label}
                href={link.href}
                className={`relative px-3.5 py-1.5 text-xs font-mono tracking-wider transition-colors duration-200 ${
                  isActive ? "text-white font-semibold" : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activePillNav"
                    className="absolute inset-0 rounded-full bg-white/10 border border-white/20"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </a>
            );
          })}
        </div>
      </nav>
    </>
  );
};
