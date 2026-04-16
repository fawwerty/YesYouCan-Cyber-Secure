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
    <div className="hero-soc-bg" style={{ minHeight: "100vh", position: "relative" }}>
      {/* Dynamic Overlay to reduce brightness in light mode */}
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.3)", zIndex: 0 }} />
      
      <div style={{ color: "var(--text-primary)", padding: "120px 24px 80px", maxWidth: "1200px", margin: "0 auto", fontFamily: "var(--font-body)", position: "relative", zIndex: 10 }}>
      
      {/* Back Navigation */}
      <Link href="/" style={{ position: "absolute", top: "40px", left: "40px", display: "flex", alignItems: "center", gap: "8px", color: "var(--color-primary)", textDecoration: "none", fontSize: "13px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }} className="hover:opacity-70 transition-opacity">
        <ArrowLeft size={16} /> Hub
      </Link>

      <div className="flex flex-col items-center">
        {/* Minimalistic Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", marginBottom: "40px" }}
        >
          <div className="iridescent-bg" style={{ width: "48px", height: "48px", borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Shield size={24} style={{ color: "#000" }} />
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "20px", color: "#fff", lineHeight: 1 }}>YesYouCan</div>
            <div style={{ fontFamily: "monospace", fontSize: "11px", color: "var(--color-primary)", letterSpacing: "0.2em", marginTop: "4px", textTransform: "uppercase", fontWeight: 800 }}>Cyber Secure</div>
          </div>
        </motion.div>

        {/* Centered Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          style={{ width: "100%", maxWidth: "440px" }}
        >
          <div className="glass-surface" style={{ borderRadius: "28px", padding: "40px", border: "1px solid rgba(255,255,255,0.12)", boxShadow: "0 24px 48px rgba(0,0,0,0.4)" }}>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: "24px" }}>
                <label style={{ display: "block", fontFamily: "monospace", fontSize: "10px", color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "10px", fontWeight: 700 }}>
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
                  style={{ background: "rgba(255,255,255,0.03)", height: "54px", fontSize: "15px", color: "#fff" }}
                />
              </div>

              <div style={{ marginBottom: "32px" }}>
                <label style={{ display: "block", fontFamily: "monospace", fontSize: "10px", color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "10px", fontWeight: 700 }}>
                  Security Passphrase
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    type={showPw ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field"
                    style={{ paddingRight: "44px", background: "rgba(255,255,255,0.03)", height: "54px", fontSize: "15px", color: "#fff" }}
                    placeholder="••••••••••••"
                    required
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw(!showPw)}
                    style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.4)", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center" }}
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
                style={{ width: "100%", padding: "16px", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "15px", border: "none", cursor: isLoading ? "not-allowed" : "pointer" }}
              >
                {isLoading ? (
                  <>
                    <div style={{ width: "20px", height: "20px", border: "2px solid", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                    Authenticating…
                  </>
                ) : (
                  <>
                    <Lock size={16} />
                    Authorize Access <ChevronRight size={16} />
                  </>
                )}
              </motion.button>
            </form>

            <div style={{ marginTop: "32px", paddingTop: "24px", borderTop: "1px solid rgba(255,255,255,0.1)", textAlign: "center" }}>
              <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)", fontWeight: 500 }}>
                Unregistered Organization?{" "}
                <Link href="/auth/register" style={{ color: "var(--color-primary)", fontWeight: 800, textDecoration: "none" }} className="hover:underline">
                  Initiate Onboarding
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
    </div>
  );
}
