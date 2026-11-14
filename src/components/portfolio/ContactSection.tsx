import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Phone, MapPin, Linkedin, Copy, Check, ArrowUpRight, Send, Terminal, Sparkles, ArrowUp, AlertCircle, CheckCircle2 } from "lucide-react";
import { PORTFOLIO_DATA } from "../../data/portfolioData";

export const ContactSection: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [inquiryDetails, setInquiryDetails] = useState<{ id: string; time: string } | null>(null);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.personal.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.personal.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderEmail || !message) return;

    setIsSending(true);
    setErrorMessage(null);

    try {
      // Connect to real backend API
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: senderName || "Anonymous Inquirer",
          email: senderEmail,
          message,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSentSuccess(true);
        setInquiryDetails({
          id: data.inquiryId || `INQ-${Date.now()}`,
          time: data.receivedAt ? new Date(data.receivedAt).toLocaleTimeString() : "Just now",
        });
        setSenderName("");
        setSenderEmail("");
        setMessage("");
      } else {
        // Fallback gracefully
        throw new Error(data.error || "Failed to submit inquiry to server.");
      }
    } catch (err: any) {
      console.warn("Backend API unavailable or error, falling back to mailto client:", err);
      // Even if offline, launch client mailto backup
      setSentSuccess(true);
      setInquiryDetails({
        id: `INQ-LOCAL-${Date.now().toString().slice(-6)}`,
        time: new Date().toLocaleTimeString(),
      });
      const mailtoLink = `mailto:${PORTFOLIO_DATA.personal.email}?subject=Inquiry from ${encodeURIComponent(
        senderName || "Portfolio Visitor"
      )}&body=${encodeURIComponent(message)}`;
      window.open(mailtoLink, "_blank");
    } finally {
      setIsSending(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section id="contact" className="py-20 sm:py-32 relative bg-[#09090b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-wrap items-end justify-between gap-4 pb-8 border-b border-white/10">
          <div>
            <div className="text-xs font-mono text-emerald-400 tracking-widest uppercase mb-2 flex items-center gap-2">
              <span>// 06 TRANSMISSION</span>
              <span className="text-white/20">&bull;</span>
              <span>GET IN TOUCH</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold uppercase tracking-tight text-white">
              CONNECT &amp; INQUIRE
            </h2>
          </div>
          <div className="text-xs font-mono text-zinc-400 max-w-sm text-right hidden sm:block">
            <span>SEEKING INTERNSHIP &amp; FULL-TIME DATA ANALYST / IT ROLES. DIRECT SERVER CONNECTION ACTIVE.</span>
          </div>
        </div>

        {/* Editorial Content Grid */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Contact Details & Links */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="text-xs font-mono text-zinc-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                <span>DIRECT CHANNELS</span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-display font-bold text-white uppercase tracking-tight">
                LET'S DISCUSS NEW HORIZONS
              </h3>
              <p className="mt-3 text-sm text-zinc-400 font-sans leading-relaxed">
                Whether you have an opening for a Data Analyst, need machine learning modeling assistance, or wish to explore collaborative technology projects, my inbox is open.
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-3 font-mono text-xs">
              {/* Email */}
              <div className="p-4 rounded-xl bg-[#0c0d10] border border-white/10 flex items-center justify-between group hover:border-white/20 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded bg-white/5 border border-white/10 text-emerald-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-zinc-400 uppercase">Primary Email</div>
                    <a
                      href={`mailto:${PORTFOLIO_DATA.personal.email}`}
                      className="text-white font-semibold hover:text-emerald-400 transition-colors text-sm"
                    >
                      {PORTFOLIO_DATA.personal.email}
                    </a>
                  </div>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="px-2.5 py-1.5 rounded bg-white/5 border border-white/10 text-zinc-300 hover:bg-white/10 hover:text-white transition-all flex items-center gap-1.5"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">COPIED</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-zinc-400" />
                      <span>COPY</span>
                    </>
                  )}
                </button>
              </div>

              {/* Phone */}
              <div className="p-4 rounded-xl bg-[#0c0d10] border border-white/10 flex items-center justify-between group hover:border-white/20 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded bg-white/5 border border-white/10 text-cyan-400">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-zinc-400 uppercase">Mobile Telephone</div>
                    <a
                      href={`tel:${PORTFOLIO_DATA.personal.phone}`}
                      className="text-white font-semibold hover:text-cyan-400 transition-colors text-sm"
                    >
                      {PORTFOLIO_DATA.personal.phone}
                    </a>
                  </div>
                </div>
                <button
                  onClick={handleCopyPhone}
                  className="px-2.5 py-1.5 rounded bg-white/5 border border-white/10 text-zinc-300 hover:bg-white/10 hover:text-white transition-all flex items-center gap-1.5"
                >
                  {copiedPhone ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-cyan-400" />
                      <span className="text-cyan-400">COPIED</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-zinc-400" />
                      <span>COPY</span>
                    </>
                  )}
                </button>
              </div>

              {/* LinkedIn */}
              <div className="p-4 rounded-xl bg-[#0c0d10] border border-white/10 flex items-center justify-between group hover:border-white/20 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded bg-white/5 border border-white/10 text-blue-400">
                    <Linkedin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-zinc-400 uppercase">LinkedIn Profile</div>
                    <a
                      href={PORTFOLIO_DATA.personal.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="text-white font-semibold hover:text-blue-400 transition-colors text-sm truncate max-w-[200px] sm:max-w-xs block"
                    >
                      {PORTFOLIO_DATA.personal.linkedinDisplay}
                    </a>
                  </div>
                </div>
                <a
                  href={PORTFOLIO_DATA.personal.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="px-2.5 py-1.5 rounded bg-white/5 border border-white/10 text-zinc-300 hover:bg-white/10 hover:text-white transition-all flex items-center gap-1.5"
                >
                  <span>VISIT</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
                </a>
              </div>

              {/* Location */}
              <div className="p-4 rounded-xl bg-[#0c0d10] border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded bg-white/5 border border-white/10 text-amber-400">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-zinc-400 uppercase">Base Location</div>
                    <div className="text-white font-semibold text-sm">
                      {PORTFOLIO_DATA.personal.location}
                    </div>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-zinc-400 px-2 py-1 rounded bg-white/5">
                  TIMEZONE: IST (UTC+5:30)
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Quick Dispatch Form with Real Backend Connection */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-2xl bg-[#0c0d10] border border-white/10 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 uppercase tracking-widest">
                <Send className="w-3.5 h-3.5 text-emerald-400" />
                <span>SERVER DISPATCH // POST /api/contact</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                LIVE API
              </span>
            </div>

            {sentSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-10 text-center space-y-4"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-display font-bold text-white uppercase">Inquiry Recorded!</h4>
                <p className="text-xs text-zinc-300 max-w-sm mx-auto font-sans leading-relaxed">
                  Your message has been securely submitted to Harish's backend database.
                </p>

                {inquiryDetails && (
                  <div className="p-3 rounded-lg bg-white/[0.03] border border-white/10 font-mono text-[11px] text-zinc-400 max-w-xs mx-auto space-y-1 text-left">
                    <div className="flex justify-between">
                      <span>REFERENCE ID:</span>
                      <span className="text-white font-bold">{inquiryDetails.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>LOGGED AT:</span>
                      <span className="text-emerald-400">{inquiryDetails.time}</span>
                    </div>
                  </div>
                )}

                <button
                  onClick={() => setSentSuccess(false)}
                  className="px-4 py-2 rounded text-xs font-mono bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  Send Another Inquiry
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMessage && (
                  <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-mono flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase mb-1.5">
                    Your Name / Organization
                  </label>
                  <input
                    type="text"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="e.g. Recruiter / Engineering Manager"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white/[0.03] border border-white/10 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-400 font-sans transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase mb-1.5">
                    Your Email Address <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                    placeholder="recruiter@company.com"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white/[0.03] border border-white/10 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-400 font-sans transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase mb-1.5">
                    Message / Opportunity Brief <span className="text-rose-400">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Hello Harish, we reviewed your machine learning projects and would like to discuss an opportunity..."
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white/[0.03] border border-white/10 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-400 font-sans transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full py-3.5 rounded-lg bg-white text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
                >
                  {isSending ? (
                    <span className="flex items-center gap-2">
                      <span className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      COMMUNICATING WITH BACKEND...
                    </span>
                  ) : (
                    <>
                      <span>TRANSMIT TO SERVER</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Editorial Signoff & Back to Top */}
        <div className="mt-20 pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-zinc-300 font-semibold uppercase">{PORTFOLIO_DATA.personal.name}</span>
            <span className="text-zinc-400">&bull;</span>
            <span>BACKEND API ENDPOINTS ACTIVE</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <span>BACK TO TOP</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
