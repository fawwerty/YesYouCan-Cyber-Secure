"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, ChevronDown, ChevronUp } from "lucide-react";
import api from "../../lib/api";
import { SectionHeader, CircularProgress, CardSkeleton } from "../../components/ui/index";
import ComplianceRadar from "../../components/charts/ComplianceRadar";
import { complianceColor, STATUS_COLORS } from "../../lib/utils";
import toast from "react-hot-toast";

export default function CompliancePage() {
  const [frameworks, setFrameworks] = useState<any[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/compliance")
      .then((r) => setFrameworks(r.data.data))
      .catch(() => toast.error("Failed to load"))
      .finally(() => setLoading(false));
  }, []);

  const updateControl = async (frameworkId: string, controlId: string, status: string) => {
    try {
      const { data } = await api.put(`/compliance/${frameworkId}/control`, { controlId, status });
      setFrameworks((prev) => prev.map((f) => f._id === frameworkId ? data.data : f));
      toast.success("Control updated");
    } catch { toast.error("Update failed"); }
  };

  const avgScore = frameworks.length ? Math.round(frameworks.reduce((s, f) => s + f.complianceScore, 0) / frameworks.length) : 0;

  return (
    <div className="p-5 md:p-7 max-w-[1400px] mx-auto">
      <SectionHeader title="Compliance" subtitle="Multi-framework control management" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-2xl p-5 flex items-center gap-5">
          <CircularProgress value={avgScore} size={80} color={complianceColor(avgScore)} label="OVERALL" />
          <div>
            <div className="font-display font-bold text-3xl text-white">{avgScore}%</div>
            <div className="font-mono text-xs mt-1" style={{ color: "var(--text-muted)" }}>Average Score</div>
            <div className="font-mono text-xs mt-1" style={{ color: "var(--accent-green)" }}>+35% improvement</div>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="glass-card rounded-2xl p-5 md:col-span-2">
          <h3 className="font-display font-semibold text-white mb-3 text-sm">Framework Radar</h3>
          {loading ? <div className="h-44 skeleton rounded-xl" /> : <ComplianceRadar data={frameworks} />}
        </motion.div>
      </div>
      <div className="space-y-4">
        {loading ? Array.from({ length: 3 }).map((_, i) => <div key={i} className="glass-card rounded-2xl p-5"><CardSkeleton /></div>)
          : frameworks.map((fw, i) => (
          <motion.div key={fw._id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
            className="glass-card rounded-2xl overflow-hidden">
            <div className="flex items-center gap-4 p-5 cursor-pointer"
              onClick={() => setExpanded(expanded === fw._id ? null : fw._id)}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: `${complianceColor(fw.complianceScore)}15` }}>
                <ShieldCheck size={18} style={{ color: complianceColor(fw.complianceScore) }} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="font-display font-semibold text-white">{fw.name}</span>
                  <span className="font-mono text-xs px-2 py-0.5 rounded-md" style={{ background: "var(--surface-elevated)", color: "var(--text-muted)" }}>
                    v{fw.version}
                  </span>
                </div>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex-1 max-w-xs h-1.5 rounded-full" style={{ background: "var(--surface-border)" }}>
                    <motion.div className="h-full rounded-full" initial={{ width: 0 }}
                      animate={{ width: `${fw.complianceScore}%` }} transition={{ duration: 1 }}
                      style={{ background: complianceColor(fw.complianceScore) }} />
                  </div>
                  <span className="font-display font-bold text-sm" style={{ color: complianceColor(fw.complianceScore) }}>
                    {fw.complianceScore}%
                  </span>
                </div>
              </div>
              {expanded === fw._id ? <ChevronUp size={16} style={{ color: "var(--text-muted)" }} /> : <ChevronDown size={16} style={{ color: "var(--text-muted)" }} />}
            </div>
            {expanded === fw._id && (
              <div className="border-t p-5" style={{ borderColor: "var(--surface-border)" }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {(fw.controls || []).map((ctrl: any) => (
                    <div key={ctrl.controlId} className="p-3 rounded-xl" style={{ background: "var(--surface-elevated)" }}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-xs" style={{ color: "var(--accent-green)" }}>{ctrl.controlId}</span>
                        <select value={ctrl.status}
                          onChange={(e) => updateControl(fw._id, ctrl.controlId, e.target.value)}
                          className="font-mono text-xs px-2 py-0.5 rounded-md bg-transparent border-0 outline-none cursor-pointer"
                          style={{ color: STATUS_COLORS[ctrl.status] || "#94a3b8" }}>
                          {["compliant","partial","non_compliant","not_applicable"].map((s) => (
                            <option key={s} value={s} style={{ background: "#1e2a40", color: "#F0F4FF" }}>{s.replace("_"," ")}</option>
                          ))}
                        </select>
                      </div>
                      <p className="text-xs" style={{ color: "var(--text-secondary)" }}>{ctrl.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
