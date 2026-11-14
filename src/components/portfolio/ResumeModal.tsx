import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Printer, Copy, Check, Download, ExternalLink, Mail, Phone, MapPin, Linkedin } from "lucide-react";
import { PORTFOLIO_DATA } from "../../data/portfolioData";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    const text = `
HARISH R
IT FRESHER | DATA ANALYST
Vellore, India | +91 9080342603 | harishrk28@gmail.com
LinkedIn: linkedin.com/in/harish-r-217474270

PROFESSIONAL SUMMARY
${PORTFOLIO_DATA.summary}

TECHNICAL SKILLS
Programming: Python, C, C++
Web Technologies: HTML5, CSS3
Database: SQL (Beginner)
Areas of Interest: Data Analytics, Machine Learning, Computer Vision, Web Development

PROJECTS
1. Distraction Prediction (Machine Learning | Computer Vision)
• Developed a model to detect and predict driver distraction using image and sensor data.
• Applied feature extraction and classification techniques to support prediction.
• Evaluated model performance using datasets.

2. Heart Disease Prediction (Healthcare Analytics | Machine Learning)
• Built a predictive model to estimate heart disease risk using clinical data.
• Used Logistic Regression, Random Forest, and Support Vector Machine (SVM) classification algorithms.
• Applied feature selection and hyperparameter tuning to improve model performance.

EDUCATION
• Master of Computer Applications (MCA) | Meenakshi College of Engineering, Chennai (2025 – 2027, Pursuing)
• Bachelor of Computer Applications (BCA) | Voorhees College, Vellore (2022 – 2025)
• Higher Secondary Certificate (HSC) | Government Higher Secondary School, Chinnapallikuppam, Vellore (2021 – 2022)
• Secondary School Leaving Certificate (SSLC) | Government High School, Melpallipattu, Vellore (2019 – 2020)

CERTIFICATIONS
• Java Foundations — Great Learning Academy
• Big Data Analytics — Great Learning Academy

STRENGTHS
• Analytical and problem-solving skills
• Effective communication
• Quick learner
• Collaborative team player
• Attention to detail

LANGUAGES
Tamil, English
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        />

        {/* Modal Dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl bg-[#0e0f13] border border-white/20 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col z-10"
        >
          {/* Header Action Bar */}
          <div className="px-6 py-4 bg-[#14151a] border-b border-white/10 flex items-center justify-between shrink-0 font-mono text-xs">
            <div className="flex items-center gap-2 text-white">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="font-bold tracking-wider">HARISH_R_CURRICULUM_VITAE.PDF</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyText}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-white/5 border border-white/10 text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "COPIED" : "COPY TEXT"}</span>
              </button>

              <button
                onClick={handlePrint}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-white text-black font-semibold hover:bg-zinc-200 transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>PRINT / SAVE PDF</span>
              </button>

              <button
                onClick={onClose}
                className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors ml-2"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Printable Resume Content Container */}
          <div className="p-6 sm:p-10 overflow-y-auto space-y-8 font-sans text-zinc-300 print:text-black print:bg-white">
            {/* Header Lockup */}
            <div className="border-b border-white/10 pb-6 text-center sm:text-left sm:flex sm:items-start sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-display font-extrabold uppercase tracking-tight text-white print:text-black">
                  HARISH R
                </h1>
                <div className="text-sm font-mono text-emerald-400 font-semibold uppercase tracking-wider mt-1 print:text-emerald-700">
                  IT FRESHER | DATA ANALYST
                </div>
              </div>

              <div className="mt-4 sm:mt-0 font-mono text-xs text-zinc-400 space-y-1 sm:text-right print:text-zinc-700">
                <div className="flex items-center sm:justify-end gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Vellore, Tamil Nadu, India</span>
                </div>
                <div className="flex items-center sm:justify-end gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-zinc-400" />
                  <span>+91 9080342603</span>
                </div>
                <div className="flex items-center sm:justify-end gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-zinc-400" />
                  <span>harishrk28@gmail.com</span>
                </div>
                <div className="flex items-center sm:justify-end gap-1.5">
                  <Linkedin className="w-3.5 h-3.5 text-zinc-400" />
                  <span>linkedin.com/in/harish-r-217474270</span>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div>
              <h2 className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold border-b border-white/10 pb-1.5 mb-3 print:text-emerald-700 print:border-zinc-300">
                PROFESSIONAL SUMMARY
              </h2>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans print:text-zinc-800">
                {PORTFOLIO_DATA.summary}
              </p>
            </div>

            {/* Technical Skills */}
            <div>
              <h2 className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold border-b border-white/10 pb-1.5 mb-3 print:text-emerald-700 print:border-zinc-300">
                TECHNICAL SKILLS
              </h2>
              <div className="space-y-1.5 text-xs sm:text-sm font-sans">
                <div>
                  <span className="font-mono font-semibold text-white print:text-black">Programming: </span>
                  <span className="text-zinc-300 print:text-zinc-800">Python, C, C++</span>
                </div>
                <div>
                  <span className="font-mono font-semibold text-white print:text-black">Web Technologies: </span>
                  <span className="text-zinc-300 print:text-zinc-800">HTML5, CSS3</span>
                </div>
                <div>
                  <span className="font-mono font-semibold text-white print:text-black">Database: </span>
                  <span className="text-zinc-300 print:text-zinc-800">SQL (Beginner)</span>
                </div>
                <div>
                  <span className="font-mono font-semibold text-white print:text-black">Areas of Interest: </span>
                  <span className="text-zinc-300 print:text-zinc-800">Data Analytics, Machine Learning, Computer Vision, Web Development</span>
                </div>
              </div>
            </div>

            {/* Projects */}
            <div>
              <h2 className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold border-b border-white/10 pb-1.5 mb-3 print:text-emerald-700 print:border-zinc-300">
                PROJECTS
              </h2>
              <div className="space-y-4">
                {PORTFOLIO_DATA.projects.map((proj) => (
                  <div key={proj.id} className="space-y-1 text-xs sm:text-sm">
                    <div className="flex flex-wrap items-baseline justify-between">
                      <span className="font-mono font-bold text-white uppercase print:text-black text-sm">
                        {proj.title}
                      </span>
                      <span className="text-xs font-mono text-zinc-400 print:text-zinc-600">
                        {proj.category}
                      </span>
                    </div>
                    <ul className="list-disc list-inside space-y-1 text-zinc-300 print:text-zinc-800 text-xs sm:text-sm pl-1">
                      {proj.bullets.map((bullet, idx) => (
                        <li key={idx}>{bullet}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div>
              <h2 className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold border-b border-white/10 pb-1.5 mb-3 print:text-emerald-700 print:border-zinc-300">
                EDUCATION
              </h2>
              <div className="space-y-3">
                {PORTFOLIO_DATA.education.map((edu) => (
                  <div key={edu.degree} className="flex flex-wrap items-start justify-between text-xs sm:text-sm">
                    <div>
                      <div className="font-bold text-white print:text-black">{edu.degree}</div>
                      <div className="text-zinc-400 print:text-zinc-600">{edu.institution}, {edu.location}</div>
                    </div>
                    <div className="font-mono text-xs text-zinc-400 print:text-zinc-600 font-medium">
                      {edu.period} {edu.status ? `(${edu.status})` : ""}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div>
              <h2 className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold border-b border-white/10 pb-1.5 mb-3 print:text-emerald-700 print:border-zinc-300">
                CERTIFICATIONS
              </h2>
              <div className="space-y-1 text-xs sm:text-sm">
                {PORTFOLIO_DATA.certifications.map((c) => (
                  <div key={c.title} className="text-zinc-300 print:text-zinc-800">
                    &bull; <span className="font-semibold text-white print:text-black">{c.title}</span> &mdash; {c.issuer}
                  </div>
                ))}
              </div>
            </div>

            {/* Strengths & Languages */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <h2 className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold border-b border-white/10 pb-1.5 mb-2 print:text-emerald-700 print:border-zinc-300">
                  STRENGTHS
                </h2>
                <div className="text-xs sm:text-sm text-zinc-300 print:text-zinc-800 space-y-1">
                  <div>&bull; Analytical and problem-solving skills</div>
                  <div>&bull; Effective communication; quick learner</div>
                  <div>&bull; Collaborative team player; attention to detail</div>
                </div>
              </div>

              <div>
                <h2 className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold border-b border-white/10 pb-1.5 mb-2 print:text-emerald-700 print:border-zinc-300">
                  LANGUAGES
                </h2>
                <div className="text-xs sm:text-sm text-zinc-300 print:text-zinc-800">
                  Tamil (Native), English (Professional)
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
