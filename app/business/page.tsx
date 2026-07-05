"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { TrendingUp, Target, Rocket, BarChart3, Users, DollarSign, CheckCircle, ArrowRight, Sparkles, Building2, Lightbulb, Globe, ChevronRight } from 'lucide-react';
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  scaleIn,
  slideInLeft,
  slideInRight,
} from "@/lib/motion";

// ─── Data ────────────────────────────────────────────────────────────────────

const steps = [
  { id: 1, label: "Idea" },
  { id: 2, label: "Market" },
  { id: 3, label: "Strategy" },
  { id: 4, label: "Financials" },
];

const industries = [
  "Tech",
  "Healthcare",
  "Finance",
  "Retail",
  "Education",
  "Energy",
];

const planSections = [
  {
    id: "exec",
    title: "Executive Summary",
    icon: Lightbulb,
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
    content:
      "An AI-powered SaaS platform that automates business intelligence workflows for SMEs, reducing operational overhead by up to 60% while surfacing actionable insights in real time.",
  },
  {
    id: "market",
    title: "Market Size",
    icon: BarChart3,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
    content: "$4.2B TAM · $1.1B SAM · $280M SOM",
    badge: "$4.2B TAM",
  },
  {
    id: "revenue",
    title: "Revenue Model",
    icon: DollarSign,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    content:
      "Subscription tiers: Starter ($49/mo), Pro ($149/mo), Enterprise (custom). Usage-based API pricing for high-volume clients.",
  },
  {
    id: "gtm",
    title: "Go-to-Market Strategy",
    icon: Rocket,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    content:
      "Phase 1: Product-led growth via freemium. Phase 2: Outbound sales to mid-market. Phase 3: Channel partnerships with consulting firms and system integrators.",
  },
];

const marketCards = [
  {
    id: "size",
    label: "Market Size",
    value: "$4.2B",
    sub: "Total Addressable Market",
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
  },
  {
    id: "growth",
    label: "Growth Rate",
    value: "23%",
    sub: "Year-over-Year",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
  },
  {
    id: "players",
    label: "Key Players",
    value: "12",
    sub: "Major Competitors Identified",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
  {
    id: "opps",
    label: "Opportunities",
    value: "7",
    sub: "Untapped Niches Found",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
  },
];

const competitors = [
  {
    id: "c1",
    name: "Acme Analytics",
    share: 28,
    strengths: "Brand recognition, enterprise contracts",
    weaknesses: "Slow innovation, high pricing",
  },
  {
    id: "c2",
    name: "DataForge AI",
    share: 19,
    strengths: "Strong ML pipeline, API-first",
    weaknesses: "Poor UX, limited support",
  },
  {
    id: "c3",
    name: "InsightHub",
    share: 14,
    strengths: "Affordable, easy onboarding",
    weaknesses: "Shallow feature set",
  },
  {
    id: "c4",
    name: "NexusBI",
    share: 9,
    strengths: "Real-time dashboards",
    weaknesses: "No AI layer, legacy stack",
  },
];

const milestones = [
  {
    id: "m1",
    title: "Idea Validation",
    date: "Jan 2024",
    description: "Conducted 50+ customer interviews. Validated core pain points and willingness to pay.",
    status: "completed" as const,
  },
  {
    id: "m2",
    title: "MVP Development",
    date: "Mar 2024",
    description: "Built core AI pipeline and dashboard. Shipped v0.1 with three foundational modules.",
    status: "completed" as const,
  },
  {
    id: "m3",
    title: "Beta Launch",
    date: "Jun 2024",
    description: "Onboarded 120 beta users. Achieved 4.7/5 satisfaction score and 68% weekly retention.",
    status: "completed" as const,
  },
  {
    id: "m4",
    title: "Seed Funding",
    date: "Q4 2024",
    description: "Targeting $2M seed round. Currently in conversations with 8 angel investors and 3 micro-VCs.",
    status: "in-progress" as const,
  },
  {
    id: "m5",
    title: "Series A",
    date: "Q3 2025",
    description: "Planned $12M raise to scale GTM, expand engineering team, and enter EU market.",
    status: "upcoming" as const,
  },
  {
    id: "m6",
    title: "IPO",
    date: "2028",
    description: "Target public listing on NASDAQ following $50M ARR milestone and profitability.",
    status: "upcoming" as const,
  },
];

const stats = [
  { id: "st1", value: "500+", label: "Plans Generated" },
  { id: "st2", value: "40+", label: "Industries" },
  { id: "st3", value: "10x", label: "Faster" },
];

// ─── Component ───────────────────────────────────────────────────────────────

export default function BusinessPage() {
  const [activeStep] = useState(1);
  const [selectedIndustry, setSelectedIndustry] = useState("Tech");

  const milestoneColor = (status: "completed" | "in-progress" | "upcoming") => {
    if (status === "completed") return "bg-emerald-500 border-emerald-500";
    if (status === "in-progress") return "bg-cyan-500 border-cyan-500 animate-pulse";
    return "bg-white/10 border-white/20";
  };

  const milestoneLineColor = (status: "completed" | "in-progress" | "upcoming") => {
    if (status === "completed") return "bg-emerald-500/60";
    if (status === "in-progress") return "bg-cyan-500/40";
    return "bg-white/10";
  };

  const milestoneTextColor = (status: "completed" | "in-progress" | "upcoming") => {
    if (status === "completed") return "text-emerald-400";
    if (status === "in-progress") return "text-cyan-400";
    return "text-white/30";
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        {/* Glow orbs */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-violet-600/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-20 right-1/4 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative max-w-5xl mx-auto text-center">
          {/* Back link */}
          <motion.div
            variants={fadeIn}
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

          {/* Badge */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-6"
          >
            <TrendingUp className="w-4 h-4" />
            AI Business Builder
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="text-4xl sm:text-5xl lg:text-6xl font-space font-bold tracking-tight mb-6 leading-tight"
          >
            Build Your Business with{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
              AI Intelligence.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="text-lg text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Generate comprehensive business plans, analyze markets in real-time,
            and track every milestone from idea to IPO.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <a
              href="#business"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#business")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-semibold text-sm hover:from-cyan-400 hover:to-cyan-500 transition-all duration-200 shadow-lg shadow-cyan-500/20"
            >
              <Sparkles className="w-4 h-4" />
              Generate Business Plan
            </a>
            <a
              href="#market"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#market")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/15 text-white/70 font-semibold text-sm hover:border-white/30 hover:text-white hover:bg-white/5 transition-all duration-200"
            >
              <BarChart3 className="w-4 h-4" />
              Analyze Market
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16"
          >
            {stats.map((stat) => (
              <motion.div key={stat.id} variants={scaleIn} className="text-center">
                <div className="text-3xl font-space font-bold bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-white/40 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── BUSINESS PLAN GENERATOR ──────────────────────────────────────── */}
      <section id="business" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl sm:text-4xl font-space font-bold mb-4">
              AI Business Plan{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                Generator
              </span>
            </h2>
            <p className="text-white/40 max-w-xl mx-auto">
              Answer a few questions and our AI will produce a full, investor-ready business plan in under 60 seconds.
            </p>
          </motion.div>

          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="rounded-2xl border border-white/10 bg-[#1a1a2e]/60 backdrop-blur-sm overflow-hidden"
          >
            {/* Step progress bar */}
            <div className="border-b border-white/8 px-6 py-5">
              <div className="flex items-center gap-0">
                {steps.map((step, idx) => (
                  <div key={step.id} className="flex items-center flex-1">
                    <div className="flex flex-col items-center gap-1">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-300 ${
                          step.id === activeStep
                            ? "bg-cyan-500 border-cyan-500 text-white"
                            : step.id < activeStep
                            ? "bg-emerald-500 border-emerald-500 text-white"
                            : "bg-white/5 border-white/20 text-white/30"
                        }`}
                      >
                        {step.id < activeStep ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          step.id
                        )}
                      </div>
                      <span
                        className={`text-xs font-medium ${
                          step.id === activeStep
                            ? "text-cyan-400"
                            : step.id < activeStep
                            ? "text-emerald-400"
                            : "text-white/30"
                        }`}
                      >
                        {step.label}
                      </span>
                    </div>
                    {idx < steps.length - 1 && (
                      <div
                        className={`flex-1 h-0.5 mx-2 mb-4 rounded-full transition-all duration-300 ${
                          step.id < activeStep ? "bg-emerald-500/60" : "bg-white/10"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Step 1 form */}
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-white/60 mb-2">
                  Describe your business idea
                </label>
                <textarea
                  rows={4}
                  placeholder="e.g. An AI-powered platform that helps small businesses automate their accounting and financial reporting..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 resize-none focus:outline-none focus:border-cyan-500/50 focus:bg-white/8 transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/60 mb-3">
                  Select your industry
                </label>
                <div className="flex flex-wrap gap-2">
                  {industries.map((ind) => (
                    <button
                      key={ind}
                      onClick={() => setSelectedIndustry(ind)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200 ${
                        selectedIndustry === ind
                          ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-400"
                          : "bg-white/5 border-white/10 text-white/50 hover:border-white/20 hover:text-white/70"
                      }`}
                    >
                      {ind}
                    </button>
                  ))}
                </div>
              </div>

              <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-semibold text-sm hover:from-cyan-400 hover:to-cyan-500 transition-all duration-200 shadow-lg shadow-cyan-500/20">
                <Sparkles className="w-4 h-4" />
                Generate Plan
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          {/* Mock generated plan */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {planSections.map((section) => {
              const Icon = section.icon;
              return (
                <motion.div
                  key={section.id}
                  variants={fadeInUp}
                  className={`rounded-xl border ${section.border} ${section.bg} p-5`}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Icon className={`w-4 h-4 ${section.color}`} />
                    <span className={`text-sm font-semibold ${section.color}`}>
                      {section.title}
                    </span>
                    {section.badge && (
                      <span className="ml-auto text-xs font-bold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                        {section.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-white/60 leading-relaxed">
                    {section.content}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── MARKET ANALYSIS ──────────────────────────────────────────────── */}
      <section id="market" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#1a1a2e]/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl sm:text-4xl font-space font-bold mb-4">
              Market{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                Analysis
              </span>
            </h2>
            <p className="text-white/40 max-w-xl mx-auto">
              Real-time intelligence on market size, growth vectors, and competitive landscape.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: Market Intelligence */}
            <motion.div
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
            >
              <h3 className="text-lg font-space font-semibold mb-5 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-cyan-400" />
                Market Intelligence
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {marketCards.map((card) => (
                  <div
                    key={card.id}
                    className={`rounded-xl border ${card.border} ${card.bg} p-4`}
                  >
                    <div className={`text-2xl font-space font-bold ${card.color} mb-1`}>
                      {card.value}
                    </div>
                    <div className="text-xs font-semibold text-white/70 mb-0.5">
                      {card.label}
                    </div>
                    <div className="text-xs text-white/35">{card.sub}</div>
                  </div>
                ))}
              </div>

              {/* Opportunities */}
              <div className="mt-6 rounded-xl border border-white/10 bg-white/3 p-5">
                <h4 className="text-sm font-semibold text-white/70 mb-3 flex items-center gap-2">
                  <Target className="w-4 h-4 text-violet-400" />
                  Top Opportunities
                </h4>
                <ul className="space-y-2">
                  {[
                    "SME automation gap — 78% of SMEs lack AI tooling",
                    "Emerging markets: SEA & LATAM adoption accelerating",
                    "Regulatory compliance automation demand up 41%",
                  ].map((opp) => (
                    <li key={opp} className="flex items-start gap-2 text-sm text-white/55">
                      <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                      {opp}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Right: Competitor Analysis */}
            <motion.div
              variants={slideInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
            >
              <h3 className="text-lg font-space font-semibold mb-5 flex items-center gap-2">
                <Users className="w-5 h-5 text-violet-400" />
                Competitor Analysis
              </h3>
              <div className="space-y-4">
                {competitors.map((comp) => (
                  <div
                    key={comp.id}
                    className="rounded-xl border border-white/10 bg-white/3 p-4"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-white">
                        {comp.name}
                      </span>
                      <span className="text-xs font-bold text-cyan-400">
                        {comp.share}% share
                      </span>
                    </div>
                    {/* Market share bar */}
                    <div className="w-full h-1.5 bg-white/10 rounded-full mb-3">
                      <div
                        className="h-1.5 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500"
                        style={{ width: `${comp.share}%` }}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-emerald-400 font-medium">✓ </span>
                        <span className="text-white/50">{comp.strengths}</span>
                      </div>
                      <div>
                        <span className="text-rose-400 font-medium">✗ </span>
                        <span className="text-white/50">{comp.weaknesses}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── MILESTONE TRACKER ────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl sm:text-4xl font-space font-bold mb-4">
              Startup Milestone{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                Tracker
              </span>
            </h2>
            <p className="text-white/40 max-w-xl mx-auto">
              Visualize your journey from first idea to public listing. Every step tracked, every deadline surfaced.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="relative"
          >
            {milestones.map((ms, idx) => (
              <motion.div
                key={ms.id}
                variants={fadeInUp}
                className="flex gap-5 mb-0"
              >
                {/* Timeline spine */}
                <div className="flex flex-col items-center">
                  <div
                    className={`w-4 h-4 rounded-full border-2 shrink-0 mt-1 ${
                      milestoneColor(ms.status)
                    }`}
                  />
                  {idx < milestones.length - 1 && (
                    <div
                      className={`w-0.5 flex-1 my-1 min-h-[40px] rounded-full ${
                        milestoneLineColor(ms.status)
                      }`}
                    />
                  )}
                </div>

                {/* Content */}
                <div className="pb-8">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-base font-space font-semibold text-white">
                      {ms.title}
                    </span>
                    <span
                      className={`text-xs font-medium px-2 py-0.5 rounded-full border ${
                        ms.status === "completed"
                          ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                          : ms.status === "in-progress"
                          ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-400"
                          : "bg-white/5 border-white/10 text-white/30"
                      }`}
                    >
                      {ms.status === "completed"
                        ? "✓ Completed"
                        : ms.status === "in-progress"
                        ? "⟳ In Progress"
                        : "Upcoming"}
                    </span>
                  </div>
                  <div className={`text-xs font-medium mb-2 ${milestoneTextColor(ms.status)}`}>
                    {ms.date}
                  </div>
                  <p className="text-sm text-white/45 leading-relaxed">
                    {ms.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA FOOTER STRIP ─────────────────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-white/8">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="max-w-3xl mx-auto text-center"
        >
          <Building2 className="w-10 h-10 text-cyan-400 mx-auto mb-4" />
          <h3 className="text-2xl font-space font-bold mb-3">
            Ready to build your business?
          </h3>
          <p className="text-white/40 mb-8">
            Join 500+ founders who used AIOS to go from idea to funded startup.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-semibold text-sm hover:opacity-90 transition-opacity duration-200 shadow-lg shadow-violet-500/20"
            >
              <Sparkles className="w-4 h-4" />
              Back to Dashboard
            </Link>
            <Link
              href="/finance"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/15 text-white/70 font-semibold text-sm hover:border-white/30 hover:text-white hover:bg-white/5 transition-all duration-200"
            >
              Explore Finance
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
