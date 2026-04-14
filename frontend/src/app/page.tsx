"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { 
  Shield, Leaf, Zap, Globe, Lock, ArrowRight, 
  ChevronRight, CheckCircle2, Award, Users, BarChart3 
} from "lucide-react";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0A0F1E] text-white selection:bg-accent-green/30 selection:text-accent-green overflow-hidden">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-teal-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent-green/5 rounded-full blur-[100px] translate-y-1/4 -translate-x-1/4" />
        <div className="absolute inset-0 grid-bg opacity-30" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-6 inset-x-0 z-50 px-6">
        <div className="max-w-6xl mx-auto glass-vibrant rounded-2xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center iridescent-bg">
              <Shield size={18} className="text-[#0A0F1E]" />
            </div>
            <div className="hidden sm:block">
              <div className="font-display font-bold text-base leading-none">YesYouCan</div>
              <div className="font-mono text-[10px] text-accent-green tracking-widest mt-0.5 uppercase">Cyber Secure</div>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-8 font-display text-sm font-medium text-text-secondary">
            <Link href="#features" className="hover:text-white transition-colors">Features</Link>
            <Link href="#solutions" className="hover:text-white transition-colors">Solutions</Link>
            <Link href="#about" className="hover:text-white transition-colors">About</Link>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/auth/login" className="text-sm font-display font-medium text-text-secondary hover:text-white transition-colors px-2">
              Login
            </Link>
            <Link href="/auth/register" className="btn-vibrant px-5 py-2.5 rounded-xl text-sm flex items-center gap-2">
              Launch Platform <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6 z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial="initial"
            animate="animate"
            variants={stagger}
            className="text-center lg:text-left"
          >
            <motion.div 
              variants={fadeIn}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-vibrant border-accent-green/20 mb-6"
            >
              <Zap size={14} className="text-accent-green fill-accent-green" />
              <span className="font-mono text-[11px] font-bold text-accent-green uppercase tracking-wider">Next-Gen GRC & ESG Platform</span>
            </motion.div>
            
            <motion.h1 
              variants={fadeIn}
              className="font-display font-black text-5xl md:text-7xl lg:text-8xl leading-[0.9] mb-8"
            >
              The Science of <span className="text-gradient-vibrant">Sustain</span> and <span className="text-gradient-vibrant">Secure</span>.
            </motion.h1>
            
            <motion.p 
              variants={fadeIn}
              className="text-lg md:text-xl text-text-secondary max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed"
            >
              Secure your infrastructure while building a sustainable future. YesYouCan integrates Cybersecurity, ESG metrics, and AI-driven compliance into one powerful, Pro Max ecosystem.
            </motion.p>
            
            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row items-center gap-5 justify-center lg:justify-start">
              <Link href="/auth/register" className="btn-vibrant px-8 py-4 rounded-2xl text-base w-full sm:w-auto text-center flex items-center justify-center gap-2 group">
                Start Enterprise Launch
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <div className="flex items-center gap-4 px-6 py-4 rounded-2xl glass-vibrant border-white/5">
                <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-[#0A0F1E] bg-surface-elevated flex items-center justify-center text-[10px] font-bold overflow-hidden">
                      <Image src={`https://i.pravatar.cc/100?u=${i}`} alt="User" width={32} height={32} />
                    </div>
                  ))}
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-white">500+ Enterprises</div>
                  <div className="text-[10px] text-text-muted">Already securing their future</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative z-10 rounded-3xl overflow-hidden glass-vibrant border-white/10 pro-shadow">
              <Image 
                src="/assets/hero.png" 
                alt="GRC Visualization" 
                width={800} 
                height={800} 
                className="w-full h-auto hover:scale-105 transition-transform duration-[2s]"
                priority
              />
            </div>
            
            {/* Floating Elements */}
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-10 -right-10 z-20 glass-vibrant p-4 rounded-2xl border-accent-green/30"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg iridescent-bg flex items-center justify-center">
                  <BarChart3 size={16} className="text-[#0A0F1E]" />
                </div>
                <div>
                  <div className="text-[10px] text-text-secondary font-mono">LIVE COMPLIANCE</div>
                  <div className="text-sm font-bold text-accent-green">99.8% Perfect</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Feature Grid Section (Mobbin Inspired) */}
      <section id="features" className="py-32 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-display font-black text-4xl md:text-6xl mb-4 tracking-tight italic">Engineered for Impact.</h2>
            <p className="text-text-secondary max-w-2xl mx-auto">Designed by experts, built with precision. Experience the intersection of intelligence and sustainability.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[600px]">
            {/* Large Feature Card */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="md:col-span-8 glass-vibrant rounded-[2.5rem] p-10 flex flex-col justify-between group relative overflow-hidden feature-grid-item"
            >
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-teal-primary/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#00FF94]/10 border border-[#00FF94]/20 flex items-center justify-center mb-8">
                  <Shield size={28} className="text-accent-green" />
                </div>
                <h3 className="font-display font-bold text-4xl text-white mb-4">Autonomous Cyber Defense</h3>
                <p className="text-text-secondary text-lg max-w-md">Our AI doesn't just monitor; it predicts. Detect vulnerabilities before they manifest with our adaptive GRC engine.</p>
              </div>
              <div className="mt-8 flex items-center gap-4">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-mono">
                  <CheckCircle2 size={14} className="text-accent-green" /> ISO 27001
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-mono">
                  <CheckCircle2 size={14} className="text-accent-green" /> NIST CSF
                </div>
              </div>
            </motion.div>

            {/* Small Feature Card */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="md:col-span-4 glass-vibrant rounded-[2.5rem] p-10 flex flex-col items-center justify-center text-center feature-grid-item iridescent-bg group cursor-pointer"
            >
              <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Leaf size={40} className="text-[#0A0F1E]" />
              </div>
              <h3 className="font-display font-bold text-2xl text-[#0A0F1E] mb-3">Green Intelligence</h3>
              <p className="text-[#0A0F1E]/70 text-sm">Automated Scope 1, 2, and 3 carbon reporting at your fingertips.</p>
            </motion.div>

            {/* Bottom Row */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="md:col-span-4 glass-vibrant rounded-[2.5rem] p-10 feature-grid-item"
            >
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-6">
                <Globe size={24} className="text-purple-400" />
              </div>
              <h3 className="font-display font-bold text-xl text-white mb-2">Global Governance</h3>
              <p className="text-text-secondary text-sm">Multi-tenant, multi-region compliance management simplified.</p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="md:col-span-8 glass-vibrant rounded-[2.5rem] overflow-hidden relative feature-grid-item group"
            >
              <Image 
                src="/assets/features.png" 
                alt="Data Visualization" 
                fill
                className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1E] to-transparent" />
              <div className="absolute bottom-10 left-10">
                <h3 className="font-display font-bold text-3xl text-white mb-2 italic">Pro Max Analytics</h3>
                <p className="text-text-secondary text-sm max-w-sm">Every data point visualized. Every risk quantified. Real-time insights that actually lead to action.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 px-6 border-y border-white/5 relative z-10 overflow-hidden">
        <div className="absolute inset-0 iridescent-bg opacity-5" />
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-12 text-center relative z-20">
          <p className="font-mono text-xs uppercase tracking-widest text-text-muted">Trusted by innovators globally</p>
          <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-40 grayscale group hover:grayscale-0 transition-all duration-700">
            {/* Placeholder Logos as simple text for high-end look */}
            {["ORACLE", "VELOCITY", "STRIPE", "MERCURY", "LINEAR"].map(label => (
              <span key={label} className="font-display font-black text-2xl md:text-3xl tracking-tighter hover:text-accent-green transition-colors cursor-default">{label}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section id="solutions" className="py-32 px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-vibrant rounded-[3rem] p-16 md:p-24 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent-green/30 to-transparent" />
            <h2 className="font-display font-black text-5xl md:text-8xl leading-tight mb-8 italic">
              Ready to redefine <br/> 
              <span className="text-gradient-vibrant">possibility?</span>
            </h2>
            <p className="text-lg text-text-secondary mb-12 max-w-lg mx-auto leading-relaxed">
              Join the elite league of enterprises prioritizing both cyber excellence and environmental stewardship. 
              Built for doctors of strategy and masters of technology.
            </p>
            <Link href="/auth/register" className="btn-vibrant px-10 py-5 rounded-2xl text-lg inline-flex items-center gap-3">
              Deploy Your Instance Now <ArrowRight size={20} />
            </Link>
            
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: "SOC2 Type II", icon: <Lock size={16} /> },
                { label: "HIPAA Compliant", icon: <Shield size={16} /> },
                { label: "ESG Gold Standard", icon: <Award size={16} /> },
                { label: "99.99% Uptime", icon: <Zap size={16} /> },
              ].map(badge => (
                <div key={badge.label} className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-text-secondary">
                    {badge.icon}
                  </div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-text-muted">{badge.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer id="about" className="py-20 px-6 border-t border-white/5 bg-[#0A0F1E] relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg iridescent-bg flex items-center justify-center">
                  <Shield size={16} className="text-[#0A0F1E]" />
                </div>
                <span className="font-display font-bold text-xl">YesYouCan</span>
              </div>
              <p className="text-text-secondary text-sm max-w-sm leading-relaxed mb-6">
                Integrating governance, sustainability, and cybersecurity into a unified intelligence ecosystem. 
                Founded by industry visionary Dr. Noah Darko-Adjei.
              </p>
              <div className="flex gap-4">
                {/* Social icons placeholder */}
                <div className="w-8 h-8 rounded-lg glass-vibrant border-white/5 flex items-center justify-center hover:border-accent-green transition-colors cursor-pointer"><Globe size={14} /></div>
                <div className="w-8 h-8 rounded-lg glass-vibrant border-white/5 flex items-center justify-center hover:border-accent-green transition-colors cursor-pointer"><Users size={14} /></div>
                <div className="w-8 h-8 rounded-lg glass-vibrant border-white/5 flex items-center justify-center hover:border-accent-green transition-colors cursor-pointer"><Shield size={14} /></div>
              </div>
            </div>
            
            <div>
              <h4 className="font-display font-bold text-sm mb-6 text-white uppercase tracking-widest">Platform</h4>
              <ul className="space-y-4 text-text-secondary text-sm font-medium">
                <li><Link href="#" className="hover:text-accent-green transition-colors">Infrastructure</Link></li>
                <li><Link href="#" className="hover:text-accent-green transition-colors">ESG Reporting</Link></li>
                <li><Link href="#" className="hover:text-accent-green transition-colors">Cyber Suite</Link></li>
                <li><Link href="#" className="hover:text-accent-green transition-colors">AI Insights</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-display font-bold text-sm mb-6 text-white uppercase tracking-widest">Enterprise</h4>
              <ul className="space-y-4 text-text-secondary text-sm font-medium">
                <li><Link href="#" className="hover:text-accent-green transition-colors">Solutions</Link></li>
                <li><Link href="#" className="hover:text-accent-green transition-colors">Governance</Link></li>
                <li><Link href="#" className="hover:text-accent-green transition-colors">Sustainability</Link></li>
                <li><Link href="#" className="hover:text-accent-green transition-colors">Security</Link></li>
              </ul>
            </div>
          </div>

          <div className="pt-12 border-t border-white/5 text-center flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="font-mono text-[10px] text-text-muted">
              © 2025 YesYouCan Cyber Secure • Strategic Advisor: Christiana Konlan Kennedy
            </p>
            <div className="flex items-center gap-8 text-[10px] font-mono text-text-muted">
              <Link href="#" className="hover:text-white transition-colors uppercase tracking-widest">Privacy Policy</Link>
              <Link href="#" className="hover:text-white transition-colors uppercase tracking-widest">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
