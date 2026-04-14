"use client";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend,
} from "recharts";
import { getMonthName } from "../../lib/utils";

interface EmissionsData {
  month: number;
  scope1: number;
  scope2: number;
  scope3: number;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  const total = payload.reduce((s: number, p: any) => s + p.value, 0);
  return (
    <div className="rounded-xl p-3 shadow-2xl"
      style={{ background: "var(--surface-card)", border: "1px solid var(--surface-border)", minWidth: 180 }}>
      <p className="font-display font-semibold text-sm text-white mb-2">{getMonthName(label)}</p>
      {payload.map((p: any) => (
        <div key={p.name} className="flex items-center justify-between gap-4 text-xs mb-1">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
            <span style={{ color: "var(--text-secondary)" }}>{p.name}</span>
          </div>
          <span className="font-mono" style={{ color: "var(--text-primary)" }}>{p.value.toFixed(1)} t</span>
        </div>
      ))}
      <div className="pt-2 mt-1 border-t flex justify-between" style={{ borderColor: "var(--surface-border)" }}>
        <span className="font-mono text-xs" style={{ color: "var(--text-muted)" }}>Total</span>
        <span className="font-mono text-xs font-semibold" style={{ color: "var(--accent-green)" }}>{total.toFixed(1)} t CO₂e</span>
      </div>
    </div>
  );
};

export default function EmissionsTrendChart({ data }: { data: EmissionsData[] }) {
  const formattedData = data.map((d) => ({ ...d, monthLabel: getMonthName(d.month) }));

  return (
    <ResponsiveContainer width="100%" height={260}>
      <AreaChart data={formattedData} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
        <defs>
          <linearGradient id="gradScope1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#f87171" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#f87171" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="gradScope2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#60a5fa" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="gradScope3" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#00FF94" stopOpacity={0.25} />
            <stop offset="95%" stopColor="#00FF94" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(42,58,84,0.5)" />
        <XAxis dataKey="monthLabel" tick={{ fontSize: 11, fontFamily: "var(--font-mono)", fill: "var(--text-muted)" }}
          axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 11, fontFamily: "var(--font-mono)", fill: "var(--text-muted)" }}
          axisLine={false} tickLine={false} width={40} />
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--text-muted)", paddingTop: 8 }} />
        <Area type="monotone" dataKey="scope1" name="Scope 1" stroke="#f87171" strokeWidth={2}
          fill="url(#gradScope1)" dot={false} activeDot={{ r: 4, fill: "#f87171" }} />
        <Area type="monotone" dataKey="scope2" name="Scope 2" stroke="#60a5fa" strokeWidth={2}
          fill="url(#gradScope2)" dot={false} activeDot={{ r: 4, fill: "#60a5fa" }} />
        <Area type="monotone" dataKey="scope3" name="Scope 3" stroke="#00FF94" strokeWidth={2}
          fill="url(#gradScope3)" dot={false} activeDot={{ r: 4, fill: "#00FF94" }} />
      </AreaChart>
    </ResponsiveContainer>
  );
}
