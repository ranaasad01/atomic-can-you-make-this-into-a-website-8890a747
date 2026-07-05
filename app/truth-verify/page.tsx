"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldCheck, Search, CheckCircle, XCircle, AlertCircle, ExternalLink, Sparkles, ArrowRight, Globe, Database, Zap, Eye, BarChart3, Clock } from 'lucide-react';
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  scaleIn,
  slideInLeft,
  slideInRight,
} from "@/lib/motion";

// ─── Types ───────────────────────────────────────────────────────────────────

type Stance = "Supporting" | "Contradicting" | "Neutral";

interface Source {
  id: string;
  name: string;
  date: string;
  stance: Stance;
  relevance: number;
  url: string;
}

// ─── Static data ─────────────────────────────────────────────────────────────

const exampleClaims = [
  '"AI will replace all jobs by 2030"',
  '"Coffee causes cancer"',
  '"Bitcoin is anonymous"',
  '"5G causes health issues"',
];

const sourceFilters = [
  "Academic Papers",
  "News Sources",
  "Government Data",
  "Scientific Journals",
];

const mockSources: Source[] = [
  {
    id: "src1",
    name: "World Economic Forum Report 2023",
    date: "Oct 2023",
    stance: "Supporting",
    relevance: 94,
    url: "#",
  },
  {
    id: "src2",
    name: "MIT Technology Review",
    date: "Sep 2023",
    stance: "Contradicting",
    relevance: 88,
    url: "#",
  },
  {
    id: "src3",
    name: "McKinsey Global Institute",
    date: "Aug 2023",
    stance: "Supporting",
    relevance: 91,
    url: "#",
  },
  {
    id: "src4",
    name: "Bureau of Labor Statistics",
    date: "Jul 2023",
    stance: "Neutral",
    relevance: 76,
    url: "#",
  },
  {
    id: "src5",
    name: "Stanford HAI Annual Report",
    date: "Jun 2023",
    stance: "Contradicting",
    relevance: 83,
    url: "#",
  },
];

const confidenceBreakdown = [
  { label: "Factual Accuracy", value: 72, color: "bg-emerald-500" },
  { label: "Source Reliability", value: 89, color: "bg-violet-500" },
  { label: "Recency", value: 65, color: "bg-cyan-500" },
  { label: "Consensus Level", value: 58, color: "bg-amber-500" },
];

const steps = [
  {
    id: 1,
    icon: Search,
    title: "Submit Claim",
    description:
      "Paste any statement, headline, or URL you want to fact-check into the verification engine.",
  },
  {
    id: 2,
    icon: Globe,
    title: "AI Scans Sources",
    description:
      "AIOS instantly queries 50,000+ live sources including academic databases, news outlets, and government records.",
  },
  {
    id: 3,
    icon: BarChart3,
    title: "Cross-Reference Analysis",
    description:
      "Claims are cross-referenced across multiple source types, weighted by credibility and recency.",
  },
  {
    id: 4,
    icon: ShieldCheck,
    title: "Confidence Score",
    description:
      "A transparent confidence score and verdict are returned with full source attribution in under 2 seconds.",
  },
];

const trustBadges = [
  {
    id: "tb1",
    icon: Database,
    title: "Academic Databases",
    description:
      "Access to PubMed, arXiv, JSTOR, and 200+ peer-reviewed academic repositories.",
  },
  {
    id: "tb2",
    icon: Globe,
    title: "Real-Time News",
    description:
      "Live feeds from 10,000+ verified news publications across 140 countries.",
  },
  {
    id: "tb3",
    icon: Eye,
    title: "Government Records",
    description:
      "Direct integration with official government data portals and regulatory filings.",
  },
];

// ─── Stance badge helper ──────────────────────────────────────────────────────

function StanceBadge({ stance }: { stance: Stance }) {
  const styles: Record<Stance, string> = {
    Supporting:
      "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30",
    Contradicting: "bg-rose-500/15 text-rose-400 border border-rose-500/30",
    Neutral: "bg-amber-500/15 text-amber-400 border border-amber-500/30",
  };
  const icons: Record<Stance, React.ReactNode> = {
    Supporting: <CheckCircle className="w-3 h-3" />,
    Contradicting: <XCircle className="w-3 h-3" />,
    Neutral: <AlertCircle className="w-3 h-3" />,
  };
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${styles[stance]}`}
    >
      {icons[stance]}
      {stance}
    </span>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function TruthVerifyPage() {
  const [claimText, setClaimText] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([
    "Academic Papers",
    "News Sources",
    "Government Data",
    "Scientific Journals",
  ]);
  const [showResult, setShowResult] = useState(true);

  const toggleFilter = (filter: string) => {
    setActiveFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };

  const handleExampleClick = (claim: string) => {
    setClaimText(claim);
  };

  const handleVerify = () => {
    setShowResult(true);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
        {/* Background glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-600/12 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-violet-600/15 rounded-full blur-[100px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-cyan-600/6 rounded-full blur-[140px]" />
        </div>

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center gap-6"
          >
            {/* Badge */}
            <motion.div variants={fadeInUp}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-sm font-medium">
                <ShieldCheck className="w-4 h-4" />
                ⚖ Truth Verification Engine
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={fadeInUp}
              className="text-5xl sm:text-6xl lg:text-7xl font-space font-bold tracking-tight leading-[1.08]"
            >
              Know What&apos;s True.
              <br />
              <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent">
                Instantly.
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeInUp}
              className="max-w-2xl text-lg text-white/55 leading-relaxed"
            >
              AIOS cross-references any claim against thousands of live sources,
              academic databases, and trusted publications — returning a
              confidence score in seconds.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap items-center justify-center gap-4"
            >
              <Link
                href="#verify"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector("#verify")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-semibold text-sm hover:from-emerald-500 hover:to-emerald-400 transition-all duration-200 shadow-lg shadow-emerald-500/25"
              >
                <ShieldCheck className="w-4 h-4" />
                Verify a Claim
              </Link>
              <Link
                href="#how-it-works"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector("#how-it-works")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/15 text-white/70 font-semibold text-sm hover:border-white/30 hover:text-white hover:bg-white/5 transition-all duration-200"
              >
                See How It Works
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap items-center justify-center gap-8 pt-4"
            >
              {[
                { label: "Sources", value: "50K+" },
                { label: "Verification Time", value: "< 2s" },
                { label: "Precision", value: "98.7%" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-space font-bold text-white">
                    {stat.value}
                  </div>
                  <div className="text-xs text-white/40 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── VERIFICATION INPUT ───────────────────────────────────────────── */}
      <section id="verify" className="py-24 relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-emerald-600/6 rounded-full blur-[100px]" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col gap-10"
          >
            {/* Heading */}
            <motion.div variants={fadeInUp} className="text-center">
              <h2 className="text-3xl sm:text-4xl font-space font-bold mb-3">
                Verify Any Claim
              </h2>
              <p className="text-white/50 text-base">
                Paste a statement, headline, or URL — AIOS does the rest.
              </p>
            </motion.div>

            {/* Input card */}
            <motion.div
              variants={scaleIn}
              className="rounded-2xl border border-white/10 bg-[#1a1a2e]/60 backdrop-blur-sm p-6 sm:p-8 flex flex-col gap-6"
            >
              {/* Textarea */}
              <div className="relative">
                <textarea
                  value={claimText}
                  onChange={(e) => setClaimText(e.target.value)}
                  placeholder="Enter a claim, statement, or URL to fact-check..."
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 text-sm resize-none focus:outline-none focus:border-emerald-500/50 focus:bg-white/8 transition-all duration-200"
                />
              </div>

              {/* Example chips */}
              <div className="flex flex-col gap-2">
                <span className="text-xs text-white/40 font-medium uppercase tracking-wider">
                  Example claims
                </span>
                <div className="flex flex-wrap gap-2">
                  {exampleClaims.map((claim) => (
                    <button
                      key={claim}
                      onClick={() => handleExampleClick(claim)}
                      className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/60 text-xs hover:text-white hover:border-emerald-500/40 hover:bg-emerald-500/8 transition-all duration-200"
                    >
                      {claim}
                    </button>
                  ))}
                </div>
              </div>

              {/* Source filters */}
              <div className="flex flex-col gap-2">
                <span className="text-xs text-white/40 font-medium uppercase tracking-wider">
                  Source filters
                </span>
                <div className="flex flex-wrap gap-2">
                  {sourceFilters.map((filter) => {
                    const active = activeFilters.includes(filter);
                    return (
                      <button
                        key={filter}
                        onClick={() => toggleFilter(filter)}
                        className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all duration-200 ${
                          active
                            ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-400"
                            : "bg-white/5 border-white/10 text-white/40 hover:text-white/60"
                        }`}
                      >
                        {active ? (
                          <CheckCircle className="inline w-3 h-3 mr-1" />
                        ) : null}
                        {filter}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Verify button */}
              <button
                onClick={handleVerify}
                className="self-start inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-semibold text-sm hover:from-emerald-500 hover:to-emerald-400 transition-all duration-200 shadow-lg shadow-emerald-500/20"
              >
                <Zap className="w-4 h-4" />
                Verify Now
              </button>
            </motion.div>

            {/* Mock result card */}
            {showResult && (
              <motion.div
                variants={fadeInUp}
                className="rounded-2xl border border-amber-500/25 bg-amber-500/5 backdrop-blur-sm p-6 sm:p-8 flex flex-col gap-6"
              >
                {/* Claim label */}
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <p className="text-xs text-white/40 uppercase tracking-wider mb-1">
                      Claim analyzed
                    </p>
                    <p className="text-white/80 text-sm font-medium italic">
                      &ldquo;Artificial Intelligence will replace 85 million jobs
                      by 2025&rdquo;
                    </p>
                  </div>
                  {/* Verdict badge */}
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/35 text-amber-400 text-xs font-bold uppercase tracking-wide whitespace-nowrap">
                    <AlertCircle className="w-3.5 h-3.5" />
                    Partially True
                  </span>
                </div>

                {/* Score + explanation */}
                <div className="flex flex-col sm:flex-row gap-6 items-start">
                  {/* Circular score */}
                  <div className="flex-shrink-0 flex flex-col items-center gap-2">
                    <div className="relative w-24 h-24">
                      <svg
                        className="w-24 h-24 -rotate-90"
                        viewBox="0 0 96 96"
                      >
                        <circle
                          cx="48"
                          cy="48"
                          r="40"
                          fill="none"
                          stroke="rgba(255,255,255,0.08)"
                          strokeWidth="8"
                        />
                        <circle
                          cx="48"
                          cy="48"
                          r="40"
                          fill="none"
                          stroke="#f59e0b"
                          strokeWidth="8"
                          strokeLinecap="round"
                          strokeDasharray={`${2 * Math.PI * 40}`}
                          strokeDashoffset={`${
                            2 * Math.PI * 40 * (1 - 0.67)
                          }`}
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-xl font-space font-bold text-amber-400">
                          67%
                        </span>
                      </div>
                    </div>
                    <span className="text-xs text-white/40">Confidence</span>
                  </div>

                  {/* Explanation */}
                  <div className="flex flex-col gap-3">
                    <p className="text-sm text-white/65 leading-relaxed">
                      The World Economic Forum&apos;s 2020 Future of Jobs Report
                      projected that automation could displace 85 million jobs by
                      2025, but this figure is widely misquoted without its
                      counterpart: the same report predicted 97 million new roles
                      would emerge. The net displacement claim is therefore
                      misleading without full context.
                    </p>
                    {/* Source counts */}
                    <div className="flex flex-wrap gap-3">
                      <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400">
                        <CheckCircle className="w-3.5 h-3.5" />
                        3 supporting sources
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-xs text-rose-400">
                        <XCircle className="w-3.5 h-3.5" />
                        2 contradicting sources
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-xs text-amber-400">
                        <AlertCircle className="w-3.5 h-3.5" />
                        1 neutral source
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ── RESULTS BREAKDOWN ────────────────────────────────────────────── */}
      <section className="py-24 relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-violet-600/8 rounded-full blur-[100px]" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl sm:text-4xl font-space font-bold mb-3">
              Verification Results
            </h2>
            <p className="text-white/50 text-base">
              Full source analysis and confidence breakdown for every claim.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Source Analysis */}
            <motion.div
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="rounded-2xl border border-white/10 bg-[#1a1a2e]/50 backdrop-blur-sm p-6 flex flex-col gap-5"
            >
              <div className="flex items-center gap-2 mb-1">
                <Database className="w-5 h-5 text-violet-400" />
                <h3 className="font-space font-semibold text-lg">Source Analysis</h3>
              </div>

              <div className="flex flex-col gap-3">
                {mockSources.map((source) => (
                  <div
                    key={source.id}
                    className="flex items-center justify-between gap-3 p-3 rounded-xl bg-white/4 border border-white/6 hover:border-white/12 transition-all duration-200"
                  >
                    <div className="flex flex-col gap-1 min-w-0">
                      <span className="text-sm text-white/80 font-medium truncate">
                        {source.name}
                      </span>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="inline-flex items-center gap-1 text-xs text-white/35">
                          <Clock className="w-3 h-3" />
                          {source.date}
                        </span>
                        <StanceBadge stance={source.stance} />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-xs text-white/40">
                        {source.relevance}%
                      </span>
                      <a
                        href={source.url}
                        aria-label="Open source"
                        className="w-7 h-7 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-white/40 hover:text-white hover:border-violet-500/40 transition-all duration-200"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Confidence Breakdown */}
            <motion.div
              variants={slideInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="rounded-2xl border border-white/10 bg-[#1a1a2e]/50 backdrop-blur-sm p-6 flex flex-col gap-5"
            >
              <div className="flex items-center gap-2 mb-1">
                <BarChart3 className="w-5 h-5 text-emerald-400" />
                <h3 className="font-space font-semibold text-lg">
                  Confidence Breakdown
                </h3>
              </div>

              <div className="flex flex-col gap-6">
                {confidenceBreakdown.map((item) => (
                  <div key={item.label} className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/70">{item.label}</span>
                      <span className="text-sm font-semibold text-white">
                        {item.value}%
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-white/8 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.value}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                        className={`h-full rounded-full ${item.color}`}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Overall score */}
              <div className="mt-2 p-4 rounded-xl bg-emerald-500/8 border border-emerald-500/20">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/60">Overall Confidence</span>
                  <span className="text-lg font-space font-bold text-emerald-400">
                    67%
                  </span>
                </div>
                <p className="text-xs text-white/35 mt-1">
                  Based on weighted analysis across all source categories.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-24 relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-emerald-600/6 rounded-full blur-[120px]" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-space font-bold mb-3">
              How Truth Verify Works
            </h2>
            <p className="text-white/50 text-base max-w-xl mx-auto">
              A transparent, multi-stage verification pipeline designed for
              accuracy and speed.
            </p>
          </motion.div>

          {/* Steps */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          >
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.id}
                  variants={fadeInUp}
                  className="relative flex flex-col gap-4 p-6 rounded-2xl border border-white/10 bg-[#1a1a2e]/50 backdrop-blur-sm hover:border-emerald-500/25 transition-all duration-300"
                >
                  {/* Connector line (not on last) */}
                  {idx < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-10 left-full w-6 h-px bg-gradient-to-r from-white/15 to-transparent z-10" />
                  )}
                  {/* Number circle */}
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-600 to-emerald-500 flex items-center justify-center text-white text-xs font-bold font-space flex-shrink-0">
                      {step.id}
                    </div>
                    <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-emerald-400" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-space font-semibold text-white mb-1.5">
                      {step.title}
                    </h4>
                    <p className="text-sm text-white/45 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Trust badges */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6"
          >
            {trustBadges.map((badge) => {
              const Icon = badge.icon;
              return (
                <motion.div
                  key={badge.id}
                  variants={scaleIn}
                  className="flex flex-col items-center text-center gap-3 p-6 rounded-2xl border border-emerald-500/15 bg-emerald-500/5 hover:border-emerald-500/30 hover:bg-emerald-500/8 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h4 className="font-space font-semibold text-white">
                    {badge.title}
                  </h4>
                  <p className="text-sm text-white/45 leading-relaxed">
                    {badge.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Back link */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex justify-center mt-16"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors duration-200"
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
              Back to Dashboard
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
