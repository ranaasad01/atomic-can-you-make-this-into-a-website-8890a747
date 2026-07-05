"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Search, Brain, TrendingUp, ShieldCheck, DollarSign, FileText, Settings, Globe, Sparkles, ArrowRight, CheckCircle, Bell, ChevronRight, Star, Activity, Clock, Mail, Calendar, AlertCircle } from 'lucide-react';
import { brand } from "@/lib/data";
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  scaleIn,
  slideInLeft,
  slideInRight,
} from "@/lib/motion";
import { useTranslations } from "next-intl";

// ─── Inline data ────────────────────────────────────────────────────────────

const summaryItems = [
  {
    id: "s1",
    icon: Mail,
    text: "17 emails requiring attention",
    priority: "high" as const,
    color: "text-violet-400",
    bg: "bg-violet-500/10",
  },
  {
    id: "s2",
    icon: AlertCircle,
    text: "Patent filing deadline in 3 days",
    priority: "high" as const,
    color: "text-rose-400",
    bg: "bg-rose-500/10",
  },
  {
    id: "s3",
    icon: Calendar,
    text: "Investor meeting tomorrow at 10 AM",
    priority: "medium" as const,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
  },
  {
    id: "s4",
    icon: TrendingUp,
    text: "4 new market opportunities discovered",
    priority: "medium" as const,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
];

const appTiles = [
  {
    id: "a1",
    icon: Brain,
    label: "Research",
    description: "Deep-dive into any topic with AI-powered synthesis across millions of sources.",
    gradient: "from-violet-600/20 to-violet-900/10",
    border: "border-violet-500/20",
    iconColor: "text-violet-400",
    glow: "shadow-violet-500/10",
  },
  {
    id: "a2",
    icon: TrendingUp,
    label: "Business",
    description: "Build strategies, analyze competitors, and generate full business plans in minutes.",
    gradient: "from-cyan-600/20 to-cyan-900/10",
    border: "border-cyan-500/20",
    iconColor: "text-cyan-400",
    glow: "shadow-cyan-500/10",
  },
  {
    id: "a3",
    icon: ShieldCheck,
    label: "Truth Verify",
    description: "Cross-reference claims against live data and trusted sources instantly.",
    gradient: "from-emerald-600/20 to-emerald-900/10",
    border: "border-emerald-500/20",
    iconColor: "text-emerald-400",
    glow: "shadow-emerald-500/10",
  },
  {
    id: "a4",
    icon: DollarSign,
    label: "Finance",
    description: "Track portfolios, model scenarios, and surface investment signals automatically.",
    gradient: "from-amber-600/20 to-amber-900/10",
    border: "border-amber-500/20",
    iconColor: "text-amber-400",
    glow: "shadow-amber-500/10",
  },
  {
    id: "a5",
    icon: FileText,
    label: "Documents",
    description: "Summarize, draft, and extract insights from any document in seconds.",
    gradient: "from-blue-600/20 to-blue-900/10",
    border: "border-blue-500/20",
    iconColor: "text-blue-400",
    glow: "shadow-blue-500/10",
  },
  {
    id: "a6",
    icon: Settings,
    label: "Agents",
    description: "Deploy autonomous agents to handle complex multi-step tasks on your behalf.",
    gradient: "from-rose-600/20 to-rose-900/10",
    border: "border-rose-500/20",
    iconColor: "text-rose-400",
    glow: "shadow-rose-500/10",
  },
  {
    id: "a7",
    icon: Globe,
    label: "Internet",
    description: "Real-time web intelligence: monitor trends, news, and competitor moves live.",
    gradient: "from-indigo-600/20 to-indigo-900/10",
    border: "border-indigo-500/20",
    iconColor: "text-indigo-400",
    glow: "shadow-indigo-500/10",
  },
];

const intelFeeds = [
  {
    id: "i1",
    label: "Market Trends",
    icon: TrendingUp,
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    items: [
      { text: "AI infrastructure spending up 34% QoQ", time: "2m ago", hot: true },
      { text: "Semiconductor supply chain stabilizing", time: "18m ago", hot: false },
      { text: "SaaS multiples compressing in mid-market", time: "1h ago", hot: false },
    ],
  },
  {
    id: "i2",
    label: "Patent Opportunities",
    icon: ShieldCheck,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    items: [
      { text: "3 adjacent claims expiring in your sector", time: "5m ago", hot: true },
      { text: "New filing window opens Q3 2025", time: "30m ago", hot: false },
      { text: "Competitor patent cluster identified", time: "2h ago", hot: false },
    ],
  },
  {
    id: "i3",
    label: "Competitor Activity",
    icon: Activity,
    color: "text-rose-400",
    bg: "bg-rose-500/10",
    items: [
      { text: "Rival raised Series B — $42M closed", time: "12m ago", hot: true },
      { text: "New product launch detected in EU market", time: "45m ago", hot: false },
      { text: "Key hire: ex-Google VP joins competitor", time: "3h ago", hot: false },
    ],
  },
  {
    id: "i4",
    label: "News",
    icon: Globe,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    items: [
      { text: "FTC signals lighter AI regulation stance", time: "8m ago", hot: true },
      { text: "EU AI Act enforcement begins July 2025", time: "1h ago", hot: false },
      { text: "OpenAI announces enterprise API changes", time: "4h ago", hot: false },
    ],
  },
];

const testimonials = [
  {
    id: "t1",
    name: "Sarah Chen",
    role: "Founder, NovaTech Ventures",
    avatar: "/images/sarah-chen-founder.jpg",
    quote:
      "AIOS replaced five separate tools overnight. The patent analysis alone saved us weeks of legal research before our Series A.",
    stars: 5,
  },
  {
    id: "t2",
    name: "Marcus Webb",
    role: "Chief Strategy Officer, Meridian Capital",
    avatar: "/images/marcus-webb-cso.jpg",
    quote:
      "The live intelligence feeds are genuinely uncanny. We caught a competitor pivot 48 hours before it hit the press.",
    stars: 5,
  },
  {
    id: "t3",
    name: "Priya Nair",
    role: "Independent Researcher",
    avatar: "/images/priya-nair-researcher.jpg",
    quote:
      "Research that used to take three days now takes three hours. The synthesis quality is better than anything I've used before.",
    stars: 5,
  },
];

const examplePrompts = [
  "Build me a business plan for a B2B SaaS startup",
  "Analyze my patent portfolio for gaps",
  "Find investors in the climate tech space",
  "Verify this market size claim",
  "Plan my week around my top priorities",
];

const stats = [
  { value: "10x", label: "Faster research" },
  { value: "47+", label: "Integrated data sources" },
  { value: "99.2%", label: "Uptime SLA" },
  { value: "2,400+", label: "Teams using AIOS" },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function GlowOrb({ className }: { className?: string }) {
  return (
    <div
      className={`absolute rounded-full blur-3xl pointer-events-none ${className ?? ""}`}
    />
  );
}

const pulseVariant: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// ─── Page ────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const t = useTranslations();
  const shouldReduceMotion = useReducedMotion();
  const [query, setQuery] = useState("");
  const [activeIntel, setActiveIntel] = useState("i1");
  const inputRef = useRef<HTMLInputElement>(null);

  const activeIntelFeed = intelFeeds.find((f) => f.id === activeIntel) ?? intelFeeds[0];

  const motionProps = shouldReduceMotion
    ? { initial: "visible", animate: "visible", whileInView: undefined }
    : {};

  return (
    <main className="relative bg-[#0a0a0f] text-white overflow-x-hidden">
      {/* ── HERO / DASHBOARD ─────────────────────────────────────────── */}
      <section
        id="dashboard"
        className="relative min-h-screen flex flex-col justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
      >
        {/* Background glows */}
        <GlowOrb className="top-[-10%] left-[20%] w-[600px] h-[400px] bg-violet-600/12" />
        <GlowOrb className="top-[30%] right-[-5%] w-[400px] h-[400px] bg-cyan-500/8" />
        <GlowOrb className="bottom-0 left-[-5%] w-[300px] h-[300px] bg-violet-800/10" />

        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        <div className="relative max-w-5xl mx-auto w-full">
          {/* Tagline badge */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="flex justify-center mb-8"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-semibold tracking-widest uppercase">
              <Sparkles className="w-3 h-3" />
              {brand.tagline}
            </span>
          </motion.div>

          {/* Greeting */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="text-center mb-10"
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.05] text-balance mb-4">
              Good afternoon,{" "}
              <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                Toby.
              </span>
            </h1>
            <p className="text-white/50 text-lg sm:text-xl max-w-xl mx-auto text-pretty leading-relaxed">
              Your intelligence layer is active. Here is what needs your attention today.
            </p>
          </motion.div>

          {/* Today's Summary card */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            className="mb-8 rounded-2xl bg-white/[0.03] border border-white/8 shadow-[0_1px_2px_rgba(0,0,0,0.2),0_16px_48px_-12px_rgba(124,58,237,0.15)] p-6"
          >
            <div className="flex items-center gap-2 mb-5">
              <Bell className="w-4 h-4 text-violet-400" />
              <span className="text-xs font-semibold uppercase tracking-widest text-white/40">
                Today&apos;s Summary
              </span>
            </div>
            <motion.ul
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 gap-3"
            >
              {summaryItems.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.li
                    key={item.id}
                    variants={fadeInUp}
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/6 cursor-default"
                  >
                    <span className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg ${item.bg}`}>
                      <Icon className={`w-4 h-4 ${item.color}`} />
                    </span>
                    <span className="text-sm text-white/80 leading-snug">{item.text}</span>
                    <CheckCircle className="ml-auto flex-shrink-0 w-4 h-4 text-white/20" />
                  </motion.li>
                );
              })}
            </motion.ul>
          </motion.div>

          {/* Ask Anything input */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="mb-6"
          >
            <div className="relative group">
              <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-violet-600/40 to-cyan-500/40 opacity-0 group-focus-within:opacity-100 blur transition-opacity duration-300" />
              <div className="relative flex items-center gap-3 bg-white/[0.05] border border-white/10 rounded-2xl px-5 py-4 shadow-[0_4px_24px_rgba(0,0,0,0.2)]">
                <Search className="w-5 h-5 text-white/30 flex-shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Ask anything…"
                  className="flex-1 bg-transparent text-white placeholder-white/25 text-base outline-none"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-violet-500 text-white text-sm font-semibold shadow-[0_2px_12px_rgba(124,58,237,0.4)] hover:shadow-[0_4px_20px_rgba(124,58,237,0.55)] transition-shadow duration-300"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Ask
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Example prompts */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap gap-2 justify-center"
          >
            {examplePrompts.map((prompt) => (
              <motion.button
                key={prompt}
                variants={fadeIn}
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setQuery(prompt)}
                className="px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/8 text-white/50 text-xs hover:text-white hover:border-violet-500/30 hover:bg-violet-500/8 transition-all duration-200"
              >
                {prompt}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── APPLICATIONS ─────────────────────────────────────────────── */}
      <section
        id="applications"
        className="relative py-24 md:py-32 px-4 sm:px-6 lg:px-8"
      >
        <GlowOrb className="top-0 right-[10%] w-[500px] h-[300px] bg-cyan-600/8" />

        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="mb-14"
          >
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-violet-400 mb-3">
              Applications
            </span>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white text-balance leading-tight mb-4">
              Every tool you need,{" "}
              <span className="text-white/40">unified in one OS.</span>
            </h2>
            <p className="text-white/50 text-lg max-w-xl leading-relaxed text-pretty">
              Stop switching between a dozen tabs. AIOS brings research, finance, legal, and automation into a single intelligent workspace.
            </p>
          </motion.div>

          {/* Bento grid — asymmetric */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {appTiles.map((tile, idx) => {
              const Icon = tile.icon;
              const isLarge = idx === 0 || idx === 3;
              return (
                <motion.div
                  key={tile.id}
                  variants={scaleIn}
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={{ duration: 0.25 }}
                  className={`relative group rounded-2xl bg-gradient-to-br ${tile.gradient} border ${tile.border} p-6 cursor-pointer shadow-[0_1px_2px_rgba(0,0,0,0.1),0_8px_24px_-8px_rgba(0,0,0,0.2)] hover:shadow-[0_4px_32px_-8px_rgba(0,0,0,0.3)] transition-shadow duration-300 ${isLarge ? "lg:col-span-1 lg:row-span-1" : ""}`}
                >
                  <div className={`w-11 h-11 flex items-center justify-center rounded-xl bg-white/5 border border-white/8 mb-4`}>
                    <Icon className={`w-5 h-5 ${tile.iconColor}`} />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{tile.label}</h3>
                  <p className="text-sm text-white/45 leading-relaxed">{tile.description}</p>
                  <ChevronRight className={`absolute bottom-5 right-5 w-4 h-4 ${tile.iconColor} opacity-0 group-hover:opacity-100 transition-opacity duration-200`} />
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── LIVE INTELLIGENCE ────────────────────────────────────────── */}
      <section
        id="intelligence"
        className="relative py-24 md:py-32 px-4 sm:px-6 lg:px-8 bg-white/[0.015]"
      >
        <GlowOrb className="bottom-0 left-[5%] w-[500px] h-[300px] bg-violet-700/10" />

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left: copy */}
            <motion.div
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-3">
                Live Intelligence
              </span>
              <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white text-balance leading-tight mb-6">
                The world&apos;s signal,{" "}
                <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                  filtered for you.
                </span>
              </h2>
              <p className="text-white/50 text-lg leading-relaxed text-pretty mb-8">
                AIOS continuously monitors markets, patents, competitors, and news — surfacing only the signals that matter to your specific goals. No noise, just intelligence.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="p-4 rounded-xl bg-white/[0.03] border border-white/8"
                  >
                    <div className="text-3xl font-extrabold text-white tracking-tight mb-1">
                      {stat.value}
                    </div>
                    <div className="text-xs text-white/40 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: live feed panel */}
            <motion.div
              variants={slideInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="rounded-2xl bg-white/[0.03] border border-white/8 shadow-[0_1px_2px_rgba(0,0,0,0.15),0_16px_48px_-12px_rgba(0,0,0,0.3)] overflow-hidden"
            >
              {/* Tab bar */}
              <div className="flex border-b border-white/8 overflow-x-auto">
                {intelFeeds.map((feed) => {
                  const Icon = feed.icon;
                  return (
                    <button
                      key={feed.id}
                      onClick={() => setActiveIntel(feed.id)}
                      className={`flex items-center gap-2 px-4 py-3.5 text-xs font-semibold whitespace-nowrap transition-all duration-200 border-b-2 ${
                        activeIntel === feed.id
                          ? "text-white border-violet-500 bg-violet-500/8"
                          : "text-white/40 border-transparent hover:text-white/70"
                      }`}
                    >
                      <Icon className={`w-3.5 h-3.5 ${activeIntel === feed.id ? feed.color : ""}`} />
                      {feed.label}
                    </button>
                  );
                })}
              </div>

              {/* Feed items */}
              <div className="p-5 space-y-3">
                {(activeIntelFeed?.items ?? []).map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.07 }}
                    className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.03] border border-white/6 hover:border-white/12 transition-colors duration-200"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white/80 leading-snug">{item.text}</p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <Clock className="w-3 h-3 text-white/25" />
                        <span className="text-xs text-white/30">{item.time}</span>
                        {item.hot && (
                          <span className="px-1.5 py-0.5 rounded-full bg-rose-500/15 text-rose-400 text-[10px] font-semibold uppercase tracking-wide">
                            Live
                          </span>
                        )}
                      </div>
                    </div>
                    <ArrowRight className="flex-shrink-0 w-3.5 h-3.5 text-white/20 mt-0.5" />
                  </motion.div>
                ))}
              </div>

              {/* Footer */}
              <div className="px-5 pb-5">
                <button className="w-full py-2.5 rounded-xl border border-white/8 text-xs text-white/40 hover:text-white hover:border-violet-500/30 hover:bg-violet-500/8 transition-all duration-200 font-medium">
                  View all intelligence feeds
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF ─────────────────────────────────────────────── */}
      <section className="relative py-24 md:py-32 px-4 sm:px-6 lg:px-8">
        <GlowOrb className="top-0 right-[20%] w-[400px] h-[300px] bg-violet-600/8" />

        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-14"
          >
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-violet-400 mb-3">
              Trusted by builders
            </span>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white text-balance leading-tight">
              What our users say
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {testimonials.map((t, idx) => (
              <motion.div
                key={t.id}
                variants={fadeInUp}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25 }}
                className={`relative rounded-2xl bg-white/[0.03] border border-white/8 p-6 shadow-[0_1px_2px_rgba(0,0,0,0.1),0_8px_24px_-8px_rgba(0,0,0,0.2)] ${idx === 1 ? "md:mt-6" : ""}`}
              >
                {/* Stars */}
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <blockquote className="text-sm text-white/70 leading-relaxed mb-5 text-pretty">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-9 h-9 rounded-full object-cover ring-1 ring-white/10"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                  />
                  <div>
                    <div className="text-sm font-semibold text-white">{t.name}</div>
                    <div className="text-xs text-white/35">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section className="relative py-24 md:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="relative rounded-3xl overflow-hidden border border-violet-500/20 shadow-[0_1px_2px_rgba(0,0,0,0.2),0_32px_80px_-16px_rgba(124,58,237,0.25)]"
          >
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-violet-900/60 via-[#0a0a0f] to-cyan-900/30" />
            <GlowOrb className="top-[-30%] left-[20%] w-[400px] h-[300px] bg-violet-600/20" />
            <GlowOrb className="bottom-[-20%] right-[10%] w-[300px] h-[200px] bg-cyan-500/15" />

            <div className="relative px-8 py-16 sm:px-16 text-center">
              <motion.div variants={fadeInUp}>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/15 border border-violet-500/25 text-violet-300 text-xs font-semibold tracking-widest uppercase mb-6">
                  <Sparkles className="w-3 h-3" />
                  Get started free
                </span>
                <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white text-balance leading-tight mb-5">
                  Your AI OS is ready.{" "}
                  <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                    Are you?
                  </span>
                </h2>
                <p className="text-white/50 text-lg max-w-xl mx-auto leading-relaxed text-pretty mb-10">
                  Join 2,400 teams who replaced their fragmented toolstack with a single intelligent operating system. No credit card required.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.a
                    href="#dashboard"
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector("#dashboard")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-violet-500 text-white font-semibold text-sm shadow-[0_4px_20px_rgba(124,58,237,0.45)] hover:shadow-[0_6px_28px_rgba(124,58,237,0.6)] transition-shadow duration-300"
                  >
                    <Sparkles className="w-4 h-4" />
                    Start for free
                  </motion.a>
                  <motion.a
                    href="#applications"
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector("#applications")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-white/6 border border-white/12 text-white font-semibold text-sm hover:bg-white/10 hover:border-white/20 transition-all duration-200"
                  >
                    Explore applications
                    <ArrowRight className="w-4 h-4" />
                  </motion.a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}