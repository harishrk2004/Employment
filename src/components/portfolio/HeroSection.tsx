import React from "react";
import { motion } from "motion/react";
import { ArrowDown, ArrowUpRight, FileText, Linkedin, Mail, Phone, MapPin, Sparkles, Terminal } from "lucide-react";
import { PORTFOLIO_DATA } from "../../data/portfolioData";

interface HeroSectionProps {
  onOpenResume: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenResume }) => {
  return (
    <section id="hero" className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 border-b border-white/10 overflow-hidden">
      {/* Editorial Grid Background */}
      <div className="absolute inset-0 grid-hairline opacity-40 pointer-events-none" />

      {/* Atmospheric Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-emerald-500/10 via-cyan-500/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Editorial Subheader / Volume Tag */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10 font-mono text-xs text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="text-emerald-400">●</span>
            <span className="tracking-widest uppercase">PORTFOLIO INDEX // VOL. 01</span>
          </div>
          <div className="flex items-center gap-4">
            <span>LOCATION: VELLORE / CHENNAI, IN</span>
            <span className="text-white/20">/</span>
            <span>SYSTEM: ARCHIVE 2025–2027</span>
          </div>
        </div>

        {/* Main Hero Headline */}
        <div className="mt-10 sm:mt-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-4"
          >
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono tracking-wider text-emerald-400 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>IT FRESHER &bull; DATA ANALYST</span>
            </span>
            <span className="text-xs font-mono text-zinc-500">MCA CANDIDATE</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-7xl lg:text-8xl font-display font-extrabold uppercase tracking-tight text-white leading-[0.95]"
          >
            HARISH R
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-4 sm:mt-6 text-2xl sm:text-4xl lg:text-5xl font-display font-light text-zinc-400 tracking-tight"
          >
            BRIDGING <span className="text-white font-medium">DATA ANALYTICS</span> &amp; <span className="text-white font-medium">PREDICTIVE ML</span>
          </motion.div>
        </div>

        {/* Editorial Summary & Abstract */}
        <div className="mt-8 sm:mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-8 space-y-4"
          >
            <div className="text-xs font-mono text-zinc-400 uppercase tracking-widest flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              <span>PROFESSIONAL SUMMARY // MANIFESTO</span>
            </div>
            <p className="text-base sm:text-xl text-zinc-300 font-sans leading-relaxed font-normal">
              {PORTFOLIO_DATA.summary}
            </p>
          </motion.div>

          {/* Action Callout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-4 flex flex-col gap-3 justify-center"
          >
            <a
              href="#projects"
              className="flex items-center justify-between px-5 py-4 rounded-xl bg-white text-black font-mono font-semibold text-xs tracking-wider uppercase hover:bg-zinc-200 transition-all shadow-xl group"
            >
              <span>EXPLORE SELECTED WORKS</span>
              <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
            </a>

            <div className="grid grid-cols-2 gap-2">
              <a
                href={PORTFOLIO_DATA.personal.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-mono text-xs transition-all"
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>LINKEDIN</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500" />
              </a>

              <button
                onClick={onOpenResume}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-mono text-xs transition-all"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>VIEW CV</span>
              </button>
            </div>
          </motion.div>
        </div>

        {/* 4-Sector Structured Grid Metadata (Vertical Framer Signature) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-14 pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-mono"
        >
          {PORTFOLIO_DATA.stats.map((stat, idx) => (
            <div key={stat.label} className="p-4 rounded-lg bg-white/[0.02] border border-white/5">
              <div className="text-[11px] text-zinc-400 uppercase tracking-widest mb-1.5 flex items-center justify-between">
                <span>[0{idx + 1}] {stat.label}</span>
              </div>
              <div className="text-sm font-semibold text-white tracking-wide">
                {stat.value}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
