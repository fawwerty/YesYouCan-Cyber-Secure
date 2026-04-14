"use client";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from "recharts";

interface FrameworkScore {
  name: string;
  code: string;
  complianceScore: number;
}

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl p-3 shadow-2xl"
      style={{ background: "var(--surface-card)", border: "1px solid var(--surface-border)" }}>
      <p className="font-display font-semibold text-sm text-white">{payload[0].payload.code}</p>
      <p className="font-mono text-xs mt-1" style={{ color: "var(--accent-green)" }}>
        {payload[0].value}% compliant
      </p>
    </div>
  );
};

export default function ComplianceRadar({ data }: { data: FrameworkScore[] }) {
  const chartData = data.map((d) => ({
    subject: d.code,
    score: d.complianceScore,
    fullMark: 100,
  }));

  return (
    <ResponsiveContainer width="100%" height={220}>
      <RadarChart data={chartData} margin={{ top: 0, right: 20, bottom: 0, left: 20 }}>
        <PolarGrid stroke="rgba(42,58,84,0.6)" />
        <PolarAngleAxis dataKey="subject"
          tick={{ fontSize: 11, fontFamily: "var(--font-mono)", fill: "var(--text-muted)" }} />
        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
        <Tooltip content={<CustomTooltip />} />
        <Radar name="Compliance" dataKey="score" stroke="#00FF94" fill="#00FF94" fillOpacity={0.12}
          strokeWidth={2} dot={{ fill: "#00FF94", strokeWidth: 0, r: 3 }} />
      </RadarChart>
    </ResponsiveContainer>
  );
}
