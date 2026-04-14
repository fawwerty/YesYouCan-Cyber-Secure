"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
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
      toast.error(err?.response?.data?.message || "");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black">
      {/* Premium Background Image */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/assets/auth-bg.png" 
          alt="Background" 
          fill 
          className="object-cover opacity-40 grayscale-[0.2]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black" />
      </div>

      <div className="w-full max-w-[440px] px-6 relative z-10">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-accent-green">
              <Shield size={20} className="text-black" />
            </div>
            <div className="text-left">
              <div className="font-display font-bold text-lg text-white leading-none">YesYouCan</div>
              <div className="font-mono text-[10px] text-accent-green tracking-widest mt-0.5 uppercase">CYBER SECURE</div>
            </div>
          </div>
          <h1 className="font-display font-bold text-4xl text-white mb-2 italic">Welcome back</h1>
          <p className="text-sm font-body text-text-secondary">
            Sign in to your GRC & ESG platform
          </p>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass-card rounded-2xl p-8 border-surface-border"
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[10px] font-mono mb-2 text-text-muted uppercase tracking-widest">
                EMAIL ADDRESS
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field bg-black/40 border-surface-border text-sm"
                placeholder="you@company.com"
                required
                autoComplete="email"
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono mb-2 text-text-muted uppercase tracking-widest">
                PASSWORD
              </label>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field bg-black/40 border-surface-border pr-11 text-sm"
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-white transition-colors"
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
              className="w-full py-4 rounded-xl font-display font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 mt-2 bg-accent-green text-black hover:opacity-90 shadow-[0_0_30px_-5px_rgba(16,185,129,0.3)]"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-t-transparent rounded-full animate-spin border-black" />
                  Authenticating…
                </>
              ) : (
                <>
                  <Lock size={15} />
                  Authorize Access
                </>
              )}
            </motion.button>
          </form>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-8 text-xs text-text-muted font-body"
        >
          Don&apos;t have an account?{" "}
          <Link href="/auth/register" className="text-accent-green hover:underline font-bold">
            Register your organization
          </Link>
        </motion.p>
      </div>
    </div>
  );
}
  );
}
