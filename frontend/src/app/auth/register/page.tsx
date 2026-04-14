"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Eye, EyeOff, Shield, ArrowLeft, ChevronRight, CheckCircle2 } from "lucide-react";
import useAuthStore from "@/store/authStore";
import toast from "react-hot-toast";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const { register, isLoading } = useAuthStore();
  const [showPw, setShowPw] = useState(false);
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", password: "", organizationName: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password.length < 8) {
      toast.error("Security requirement: Passphrase must be at least 8 characters");
      return;
    }
    try {
      await register(form);
      toast.success("Organization Registered. Provisioning workspace...");
      router.push("/dashboard");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Registration failed. please check organization data.");
    }
  };

  const update = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontFamily: "monospace",
    fontSize: "10px",
    color: "var(--text-muted)",
    textTransform: "uppercase",
    letterSpacing: "0.15em",
    marginBottom: "10px",
    fontWeight: 700,
  };

  return (
    <div style={{ minHeight: "100vh", color: "var(--text-primary)", padding: "120px 40px 80px", maxWidth: "1200px", margin: "0 auto", fontFamily: "var(--font-body)", position: "relative" }}>
      
      {/* Back Navigation */}
      <Link href="/" style={{ position: "absolute", top: "40px", left: "40px", display: "flex", alignItems: "center", gap: "8px", color: "var(--color-primary)", textDecoration: "none", fontSize: "13px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }} className="hover:opacity-70 transition-opacity">
        <ArrowLeft size={16} /> Hub
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        {/* Left Column: Mission */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
            <div className="iridescent-bg" style={{ width: "40px", height: "40px", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Shield size={20} style={{ color: "#000" }} />
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "18px", color: "var(--text-primary)", lineHeight: 1 }}>YesYouCan</div>
              <div style={{ fontFamily: "monospace", fontSize: "10px", color: "var(--color-primary)", letterSpacing: "0.15em", marginTop: "3px", textTransform: "uppercase", fontWeight: 700 }}>Cyber Secure</div>
            </div>
          </div>

          <h1 className="text-depth-hero" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", marginBottom: "20px", color: "#fff" }}>
            Deploy Your Enterprise <br />Workspace
          </h1>
          <p className="text-depth-body" style={{ fontSize: "16px", color: "var(--text-secondary)", lineHeight: 1.7, maxWidth: "480px", marginBottom: "40px" }}>
            Initialize your organization's GRC and ESG command center. Gain immediate oversight of sustainability metrics and cybersecurity posture. 
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {[
              "Multi-tenant data isolation protocol",
              "ISO 27001 & GDPR aligned controls",
              "Automated Scope 3 reporting engine",
              "Real-time forensic audit mapping"
            ].map(item => (
              <div key={item} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <CheckCircle2 size={16} style={{ color: "var(--color-primary)" }} />
                <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-primary)" }}>{item}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Column: Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="glass-surface" style={{ borderRadius: "28px", padding: "40px", border: "1px solid rgba(255,255,255,0.08)" }}>
            <form onSubmit={handleSubmit}>
              {/* Org Name */}
              <div style={{ marginBottom: "20px" }}>
                <label style={labelStyle}>Organization Entity Name</label>
                <input type="text" value={form.organizationName} onChange={update("organizationName")}
                  className="input-field" placeholder="Acme International Group" required style={{ background: "rgba(255,255,255,0.02)" }} />
              </div>

              {/* Name row */}
              <div className="grid grid-cols-2 gap-4 mb-5">
                <div>
                  <label style={labelStyle}>First Name</label>
                  <input type="text" value={form.firstName} onChange={update("firstName")}
                    className="input-field" placeholder="Jane" required style={{ background: "rgba(255,255,255,0.02)" }} />
                </div>
                <div>
                  <label style={labelStyle}>Last Name</label>
                  <input type="text" value={form.lastName} onChange={update("lastName")}
                    className="input-field" placeholder="Smith" required style={{ background: "rgba(255,255,255,0.02)" }} />
                </div>
              </div>

              {/* Email */}
              <div style={{ marginBottom: "20px" }}>
                <label style={labelStyle}>Corporate Email Address</label>
                <input type="email" value={form.email} onChange={update("email")}
                  className="input-field" placeholder="director@organization.com" required style={{ background: "rgba(255,255,255,0.02)" }} />
              </div>

              {/* Password */}
              <div style={{ marginBottom: "32px" }}>
                <label style={labelStyle}>Platform Passphrase</label>
                <div style={{ position: "relative" }}>
                  <input type={showPw ? "text" : "password"} value={form.password} onChange={update("password")}
                    className="input-field" style={{ paddingRight: "44px", background: "rgba(255,255,255,0.02)" }} placeholder="Min. 8 characters" required minLength={8} />
                  <button type="button" onClick={() => setShowPw(!showPw)}
                    style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.35)", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center" }}>
                    {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="btn-vibrant"
                style={{ width: "100%", padding: "14px", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "14px", border: "none", cursor: isLoading ? "not-allowed" : "pointer" }}
              >
                {isLoading ? (
                  <><div style={{ width: "18px", height: "18px", border: "2px solid", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} /> Initializing Workspace…</>
                ) : (
                  <>Create Organization Identity <ChevronRight size={16} /></>
                )}
              </motion.button>
            </form>

            <div style={{ marginTop: "32px", paddingTop: "24px", borderTop: "1px solid rgba(255,255,255,0.05)", textAlign: "center" }}>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", fontWeight: 500 }}>
                Already authorized?{" "}
                <Link href="/auth/login" style={{ color: "var(--color-primary)", fontWeight: 700, textDecoration: "none" }}>
                  Enter Hub
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
