"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Shield, Leaf, Globe, Lock, ArrowRight, ChevronRight, CheckCircle2, Award, Users, Zap } from "lucide-react";

const fadeIn = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};
const stagger = { animate: { transition: { staggerChildren: 0.08 } } };

export default function LandingPage() {
  return (
    <div style={{ minHeight: "100vh", color: "#fff", overflowX: "hidden", position: "relative", fontFamily: "var(--font-body)" }}>

      {/* ── PREMIUM SOC HERO BACKGROUND (FULL-BLEED) ── */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0 }}>
        <Image 
          src="/assets/hero-soc-modern.png" 
          alt="Security Operations Center background" 
          fill 
          style={{ objectFit: "cover", opacity: 0.9 }} 
          priority 
        />
        {/* Adjusted high-contrast overlay for maximum readability of white text */}
        <div style={{ 
          position: "absolute", 
          inset: 0, 
          background: "radial-gradient(circle at center, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.92) 100%)" 
        }} />
      </div>

      {/* ── HEADER — Full width, tall, traditional, no rounded border ── */}
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        background: "rgba(0,0,0,0.95)",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
        backdropFilter: "blur(12px)",
      }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 40px", height: "68px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Brand — minimalist, white only */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(255,255,255,0.3)", borderRadius: "6px" }}>
              <Shield size={16} style={{ color: "#fff" }} />
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "15px", color: "#fff", lineHeight: 1 }}>YesYouCan</div>
              <div style={{ fontSize: "9px", color: "#fff", letterSpacing: "0.15em", marginTop: "2px", textTransform: "uppercase", fontFamily: "monospace", opacity: 0.7 }}>Cyber Secure</div>
            </div>
          </div>

          {/* Nav */}
          <nav style={{ display: "flex", alignItems: "center", gap: "36px" }}>
            {[["Features", "#features"], ["Solutions", "/solutions"], ["About", "#about"]].map(([label, href]) => (
              <Link key={label} href={href} style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "13px", color: "#fff", textDecoration: "none", opacity: 0.75 }}
                className="hover:opacity-100 transition-opacity">{label}</Link>
            ))}
          </nav>

          {/* CTAs */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <Link href="/auth/login" style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "13px", color: "#fff", opacity: 0.7, textDecoration: "none" }}
              className="hover:opacity-100 transition-opacity">Sign In</Link>
            <Link href="/auth/register" className="btn-vibrant" style={{ padding: "9px 20px", borderRadius: "6px", display: "flex", alignItems: "center", gap: "6px", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "13px", textDecoration: "none" }}>
              Get Started <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </header>

      {/* ── HERO ── */}
      <section style={{ position: "relative", paddingTop: "140px", paddingBottom: "96px", paddingLeft: "40px", paddingRight: "40px", zIndex: 10 }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <motion.div initial="initial" animate="animate" variants={stagger}>
            <motion.p variants={fadeIn} style={{ fontFamily: "monospace", fontSize: "11px", color: "#fff", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "20px", opacity: 0.6 }}>
              Enterprise GRC & ESG Platform
            </motion.p>
            <motion.h1 variants={fadeIn} style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(2.6rem, 5.5vw, 4.2rem)", lineHeight: 1.08, marginBottom: "20px", color: "#ffffff", letterSpacing: "-0.04em" }}>
              The Science of Sustain and Secure.
            </motion.h1>
            <motion.p variants={fadeIn} style={{ fontSize: "15px", color: "rgba(255,255,255,0.6)", maxWidth: "560px", lineHeight: 1.8, marginBottom: "36px" }}>
              Secure your infrastructure while building a sustainable future. YesYouCan integrates Cybersecurity, ESG metrics, and AI-driven compliance into one powerful ecosystem.
            </motion.p>
            <motion.div variants={fadeIn} style={{ display: "flex", flexWrap: "wrap", gap: "14px", alignItems: "center" }}>
              <Link href="/auth/register" className="btn-vibrant" style={{ padding: "12px 28px", borderRadius: "6px", display: "flex", alignItems: "center", gap: "8px", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "14px", textDecoration: "none" }}>
                Start Enterprise Launch <ArrowRight size={16} />
              </Link>
              <Link href="/auth/login" style={{ padding: "12px 28px", borderRadius: "6px", display: "flex", alignItems: "center", gap: "8px", fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "14px", textDecoration: "none", border: "1px solid rgba(255,255,255,0.2)", color: "#fff" }}>
                Sign In
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" style={{ padding: "80px 40px", position: "relative", zIndex: 10 }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ marginBottom: "48px" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.6rem, 3vw, 2.4rem)", color: "#fff", letterSpacing: "-0.02em", marginBottom: "10px" }}>
              Engineered for Impact.
            </h2>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px", maxWidth: "480px", lineHeight: 1.7 }}>
              Designed by experts, built with precision. Experience the intersection of intelligence and sustainability.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: "20px" }}>
            {/* Large card */}
            <motion.div whileHover={{ y: -4 }} style={{ gridColumn: "span 8", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "32px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.2)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
                  <Shield size={20} style={{ color: "#10b981" }} />
                </div>
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "21px", color: "#fff", marginBottom: "10px" }}>Autonomous Cyber Defense</h3>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px", maxWidth: "380px", lineHeight: 1.7 }}>
                  Our AI doesn't just monitor — it predicts. Detect vulnerabilities before they manifest with our adaptive GRC engine.
                </p>
              </div>
              <div style={{ marginTop: "24px", display: "flex", gap: "10px" }}>
                {["ISO 27001", "NIST CSF", "GDPR"].map(tag => (
                  <span key={tag} style={{ display: "flex", alignItems: "center", gap: "6px", padding: "5px 12px", borderRadius: "999px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", fontFamily: "monospace", fontSize: "11px", color: "rgba(255,255,255,0.55)" }}>
                    <CheckCircle2 size={11} style={{ color: "#10b981" }} /> {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Small card */}
            <motion.div whileHover={{ y: -4 }} className="iridescent-bg" style={{ gridColumn: "span 4", borderRadius: "16px", padding: "32px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
              <div style={{ width: "52px", height: "52px", borderRadius: "50%", background: "rgba(0,0,0,0.2)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}>
                <Leaf size={26} style={{ color: "#000" }} />
              </div>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "17px", color: "#000", marginBottom: "6px" }}>Green Intelligence</h3>
              <p style={{ color: "rgba(0,0,0,0.6)", fontSize: "12px", lineHeight: 1.6 }}>Automated Scope 1, 2 & 3 carbon reporting.</p>
            </motion.div>

            {/* Bottom cards */}
            <motion.div whileHover={{ y: -4 }} style={{ gridColumn: "span 4", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "28px" }}>
              <div style={{ width: "38px", height: "38px", borderRadius: "10px", background: "rgba(139,92,246,0.12)", border: "1px solid rgba(139,92,246,0.2)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}>
                <Globe size={18} style={{ color: "#a78bfa" }} />
              </div>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "16px", color: "#fff", marginBottom: "6px" }}>Global Governance</h3>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "12px", lineHeight: 1.6 }}>Multi-tenant, multi-region compliance management simplified.</p>
            </motion.div>

            <motion.div whileHover={{ y: -4 }} style={{ gridColumn: "span 8", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "28px", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "17px", color: "#fff", marginBottom: "6px" }}>Pro Max Analytics</h3>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "12px", maxWidth: "360px", lineHeight: 1.6 }}>Every data point visualized. Every risk quantified. Real-time insights that actually lead to action.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── TRUSTED BY ── */}
      <section style={{ padding: "56px 40px", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)", position: "relative", zIndex: 10 }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontFamily: "monospace", fontSize: "10px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "28px" }}>Trusted by innovators globally</p>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "48px", opacity: 0.3 }}>
            {["ORACLE", "VELOCITY", "STRIPE", "MERCURY", "LINEAR"].map(label => (
              <span key={label} style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)", letterSpacing: "-0.04em", color: "#fff" }}>{label}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── VISION / CTA SECTION ── */}
      <section id="solutions" style={{ padding: "80px 40px", position: "relative", zIndex: 10 }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "16px", padding: "56px 48px", position: "relative", overflow: "hidden", textAlign: "center" }}
          >
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(to right, transparent, rgba(16,185,129,0.4), transparent)" }} />
            <p style={{ fontFamily: "monospace", fontSize: "10px", color: "#10b981", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "16px" }}>Our Vision</p>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", color: "#fff", lineHeight: 1.2, marginBottom: "16px", letterSpacing: "-0.02em" }}>
              Where Security Meets Sustainability
            </h2>
            <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.55)", maxWidth: "540px", margin: "0 auto 28px", lineHeight: 1.8 }}>
              We believe that the organizations that will lead the next decade are those that treat cybersecurity and sustainability not as compliance burdens, but as competitive advantages. YesYouCan exists to give every organization — regardless of size — the intelligence to do both, exceptionally well.
            </p>
            <Link href="/auth/register" className="btn-vibrant" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "12px 28px", borderRadius: "6px", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "14px", textDecoration: "none" }}>
              Join Our Mission <ArrowRight size={16} />
            </Link>
            <div style={{ marginTop: "40px", display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px", maxWidth: "500px", margin: "40px auto 0" }}>
              {[
                { label: "SOC2 Type II", icon: <Lock size={13} /> },
                { label: "HIPAA Compliant", icon: <Shield size={13} /> },
                { label: "ESG Gold Standard", icon: <Award size={13} /> },
                { label: "99.99% Uptime", icon: <Zap size={13} /> },
              ].map(badge => (
                <div key={badge.label} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 14px", borderRadius: "8px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <span style={{ color: "rgba(255,255,255,0.4)" }}>{badge.icon}</span>
                  <span style={{ fontFamily: "monospace", fontSize: "11px", color: "rgba(255,255,255,0.5)", letterSpacing: "0.06em" }}>{badge.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER — Full width, no rounded border, matches header ── */}
      <footer id="about" style={{ borderTop: "1px solid rgba(255,255,255,0.1)", background: "rgba(0,0,0,0.95)", position: "relative", zIndex: 10, padding: "64px 40px 32px" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "60px", marginBottom: "48px" }}>
            {/* Brand + Leadership */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                <div style={{ width: "28px", height: "28px", border: "1px solid rgba(255,255,255,0.3)", borderRadius: "5px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Shield size={13} style={{ color: "#fff" }} />
                </div>
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "15px", color: "#fff" }}>YesYouCan Cyber Secure</span>
              </div>
              <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", maxWidth: "320px", lineHeight: 1.7, marginBottom: "20px" }}>
                Integrating governance, sustainability, and cybersecurity into a unified intelligence ecosystem for the enterprises of tomorrow.
              </p>
              {/* Leadership */}
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "16px" }}>
                <p style={{ fontFamily: "monospace", fontSize: "10px", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "10px" }}>Leadership</p>
                <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)", marginBottom: "5px", fontWeight: 600 }}>Dr. Noah Darko-Adjei</p>
                <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", marginBottom: "12px", fontFamily: "monospace" }}>Chief Executive Officer</p>
                <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)", marginBottom: "5px", fontWeight: 600 }}>Christiana Konlan Kennedy</p>
                <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", fontFamily: "monospace" }}>Strategic Advisor</p>
              </div>
              {/* Social icons */}
              <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
                {[Globe, Users, Shield].map((Icon, i) => (
                  <div key={i} style={{ width: "30px", height: "30px", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                    <Icon size={13} style={{ color: "rgba(255,255,255,0.4)" }} />
                  </div>
                ))}
              </div>
            </div>

            {/* Platform links */}
            <div>
              <h4 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.12em", color: "#fff", marginBottom: "18px" }}>Platform</h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {[
                  { label: "Infrastructure", href: "/infrastructure" },
                  { label: "ESG Reporting", href: "/esg" },
                  { label: "Cyber Suite", href: "/cyber-suite" },
                  { label: "AI Insights", href: "/ai-insights" },
                ].map(item => (
                  <li key={item.label} style={{ marginBottom: "12px" }}>
                    <Link href={item.href} style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", textDecoration: "none", fontWeight: 500 }}
                      className="hover:text-white transition-colors">{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Enterprise links */}
            <div>
              <h4 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.12em", color: "#fff", marginBottom: "18px" }}>Enterprise</h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {[
                  { label: "Solutions", href: "/solutions" },
                  { label: "Governance", href: "/governance" },
                  { label: "Sustainability", href: "/sustainability" },
                  { label: "Security", href: "/security" },
                ].map(item => (
                  <li key={item.label} style={{ marginBottom: "12px" }}>
                    <Link href={item.href} style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", textDecoration: "none", fontWeight: 500 }}
                      className="hover:text-white transition-colors">{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Footer bottom */}
          <div style={{ paddingTop: "24px", borderTop: "1px solid rgba(255,255,255,0.08)", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
            <p style={{ fontFamily: "monospace", fontSize: "10px", color: "rgba(255,255,255,0.25)", letterSpacing: "0.05em" }}>
              © 2025 YesYouCan Cyber Secure. All rights reserved.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "28px" }}>
              <Link href="/privacy" style={{ fontFamily: "monospace", fontSize: "10px", color: "rgba(255,255,255,0.35)", textDecoration: "none", letterSpacing: "0.08em", textTransform: "uppercase" }}
                className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" style={{ fontFamily: "monospace", fontSize: "10px", color: "rgba(255,255,255,0.35)", textDecoration: "none", letterSpacing: "0.08em", textTransform: "uppercase" }}
                className="hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
