"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Leaf, Users, Shield, ArrowLeft } from "lucide-react";
import Link from "next/link";
import api from "../../lib/api";
import { SectionHeader, CircularProgress } from "../../components/ui/index";
import toast from "react-hot-toast";

export default function ESGPage() {
  const [kpis, setKpis] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/esg/kpis").then(r=>setKpis(r.data.data))
      .catch(()=>toast.error("Failed")).finally(()=>setLoading(false));
  }, []);

  const byCategory = (cat: string) => kpis.filter(k=>k._id.category===cat);
  const overallScore = (cat: string) => {
    const items = byCategory(cat);
    if (!items.length) return 0;
    const pcts = items.map(k=>k.target?Math.min(100,Math.round((k.latestValue/k.target)*100)):50);
    return Math.round(pcts.reduce((s,v)=>s+v,0)/pcts.length);
  };
  const cats = [
    {key:"environmental",label:"Environmental",color:"#00FF94",icon:Leaf},
    {key:"social",label:"Social",color:"#60a5fa",icon:Users},
    {key:"governance",label:"Governance",color:"#a78bfa",icon:Shield},
  ];

  return (
    <div className="p-5 md:p-12 max-w-[1400px] mx-auto min-h-screen relative">
      {/* Back Navigation */}
      <Link href="/" style={{ position: "absolute", top: "20px", left: "20px", display: "flex", alignItems: "center", gap: "8px", color: "var(--color-primary)", textDecoration: "none", fontSize: "13px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", zIndex: 10 }} className="hover:opacity-70 transition-opacity">
        <ArrowLeft size={16} /> Hub
      </Link>

      <div className="pt-8">
        <SectionHeader title="ESG Analytics" subtitle="Environmental, Social & Governance performance"/>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {cats.map(({key,label,color,icon:Icon},i)=>(
          <motion.div key={key} initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:i*0.08}}
            className="glass-surface rounded-2xl p-6 flex items-center gap-6">
            {loading?<div className="skeleton w-20 h-20 rounded-full"/>
              :<CircularProgress value={overallScore(key)} size={76} color={color}/>}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Icon size={15} style={{color}}/><span className="font-display font-semibold text-primary text-sm">{label}</span>
              </div>
              <div className="font-display font-bold text-3xl text-primary">{overallScore(key)}%</div>
              <div className="font-mono text-xs mt-1" style={{color:"var(--text-muted)"}}>{byCategory(key).length} metrics tracked</div>
            </div>
          </motion.div>
        ))}
      </div>

      {cats.map(({key,label,color},ci)=>{
        const items = byCategory(key);
        const chartData = items.map(k=>({name:k._id.metric,value:k.latestValue,target:k.target,unit:k.unit,pct:k.target?Math.min(100,Math.round((k.latestValue/k.target)*100)):null}));
        return (
          <motion.div key={key} initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:ci*0.1+0.2}}
            className="glass-surface rounded-2xl p-6 mb-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-2 h-6 rounded-full" style={{background:color}}/>
              <h3 className="font-display font-bold text-primary text-lg">{label} Metrics</h3>
            </div>
            {loading?<div className="h-40 skeleton rounded-xl"/>:(
              <div className="space-y-3">
                {chartData.map(metric=>(
                  <div key={metric.name} className="flex items-center gap-4 p-4 rounded-xl" style={{background:"var(--surface-2)", border: "1px solid var(--surface-border)"}}>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-primary truncate">{metric.name}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex-1 h-2 rounded-full" style={{background:"var(--surface-border)"}}>
                          <div className="h-full rounded-full" style={{width:`${metric.pct||50}%`,background:(metric.pct||50)>=80?color:(metric.pct||50)>=60?"#facc15":"#f87171"}}/>
                        </div>
                        <span className="font-mono text-xs whitespace-nowrap" style={{color:"var(--text-muted)", fontWeight: 700}}>{metric.value} {metric.unit}</span>
                      </div>
                    </div>
                    {metric.pct!==null&&(
                      <div className="font-display font-bold text-sm flex-shrink-0"
                        style={{color:metric.pct>=80?color:metric.pct>=60?"#facc15":"#f87171"}}>{metric.pct}%</div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
