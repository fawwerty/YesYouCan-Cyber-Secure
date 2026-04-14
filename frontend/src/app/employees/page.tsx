"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users, Award, Leaf } from "lucide-react";
import api from "../../lib/api";
import { SectionHeader, KPICard, Badge } from "../../components/ui/index";
import toast from "react-hot-toast";

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/employees").then(r=>setEmployees(r.data.data))
      .catch(()=>toast.error("Failed")).finally(()=>setLoading(false));
  }, []);

  const totalPts = employees.reduce((s,e)=>s+e.sustainabilityPoints,0);
  const totalCarbon = employees.reduce((s,e)=>s+e.carbonSaved,0);

  return (
    <div className="p-5 md:p-7 max-w-[1400px] mx-auto">
      <SectionHeader title="Employee Engagement" subtitle="Sustainability leaderboard and gamification"/>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <KPICard label="Employees" value={employees.length} icon={<Users size={16}/>} color="#60a5fa"/>
        <KPICard label="Total Points" value={totalPts} icon={<Award size={16}/>} color="#facc15" delay={0.06}/>
        <KPICard label="Carbon Saved" value={parseFloat(totalCarbon.toFixed(1))} unit="tCO₂e" icon={<Leaf size={16}/>} color="#00FF94" delay={0.12}/>
        <KPICard label="Actions Taken" value={employees.reduce((s,e)=>s+e.actionsCount,0)} icon={<Award size={16}/>} color="#a78bfa" delay={0.18}/>
      </div>
      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b" style={{borderColor:"var(--surface-border)"}}>
          <h3 className="font-display font-semibold text-white">Sustainability Leaderboard</h3>
        </div>
        <div className="divide-y" style={{borderColor:"var(--surface-border)"}}>
          {loading?Array.from({length:5}).map((_,i)=>(
            <div key={i} className="px-5 py-4"><div className="skeleton h-10 rounded-xl"/></div>
          )):employees.map((emp,i)=>(
            <motion.div key={emp._id} initial={{opacity:0,x:-10}} animate={{opacity:1,x:0}} transition={{delay:i*0.06}}
              className="flex items-center gap-4 px-5 py-4 hover:bg-[var(--surface-elevated)] transition-colors">
              <div className="w-8 text-center font-display font-bold text-lg"
                style={{color:i===0?"#facc15":i===1?"#94a3b8":i===2?"#fb923c":"var(--text-muted)"}}>
                {i===0?"🥇":i===1?"🥈":i===2?"🥉":`#${i+1}`}
              </div>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center font-display font-bold text-sm flex-shrink-0"
                style={{ background: "var(--surface-border)", color: "var(--text-primary)" }}>
                {emp.user?.firstName?.[0]}{emp.user?.lastName?.[0]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm text-white">{emp.user?.firstName} {emp.user?.lastName}</div>
                <div className="text-xs" style={{color:"var(--text-muted)"}}>{emp.user?.department||"—"}</div>
              </div>
              <div className="flex flex-wrap gap-1.5 hidden md:flex">
                {(emp.badges||[]).slice(0,3).map((b: string)=><Badge key={b} label={b} variant="green"/>)}
              </div>
              <div className="flex items-center gap-4 flex-shrink-0">
                <div className="text-center">
                  <div className="font-display font-bold text-sm" style={{color:"var(--accent-green)"}}>{emp.sustainabilityPoints}</div>
                  <div className="font-mono text-xs" style={{color:"var(--text-muted)"}}>pts</div>
                </div>
                <div className="text-center hidden sm:block">
                  <div className="font-mono text-sm text-white">{emp.carbonSaved}t</div>
                  <div className="font-mono text-xs" style={{color:"var(--text-muted)"}}>CO₂</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
