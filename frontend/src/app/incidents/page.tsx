"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Zap, X, AlertTriangle, Shield, Activity, Search } from "lucide-react";
import api from "../../lib/api";
import { SectionHeader, KPICard, Badge } from "../../components/ui/index";
import { formatDate, STATUS_COLORS } from "../../lib/utils";
import toast from "react-hot-toast";

const TYPES = ["data_breach","malware","phishing","unauthorized_access","ddos","insider_threat","physical","environmental","other"];
const SEVERITIES = ["critical","high","medium","low"];
const STATUSES = ["reported","investigating","contained","resolved","closed"];
const sc = (s: string) => s==="critical"?"#f87171":s==="high"?"#fb923c":s==="medium"?"#facc15":"#4ade80";

export default function IncidentsPage() {
  const [incidents, setIncidents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState<any>(null);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({ title:"", description:"", type:"phishing", severity:"medium", affectedSystems:"", dataBreachInvolved:false, regulatoryNotificationRequired:false });

  useEffect(() => {
    api.get("/incidents").then((r) => setIncidents(r.data.data))
      .catch(() => toast.error("Failed")).finally(() => setLoading(false));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = { ...form, affectedSystems: form.affectedSystems.split(",").map(s=>s.trim()).filter(Boolean) };
      const { data } = await api.post("/incidents", payload);
      setIncidents(p=>[data.data,...p]); setShowModal(false); toast.success("Incident reported");
    } catch (err: any) { toast.error(err?.response?.data?.message||"Failed"); }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const { data } = await api.put(`/incidents/${id}`, { status });
      setIncidents(p=>p.map(i=>i._id===id?data.data:i));
      if (selected?._id===id) setSelected(data.data);
      toast.success("Updated");
    } catch { toast.error("Failed"); }
  };

  const upd = (f: string) => (e: React.ChangeEvent<any>) => setForm(p=>({...p,[f]:e.target.type==="checkbox"?e.target.checked:e.target.value}));

  const filtered = incidents.filter(i => 
    i.title.toLowerCase().includes(search.toLowerCase()) || 
    i.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-5 md:p-7 max-w-[1400px] mx-auto">
      <SectionHeader title="Incident Management" subtitle="Security and operational incident tracking"
        action={<button onClick={()=>setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl font-display font-semibold text-sm btn-vibrant">
          <Plus size={15}/> Report Incident</button>}/>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <KPICard label="Active Incidents" value={incidents.filter(i=>!["resolved","closed"].includes(i.status)).length} icon={<Zap size={16}/>} color="#f87171"/>
        <KPICard label="High Severity" value={incidents.filter(i=>["critical","high"].includes(i.severity)).length} icon={<Shield size={16}/>} color="#fb923c" delay={0.06}/>
        <KPICard label="Resolved (30d)" value={incidents.filter(i=>i.status==="resolved").length} icon={<Zap size={16}/>} color="#4ade80" delay={0.12}/>
        <KPICard label="System Health" value="99.9%" icon={<Activity size={16}/>} color="#60a5fa" delay={0.18}/>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <input
              type="text"
              placeholder="Search incidents by title or type..."
              className="input-field pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="glass-card rounded-2xl p-6 h-24 animate-pulse bg-white/5" />
            ))
          ) : filtered.length === 0 ? (
            <div className="glass-card rounded-2xl p-12 text-center text-muted-foreground">No incidents tracked.</div>
          ) : (
            filtered.map((inc, i) => (
              <motion.div key={inc._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className={cn("glass-card rounded-2xl p-5 cursor-pointer border transition-all hover:border-[var(--accent-green)]", 
                  selected?._id === inc._id ? "bg-white/5 border-[var(--surface-border-2)]" : "bg-transparent border-[var(--surface-border)]"
                )}
                onClick={() => setSelected(inc)}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge label={inc.type?.replace("_", " ")} variant="ghost" />
                      <span className="font-mono text-[10px] px-1.5 py-0.5 rounded uppercase" 
                        style={{ background: `${sc(inc.severity)}18`, color: sc(inc.severity) }}>{inc.severity}</span>
                    </div>
                    <h3 className="font-display font-semibold text-white">{inc.title}</h3>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-xs text-muted-foreground mb-1">{formatDate(inc.createdAt)}</div>
                    <span className="font-mono text-[10px] uppercase" style={{ color: STATUS_COLORS[inc.status] || "var(--text-muted)" }}>{inc.status}</span>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        <div className="glass-card rounded-2xl p-6 h-fit sticky top-24">
          {selected ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-lg text-white">Incident Details</h3>
                <button onClick={() => setSelected(null)} className="text-muted-foreground hover:text-white transition-colors"><X size={18} /></button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="label block mb-1">DESCRIPTION</label>
                  <p className="text-sm text-secondary leading-relaxed">{selected.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="label block mb-1">IMPACTED SYSTEMS</label>
                    <div className="flex flex-wrap gap-1">
                      {selected.affectedSystems?.map((s: string) => <Badge key={s} label={s} variant="ghost" />) || "—"}
                    </div>
                  </div>
                  <div>
                    <label className="label block mb-1">STATUS</label>
                    <select value={selected.status} onChange={(e) => updateStatus(selected._id, e.target.value)}
                      className="input-field py-1 h-auto text-xs font-mono uppercase" style={{ color: STATUS_COLORS[selected.status] }}>
                      {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>

                <div className="flex gap-4 p-4 rounded-xl border border-[var(--surface-border)] bg-black/20">
                  <div className="flex-1">
                    <div className="text-[10px] font-mono opacity-50 mb-1">BREACH INVOLVED</div>
                    <div className={selected.dataBreachInvolved ? "text-red-400 font-bold" : "text-green-400"}>{selected.dataBreachInvolved ? "YES" : "NO"}</div>
                  </div>
                  <div className="flex-1">
                    <div className="text-[10px] font-mono opacity-50 mb-1">REGULATORY NOTIF.</div>
                    <div className={selected.regulatoryNotificationRequired ? "text-orange-400 font-bold" : "text-muted-foreground"}>{selected.regulatoryNotificationRequired ? "REQUIRED" : "NOT REQUIRED"}</div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="py-12 text-center">
              <Zap className="mx-auto mb-4 text-muted-foreground" size={32} />
              <p className="text-sm text-muted-foreground">Select an incident to view full triage details and management controls.</p>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowModal(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg glass-card rounded-2xl overflow-hidden shadow-2xl">
              <div className="px-6 py-4 border-b border-[var(--surface-border)] flex items-center justify-between">
                <h2 className="font-display font-bold text-lg text-white">Report New Incident</h2>
                <button onClick={() => setShowModal(false)} className="text-muted-foreground hover:text-white transition-colors"><X size={18} /></button>
              </div>
              <form onSubmit={handleSave} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto custom-scrollbar">
                <div>
                  <label className="label block mb-1.5">TITLE</label>
                  <input value={form.title} onChange={upd("title")} className="input-field" placeholder="Brief technical title" required />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="label block mb-1.5">TYPE</label>
                    <select value={form.type} onChange={upd("type")} className="input-field">
                      {TYPES.map(t => <option key={t} value={t}>{t.replace("_", " ")}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="label block mb-1.5">SEVERITY</label>
                    <select value={form.severity} onChange={upd("severity")} className="input-field">
                      {SEVERITIES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="label block mb-1.5">DESCRIPTION / TRIAGE NOTES</label>
                  <textarea value={form.description} onChange={upd("description")} className="input-field min-h-[100px] resize-none" placeholder="Provide technical details, symptoms, and initial observations..." required />
                </div>
                <div>
                  <label className="label block mb-1.5">AFFECTED SYSTEMS (comma separated)</label>
                  <input value={form.affectedSystems} onChange={upd("affectedSystems")} className="input-field" placeholder="e.g. AWS-DB-01, API-GW-PROD" />
                </div>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input type="checkbox" checked={form.dataBreachInvolved} onChange={upd("dataBreachInvolved")} className="hidden" />
                    <div className={`w-4 h-4 rounded border transition-colors flex items-center justify-center ${form.dataBreachInvolved ? "bg-red-500 border-red-500" : "border-muted-foreground group-hover:border-[var(--accent-green)]"}`}>
                      {form.dataBreachInvolved && <X size={10} className="text-white transform rotate-45" />}
                    </div>
                    <span className="font-mono text-[10px] uppercase text-muted-foreground">Data breach involved</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input type="checkbox" checked={form.regulatoryNotificationRequired} onChange={upd("regulatoryNotificationRequired")} className="hidden" />
                    <div className={`w-4 h-4 rounded border transition-colors flex items-center justify-center ${form.regulatoryNotificationRequired ? "bg-orange-500 border-orange-500" : "border-muted-foreground group-hover:border-[var(--accent-green)]"}`}>
                      {form.regulatoryNotificationRequired && <X size={10} className="text-white transform rotate-45" />}
                    </div>
                    <span className="font-mono text-[10px] uppercase text-muted-foreground">Regulatory notification</span>
                  </label>
                </div>
                <button type="submit" className="w-full py-3 mt-2 rounded-xl font-display font-semibold text-sm btn-vibrant">Initialize Report</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Helper utility (should ideally be in lib/utils.ts but putting here for self-containment in fix)
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
