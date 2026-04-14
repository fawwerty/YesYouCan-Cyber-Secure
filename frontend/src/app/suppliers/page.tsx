"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Plus, Truck, X } from "lucide-react";
import api from "../../lib/api";
import { SectionHeader, KPICard, Badge } from "../../components/ui/index";
import toast from "react-hot-toast";

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", country: "GH", industry: "", contactName: "", contactEmail: "", tier: "minor" });

  useEffect(() => {
    api.get("/suppliers").then((r) => setSuppliers(r.data.data))
      .catch(() => toast.error("Failed")).finally(() => setLoading(false));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/suppliers", form);
      setSuppliers((p) => [data.data, ...p]); setShowModal(false);
      toast.success("Supplier added");
    } catch (err: any) { toast.error(err?.response?.data?.message || "Failed"); }
  };

  const upd = (f: string) => (e: React.ChangeEvent<any>) => setForm((p) => ({ ...p, [f]: e.target.value }));
  const rc = (r: string) => r === "green" ? "#00FF94" : r === "amber" ? "#facc15" : "#f87171";
  const avgESG = suppliers.length ? Math.round(suppliers.reduce((s, v) => s + v.esgScore, 0) / suppliers.length) : 0;

  return (
    <div className="p-5 md:p-7 max-w-[1400px] mx-auto">
      <SectionHeader title="Supplier Sustainability" subtitle="ESG scoring and third-party risk"
        action={<button onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl font-display font-semibold text-sm"
          style={{ background: "linear-gradient(135deg,#0D7377,#00CC77)", color: "#0A0F1E" }}>
          <Plus size={15} /> Add Supplier</button>} />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <KPICard label="Avg ESG Score" value={avgESG} unit="/100" icon={<Truck size={16} />} color="#00FF94" />
        <KPICard label="Green Rated" value={suppliers.filter(s=>s.rating==="green").length} icon={<Truck size={16}/>} color="#00FF94" delay={0.06}/>
        <KPICard label="Amber Rated" value={suppliers.filter(s=>s.rating==="amber").length} icon={<Truck size={16}/>} color="#facc15" delay={0.12}/>
        <KPICard label="Red Rated" value={suppliers.filter(s=>s.rating==="red").length} icon={<Truck size={16}/>} color="#f87171" delay={0.18}/>
      </div>
      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="overflow-x-auto"><table className="w-full">
          <thead><tr style={{ borderBottom:"1px solid var(--surface-border)", background:"var(--surface-elevated)" }}>
            {["Supplier","Tier","ESG","Risk","Rating","Cyber Hygiene"].map(h=>(
              <th key={h} className="px-4 py-3 text-left font-mono text-xs uppercase" style={{color:"var(--text-muted)"}}>{h}</th>
            ))}</tr></thead>
          <tbody>{loading ? Array.from({length:5}).map((_,i)=>(
            <tr key={i}><td colSpan={6} className="px-4 py-3"><div className="skeleton h-4 rounded"/></td></tr>
          )) : suppliers.map((s,i)=>(
            <motion.tr key={s._id} initial={{opacity:0}} animate={{opacity:1}} transition={{delay:i*0.04}}
              className="border-b hover:bg-[var(--surface-elevated)] transition-colors" style={{borderColor:"var(--surface-border)"}}>
              <td className="px-4 py-3">
                <div className="font-semibold text-sm text-white">{s.name}</div>
                <div className="text-xs" style={{color:"var(--text-muted)"}}>{s.industry}</div>
              </td>
              <td className="px-4 py-3"><Badge label={s.tier} variant={s.tier==="critical"?"red":"ghost"}/></td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="w-14 h-1.5 rounded-full" style={{background:"var(--surface-border)"}}>
                    <div className="h-full rounded-full" style={{width:`${s.esgScore}%`,background:rc(s.rating)}}/>
                  </div>
                  <span className="font-mono text-xs" style={{color:rc(s.rating)}}>{s.esgScore}</span>
                </div>
              </td>
              <td className="px-4 py-3 font-mono text-sm" style={{color:s.riskScore>60?"#f87171":s.riskScore>40?"#facc15":"#4ade80"}}>{s.riskScore}</td>
              <td className="px-4 py-3">
                <span className="font-mono text-xs px-2 py-1 rounded-md capitalize flex items-center gap-1 w-fit"
                  style={{background:`${rc(s.rating)}15`,color:rc(s.rating),border:`1px solid ${rc(s.rating)}30`}}>
                  <div className="w-1.5 h-1.5 rounded-full" style={{background:rc(s.rating)}}/>{s.rating}
                </span>
              </td>
              <td className="px-4 py-3 font-mono text-sm" style={{color:"var(--text-secondary)"}}>{s.cyberHygieneScore}</td>
            </motion.tr>
          ))}</tbody>
        </table></div>
      </div>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={()=>setShowModal(false)}/>
          <motion.div initial={{opacity:0,scale:0.95}} animate={{opacity:1,scale:1}}
            className="relative w-full max-w-md rounded-2xl shadow-2xl"
            style={{background:"var(--surface-card)",border:"1px solid var(--surface-border)"}}>
            <div className="flex items-center justify-between px-6 py-4 border-b" style={{borderColor:"var(--surface-border)"}}>
              <h2 className="font-display font-bold text-lg text-white">Add Supplier</h2>
              <button onClick={()=>setShowModal(false)} style={{color:"var(--text-muted)"}}><X size={18}/></button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              {[{label:"COMPANY NAME",key:"name",ph:"Acme Ltd"},{label:"INDUSTRY",key:"industry",ph:"Technology"},
                {label:"CONTACT NAME",key:"contactName",ph:"John Doe"},{label:"CONTACT EMAIL",key:"contactEmail",ph:"john@acme.com"}
              ].map(({label,key,ph})=>(
                <div key={key}>
                  <label className="block font-mono text-xs mb-1.5" style={{color:"var(--text-muted)"}}>{label}</label>
                  <input value={(form as any)[key]} onChange={upd(key)} className="input-field" placeholder={ph} required={key==="name"}/>
                </div>
              ))}
              <div className="grid grid-cols-2 gap-3">
                <div><label className="block font-mono text-xs mb-1.5" style={{color:"var(--text-muted)"}}>COUNTRY</label>
                  <input value={form.country} onChange={upd("country")} className="input-field" placeholder="GH"/></div>
                <div><label className="block font-mono text-xs mb-1.5" style={{color:"var(--text-muted)"}}>TIER</label>
                  <select value={form.tier} onChange={upd("tier")} className="input-field">
                    <option value="critical">Critical</option><option value="major">Major</option><option value="minor">Minor</option>
                  </select></div>
              </div>
              <button type="submit" className="w-full py-3 rounded-xl font-display font-semibold text-sm"
                style={{background:"linear-gradient(135deg,#0D7377,#00CC77)",color:"#0A0F1E"}}>Add Supplier</button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
