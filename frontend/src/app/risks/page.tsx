"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, AlertTriangle, Filter, Search, X, ChevronRight } from "lucide-react";
import api from "../../lib/api";
import { SectionHeader, Badge, CardSkeleton, EmptyState } from "../../components/ui/index";
import { riskLevel, formatDate, STATUS_COLORS } from "../../lib/utils";
import toast from "react-hot-toast";

const CATEGORIES = ["cybersecurity","operational","financial","compliance","strategic","environmental","reputational","third_party"];
const STATUSES = ["open","in_progress","mitigated","accepted","closed"];
const STRATEGIES = ["mitigate","accept","transfer","avoid"];

function RiskModal({ risk, onClose, onSave }: { risk: any; onClose: () => void; onSave: (data: any) => void }) {
  const [form, setForm] = useState(risk || {
    title: "", description: "", category: "cybersecurity", likelihood: 3,
    impact: 3, treatmentStrategy: "mitigate", treatmentPlan: "", status: "open",
  });
  const [saving, setSaving] = useState(false);

  const upd = (field: string) => (e: React.ChangeEvent<any>) =>
    setForm((p: any) => ({ ...p, [field]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onSave(form);
      onClose();
    } finally { setSaving(false); }
  };

  const score = form.likelihood * form.impact;
  const rl = riskLevel(score);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl"
        style={{ background: "var(--surface-card)", border: "1px solid var(--surface-border)" }}>
        <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: "var(--surface-border)" }}>
          <h2 className="font-display font-bold text-lg text-white">{risk ? "Edit Risk" : "New Risk"}</h2>
          <button onClick={onClose} className="p-1 rounded-lg transition-colors hover:bg-[var(--surface-elevated)]"
            style={{ color: "var(--text-muted)" }}><X size={18} /></button>
        </div>
        <form onSubmit={submit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          <div>
            <label className="block font-mono text-xs mb-1.5" style={{ color: "var(--text-muted)" }}>TITLE</label>
            <input value={form.title} onChange={upd("title")} className="input-field" placeholder="Risk title" required />
          </div>
          <div>
            <label className="block font-mono text-xs mb-1.5" style={{ color: "var(--text-muted)" }}>DESCRIPTION</label>
            <textarea value={form.description} onChange={upd("description")}
              className="input-field min-h-[80px] resize-none" placeholder="Describe the risk..." required />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-mono text-xs mb-1.5" style={{ color: "var(--text-muted)" }}>CATEGORY</label>
              <select value={form.category} onChange={upd("category")} className="input-field">
                {CATEGORIES.map((c) => <option key={c} value={c}>{c.replace("_", " ")}</option>)}
              </select>
            </div>
            <div>
              <label className="block font-mono text-xs mb-1.5" style={{ color: "var(--text-muted)" }}>STATUS</label>
              <select value={form.status} onChange={upd("status")} className="input-field">
                {STATUSES.map((s) => <option key={s} value={s}>{s.replace("_", " ")}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-mono text-xs mb-1.5" style={{ color: "var(--text-muted)" }}>
                LIKELIHOOD (1–5): <span style={{ color: "var(--accent-green)" }}>{form.likelihood}</span>
              </label>
              <input type="range" min={1} max={5} value={form.likelihood} onChange={upd("likelihood")}
                className="w-full accent-green-500" style={{ accentColor: "var(--accent-green)" }} />
            </div>
            <div>
              <label className="block font-mono text-xs mb-1.5" style={{ color: "var(--text-muted)" }}>
                IMPACT (1–5): <span style={{ color: rl.color }}>{form.impact}</span>
              </label>
              <input type="range" min={1} max={5} value={form.impact} onChange={upd("impact")}
                className="w-full" style={{ accentColor: rl.color }} />
            </div>
          </div>
          {/* Risk score preview */}
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl" style={{ background: `${rl.color}10`, border: `1px solid ${rl.color}30` }}>
            <AlertTriangle size={16} style={{ color: rl.color }} />
            <span className="font-mono text-sm" style={{ color: rl.color }}>
              Risk Score: {score} — {rl.label}
            </span>
          </div>
          <div>
            <label className="block font-mono text-xs mb-1.5" style={{ color: "var(--text-muted)" }}>TREATMENT STRATEGY</label>
            <select value={form.treatmentStrategy} onChange={upd("treatmentStrategy")} className="input-field">
              {STRATEGIES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="block font-mono text-xs mb-1.5" style={{ color: "var(--text-muted)" }}>TREATMENT PLAN</label>
            <textarea value={form.treatmentPlan} onChange={upd("treatmentPlan")}
              className="input-field min-h-[60px] resize-none" placeholder="Describe the mitigation plan..." />
          </div>
          <button type="submit" disabled={saving}
            className="w-full py-3 rounded-xl font-display font-semibold text-sm transition-all btn-vibrant"
            style={{ opacity: saving ? 0.6 : 1 }}>
            {saving ? "Saving…" : risk ? "Update Risk" : "Create Risk"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}

export default function RisksPage() {
  const [risks, setRisks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [modal, setModal] = useState<{ open: boolean; risk: any | null }>({ open: false, risk: null });
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchRisks = async () => {
    setLoading(true);
    try {
      const params: any = { page, limit: 15 };
      if (statusFilter) params.status = statusFilter;
      if (categoryFilter) params.category = categoryFilter;
      const { data } = await api.get("/risks", { params });
      setRisks(data.data);
      setTotal(data.pagination.total);
    } catch { toast.error("Failed to load risks"); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchRisks(); }, [page, statusFilter, categoryFilter]);

  const handleSave = async (form: any) => {
    try {
      if (modal.risk) {
        const { data } = await api.put(`/risks/${modal.risk._id}`, form);
        setRisks((prev) => prev.map((r) => r._id === modal.risk._id ? data.data : r));
        toast.success("Risk updated");
      } else {
        const { data } = await api.post("/risks", form);
        setRisks((prev) => [data.data, ...prev]);
        setTotal((t) => t + 1);
        toast.success("Risk created");
      }
    } catch (err: any) { toast.error(err?.response?.data?.message || "Save failed"); throw err; }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this risk?")) return;
    try {
      await api.delete(`/risks/${id}`);
      setRisks((prev) => prev.filter((r) => r._id !== id));
      toast.success("Risk deleted");
    } catch { toast.error("Delete failed"); }
  };

  const filtered = risks.filter((r) =>
    !search || r.title.toLowerCase().includes(search.toLowerCase()) ||
    r.description?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-5 md:p-7 max-w-[1400px] mx-auto">
      <SectionHeader
        title="Risk Register"
        subtitle={`${total} risks tracked across all categories`}
        action={
          <button onClick={() => setModal({ open: true, risk: null })}
            className="flex items-center gap-2 px-4 py-2 rounded-xl font-display font-semibold text-sm transition-all btn-vibrant">
            <Plus size={15} /> New Risk
          </button>
        }
      />

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-5">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
          <input value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search risks…" className="input-field pl-9 py-2 text-sm" />
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
          className="input-field py-2 text-sm" style={{ width: "auto", minWidth: 140 }}>
          <option value="">All Statuses</option>
          {STATUSES.map((s) => <option key={s} value={s}>{s.replace("_", " ")}</option>)}
        </select>
        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}
          className="input-field py-2 text-sm" style={{ width: "auto", minWidth: 160 }}>
          <option value="">All Categories</option>
          {CATEGORIES.map((c) => <option key={c} value={c}>{c.replace("_", " ")}</option>)}
        </select>
        {(statusFilter || categoryFilter) && (
          <button onClick={() => { setStatusFilter(""); setCategoryFilter(""); }}
            className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm"
            style={{ background: "var(--surface-elevated)", color: "var(--text-secondary)" }}>
            <X size={13} /> Clear
          </button>
        )}
      </div>

      {/* Table */}
      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--surface-border)", background: "var(--surface-elevated)" }}>
                {["Risk", "Category", "Score", "Status", "Treatment", "Due Date", "Actions"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left font-mono text-xs uppercase"
                    style={{ color: "var(--text-muted)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <tr key={i} className="border-b" style={{ borderColor: "var(--surface-border)" }}>
                    {Array.from({ length: 7 }).map((_, j) => (
                      <td key={j} className="px-4 py-3"><div className="skeleton h-4 rounded w-full" /></td>
                    ))}
                  </tr>
                ))
              ) : filtered.length === 0 ? (
                <tr><td colSpan={7} className="py-16 text-center" style={{ color: "var(--text-muted)" }}>
                  No risks found
                </td></tr>
              ) : (
                filtered.map((risk, i) => {
                  const rl = riskLevel(risk.riskScore);
                  return (
                    <motion.tr key={risk._id}
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                      className="border-b transition-colors hover:bg-[var(--surface-elevated)] cursor-pointer"
                      style={{ borderColor: "var(--surface-border)" }}>
                      <td className="px-4 py-3">
                        <div className="font-semibold text-sm text-white max-w-[200px] truncate">{risk.title}</div>
                        {risk.owner && (
                          <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                            {risk.owner.firstName} {risk.owner.lastName}
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <Badge label={risk.category?.replace("_", " ")} variant="ghost" />
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg flex items-center justify-center font-display font-bold text-sm"
                            style={{ background: rl.bg, color: rl.color }}>
                            {risk.riskScore}
                          </div>
                          <span className="font-mono text-xs" style={{ color: rl.color }}>{rl.label}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="font-mono text-xs px-2 py-1 rounded-md capitalize"
                          style={{ background: (STATUS_COLORS[risk.status] || "#94a3b8") + "18",
                            color: STATUS_COLORS[risk.status] || "#94a3b8",
                            border: `1px solid ${(STATUS_COLORS[risk.status] || "#94a3b8")}30` }}>
                          {risk.status?.replace("_", " ")}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="font-mono text-xs capitalize" style={{ color: "var(--text-secondary)" }}>
                          {risk.treatmentStrategy}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-mono text-xs" style={{ color: "var(--text-muted)" }}>
                        {risk.dueDate ? formatDate(risk.dueDate) : "—"}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button onClick={() => setModal({ open: true, risk })}
                            className="px-2 py-1 rounded-lg text-xs font-medium transition-colors hover:bg-[var(--surface-border)]"
                            style={{ color: "var(--text-secondary)" }}>Edit</button>
                          <button onClick={() => handleDelete(risk._id)}
                            className="px-2 py-1 rounded-lg text-xs font-medium transition-colors"
                            style={{ color: "#f87171" }}>Delete</button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {total > 15 && (
          <div className="flex items-center justify-between px-4 py-3 border-t" style={{ borderColor: "var(--surface-border)" }}>
            <span className="font-mono text-xs" style={{ color: "var(--text-muted)" }}>
              {((page - 1) * 15) + 1}–{Math.min(page * 15, total)} of {total}
            </span>
            <div className="flex gap-2">
              <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
                className="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors disabled:opacity-30"
                style={{ background: "var(--surface-elevated)", color: "var(--text-secondary)" }}>Previous</button>
              <button onClick={() => setPage((p) => p + 1)} disabled={page * 15 >= total}
                className="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors disabled:opacity-30"
                style={{ background: "var(--surface-elevated)", color: "var(--text-secondary)" }}>Next</button>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modal.open && (
          <RiskModal risk={modal.risk} onClose={() => setModal({ open: false, risk: null })} onSave={handleSave} />
        )}
      </AnimatePresence>
    </div>
  );
}
