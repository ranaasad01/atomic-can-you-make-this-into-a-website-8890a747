"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FileText, Upload, Search, FolderOpen, File, CheckCircle, Clock, Star, MoreVertical, Download, Eye, Brain, Sparkles, ArrowRight, Filter, Grid, List, ArrowLeft, Shield, GitCompare, Database, AlertTriangle, Zap } from 'lucide-react';
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  scaleIn,
  slideInLeft,
  slideInRight,
} from "@/lib/motion";

// ─── Mock Data ───────────────────────────────────────────────────────────────

type DocStatus = "Analyzed" | "Processing" | "Pending";

const mockDocuments = [
  {
    id: "d1",
    name: "Q4_Financial_Report.pdf",
    size: "2.4 MB",
    modified: "Jan 12, 2025",
    type: "pdf",
    status: "Analyzed" as DocStatus,
    color: "text-rose-400",
    bg: "bg-rose-500/10",
    border: "border-rose-500/20",
  },
  {
    id: "d2",
    name: "Patent_Application_2024.pdf",
    size: "1.8 MB",
    modified: "Jan 10, 2025",
    type: "pdf",
    status: "Analyzed" as DocStatus,
    color: "text-rose-400",
    bg: "bg-rose-500/10",
    border: "border-rose-500/20",
  },
  {
    id: "d3",
    name: "Investor_Deck.pptx",
    size: "5.1 MB",
    modified: "Jan 9, 2025",
    type: "pptx",
    status: "Processing" as DocStatus,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
  },
  {
    id: "d4",
    name: "Market_Research.docx",
    size: "890 KB",
    modified: "Jan 8, 2025",
    type: "docx",
    status: "Analyzed" as DocStatus,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
  },
  {
    id: "d5",
    name: "Employment_Contract.pdf",
    size: "340 KB",
    modified: "Jan 7, 2025",
    type: "pdf",
    status: "Pending" as DocStatus,
    color: "text-rose-400",
    bg: "bg-rose-500/10",
    border: "border-rose-500/20",
  },
  {
    id: "d6",
    name: "Product_Roadmap.xlsx",
    size: "1.2 MB",
    modified: "Jan 6, 2025",
    type: "xlsx",
    status: "Analyzed" as DocStatus,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
];

const analysisTabs = ["Summary", "Key Points", "Entities", "Action Items"];

const actionItems = [
  "Schedule follow-up with CFO regarding Q1 projections",
  "Review risk factors section with legal team",
  "Update investor presentation with revised revenue figures",
  "Prepare variance analysis for board meeting",
];

const capabilities = [
  {
    id: "c1",
    icon: Sparkles,
    title: "Smart Summarization",
    description:
      "Instantly condense lengthy documents into clear, actionable executive summaries without losing critical details.",
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
  },
  {
    id: "c2",
    icon: Shield,
    title: "Contract Analysis",
    description:
      "Identify risky clauses, obligations, and key terms in contracts with AI-powered legal intelligence.",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
  },
  {
    id: "c3",
    icon: Database,
    title: "Data Extraction",
    description:
      "Pull structured data — tables, figures, dates, and entities — from unstructured documents automatically.",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
  {
    id: "c4",
    icon: AlertTriangle,
    title: "Compliance Check",
    description:
      "Cross-reference documents against regulatory frameworks and flag potential compliance issues instantly.",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
  },
  {
    id: "c5",
    icon: GitCompare,
    title: "Multi-Doc Comparison",
    description:
      "Compare multiple versions of a document or different contracts side-by-side to surface key differences.",
    color: "text-rose-400",
    bg: "bg-rose-500/10",
    border: "border-rose-500/20",
  },
  {
    id: "c6",
    icon: Zap,
    title: "Secure Storage",
    description:
      "All documents are encrypted at rest and in transit. Your data never trains our models without consent.",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
  },
];

// ─── Status Badge ─────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: DocStatus }) {
  const styles: Record<DocStatus, string> = {
    Analyzed: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    Processing: "bg-amber-500/15 text-amber-400 border-amber-500/30",
    Pending: "bg-white/5 text-white/40 border-white/10",
  };
  const icons: Record<DocStatus, React.ReactNode> = {
    Analyzed: <CheckCircle className="w-3 h-3" />,
    Processing: <Clock className="w-3 h-3 animate-spin" />,
    Pending: <Clock className="w-3 h-3" />,
  };
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${styles[status]}`}
    >
      {icons[status]}
      {status}
    </span>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DocumentsPage() {
  const [activeTab, setActiveTab] = useState("Summary");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDocs = mockDocuments.filter((d) =>
    d.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        {/* Background glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/12 rounded-full blur-3xl" />
          <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-violet-600/10 rounded-full blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:64px_64px]" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          {/* Back link */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="flex justify-center mb-8"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Link>
          </motion.div>

          {/* Badge */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6"
          >
            <FileText className="w-4 h-4" />
            Document Hub
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="text-4xl sm:text-5xl lg:text-6xl font-space font-bold tracking-tight mb-6"
          >
            Your Documents,{" "}
            <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
              Supercharged by AI.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="text-lg text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Upload, organize, and extract deep insights from any document.
            Contracts, patents, reports — AIOS reads them all.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap items-center justify-center gap-4 mb-16"
          >
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-white font-semibold text-sm shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-shadow duration-300"
            >
              <Upload className="w-4 h-4" />
              Upload Document
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/15 text-white/70 hover:text-white hover:border-white/30 font-semibold text-sm transition-all duration-200"
            >
              <FolderOpen className="w-4 h-4" />
              Browse Files
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap items-center justify-center gap-8"
          >
            {[
              { label: "Docs Processed", value: "10K+" },
              { label: "Analysis Time", value: "< 5s" },
              { label: "File Types", value: "50+" },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                variants={scaleIn}
                className="text-center"
              >
                <div className="text-2xl font-space font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-xs text-white/40 uppercase tracking-widest">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── DOCUMENT MANAGER ─────────────────────────────────────────────── */}
      <section
        id="documents"
        className="py-24 px-4 sm:px-6 lg:px-8 border-t border-white/5"
      >
        <div className="max-w-7xl mx-auto">
          {/* Section heading */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="mb-10"
          >
            <h2 className="text-3xl font-space font-bold text-white mb-2">
              Document Library
            </h2>
            <p className="text-white/40 text-sm">
              All your files in one place — searchable, filterable, and AI-ready.
            </p>
          </motion.div>

          {/* Top bar */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="flex flex-wrap items-center gap-3 mb-6"
          >
            {/* Search */}
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                type="text"
                placeholder="Search documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-white/30 focus:outline-none focus:border-blue-500/50 focus:bg-white/8 transition-all duration-200"
              />
            </div>
            {/* Filter */}
            <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white/60 hover:text-white hover:border-white/20 transition-all duration-200">
              <Filter className="w-4 h-4" />
              Filter
            </button>
            {/* View toggle */}
            <div className="flex items-center gap-1 p-1 rounded-xl bg-white/5 border border-white/10">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  viewMode === "grid"
                    ? "bg-blue-600 text-white"
                    : "text-white/40 hover:text-white"
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  viewMode === "list"
                    ? "bg-blue-600 text-white"
                    : "text-white/40 hover:text-white"
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          {/* Upload zone */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="mb-8"
          >
            <div className="border-2 border-dashed border-white/10 hover:border-blue-500/40 rounded-2xl p-10 text-center transition-all duration-300 cursor-pointer group bg-white/2 hover:bg-blue-500/5">
              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Upload className="w-6 h-6 text-blue-400" />
              </div>
              <p className="text-white/70 font-medium mb-1">
                Drop files here or click to upload
              </p>
              <p className="text-sm text-white/30">
                Supports PDF, DOCX, XLSX, TXT, and 50+ more formats
              </p>
            </div>
          </motion.div>

          {/* Document grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {filteredDocs.map((doc) => (
              <motion.div
                key={doc.id}
                variants={scaleIn}
                whileHover={{ y: -4, scale: 1.01 }}
                className={`relative p-5 rounded-2xl bg-white/3 border ${doc.border} hover:bg-white/6 transition-all duration-300 group`}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-10 h-10 rounded-xl ${doc.bg} border ${doc.border} flex items-center justify-center`}
                  >
                    <FileText className={`w-5 h-5 ${doc.color}`} />
                  </div>
                  <button className="w-7 h-7 flex items-center justify-center rounded-lg text-white/20 hover:text-white/60 hover:bg-white/10 transition-all duration-200 opacity-0 group-hover:opacity-100">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>

                {/* File info */}
                <p className="text-sm font-medium text-white mb-1 truncate">
                  {doc.name}
                </p>
                <div className="flex items-center gap-3 text-xs text-white/30 mb-4">
                  <span>{doc.size}</span>
                  <span>·</span>
                  <span>{doc.modified}</span>
                </div>

                {/* Status */}
                <div className="mb-4">
                  <StatusBadge status={doc.status} />
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button className="flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-white/50 hover:text-white transition-all duration-200">
                    <Eye className="w-3 h-3" />
                    View
                  </button>
                  <button className="flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-white/50 hover:text-white transition-all duration-200">
                    <Download className="w-3 h-3" />
                    Download
                  </button>
                  <button className="flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-xs text-blue-400 hover:text-blue-300 border border-blue-500/20 transition-all duration-200">
                    <Brain className="w-3 h-3" />
                    Analyze
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── AI ANALYSIS PANEL ────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-white/5 bg-[#0d0d14]">
        <div className="max-w-7xl mx-auto">
          {/* Section heading */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="mb-12 text-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-medium mb-4">
              <Brain className="w-3.5 h-3.5" />
              AI-Powered
            </div>
            <h2 className="text-3xl font-space font-bold text-white mb-3">
              AI Document Analysis
            </h2>
            <p className="text-white/40 max-w-xl mx-auto">
              Select any document and let AIOS extract meaning, surface insights,
              and generate actionable intelligence in seconds.
            </p>
          </motion.div>

          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: Document preview */}
            <motion.div
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="rounded-2xl bg-white/3 border border-white/8 overflow-hidden"
            >
              {/* Doc header */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-white/8 bg-white/2">
                <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
                  <FileText className="w-4 h-4 text-rose-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">
                    Q4_Financial_Report.pdf
                  </p>
                  <p className="text-xs text-white/30">2.4 MB · Jan 12, 2025</p>
                </div>
                <div className="ml-auto">
                  <StatusBadge status="Analyzed" />
                </div>
              </div>

              {/* Mock document preview */}
              <div className="p-6 space-y-3">
                <div className="h-3 bg-white/8 rounded-full w-full" />
                <div className="h-3 bg-white/6 rounded-full w-5/6" />
                <div className="h-3 bg-white/8 rounded-full w-full" />
                <div className="h-3 bg-white/5 rounded-full w-4/6" />
                <div className="h-3 bg-white/8 rounded-full w-full" />
                <div className="h-3 bg-white/6 rounded-full w-3/4" />
                <div className="mt-6 h-3 bg-white/8 rounded-full w-full" />
                <div className="h-3 bg-white/6 rounded-full w-5/6" />
                <div className="h-3 bg-white/8 rounded-full w-full" />
                <div className="h-3 bg-white/5 rounded-full w-2/3" />
                <div className="h-3 bg-white/8 rounded-full w-full" />
                <div className="mt-6 h-3 bg-white/8 rounded-full w-full" />
                <div className="h-3 bg-white/6 rounded-full w-4/5" />
                <div className="h-3 bg-white/8 rounded-full w-full" />
                <div className="h-3 bg-white/5 rounded-full w-3/5" />
                {/* Highlighted section */}
                <div className="mt-4 p-3 rounded-lg bg-blue-500/8 border border-blue-500/20">
                  <div className="h-3 bg-blue-400/30 rounded-full w-full mb-2" />
                  <div className="h-3 bg-blue-400/20 rounded-full w-4/5" />
                </div>
              </div>
            </motion.div>

            {/* Right: AI Analysis results */}
            <motion.div
              variants={slideInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="rounded-2xl bg-white/3 border border-white/8 overflow-hidden"
            >
              {/* Tabs */}
              <div className="flex items-center gap-1 px-4 py-3 border-b border-white/8 bg-white/2">
                {analysisTabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                      activeTab === tab
                        ? "bg-blue-600 text-white"
                        : "text-white/40 hover:text-white hover:bg-white/8"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="p-6">
                {activeTab === "Summary" && (
                  <div className="space-y-5">
                    <div className="flex items-center gap-2 mb-4">
                      <Sparkles className="w-4 h-4 text-violet-400" />
                      <span className="text-xs font-medium text-violet-400 uppercase tracking-widest">
                        AI Executive Summary
                      </span>
                    </div>
                    <p className="text-sm text-white/70 leading-relaxed">
                      The Q4 Financial Report demonstrates strong revenue growth
                      of 23% year-over-year, reaching $4.2M in total revenue.
                      Operating margins improved by 4.2 percentage points driven
                      by efficiency gains in the core product line. Three
                      significant risk factors were identified, including
                      increased competitive pressure in the mid-market segment
                      and supply chain dependencies.
                    </p>
                    {/* Key metrics */}
                    <div className="grid grid-cols-3 gap-3 mt-6">
                      {[
                        { label: "Revenue", value: "$4.2M", color: "text-emerald-400" },
                        { label: "Growth", value: "23%", color: "text-cyan-400" },
                        { label: "Risk Factors", value: "3", color: "text-amber-400" },
                      ].map((metric) => (
                        <div
                          key={metric.label}
                          className="p-3 rounded-xl bg-white/4 border border-white/8 text-center"
                        >
                          <div
                            className={`text-xl font-space font-bold ${metric.color} mb-1`}
                          >
                            {metric.value}
                          </div>
                          <div className="text-xs text-white/30">{metric.label}</div>
                        </div>
                      ))}
                    </div>
                    {/* Action items */}
                    <div className="mt-6">
                      <p className="text-xs font-medium text-white/40 uppercase tracking-widest mb-3">
                        Action Items
                      </p>
                      <ul className="space-y-2">
                        {actionItems.map((item, i) => (
                          <li key={i} className="flex items-start gap-2.5">
                            <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                            <span className="text-sm text-white/60">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {activeTab === "Key Points" && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 mb-4">
                      <Star className="w-4 h-4 text-amber-400" />
                      <span className="text-xs font-medium text-amber-400 uppercase tracking-widest">
                        Key Points
                      </span>
                    </div>
                    {[
                      "Revenue grew 23% YoY to $4.2M, exceeding Q4 targets by 8%",
                      "Customer acquisition cost decreased by 12% through optimized marketing channels",
                      "Net Promoter Score improved from 42 to 61 following product updates",
                      "International expansion contributed 18% of total revenue, up from 11%",
                      "R&D investment increased to 22% of revenue, signaling product pipeline growth",
                    ].map((point, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 p-3 rounded-xl bg-white/3 border border-white/6"
                      >
                        <span className="text-xs font-bold text-white/20 mt-0.5 w-4 shrink-0">
                          {i + 1}
                        </span>
                        <span className="text-sm text-white/60">{point}</span>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "Entities" && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 mb-4">
                      <Database className="w-4 h-4 text-cyan-400" />
                      <span className="text-xs font-medium text-cyan-400 uppercase tracking-widest">
                        Extracted Entities
                      </span>
                    </div>
                    {[
                      { type: "Organization", values: ["Acme Corp", "TechVentures LLC", "Global Markets Inc"] },
                      { type: "People", values: ["Sarah Chen (CFO)", "Marcus Webb (CEO)", "Dr. Priya Nair"] },
                      { type: "Dates", values: ["Q4 2024", "March 31, 2025", "FY2025"] },
                      { type: "Financial", values: ["$4.2M", "23% growth", "$1.8M ARR"] },
                    ].map((group) => (
                      <div key={group.type} className="p-3 rounded-xl bg-white/3 border border-white/6">
                        <p className="text-xs text-white/30 mb-2">{group.type}</p>
                        <div className="flex flex-wrap gap-2">
                          {group.values.map((v) => (
                            <span key={v} className="px-2 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-xs text-cyan-400">
                              {v}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "Action Items" && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 mb-4">
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs font-medium text-emerald-400 uppercase tracking-widest">
                        Action Items
                      </span>
                    </div>
                    {actionItems.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 p-3 rounded-xl bg-white/3 border border-white/6"
                      >
                        <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                        <span className="text-sm text-white/60">{item}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CAPABILITIES ─────────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          {/* Section heading */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl font-space font-bold text-white mb-3">
              What AIOS Does With Your Documents
            </h2>
            <p className="text-white/40 max-w-xl mx-auto">
              From raw files to actionable intelligence — AIOS transforms every
              document into a strategic asset.
            </p>
          </motion.div>

          {/* Capabilities grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-5"
          >
            {capabilities.map((cap) => (
              <motion.div
                key={cap.id}
                variants={scaleIn}
                whileHover={{ y: -4 }}
                className={`p-6 rounded-2xl bg-white/3 border ${cap.border} hover:bg-white/5 transition-all duration-300`}
              >
                <div
                  className={`w-11 h-11 rounded-xl ${cap.bg} border ${cap.border} flex items-center justify-center mb-4`}
                >
                  <cap.icon className={`w-5 h-5 ${cap.color}`} />
                </div>
                <h3 className="text-base font-semibold text-white mb-2">
                  {cap.title}
                </h3>
                <p className="text-sm text-white/40 leading-relaxed">
                  {cap.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="text-center mt-14"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
