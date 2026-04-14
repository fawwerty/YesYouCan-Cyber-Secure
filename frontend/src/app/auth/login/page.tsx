"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Eye, EyeOff, Shield, Lock, ArrowLeft, ChevronRight } from "lucide-react";
import useAuthStore from "@/store/authStore";
import toast from "react-hot-toast";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast.success("Identity Verified. Portal access granted.");
      router.push("/dashboard");
    } catch (err: any) {
      const message = err?.response?.data?.message || "Login failed. Please check your credentials.";
      toast.error(message);
    }
  };

  return (
    <div style={{ minHeight: "100vh", color: "var(--text-primary)", padding: "120px 40px 80px", maxWidth: "1200px", margin: "0 auto", fontFamily: "var(--font-body)", position: "relative" }}>
      
      {/* Back Navigation */}
      <Link href="/" style={{ position: "absolute", top: "40px", left: "40px", display: "flex", alignItems: "center", gap: "8px", color: "var(--color-primary)", textDecoration: "none", fontSize: "13px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }} className="hover:opacity-70 transition-opacity">
        <ArrowLeft size={16} /> Hub
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        {/* Left Column: Context */}
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
            Enterprise <br />Intelligence Access
          </h1>
          <p className="text-depth-body" style={{ fontSize: "16px", color: "var(--text-secondary)", lineHeight: 1.7, maxWidth: "480px", marginBottom: "40px" }}>
            Authorized entry for GRC and Sustainability lead stakeholders. Enter your secure credentials to manage organizational risk and ESG metrics.
          </p>

          <div className="glass-surface" style={{ padding: "24px", borderRadius: "20px", display: "inline-flex", flexDirection: "column", gap: "12px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#22c55e" }} />
              <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-primary)" }}>99.9% Infrastructure Uptime</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--color-primary)" }} />
              <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-primary)" }}>End-to-End AIS 256 Encryption</span>
            </div>
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
              <div style={{ marginBottom: "24px" }}>
                <label style={{ display: "block", fontFamily: "monospace", fontSize: "10px", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "10px", fontWeight: 700 }}>
                  Strategic Email Identity
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                  placeholder="name@organization.com"
                  required
                  autoComplete="email"
                  style={{ background: "rgba(255,255,255,0.02)", height: "50px" }}
                />
              </div>

              <div style={{ marginBottom: "32px" }}>
                <label style={{ display: "block", fontFamily: "monospace", fontSize: "10px", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "10px", fontWeight: 700 }}>
                  Security Passphrase
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    type={showPw ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field"
                    style={{ paddingRight: "44px", background: "rgba(255,255,255,0.02)", height: "50px" }}
                    placeholder="••••••••••••"
                    required
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw(!showPw)}
                    style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center" }}
                  >
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
                  <>
                    <div style={{ width: "18px", height: "18px", border: "2px solid", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                    Authenticating Stakeholder…
                  </>
                ) : (
                  <>
                    <Lock size={16} />
                    Authorize Access <ChevronRight size={16} />
                  </>
                )}
              </motion.button>
            </form>

            <div style={{ marginTop: "32px", paddingTop: "24px", borderTop: "1px solid rgba(255,255,255,0.05)", textAlign: "center" }}>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", fontWeight: 500 }}>
                Unregistered Organization?{" "}
                <Link href="/auth/register" style={{ color: "var(--color-primary)", fontWeight: 700, textDecoration: "none" }} className="hover:underline">
                  Initiate Onboarding
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
