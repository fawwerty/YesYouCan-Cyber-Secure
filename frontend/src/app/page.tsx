"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Shield, Leaf, Globe, Lock, ArrowRight, ChevronRight, CheckCircle2, LayoutDashboard, Database, Activity, Zap, Users, BarChart3, Fingerprint } from "lucide-react";
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
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 24px", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Brand */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div className="iridescent-bg" style={{ width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "8px" }}>
              <Shield size={16} style={{ color: "#000" }} />
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "15px", color: "var(--text-primary)", lineHeight: 1 }}>YesYouCan</div>
              <div style={{ fontSize: "9px", color: mounted && theme === "light" ? "#000" : "var(--color-primary)", letterSpacing: "0.15em", marginTop: "2px", textTransform: "uppercase", fontFamily: "monospace", fontWeight: 800 }}>Cyber Secure</div>
            </div>
          </div>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-10">
            {[["Solutions", "/solutions"], ["Governance", "/governance"], ["Sustainability", "/sustainability"], ["Security", "/security"]].map(([label, href]) => (
              <Link key={label} href={href} style={{ fontFamily: "monospace", fontWeight: 700, fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-primary)", textDecoration: "none", opacity: 0.7 }}
                className="hover:opacity-100 transition-opacity">{label}</Link>
            ))}
          </nav>

          {/* CTAs */}
          <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
            <button 
              onClick={toggleTheme}
              style={{ background: "none", border: "none", color: "var(--text-primary)", cursor: "pointer", opacity: 0.7, display: "flex", alignItems: "center", justifyContent: "center" }}
              className="hover:opacity-100 transition-opacity"
            >
              {!mounted ? null : (theme === "dark" ? <Sun size={18} /> : <Moon size={18} />)}
            </button>
            <Link href="/auth/login" style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "13px", color: "var(--text-primary)", textDecoration: "none" }}
              className="hover:opacity-100 transition-opacity">Sign In</Link>
            <Link href="/auth/register" className="btn-vibrant" style={{ padding: "10px 24px", borderRadius: "8px", display: "flex", alignItems: "center", gap: "8px", fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "13px", textDecoration: "none" }}>
              Enterprise Launch <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </header>

      {/* ── HERO SECTION ── */}
      <section style={{ 
        position: "relative", 
        minHeight: "75vh",
        display: "flex", 
        alignItems: "center",
        padding: "100px 24px 60px",
        zIndex: 10 
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%" }}>
          <motion.div initial="initial" animate="animate" variants={stagger}>
<div style={{ height: "40px" }} />
            
            <motion.h1 
              variants={fadeIn} 
              className="text-depth-hero"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", maxWidth: "1000px", marginBottom: "32px", color: "#fff", lineHeight: 1.15 }}
            >
              The Science of <br />Sustainability & Security.
            </motion.h1>
            
            <motion.p 
              variants={fadeIn} 
              className="text-depth-body"
              style={{ fontSize: "18px", color: "#fff", maxWidth: "620px", marginBottom: "48px", lineHeight: 1.6, fontWeight: 600 }}
            >
              Integrate organizational intelligence with automated governance. YesYouCan orchestrates complex cybersecurity protocols and ESG metrics into a unified, auditable ecosystem.
            </motion.p>
            
            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <Link href="/auth/register" className="btn-vibrant w-full sm:w-auto" style={{ padding: "16px 36px", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "15px", textDecoration: "none" }}>
                Initiate Secure Onboarding <ArrowRight size={18} />
              </Link>
              <Link href="/solutions" className="w-full sm:w-auto hover:bg-[var(--surface-elevated)] transition-colors" style={{ padding: "16px 36px", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "15px", textDecoration: "none", border: "1px solid var(--surface-border)", backdropFilter: "blur(10px)", color: "var(--text-primary)" }}>
                View Technical Solutions
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── SYSTEM CORE FUNCTIONALITIES 3×3 ── */}
      <section style={{ padding: "60px 24px 120px", position: "relative", zIndex: 10 }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ marginBottom: "64px" }}>
            <motion.p
              initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              style={{ fontFamily: "monospace", fontSize: "11px", color: "var(--color-primary)", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "16px" }}
            >
              System Core Functionalities
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: "#fff", letterSpacing: "-0.03em" }}
            >
              Architected for Enterprise Resilience.
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <Fingerprint size={22} />, label: "Identity Orchestration", sub: "Advanced IAM with multi-tenant isolation, biometric attestation, and zero-trust protocol enforcement.", color: "#10b981" },
              { icon: <Leaf size={22} />, label: "Autonomous ESG Reporting", sub: "Automated carbon measurement for Scope 1, 2, and 3 emissions across entire global logistical networks.", color: "#34d399" },
              { icon: <Activity size={22} />, label: "Real-Time Threat Intelligence", sub: "Predictive AI-powered vulnerability detection and unified forensic incident mapping for all assets.", color: "#3b82f6" },
              { icon: <Shield size={22} />, label: "Global GRC Framework", sub: "Integrated mapping of organizational controls to ISO 27001, NIST CSF, and GDPR compliance standards.", color: "#8b5cf6" },
              { icon: <BarChart3 size={22} />, label: "Predictive Risk Analytics", sub: "High-fidelity quantitative risk modeling and proactive mitigation insights powered by enterprise data.", color: "#f59e0b" },
              { icon: <Globe size={22} />, label: "Supply Chain Sustainability", sub: "End-to-end auditable ESG scoring for global vendors and automated transparency reporting.", color: "#06b6d4" },
              { icon: <Lock size={22} />, label: "Forensic Audit Mapping", sub: "Immutable, tamper-proof logging and blockchain-verified trails for full system-wide transparency.", color: "#f43f5e" },
              { icon: <Zap size={22} />, label: "Net-Zero Strategy Engine", sub: "Interactive decarbonization roadmap planning and real-time tracking of 2030/2050 climate commitments.", color: "#eab308" },
              { icon: <Database size={22} />, label: "High-Fidelity Analytics", sub: "Real-time visualization of enterprise security posture and sustainability impact through custom dashboards.", color: "#ec4899" },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <div className="glass-surface group card-hover" style={{ borderRadius: "24px", padding: "32px", height: "100%", transition: "transform 0.3s cubic-bezier(0.23, 1, 0.32, 1), border-color 0.2s, box-shadow 0.2s" }}>
                  <div style={{ width: "48px", height: "48px", borderRadius: "14px", background: `rgba(${parseInt(item.color.slice(1,3),16)}, ${parseInt(item.color.slice(3,5),16)}, ${parseInt(item.color.slice(5,7),16)}, 0.1)`, border: `1px solid ${item.color}40`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "24px", color: item.color }}>
                    {item.icon}
                  </div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "17px", color: "#fff", marginBottom: "12px" }}>{item.label}</h3>
                  <p style={{ color: "var(--text-secondary)", fontSize: "13px", lineHeight: 1.6, fontWeight: 500 }}>{item.sub}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer id="about" className="glass-surface" style={{ borderLeft: "none", borderRight: "none", borderBottom: "none", position: "relative", zIndex: 10, padding: "80px 24px 32px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2">
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
                <div className="iridescent-bg" style={{ width: "28px", height: "28px", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Shield size={14} style={{ color: "#000" }} />
                </div>
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "16px", color: "var(--text-primary)" }}>YesYouCan Cyber Secure</span>
              </div>
              <p style={{ fontSize: "14px", color: "var(--text-secondary)", maxWidth: "380px", lineHeight: 1.7, marginBottom: "32px", fontWeight: 500 }}>
                Integrating governance, sustainability, and cybersecurity into a unified intelligence ecosystem for the enterprises of tomorrow.
              </p>
              <div className="flex gap-10">
                <div>
                  <p style={{ fontSize: "11px", color: "var(--color-primary)", fontFamily: "monospace", textTransform: "uppercase", fontWeight: 700, marginBottom: "4px" }}>CEO</p>
                  <p style={{ fontSize: "14px", color: "#fff", fontWeight: 700 }}>Dr. Noah Darko-Adjei</p>
                </div>
                <div>
                  <p style={{ fontSize: "11px", color: "var(--color-primary)", fontFamily: "monospace", textTransform: "uppercase", fontWeight: 700, marginBottom: "4px" }}>Strategic Lead</p>
                  <p style={{ fontSize: "14px", color: "#fff", fontWeight: 700 }}>Christiana Konlan Kennedy</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8 md:col-span-2">
              <div>
                <h4 style={{ fontFamily: "monospace", fontWeight: 700, fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.15em", color: "#fff", marginBottom: "24px" }}>Architecture</h4>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }} className="space-y-4">
                  {[["Core Systems", "/"], ["Solutions Hub", "/solutions"], ["Governance AI", "/governance"], ["Emissions Track", "/esg"]].map(([lbl, href]) => (
                    <li key={lbl}><Link href={href} style={{ fontSize: "13px", color: "var(--text-secondary)", textDecoration: "none", fontWeight: 600 }} className="hover:text-primary transition-colors">{lbl}</Link></li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 style={{ fontFamily: "monospace", fontWeight: 700, fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.15em", color: "#fff", marginBottom: "24px" }}>Identity</h4>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }} className="space-y-4">
                  {[["Portal Login", "/auth/login"], ["Workplace Launch", "/auth/register"], ["Privacy Protocol", "/privacy"], ["Terms of Service", "/terms"]].map(([lbl, href]) => (
                    <li key={lbl}><Link href={href} style={{ fontSize: "13px", color: "var(--text-secondary)", textDecoration: "none", fontWeight: 600 }} className="hover:text-primary transition-colors">{lbl}</Link></li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div style={{ paddingTop: "32px", borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "20px" }}>
            <p style={{ fontFamily: "monospace", fontSize: "11px", color: "var(--text-muted)", letterSpacing: "0.05em" }}>
              © 2025 YesYouCan MIS Platform. Secure Enterprise Intelligence.
            </p>
            <div className="flex gap-8">
              <div className="flex items-center gap-2">
                <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#22c55e" }} />
                <span style={{ fontSize: "10px", fontFamily: "monospace", color: "var(--text-secondary)" }}>SYSTEMS LIVE</span>
              </div>
              <div className="flex items-center gap-2">
                <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--color-primary)" }} />
                <span style={{ fontSize: "10px", fontFamily: "monospace", color: "var(--text-secondary)" }}>ENCRYPTED</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
