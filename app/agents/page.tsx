"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Settings, Zap, Play, Pause, Square, Plus, Activity, CheckCircle, Clock, AlertCircle, ArrowRight, Sparkles, Bot, Terminal, RefreshCw, Cpu, Network } from 'lucide-react';
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  scaleIn,
} from "@/lib/motion";

// ─── Types ───────────────────────────────────────────────────────────────────

type AgentStatus = "running" | "paused" | "error";

interface Agent {
  id: string;
  name: string;
  status: AgentStatus;
  task: string;
  progress: number;
  tasksCompleted: number;
  runtime: string;
  nextRun: string;
}

interface LogEntry {
  id: string;
  time: string;
  agent: string;
  action: string;
  type: "success" | "info" | "warning";
}

interface AgentTemplate {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  color: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const agents: Agent[] = [
  {
    id: "ag1",
    name: "Market Monitor Alpha",
    status: "running",
    task: "Scanning 847 market signals across 12 sectors",
    progress: 73,
    tasksCompleted: 1204,
    runtime: "6h 23m",
    nextRun: "Continuous",
  },
  {
    id: "ag2",
    name: "Patent Watcher",
    status: "running",
    task: "Monitoring USPTO database for competitor filings",
    progress: 45,
    tasksCompleted: 892,
    runtime: "2d 14h",
    nextRun: "Continuous",
  },
  {
    id: "ag3",
    name: "Email Triage Bot",
    status: "paused",
    task: "Categorizing and prioritizing inbox items",
    progress: 100,
    tasksCompleted: 3421,
    runtime: "12d",
    nextRun: "On demand",
  },
  {
    id: "ag4",
    name: "Competitor Tracker",
    status: "running",
    task: "Analyzing competitor product updates and pricing",
    progress: 28,
    tasksCompleted: 567,
    runtime: "4h 12m",
    nextRun: "Continuous",
  },
];

const logEntries: LogEntry[] = [
  { id: "l1",  time: "14:23:01", agent: "Market Monitor Alpha",  action: "Found 3 new investment signals in semiconductor sector",         type: "success" },
  { id: "l2",  time: "14:22:47", agent: "Patent Watcher",         action: "Detected 2 new USPTO filings from competitor TechCorp",       type: "warning" },
  { id: "l3",  time: "14:21:33", agent: "Competitor Tracker",     action: "Price change detected: CompetitorX reduced SaaS tier by 15%", type: "info"    },
  { id: "l4",  time: "14:20:18", agent: "Market Monitor Alpha",  action: "AI infrastructure index up 2.3% — flagging opportunity",       type: "success" },
  { id: "l5",  time: "14:19:55", agent: "Email Triage Bot",       action: "Paused — awaiting manual resume from user",                   type: "warning" },
  { id: "l6",  time: "14:18:40", agent: "Patent Watcher",         action: "Scan complete: 1,204 patents reviewed, 0 conflicts found",    type: "success" },
  { id: "l7",  time: "14:17:22", agent: "Competitor Tracker",     action: "New product page detected on competitor site",                type: "info"    },
  { id: "l8",  time: "14:16:09", agent: "Market Monitor Alpha",  action: "Biotech sector volatility spike — monitoring closely",         type: "warning" },
  { id: "l9",  time: "14:15:01", agent: "Patent Watcher",         action: "Cross-referenced 47 claims against existing portfolio",       type: "info"    },
  { id: "l10", time: "14:14:33", agent: "Competitor Tracker",     action: "Scraped 12 competitor blog posts for strategic signals",      type: "success" },
];

const agentTemplates: AgentTemplate[] = [
  {
    id: "t1",
    name: "News Monitor",
    description: "Continuously scans top news sources and surfaces relevant stories based on your interests.",
    icon: Activity,
    color: "text-violet-400",
  },
  {
    id: "t2",
    name: "Social Listener",
    description: "Monitors social platforms for brand mentions, sentiment shifts, and trending topics.",
    icon: Network,
    color: "text-cyan-400",
  },
  {
    id: "t3",
    name: "Data Harvester",
    description: "Extracts, cleans, and structures data from specified web sources on a schedule.",
    icon: Cpu,
    color: "text-emerald-400",
  },
];

// ─── Status helpers ───────────────────────────────────────────────────────────

function statusDot(status: AgentStatus) {
  if (status === "running") return "bg-emerald-400 shadow-[0_0_6px_2px_rgba(52,211,153,0.5)]";
  if (status === "paused")  return "bg-amber-400  shadow-[0_0_6px_2px_rgba(251,191,36,0.5)]";
  return "bg-rose-400 shadow-[0_0_6px_2px_rgba(251,113,133,0.5)]";
}

function statusLabel(status: AgentStatus) {
  if (status === "running") return { text: "Running",  cls: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" };
  if (status === "paused")  return { text: "Paused",   cls: "text-amber-400  bg-amber-500/10  border-amber-500/20"  };
  return { text: "Error", cls: "text-rose-400 bg-rose-500/10 border-rose-500/20" };
}

function logColor(type: LogEntry["type"]) {
  if (type === "success") return "text-emerald-400";
  if (type === "info")    return "text-cyan-400";
  return "text-amber-400";
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function AgentsPage() {
  const [agentStates, setAgentStates] = useState<Record<string, AgentStatus>>(
    Object.fromEntries(agents.map((a) => [a.id, a.status]))
  );
  const [log, setLog] = useState<LogEntry[]>(logEntries);
  const [agentName, setAgentName]       = useState("");
  const [agentType, setAgentType]       = useState("Research");
  const [agentTask, setAgentTask]       = useState("");
  const [schedule, setSchedule]         = useState("Continuous");
  const [priority, setPriority]         = useState("Medium");

  const togglePause = (id: string) => {
    setAgentStates((prev) => ({
      ...prev,
      [id]: prev[id] === "running" ? "paused" : "running",
    }));
  };

  const clearLog = () => setLog([]);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        {/* Glow orbs */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-violet-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-20 right-1/4 w-[400px] h-[400px] bg-cyan-500/15 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-10 left-1/2 w-[300px] h-[300px] bg-violet-400/10 rounded-full blur-[80px] pointer-events-none" />

        {/* Electric grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(124,58,237,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.8) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

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
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-sm font-medium mb-6"
          >
            <Settings className="w-4 h-4" />
            Autonomous AI Agents
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="text-5xl sm:text-6xl lg:text-7xl font-space font-bold tracking-tight mb-6"
          >
            Deploy AI Agents.{" "}
            <span className="bg-gradient-to-r from-violet-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent">
              Automate Everything.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="text-lg text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Spawn intelligent agents that work 24/7 — researching, monitoring,
            executing tasks, and reporting back with results.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap items-center justify-center gap-4 mb-16"
          >
            <a
              href="#spawn"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-violet-500 text-white font-semibold text-sm hover:from-violet-500 hover:to-violet-400 transition-all duration-200 shadow-[0_0_24px_rgba(124,58,237,0.4)]"
            >
              <Plus className="w-4 h-4" />
              Spawn New Agent
            </a>
            <a
              href="#agents"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/20 text-white/80 font-semibold text-sm hover:border-white/40 hover:text-white hover:bg-white/5 transition-all duration-200"
            >
              <Bot className="w-4 h-4" />
              View Active Agents
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto"
          >
            {[
              { label: "Active Agents",     value: "12",    icon: Bot,          color: "text-violet-400" },
              { label: "Tasks Completed",   value: "1,847", icon: CheckCircle,  color: "text-emerald-400" },
              { label: "Uptime",            value: "99.9%", icon: Activity,     color: "text-cyan-400" },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                variants={scaleIn}
                className="flex flex-col items-center gap-2 p-5 rounded-2xl border border-white/8 bg-white/3 backdrop-blur-sm"
              >
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
                <span className="text-3xl font-space font-bold text-white">{stat.value}</span>
                <span className="text-xs text-white/40 uppercase tracking-widest">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── ACTIVE AGENTS ────────────────────────────────────────────────── */}
      <section id="agents" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="flex items-center justify-between mb-10"
          >
            <div>
              <h2 className="text-3xl font-space font-bold text-white">Active Agents</h2>
              <p className="text-white/40 mt-1 text-sm">Monitor and control your deployed agents in real time.</p>
            </div>
            <a
              href="#spawn"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-violet-500 text-white font-semibold text-sm hover:from-violet-500 hover:to-violet-400 transition-all duration-200 shadow-[0_0_16px_rgba(124,58,237,0.3)]"
            >
              <Plus className="w-4 h-4" />
              Spawn New Agent
            </a>
          </motion.div>

          {/* Agent cards */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {agents.map((agent) => {
              const currentStatus = agentStates[agent.id];
              const sl = statusLabel(currentStatus);
              return (
                <motion.div
                  key={agent.id}
                  variants={scaleIn}
                  className="relative p-6 rounded-2xl border border-white/10 bg-white/3 backdrop-blur-sm hover:border-violet-500/30 transition-all duration-300 group"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className={`w-2.5 h-2.5 rounded-full ${statusDot(currentStatus)}`} />
                      </div>
                      <div>
                        <h3 className="font-space font-semibold text-white text-base">{agent.name}</h3>
                        <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium border ${sl.cls}`}>
                          {sl.text}
                        </span>
                      </div>
                    </div>
                    <Bot className="w-5 h-5 text-white/20 group-hover:text-violet-400 transition-colors duration-200" />
                  </div>

                  {/* Current task */}
                  <p className="text-sm text-white/50 mb-4 leading-relaxed">{agent.task}</p>

                  {/* Progress bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs text-white/30">Progress</span>
                      <span className="text-xs text-white/60 font-medium">{agent.progress}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/8 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${agent.progress}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                        className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400"
                      />
                    </div>
                  </div>

                  {/* Stats row */}
                  <div className="grid grid-cols-3 gap-3 mb-5">
                    {[
                      { label: "Tasks",   value: agent.tasksCompleted.toLocaleString("en-US"), icon: CheckCircle },
                      { label: "Runtime", value: agent.runtime,                                icon: Clock       },
                      { label: "Next Run",value: agent.nextRun,                                icon: RefreshCw   },
                    ].map((s) => (
                      <div key={s.label} className="flex flex-col items-center gap-1 p-2 rounded-lg bg-white/4">
                        <s.icon className="w-3.5 h-3.5 text-white/30" />
                        <span className="text-xs font-semibold text-white/80">{s.value}</span>
                        <span className="text-[10px] text-white/30 uppercase tracking-wider">{s.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => togglePause(agent.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/6 hover:bg-violet-500/20 border border-white/10 hover:border-violet-500/30 text-white/60 hover:text-violet-300 text-xs font-medium transition-all duration-200"
                    >
                      {currentStatus === "running" ? (
                        <><Pause className="w-3 h-3" /> Pause</>
                      ) : (
                        <><Play className="w-3 h-3" /> Resume</>
                      )}
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/6 hover:bg-rose-500/20 border border-white/10 hover:border-rose-500/30 text-white/60 hover:text-rose-300 text-xs font-medium transition-all duration-200">
                      <Square className="w-3 h-3" /> Stop
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/6 hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-500/30 text-white/60 hover:text-cyan-300 text-xs font-medium transition-all duration-200 ml-auto">
                      <Terminal className="w-3 h-3" /> View Logs
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── TASK LOG ─────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0d0d16]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="flex items-center justify-between mb-8"
          >
            <div>
              <h2 className="text-3xl font-space font-bold text-white">Recent Task Log</h2>
              <p className="text-white/40 mt-1 text-sm">Live feed of agent activity across all deployed instances.</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={clearLog}
                className="px-3 py-1.5 rounded-lg bg-white/6 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 text-xs font-medium transition-all duration-200"
              >
                Clear Log
              </button>
              <button className="px-3 py-1.5 rounded-lg bg-violet-600/20 border border-violet-500/30 text-violet-300 hover:bg-violet-600/30 text-xs font-medium transition-all duration-200">
                Export
              </button>
            </div>
          </motion.div>

          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="rounded-2xl border border-white/10 bg-black/60 backdrop-blur-sm overflow-hidden"
          >
            {/* Terminal header */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/8 bg-white/3">
              <div className="w-3 h-3 rounded-full bg-rose-500/70" />
              <div className="w-3 h-3 rounded-full bg-amber-500/70" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/70" />
              <span className="ml-3 text-xs text-white/30 font-mono">agent-task-log — live</span>
              <div className="ml-auto flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] text-emerald-400 font-mono">LIVE</span>
              </div>
            </div>

            {/* Log entries */}
            <div className="p-4 space-y-1 max-h-80 overflow-y-auto font-mono text-sm">
              {log.length === 0 ? (
                <p className="text-white/20 text-xs py-4 text-center">Log cleared. Waiting for new events…</p>
              ) : (
                log.map((entry) => (
                  <div key={entry.id} className="flex items-start gap-3 py-1">
                    <span className="text-white/25 text-xs shrink-0 mt-0.5">[{entry.time}]</span>
                    <span className="text-violet-400/70 text-xs shrink-0 mt-0.5">{entry.agent}</span>
                    <span className="text-white/20 text-xs shrink-0 mt-0.5">→</span>
                    <span className={`text-xs ${logColor(entry.type)}`}>{entry.action}</span>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SPAWN AGENT ──────────────────────────────────────────────────── */}
      <section id="spawn" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="mb-10"
          >
            <h2 className="text-3xl font-space font-bold text-white">Spawn a New Agent</h2>
            <p className="text-white/40 mt-1 text-sm">Configure and deploy a custom autonomous agent in seconds.</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Form */}
            <motion.div
              variants={scaleIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="lg:col-span-3 p-8 rounded-2xl border border-white/10 bg-white/3 backdrop-blur-sm"
            >
              <div className="space-y-6">
                {/* Agent Name */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-white/40 mb-2">
                    Agent Name
                  </label>
                  <input
                    type="text"
                    value={agentName}
                    onChange={(e) => setAgentName(e.target.value)}
                    placeholder="e.g. Market Sentinel v2"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 text-sm focus:outline-none focus:border-violet-500/50 focus:bg-white/8 transition-all duration-200"
                  />
                </div>

                {/* Agent Type */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-white/40 mb-2">
                    Agent Type
                  </label>
                  <select
                    value={agentType}
                    onChange={(e) => setAgentType(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-violet-500/50 transition-all duration-200 appearance-none cursor-pointer"
                  >
                    {["Research", "Monitor", "Execute", "Analyze"].map((t) => (
                      <option key={t} value={t} className="bg-[#1a1a2e] text-white">{t}</option>
                    ))}
                  </select>
                </div>

                {/* Task Description */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-white/40 mb-2">
                    Task Description
                  </label>
                  <textarea
                    value={agentTask}
                    onChange={(e) => setAgentTask(e.target.value)}
                    placeholder="Describe what this agent should do…"
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 text-sm focus:outline-none focus:border-violet-500/50 focus:bg-white/8 transition-all duration-200 resize-none"
                  />
                </div>

                {/* Schedule */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-white/40 mb-3">
                    Schedule
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {["Continuous", "Hourly", "Daily", "Weekly"].map((s) => (
                      <button
                        key={s}
                        onClick={() => setSchedule(s)}
                        className={`px-4 py-2 rounded-lg text-xs font-medium border transition-all duration-200 ${
                          schedule === s
                            ? "bg-violet-600/30 border-violet-500/50 text-violet-300"
                            : "bg-white/5 border-white/10 text-white/50 hover:text-white hover:border-white/20"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Priority */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-white/40 mb-3">
                    Priority
                  </label>
                  <div className="flex gap-2">
                    {["Low", "Medium", "High"].map((p) => (
                      <button
                        key={p}
                        onClick={() => setPriority(p)}
                        className={`flex-1 py-2 rounded-lg text-xs font-semibold border transition-all duration-200 ${
                          priority === p
                            ? p === "High"
                              ? "bg-rose-600/30 border-rose-500/50 text-rose-300"
                              : p === "Medium"
                              ? "bg-amber-600/30 border-amber-500/50 text-amber-300"
                              : "bg-emerald-600/30 border-emerald-500/50 text-emerald-300"
                            : "bg-white/5 border-white/10 text-white/50 hover:text-white hover:border-white/20"
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Deploy button */}
                <button className="w-full py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-violet-500 text-white font-semibold text-sm hover:from-violet-500 hover:to-violet-400 transition-all duration-200 shadow-[0_0_24px_rgba(124,58,237,0.4)] flex items-center justify-center gap-2">
                  <Zap className="w-4 h-4" />
                  Deploy Agent
                </button>
              </div>
            </motion.div>

            {/* Templates */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="lg:col-span-2 flex flex-col gap-4"
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-2">
                Pre-built Templates
              </p>
              {agentTemplates.map((tpl) => (
                <motion.button
                  key={tpl.id}
                  variants={fadeInUp}
                  onClick={() => {
                    setAgentName(tpl.name);
                    setAgentTask(tpl.description);
                  }}
                  className="text-left p-5 rounded-2xl border border-white/10 bg-white/3 hover:border-violet-500/30 hover:bg-violet-500/5 transition-all duration-200 group"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <tpl.icon className={`w-5 h-5 ${tpl.color}`} />
                    <span className="font-space font-semibold text-white text-sm">{tpl.name}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-white/20 group-hover:text-violet-400 ml-auto transition-colors duration-200" />
                  </div>
                  <p className="text-xs text-white/40 leading-relaxed">{tpl.description}</p>
                </motion.button>
              ))}

              {/* Info card */}
              <div className="mt-2 p-4 rounded-xl border border-cyan-500/20 bg-cyan-500/5">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-semibold text-cyan-300">Pro Tip</span>
                </div>
                <p className="text-xs text-white/40 leading-relaxed">
                  Agents with <span className="text-cyan-400">Continuous</span> schedule run indefinitely and self-heal on failure. Use <span className="text-violet-400">High Priority</span> for time-sensitive tasks.
                </p>
              </div>
            </motion.div>
          </div>
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
            <h3 className="text-2xl font-space font-bold text-white mb-3">
              Ready to automate your workflow?
            </h3>
            <p className="text-white/40 text-sm mb-8">
              Agents work around the clock so you don't have to. Deploy your first agent in under 60 seconds.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="#spawn"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-violet-500 text-white font-semibold text-sm hover:from-violet-500 hover:to-violet-400 transition-all duration-200 shadow-[0_0_24px_rgba(124,58,237,0.4)]"
              >
                <Plus className="w-4 h-4" />
                Spawn Your First Agent
              </a>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/20 text-white/70 font-semibold text-sm hover:border-white/40 hover:text-white hover:bg-white/5 transition-all duration-200"
              >
                Back to Dashboard
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
