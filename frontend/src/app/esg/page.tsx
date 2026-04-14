"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Leaf, Users, Shield } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
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
    <div className="p-5 md:p-7 max-w-[1400px] mx-auto">
      <SectionHeader title="ESG Analytics" subtitle="Environmental, Social & Governance performance"/>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
        {cats.map(({key,label,color,icon:Icon},i)=>(
          <motion.div key={key} initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:i*0.08}}
            className="glass-card rounded-2xl p-5 flex items-center gap-5">
            {loading?<div className="skeleton w-20 h-20 rounded-full"/>
              :<CircularProgress value={overallScore(key)} size={76} color={color}/>}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Icon size={15} style={{color}}/><span className="font-display font-semibold text-white text-sm">{label}</span>
              </div>
              <div className="font-display font-bold text-2xl text-white">{overallScore(key)}%</div>
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
            className="glass-card rounded-2xl p-5 mb-5">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-2 h-6 rounded-full" style={{background:color}}/>
              <h3 className="font-display font-semibold text-white">{label} Metrics</h3>
            </div>
            {loading?<div className="h-40 skeleton rounded-xl"/>:(
              <div className="space-y-2">
                {chartData.map(metric=>(
                  <div key={metric.name} className="flex items-center gap-3 p-3 rounded-xl" style={{background:"var(--surface-elevated)"}}>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-white truncate">{metric.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex-1 h-1.5 rounded-full" style={{background:"var(--surface-border)"}}>
                          <div className="h-full rounded-full" style={{width:`${metric.pct||50}%`,background:(metric.pct||50)>=80?color:(metric.pct||50)>=60?"#facc15":"#f87171"}}/>
                        </div>
                        <span className="font-mono text-xs whitespace-nowrap" style={{color:"var(--text-muted)"}}>{metric.value} {metric.unit}</span>
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
