import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, Cpu, Layers, Play, CheckCircle2, Sliders, Eye, Sparkles } from "lucide-react";
import { PORTFOLIO_DATA, ProjectItem } from "../../data/portfolioData";
import { DistractionSim } from "./DistractionSim";
import { HeartDiseaseSim } from "./HeartDiseaseSim";

export const ProjectsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("distraction-prediction");
  const [showSim, setShowSim] = useState<{ [key: string]: boolean }>({
    "distraction-prediction": true,
    "heart-disease-prediction": true,
  });

  return (
    <section id="projects" className="py-20 sm:py-32 border-b border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading in Vertical Framer Editorial Style */}
        <div className="flex flex-wrap items-end justify-between gap-4 pb-8 border-b border-white/10">
          <div>
            <div className="text-xs font-mono text-emerald-400 tracking-widest uppercase mb-2 flex items-center gap-2">
              <span>// 02 ARCHIVE</span>
              <span className="text-white/20">&bull;</span>
              <span>CASE STUDIES</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold uppercase tracking-tight text-white">
              SELECTED WORKS
            </h2>
          </div>
          <div className="text-xs font-mono text-zinc-400 max-w-sm text-right hidden sm:block">
            <span>MODULAR ARCHIVE OF PREDICTIVE ML MODELS, COMPUTER VISION, AND REAL-TIME SIGNAL ANALYTICS.</span>
          </div>
        </div>

        {/* Project Cards Stack */}
        <div className="mt-12 space-y-16 sm:space-y-24">
          {PORTFOLIO_DATA.projects.map((project, index) => {
            const isDistraction = project.id === "distraction-prediction";
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6 }}
                className="rounded-2xl border border-white/10 bg-[#0c0d11] overflow-hidden shadow-2xl"
              >
                {/* Card Top Ribbon */}
                <div className="px-6 py-4 border-b border-white/10 bg-white/[0.02] flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs px-2.5 py-1 rounded bg-white/5 border border-white/10 text-emerald-400 font-semibold">
                      {project.modNumber}
                    </span>
                    <span className="text-zinc-500 font-mono text-xs hidden sm:inline">&bull;</span>
                    <span className="text-zinc-400 font-mono text-xs uppercase tracking-wider">
                      {project.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 font-mono text-xs text-zinc-400">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>STATUS: VALIDATED</span>
                  </div>
                </div>

                {/* Project Details Grid */}
                <div className="p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-6 space-y-6">
                    <div>
                      <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-1">
                        {project.subCategory}
                      </div>
                      <h3 className="text-2xl sm:text-4xl font-display font-bold text-white uppercase tracking-tight">
                        {project.title}
                      </h3>
                      <p className="mt-3 text-sm sm:text-base text-zinc-300 font-sans leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Bullet Highlights */}
                    <div className="space-y-2.5 pt-2">
                      <div className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
                        Technical Deliverables:
                      </div>
                      {project.bullets.map((bullet, bIdx) => (
                        <div key={bIdx} className="flex items-start gap-3 text-xs sm:text-sm text-zinc-300">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{bullet}</span>
                        </div>
                      ))}
                    </div>

                    {/* Metrics Row */}
                    <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10 font-mono">
                      {project.metrics.map((m) => (
                        <div key={m.label} className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                          <div className="text-[10px] text-zinc-400 uppercase">{m.label}</div>
                          <div className="text-sm sm:text-base font-bold text-white mt-0.5">{m.value}</div>
                        </div>
                      ))}
                    </div>

                    {/* Tech Badges */}
                    <div className="pt-2">
                      <div className="text-xs font-mono text-zinc-400 uppercase tracking-widest mb-2">
                        Technologies &amp; Libraries:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {project.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 rounded text-xs font-mono bg-white/[0.03] border border-white/10 text-zinc-300 hover:text-white hover:border-white/20 transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Side: Interactive Live Simulation */}
                  <div className="lg:col-span-6">
                    <div className="mb-3 flex items-center justify-between font-mono text-xs">
                      <span className="text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Interactive Telemetry Playground</span>
                      </span>
                      <span className="text-[11px] text-zinc-400">TEST IN BROWSER</span>
                    </div>

                    {isDistraction ? <DistractionSim /> : <HeartDiseaseSim />}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
