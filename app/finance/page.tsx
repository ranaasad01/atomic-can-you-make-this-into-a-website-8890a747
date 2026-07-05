"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { DollarSign, TrendingUp, TrendingDown, BarChart3, PieChart, ArrowUpRight, ArrowDownRight, Sparkles, Shield, Zap, Target, AlertCircle, CheckCircle, ArrowRight } from 'lucide-react';
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  scaleIn,
  slideInLeft,
  slideInRight,
} from "@/lib/motion";

// ─── Data ────────────────────────────────────────────────────────────────────

const metricCards = [
  {
    id: "m1",
    label: "Total Value",
    value: "$284,392",
    sub: "Across all accounts",
    icon: DollarSign,
    iconColor: "text-amber-400",
    iconBg: "bg-amber-500/10",
    trend: null,
  },
  {
    id: "m2",
    label: "Today's Gain",
    value: "+$3,241",
    sub: "+1.15% today",
    icon: TrendingUp,
    iconColor: "text-emerald-400",
    iconBg: "bg-emerald-500/10",
    trend: "up",
  },
  {
    id: "m3",
    label: "Portfolio Return",
    value: "+34.2%",
    sub: "Year to date",
    icon: BarChart3,
    iconColor: "text-violet-400",
    iconBg: "bg-violet-500/10",
    trend: "up",
  },
  {
    id: "m4",
    label: "Risk Score",
    value: "Moderate",
    sub: "Balanced profile",
    icon: Shield,
    iconColor: "text-cyan-400",
    iconBg: "bg-cyan-500/10",
    trend: null,
  },
];

const allocations = [
  { label: "Tech", pct: 42, color: "bg-violet-500" },
  { label: "Healthcare", pct: 18, color: "bg-cyan-500" },
  { label: "Finance", pct: 15, color: "bg-amber-500" },
  { label: "Energy", pct: 12, color: "bg-emerald-500" },
  { label: "Other", pct: 13, color: "bg-white/20" },
];

const holdings = [
  { id: "h1", asset: "NVDA", name: "NVIDIA Corp", price: "$875.40", change: "+4.21%", value: "$87,540", weight: "30.8%", up: true },
  { id: "h2", asset: "AAPL", name: "Apple Inc", price: "$189.30", change: "+0.84%", value: "$56,790", weight: "20.0%", up: true },
  { id: "h3", asset: "MSFT", name: "Microsoft Corp", price: "$415.20", change: "-0.32%", value: "$49,824", weight: "17.5%", up: false },
  { id: "h4", asset: "GOOGL", name: "Alphabet Inc", price: "$172.80", change: "+1.67%", value: "$41,472", weight: "14.6%", up: true },
  { id: "h5", asset: "BTC", name: "Bitcoin", price: "$67,420", change: "-2.14%", value: "$48,766", weight: "17.1%", up: false },
];

const insights = [
  {
    id: "i1",
    signal: "BUY",
    signalColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
    asset: "NVDA — NVIDIA Corp",
    reasoning:
      "AI infrastructure spending is accelerating with hyperscalers committing record capex. NVDA's H100/H200 GPU backlog extends 12+ months. Data center revenue grew 427% YoY — momentum remains structurally intact.",
    confidence: 91,
    confidenceColor: "bg-emerald-500",
    icon: TrendingUp,
    iconColor: "text-emerald-400",
  },
  {
    id: "i2",
    signal: "WATCH",
    signalColor: "text-amber-400 bg-amber-500/10 border-amber-500/30",
    asset: "US Treasuries — 10Y",
    reasoning:
      "Yield curve inversion is narrowing as Fed signals a potential pivot. A steepening curve historically precedes equity rotation into value. Monitor the 2Y/10Y spread for confirmation before repositioning.",
    confidence: 74,
    confidenceColor: "bg-amber-500",
    icon: Target,
    iconColor: "text-amber-400",
  },
  {
    id: "i3",
    signal: "ALERT",
    signalColor: "text-rose-400 bg-rose-500/10 border-rose-500/30",
    asset: "BTC — Bitcoin",
    reasoning:
      "30-day realized volatility has spiked to 68%, well above the 90-day average of 44%. On-chain data shows large wallet outflows to exchanges — a historically bearish short-term signal. Consider reducing exposure.",
    confidence: 82,
    confidenceColor: "bg-rose-500",
    icon: AlertCircle,
    iconColor: "text-rose-400",
  },
  {
    id: "i4",
    signal: "BUY",
    signalColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
    asset: "Healthcare Sector — XLV",
    reasoning:
      "Aging demographics and GLP-1 drug tailwinds are creating a multi-year growth runway. The sector trades at a 15% discount to its 5-year average P/E. AI-driven drug discovery is an additional catalyst.",
    confidence: 78,
    confidenceColor: "bg-emerald-500",
    icon: Zap,
    iconColor: "text-cyan-400",
  },
];

const sectorPerformance = [
  { label: "Technology", change: "+2.84%", up: true, bar: 85 },
  { label: "Healthcare", change: "+1.12%", up: true, bar: 55 },
  { label: "Energy", change: "+0.67%", up: true, bar: 40 },
  { label: "Financials", change: "-0.43%", up: false, bar: 30 },
  { label: "Real Estate", change: "-1.21%", up: false, bar: 20 },
  { label: "Utilities", change: "-0.88%", up: false, bar: 25 },
];

const economicIndicators = [
  { label: "GDP Growth", value: "2.8%", status: "Healthy", statusColor: "text-emerald-400 bg-emerald-500/10" },
  { label: "CPI Inflation", value: "3.2%", status: "Elevated", statusColor: "text-amber-400 bg-amber-500/10" },
  { label: "Fed Funds Rate", value: "5.25%", status: "Restrictive", statusColor: "text-rose-400 bg-rose-500/10" },
  { label: "Unemployment", value: "3.9%", status: "Stable", statusColor: "text-emerald-400 bg-emerald-500/10" },
];

const upcomingEvents = [
  { id: "e1", event: "NVDA Earnings", date: "May 22", type: "Earnings", typeColor: "text-violet-400 bg-violet-500/10" },
  { id: "e2", event: "Fed Rate Decision", date: "May 28", type: "Macro", typeColor: "text-cyan-400 bg-cyan-500/10" },
  { id: "e3", event: "AAPL WWDC", date: "Jun 3", type: "Event", typeColor: "text-amber-400 bg-amber-500/10" },
  { id: "e4", event: "CPI Report", date: "Jun 12", type: "Macro", typeColor: "text-cyan-400 bg-cyan-500/10" },
];

// ─── Page ────────────────────────────────────────────────────────────────────

export default function FinancePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        {/* Glow orbs */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-20 right-1/4 w-[400px] h-[400px] bg-violet-600/12 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center gap-6"
          >
            {/* Badge */}
            <motion.div variants={fadeInUp}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium">
                <DollarSign className="w-4 h-4" />
                Finance Intelligence
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl lg:text-6xl font-space font-bold leading-tight tracking-tight"
            >
              AI-Powered{" "}
              <span className="bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
                Financial Intelligence.
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeInUp}
              className="text-lg text-white/60 max-w-2xl leading-relaxed"
            >
              Monitor your portfolio, surface investment signals, and model financial
              scenarios with real-time AI analysis.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeInUp} className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="#finance"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#finance")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-semibold text-sm hover:opacity-90 transition-opacity duration-200 shadow-lg shadow-amber-500/20"
              >
                View Portfolio
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#insights"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#insights")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/20 text-white/80 font-semibold text-sm hover:bg-white/5 hover:border-white/30 transition-all duration-200"
              >
                Get Insights
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap items-center justify-center gap-8 pt-4"
            >
              {[
                { value: "$2.4T", label: "Analyzed" },
                { value: "847", label: "Signals/Day" },
                { value: "94%", label: "Accuracy" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-space font-bold text-amber-400">{stat.value}</div>
                  <div className="text-xs text-white/40 mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Portfolio Overview ────────────────────────────────────────────── */}
      <section id="finance" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Heading */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="mb-12"
          >
            <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-3">
              <div className="w-8 h-px bg-gradient-to-r from-amber-500 to-transparent" />
              <span className="text-xs font-semibold uppercase tracking-widest text-amber-400">
                Live Portfolio
              </span>
            </motion.div>
            <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl font-space font-bold">
              Portfolio Overview
            </motion.h2>
          </motion.div>

          {/* Metric Cards */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10"
          >
            {metricCards.map((card) => (
              <motion.div
                key={card.id}
                variants={scaleIn}
                className="relative rounded-2xl border border-white/8 bg-white/3 backdrop-blur-sm p-6 overflow-hidden group hover:border-amber-500/20 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative">
                  <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${card.iconBg} mb-4`}>
                    <card.icon className={`w-5 h-5 ${card.iconColor}`} />
                  </div>
                  <div className="text-2xl font-space font-bold text-white mb-1">{card.value}</div>
                  <div className="text-xs text-white/40">{card.sub}</div>
                  <div className="text-xs text-white/30 mt-1">{card.label}</div>
                  {card.trend === "up" && (
                    <div className="absolute top-4 right-4 flex items-center gap-1 text-emerald-400">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  )}
                  {card.trend === "down" && (
                    <div className="absolute top-4 right-4 flex items-center gap-1 text-rose-400">
                      <ArrowDownRight className="w-4 h-4" />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Allocation + Holdings */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Allocation */}
            <motion.div
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="rounded-2xl border border-white/8 bg-white/3 backdrop-blur-sm p-6"
            >
              <div className="flex items-center gap-2 mb-6">
                <PieChart className="w-5 h-5 text-amber-400" />
                <h3 className="font-space font-semibold text-white">Allocation</h3>
              </div>

              {/* Stacked bar */}
              <div className="flex h-4 rounded-full overflow-hidden mb-6">
                {allocations.map((a) => (
                  <div
                    key={a.label}
                    className={`${a.color} transition-all duration-500`}
                    style={{ width: `${a.pct}%` }}
                    title={`${a.label}: ${a.pct}%`}
                  />
                ))}
              </div>

              <div className="space-y-3">
                {allocations.map((a) => (
                  <div key={a.label} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-2.5 h-2.5 rounded-full ${a.color}`} />
                      <span className="text-sm text-white/70">{a.label}</span>
                    </div>
                    <span className="text-sm font-semibold text-white">{a.pct}%</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Holdings Table */}
            <motion.div
              variants={slideInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="lg:col-span-2 rounded-2xl border border-white/8 bg-white/3 backdrop-blur-sm p-6 overflow-x-auto"
            >
              <div className="flex items-center gap-2 mb-6">
                <BarChart3 className="w-5 h-5 text-amber-400" />
                <h3 className="font-space font-semibold text-white">Holdings</h3>
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/8">
                    {["Asset", "Price", "Change", "Value", "Weight"].map((col) => (
                      <th key={col} className="text-left text-xs text-white/30 font-medium pb-3 pr-4 last:pr-0">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {holdings.map((h) => (
                    <tr key={h.id} className="border-b border-white/5 hover:bg-white/3 transition-colors duration-150">
                      <td className="py-3 pr-4">
                        <div className="font-space font-bold text-white">{h.asset}</div>
                        <div className="text-xs text-white/40">{h.name}</div>
                      </td>
                      <td className="py-3 pr-4 text-white/80">{h.price}</td>
                      <td className={`py-3 pr-4 font-semibold ${h.up ? "text-emerald-400" : "text-rose-400"}`}>
                        <span className="flex items-center gap-1">
                          {h.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                          {h.change}
                        </span>
                      </td>
                      <td className="py-3 pr-4 text-white/80">{h.value}</td>
                      <td className="py-3 text-white/50">{h.weight}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── AI Investment Insights ────────────────────────────────────────── */}
      <section id="insights" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent via-violet-950/10 to-transparent">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="mb-12"
          >
            <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-3">
              <div className="w-8 h-px bg-gradient-to-r from-violet-500 to-transparent" />
              <span className="text-xs font-semibold uppercase tracking-widest text-violet-400">
                AI Analysis
              </span>
            </motion.div>
            <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl font-space font-bold">
              AI Investment Insights
            </motion.h2>
            <motion.p variants={fadeInUp} className="mt-3 text-white/50 max-w-xl">
              Real-time signals generated by our AI engine, cross-referenced against market data, on-chain analytics, and macroeconomic indicators.
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {insights.map((ins) => (
              <motion.div
                key={ins.id}
                variants={scaleIn}
                className="relative rounded-2xl border border-white/8 bg-white/3 backdrop-blur-sm p-6 group hover:border-white/15 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/2 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                        <ins.icon className={`w-5 h-5 ${ins.iconColor}`} />
                      </div>
                      <div>
                        <div className="font-space font-semibold text-white text-sm">{ins.asset}</div>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold border ${ins.signalColor} mt-1`}>
                          {ins.signal}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-white/30 mb-1">Confidence</div>
                      <div className="text-lg font-space font-bold text-white">{ins.confidence}%</div>
                    </div>
                  </div>

                  {/* Reasoning */}
                  <p className="text-sm text-white/60 leading-relaxed mb-4">{ins.reasoning}</p>

                  {/* Confidence bar */}
                  <div className="mb-4">
                    <div className="h-1.5 bg-white/8 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${ins.confidenceColor} rounded-full transition-all duration-700`}
                        style={{ width: `${ins.confidence}%` }}
                      />
                    </div>
                  </div>

                  {/* Action */}
                  <button className="flex items-center gap-2 text-xs font-semibold text-white/50 hover:text-white transition-colors duration-200 group/btn">
                    View Full Analysis
                    <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform duration-200" />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Live Market Trends ────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="mb-12"
          >
            <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-3">
              <div className="w-8 h-px bg-gradient-to-r from-cyan-500 to-transparent" />
              <span className="text-xs font-semibold uppercase tracking-widest text-cyan-400">
                Real-Time
              </span>
            </motion.div>
            <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl font-space font-bold">
              Live Market Trends
            </motion.h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            {/* Sector Performance */}
            <motion.div
              variants={scaleIn}
              className="rounded-2xl border border-white/8 bg-white/3 backdrop-blur-sm p-6 bg-gradient-to-br from-violet-500/5 to-transparent"
            >
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp className="w-5 h-5 text-violet-400" />
                <h3 className="font-space font-semibold text-white">Sector Performance</h3>
              </div>
              <div className="space-y-4">
                {sectorPerformance.map((s) => (
                  <div key={s.label}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-white/70">{s.label}</span>
                      <span className={`text-sm font-semibold ${s.up ? "text-emerald-400" : "text-rose-400"}`}>
                        {s.change}
                      </span>
                    </div>
                    <div className="h-1.5 bg-white/8 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${s.up ? "bg-emerald-500" : "bg-rose-500"}`}
                        style={{ width: `${s.bar}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Economic Indicators */}
            <motion.div
              variants={scaleIn}
              className="rounded-2xl border border-white/8 bg-white/3 backdrop-blur-sm p-6 bg-gradient-to-br from-cyan-500/5 to-transparent"
            >
              <div className="flex items-center gap-2 mb-6">
                <BarChart3 className="w-5 h-5 text-cyan-400" />
                <h3 className="font-space font-semibold text-white">Economic Indicators</h3>
              </div>
              <div className="space-y-4">
                {economicIndicators.map((ind) => (
                  <div key={ind.label} className="flex items-center justify-between p-3 rounded-xl bg-white/3 border border-white/5">
                    <div>
                      <div className="text-sm text-white/70">{ind.label}</div>
                      <div className="text-lg font-space font-bold text-white mt-0.5">{ind.value}</div>
                    </div>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${ind.statusColor}`}>
                      {ind.status}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Upcoming Events */}
            <motion.div
              variants={scaleIn}
              className="rounded-2xl border border-white/8 bg-white/3 backdrop-blur-sm p-6 bg-gradient-to-br from-amber-500/5 to-transparent"
            >
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <h3 className="font-space font-semibold text-white">Upcoming Events</h3>
              </div>
              <div className="space-y-3">
                {upcomingEvents.map((ev) => (
                  <div key={ev.id} className="flex items-center gap-4 p-3 rounded-xl bg-white/3 border border-white/5 hover:border-white/10 transition-colors duration-200">
                    <div className="text-center min-w-[48px]">
                      <div className="text-xs text-white/40">{ev.date.split(" ")[0]}</div>
                      <div className="text-lg font-space font-bold text-white leading-tight">{ev.date.split(" ")[1]}</div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-white truncate">{ev.event}</div>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${ev.typeColor} mt-1 inline-block`}>
                        {ev.type}
                      </span>
                    </div>
                    <CheckCircle className="w-4 h-4 text-white/20 flex-shrink-0" />
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Back Link ─────────────────────────────────────────────────────── */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors duration-200 group"
          >
            <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform duration-200" />
            Back to Dashboard
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/research"
              className="text-sm text-white/40 hover:text-white transition-colors duration-200"
            >
              Research
            </Link>
            <span className="text-white/20">·</span>
            <Link
              href="/business"
              className="text-sm text-white/40 hover:text-white transition-colors duration-200"
            >
              Business
            </Link>
            <span className="text-white/20">·</span>
            <Link
              href="/documents"
              className="text-sm text-white/40 hover:text-white transition-colors duration-200"
            >
              Documents
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
