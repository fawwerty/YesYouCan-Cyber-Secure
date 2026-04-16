"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, Clock, ShieldAlert, ChevronRight, User as UserIcon } from "lucide-react";
import api from "../../../lib/api";
import { SectionHeader, Badge, CardSkeleton } from "../../../components/ui/index";
import { formatDate } from "../../../lib/utils";
import toast from "react-hot-toast";

export default function ApprovalsPage() {
  const [approvals, setApprovals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState<string | null>(null);

  const fetchApprovals = async () => {
    try {
      const { data } = await api.get("/approvals");
      setApprovals(data.data);
    } catch {
      toast.error("Failed to load approvals");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApprovals();
  }, []);

  const handleAction = async (id: string, status: "approved" | "rejected") => {
    const note = window.prompt(`Add a note for this ${status} (optional):`);
    setProcessing(id);
    try {
      await api.put(`/approvals/${id}`, { status, note });
      toast.success(`Request ${status} successfully`);
      fetchApprovals();
    } catch {
      toast.error("Action failed");
    } finally {
      setProcessing(null);
    }
  };

  return (
    <div className="p-5 md:p-7 max-w-[1200px] mx-auto">
      <SectionHeader 
        title="Authorization Center" 
        subtitle="Review and authorize sensitive system changes for your organization" 
      />

      <div className="space-y-4">
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => <CardSkeleton key={i} />)}
          </div>
        ) : approvals.length === 0 ? (
          <div className="glass-card p-12 text-center rounded-2xl">
            <CheckCircle2 size={48} className="mx-auto mb-4" style={{ color: "var(--accent-green)", opacity: 0.5 }} />
            <h3 className="text-white font-bold text-lg">No Pending Approvals</h3>
            <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>Your authorization queue is clear.</p>
          </div>
        ) : (
          approvals.map((req, i) => (
            <motion.div
              key={req._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass-card rounded-2xl overflow-hidden border"
              style={{ borderColor: req.status === "pending" ? "rgba(16,185,129,0.2)" : "var(--surface-border)" }}
            >
              <div className="p-5 flex flex-wrap items-start justify-between gap-6">
                <div className="flex gap-4 min-w-[300px]">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                       style={{ background: req.actionType === "DELETE" ? "rgba(239, 68, 68, 0.1)" : "rgba(16, 185, 129, 0.1)" }}>
                    {req.actionType === "DELETE" ? <ShieldAlert size={24} className="text-red-400" /> : <Clock size={24} style={{ color: "var(--accent-green)" }} />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-display font-bold text-white uppercase tracking-wider text-xs">
                        {req.actionType.replace("_", " ")} {req.resourceType}
                      </span>
                      <Badge label={req.status} variant={req.status === "pending" ? "amber" : req.status === "approved" ? "green" : "red"} />
                    </div>
                    <div className="text-sm font-semibold text-[var(--text-secondary)] mb-2">
                      Requested by {req.requester?.firstName} {req.requester?.lastName}
                    </div>
                    
                    {/* Data / Changes display */}
                    <div className="text-xs p-3 rounded-xl font-mono leading-relaxed" 
                         style={{ background: "rgba(0,0,0,0.2)", color: "var(--text-muted)", border: "1px solid var(--surface-border)" }}>
                      {req.actionType === "STATUS_CHANGE" ? (
                        <>Change Status: <span className="text-white">{req.originalData?.status}</span> <ChevronRight size={10} className="inline mx-1" /> <span className="text-emerald-400">{req.requestedChanges?.status}</span></>
                      ) : (
                        <>Request to delete resource ID: {req.resourceId}</>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-3 min-w-[150px]">
                  <span className="text-[10px] font-mono" style={{ color: "var(--text-muted)" }}>
                    Submitted: {formatDate(req.createdAt)}
                  </span>
                  
                  {req.status === "pending" && (
                    <div className="flex items-center gap-2">
                       <button
                        onClick={() => handleAction(req._id, "rejected")}
                        disabled={processing === req._id}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all border border-red-500/30 hover:bg-red-500/10 text-red-400"
                      >
                        <XCircle size={14} /> Reject
                      </button>
                      <button
                        onClick={() => handleAction(req._id, "approved")}
                        disabled={processing === req._id}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all btn-vibrant"
                      >
                        <CheckCircle2 size={14} /> Authorize Change
                      </button>
                    </div>
                  )}
                </div>
              </div>
              
              {req.approverNote && (
                <div className="px-5 pb-5 border-t pt-3 mt-1" style={{ borderColor: "var(--surface-border)" }}>
                  <p className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>
                    Approved by {req.approver?.firstName}: <span className="text-[var(--text-secondary)]">"{req.approverNote}"</span>
                  </p>
                </div>
              )}
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
