import React from "react";
import { motion } from "motion/react";
import { Award, CheckCircle2, Globe, Heart, ShieldCheck, Zap } from "lucide-react";
import { PORTFOLIO_DATA } from "../../data/portfolioData";

export const CertificationsSection: React.FC = () => {
  return (
    <section id="certifications" className="py-20 sm:py-32 border-b border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-wrap items-end justify-between gap-4 pb-8 border-b border-white/10">
          <div>
            <div className="text-xs font-mono text-emerald-400 tracking-widest uppercase mb-2 flex items-center gap-2">
              <span>// 05 ACCREDITATIONS</span>
              <span className="text-white/20">&bull;</span>
              <span>CREDENTIALS &amp; ATTRIBUTES</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold uppercase tracking-tight text-white">
              CERTIFICATIONS &amp; ATTRIBUTES
            </h2>
          </div>
          <div className="text-xs font-mono text-zinc-400 max-w-sm text-right hidden sm:block">
            <span>OFFICIAL INDUSTRY CERTIFICATES, COGNITIVE STRENGTHS, AND LINGUISTIC COMPETENCIES.</span>
          </div>
        </div>

        {/* Certifications Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {PORTFOLIO_DATA.certifications.map((cert, idx) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-6 sm:p-8 rounded-xl bg-[#0c0d10] border border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                        ACCREDITATION // 0{idx + 1}
                      </div>
                      <div className="text-xs font-mono text-emerald-400 font-semibold">
                        {cert.issuer}
                      </div>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 border border-white/10 text-zinc-300">
                    VERIFIED
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-display font-bold text-white uppercase mt-4">
                  {cert.title}
                </h3>
                <div className="text-xs font-mono text-zinc-400 mt-1 uppercase tracking-wider">
                  Category: {cert.category}
                </div>

                {/* Skills Learned in Cert */}
                <div className="mt-5 space-y-2">
                  <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-widest">
                    Key Competencies Mastered:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {cert.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded bg-white/[0.02] border border-white/5 text-xs font-mono text-zinc-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-zinc-400">
                <span>CREDENTIAL: {cert.credentialId}</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  AUTHENTICATED
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Strengths & Languages Dual Grid */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Professional Strengths */}
          <div className="lg:col-span-8 p-6 sm:p-8 rounded-xl bg-[#0c0d10] border border-white/10">
            <div className="flex items-center gap-2 pb-4 border-b border-white/10 text-xs font-mono text-zinc-400 uppercase tracking-widest">
              <Zap className="w-4 h-4 text-emerald-400" />
              <span>CORE PROFESSIONAL STRENGTHS</span>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PORTFOLIO_DATA.strengths.map((str, sIdx) => (
                <div
                  key={str.title}
                  className="p-3.5 rounded-lg bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors"
                >
                  <div className="flex items-center gap-2 text-xs font-mono font-semibold text-white tracking-wide">
                    <span className="text-emerald-400">0{sIdx + 1}.</span>
                    <span>{str.title}</span>
                  </div>
                  <p className="mt-1 text-xs text-zinc-400 font-sans leading-relaxed">
                    {str.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Languages Spoken */}
          <div className="lg:col-span-4 p-6 sm:p-8 rounded-xl bg-[#0c0d10] border border-white/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 pb-4 border-b border-white/10 text-xs font-mono text-zinc-400 uppercase tracking-widest">
                <Globe className="w-4 h-4 text-cyan-400" />
                <span>LANGUAGES PROFICIENCY</span>
              </div>

              <div className="mt-6 space-y-4">
                {PORTFOLIO_DATA.languages.map((lang) => (
                  <div
                    key={lang.name}
                    className="p-3.5 rounded-lg bg-white/[0.02] border border-white/5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-sm font-bold text-white uppercase">
                        {lang.name}
                      </span>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                        {lang.level}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 mt-1 font-sans">
                      {lang.note}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 text-[11px] font-mono text-zinc-400 flex items-center justify-between">
              <span>MULTILINGUAL</span>
              <span>GLOBAL COLLABORATION</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
