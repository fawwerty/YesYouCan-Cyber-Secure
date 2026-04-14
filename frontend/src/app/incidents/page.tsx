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
          className="flex items-center gap-2 px-4 py-2 rounded-xl font-display font-semibold text-sm btn-vibrant">
          <Plus size={15}/> Report Incident</button>}/>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
... (skipping middle content) ...
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
                <button type="submit" className="w-full py-3 rounded-xl font-display font-semibold text-sm btn-vibrant">Report Incident</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
