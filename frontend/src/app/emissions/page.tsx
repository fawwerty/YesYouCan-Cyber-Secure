"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Plus, Leaf, X } from "lucide-react";
import api from "../../lib/api";
import { SectionHeader, KPICard, Badge } from "../../components/ui/index";
import EmissionsTrendChart from "../../components/charts/EmissionsTrend";
import { formatCO2, formatDate } from "../../lib/utils";
import toast from "react-hot-toast";

const SCOPES = ["scope1", "scope2", "scope3"];
const SCOPE_LABELS: Record<string, string> = { scope1: "Scope 1 — Direct", scope2: "Scope 2 — Indirect (Energy)", scope3: "Scope 3 — Value Chain" };

export default function EmissionsPage() {
  const [emissions, setEmissions] = useState<any[]>([]);
  const [summary, setSummary] = useState<any>(null);
  const [trend, setTrend] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    scope: "scope2", category: "Purchased Electricity", source: "Grid Power",
    facility: "Head Office", quantity: "", unit: "kWh", emissionFactor: 0.215,
    co2Equivalent: "", period: { year: new Date().getFullYear(), month: new Date().getMonth() + 1 },
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [emRes, sumRes, trendRes] = await Promise.all([
        api.get("/emissions?limit=50"),
        api.get(`/emissions/summary?year=${new Date().getFullYear()}`),
        api.get(`/dashboard/emissions-trend?year=${new Date().getFullYear()}`),
      ]);
      setEmissions(emRes.data.data);
      setSummary(sumRes.data.data);
      setTrend(trendRes.data.data);
    } catch { toast.error("Failed to load emissions"); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = { ...form, quantity: Number(form.quantity), co2Equivalent: Number(form.quantity) * form.emissionFactor / 1000 };
      const { data } = await api.post("/emissions", payload);
      setEmissions((p) => [data.data, ...p]);
      setShowModal(false);
      toast.success("Emission record added");
    } catch (err: any) { toast.error(err?.response?.data?.message || "Failed to save"); }
  };

  const scopeTotals = summary?.byScope || [];
  const getScope = (sc: string) => scopeTotals.find((s: any) => s._id === sc)?.totalCO2 || 0;

  return (
    <div className="p-5 md:p-7 max-w-[1400px] mx-auto">
      <SectionHeader
        title="Carbon Emissions"
        subtitle="Track Scope 1, 2 & 3 emissions across your operations"
        action={
          <button onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl font-display font-semibold text-sm"
            style={{ background: "linear-gradient(135deg,#0D7377,#00CC77)", color: "#0A0F1E" }}>
            <Plus size={15} /> Log Emission
          </button>
        }
      />

      {/* KPIs */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <KPICard label="Scope 1 Emissions" value={getScope("scope1")} formatter={formatCO2} icon={<Leaf size={16} />} color="#fb923c" delay={0} />
        <KPICard label="Scope 2 Emissions" value={getScope("scope2")} formatter={formatCO2} icon={<Leaf size={16} />} color="#60a5fa" delay={0.06} />
        <KPICard label="Scope 3 Emissions" value={getScope("scope3")} formatter={formatCO2} icon={<Leaf size={16} />} color="#00FF94" delay={0.12} />
      </div>

      {/* Trend chart */}
      <div className="glass-card rounded-2xl p-5 mb-6">
        <h3 className="font-display font-semibold text-white mb-4">Monthly Emissions Trend</h3>
        {loading ? <div className="h-64 skeleton rounded-xl" /> : <EmissionsTrendChart data={trend} />}
      </div>

      {/* Table */}
      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b flex items-center justify-between" style={{ borderColor: "var(--surface-border)" }}>
          <h3 className="font-display font-semibold text-white">Emission Records</h3>
          <span className="font-mono text-xs" style={{ color: "var(--text-muted)" }}>{emissions.length} records</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--surface-border)", background: "var(--surface-elevated)" }}>
                {["Scope", "Category", "Source", "Facility", "Period", "Quantity", "CO₂e (t)", "Verified"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left font-mono text-xs uppercase" style={{ color: "var(--text-muted)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? Array.from({ length: 5 }).map((_, i) => (
                <tr key={i}><td colSpan={8} className="px-4 py-3"><div className="skeleton h-4 rounded" /></td></tr>
              )) : emissions.map((e, i) => (
                <motion.tr key={e._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.02 }}
                  className="border-b hover:bg-[var(--surface-elevated)] transition-colors"
                  style={{ borderColor: "var(--surface-border)" }}>
                  <td className="px-4 py-3">
                    <span className="font-mono text-xs px-2 py-1 rounded-md"
                      style={{
                        background: e.scope === "scope1" ? "rgba(251,146,60,0.12)" : e.scope === "scope2" ? "rgba(96,165,250,0.12)" : "rgba(0,255,148,0.08)",
                        color: e.scope === "scope1" ? "#fb923c" : e.scope === "scope2" ? "#60a5fa" : "#00FF94",
                      }}>
                      {e.scope?.toUpperCase().replace("SCOPE", "S")}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm" style={{ color: "var(--text-secondary)" }}>{e.category}</td>
                  <td className="px-4 py-3 text-sm" style={{ color: "var(--text-secondary)" }}>{e.source}</td>
                  <td className="px-4 py-3 text-sm" style={{ color: "var(--text-muted)" }}>{e.facility || "—"}</td>
                  <td className="px-4 py-3 font-mono text-xs" style={{ color: "var(--text-muted)" }}>
                    {e.period?.year}/{String(e.period?.month).padStart(2, "0")}
                  </td>
                  <td className="px-4 py-3 font-mono text-sm text-white">{e.quantity?.toFixed(0)} {e.unit}</td>
                  <td className="px-4 py-3 font-mono text-sm" style={{ color: "var(--accent-green)" }}>
                    {e.co2Equivalent?.toFixed(2)}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`font-mono text-xs ${e.verified ? "text-green-400" : "text-yellow-400"}`}>
                      {e.verified ? "✓ Yes" : "Pending"}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="relative w-full max-w-md rounded-2xl overflow-hidden shadow-2xl"
            style={{ background: "var(--surface-card)", border: "1px solid var(--surface-border)" }}>
            <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: "var(--surface-border)" }}>
              <h2 className="font-display font-bold text-lg text-white">Log Emission Record</h2>
              <button onClick={() => setShowModal(false)} style={{ color: "var(--text-muted)" }}><X size={18} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-xs mb-1.5" style={{ color: "var(--text-muted)" }}>SCOPE</label>
                  <select value={form.scope} onChange={(e) => setForm((p) => ({ ...p, scope: e.target.value }))} className="input-field">
                    {SCOPES.map((s) => <option key={s} value={s}>{s.replace("scope", "Scope ")}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block font-mono text-xs mb-1.5" style={{ color: "var(--text-muted)" }}>UNIT</label>
                  <select value={form.unit} onChange={(e) => setForm((p) => ({ ...p, unit: e.target.value }))} className="input-field">
                    {["kWh","MWh","litres","m3","kg","km","GHS"].map((u) => <option key={u} value={u}>{u}</option>)}
                  </select>
                </div>
              </div>
              {[
                { label: "CATEGORY", key: "category", placeholder: "e.g. Purchased Electricity" },
                { label: "SOURCE", key: "source", placeholder: "e.g. Grid Power" },
                { label: "FACILITY", key: "facility", placeholder: "e.g. Head Office" },
              ].map(({ label, key, placeholder }) => (
                <div key={key}>
                  <label className="block font-mono text-xs mb-1.5" style={{ color: "var(--text-muted)" }}>{label}</label>
                  <input value={(form as any)[key]} onChange={(e) => setForm((p: any) => ({ ...p, [key]: e.target.value }))}
                    className="input-field" placeholder={placeholder} />
                </div>
              ))}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-xs mb-1.5" style={{ color: "var(--text-muted)" }}>QUANTITY</label>
                  <input type="number" value={form.quantity} onChange={(e) => setForm((p) => ({ ...p, quantity: e.target.value }))}
                    className="input-field" placeholder="0" required />
                </div>
                <div>
                  <label className="block font-mono text-xs mb-1.5" style={{ color: "var(--text-muted)" }}>EMISSION FACTOR</label>
                  <input type="number" step="0.001" value={form.emissionFactor}
                    onChange={(e) => setForm((p) => ({ ...p, emissionFactor: parseFloat(e.target.value) }))}
                    className="input-field" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-xs mb-1.5" style={{ color: "var(--text-muted)" }}>YEAR</label>
                  <input type="number" value={form.period.year}
                    onChange={(e) => setForm((p) => ({ ...p, period: { ...p.period, year: parseInt(e.target.value) } }))}
                    className="input-field" />
                </div>
                <div>
                  <label className="block font-mono text-xs mb-1.5" style={{ color: "var(--text-muted)" }}>MONTH</label>
                  <input type="number" min={1} max={12} value={form.period.month}
                    onChange={(e) => setForm((p) => ({ ...p, period: { ...p.period, month: parseInt(e.target.value) } }))}
                    className="input-field" />
                </div>
              </div>
              <button type="submit" className="w-full py-3 rounded-xl font-display font-semibold text-sm"
                style={{ background: "linear-gradient(135deg,#0D7377,#00CC77)", color: "#0A0F1E" }}>
                Save Record
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
