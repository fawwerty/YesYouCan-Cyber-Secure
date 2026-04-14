"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Settings, Users, Shield } from "lucide-react";
import api from "../../lib/api";
import { SectionHeader, KPICard, Badge } from "../../components/ui/index";
import { formatDate, ROLE_LABELS } from "../../lib/utils";
import useAuthStore from "../../store/authStore";
import toast from "react-hot-toast";

export default function AdminPage() {
  const { user, tenant } = useAuthStore();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/users").then(r=>setUsers(r.data.data))
      .catch(()=>toast.error("Failed")).finally(()=>setLoading(false));
  }, []);

  const deactivate = async (id: string) => {
    if (!confirm("Deactivate this user?")) return;
    try {
      await api.delete(`/users/${id}`);
      setUsers(p=>p.filter(u=>u._id!==id)); toast.success("User deactivated");
    } catch { toast.error("Failed"); }
  };

  const roleColor = (r: string) => r==="super_admin"?"#f87171":r==="admin"?"#fb923c":r==="analyst"?"#60a5fa":r==="executive"?"#a78bfa":"#94a3b8";

  return (
    <div className="p-5 md:p-7 max-w-[1400px] mx-auto">
      <SectionHeader title="Admin Panel" subtitle={`Managing ${tenant?.name || "your organization"}`}/>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <KPICard label="Total Users" value={users.length} icon={<Users size={16}/>} color="#60a5fa"/>
        <KPICard label="Admins" value={users.filter(u=>["super_admin","admin"].includes(u.role)).length} icon={<Shield size={16}/>} color="#fb923c" delay={0.06}/>
        <KPICard label="Active" value={users.filter(u=>u.isActive).length} icon={<Users size={16}/>} color="#00FF94" delay={0.12}/>
        <KPICard label="Analysts" value={users.filter(u=>u.role==="analyst").length} icon={<Users size={16}/>} color="#a78bfa" delay={0.18}/>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 glass-card rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b" style={{borderColor:"var(--surface-border)"}}>
            <h3 className="font-display font-semibold text-white">User Management</h3>
          </div>
          <div className="overflow-x-auto"><table className="w-full">
            <thead><tr style={{borderBottom:"1px solid var(--surface-border)",background:"var(--surface-elevated)"}}>
              {["User","Role","Department","Last Login","Status","Action"].map(h=>(
                <th key={h} className="px-4 py-3 text-left font-mono text-xs uppercase" style={{color:"var(--text-muted)"}}>{h}</th>
              ))}</tr></thead>
            <tbody>{loading?Array.from({length:5}).map((_,i)=>(
              <tr key={i}><td colSpan={6} className="px-4 py-3"><div className="skeleton h-4 rounded"/></td></tr>
            )):users.map((u,i)=>(
              <motion.tr key={u._id} initial={{opacity:0}} animate={{opacity:1}} transition={{delay:i*0.04}}
                className="border-b hover:bg-[var(--surface-elevated)] transition-colors" style={{borderColor:"var(--surface-border)"}}>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center font-display font-bold text-xs flex-shrink-0"
                      style={{background:"linear-gradient(135deg,#0D7377,#00CC77)",color:"#0A0F1E"}}>
                      {u.firstName?.[0]}{u.lastName?.[0]}
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-white">{u.firstName} {u.lastName}</div>
                      <div className="text-xs" style={{color:"var(--text-muted)"}}>{u.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="font-mono text-xs px-2 py-1 rounded-md"
                    style={{background:`${roleColor(u.role)}15`,color:roleColor(u.role),border:`1px solid ${roleColor(u.role)}30`}}>
                    {ROLE_LABELS[u.role]||u.role}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm" style={{color:"var(--text-secondary)"}}>{u.department||"—"}</td>
                <td className="px-4 py-3 font-mono text-xs" style={{color:"var(--text-muted)"}}>{u.lastLogin?formatDate(u.lastLogin):"Never"}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full" style={{background:u.isActive?"#00FF94":"#f87171"}}/>
                    <span className="font-mono text-xs" style={{color:u.isActive?"#00FF94":"#f87171"}}>{u.isActive?"Active":"Inactive"}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  {u._id!==user?._id&&(
                    <button onClick={()=>deactivate(u._id)} className="font-mono text-xs px-2 py-1 rounded-md transition-colors"
                      style={{color:"#f87171",background:"rgba(248,113,113,0.08)"}}>Deactivate</button>
                  )}
                </td>
              </motion.tr>
            ))}</tbody>
          </table></div>
        </div>
        <div className="space-y-4">
          <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:0.2}}
            className="glass-card rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <Settings size={16} style={{color:"var(--teal-light)"}}/>
              <h3 className="font-display font-semibold text-white text-sm">Platform Settings</h3>
            </div>
            <div className="space-y-3">
              {[
                {label:"Organization",value:tenant?.name||"—"},
                {label:"Industry",value:tenant?.industry||"—"},
                {label:"Subscription",value:tenant?.subscriptionTier||"—"},
                {label:"Currency",value:tenant?.currency||"GHS"},
                {label:"Timezone",value:tenant?.timezone||"Africa/Accra"},
              ].map(({label,value})=>(
                <div key={label} className="flex justify-between py-2 border-b" style={{borderColor:"var(--surface-border)"}}>
                  <span className="font-mono text-xs" style={{color:"var(--text-muted)"}}>{label}</span>
                  <span className="text-sm text-white capitalize">{value}</span>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:0.3}}
            className="glass-card rounded-2xl p-5">
            <h3 className="font-display font-semibold text-white text-sm mb-3">Enabled Modules</h3>
            <div className="flex flex-wrap gap-2">
              {(tenant?.settings?.enabledModules||[]).map((m: string)=>(
                <Badge key={m} label={m} variant="green"/>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
