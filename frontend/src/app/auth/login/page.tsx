"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Eye, EyeOff, Shield, Zap, Lock } from "lucide-react";
import useAuthStore from "../../../store/authStore";
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
      toast.error(err?.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen grid-bg flex items-center justify-center relative overflow-hidden">
      {/* Ambient blobs */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(13,115,119,0.12) 0%, transparent 70%)" }} />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(0,255,148,0.07) 0%, transparent 70%)" }} />

      <div className="w-full max-w-[440px] px-6 relative z-10">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #0D7377, #00FF94)" }}>
              <Shield size={20} className="text-white" />
            </div>
            <div className="text-left">
              <div className="font-display font-bold text-lg text-white leading-none">YesYouCan</div>
              <div className="font-mono text-xs" style={{ color: "var(--accent-green)" }}>CYBER SECURE</div>
            </div>
          </div>
          <h1 className="font-display font-bold text-3xl text-white mb-2">Welcome back</h1>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            Sign in to your GRC & ESG platform
          </p>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass-card rounded-2xl p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-mono mb-2" style={{ color: "var(--text-secondary)" }}>
                EMAIL ADDRESS
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

            <div>
              <label className="block text-xs font-mono mb-2" style={{ color: "var(--text-secondary)" }}>
                PASSWORD
              </label>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field pr-11"
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                  style={{ color: "var(--text-muted)" }}
                >
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full py-3 rounded-xl font-display font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 mt-2"
              style={{
                background: isLoading
                  ? "rgba(13,115,119,0.5)"
                  : "linear-gradient(135deg, #0D7377 0%, #00CC77 100%)",
                color: "#0A0F1E",
                boxShadow: isLoading ? "none" : "0 4px 20px rgba(0,255,148,0.2)",
              }}
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-t-transparent rounded-full animate-spin"
                    style={{ borderColor: "#0A0F1E", borderTopColor: "transparent" }} />
                  Authenticating…
                </>
              ) : (
                <>
                  <Lock size={15} />
                  Sign In Securely
                </>
              )}
            </motion.button>
          </form>

          <div className="mt-6 pt-6" style={{ borderTop: "1px solid var(--surface-border)" }}>
            <div className="flex items-center gap-2 mb-3">
              <Zap size={12} style={{ color: "var(--accent-green)" }} />
              <span className="font-mono text-xs" style={{ color: "var(--text-muted)" }}>DEMO CREDENTIALS</span>
            </div>
            <div className="space-y-1">
              {[
                { role: "Super Admin", email: "superadmin@yesyoucan.com" },
                { role: "Admin", email: "admin@yesyoucan.com" },
                { role: "Analyst", email: "analyst@yesyoucan.com" },
                { role: "Executive", email: "executive@yesyoucan.com" },
              ].map((cred) => (
                <button
                  key={cred.email}
                  type="button"
                  onClick={() => { setEmail(cred.email); setPassword("Password123!"); }}
                  className="w-full text-left px-3 py-2 rounded-lg text-xs transition-colors"
                  style={{ background: "var(--surface-elevated)", color: "var(--text-secondary)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-green)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
                >
                  <span className="font-mono">{cred.role}</span>
                  <span className="ml-2 opacity-60">{cred.email}</span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-6 text-xs"
          style={{ color: "var(--text-muted)" }}
        >
          Don&apos;t have an account?{" "}
          <Link href="/auth/register" className="transition-colors"
            style={{ color: "var(--accent-green)" }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Register your organization
          </Link>
        </motion.p>

        {/* Footer identity */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8"
        >
          <p className="font-mono text-xs" style={{ color: "var(--text-muted)", lineHeight: 1.8 }}>
            © 2025 YesYouCan Cyber Secure. All rights reserved.<br />
            CEO: Dr. Noah Darko-Adjei | Strategic Advisor: Christiana Konlan Kennedy
          </p>
        </motion.div>
      </div>
    </div>
  );
}
