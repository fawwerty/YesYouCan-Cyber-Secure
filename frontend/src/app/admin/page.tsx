"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings, Users, Shield, X, CheckCircle2, ShieldAlert, Lock, UserPlus } from "lucide-react";
import api from "@/lib/api";
import { SectionHeader, KPICard, Badge } from "../../components/ui/index";
import { formatDate, ROLE_LABELS, cn } from "@/lib/utils";
import useAuthStore from "@/store/authStore";
import toast from "react-hot-toast";

export default function AdminPage() {
  const { user: currentUser, tenant } = useAuthStore();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    setLoading(true);
    api.get("/users").then(r=>setUsers(r.data.data))
      .catch(()=>toast.error("Failed to load users")).finally(()=>setLoading(false));
  };

  const deactivate = async (id: string) => {
    if (!confirm("Deactivate this user?")) return;
    try {
      await api.delete(`/users/${id}`);
      setUsers(p=>p.filter(u=>u._id!==id)); toast.success("User deactivated");
    } catch { toast.error("Action failed"); }
  };

  const handleUpdateAccess = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;
    setIsUpdating(true);
    try {
      await api.put(`/users/${selectedUser._id}`, {
        role: selectedUser.role,
        clearanceLevel: selectedUser.clearanceLevel,
        permissions: selectedUser.permissions
      });
      toast.success("Access updated successfully");
      setSelectedUser(null);
      fetchUsers();
    } catch (err) {
      toast.error("Failed to update access");
    } finally {
      setIsUpdating(false);
    }
  };

  const togglePermission = (perm: string) => {
    setSelectedUser((prev: any) => {
      const perms = [...(prev.permissions || [])];
      if (perms.includes(perm)) {
        return { ...prev, permissions: perms.filter(p => p !== perm) };
      } else {
        return { ...prev, permissions: [...perms, perm] };
      }
    });
  };

  const roleColor = (r: string) => r==="super_admin"?"#ef4444":r==="admin"?"#f97316":r==="analyst"?"#3b82f6":r==="executive"?"#a855f7":"#71717a";

  const PERMISSION_OPTIONS = [
    { id: "risks:write", label: "Edit Risks" },
    { id: "compliance:audit", label: "Conduct Audit" },
    { id: "esg:publish", label: "Publish ESG" },
    { id: "suppliers:onboard", label: "Onboard Suppliers" },
    { id: "incidents:manage", label: "Manage Incidents" },
  ];

  return (
    <div className="p-5 md:p-7 max-w-[1400px] mx-auto">
      <SectionHeader title="Admin Panel" subtitle={`Managing Identity & Access for ${tenant?.name || "Enterprise"}`}/>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <KPICard label="Total Workforce" value={users.length} icon={<Users size={16}/>} color="#3b82f6"/>
        <KPICard label="Privileged Users" value={users.filter(u=>["super_admin","admin"].includes(u.role)).length} icon={<Shield size={16}/>} color="#f97316" delay={0.06}/>
        <KPICard label="Clearance Lvl 4+" value={users.filter(u=>u.clearanceLevel >= 4).length} icon={<Lock size={16}/>} color="#ef4444" delay={0.12}/>
        <KPICard label="Active Compliance" value={users.filter(u=>u.isActive).length} icon={<CheckCircle2 size={16}/>} color="#10b981" delay={0.18}/>
      </div>

      <div className="grid grid-cols-1 gap-5">
        <div className="glass-card rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b flex items-center justify-between" style={{borderColor:"var(--surface-border)"}}>
            <h3 className="font-display font-semibold text-white">Identity Management (RBAC/MAC/DAC)</h3>
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--accent-green)] text-black text-xs font-bold">
              <UserPlus size={14}/> Add User
            </button>
          </div>
          <div className="overflow-x-auto"><table className="w-full">
            <thead><tr style={{borderBottom:"1px solid var(--surface-border)",background:"var(--surface-2)"}}>
              {["Identity","Role (RBAC)","Clearance (MAC)","Permissions (DAC)","Status","Action"].map(h=>(
                <th key={h} className="px-6 py-4 text-left font-mono text-xs uppercase" style={{color:"var(--text-muted)"}}>{h}</th>
              ))}</tr></thead>
            <tbody>{loading?Array.from({length:5}).map((_,i)=>(
              <tr key={i}><td colSpan={6} className="px-6 py-4"><div className="skeleton h-4 rounded"/></td></tr>
            )):users.map((u,i)=>(
              <motion.tr key={u._id} initial={{opacity:0}} animate={{opacity:1}} transition={{delay:i*0.04}}
                className="border-b hover:bg-[var(--surface-2)] transition-colors" style={{borderColor:"var(--surface-border)"}}>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center font-display font-bold text-xs flex-shrink-0"
                      style={{background:"var(--surface-border)",color:"var(--text-primary)"}}>
                      {u.firstName?.[0]}{u.lastName?.[0]}
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-white">{u.firstName} {u.lastName}</div>
                      <div className="text-[11px]" style={{color:"var(--text-muted)"}}>{u.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="font-mono text-[10px] px-2 py-1 rounded-md uppercase tracking-wider"
                    style={{background:`${roleColor(u.role)}15`,color:roleColor(u.role),border:`1px solid ${roleColor(u.role)}30`}}>
                    {ROLE_LABELS[u.role]||u.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1.5">
                    <div className="flex gap-0.5">
                      {[1,2,3,4,5].map(lvl => (
                        <div key={lvl} className={cn("w-1.5 h-3 rounded-sm", lvl <= (u.clearanceLevel || 1) ? "bg-[var(--accent-green)]" : "bg-[var(--surface-border)]")} />
                      ))}
                    </div>
                    <span className="font-mono text-xs ml-1" style={{color:"var(--text-muted)"}}>L{(u.clearanceLevel || 1)}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {(u.permissions || []).length > 0 ? u.permissions.slice(0, 2).map((p: string) => (
                      <span key={p} className="text-[9px] px-1.5 py-0.5 rounded bg-[var(--surface-2)] border border-[var(--surface-border)] text-white font-mono">
                        {p.split(':')[1]}
                      </span>
                    )) : <span className="text-[10px]" style={{color:"var(--text-muted)"}}>Default</span>}
                    {(u.permissions || []).length > 2 && <span className="text-[9px] text-[var(--text-muted)]">+{(u.permissions.length - 2)}</span>}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1.5">
                    <div className={cn("w-1.5 h-1.5 rounded-full", u.isActive ? "bg-[var(--accent-green)]" : "bg-[#ef4444]")} />
                    <span className="font-mono text-[11px] uppercase" style={{color:u.isActive?"var(--accent-green)":"#ef4444"}}>{u.isActive?"Verified":"Restricted"}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button onClick={() => setSelectedUser(u)} className="font-mono text-[11px] px-2 py-1 rounded-md transition-colors bg-[var(--surface-2)] border border-[var(--surface-border)] text-white hover:bg-[var(--surface-border)]">MANAGE</button>
                    {u._id!==currentUser?._id&&(
                      <button onClick={()=>deactivate(u._id)} className="font-mono text-[11px] px-2 py-1 rounded-md text-[#ef4444] hover:bg-[#ef444410]">RESCIND</button>
                    )}
                  </div>
                </td>
              </motion.tr>
            ))}</tbody>
          </table></div>
        </div>
      </div>

      {/* ACCESS MANAGEMENT MODAL */}
      <AnimatePresence>
        {selectedUser && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedUser(null)} />
            <motion.div initial={{opacity:0, scale: 0.95}} animate={{opacity:1, scale: 1}} exit={{opacity:0, scale: 0.95}} 
              className="relative w-full max-w-lg glass-card rounded-2xl overflow-hidden shadow-2xl">
              <div className="p-6 border-b" style={{borderColor:"var(--surface-border)"}}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-display font-bold text-xl text-white">Manage Access</h3>
                  <button onClick={() => setSelectedUser(null)} className="text-[var(--text-muted)] hover:text-white transition-colors"><X size={20}/></button>
                </div>
                <p className="text-sm" style={{color:"var(--text-secondary)"}}>Updating permissions for <b>{selectedUser.firstName} {selectedUser.lastName}</b></p>
              </div>
              
              <form onSubmit={handleUpdateAccess} className="p-6 space-y-6">
                {/* RBAC */}
                <div>
                  <label className="label mb-2 block">Enterprise Role (RBAC)</label>
                  <select 
                    value={selectedUser.role} 
                    onChange={e => setSelectedUser({...selectedUser, role: e.target.value})}
                    className="input-field"
                  >
                    {Object.entries(ROLE_LABELS).map(([val, lbl]) => (
                      <option key={val} value={val}>{lbl} ({val})</option>
                    ))}
                  </select>
                </div>

                {/* MAC */}
                <div>
                  <label className="label mb-2 block">Security Clearance (MAC)</label>
                  <div className="grid grid-cols-5 gap-2">
                    {[1,2,3,4,5].map(lvl => (
                      <button 
                        key={lvl}
                        type="button" 
                        onClick={() => setSelectedUser({...selectedUser, clearanceLevel: lvl})}
                        className={cn(
                          "py-2 rounded-lg border font-mono text-sm transition-all",
                          selectedUser.clearanceLevel >= lvl ? "bg-[var(--accent-green)] text-black border-[var(--accent-green)]" : "bg-[var(--surface-1)] text-[var(--text-muted)] border-[var(--surface-border)]"
                        )}
                      >
                        L{lvl}
                      </button>
                    ))}
                  </div>
                  <p className="text-[10px] mt-2 italic text-[var(--text-muted)]">L5 represents maximum organizational sensitivity access.</p>
                </div>

                {/* DAC */}
                <div>
                  <label className="label mb-2 block">Specific Permissions (DAC)</label>
                  <div className="space-y-2 max-h-32 overflow-y-auto pr-2 custom-scrollbar">
                    {PERMISSION_OPTIONS.map(opt => (
                      <label key={opt.id} className="flex items-center justify-between p-3 rounded-xl bg-[var(--surface-2)] border border-[var(--surface-border)] cursor-pointer hover:border-[var(--accent-green)] transition-all">
                        <span className="text-sm text-white font-medium">{opt.label}</span>
                        <input 
                          type="checkbox" 
                          checked={(selectedUser.permissions || []).includes(opt.id)}
                          onChange={() => togglePermission(opt.id)}
                          className="hidden"
                        />
                        <div className={cn("w-5 h-5 rounded flex items-center justify-center border transition-all", (selectedUser.permissions || []).includes(opt.id) ? "bg-[var(--accent-green)] border-[var(--accent-green)] text-black" : "border-[var(--surface-border)]")}>
                          {(selectedUser.permissions || []).includes(opt.id) && <CheckCircle2 size={12} strokeWidth={3}/>}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex gap-3">
                  <button type="button" onClick={() => setSelectedUser(null)} className="flex-1 py-3 rounded-xl font-bold text-sm bg-transparent border border-[var(--surface-border)] text-[var(--text-secondary)] hover:text-white transition-colors">Cancel</button>
                  <button type="submit" disabled={isUpdating} className="flex-1 py-3 rounded-xl font-bold text-sm bg-[var(--accent-green)] text-black hover:brightness-110 transition-all flex items-center justify-center gap-2">
                    {isUpdating ? <div className="w-4 h-4 border-2 border-black border-t-transparent animate-spin rounded-full"/> : <ShieldAlert size={16}/>}
                    Commit Changes
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
