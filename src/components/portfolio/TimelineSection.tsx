import React from "react";
import { motion } from "motion/react";
import { GraduationCap, MapPin, Calendar, CheckCircle2 } from "lucide-react";
import { PORTFOLIO_DATA } from "../../data/portfolioData";

export const TimelineSection: React.FC = () => {
  return (
    <section id="timeline" className="py-20 sm:py-32 border-b border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-wrap items-end justify-between gap-4 pb-8 border-b border-white/10">
          <div>
            <div className="text-xs font-mono text-emerald-400 tracking-widest uppercase mb-2 flex items-center gap-2">
              <span>// 04 CHRONOLOGY</span>
              <span className="text-white/20">&bull;</span>
              <span>ACADEMICS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold uppercase tracking-tight text-white">
              EDUCATION JOURNEY
            </h2>
          </div>
          <div className="text-xs font-mono text-zinc-400 max-w-sm text-right hidden sm:block">
            <span>FORMAL ACADEMIC DEGREES, HIGHER SECONDARY FOUNDATIONS, AND INSTITUTIONAL TRACK RECORDS.</span>
          </div>
        </div>

        {/* Timeline Flow */}
        <div className="mt-12 relative">
          {/* Subtle Vertical Center Guide Line */}
          <div className="hidden lg:block absolute left-8 top-4 bottom-4 w-px bg-gradient-to-b from-emerald-500/50 via-white/10 to-transparent" />

          <div className="space-y-8">
            {PORTFOLIO_DATA.education.map((item, idx) => (
              <motion.div
                key={item.degree}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative lg:pl-20 group"
              >
                {/* Timeline Node Point */}
                <div className="hidden lg:flex absolute left-6 top-8 -translate-x-1/2 w-5 h-5 rounded-full bg-[#09090b] border-2 border-emerald-400 items-center justify-center group-hover:scale-125 transition-transform">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                </div>

                <div className="p-6 sm:p-8 rounded-xl bg-[#0c0d10] border border-white/10 group-hover:border-white/20 transition-all duration-300">
                  <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-white/10">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs text-emerald-400 font-semibold uppercase tracking-wider">
                          [0{idx + 1}] ACADEMIC DEGREE
                        </span>
                        {item.status && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 uppercase">
                            {item.status}
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl sm:text-2xl font-display font-bold text-white uppercase mt-1">
                        {item.degree}
                      </h3>
                      <div className="text-sm text-zinc-300 font-sans mt-0.5 font-medium">
                        {item.institution}
                      </div>
                    </div>

                    <div className="flex flex-col sm:items-end gap-1 font-mono text-xs text-zinc-400">
                      <div className="flex items-center gap-1.5 text-zinc-200">
                        <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{item.period}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-zinc-400">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{item.location}</span>
                      </div>
                    </div>
                  </div>

                  <p className="mt-4 text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
                    {item.description}
                  </p>

                  {item.highlights && item.highlights.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-white/5 flex flex-wrap gap-2">
                      {item.highlights.map((h, hIdx) => (
                        <div
                          key={hIdx}
                          className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/[0.02] border border-white/5 text-[11px] font-mono text-zinc-300"
                        >
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
