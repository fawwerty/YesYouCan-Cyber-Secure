"use client";
import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle, ShieldCheck, Leaf, TrendingUp, Zap,
  Truck, ClipboardList, Users, RefreshCw, Award
} from "lucide-react";
import api from "@/lib/api";
import { KPICard, CardSkeleton, SectionHeader, CircularProgress } from "../../components/ui/index";
import { formatCO2, complianceColor, riskLevel } from "@/lib/utils";
import EmissionsTrendChart from "../../components/charts/EmissionsTrend";
import RiskHeatmap from "../../components/charts/RiskHeatmap";
import ComplianceRadar from "../../components/charts/ComplianceRadar";
import useAuthStore from "@/store/authStore";
import toast from "react-hot-toast";

export default function DashboardPage() {
  const { user } = useAuthStore();
  const [summary, setSummary] = useState<any>(null);
  const [emissionsTrend, setEmissionsTrend] = useState<any[]>([]);
  const [heatmap, setHeatmap] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchAll = useCallback(async () => {
    try {
      const [sumRes, trendRes, heatRes] = await Promise.all([
        api.get("/dashboard/summary"),
        api.get("/dashboard/emissions-trend"),
        api.get("/dashboard/risk-heatmap"),
      ]);
      setSummary(sumRes.data.data);
      setEmissionsTrend(trendRes.data.data);
      setHeatmap(heatRes.data.data);
    } catch (err: any) {
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchAll();
    toast.success("Dashboard refreshed");
  };

  const totalEmissions = summary ? summary.emissions.scope1 + summary.emissions.scope2 + summary.emissions.scope3 : 0;

  return (
    <div className="p-5 md:p-7 max-w-[1600px] mx-auto">
      <SectionHeader
        title={`Good ${new Date().getHours() < 12 ? "morning" : "afternoon"}, ${user?.firstName}`}
        subtitle="Here's your integrated GRC & Sustainability overview"
        titleStyle={{ color: "#fff" }}
        action={
          <button onClick={handleRefresh} disabled={refreshing}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all surface-1 hover:surface-2"
            style={{ color: "var(--text-secondary)" }}>
            <RefreshCw size={14} className={refreshing ? "animate-spin" : ""} />
            {refreshing ? "Refreshing…" : "Refresh"}
          </button>
        }
      />

      {/* Compliance benchmark banner */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="surface-1 rounded-xl p-5 mb-6 flex items-center gap-4"
      >
        <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 bg-accent-green">
          <Award size={24} className="text-black" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-display font-bold text-white text-lg italic uppercase tracking-tight">
            Compliance Benchmark Achieved
          </p>
          <p className="text-xs mt-0.5 font-body text-text-muted">
            Internal Validation: YesYouCan Digital Management Suite
          </p>
        </div>
        <div className="font-display font-black text-4xl flex-shrink-0 text-accent-green">+35%</div>
      </motion.div>

      {/* KPI row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)
        ) : (
          <>
            <KPICard
              label="Total Risks" value={summary?.risks.total ?? 0}
              change={-8} icon={<AlertTriangle size={16} />}
              color="#fb923c" delay={0}
            />
            <KPICard
              label="Avg Compliance" value={summary?.compliance.averageScore ?? 0}
              unit="%" icon={<ShieldCheck size={16} />}
              color="#00FF94" delay={0.06}
            />
            <KPICard
              label="CO₂ This Year" value={totalEmissions}
              formatter={formatCO2} icon={<Leaf size={16} />}
              color="#4ade80" delay={0.12}
            />
            <KPICard
              label="Open Incidents" value={summary?.incidents.open ?? 0}
              icon={<Zap size={16} />}
              color="#f87171" delay={0.18}
            />
          </>
        )}
      </div>

      {/* Second KPI row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {loading ? Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />) : (
          <>
            <KPICard label="Critical Risks" value={summary?.risks.critical ?? 0} icon={<AlertTriangle size={16} />} color="#f87171" delay={0.24} />
            <KPICard label="Active Audits" value={summary?.audits.active ?? 0} icon={<ClipboardList size={16} />} color="#60a5fa" delay={0.3} />
            <KPICard label="Scope 1 Emissions" value={summary?.emissions.scope1 ?? 0} unit="tCO₂e" icon={<Leaf size={16} />} color="#fb923c" delay={0.36} />
            <KPICard label="Scope 3 Emissions" value={summary?.emissions.scope3 ?? 0} unit="tCO₂e" icon={<TrendingUp size={16} />} color="#a78bfa" delay={0.42} />
          </>
        )}
      </div>

      {/* Charts grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
        {/* Emissions trend - 2 cols */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="glass-card rounded-2xl p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-display font-semibold text-white">Carbon Emissions Trend</h3>
              <p className="font-mono text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                Scope 1, 2 & 3 — {new Date().getFullYear()}
              </p>
            </div>
            <div className="font-mono text-xs px-2 py-1 rounded-lg" style={{ background: "rgba(0,255,148,0.08)", color: "var(--accent-green)" }}>
              tCO₂e
            </div>
          </div>
          {loading ? (
            <div className="h-[260px] skeleton rounded-xl" />
          ) : (
            <EmissionsTrendChart data={emissionsTrend} />
          )}
        </motion.div>

        {/* Compliance radar */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
          className="glass-card rounded-2xl p-5">
          <div className="mb-4">
            <h3 className="font-display font-semibold text-white">Compliance by Framework</h3>
            <p className="font-mono text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>Multi-framework posture</p>
          </div>
          {loading ? (
            <div className="h-[220px] skeleton rounded-xl" />
          ) : (
            <>
              <ComplianceRadar data={summary?.compliance.frameworks ?? []} />
              <div className="mt-3 grid grid-cols-2 gap-2">
                {(summary?.compliance.frameworks ?? []).map((f: any) => (
                  <div key={f.code} className="flex items-center justify-between px-2 py-1.5 rounded-lg"
                    style={{ background: "var(--surface-elevated)" }}>
                    <span className="font-mono text-xs" style={{ color: "var(--text-secondary)" }}>{f.code}</span>
                    <span className="font-mono text-xs font-semibold" style={{ color: complianceColor(f.complianceScore) }}>
                      {f.complianceScore}%
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}
        </motion.div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Risk heatmap */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="glass-card rounded-2xl p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-display font-semibold text-white">Risk Heatmap</h3>
              <p className="font-mono text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                Impact × Likelihood matrix
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs px-2 py-1 rounded-md" style={{ background: "rgba(248,113,113,0.1)", color: "#f87171" }}>
                {summary?.risks.critical ?? 0} Critical
              </span>
              <span className="font-mono text-xs px-2 py-1 rounded-md" style={{ background: "rgba(251,146,60,0.1)", color: "#fb923c" }}>
                {summary?.risks.open ?? 0} Open
              </span>
            </div>
          </div>
          {loading ? <div className="h-[220px] skeleton rounded-xl" /> : <RiskHeatmap data={heatmap} />}
        </motion.div>

        {/* Top performers + supplier health */}
        <div className="space-y-4">
          {/* Supplier health */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
            className="glass-card rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <Truck size={16} style={{ color: "var(--teal-light)" }} />
              <h3 className="font-display font-semibold text-white text-sm">Supplier Health</h3>
            </div>
            {loading ? (
              <div className="space-y-2"><div className="skeleton h-6 rounded" /><div className="skeleton h-6 rounded" /></div>
            ) : (
              <div className="space-y-2">
                {(summary?.suppliers.distribution ?? []).map((s: any) => (
                  <div key={s._id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{
                        background: s._id === "green" ? "#00FF94" : s._id === "amber" ? "#facc15" : "#f87171"
                      }} />
                      <span className="text-sm capitalize" style={{ color: "var(--text-secondary)" }}>{s._id}</span>
                    </div>
                    <span className="font-mono text-sm font-semibold text-white">{s.count}</span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Top performers */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="glass-card rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <Users size={16} style={{ color: "var(--accent-green)" }} />
              <h3 className="font-display font-semibold text-white text-sm">Top ESG Performers</h3>
            </div>
            {loading ? (
              <div className="space-y-3">{Array.from({ length: 3 }).map((_, i) => <div key={i} className="skeleton h-8 rounded-lg" />)}</div>
            ) : (
              <div className="space-y-2">
                {(summary?.employees.topPerformers ?? []).slice(0, 4).map((emp: any, idx: number) => (
                  <div key={emp._id} className="flex items-center gap-3 px-2 py-1.5 rounded-lg hover:bg-[var(--surface-elevated)] transition-colors">
                    <span className="font-mono text-xs w-4 flex-shrink-0" style={{ color: "var(--text-muted)" }}>#{idx + 1}</span>
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center font-display font-bold text-xs flex-shrink-0"
                      style={{ background: "var(--surface-border)", color: "var(--text-primary)" }}>
                      {emp.user?.firstName?.[0]}{emp.user?.lastName?.[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-white truncate">
                        {emp.user?.firstName} {emp.user?.lastName}
                      </p>
                    </div>
                    <span className="font-mono text-xs" style={{ color: "var(--accent-green)" }}>
                      {emp.sustainabilityPoints}pts
                    </span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
        className="mt-16 pt-8 border-t text-center border-surface-border"
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted">
          YesYouCan Cyber Secure • © 2025<br />
          Enterprise-grade governance, sustainability, and cybersecurity.
        </p>
      </motion.footer>
    </div>
  );
}
