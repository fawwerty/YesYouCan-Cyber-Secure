"use client";
import { motion } from "framer-motion";
import { FileText, Download, BarChart2, Shield, Leaf, Users } from "lucide-react";
import { SectionHeader } from "../../components/ui/index";

const REPORT_TEMPLATES = [
  {id:"grc-summary",title:"GRC Executive Summary",desc:"Risk posture, compliance status, incident summary",category:"GRC",icon:Shield,color:"#60a5fa"},
  {id:"esg-disclosure",title:"ESG Disclosure Report",desc:"GRI/TCFD aligned sustainability metrics and targets",category:"ESG",icon:Leaf,color:"#00FF94"},
  {id:"carbon-report",title:"Carbon Emissions Report",desc:"Scope 1, 2 & 3 emissions with trend analysis",category:"Environmental",icon:BarChart2,color:"#4ade80"},
  {id:"compliance-audit",title:"Compliance Audit Report",desc:"Per-framework control status and gap analysis",category:"Compliance",icon:FileText,color:"#facc15"},
  {id:"supplier-esg",title:"Supplier ESG Assessment",desc:"Third-party risk and sustainability scorecard",category:"Suppliers",icon:Users,color:"#a78bfa"},
  {id:"board-report",title:"Board ESG Dashboard",desc:"Executive-level KPI summary for board reporting",category:"Executive",icon:BarChart2,color:"#fb923c"},
];

export default function ReportsPage() {
  const handleGenerate = (id: string) => {
    alert(`Report generation for "${id}" would call the backend /api/reports/${id}/generate — integrate with a PDF generation service (e.g. Puppeteer or PDFKit).`);
  };

  return (
    <div className="p-5 md:p-7 max-w-[1400px] mx-auto">
      <SectionHeader title="Reports" subtitle="Generate and download GRC & ESG reports"/>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {REPORT_TEMPLATES.map((t,i)=>{
          const Icon = t.icon;
          return (
            <motion.div key={t.id} initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:i*0.07}}
              className="glass-card rounded-2xl p-5 group hover:border-opacity-80 transition-all duration-300"
              style={{borderColor:`${t.color}22`}}>
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{background:`${t.color}15`,color:t.color}}>
                  <Icon size={18}/>
                </div>
                <span className="font-mono text-xs px-2 py-1 rounded-md" style={{background:"var(--surface-elevated)",color:"var(--text-muted)"}}>{t.category}</span>
              </div>
              <h3 className="font-display font-semibold text-white mb-2">{t.title}</h3>
              <p className="text-sm mb-5" style={{color:"var(--text-secondary)"}}>{t.desc}</p>
              <button onClick={()=>handleGenerate(t.id)}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-display font-semibold text-sm transition-all"
                style={{background:`${t.color}15`,color:t.color,border:`1px solid ${t.color}30`}}
                onMouseEnter={e=>{(e.currentTarget as HTMLButtonElement).style.background=`${t.color}25`;}}
                onMouseLeave={e=>{(e.currentTarget as HTMLButtonElement).style.background=`${t.color}15`;}}>
                <Download size={14}/> Generate Report
              </button>
            </motion.div>
          );
        })}
      </div>
      <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.5}}
        className="mt-8 glass-card rounded-2xl p-6 text-center">
        <p className="font-mono text-xs" style={{color:"var(--text-muted)",lineHeight:2}}>
          © 2025 YesYouCan Cyber Secure. All rights reserved.<br/>
          CEO: Dr. Noah Darko-Adjei | Strategic Advisor: Christiana Konlan Kennedy<br/>
          Built for enterprise governance, sustainability, and cybersecurity excellence.
        </p>
      </motion.div>
    </div>
  );
}
