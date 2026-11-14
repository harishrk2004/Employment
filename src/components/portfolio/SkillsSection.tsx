import React, { useState } from "react";
import { motion } from "motion/react";
import { Terminal, Database, Layout, Brain, Code2, Sparkles, Check } from "lucide-react";
import { PORTFOLIO_DATA } from "../../data/portfolioData";

export const SkillsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const icons = [
    <Code2 key="code" className="w-4 h-4 text-emerald-400" />,
    <Brain key="brain" className="w-4 h-4 text-cyan-400" />,
    <Layout key="layout" className="w-4 h-4 text-amber-400" />,
    <Database key="db" className="w-4 h-4 text-rose-400" />,
  ];

  return (
    <section id="skills" className="py-20 sm:py-32 border-b border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-wrap items-end justify-between gap-4 pb-8 border-b border-white/10">
          <div>
            <div className="text-xs font-mono text-emerald-400 tracking-widest uppercase mb-2 flex items-center gap-2">
              <span>// 03 SPECIFICATIONS</span>
              <span className="text-white/20">&bull;</span>
              <span>COMPETENCIES</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold uppercase tracking-tight text-white">
              TECHNICAL MATRIX
            </h2>
          </div>
          <div className="text-xs font-mono text-zinc-400 max-w-sm text-right hidden sm:block">
            <span>FOUNDATIONAL SYSTEM LANGUAGES, STATISTICAL DATA PIPELINES, AND WEB FRAMEWORKS.</span>
          </div>
        </div>

        {/* Areas of Interest Banner */}
        <div className="mt-8 p-4 rounded-xl bg-white/[0.02] border border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>Primary Areas of Interest:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {["Data Analytics", "Machine Learning", "Computer Vision", "Web Development"].map((interest) => (
              <span
                key={interest}
                className="px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/10 border border-emerald-500/20 text-emerald-300"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>

        {/* 4-Pillar Disciplined Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {PORTFOLIO_DATA.skillCategories.map((cat, idx) => (
            <motion.div
              key={cat.index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-6 sm:p-8 rounded-xl bg-[#0c0d10] border border-white/10 flex flex-col justify-between hover:border-white/20 transition-all duration-300 group"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded bg-white/5 border border-white/10">
                      {icons[idx % icons.length]}
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                        PILLAR // {cat.index}
                      </div>
                      <h3 className="text-lg font-mono font-bold text-white uppercase tracking-wide">
                        {cat.name}
                      </h3>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-zinc-400 group-hover:text-emerald-400 transition-colors">
                    0{cat.skills.length} ITEMS
                  </span>
                </div>

                <p className="mt-3 text-xs text-zinc-400 font-sans leading-relaxed">
                  {cat.description}
                </p>

                {/* Skills List within Pillar */}
                <div className="mt-6 space-y-3">
                  {cat.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="p-3 rounded-lg bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-sm font-semibold text-white tracking-wide">
                          {skill.name}
                        </span>
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-emerald-400">
                          {skill.level}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-400 mt-1 font-sans">
                        {skill.highlight}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-zinc-400">
                <span>VERIFIED COURSEWORK &amp; LABS</span>
                <span>STATUS: ACTIVE</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
