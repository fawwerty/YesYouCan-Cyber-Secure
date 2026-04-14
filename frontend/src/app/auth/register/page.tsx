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
      toast.error(err?.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  const update = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontFamily: "monospace",
    fontSize: "10px",
    color: "rgba(255,255,255,0.4)",
    textTransform: "uppercase",
    letterSpacing: "0.12em",
    marginBottom: "7px",
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", background: "#000", paddingTop: "48px", paddingBottom: "48px" }}>
      
      {/* Cinematic background */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <Image
          src="/assets/auth-bg.png"
          alt="Background"
          fill
          style={{ objectFit: "cover" }}
          priority
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.65) 50%, rgba(0,0,0,0.82) 100%)" }} />
      </div>

      {/* Form container */}
      <div style={{ width: "100%", maxWidth: "440px", padding: "0 24px", position: "relative", zIndex: 10 }}>

        {/* Brand */}
        <motion.div
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{ textAlign: "center", marginBottom: "24px" }}
        >
          <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", marginBottom: "18px" }}>
            <div className="iridescent-bg" style={{ width: "36px", height: "36px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Shield size={16} style={{ color: "#000" }} />
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "15px", color: "#fff", lineHeight: 1 }}>YesYouCan</div>
              <div style={{ fontFamily: "monospace", fontSize: "9px", color: "var(--accent-green)", letterSpacing: "0.15em", marginTop: "2px", textTransform: "uppercase" }}>Cyber Secure</div>
            </div>
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "20px", color: "#fff", marginBottom: "5px", letterSpacing: "-0.01em" }}>
            Create your organization
          </h1>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.45)" }}>
            Set up your GRC & ESG workspace
          </p>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "14px", padding: "28px", backdropFilter: "blur(20px)" }}
        >
          <form onSubmit={handleSubmit}>
            {/* Org name */}
            <div style={{ marginBottom: "14px" }}>
              <label style={labelStyle}>Organization Name</label>
              <input type="text" value={form.organizationName} onChange={update("organizationName")}
                className="input-field" placeholder="Acme Corporation" required />
            </div>

            {/* Name row */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "14px" }}>
              <div>
                <label style={labelStyle}>First Name</label>
                <input type="text" value={form.firstName} onChange={update("firstName")}
                  className="input-field" placeholder="John" required />
              </div>
              <div>
                <label style={labelStyle}>Last Name</label>
                <input type="text" value={form.lastName} onChange={update("lastName")}
                  className="input-field" placeholder="Doe" required />
              </div>
            </div>

            {/* Email */}
            <div style={{ marginBottom: "14px" }}>
              <label style={labelStyle}>Email Address</label>
              <input type="email" value={form.email} onChange={update("email")}
                className="input-field" placeholder="you@company.com" required />
            </div>

            {/* Password */}
            <div style={{ marginBottom: "20px" }}>
              <label style={labelStyle}>Password</label>
              <div style={{ position: "relative" }}>
                <input type={showPw ? "text" : "password"} value={form.password} onChange={update("password")}
                  className="input-field" style={{ paddingRight: "40px" }} placeholder="Min. 8 characters" required minLength={8} />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.35)", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center" }}>
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
                <><div style={{ width: "16px", height: "16px", border: "2px solid", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} /> Creating workspace…</>
              ) : (
                "Create Organization Account"
              )}
            </motion.button>
          </form>
        </motion.div>

        <p style={{ textAlign: "center", marginTop: "18px", fontSize: "12px", color: "rgba(255,255,255,0.35)" }}>
          Already have an account?{" "}
          <Link href="/auth/login" style={{ color: "var(--accent-green)", fontWeight: 600, textDecoration: "none" }}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
