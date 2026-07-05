"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { User, Settings, Bell, Shield, Brain, Mail, Phone, MapPin, Edit3, CheckCircle, Sparkles, ArrowRight, Key, Globe, Zap, ToggleLeft, ToggleRight } from 'lucide-react';
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  scaleIn,
  slideInLeft,
  slideInRight,
} from "@/lib/motion";

// ─── Types ──────────────────────────────────────────────────────────────────

type ToggleSetting = {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
};

type NotificationSetting = {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
  icon: React.ElementType;
};

// ─── Initial Data ────────────────────────────────────────────────────────────

const initialAIToggles: ToggleSetting[] = [
  { id: "greeting", label: "Personalized Greeting", description: "Show time-aware greeting with your name", enabled: true },
  { id: "memory", label: "Context Memory", description: "Remember past conversations and preferences", enabled: true },
  { id: "insights", label: "Proactive Insights", description: "Surface relevant insights before you ask", enabled: true },
  { id: "emails", label: "Auto-Summarize Emails", description: "Automatically summarize incoming emails", enabled: true },
  { id: "scheduling", label: "Smart Scheduling", description: "AI-powered calendar optimization", enabled: false },
  { id: "voice", label: "Voice Commands", description: "Control AIOS with voice input", enabled: false },
];

const initialNotifications: NotificationSetting[] = [
  { id: "digest", label: "Email Digest", description: "Daily summary", enabled: true, icon: Mail },
  { id: "market", label: "Market Alerts", description: "Real-time signals", enabled: true, icon: Zap },
  { id: "agents", label: "Agent Updates", description: "Task completions", enabled: true, icon: Brain },
  { id: "patents", label: "Patent Alerts", description: "New filings", enabled: true, icon: Shield },
  { id: "meetings", label: "Meeting Reminders", description: "Calendar sync", enabled: true, icon: Bell },
  { id: "security", label: "Security Alerts", description: "Login activity", enabled: true, icon: Key },
];

const personalityOptions = [
  { id: "professional", label: "Professional", description: "Formal, precise, data-driven" },
  { id: "balanced", label: "Balanced", description: "Clear, friendly, efficient" },
  { id: "creative", label: "Creative", description: "Imaginative, exploratory, bold" },
];

const styleOptions = [
  { id: "concise", label: "Concise" },
  { id: "detailed", label: "Detailed" },
  { id: "comprehensive", label: "Comprehensive" },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function ToggleSwitch({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      aria-pressed={enabled}
      className="flex-shrink-0 focus:outline-none"
    >
      {enabled ? (
        <ToggleRight className="w-8 h-8 text-emerald-400 transition-colors duration-200" />
      ) : (
        <ToggleLeft className="w-8 h-8 text-white/20 transition-colors duration-200" />
      )}
    </button>
  );
}

function ProgressBar({ value, max, color }: { value: number; max: number; color: string }) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
      <div
        className={`h-full rounded-full ${color}`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function ProfilePage() {
  const [aiToggles, setAIToggles] = useState<ToggleSetting[]>(initialAIToggles);
  const [notifications, setNotifications] = useState<NotificationSetting[]>(initialNotifications);
  const [selectedPersonality, setSelectedPersonality] = useState("balanced");
  const [selectedStyle, setSelectedStyle] = useState("detailed");
  const [emailChannel, setEmailChannel] = useState(true);
  const [pushChannel, setPushChannel] = useState(true);
  const [smsChannel, setSmsChannel] = useState(false);
  const [saved, setSaved] = useState(false);

  const toggleAI = (id: string) => {
    setAIToggles((prev) =>
      prev.map((t) => (t.id === id ? { ...t, enabled: !t.enabled } : t))
    );
  };

  const toggleNotification = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, enabled: !n.enabled } : n))
    );
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* ── HERO / PROFILE HEADER ─────────────────────────────────────────── */}
      <section className="relative pt-28 pb-20 overflow-hidden">
        {/* Background glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-violet-600/15 rounded-full blur-3xl" />
          <div className="absolute top-20 right-1/4 w-[300px] h-[300px] bg-cyan-500/8 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Back link */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="flex justify-start mb-8"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors duration-200"
            >
              <ArrowRight className="w-3.5 h-3.5 rotate-180" />
              Back to Dashboard
            </Link>
          </motion.div>

          {/* Avatar */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            className="flex justify-center mb-6"
          >
            <div className="relative">
              <div className="w-28 h-28 rounded-full bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center text-4xl font-space font-bold text-white shadow-[0_0_40px_rgba(124,58,237,0.4)]">
                T
              </div>
              <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-emerald-500 border-2 border-[#0a0a0f] flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
            </div>
          </motion.div>

          {/* Name & title */}
          <motion.div variants={fadeInUp} initial="hidden" animate="visible">
            <h1 className="font-space text-3xl sm:text-4xl font-bold text-white mb-2">
              Toby Anderson
            </h1>
            <p className="text-white/50 text-sm mb-6">
              AI Power User
              <span className="mx-2 text-white/20">·</span>
              <span className="text-violet-400 font-medium">Pro Plan</span>
            </p>
          </motion.div>

          {/* Stats row */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap justify-center gap-6 mb-8"
          >
            {[
              { label: "Member since", value: "Jan 2024" },
              { label: "AI Queries", value: "2,847" },
              { label: "Active Agents", value: "12" },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                variants={fadeInUp}
                className="flex flex-col items-center px-6 py-3 rounded-xl bg-white/5 border border-white/10"
              >
                <span className="text-lg font-space font-bold text-white">{stat.value}</span>
                <span className="text-xs text-white/40 mt-0.5">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Edit Profile button */}
          <motion.div variants={fadeInUp} initial="hidden" animate="visible">
            <button className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-violet-500 text-white text-sm font-medium hover:from-violet-500 hover:to-violet-400 transition-all duration-200 shadow-[0_0_20px_rgba(124,58,237,0.3)]">
              <Edit3 className="w-4 h-4" />
              Edit Profile
            </button>
          </motion.div>
        </div>
      </section>

      {/* ── ACCOUNT DETAILS ───────────────────────────────────────────────── */}
      <section id="profile" className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="mb-10"
          >
            <div className="flex items-center gap-3 mb-2">
              <User className="w-5 h-5 text-violet-400" />
              <h2 className="font-space text-2xl font-bold text-white">Account Details</h2>
            </div>
            <p className="text-white/40 text-sm ml-8">Manage your personal information and subscription.</p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {/* Personal Information */}
            <motion.div
              variants={slideInLeft}
              className="rounded-2xl bg-white/[0.03] border border-white/10 p-6"
            >
              <h3 className="font-space font-semibold text-white mb-6 flex items-center gap-2">
                <User className="w-4 h-4 text-violet-400" />
                Personal Information
              </h3>
              <div className="space-y-4">
                {[
                  { label: "Full Name", value: "Toby Anderson", icon: User },
                  { label: "Email", value: "toby@example.com", icon: Mail },
                  { label: "Phone", value: "+1 555 0123", icon: Phone },
                  { label: "Location", value: "San Francisco, CA", icon: MapPin },
                ].map((field) => (
                  <div
                    key={field.label}
                    className="flex items-center justify-between py-3 border-b border-white/5 last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      <field.icon className="w-4 h-4 text-white/30" />
                      <div>
                        <p className="text-xs text-white/30 mb-0.5">{field.label}</p>
                        <p className="text-sm text-white font-medium">{field.value}</p>
                      </div>
                    </div>
                    <button className="w-7 h-7 flex items-center justify-center rounded-lg text-white/30 hover:text-violet-400 hover:bg-violet-500/10 transition-all duration-200">
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Plan & Usage */}
            <motion.div
              variants={slideInRight}
              className="rounded-2xl bg-white/[0.03] border border-white/10 p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-space font-semibold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-violet-400" />
                  Plan &amp; Usage
                </h3>
                <span className="px-3 py-1 rounded-full bg-violet-500/20 border border-violet-500/30 text-violet-300 text-xs font-semibold">
                  PRO
                </span>
              </div>

              <div className="space-y-5">
                {[
                  { label: "API Calls", used: 2847, total: 5000, color: "bg-violet-500", display: "2,847 / 5,000" },
                  { label: "Storage", used: 4.2, total: 10, color: "bg-cyan-500", display: "4.2 GB / 10 GB" },
                  { label: "Active Agents", used: 12, total: 20, color: "bg-emerald-500", display: "12 / 20" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm text-white/60">{stat.label}</span>
                      <span className="text-xs text-white/40">{stat.display}</span>
                    </div>
                    <ProgressBar value={stat.used} max={stat.total} color={stat.color} />
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-white/5">
                <p className="text-xs text-white/30 mb-4">Need more power? Upgrade to unlock unlimited agents, 50GB storage, and priority AI access.</p>
                <button className="w-full py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white text-sm font-semibold hover:opacity-90 transition-opacity duration-200 flex items-center justify-center gap-2">
                  Upgrade to Enterprise
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── AI PERSONALIZATION ────────────────────────────────────────────── */}
      <section className="py-16 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="mb-10"
          >
            <div className="flex items-center gap-3 mb-2">
              <Brain className="w-5 h-5 text-violet-400" />
              <h2 className="font-space text-2xl font-bold text-white">AI Personalization</h2>
            </div>
            <p className="text-white/40 text-sm ml-8">Tune how AIOS thinks, communicates, and assists you.</p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="space-y-6"
          >
            {/* Toggle settings card */}
            <motion.div
              variants={scaleIn}
              className="rounded-2xl bg-white/[0.03] border border-white/10 p-6"
            >
              <h3 className="font-space font-semibold text-white mb-6 flex items-center gap-2">
                <Settings className="w-4 h-4 text-violet-400" />
                Feature Toggles
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {aiToggles.map((toggle) => (
                  <div
                    key={toggle.id}
                    className="flex items-center justify-between p-4 rounded-xl bg-white/[0.03] border border-white/8 hover:border-white/15 transition-colors duration-200"
                  >
                    <div className="flex-1 min-w-0 mr-3">
                      <p className="text-sm font-medium text-white">{toggle.label}</p>
                      <p className="text-xs text-white/35 mt-0.5 truncate">{toggle.description}</p>
                    </div>
                    <ToggleSwitch enabled={toggle.enabled} onToggle={() => toggleAI(toggle.id)} />
                  </div>
                ))}
              </div>
            </motion.div>

            {/* AI Personality */}
            <motion.div
              variants={fadeInUp}
              className="rounded-2xl bg-white/[0.03] border border-white/10 p-6"
            >
              <h3 className="font-space font-semibold text-white mb-6 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-violet-400" />
                AI Personality
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {personalityOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setSelectedPersonality(opt.id)}
                    className={`p-4 rounded-xl border text-left transition-all duration-200 ${
                      selectedPersonality === opt.id
                        ? "border-violet-500/60 bg-violet-500/10 shadow-[0_0_20px_rgba(124,58,237,0.15)]"
                        : "border-white/10 bg-white/[0.02] hover:border-white/20"
                    }`}
                  >
                    <p className={`text-sm font-semibold mb-1 ${
                      selectedPersonality === opt.id ? "text-violet-300" : "text-white"
                    }`}>{opt.label}</p>
                    <p className="text-xs text-white/40">{opt.description}</p>
                    {selectedPersonality === opt.id && (
                      <CheckCircle className="w-4 h-4 text-violet-400 mt-2" />
                    )}
                  </button>
                ))}
              </div>

              {/* Communication Style */}
              <div>
                <p className="text-sm font-medium text-white/70 mb-3">Communication Style</p>
                <div className="flex flex-wrap gap-3">
                  {styleOptions.map((opt) => (
                    <label
                      key={opt.id}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="style"
                        value={opt.id}
                        checked={selectedStyle === opt.id}
                        onChange={() => setSelectedStyle(opt.id)}
                        className="sr-only"
                      />
                      <div
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                          selectedStyle === opt.id
                            ? "border-violet-500 bg-violet-500"
                            : "border-white/20"
                        }`}
                      >
                        {selectedStyle === opt.id && (
                          <div className="w-1.5 h-1.5 rounded-full bg-white" />
                        )}
                      </div>
                      <span className={`text-sm ${
                        selectedStyle === opt.id ? "text-white" : "text-white/50"
                      }`}>{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── NOTIFICATION PREFERENCES ──────────────────────────────────────── */}
      <section className="py-16 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="mb-10"
          >
            <div className="flex items-center gap-3 mb-2">
              <Bell className="w-5 h-5 text-violet-400" />
              <h2 className="font-space text-2xl font-bold text-white">Notification Preferences</h2>
            </div>
            <p className="text-white/40 text-sm ml-8">Control what you hear about and how you hear about it.</p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="space-y-6"
          >
            {/* Notification categories */}
            <motion.div
              variants={scaleIn}
              className="rounded-2xl bg-white/[0.03] border border-white/10 p-6"
            >
              <h3 className="font-space font-semibold text-white mb-6">Alert Categories</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className="flex items-center justify-between p-4 rounded-xl bg-white/[0.03] border border-white/8 hover:border-white/15 transition-colors duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-violet-500/10 flex items-center justify-center">
                        <notif.icon className="w-4 h-4 text-violet-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{notif.label}</p>
                        <p className="text-xs text-white/35">{notif.description}</p>
                      </div>
                    </div>
                    <ToggleSwitch
                      enabled={notif.enabled}
                      onToggle={() => toggleNotification(notif.id)}
                    />
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Delivery channels */}
            <motion.div
              variants={fadeInUp}
              className="rounded-2xl bg-white/[0.03] border border-white/10 p-6"
            >
              <h3 className="font-space font-semibold text-white mb-6">Delivery Channels</h3>
              <div className="flex flex-wrap gap-4">
                {[
                  { label: "Email", icon: Mail, state: emailChannel, toggle: () => setEmailChannel((v) => !v) },
                  { label: "Push", icon: Bell, state: pushChannel, toggle: () => setPushChannel((v) => !v) },
                  { label: "SMS", icon: Phone, state: smsChannel, toggle: () => setSmsChannel((v) => !v) },
                ].map((ch) => (
                  <div
                    key={ch.label}
                    className={`flex items-center gap-3 px-5 py-3 rounded-xl border transition-all duration-200 ${
                      ch.state
                        ? "border-violet-500/40 bg-violet-500/10"
                        : "border-white/10 bg-white/[0.02]"
                    }`}
                  >
                    <ch.icon className={`w-4 h-4 ${
                      ch.state ? "text-violet-400" : "text-white/30"
                    }`} />
                    <span className={`text-sm font-medium ${
                      ch.state ? "text-white" : "text-white/40"
                    }`}>{ch.label}</span>
                    <ToggleSwitch enabled={ch.state} onToggle={ch.toggle} />
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Save button */}
            <motion.div variants={fadeInUp} className="flex justify-end">
              <button
                onClick={handleSave}
                className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-violet-500 text-white text-sm font-semibold hover:from-violet-500 hover:to-violet-400 transition-all duration-200 shadow-[0_0_24px_rgba(124,58,237,0.3)]"
              >
                {saved ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Saved!
                  </>
                ) : (
                  <>
                    <Shield className="w-4 h-4" />
                    Save Preferences
                  </>
                )}
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── SECURITY SECTION ──────────────────────────────────────────────── */}
      <section className="py-16 border-t border-white/5 mb-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="mb-10"
          >
            <div className="flex items-center gap-3 mb-2">
              <Shield className="w-5 h-5 text-violet-400" />
              <h2 className="font-space text-2xl font-bold text-white">Security &amp; Privacy</h2>
            </div>
            <p className="text-white/40 text-sm ml-8">Keep your account and data safe.</p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            {[
              {
                icon: Key,
                title: "Change Password",
                description: "Last changed 45 days ago",
                color: "text-violet-400",
                bg: "bg-violet-500/10",
                border: "border-violet-500/20",
              },
              {
                icon: Shield,
                title: "Two-Factor Auth",
                description: "Enabled via authenticator app",
                color: "text-emerald-400",
                bg: "bg-emerald-500/10",
                border: "border-emerald-500/20",
              },
              {
                icon: Globe,
                title: "Active Sessions",
                description: "2 devices currently active",
                color: "text-cyan-400",
                bg: "bg-cyan-500/10",
                border: "border-cyan-500/20",
              },
            ].map((item) => (
              <motion.button
                key={item.title}
                variants={scaleIn}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={`p-5 rounded-2xl bg-white/[0.03] border ${item.border} text-left hover:bg-white/[0.05] transition-all duration-200 group`}
              >
                <div className={`w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center mb-4`}>
                  <item.icon className={`w-5 h-5 ${item.color}`} />
                </div>
                <p className="text-sm font-semibold text-white mb-1">{item.title}</p>
                <p className="text-xs text-white/40">{item.description}</p>
                <ArrowRight className={`w-4 h-4 ${item.color} mt-3 group-hover:translate-x-1 transition-transform duration-200`} />
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
