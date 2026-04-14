"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Shield, Leaf, Zap, Globe, Lock, ArrowRight,
  ChevronRight, CheckCircle2, Award, Users, BarChart3
} from "lucide-react";

const fadeIn = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const stagger = {
  animate: { transition: { staggerChildren: 0.08 } }
};

export default function LandingPage() {
  return (
    <div className="min-h-screen text-white overflow-x-hidden relative" style={{ fontFamily: "var(--font-body)" }}>

      {/* Full-page background */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/assets/site-bg.png"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* ── HEADER ── */}
      <header className="fixed top-0 inset-x-0 z-50 border-b border-white/10" style={{ background: "rgba(0,0,0,0.92)", backdropFilter: "blur(12px)" }}>
        <div className="max-w-screen-2xl mx-auto px-8 h-16 flex items-center justify-between">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-md flex items-center justify-center iridescent-bg flex-shrink-0">
              <Shield size={16} className="text-black" />
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "15px", lineHeight: 1 }}>YesYouCan</div>
              <div style={{ fontFamily: "monospace", fontSize: "9px", color: "var(--accent-green)", letterSpacing: "0.15em", marginTop: "2px", textTransform: "uppercase" }}>Cyber Secure</div>
            </div>
          </div>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-8" style={{ fontFamily: "var(--font-display)", fontSize: "13px", fontWeight: 500, color: "rgba(255,255,255,0.6)" }}>
            <Link href="#features" className="hover:text-white transition-colors">Features</Link>
            <Link href="#solutions" className="hover:text-white transition-colors">Solutions</Link>
            <Link href="#about" className="hover:text-white transition-colors">About</Link>
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-4">
            <Link href="/auth/login" style={{ fontFamily: "var(--font-display)", fontSize: "13px", fontWeight: 500, color: "rgba(255,255,255,0.6)" }} className="hover:text-white transition-colors">
              Sign In
            </Link>
            <Link href="/auth/register" className="btn-vibrant px-5 py-2 rounded-md flex items-center gap-1.5" style={{ fontFamily: "var(--font-display)", fontSize: "13px", fontWeight: 600 }}>
              Get Started <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="relative pt-36 pb-24 px-8 z-10">
        <div className="max-w-5xl mx-auto">
          <motion.div initial="initial" animate="animate" variants={stagger}>
            <motion.p
              variants={fadeIn}
              style={{ fontFamily: "monospace", fontSize: "11px", color: "var(--accent-green)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "20px" }}
            >
              Enterprise GRC & ESG Platform
            </motion.p>

            <motion.h1
              variants={fadeIn}
              style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(2.4rem, 5vw, 4rem)", lineHeight: 1.1, marginBottom: "20px", color: "#fff", letterSpacing: "-0.02em" }}
            >
              The Science of <span className="text-gradient-vibrant">Sustain</span> and <span className="text-gradient-vibrant">Secure</span>.
            </motion.h1>

            <motion.p
              variants={fadeIn}
              style={{ fontSize: "15px", color: "rgba(255,255,255,0.55)", maxWidth: "520px", lineHeight: 1.7, marginBottom: "32px" }}
            >
              Secure your infrastructure while building a sustainable future. YesYouCan integrates Cybersecurity, ESG metrics, and AI-driven compliance into one powerful ecosystem.
            </motion.p>

            <motion.div variants={fadeIn} className="flex flex-wrap items-center gap-4">
              <Link href="/auth/register" className="btn-vibrant px-7 py-3 rounded-md flex items-center gap-2 group" style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "14px" }}>
                Start Enterprise Launch
                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link href="/auth/login" className="px-7 py-3 rounded-md flex items-center gap-2" style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "14px", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.7)" }}>
                Sign In
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── FEATURES SECTION ── */}
      <section id="features" className="py-20 px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="mb-14">
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.6rem, 3vw, 2.4rem)", marginBottom: "10px", color: "#fff", letterSpacing: "-0.02em" }}>
              Engineered for Impact.
            </h2>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px", maxWidth: "480px", lineHeight: 1.7 }}>
              Designed by experts, built with precision. Experience the intersection of intelligence and sustainability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5" style={{ minHeight: "420px" }}>
            {/* Large card */}
            <motion.div
              whileHover={{ y: -4 }}
              className="md:col-span-8 glass-vibrant rounded-2xl p-8 flex flex-col justify-between relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-72 h-72 bg-teal-500/5 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-5">
                  <Shield size={20} className="text-emerald-400" />
                </div>
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "22px", color: "#fff", marginBottom: "8px" }}>Autonomous Cyber Defense</h3>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px", maxWidth: "380px", lineHeight: 1.7 }}>
                  Our AI doesn't just monitor — it predicts. Detect vulnerabilities before they manifest with our adaptive GRC engine.
                </p>
              </div>
              <div className="mt-6 flex items-center gap-3">
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", fontFamily: "monospace", color: "rgba(255,255,255,0.6)" }}>
                  <CheckCircle2 size={12} className="text-emerald-400" /> ISO 27001
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", fontFamily: "monospace", color: "rgba(255,255,255,0.6)" }}>
                  <CheckCircle2 size={12} className="text-emerald-400" /> NIST CSF
                </span>
              </div>
            </motion.div>

            {/* Small card */}
            <motion.div
              whileHover={{ y: -4 }}
              className="md:col-span-4 iridescent-bg rounded-2xl p-8 flex flex-col items-center justify-center text-center"
            >
              <div className="w-14 h-14 rounded-full bg-black/20 flex items-center justify-center mb-4">
                <Leaf size={28} className="text-black" />
              </div>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "18px", color: "#000", marginBottom: "6px" }}>Green Intelligence</h3>
              <p style={{ color: "rgba(0,0,0,0.6)", fontSize: "12px", lineHeight: 1.6 }}>Automated Scope 1, 2 & 3 carbon reporting at your fingertips.</p>
            </motion.div>

            {/* Bottom row */}
            <motion.div whileHover={{ y: -4 }} className="md:col-span-4 glass-vibrant rounded-2xl p-8">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-4">
                <Globe size={20} className="text-purple-400" />
              </div>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "17px", color: "#fff", marginBottom: "6px" }}>Global Governance</h3>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "12px", lineHeight: 1.6 }}>Multi-tenant, multi-region compliance management simplified.</p>
            </motion.div>

            <motion.div whileHover={{ y: -4 }} className="md:col-span-8 glass-vibrant rounded-2xl p-8 flex flex-col justify-end relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/10 to-purple-900/10 pointer-events-none" />
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "17px", color: "#fff", marginBottom: "6px" }}>Pro Max Analytics</h3>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "12px", maxWidth: "360px", lineHeight: 1.6 }}>Every data point visualized. Every risk quantified. Real-time insights that actually lead to action.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF ── */}
      <section className="py-14 px-8 border-y border-white/5 relative z-10">
        <div className="max-w-5xl mx-auto flex flex-col items-center gap-8 text-center">
          <p style={{ fontFamily: "monospace", fontSize: "10px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.15em", textTransform: "uppercase" }}>Trusted by innovators globally</p>
          <div className="flex flex-wrap justify-center gap-12 md:gap-20 opacity-30 hover:opacity-60 transition-opacity duration-500">
            {["ORACLE", "VELOCITY", "STRIPE", "MERCURY", "LINEAR"].map(label => (
              <span key={label} style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)", letterSpacing: "-0.04em" }}>{label}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA / IMPACT SECTION ── */}
      <section id="solutions" className="py-20 px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-vibrant rounded-2xl p-12 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />

            <p style={{ fontFamily: "monospace", fontSize: "10px", color: "var(--accent-green)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "16px" }}>Ready to scale</p>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)", color: "#fff", lineHeight: 1.15, marginBottom: "14px", letterSpacing: "-0.02em" }}>
              Ready to redefine <span className="text-gradient-vibrant">possibility?</span>
            </h2>
            <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)", marginBottom: "28px", maxWidth: "420px", margin: "0 auto 28px", lineHeight: 1.7 }}>
              Join the elite league of enterprises prioritizing both cyber excellence and environmental stewardship.
            </p>
            <Link href="/auth/register" className="btn-vibrant px-8 py-3 rounded-md inline-flex items-center gap-2" style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "14px" }}>
              Deploy Your Instance <ArrowRight size={16} />
            </Link>

            <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: "SOC2 Type II", icon: <Lock size={14} /> },
                { label: "HIPAA Compliant", icon: <Shield size={14} /> },
                { label: "ESG Gold Standard", icon: <Award size={14} /> },
                { label: "99.99% Uptime", icon: <Zap size={14} /> },
              ].map(badge => (
                <div key={badge.label} className="flex flex-col items-center gap-2">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.4)" }}>
                    {badge.icon}
                  </div>
                  <span style={{ fontSize: "9px", textTransform: "uppercase", fontFamily: "monospace", letterSpacing: "0.1em", color: "rgba(255,255,255,0.35)" }}>{badge.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer id="about" className="py-16 px-8 border-t border-white/10 relative z-10" style={{ background: "rgba(0,0,0,0.92)" }}>
        <div className="max-w-screen-2xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-7 h-7 rounded-md iridescent-bg flex items-center justify-center">
                  <Shield size={14} className="text-black" />
                </div>
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "15px" }}>YesYouCan Cyber Secure</span>
              </div>
              <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", maxWidth: "320px", lineHeight: 1.7, marginBottom: "16px" }}>
                Integrating governance, sustainability, and cybersecurity into a unified intelligence ecosystem.
              </p>
              <div className="flex gap-3">
                <div className="w-7 h-7 rounded-md glass-vibrant flex items-center justify-center hover:border-emerald-500/40 cursor-pointer transition-colors"><Globe size={12} /></div>
                <div className="w-7 h-7 rounded-md glass-vibrant flex items-center justify-center hover:border-emerald-500/40 cursor-pointer transition-colors"><Users size={12} /></div>
                <div className="w-7 h-7 rounded-md glass-vibrant flex items-center justify-center hover:border-emerald-500/40 cursor-pointer transition-colors"><Shield size={12} /></div>
              </div>
            </div>

            {/* Platform links */}
            <div>
              <h4 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.12em", color: "rgba(255,255,255,0.5)", marginBottom: "16px" }}>Platform</h4>
              <ul className="space-y-3">
                {[
                  { label: "Infrastructure", href: "/dashboard" },
                  { label: "ESG Reporting", href: "/esg" },
                  { label: "Cyber Suite", href: "/risks" },
                  { label: "AI Insights", href: "/dashboard" },
                ].map(item => (
                  <li key={item.label}>
                    <Link href={item.href} style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", fontWeight: 500 }} className="hover:text-emerald-400 transition-colors">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Enterprise links */}
            <div>
              <h4 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.12em", color: "rgba(255,255,255,0.5)", marginBottom: "16px" }}>Enterprise</h4>
              <ul className="space-y-3">
                {[
                  { label: "Solutions", href: "#solutions" },
                  { label: "Governance", href: "/admin" },
                  { label: "Sustainability", href: "/esg" },
                  { label: "Security", href: "/risks" },
                ].map(item => (
                  <li key={item.label}>
                    <Link href={item.href} style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", fontWeight: 500 }} className="hover:text-emerald-400 transition-colors">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Footer bottom */}
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <p style={{ fontFamily: "monospace", fontSize: "10px", color: "rgba(255,255,255,0.25)", letterSpacing: "0.05em" }}>
              © 2025 YesYouCan Cyber Secure. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/privacy" style={{ fontFamily: "monospace", fontSize: "10px", color: "rgba(255,255,255,0.35)", letterSpacing: "0.08em", textTransform: "uppercase" }} className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" style={{ fontFamily: "monospace", fontSize: "10px", color: "rgba(255,255,255,0.35)", letterSpacing: "0.08em", textTransform: "uppercase" }} className="hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
