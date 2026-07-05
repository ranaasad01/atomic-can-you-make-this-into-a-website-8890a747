"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Globe, Search, TrendingUp, ExternalLink, Bookmark, RefreshCw, Sparkles, ArrowRight, Eye, Clock, Filter, Zap, Activity, BarChart3, Rss } from 'lucide-react';
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  scaleIn,
  slideInLeft,
  slideInRight,
} from "@/lib/motion";

// ─── Mock Data ───────────────────────────────────────────────────────────────

const filterTabs = ["All", "News", "Research", "Markets", "Social"];

const searchResults = [
  {
    id: "r1",
    source: "TechCrunch",
    favicon: "TC",
    title: "AI Semiconductor Market Projected to Reach $227B by 2027",
    snippet:
      "New analysis reveals explosive growth in AI-specific chip demand, driven by LLM training infrastructure and edge deployment requirements across enterprise sectors.",
    date: "Dec 12, 2024",
    relevance: 98,
    url: "#",
  },
  {
    id: "r2",
    source: "Bloomberg",
    favicon: "BB",
    title: "NVIDIA, AMD Battle for AI Chip Supremacy in 2024",
    snippet:
      "The semiconductor giants are locked in an unprecedented race to supply AI accelerators, with data center GPU revenue surpassing traditional gaming segments for the first time.",
    date: "Dec 11, 2024",
    relevance: 95,
    url: "#",
  },
  {
    id: "r3",
    source: "MIT Technology Review",
    favicon: "MT",
    title: "Custom Silicon: Why Big Tech Is Designing Its Own AI Chips",
    snippet:
      "Google TPUs, Apple Neural Engine, and Amazon Trainium represent a fundamental shift away from commodity hardware toward purpose-built AI acceleration.",
    date: "Dec 10, 2024",
    relevance: 91,
    url: "#",
  },
  {
    id: "r4",
    source: "Reuters",
    favicon: "RE",
    title: "Supply Chain Constraints Ease for Advanced AI Semiconductors",
    snippet:
      "TSMC and Samsung report improved yields on 3nm processes critical for next-generation AI chips, potentially alleviating the 18-month backlog facing hyperscalers.",
    date: "Dec 9, 2024",
    relevance: 87,
    url: "#",
  },
  {
    id: "r5",
    source: "The Information",
    favicon: "TI",
    title: "Startups Raise $4.2B for Specialized AI Inference Chips",
    snippet:
      "A wave of semiconductor startups targeting inference workloads — rather than training — are attracting significant venture capital as the market matures beyond NVIDIA dominance.",
    date: "Dec 8, 2024",
    relevance: 83,
    url: "#",
  },
];

const trendingTopics = [
  { rank: 1, topic: "AI Semiconductor Shortage", direction: "up", volume: "2.4M" },
  { rank: 2, topic: "OpenAI GPT-5 Release", direction: "up", volume: "1.9M" },
  { rank: 3, topic: "Quantum Computing Breakthrough", direction: "up", volume: "1.2M" },
  { rank: 4, topic: "EU AI Act Compliance", direction: "up", volume: "980K" },
  { rank: 5, topic: "Autonomous Vehicle Safety", direction: "down", volume: "870K" },
  { rank: 6, topic: "Carbon Capture Technology", direction: "up", volume: "760K" },
  { rank: 7, topic: "Biotech CRISPR Trials", direction: "up", volume: "640K" },
  { rank: 8, topic: "Space Tourism Expansion", direction: "down", volume: "510K" },
];

const breakingNews = [
  {
    id: "n1",
    source: "Reuters",
    headline: "Fed signals potential rate cuts in Q1 2025 amid cooling inflation",
    timeAgo: "4m ago",
    category: "Economy",
    categoryColor: "text-cyan-400 bg-cyan-500/10",
  },
  {
    id: "n2",
    source: "Bloomberg",
    headline: "Apple unveils next-gen M4 Ultra chip with dedicated AI cores",
    timeAgo: "12m ago",
    category: "Tech",
    categoryColor: "text-violet-400 bg-violet-500/10",
  },
  {
    id: "n3",
    source: "FT",
    headline: "EU regulators open antitrust probe into Microsoft-OpenAI partnership",
    timeAgo: "28m ago",
    category: "Regulation",
    categoryColor: "text-amber-400 bg-amber-500/10",
  },
  {
    id: "n4",
    source: "WSJ",
    headline: "Biotech startup achieves 94% accuracy in early cancer detection AI",
    timeAgo: "41m ago",
    category: "Health",
    categoryColor: "text-emerald-400 bg-emerald-500/10",
  },
  {
    id: "n5",
    source: "Axios",
    headline: "Pentagon awards $2.1B AI defense contract to consortium of startups",
    timeAgo: "1h ago",
    category: "Defense",
    categoryColor: "text-rose-400 bg-rose-500/10",
  },
];

const marketSignals = [
  {
    id: "m1",
    asset: "NVDA",
    signal: "Bullish",
    signalColor: "text-emerald-400 bg-emerald-500/10",
    note: "Data center revenue beat estimates by 18%; AI chip backlog extends to Q3 2025.",
  },
  {
    id: "m2",
    asset: "BTC",
    signal: "Bullish",
    signalColor: "text-emerald-400 bg-emerald-500/10",
    note: "ETF inflows hit record $2.4B weekly; institutional accumulation accelerating.",
  },
  {
    id: "m3",
    asset: "TSLA",
    signal: "Neutral",
    signalColor: "text-amber-400 bg-amber-500/10",
    note: "Robotaxi timeline uncertainty offsets strong energy storage growth signals.",
  },
  {
    id: "m4",
    asset: "META",
    signal: "Bullish",
    signalColor: "text-emerald-400 bg-emerald-500/10",
    note: "AI-driven ad targeting improvements lifting ARPU across all major markets.",
  },
  {
    id: "m5",
    asset: "INTC",
    signal: "Bearish",
    signalColor: "text-rose-400 bg-rose-500/10",
    note: "Foundry division losses widen; market share erosion continues vs. AMD/NVDA.",
  },
];

const summaryBullets = [
  "The AI semiconductor market is experiencing unprecedented demand driven by large language model training and inference workloads, with NVIDIA maintaining 80%+ market share in data center GPUs.",
  "Custom silicon initiatives from Apple, Google, Amazon, and Microsoft are creating a parallel market for specialized AI accelerators, potentially disrupting commodity GPU dominance by 2026.",
  "Supply chain normalization at TSMC and Samsung is expected to reduce lead times from 52 weeks to 24 weeks by mid-2025, enabling broader AI infrastructure deployment across mid-market enterprises.",
];

const entities = {
  people: ["Jensen Huang", "Lisa Su", "Sam Altman"],
  companies: ["NVIDIA", "AMD", "TSMC", "Google", "Apple"],
  topics: ["AI Chips", "Semiconductors", "LLMs", "Data Centers", "Supply Chain"],
};

// ─── Component ───────────────────────────────────────────────────────────────

export default function InternetPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("AI semiconductor market 2024");
  const [urlInput, setUrlInput] = useState("https://techcrunch.com/2024/12/12/ai-semiconductor-market-2027");
  const [showSummary, setShowSummary] = useState(true);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        {/* Background glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-600/12 rounded-full blur-3xl" />
          <div className="absolute top-20 right-1/4 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-violet-600/8 rounded-full blur-3xl" />
        </div>

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
              <ArrowRight className="w-3 h-3 rotate-180" />
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
            <Globe className="w-4 h-4" />
            🌎 AI Web Intelligence
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="text-4xl sm:text-5xl lg:text-6xl font-space font-bold tracking-tight mb-6"
          >
            The Entire Internet,{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Distilled for You.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="text-lg text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            AIOS browses, summarizes, and monitors the web in real-time — surfacing
            what matters and filtering out the noise.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
          >
            <a
              href="#internet"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#internet")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold hover:from-cyan-500 hover:to-blue-500 transition-all duration-200 shadow-lg shadow-cyan-500/20"
            >
              <Search className="w-4 h-4" />
              Search the Web
            </a>
            <a
              href="#trends"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#trends")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/20 text-white/70 hover:text-white hover:border-white/40 font-semibold transition-all duration-200"
            >
              <TrendingUp className="w-4 h-4" />
              Monitor Trends
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row items-center justify-center gap-8"
          >
            {[
              { icon: Globe, label: "1B+ Pages Indexed", color: "text-cyan-400" },
              { icon: RefreshCw, label: "Real-Time Updates", color: "text-blue-400" },
              { icon: Rss, label: "200+ Sources", color: "text-violet-400" },
            ].map(({ icon: Icon, label, color }) => (
              <motion.div
                key={label}
                variants={scaleIn}
                className="flex items-center gap-2"
              >
                <Icon className={`w-5 h-5 ${color}`} />
                <span className="text-white/60 font-medium">{label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── AI WEB SEARCH ────────────────────────────────────────────────── */}
      <section id="internet" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="mb-10"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                <Search className="w-4 h-4 text-cyan-400" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-space font-bold">AI-Powered Web Search</h2>
            </div>
            <p className="text-white/40 text-sm ml-11">
              Ask anything — AIOS synthesizes results from across the web into a single, actionable answer.
            </p>
          </motion.div>

          {/* Search bar */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="relative mb-4"
          >
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 focus-within:border-cyan-500/40 focus-within:bg-white/8 transition-all duration-200">
              <Globe className="w-5 h-5 text-cyan-400 flex-shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search anything — AIOS will summarize and synthesize results..."
                className="flex-1 bg-transparent text-white placeholder-white/30 outline-none text-sm"
              />
              <button className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-sm font-semibold hover:from-cyan-500 hover:to-blue-500 transition-all duration-200 flex items-center gap-2">
                <Search className="w-4 h-4" />
                Search
              </button>
            </div>
          </motion.div>

          {/* Filter tabs */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex items-center gap-2 mb-8 flex-wrap"
          >
            <Filter className="w-4 h-4 text-white/30" />
            {filterTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeFilter === tab
                    ? "bg-cyan-500/20 border border-cyan-500/40 text-cyan-400"
                    : "bg-white/5 border border-white/10 text-white/40 hover:text-white/70 hover:border-white/20"
                }`}
              >
                {tab}
              </button>
            ))}
          </motion.div>

          {/* AI Summary card */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="mb-6 p-5 rounded-2xl bg-violet-500/5 border border-violet-500/30"
          >
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-violet-400" />
              <span className="text-xs font-semibold uppercase tracking-widest text-violet-400">AI Summary</span>
              <span className="ml-auto text-xs text-white/30">Synthesized from 47 sources</span>
            </div>
            <p className="text-sm text-white/70 leading-relaxed mb-3">
              The AI semiconductor market is undergoing a structural transformation, with total addressable market projections revised upward to $227B by 2027 — a 340% increase from 2022 levels. NVIDIA currently commands approximately 80% of the data center GPU market, though this dominance faces growing pressure from custom silicon initiatives at major hyperscalers.
            </p>
            <p className="text-sm text-white/70 leading-relaxed">
              Supply chain normalization is expected by mid-2025 as TSMC ramps 3nm capacity, which should reduce GPU lead times from 52 weeks to under 24 weeks. This will likely accelerate AI infrastructure deployment among mid-market enterprises that have been priced out of the current market.
            </p>
          </motion.div>

          {/* Individual results */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="space-y-3"
          >
            {searchResults.map((result) => (
              <motion.div
                key={result.id}
                variants={fadeInUp}
                className="group p-4 rounded-xl bg-white/3 border border-white/8 hover:border-white/15 hover:bg-white/5 transition-all duration-200"
              >
                <div className="flex items-start gap-3">
                  {/* Favicon placeholder */}
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 text-xs font-bold text-white/50">
                    {result.favicon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-white/30">{result.source}</span>
                      <span className="text-white/15">·</span>
                      <span className="text-xs text-white/30">{result.date}</span>
                      <span className="ml-auto px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium">
                        {result.relevance}% match
                      </span>
                    </div>
                    <a
                      href={result.url}
                      className="text-sm font-semibold text-white group-hover:text-cyan-400 transition-colors duration-200 flex items-center gap-1.5 mb-1.5"
                    >
                      {result.title}
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                    <p className="text-xs text-white/40 leading-relaxed line-clamp-2">{result.snippet}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── TREND MONITORING ─────────────────────────────────────────────── */}
      <section id="trends" className="py-20 px-4 sm:px-6 lg:px-8 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="mb-10"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
                <Activity className="w-4 h-4 text-violet-400" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-space font-bold">Live Trend Intelligence</h2>
            </div>
            <p className="text-white/40 text-sm ml-11">
              Real-time monitoring across social, news, and financial data streams.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Trending Topics */}
            <motion.div
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              className="p-5 rounded-2xl bg-white/3 border border-white/8"
            >
              <div className="flex items-center gap-2 mb-5">
                <TrendingUp className="w-4 h-4 text-violet-400" />
                <h3 className="font-semibold text-sm">Trending Topics</h3>
                <span className="ml-auto flex items-center gap-1 text-xs text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live
                </span>
              </div>
              <div className="space-y-3">
                {trendingTopics.map((item) => (
                  <div key={item.rank} className="flex items-center gap-3">
                    <span className="w-5 text-xs text-white/30 font-mono text-right flex-shrink-0">
                      {item.rank}
                    </span>
                    <span className="flex-1 text-sm text-white/70 truncate">{item.topic}</span>
                    <span
                      className={`text-xs font-medium ${
                        item.direction === "up" ? "text-emerald-400" : "text-rose-400"
                      }`}
                    >
                      {item.direction === "up" ? "↑" : "↓"}
                    </span>
                    <span className="text-xs text-white/30 font-mono w-12 text-right">{item.volume}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Breaking News */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              className="p-5 rounded-2xl bg-white/3 border border-white/8"
            >
              <div className="flex items-center gap-2 mb-5">
                <Rss className="w-4 h-4 text-cyan-400" />
                <h3 className="font-semibold text-sm">Breaking News</h3>
                <span className="ml-auto flex items-center gap-1 text-xs text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live
                </span>
              </div>
              <div className="space-y-4">
                {breakingNews.map((item) => (
                  <div key={item.id} className="border-b border-white/5 pb-4 last:border-0 last:pb-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-white/30">{item.source}</span>
                      <span className="ml-auto flex items-center gap-1 text-xs text-white/30">
                        <Clock className="w-3 h-3" />
                        {item.timeAgo}
                      </span>
                    </div>
                    <p className="text-sm text-white/70 leading-snug mb-2">{item.headline}</p>
                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${item.categoryColor}`}>
                      {item.category}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Market Signals */}
            <motion.div
              variants={slideInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              className="p-5 rounded-2xl bg-white/3 border border-white/8"
            >
              <div className="flex items-center gap-2 mb-5">
                <BarChart3 className="w-4 h-4 text-amber-400" />
                <h3 className="font-semibold text-sm">Market Signals</h3>
                <span className="ml-auto flex items-center gap-1 text-xs text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live
                </span>
              </div>
              <div className="space-y-4">
                {marketSignals.map((item) => (
                  <div key={item.id} className="border-b border-white/5 pb-4 last:border-0 last:pb-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="font-mono font-bold text-sm text-white">{item.asset}</span>
                      <span className={`ml-auto px-2 py-0.5 rounded-full text-xs font-semibold ${item.signalColor}`}>
                        {item.signal}
                      </span>
                    </div>
                    <p className="text-xs text-white/40 leading-relaxed">{item.note}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── PAGE SUMMARIZER ──────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="mb-10"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                <Zap className="w-4 h-4 text-blue-400" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-space font-bold">Instant Page Summarizer</h2>
            </div>
            <p className="text-white/40 text-sm ml-11">
              Paste any URL and AIOS will read, analyze, and distill the key insights in seconds.
            </p>
          </motion.div>

          {/* URL input */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="mb-6"
          >
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 focus-within:border-blue-500/40 transition-all duration-200">
              <Globe className="w-5 h-5 text-blue-400 flex-shrink-0" />
              <input
                type="text"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="Paste any URL to get an AI summary..."
                className="flex-1 bg-transparent text-white placeholder-white/30 outline-none text-sm font-mono"
              />
              <button
                onClick={() => setShowSummary(true)}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-sm font-semibold hover:from-blue-500 hover:to-cyan-500 transition-all duration-200 flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                Summarize
              </button>
            </div>
          </motion.div>

          {/* Summary result */}
          {showSummary && (
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="p-6 rounded-2xl bg-white/3 border border-white/10"
            >
              {/* URL display */}
              <div className="flex items-center gap-2 mb-4 pb-4 border-b border-white/8">
                <Globe className="w-4 h-4 text-white/30 flex-shrink-0" />
                <span className="text-xs text-white/40 font-mono truncate flex-1">{urlInput}</span>
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium flex-shrink-0">
                  <Clock className="w-3 h-3" />
                  12 min saved
                </span>
              </div>

              {/* AI summary bullets */}
              <div className="mb-5">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-violet-400" />
                  <span className="text-xs font-semibold uppercase tracking-widest text-violet-400">AI Summary</span>
                </div>
                <ul className="space-y-3">
                  {summaryBullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs text-violet-400 font-bold">{i + 1}</span>
                      </span>
                      <p className="text-sm text-white/65 leading-relaxed">{bullet}</p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Key entities */}
              <div className="mb-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-3">Key Entities Extracted</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs text-white/30 w-16">People</span>
                    {entities.people.map((p) => (
                      <span key={p} className="px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs">
                        {p}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs text-white/30 w-16">Companies</span>
                    {entities.companies.map((c) => (
                      <span key={c} className="px-2.5 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs">
                        {c}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs text-white/30 w-16">Topics</span>
                    {entities.topics.map((t) => (
                      <span key={t} className="px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-3">
                <a
                  href={urlInput}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/15 text-white/60 hover:text-white hover:border-white/30 text-sm font-medium transition-all duration-200"
                >
                  <ExternalLink className="w-4 h-4" />
                  Open Original
                </a>
                <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-sm font-semibold hover:from-cyan-500 hover:to-blue-500 transition-all duration-200">
                  <Bookmark className="w-4 h-4" />
                  Save Summary
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* ── FOOTER CTA ───────────────────────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-white/8">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl font-space font-bold mb-4">
              Ready to explore more?
            </h2>
            <p className="text-white/40 mb-8">
              Return to your AIOS dashboard or explore other intelligence modules.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 text-white font-semibold hover:from-violet-500 hover:to-cyan-500 transition-all duration-200"
              >
                <Sparkles className="w-4 h-4" />
                Back to Dashboard
              </Link>
              <Link
                href="/research"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/20 text-white/70 hover:text-white hover:border-white/40 font-semibold transition-all duration-200"
              >
                Explore Research
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
