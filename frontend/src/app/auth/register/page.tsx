"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { Eye, EyeOff, Shield, ArrowLeft } from "lucide-react";
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
      toast.error("Password must be at least 8 characters");
      return;
    }
    try {
      await register(form);
      toast.success("Organization registered successfully!");
      router.push("/dashboard");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Registration failed");
    }
  };

  const update = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black py-12">
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

      <div className="w-full max-w-[480px] px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-accent-green">
              <Shield size={20} className="text-black" />
            </div>
            <div>
              <div className="font-display font-bold text-lg text-white leading-none">YesYouCan</div>
              <div className="font-mono text-[10px] text-accent-green tracking-widest mt-0.5 uppercase">CYBER SECURE</div>
            </div>
          </div>
          <h1 className="font-display font-bold text-4xl text-white mb-2 italic">Create workspace</h1>
          <p className="text-sm font-body text-text-secondary">
            Set up your organization&apos;s GRC & ESG platform
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.1 }}
          className="glass-card rounded-2xl p-8 border-surface-border"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[10px] font-mono mb-2 text-text-muted uppercase tracking-widest">
                ORGANIZATION NAME
              </label>
              <input type="text" value={form.organizationName} onChange={update("organizationName")}
                className="input-field bg-black/40 border-surface-border text-sm" placeholder="Acme Corporation" required />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-mono mb-2 text-text-muted uppercase tracking-widest">FIRST NAME</label>
                <input type="text" value={form.firstName} onChange={update("firstName")}
                  className="input-field bg-black/40 border-surface-border text-sm" placeholder="John" required />
              </div>
              <div>
                <label className="block text-[10px] font-mono mb-2 text-text-muted uppercase tracking-widest">LAST NAME</label>
                <input type="text" value={form.lastName} onChange={update("lastName")}
                  className="input-field bg-black/40 border-surface-border text-sm" placeholder="Doe" required />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-mono mb-2 text-text-muted uppercase tracking-widest">EMAIL ADDRESS</label>
              <input type="email" value={form.email} onChange={update("email")}
                className="input-field bg-black/40 border-surface-border text-sm" placeholder="you@company.com" required />
            </div>

            <div>
              <label className="block text-[10px] font-mono mb-2 text-text-muted uppercase tracking-widest">PASSWORD</label>
              <div className="relative">
                <input type={showPw ? "text" : "password"} value={form.password} onChange={update("password")}
                  className="input-field bg-black/40 border-surface-border pr-11 text-sm" placeholder="Min. 8 characters" required minLength={8} />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted">
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <motion.button type="submit" disabled={isLoading}
              whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
              className="w-full py-4 rounded-xl font-display font-bold text-sm flex items-center justify-center gap-2 mt-2 bg-accent-green text-black hover:opacity-90 shadow-[0_0_30px_-5px_rgba(16,185,129,0.3)] transition-all duration-300">
              {isLoading ? (
                <><div className="w-4 h-4 border-2 rounded-full animate-spin border-black/40 border-t-black" /> Creating workspace…</>
              ) : (
                "Create Organization Account"
              )}
            </motion.button>
          </form>
        </motion.div>

        <p className="text-center mt-8 text-xs text-text-muted font-body">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-accent-green hover:underline font-bold">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
