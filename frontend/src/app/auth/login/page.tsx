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
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black">
      {/* Professional Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/site-bg.png"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/75" />
      </div>

      <div className="w-full max-w-[400px] px-6 relative z-10">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2.5 mb-5">
            <div className="w-9 h-9 rounded-md flex items-center justify-center iridescent-bg">
              <Shield size={17} className="text-black" />
            </div>
            <div className="text-left">
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "15px", color: "#fff", lineHeight: 1 }}>YesYouCan</div>
              <div style={{ fontFamily: "monospace", fontSize: "9px", color: "var(--accent-green)", letterSpacing: "0.15em", marginTop: "2px", textTransform: "uppercase" }}>Cyber Secure</div>
            </div>
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "22px", color: "#fff", marginBottom: "6px", letterSpacing: "-0.01em" }}>
            Sign in to your account
          </h1>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.45)", lineHeight: 1.5 }}>
            GRC & ESG intelligence platform
          </p>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.08 }}
          className="glass-vibrant rounded-xl p-7"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
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

            <div>
              <label style={{ display: "block", fontFamily: "monospace", fontSize: "10px", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "7px" }}>
                Password
              </label>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field pr-10"
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                  style={{ color: "rgba(255,255,255,0.35)" }}
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
              className="w-full py-3 rounded-lg btn-vibrant flex items-center justify-center gap-2 mt-1"
              style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "13px" }}
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-t-transparent rounded-full animate-spin border-black" />
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

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center mt-6"
          style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)" }}
        >
          No account?{" "}
          <Link href="/auth/register" style={{ color: "var(--accent-green)", fontWeight: 600 }} className="hover:underline">
            Register your organization
          </Link>
        </motion.p>
      </div>
    </div>
  );
}
