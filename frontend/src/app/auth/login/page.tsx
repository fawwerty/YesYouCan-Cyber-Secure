"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { Eye, EyeOff, Shield, Lock } from "lucide-react";
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
      toast.success("Welcome back");
      router.push("/dashboard");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Login failed. Please check your credentials.");
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", background: "#000" }}>
      
      {/* Cinematic background */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <Image
          src="/assets/hero-soc-modern.png"
          alt="Background"
          fill
          style={{ objectFit: "cover" }}
          priority
        />
        {/* Gradient overlay for readability */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.65) 50%, rgba(0,0,0,0.85) 100%)" }} />
      </div>

      {/* Form container */}
      <div style={{ width: "100%", maxWidth: "400px", padding: "0 24px", position: "relative", zIndex: 10 }}>
        
        {/* Logo / Brand */}
        <motion.div
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{ textAlign: "center", marginBottom: "28px" }}
        >
          <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
            <div className="iridescent-bg" style={{ width: "36px", height: "36px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Shield size={16} style={{ color: "#000" }} />
            </div>
            <div style={{ textAlign: "left" }}>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "15px", color: "#fff", lineHeight: 1 }}>YesYouCan</div>
              <div style={{ fontFamily: "monospace", fontSize: "9px", color: "var(--accent-green)", letterSpacing: "0.15em", marginTop: "2px", textTransform: "uppercase" }}>Cyber Secure</div>
            </div>
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "20px", color: "#fff", marginBottom: "5px", letterSpacing: "-0.01em" }}>
            Sign in to your account
          </h1>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.45)", lineHeight: 1.5 }}>
            GRC & ESG intelligence platform
          </p>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.08 }}
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "14px", padding: "28px", backdropFilter: "blur(20px)" }}
        >
          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", fontFamily: "monospace", fontSize: "10px", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "7px" }}>
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                placeholder="you@company.com"
                required
                autoComplete="email"
              />
            </div>

            {/* Password */}
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", fontFamily: "monospace", fontSize: "10px", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "7px" }}>
                Password
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field"
                  style={{ paddingRight: "40px" }}
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.35)", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center" }}
                >
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="btn-vibrant"
              style={{ width: "100%", padding: "12px", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "13px", border: "none", cursor: isLoading ? "not-allowed" : "pointer" }}
            >
              {isLoading ? (
                <>
                  <div style={{ width: "16px", height: "16px", border: "2px solid", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                  Authenticating…
                </>
              ) : (
                <>
                  <Lock size={14} />
                  Authorize Access
                </>
              )}
            </motion.button>
          </form>
        </motion.div>

        {/* Register link */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{ textAlign: "center", marginTop: "20px", fontSize: "12px", color: "rgba(255,255,255,0.35)" }}
        >
          No account?{" "}
          <Link href="/auth/register" style={{ color: "var(--accent-green)", fontWeight: 600, textDecoration: "none" }}>
            Register your organization
          </Link>
        </motion.p>
      </div>
    </div>
  );
}
