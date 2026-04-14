"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Zap, X, AlertTriangle } from "lucide-react";
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

  return (
    <div className="p-5 md:p-7 max-w-[1400px] mx-auto">
      <SectionHeader title="Incident Management" subtitle="Security and operational incident tracking"
        action={<button onClick={()=>setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl font-display font-semibold text-sm"
          style={{background:"linear-gradient(135deg,#0D7377,#00CC77)",color:"#0A0F1E"}}>
          <Plus size={15}/> Report Incident</button>}/>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <KPICard label="Total" value={incidents.length} icon={<Zap size={16}/>} color="#60a5fa"/>
        <KPICard label="Open" value={incidents.filter(i=>["reported","investigating"].includes(i.status)).length} icon={<Zap size={16}/>} color="#fb923c" delay={0.06}/>
        <KPICard label="Critical" value={incidents.filter(i=>i.severity==="critical").length} icon={<AlertTriangle size={16}/>} color="#f87171" delay={0.12}/>
        <KPICard label="Resolved" value={incidents.filter(i=>["resolved","closed"].includes(i.status)).length} icon={<Zap size={16}/>} color="#00FF94" delay={0.18}/>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 glass-card rounded-2xl overflow-hidden">
          <div className="overflow-x-auto"><table className="w-full">
            <thead><tr style={{borderBottom:"1px solid var(--surface-border)",background:"var(--surface-elevated)"}}>
              {["Incident","Severity","Status","Date","Action"].map(h=>(
                <th key={h} className="px-4 py-3 text-left font-mono text-xs uppercase" style={{color:"var(--text-muted)"}}>{h}</th>
              ))}</tr></thead>
            <tbody>{loading?Array.from({length:4}).map((_,i)=>(
              <tr key={i}><td colSpan={5} className="px-4 py-3"><div className="skeleton h-4 rounded"/></td></tr>
            )):incidents.map((inc,i)=>(
              <motion.tr key={inc._id} initial={{opacity:0}} animate={{opacity:1}} transition={{delay:i*0.04}}
                className="border-b hover:bg-[var(--surface-elevated)] cursor-pointer transition-colors"
                style={{borderColor:"var(--surface-border)"}} onClick={()=>setSelected(inc)}>
                <td className="px-4 py-3">
                  <div className="font-semibold text-sm text-white max-w-[200px] truncate">{inc.title}</div>
                  {inc.dataBreachInvolved&&<span className="font-mono text-xs" style={{color:"#f87171"}}>⚠ Data Breach</span>}
                </td>
                <td className="px-4 py-3">
                  <span className="font-mono text-xs px-2 py-1 rounded-md capitalize"
                    style={{background:`${sc(inc.severity)}15`,color:sc(inc.severity),border:`1px solid ${sc(inc.severity)}30`}}>{inc.severity}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="font-mono text-xs px-2 py-1 rounded-md capitalize"
                    style={{background:`${STATUS_COLORS[inc.status]||"#94a3b8"}18`,color:STATUS_COLORS[inc.status]||"#94a3b8"}}>
                    {inc.status?.replace("_"," ")}
                  </span>
                </td>
                <td className="px-4 py-3 font-mono text-xs" style={{color:"var(--text-muted)"}}>{formatDate(inc.createdAt)}</td>
                <td className="px-4 py-3">
                  <select value={inc.status}
                    onChange={e=>{e.stopPropagation();updateStatus(inc._id,e.target.value);}}
                    onClick={e=>e.stopPropagation()}
                    className="font-mono text-xs px-2 py-1 rounded-md bg-transparent border outline-none cursor-pointer"
                    style={{borderColor:"var(--surface-border)",color:"var(--text-secondary)"}}>
                    {STATUSES.map(s=><option key={s} value={s} style={{background:"#1e2a40"}}>{s.replace("_"," ")}</option>)}
                  </select>
                </td>
              </motion.tr>
            ))}</tbody>
          </table></div>
        </div>
        <div className="glass-card rounded-2xl p-5">
          {selected ? (
            <div>
              <div className="flex items-start justify-between mb-4">
                <h3 className="font-display font-semibold text-white text-sm leading-snug pr-2">{selected.title}</h3>
                <button onClick={()=>setSelected(null)} style={{color:"var(--text-muted)"}}><X size={16}/></button>
              </div>
              <div className="space-y-3">
                <div className="flex gap-2 flex-wrap">
                  <span className="font-mono text-xs px-2 py-1 rounded-md capitalize"
                    style={{background:`${sc(selected.severity)}15`,color:sc(selected.severity)}}>{selected.severity}</span>
                  <Badge label={selected.type?.replace("_"," ")} variant="ghost"/>
                </div>
                <p className="text-sm" style={{color:"var(--text-secondary)"}}>{selected.description}</p>
                {selected.affectedSystems?.length>0&&(
                  <div>
                    <p className="font-mono text-xs mb-2" style={{color:"var(--text-muted)"}}>AFFECTED SYSTEMS</p>
                    <div className="flex flex-wrap gap-1.5">{selected.affectedSystems.map((sys: string)=>(
                      <Badge key={sys} label={sys} variant="ghost"/>
                    ))}</div>
                  </div>
                )}
                {selected.regulatoryNotificationRequired&&(
                  <div className="p-3 rounded-xl" style={{background:"rgba(248,113,113,0.08)",border:"1px solid rgba(248,113,113,0.2)"}}>
                    <p className="font-mono text-xs" style={{color:"#f87171"}}>⚠ Regulatory notification required</p>
                    {selected.regulatoryNotificationDeadline&&(
                      <p className="font-mono text-xs mt-1" style={{color:"var(--text-muted)"}}>Deadline: {formatDate(selected.regulatoryNotificationDeadline)}</p>
                    )}
                  </div>
                )}
                {selected.rootCause&&(
                  <div>
                    <p className="font-mono text-xs mb-1" style={{color:"var(--text-muted)"}}>ROOT CAUSE</p>
                    <p className="text-sm" style={{color:"var(--text-secondary)"}}>{selected.rootCause}</p>
                  </div>
                )}
              </div>
            </div>
          ):(
            <div className="flex items-center justify-center py-16 text-center">
              <div><Zap size={28} className="mx-auto mb-3" style={{color:"var(--text-muted)"}}/>
                <p className="text-sm" style={{color:"var(--text-muted)"}}>Select an incident to view details</p></div>
            </div>
          )}
        </div>
      </div>
      <AnimatePresence>
        {showModal&&(
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={()=>setShowModal(false)}/>
            <motion.div initial={{opacity:0,scale:0.95,y:20}} animate={{opacity:1,scale:1,y:0}} exit={{opacity:0,scale:0.95}}
              className="relative w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden"
              style={{background:"var(--surface-card)",border:"1px solid var(--surface-border)"}}>
              <div className="flex items-center justify-between px-6 py-4 border-b" style={{borderColor:"var(--surface-border)"}}>
                <h2 className="font-display font-bold text-lg text-white">Report Incident</h2>
                <button onClick={()=>setShowModal(false)} style={{color:"var(--text-muted)"}}><X size={18}/></button>
              </div>
              <form onSubmit={handleSave} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                <div><label className="block font-mono text-xs mb-1.5" style={{color:"var(--text-muted)"}}>TITLE</label>
                  <input value={form.title} onChange={upd("title")} className="input-field" placeholder="Brief description" required/></div>
                <div><label className="block font-mono text-xs mb-1.5" style={{color:"var(--text-muted)"}}>DESCRIPTION</label>
                  <textarea value={form.description} onChange={upd("description")} className="input-field min-h-[70px] resize-none" placeholder="What happened?" required/></div>
                <div className="grid grid-cols-2 gap-3">
                  <div><label className="block font-mono text-xs mb-1.5" style={{color:"var(--text-muted)"}}>TYPE</label>
                    <select value={form.type} onChange={upd("type")} className="input-field">
                      {TYPES.map(t=><option key={t} value={t}>{t.replace("_"," ")}</option>)}
                    </select></div>
                  <div><label className="block font-mono text-xs mb-1.5" style={{color:"var(--text-muted)"}}>SEVERITY</label>
                    <select value={form.severity} onChange={upd("severity")} className="input-field">
                      {SEVERITIES.map(s=><option key={s} value={s}>{s}</option>)}
                    </select></div>
                </div>
                <div><label className="block font-mono text-xs mb-1.5" style={{color:"var(--text-muted)"}}>AFFECTED SYSTEMS (comma-separated)</label>
                  <input value={form.affectedSystems} onChange={upd("affectedSystems")} className="input-field" placeholder="Email, CRM"/></div>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={form.dataBreachInvolved} onChange={upd("dataBreachInvolved")} style={{accentColor:"var(--accent-green)"}}/>
                    <span className="font-mono text-xs" style={{color:"var(--text-secondary)"}}>Data breach</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={form.regulatoryNotificationRequired} onChange={upd("regulatoryNotificationRequired")} style={{accentColor:"var(--accent-green)"}}/>
                    <span className="font-mono text-xs" style={{color:"var(--text-secondary)"}}>Regulatory notification</span>
                  </label>
                </div>
                <button type="submit" className="w-full py-3 rounded-xl font-display font-semibold text-sm"
                  style={{background:"linear-gradient(135deg,#0D7377,#00CC77)",color:"#0A0F1E"}}>Report Incident</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
