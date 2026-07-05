"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Brain, Search, Upload, FileText, BookOpen, Sparkles, ArrowRight, CheckCircle, Globe, Layers, ChevronRight, ExternalLink, Zap, Share2 } from 'lucide-react';
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  scaleIn,
} from "@/lib/motion";

const exampleQueries = [
  "Summarize recent AI breakthroughs",
  "Analyze this patent claim",
  "Find competitors in quantum computing",
  "Explain CRISPR gene editing",
];

const keyFindings = [
  "Quantum error correction has improved by 40% since 2022, with Google and IBM leading breakthroughs in logical qubit fidelity.",
  "Topological qubits remain the most promising path to fault-tolerant quantum computing, with Microsoft's Station Q reporting significant progress.",
  "Hybrid classical-quantum algorithms are already delivering commercial value in optimization and drug discovery pipelines.",
  "Investment in quantum computing reached $2.35B globally in 2023, a 3x increase from 2020 levels.",
  "China has filed 40% of all quantum computing patents in the last 3 years, surpassing the US in raw patent volume.",
];

const citations = [
  {
    id: "c1",
    source: "Nature — Quantum Computing Review",
    url: "nature.com/articles/quantum-2024",
    snippet: "Logical qubit fidelity improvements across superconducting platforms...",
    confidence: 97,
  },
  {
    id: "c2",
    source: "MIT Technology Review",
    url: "technologyreview.com/quantum-advances",
    snippet: "Hybrid quantum-classical algorithms show commercial viability in 2023...",
    confidence: 94,
  },
  {
    id: "c3",
    source: "arXiv — cs.ET Preprint",
    url: "arxiv.org/abs/2401.12345",
    snippet: "Topological qubit stability under decoherence conditions analyzed...",
    confidence: 91,
  },
  {
    id: "c4",
    source: "McKinsey Global Institute",
    url: "mckinsey.com/quantum-report-2024",
    snippet: "Global quantum investment trends and market sizing through 2030...",
    confidence: 89,
  },
  {
    id: "c5",
    source: "WIPO Patent Database",
    url: "wipo.int/patentscope/quantum",
    snippet: "Patent filing analysis across jurisdictions for quantum technologies...",
    confidence: 86,
  },
];

const capabilities = [
  {
    id: "cap1",
    icon: Globe,
    title: "Web Search Integration",
    description: "Searches across 2M+ live sources, academic databases, and news feeds in real time.",
    color: "text-violet-400",
    border: "border-violet-500/20",
    gradient: "from-violet-600/20 to-violet-900/10",
  },
  {
    id: "cap2",
    icon: FileText,
    title: "Document Analysis",
    description: "Upload PDFs, DOCX, or TXT files and extract structured insights instantly.",
    color: "text-cyan-400",
    border: "border-cyan-500/20",
    gradient: "from-cyan-600/20 to-cyan-900/10",
  },
  {
    id: "cap3",
    icon: Layers,
    title: "Multi-Source Synthesis",
    description: "Combines findings from dozens of sources into a single coherent narrative.",
    color: "text-emerald-400",
    border: "border-emerald-500/20",
    gradient: "from-emerald-600/20 to-emerald-900/10",
  },
  {
    id: "cap4",
    icon: BookOpen,
    title: "Citation Tracking",
    description: "Every claim is backed by a traceable source with confidence scoring.",
    color: "text-amber-400",
    border: "border-amber-500/20",
    gradient: "from-amber-600/20 to-amber-900/10",
  },
  {
    id: "cap5",
    icon: Zap,
    title: "Real-Time Data",
    description: "Live feeds from markets, journals, and news ensure your research is never stale.",
    color: "text-rose-400",
    border: "border-rose-500/20",
    gradient: "from-rose-600/20 to-rose-900/10",
  },
  {
    id: "cap6",
    icon: Share2,
    title: "Export & Share",
    description: "Export research reports as PDF, Markdown, or share a live link with your team.",
    color: "text-indigo-400",
    border: "border-indigo-500/20",
    gradient: "from-indigo-600/20 to-indigo-900/10",
  },
];

const stats = [
  { value: "2M+", label: "Sources" },
  { value: "< 3s", label: "Synthesis" },
  { value: "99.2%", label: "Accuracy" },
];

export default function ResearchPage() {
  const [query, setQuery] = useState("");
  const [selectedChip, setSelectedChip] = useState<string | null>(null);

  const handleChipClick = (chip: string) => {
    setQuery(chip);
    setSelectedChip(chip);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* ── HERO SECTION ── */}
      <section className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden bg-gradient-to-br from-[#0a0a0f] via-[#1a1a2e] to-[#0a0a0f]">
        {/* Glow orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-violet-600/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-violet-900/10 rounded-full blur-[160px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
          {/* Back link */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="mb-8"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors duration-200"
            >
              <ChevronRight className="w-4 h-4 rotate-180" />
              Back to Dashboard
            </Link>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="max-w-4xl"
          >
            {/* Badge */}
            <motion.div variants={fadeInUp} className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-sm font-medium">
                <Brain className="w-4 h-4" />
                AI Research Workspace
              </span>
            </motion.div>

            {/* H1 */}
            <motion.h1
              variants={fadeInUp}
              className="text-5xl sm:text-6xl lg:text-7xl font-space font-bold leading-tight mb-6"
            >
              Research Anything.{" "}
              <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                Know Everything.
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeInUp}
              className="text-lg sm:text-xl text-white/60 leading-relaxed max-w-2xl mb-10"
            >
              Upload documents, search the web, and let AIOS synthesize insights
              from millions of sources — with full citations.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap items-center gap-4 mb-16"
            >
              <Link
                href="#research"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector("#research")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-violet-500 hover:from-violet-500 hover:to-violet-400 text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-violet-500/25"
              >
                <Sparkles className="w-4 h-4" />
                Start Researching
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="#research"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector("#research")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/20 hover:border-white/40 text-white/70 hover:text-white font-semibold text-sm transition-all duration-200"
              >
                <Upload className="w-4 h-4" />
                Upload Documents
              </Link>
            </motion.div>

            {/* Stats row */}
            <motion.div
              variants={staggerContainer}
              className="flex flex-wrap items-center gap-8"
            >
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={scaleIn}
                  className="flex flex-col"
                >
                  <span className="text-3xl font-space font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                    {stat.value}
                  </span>
                  <span className="text-sm text-white/40 mt-1">{stat.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── RESEARCH INPUT SECTION ── */}
      <section id="research" className="py-24 bg-[#0a0a0f]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Section heading */}
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-space font-bold mb-4">
                Your Research Workspace
              </h2>
              <p className="text-white/50 text-lg max-w-xl mx-auto">
                Ask any question, paste a URL, or upload a document to begin.
              </p>
            </motion.div>

            {/* Query input */}
            <motion.div variants={fadeInUp} className="mb-6">
              <div className="relative group">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-600/20 to-cyan-500/20 blur-sm opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <div className="relative flex items-center gap-3 bg-[#1a1a2e]/80 border border-white/10 group-focus-within:border-violet-500/50 rounded-2xl px-5 py-4 transition-all duration-300">
                  <Search className="w-5 h-5 text-white/30 flex-shrink-0" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Ask a research question or paste a URL to analyze..."
                    className="flex-1 bg-transparent text-white placeholder-white/30 text-base outline-none"
                  />
                  {query && (
                    <button
                      onClick={() => setQuery("")}
                      className="text-white/30 hover:text-white/60 transition-colors text-xs"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Example chips */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap gap-2 mb-8"
            >
              {exampleQueries.map((chip) => (
                <button
                  key={chip}
                  onClick={() => handleChipClick(chip)}
                  className={`px-4 py-2 rounded-full text-sm border transition-all duration-200 ${
                    selectedChip === chip
                      ? "bg-violet-500/20 border-violet-500/50 text-violet-300"
                      : "bg-white/5 border-white/10 text-white/50 hover:text-white hover:border-white/30"
                  }`}
                >
                  {chip}
                </button>
              ))}
            </motion.div>

            {/* Upload zone */}
            <motion.div variants={fadeInUp} className="mb-8">
              <div className="border-2 border-dashed border-white/10 hover:border-violet-500/30 rounded-2xl p-10 text-center transition-all duration-300 cursor-pointer group bg-white/2 hover:bg-violet-500/5">
                <Upload className="w-10 h-10 text-white/20 group-hover:text-violet-400 mx-auto mb-4 transition-colors duration-300" />
                <p className="text-white/50 group-hover:text-white/70 font-medium mb-1 transition-colors duration-300">
                  Drop files here or click to upload
                </p>
                <p className="text-white/25 text-sm">Supports PDF, DOCX, TXT</p>
              </div>
            </motion.div>

            {/* Run Research button */}
            <motion.div variants={fadeInUp} className="flex justify-center">
              <button className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white font-semibold text-base transition-all duration-200 shadow-lg shadow-violet-500/25">
                <Brain className="w-5 h-5" />
                Run Research
                <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── RESULTS & CITATIONS SECTION ── */}
      <section className="py-24 bg-gradient-to-b from-[#0a0a0f] to-[#1a1a2e]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp} className="mb-10">
              <h2 className="text-3xl sm:text-4xl font-space font-bold mb-3">
                Sample Research Output
              </h2>
              <p className="text-white/40">
                Here&apos;s what AIOS returns for: &ldquo;Quantum computing advances in 2024&rdquo;
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Synthesis Results */}
              <motion.div
                variants={fadeInUp}
                className="lg:col-span-2 bg-[#1a1a2e]/60 border border-white/8 rounded-2xl p-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-lg bg-violet-500/15 flex items-center justify-center">
                    <Brain className="w-5 h-5 text-violet-400" />
                  </div>
                  <div>
                    <h3 className="font-space font-semibold text-white">
                      Synthesis Results
                    </h3>
                    <p className="text-xs text-white/30">Generated in 2.4s from 47 sources</p>
                  </div>
                  <span className="ml-auto px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
                    Complete
                  </span>
                </div>

                <p className="text-white/70 leading-relaxed mb-6 text-sm">
                  Quantum computing in 2024 has seen remarkable progress across multiple fronts.
                  The field is transitioning from purely experimental demonstrations to early
                  commercial applications, particularly in optimization, simulation, and
                  cryptography. Major players including Google, IBM, Microsoft, and IonQ have
                  each announced significant milestones, while a new wave of startups is
                  targeting niche vertical applications.
                </p>

                <h4 className="text-sm font-semibold text-white/50 uppercase tracking-widest mb-4">
                  Key Findings
                </h4>
                <ul className="space-y-3">
                  {keyFindings.map((finding, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white/65 leading-relaxed">{finding}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Citations */}
              <motion.div
                variants={fadeInUp}
                className="lg:col-span-1 bg-[#1a1a2e]/60 border border-white/8 rounded-2xl p-6"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-lg bg-cyan-500/15 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-cyan-400" />
                  </div>
                  <h3 className="font-space font-semibold text-white">Citations</h3>
                </div>

                <div className="space-y-4">
                  {citations.map((cite) => (
                    <div
                      key={cite.id}
                      className="p-4 rounded-xl bg-white/3 border border-white/6 hover:border-white/12 transition-all duration-200 group"
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <p className="text-xs font-semibold text-white/80 leading-tight">
                          {cite.source}
                        </p>
                        <ExternalLink className="w-3 h-3 text-white/20 group-hover:text-cyan-400 flex-shrink-0 mt-0.5 transition-colors duration-200" />
                      </div>
                      <p className="text-xs text-white/30 mb-3 leading-relaxed">
                        {cite.snippet}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-white/25">{cite.url}</span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            cite.confidence >= 95
                              ? "bg-emerald-500/15 text-emerald-400"
                              : cite.confidence >= 90
                              ? "bg-cyan-500/15 text-cyan-400"
                              : "bg-amber-500/15 text-amber-400"
                          }`}
                        >
                          {cite.confidence}% match
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CAPABILITIES SECTION ── */}
      <section className="py-24 bg-[#0a0a0f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp} className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-space font-bold mb-4">
                Research{" "}
                <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                  Superpowers
                </span>
              </h2>
              <p className="text-white/50 text-lg max-w-xl mx-auto">
                Everything you need to go from question to confident conclusion.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5"
            >
              {capabilities.map((cap) => (
                <motion.div
                  key={cap.id}
                  variants={scaleIn}
                  className={`relative p-6 rounded-2xl bg-gradient-to-br ${cap.gradient} border ${cap.border} hover:shadow-lg transition-all duration-300 group cursor-default`}
                >
                  <div
                    className={`w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <cap.icon className={`w-5 h-5 ${cap.color}`} />
                  </div>
                  <h3 className="font-space font-semibold text-white mb-2">
                    {cap.title}
                  </h3>
                  <p className="text-sm text-white/50 leading-relaxed">
                    {cap.description}
                  </p>
                  <ChevronRight
                    className={`absolute bottom-5 right-5 w-4 h-4 ${cap.color} opacity-0 group-hover:opacity-100 transition-opacity duration-200`}
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* Bottom CTA */}
            <motion.div
              variants={fadeInUp}
              className="text-center mt-14"
            >
              <Link
                href="#research"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector("#research")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-violet-600 to-violet-500 hover:from-violet-500 hover:to-violet-400 text-white font-semibold transition-all duration-200 shadow-lg shadow-violet-500/25"
              >
                <Sparkles className="w-5 h-5" />
                Start Your First Research
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
