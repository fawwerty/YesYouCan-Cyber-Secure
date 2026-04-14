"use client";
import { motion } from "framer-motion";
import { FileText, Download, BarChart2, Shield, Leaf, Users, Table } from "lucide-react";
import { SectionHeader } from "../../components/ui/index";
import { generatePDF, generateExcel, getMockDataForReport } from "@/lib/reports";
import { useState } from "react";
import toast from "react-hot-toast";

const REPORT_TEMPLATES = [
  {id:"grc-summary",title:"GRC Executive Summary",desc:"Risk posture, compliance status, incident summary",category:"GRC",icon:Shield,color:"#60a5fa"},
  {id:"esg-disclosure",title:"ESG Disclosure Report",desc:"GRI/TCFD aligned sustainability metrics and targets",category:"ESG",icon:Leaf,color:"#00FF94"},
  {id:"carbon-report",title:"Carbon Emissions Report",desc:"Scope 1, 2 & 3 emissions with trend analysis",category:"Environmental",icon:BarChart2,color:"#4ade80"},
  {id:"compliance-audit",title:"Compliance Audit Report",desc:"Per-framework control status and gap analysis",category:"Compliance",icon:FileText,color:"#facc15"},
  {id:"supplier-esg",title:"Supplier ESG Assessment",desc:"Third-party risk and sustainability scorecard",category:"Suppliers",icon:Users,color:"#a78bfa"},
  {id:"board-report",title:"Board ESG Dashboard",desc:"Executive-level KPI summary for board reporting",category:"Executive",icon:BarChart2,color:"#fb923c"},
];

export default function ReportsPage() {
  const [loading, setLoading] = useState<string | null>(null);

  const handleGenerate = async (id: string, format: "pdf" | "excel") => {
    setLoading(`${id}-${format}`);
    try {
      const data = getMockDataForReport(id);
      if (format === "pdf") {
        generatePDF(data);
      } else {
        generateExcel(data);
      }
      toast.success(`${format.toUpperCase()} generated successfully`);
    } catch (error) {
      toast.error("Failed to generate report");
      console.error(error);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="p-5 md:p-7 max-w-[1400px] mx-auto">
      <SectionHeader title="Reports" subtitle="Generate and download GRC & ESG reports"/>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {REPORT_TEMPLATES.map((t,i)=>{
          const Icon = t.icon;
          const isPdfLoading = loading === `${t.id}-pdf`;
          const isExcelLoading = loading === `${t.id}-excel`;
          return (
            <motion.div key={t.id} initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:i*0.07}}
              className="glass-card rounded-2xl p-6 group hover:border-opacity-80 transition-all duration-300"
              style={{borderColor:`${t.color}22`}}>
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{background:`${t.color}15`,color:t.color}}>
                  <Icon size={18}/>
                </div>
                <span className="font-mono text-xs px-2 py-1 rounded-md" style={{background:"var(--surface-elevated)",color:"var(--text-muted)"}}>{t.category}</span>
              </div>
              <h3 className="font-display font-semibold text-white mb-2">{t.title}</h3>
              <p className="text-sm mb-6" style={{color:"var(--text-secondary)"}}>{t.desc}</p>
              
              <div className="flex gap-2">
                <button onClick={()=>handleGenerate(t.id, "pdf")} disabled={!!loading}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-display font-semibold text-xs transition-all"
                  style={{background:`${t.color}15`,color:t.color,border:`1px solid ${t.color}30`}}>
                  {isPdfLoading ? <div className="w-4 h-4 border-2 border-t-transparent animate-spin rounded-full"/> : <Download size={13}/>}
                  PDF
                </button>
                <button onClick={()=>handleGenerate(t.id, "excel")} disabled={!!loading}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-display font-semibold text-xs transition-all"
                  style={{background:`${t.color}15`,color:t.color,border:`1px solid ${t.color}30`}}>
                  {isExcelLoading ? <div className="w-4 h-4 border-2 border-t-transparent animate-spin rounded-full"/> : <Table size={13}/>}
                  EXCEL
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
      <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.5}}
        className="mt-12 glass-card rounded-2xl p-8 text-center border-dashed">
        <p className="font-mono text-[11px] uppercase tracking-widest mb-4" style={{color:"var(--accent-green)"}}>Systems Verified</p>
        <p className="text-sm font-medium leading-relaxed" style={{color:"var(--text-muted)"}}>
          © 2025 YesYouCan Cyber Secure. All rights reserved.<br/>
          <span className="text-white">CEO: Dr. Noah Darko-Adjei | Strategic Advisor: Christiana Konlan Kennedy</span><br/>
          Built for enterprise governance, sustainability, and cybersecurity excellence.
        </p>
      </motion.div>
    </div>
  );
}
