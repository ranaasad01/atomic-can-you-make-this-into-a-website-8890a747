"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { navLinks, brand } from "@/lib/data";
import { Sparkles, Code2 as Github, MessageCircle as Twitter, Briefcase as Linkedin } from 'lucide-react';
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations();
  const pathname = usePathname();

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("#") && pathname === "/") {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getLinkHref = (href: string) => {
    if (href.startsWith("#") && pathname !== "/") {
      return "/" + href;
    }
    return href;
  };

  const currentYear = 2025;

  return (
    <footer
      id="contact"
      className="relative border-t border-white/8 bg-[#0a0a0f] overflow-hidden"
    >
      {/* Subtle glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-violet-600/8 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12"
        >
          {/* Brand */}
          <motion.div variants={fadeInUp} className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4 group w-fit">
              <div className="relative w-8 h-8 flex items-center justify-center">
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-violet-600 to-cyan-500 opacity-90" />
                <Sparkles className="relative z-10 w-4 h-4 text-white" />
              </div>
              <span className="font-space font-bold text-lg tracking-tight text-white">
                {brand.name}
              </span>
            </Link>
            <p className="text-sm text-white/40 leading-relaxed max-w-xs">
              {brand.tagline}. Unified intelligence for research, business, and
              real-time market insights.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {[
                { icon: Github, label: "GitHub" },
                { icon: Twitter, label: "Twitter" },
                { icon: Linkedin, label: "LinkedIn" },
              ].map(({ icon: Icon, label }) => (
                <motion.a
                  key={label}
                  href="#"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-white/40 hover:text-white hover:border-violet-500/40 hover:bg-violet-500/10 transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div variants={fadeInUp}>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-4">
              Navigation
            </h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={getLinkHref(link.href)}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-sm text-white/50 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact / Status */}
          <motion.div variants={fadeInUp}>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-4">
              System Status
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                <span className="text-sm text-white/50">All systems operational</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.8)]" />
                <span className="text-sm text-white/50">AI models online</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-violet-400 shadow-[0_0_6px_rgba(167,139,250,0.8)]" />
                <span className="text-sm text-white/50">Intelligence feeds active</span>
              </div>
            </div>
            <div className="mt-6">
              <a
                href="mailto:hello@aios.ai"
                className="text-sm text-violet-400 hover:text-violet-300 transition-colors duration-200"
              >
                hello@aios.ai
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-xs text-white/25">
            &copy; {currentYear} {brand.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Service"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-xs text-white/25 hover:text-white/50 transition-colors duration-200"
              >
                {item}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}