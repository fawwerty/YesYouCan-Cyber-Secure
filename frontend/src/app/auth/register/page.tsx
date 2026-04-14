"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
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
    <div className="min-h-screen grid-bg flex items-center justify-center relative overflow-hidden py-10">
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(13,115,119,0.1) 0%, transparent 70%)" }} />

      <div className="w-full max-w-[480px] px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #0D7377, #00FF94)" }}>
              <Shield size={20} className="text-white" />
            </div>
            <div>
              <div className="font-display font-bold text-lg text-white leading-none">YesYouCan</div>
              <div className="font-mono text-xs" style={{ color: "var(--accent-green)" }}>CYBER SECURE</div>
            </div>
          </div>
          <h1 className="font-display font-bold text-3xl text-white mb-2">Create your workspace</h1>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            Set up your organization&apos;s GRC & ESG platform
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="glass-card rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono mb-2" style={{ color: "var(--text-secondary)" }}>
                ORGANIZATION NAME
              </label>
              <input type="text" value={form.organizationName} onChange={update("organizationName")}
                className="input-field" placeholder="Acme Corporation" required />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono mb-2" style={{ color: "var(--text-secondary)" }}>FIRST NAME</label>
                <input type="text" value={form.firstName} onChange={update("firstName")}
                  className="input-field" placeholder="John" required />
              </div>
              <div>
                <label className="block text-xs font-mono mb-2" style={{ color: "var(--text-secondary)" }}>LAST NAME</label>
                <input type="text" value={form.lastName} onChange={update("lastName")}
                  className="input-field" placeholder="Doe" required />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono mb-2" style={{ color: "var(--text-secondary)" }}>EMAIL ADDRESS</label>
              <input type="email" value={form.email} onChange={update("email")}
                className="input-field" placeholder="you@company.com" required />
            </div>

            <div>
              <label className="block text-xs font-mono mb-2" style={{ color: "var(--text-secondary)" }}>PASSWORD</label>
              <div className="relative">
                <input type={showPw ? "text" : "password"} value={form.password} onChange={update("password")}
                  className="input-field pr-11" placeholder="Min. 8 characters" required minLength={8} />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }}>
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <motion.button type="submit" disabled={isLoading}
              whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
              className="w-full py-3 rounded-xl font-display font-semibold text-sm flex items-center justify-center gap-2 mt-2"
              style={{
                background: "linear-gradient(135deg, #0D7377 0%, #00CC77 100%)",
                color: "#0A0F1E",
                boxShadow: "0 4px 20px rgba(0,255,148,0.2)",
                opacity: isLoading ? 0.6 : 1,
              }}>
              {isLoading ? (
                <><div className="w-4 h-4 border-2 rounded-full animate-spin"
                  style={{ borderColor: "#0A0F1E40", borderTopColor: "#0A0F1E" }} />Creating workspace…</>
              ) : "Create Organization Account"}
            </motion.button>
          </form>
        </motion.div>

        <p className="text-center mt-5 text-xs" style={{ color: "var(--text-muted)" }}>
          Already have an account?{" "}
          <Link href="/auth/login" className="transition-colors" style={{ color: "var(--accent-green)" }}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
