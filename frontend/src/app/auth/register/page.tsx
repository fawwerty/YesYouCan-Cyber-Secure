"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { Eye, EyeOff, Shield } from "lucide-react";
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

      <div className="w-full max-w-[440px] px-6 relative z-10">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-7"
        >
          <div className="inline-flex items-center gap-2.5 mb-5">
            <div className="w-9 h-9 rounded-md flex items-center justify-center iridescent-bg">
              <Shield size={17} className="text-black" />
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "15px", color: "#fff", lineHeight: 1 }}>YesYouCan</div>
              <div style={{ fontFamily: "monospace", fontSize: "9px", color: "var(--accent-green)", letterSpacing: "0.15em", marginTop: "2px", textTransform: "uppercase" }}>Cyber Secure</div>
            </div>
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "22px", color: "#fff", marginBottom: "6px", letterSpacing: "-0.01em" }}>
            Create your organization
          </h1>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.45)" }}>
            Set up your GRC & ESG workspace
          </p>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="glass-vibrant rounded-xl p-7"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label style={{ display: "block", fontFamily: "monospace", fontSize: "10px", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "7px" }}>
                Organization Name
              </label>
              <input type="text" value={form.organizationName} onChange={update("organizationName")}
                className="input-field" placeholder="Acme Corporation" required />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label style={{ display: "block", fontFamily: "monospace", fontSize: "10px", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "7px" }}>
                  First Name
                </label>
                <input type="text" value={form.firstName} onChange={update("firstName")}
                  className="input-field" placeholder="John" required />
              </div>
              <div>
                <label style={{ display: "block", fontFamily: "monospace", fontSize: "10px", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "7px" }}>
                  Last Name
                </label>
                <input type="text" value={form.lastName} onChange={update("lastName")}
                  className="input-field" placeholder="Doe" required />
              </div>
            </div>

            <div>
              <label style={{ display: "block", fontFamily: "monospace", fontSize: "10px", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "7px" }}>
                Email Address
              </label>
              <input type="email" value={form.email} onChange={update("email")}
                className="input-field" placeholder="you@company.com" required />
            </div>

            <div>
              <label style={{ display: "block", fontFamily: "monospace", fontSize: "10px", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "7px" }}>
                Password
              </label>
              <div className="relative">
                <input type={showPw ? "text" : "password"} value={form.password} onChange={update("password")}
                  className="input-field pr-10" placeholder="Min. 8 characters" required minLength={8} />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                  style={{ color: "rgba(255,255,255,0.35)" }}>
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
                <><div className="w-4 h-4 border-2 rounded-full animate-spin border-black/40 border-t-black" /> Creating workspace…</>
              ) : (
                "Create Organization Account"
              )}
            </motion.button>
          </form>
        </motion.div>

        <p className="text-center mt-5" style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)" }}>
          Already have an account?{" "}
          <Link href="/auth/login" style={{ color: "var(--accent-green)", fontWeight: 600 }} className="hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
