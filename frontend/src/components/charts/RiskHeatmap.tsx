"use client";
import { motion } from "framer-motion";
import { useState } from "react";

const LEVELS = [1, 2, 3, 4, 5];

function cellColor(likelihood: number, impact: number): string {
  const score = likelihood * impact;
  if (score >= 20) return "#f87171"; // critical
  if (score >= 12) return "#fb923c"; // high
  if (score >= 6) return "#facc15";  // medium
  if (score >= 3) return "#4ade80";  // low
  return "#1e3a2e";                   // minimal
}

function cellLabel(score: number): string {
  if (score >= 20) return "Critical";
  if (score >= 12) return "High";
  if (score >= 6) return "Medium";
  if (score >= 3) return "Low";
  return "Minimal";
}

interface HeatmapCell {
  _id: { likelihood: number; impact: number };
  count: number;
  risks: { id: string; title: string; category: string }[];
}

interface RiskHeatmapProps {
  data: HeatmapCell[];
}

export default function RiskHeatmap({ data }: RiskHeatmapProps) {
  const [tooltip, setTooltip] = useState<{ x: number; y: number; cell: HeatmapCell } | null>(null);

  const getCell = (likelihood: number, impact: number) =>
    data.find((d) => d._id.likelihood === likelihood && d._id.impact === impact);

  return (
    <div className="relative">
      <div className="flex items-start gap-3">
        {/* Y-axis label */}
        <div className="flex flex-col justify-between h-[200px] pr-1 pb-5">
          {[...LEVELS].reverse().map((l) => (
            <span key={l} className="font-mono text-xs text-center w-3" style={{ color: "var(--text-muted)" }}>{l}</span>
          ))}
        </div>

        <div className="flex-1">
          {/* Grid */}
          <div className="grid gap-1.5" style={{ gridTemplateColumns: "repeat(5, 1fr)", gridTemplateRows: "repeat(5, 1fr)" }}>
            {[...LEVELS].reverse().map((likelihood) =>
              LEVELS.map((impact) => {
                const cell = getCell(likelihood, impact);
                const score = likelihood * impact;
                const color = cellColor(likelihood, impact);
                const hasRisks = cell && cell.count > 0;

                return (
                  <motion.div
                    key={`${likelihood}-${impact}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: (5 - likelihood) * 0.05 + impact * 0.03 }}
                    className="relative rounded-lg flex items-center justify-center cursor-pointer aspect-square"
                    style={{
                      background: hasRisks ? `${color}25` : "var(--surface-elevated)",
                      border: `1px solid ${hasRisks ? color + "50" : "var(--surface-border)"}`,
                      minHeight: 36,
                    }}
                    whileHover={{ scale: 1.05, zIndex: 10 }}
                    onMouseEnter={(e) => cell && setTooltip({ x: e.clientX, y: e.clientY, cell })}
                    onMouseLeave={() => setTooltip(null)}
                  >
                    {hasRisks && (
                      <>
                        <span className="font-display font-bold text-sm" style={{ color }}>{cell.count}</span>
                        <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: color }} />
                      </>
                    )}
                    {!hasRisks && (
                      <span className="font-mono text-xs opacity-20" style={{ color: "var(--text-muted)" }}>
                        {score}
                      </span>
                    )}
                  </motion.div>
                );
              })
            )}
          </div>

          {/* X-axis labels */}
          <div className="grid mt-2" style={{ gridTemplateColumns: "repeat(5, 1fr)", gap: 6 }}>
            {LEVELS.map((i) => (
              <span key={i} className="font-mono text-xs text-center" style={{ color: "var(--text-muted)" }}>{i}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Axis labels */}
      <div className="flex justify-between mt-2 pl-6">
        <span className="font-mono text-xs" style={{ color: "var(--text-muted)" }}>← Likelihood →</span>
        <div className="flex items-center gap-3">
          {[
            { label: "Minimal", color: "#1e3a2e" },
            { label: "Low", color: "#4ade80" },
            { label: "Medium", color: "#facc15" },
            { label: "High", color: "#fb923c" },
            { label: "Critical", color: "#f87171" },
          ].map(({ label, color }) => (
            <div key={label} className="flex items-center gap-1">
              <div className="w-2.5 h-2.5 rounded-sm" style={{ background: color + "50", border: `1px solid ${color}80` }} />
              <span className="font-mono text-xs" style={{ color: "var(--text-muted)", fontSize: 10 }}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div className="fixed z-50 rounded-xl p-3 shadow-2xl pointer-events-none"
          style={{
            background: "var(--surface-card)", border: "1px solid var(--surface-border)",
            left: tooltip.x + 12, top: tooltip.y - 40, minWidth: 180,
          }}>
          <p className="font-display font-semibold text-sm text-white mb-2">
            {tooltip.cell.count} risk{tooltip.cell.count > 1 ? "s" : ""} — {cellLabel(tooltip.cell._id.likelihood * tooltip.cell._id.impact)}
          </p>
          {tooltip.cell.risks.slice(0, 3).map((r) => (
            <p key={r.id.toString()} className="text-xs truncate" style={{ color: "var(--text-secondary)" }}>• {r.title}</p>
          ))}
        </div>
      )}
    </div>
  );
}
