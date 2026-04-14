"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Shield, Leaf, Globe, Lock, ArrowRight, ChevronRight, CheckCircle2, Award, Users, Zap } from "lucide-react";

import useThemeStore from "../store/themeStore";
import { Sun, Moon } from "lucide-react";

const fadeIn = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};
const stagger = { animate: { transition: { staggerChildren: 0.08 } } };

export default function LandingPage() {
  const { theme, toggleTheme } = useThemeStore();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div style={{ minHeight: "100vh", color: "var(--text-primary)", overflowX: "hidden", position: "relative", fontFamily: "var(--font-body)" }}>

      {/* ── HEADER ── */}
      <header 
        className="glass-surface"
        style={{
          position: "absolute", top: 0, left: 0, right: 0, zIndex: 50,
          borderTop: "none", borderLeft: "none", borderRight: "none",
        }}
      >
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 24px", height: "60px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Brand */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ width: "28px", height: "28px", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid var(--surface-border)", borderRadius: "6px" }}>
              <Shield size={14} style={{ color: "var(--color-primary)" }} />
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "14px", color: "var(--text-primary)", lineHeight: 1 }}>YesYouCan</div>
              <div style={{ fontSize: "8px", color: "var(--text-muted)", letterSpacing: "0.15em", marginTop: "1px", textTransform: "uppercase", fontFamily: "monospace", fontWeight: 700 }}>Cyber Secure</div>
            </div>
          </div>

          {/* Nav */}
          <nav style={{ display: "flex", alignItems: "center", gap: "40px" }}>
            {[["Features", "#features"], ["Solutions", "#solutions"], ["About", "#about"]].map(([label, href]) => (
              <Link key={label} href={href} style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "13px", color: "var(--text-primary)", textDecoration: "none", opacity: 0.8 }}
                className="hover:opacity-100 transition-opacity">{label}</Link>
            ))}
          </nav>

          {/* CTAs */}
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <button 
              onClick={toggleTheme}
              style={{ background: "none", border: "none", color: "var(--text-primary)", cursor: "pointer", opacity: 0.7, minWidth: "24px", minHeight: "24px", display: "flex", alignItems: "center", justifyContent: "center" }}
              className="hover:opacity-100 transition-opacity"
              aria-label="Toggle Theme"
            >
              {!mounted ? null : (theme === "dark" ? <Sun size={20} /> : <Moon size={20} />)}
            </button>
            <Link href="/auth/login" style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "13px", color: "var(--text-primary)", opacity: 0.8, textDecoration: "none" }}
              className="hover:opacity-100 transition-opacity">Sign In</Link>
            <Link href="/auth/register" className="btn-vibrant" style={{ padding: "10px 24px", borderRadius: "6px", display: "flex", alignItems: "center", gap: "6px", fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "13px", textDecoration: "none" }}>
              Get Started <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </header>

      {/* ── HERO — FULL COVER ── */}
      <section style={{ 
        position: "relative", 
        minHeight: "85vh",
        display: "flex", 
        alignItems: "center",
        padding: "80px 24px",
        zIndex: 10 
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%" }}>
          <motion.div initial="initial" animate="animate" variants={stagger}>
            <motion.p variants={fadeIn} style={{ fontFamily: "monospace", fontSize: "11px", color: "var(--color-primary)", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "16px" }}>
              Enterprise GRC & ESG Platform
            </motion.p>
            <motion.h1 
              variants={fadeIn} 
              className="text-depth-hero"
              style={{ fontSize: "clamp(1.6rem, 4vw, 2.7rem)", maxWidth: "1000px", marginBottom: "20px", color: "#ffffff" }}
            >
              The Science of Sustainance and Security.
            </motion.h1>
            <motion.p 
              variants={fadeIn} 
              className="text-depth-body"
              style={{ fontSize: "15px", color: "rgba(255,255,255,0.75)", maxWidth: "560px", marginBottom: "36px" }}
            >
              Secure your infrastructure while building a sustainable future. YesYouCan integrates Cybersecurity, ESG metrics, and AI-driven compliance into one powerful ecosystem.
            </motion.p>
            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Link href="/auth/register" className="btn-vibrant w-full sm:w-auto" style={{ padding: "12px 28px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "14px", textDecoration: "none" }}>
                Start Enterprise Launch <ArrowRight size={16} />
              </Link>
              <Link href="/auth/login" className="w-full sm:w-auto" style={{ padding: "12px 28px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "14px", textDecoration: "none", border: "1px solid rgba(255,255,255,0.3)", backdropFilter: "blur(10px)", color: "#fff" }}>
                Sign In
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" style={{ padding: "80px 24px", position: "relative", zIndex: 10 }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ marginBottom: "48px" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.7rem, 4vw, 2.6rem)", color: "#fff", letterSpacing: "-0.03em", marginBottom: "12px" }}>
              Engineered for Impact.
            </h2>
            <p className="text-depth-body" style={{ color: "rgba(255,255,255,0.7)", fontSize: "14px", maxWidth: "480px" }}>
              Designed by experts, built with precision. Experience the intersection of intelligence and sustainability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            {/* Large card */}
            <motion.div whileHover={{ y: -4 }} style={{ gridColumn: "span 1 / span 1" }} className="md:col-span-8 glass-surface rounded-2xl p-6 md:p-8 flex flex-col justify-between">
              <div>
                <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.3)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
                  <Shield size={20} style={{ color: "var(--color-primary)" }} />
                </div>
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "20px", color: "#fff", marginBottom: "10px", letterSpacing: "-0.02em" }}>Autonomous Cyber Defense</h3>
                <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "13px", maxWidth: "400px", lineHeight: 1.6 }}>
                  Our AI doesn't just monitor — it predicts. Detect vulnerabilities before they manifest with our adaptive GRC engine.
                </p>
              </div>
              <div style={{ marginTop: "24px", display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {["ISO 27001", "NIST CSF", "GDPR"].map(tag => (
                  <span key={tag} style={{ display: "flex", alignItems: "center", gap: "6px", padding: "4px 12px", borderRadius: "999px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", fontFamily: "monospace", fontSize: "11px", color: "rgba(255,255,255,0.7)", fontWeight: 600 }}>
                    <CheckCircle2 size={11} style={{ color: "var(--color-primary)" }} /> {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Small card */}
            <motion.div whileHover={{ y: -4 }} className="md:col-span-4 iridescent-bg rounded-2xl p-6 md:p-8 flex flex-col items-center justify-center text-center">
              <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "rgba(0,0,0,0.15)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}>
                <Leaf size={24} style={{ color: "#000" }} />
              </div>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "18px", color: "#000", marginBottom: "6px", letterSpacing: "-0.01em" }}>Green Intelligence</h3>
              <p style={{ color: "rgba(0,0,0,0.7)", fontSize: "13px", lineHeight: 1.5, fontWeight: 600 }}>Automated Scope 1, 2 & 3 carbon reporting.</p>
            </motion.div>

            {/* Bottom cards */}
            <motion.div whileHover={{ y: -4 }} className="md:col-span-4 glass-surface rounded-2xl p-6 md:p-8">
              <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.3)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}>
                <Globe size={18} style={{ color: "#a78bfa" }} />
              </div>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "16px", color: "#fff", marginBottom: "6px" }}>Global Governance</h3>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "12px", lineHeight: 1.5 }}>Multi-tenant, multi-region compliance management simplified.</p>
            </motion.div>

            <motion.div whileHover={{ y: -4 }} className="md:col-span-8 glass-surface rounded-2xl p-6 md:p-8 flex flex-col justify-center">
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "18px", color: "#fff", marginBottom: "8px", letterSpacing: "-0.01em" }}>Pro Max Analytics</h3>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "13px", maxWidth: "440px", lineHeight: 1.5 }}>Every data point visualized. Every risk quantified. Real-time insights that actually lead to action.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── TRUSTED BY ── */}
      <section style={{ padding: "60px 24px", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)", position: "relative", zIndex: 10 }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontFamily: "monospace", fontSize: "10px", color: "var(--color-primary)", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "32px" }}>Trusted by innovators globally</p>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "32px md:gap-48px", opacity: 0.5 }}>
            {["ORACLE", "VELOCITY", "STRIPE", "MERCURY", "LINEAR"].map(label => (
              <span key={label} style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(1.1rem, 2.5vw, 1.8rem)", letterSpacing: "-0.05em", color: "#fff" }}>{label}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── VISION / CTA SECTION ── */}
      <section id="solutions" style={{ padding: "80px 24px", position: "relative", zIndex: 10 }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-surface"
            style={{ borderRadius: "20px", padding: "60px 24px md:padding:80px 48px", position: "relative", overflow: "hidden", textAlign: "center" }}
          >
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(to right, transparent, rgba(16,185,129,0.5), transparent)" }} />
            <p style={{ fontFamily: "monospace", fontSize: "10px", color: "var(--color-primary)", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "16px" }}>Our Vision</p>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.6rem, 5vw, 2.8rem)", color: "#fff", lineHeight: 1.15, marginBottom: "20px", letterSpacing: "-0.04em" }}>
              Where Security Meets Sustainability
            </h2>
            <p className="text-depth-body" style={{ fontSize: "15px", color: "rgba(255,255,255,0.7)", maxWidth: "600px", margin: "0 auto 32px" }}>
              We believe that the organizations that will lead the next decade are those that treat cybersecurity and sustainability not as compliance burdens, but as competitive advantages. YesYouCan exists to give every organization — regardless of size — the intelligence to do both, exceptionally well.
            </p>
            <Link href="/auth/register" className="btn-vibrant" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "14px 32px", borderRadius: "8px", fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "14px", textDecoration: "none" }}>
              Join Our Mission <ArrowRight size={18} />
            </Link>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" style={{ maxWidth: "560px", margin: "48px auto 0" }}>
              {[
                { label: "SOC2 Type II", icon: <Lock size={14} /> },
                { label: "HIPAA Compliant", icon: <Shield size={14} /> },
                { label: "ESG Gold Standard", icon: <Award size={14} /> },
                { label: "99.99% Uptime", icon: <Zap size={14} /> },
              ].map(badge => (
                <div key={badge.label} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "12px 16px", borderRadius: "10px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,254,255,0.08)" }}>
                  <span style={{ color: "var(--color-primary)" }}>{badge.icon}</span>
                  <span style={{ fontFamily: "monospace", fontSize: "11px", color: "rgba(255,255,255,0.6)", letterSpacing: "0.05em", fontWeight: 600 }}>{badge.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer id="about" className="glass-surface" style={{ borderLeft: "none", borderRight: "none", borderBottom: "none", position: "relative", zIndex: 10, padding: "60px 24px 32px" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            {/* Brand + Leadership */}
            <div className="md:col-span-2">
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
                <div style={{ width: "24px", height: "24px", border: "1px solid var(--surface-border)", borderRadius: "5px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Shield size={12} style={{ color: "var(--color-primary)" }} />
                </div>
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "15px", color: "var(--text-primary)" }}>YesYouCan Cyber Secure</span>
              </div>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", maxWidth: "340px", lineHeight: 1.6, marginBottom: "28px" }}>
                Integrating governance, sustainability, and cybersecurity into a unified intelligence ecosystem for the enterprises of tomorrow.
              </p>
              {/* Leadership */}
              <div style={{ borderTop: "1px solid var(--surface-border)", paddingTop: "20px" }}>
                <p style={{ fontFamily: "monospace", fontSize: "10px", color: "var(--color-primary)", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "12px", fontWeight: 700 }}>Leadership</p>
                <div className="flex flex-col sm:flex-row gap-6 sm:gap-10">
                  <div>
                    <p style={{ fontSize: "13px", color: "var(--text-primary)", marginBottom: "2px", fontWeight: 700 }}>Dr. Noah Darko-Adjei</p>
                    <p style={{ fontSize: "10px", color: "var(--text-muted)", fontFamily: "monospace", textTransform: "uppercase" }}>Chief Executive Officer</p>
                  </div>
                  <div>
                    <p style={{ fontSize: "13px", color: "var(--text-primary)", marginBottom: "2px", fontWeight: 700 }}>Christiana Konlan Kennedy</p>
                    <p style={{ fontSize: "10px", color: "var(--text-muted)", fontFamily: "monospace", textTransform: "uppercase" }}>Strategic Advisor</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Platform links */}
            <div>
              <h4 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--text-primary)", marginBottom: "20px" }}>Platform</h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {[
                  { label: "Infrastructure", href: "/infrastructure" },
                  { label: "ESG Reporting", href: "/esg" },
                  { label: "Cyber Suite", href: "/cyber-suite" },
                  { label: "AI Insights", href: "/ai-insights" },
                ].map(item => (
                  <li key={item.label} style={{ marginBottom: "12px" }}>
                    <Link href={item.href} style={{ fontSize: "13px", color: "var(--text-secondary)", textDecoration: "none", fontWeight: 600 }}
                      className="hover:text-primary transition-colors">{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Enterprise links */}
            <div>
              <h4 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--text-primary)", marginBottom: "20px" }}>Enterprise</h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {[
                  { label: "Solutions", href: "/solutions" },
                  { label: "Governance", href: "/governance" },
                  { label: "Sustainability", href: "/sustainability" },
                  { label: "Security", href: "/security" },
                ].map(item => (
                  <li key={item.label} style={{ marginBottom: "12px" }}>
                    <Link href={item.href} style={{ fontSize: "13px", color: "var(--text-secondary)", textDecoration: "none", fontWeight: 600 }}
                      className="hover:text-primary transition-colors">{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Footer bottom */}
          <div style={{ paddingTop: "24px", borderTop: "1px solid var(--surface-border)", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
            <p style={{ fontFamily: "monospace", fontSize: "10px", color: "var(--text-muted)", letterSpacing: "0.05em", fontWeight: 600 }}>
              © 2025 YesYouCan Cyber Secure. All rights reserved.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
              <Link href="/privacy" style={{ fontFamily: "monospace", fontSize: "10px", color: "var(--text-muted)", textDecoration: "none", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 700 }}
                className="hover:text-primary transition-colors">Privacy Policy</Link>
              <Link href="/terms" style={{ fontFamily: "monospace", fontSize: "10px", color: "var(--text-muted)", textDecoration: "none", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 700 }}
                className="hover:text-primary transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
