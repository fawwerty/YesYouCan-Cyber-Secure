"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ClipboardList, Plus, X } from "lucide-react";
import api from "../../lib/api";
import { SectionHeader, KPICard, Badge } from "../../components/ui/index";
import { formatDate, STATUS_COLORS } from "../../lib/utils";
import toast from "react-hot-toast";

const STATUSES = ["planned","in_progress","completed","cancelled"];
const TYPES = ["internal","external","regulatory","supplier"];

export default function AuditPage() {
  const [audits, setAudits] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState<any>(null);
  const [form, setForm] = useState({title:"",type:"internal",framework:"",scope:"",startDate:"",endDate:""});

  useEffect(() => {
    api.get("/audits").then(r=>setAudits(r.data.data))
      .catch(()=>toast.error("Failed")).finally(()=>setLoading(false));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/audits", form);
      setAudits(p=>[data.data,...p]); setShowModal(false); toast.success("Audit created");
    } catch (err: any) { toast.error(err?.response?.data?.message||"Failed"); }
  };

  const upd = (f: string) => (e: React.ChangeEvent<any>) => setForm(p=>({...p,[f]:e.target.value}));
  const sc = (s: string) => STATUS_COLORS[s]||"#94a3b8";

  return (
    <div className="p-5 md:p-7 max-w-[1400px] mx-auto">
      <SectionHeader title="Audit Management" subtitle="Plan, track, and close audits"
        action={<button onClick={()=>setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl font-display font-semibold text-sm btn-vibrant">
          <Plus size={15}/> New Audit</button>}/>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <KPICard label="Total Audits" value={audits.length} icon={<ClipboardList size={16}/>} color="#60a5fa"/>
        <KPICard label="In Progress" value={audits.filter(a=>a.status==="in_progress").length} icon={<ClipboardList size={16}/>} color="#facc15" delay={0.06}/>
        <KPICard label="Completed" value={audits.filter(a=>a.status==="completed").length} icon={<ClipboardList size={16}/>} color="#00FF94" delay={0.12}/>
        <KPICard label="Planned" value={audits.filter(a=>a.status==="planned").length} icon={<ClipboardList size={16}/>} color="#a78bfa" delay={0.18}/>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-3">
          {loading?Array.from({length:3}).map((_,i)=>(
            <div key={i} className="glass-card rounded-2xl p-5"><div className="skeleton h-12 rounded-xl"/></div>
          )):audits.map((audit,i)=>(
            <motion.div key={audit._id} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:i*0.06}}
              className="glass-card rounded-2xl p-5 cursor-pointer hover:border-[var(--teal-primary)] transition-all"
              onClick={()=>setSelected(audit)}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="font-display font-semibold text-white mb-1">{audit.title}</div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge label={audit.type} variant="ghost"/>
                    {audit.framework&&<Badge label={audit.framework} variant="blue"/>}
                    <span className="font-mono text-xs px-2 py-1 rounded-md capitalize"
                      style={{background:`${sc(audit.status)}18`,color:sc(audit.status)}}>{audit.status?.replace("_"," ")}</span>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  {audit.startDate&&<div className="font-mono text-xs" style={{color:"var(--text-muted)"}}>{formatDate(audit.startDate)}</div>}
                  {audit.findings?.length>0&&(
                    <div className="font-mono text-xs mt-1" style={{color:"#fb923c"}}>{audit.findings.length} findings</div>
                  )}
                </div>
              </div>
              {audit.scope&&<p className="text-xs mt-2" style={{color:"var(--text-secondary)"}}>{audit.scope}</p>}
            </motion.div>
          ))}
        </div>
        <div className="glass-card rounded-2xl p-5">
          {selected?(
            <div>
              <div className="flex items-start justify-between mb-4">
                <h3 className="font-display font-semibold text-white text-sm pr-2">{selected.title}</h3>
                <button onClick={()=>setSelected(null)} style={{color:"var(--text-muted)"}}><X size={16}/></button>
              </div>
              <div className="space-y-3">
                <div className="flex gap-2 flex-wrap">
                  <Badge label={selected.type} variant="ghost"/>
                  <span className="font-mono text-xs px-2 py-1 rounded-md capitalize"
                    style={{background:`${sc(selected.status)}18`,color:sc(selected.status)}}>{selected.status?.replace("_"," ")}</span>
                </div>
                {selected.scope&&<p className="text-sm" style={{color:"var(--text-secondary)"}}><strong className="font-mono text-xs" style={{color:"var(--text-muted)"}}>SCOPE:</strong> {selected.scope}</p>}
                {selected.summary&&<p className="text-sm" style={{color:"var(--text-secondary)"}}>{selected.summary}</p>}
                {selected.findings?.length>0&&(
                  <div>
                    <p className="font-mono text-xs mb-2" style={{color:"var(--text-muted)"}}>FINDINGS ({selected.findings.length})</p>
                    {selected.findings.map((f: any,i: number)=>(
                      <div key={i} className="p-3 rounded-xl mb-2" style={{background:"var(--surface-elevated)"}}>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono text-xs px-1.5 py-0.5 rounded capitalize"
                            style={{background:`${STATUS_COLORS[f.severity]||"#94a3b8"}18`,color:STATUS_COLORS[f.severity]||"#94a3b8"}}>{f.severity}</span>
                          <span className="font-mono text-xs capitalize" style={{color:STATUS_COLORS[f.status]||"#94a3b8"}}>{f.status?.replace("_"," ")}</span>
                        </div>
                        <p className="text-xs text-white">{f.title}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ):(
            <div className="flex items-center justify-center py-16 text-center">
              <div><ClipboardList size={28} className="mx-auto mb-3" style={{color:"var(--text-muted)"}}/>
                <p className="text-sm" style={{color:"var(--text-muted)"}}>Select an audit to view details</p></div>
            </div>
          )}
        </div>
      </div>
      {showModal&&(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={()=>setShowModal(false)}/>
          <motion.div initial={{opacity:0,scale:0.95}} animate={{opacity:1,scale:1}}
            className="relative w-full max-w-md rounded-2xl shadow-2xl"
            style={{background:"var(--surface-card)",border:"1px solid var(--surface-border)"}}>
            <div className="flex items-center justify-between px-6 py-4 border-b" style={{borderColor:"var(--surface-border)"}}>
              <h2 className="font-display font-bold text-lg text-white">New Audit</h2>
              <button onClick={()=>setShowModal(false)} style={{color:"var(--text-muted)"}}><X size={18}/></button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div><label className="block font-mono text-xs mb-1.5" style={{color:"var(--text-muted)"}}>TITLE</label>
                <input value={form.title} onChange={upd("title")} className="input-field" placeholder="Audit title" required/></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="block font-mono text-xs mb-1.5" style={{color:"var(--text-muted)"}}>TYPE</label>
                  <select value={form.type} onChange={upd("type")} className="input-field">
                    {TYPES.map(t=><option key={t} value={t}>{t}</option>)}</select></div>
                <div><label className="block font-mono text-xs mb-1.5" style={{color:"var(--text-muted)"}}>FRAMEWORK</label>
                  <input value={form.framework} onChange={upd("framework")} className="input-field" placeholder="ISO27001"/></div>
              </div>
              <div><label className="block font-mono text-xs mb-1.5" style={{color:"var(--text-muted)"}}>SCOPE</label>
                <textarea value={form.scope} onChange={upd("scope")} className="input-field min-h-[60px] resize-none" placeholder="Audit scope..."/></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="block font-mono text-xs mb-1.5" style={{color:"var(--text-muted)"}}>START DATE</label>
                  <input type="date" value={form.startDate} onChange={upd("startDate")} className="input-field"/></div>
                <div><label className="block font-mono text-xs mb-1.5" style={{color:"var(--text-muted)"}}>END DATE</label>
                  <input type="date" value={form.endDate} onChange={upd("endDate")} className="input-field"/></div>
              </div>
              <button type="submit" className="w-full py-3 rounded-xl font-display font-semibold text-sm btn-vibrant">Create Audit</button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
