"use client";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn, formatNumber } from "../../lib/utils";
import { ReactNode } from "react";

// ─── KPI Card ───────────────────────────────────────────────────────────────
interface KPICardProps {
  label: string;
  value: number | string;
  unit?: string;
  change?: number;
  icon?: ReactNode;
  color?: string;
  delay?: number;
  formatter?: (v: number) => string;
}

export function KPICard({ label, value, unit, change, icon, color = "#00FF94", delay = 0, formatter }: KPICardProps) {
  const displayValue = typeof value === "number" ? (formatter ? formatter(value) : formatNumber(value, 0)) : value;
  const trendIcon = change === undefined ? null : change > 0 ? <TrendingUp size={12} /> : change < 0 ? <TrendingDown size={12} /> : <Minus size={12} />;
  const trendColor = change === undefined ? undefined : change > 0 ? "#4ade80" : change < 0 ? "#f87171" : "#94a3b8";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease: "easeOut" }}
      className="glass-card rounded-2xl p-5 relative overflow-hidden group hover:border-opacity-80 transition-all duration-300"
      style={{ borderColor: `${color}22` }}
    >
      {/* Glow spot */}
      <div className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(circle at center, ${color}18 0%, transparent 70%)`, transform: "translate(30%, -30%)" }} />

      <div className="flex items-start justify-between mb-3">
        <span className="font-mono text-xs uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>{label}</span>
        {icon && (
          <div className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: `${color}18`, color }}>
            {icon}
          </div>
        )}
      </div>

      <div className="flex items-end gap-2">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + 0.2, duration: 0.6 }}
          className="font-display font-bold text-3xl leading-none"
          style={{ color: "var(--text-primary)" }}
        >
          {displayValue}
        </motion.span>
        {unit && <span className="font-mono text-xs mb-1" style={{ color: "var(--text-muted)" }}>{unit}</span>}
      </div>

      {change !== undefined && (
        <div className="flex items-center gap-1 mt-2">
          <span style={{ color: trendColor }}>{trendIcon}</span>
          <span className="font-mono text-xs" style={{ color: trendColor }}>
            {Math.abs(change)}% vs last period
          </span>
        </div>
      )}
    </motion.div>
  );
}

// ─── Badge ───────────────────────────────────────────────────────────────────
interface BadgeProps {
  label: string;
  variant?: "green" | "amber" | "red" | "blue" | "ghost";
  size?: "sm" | "md";
}

export function Badge({ label, variant = "ghost", size = "sm" }: BadgeProps) {
  const styles: Record<string, string> = {
    green: "badge-green",
    amber: "badge-amber",
    red: "badge-red",
    blue: "bg-blue-500/15 text-blue-300 border border-blue-500/30",
    ghost: "bg-[var(--surface-elevated)] text-[var(--text-secondary)] border border-[var(--surface-border)]",
  };
  return (
    <span className={cn("inline-flex items-center font-mono rounded-md font-medium", styles[variant],
      size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-xs")}>
      {label}
    </span>
  );
}

// ─── Skeleton ────────────────────────────────────────────────────────────────
export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("skeleton rounded-lg", className)} />;
}

export function CardSkeleton() {
  return (
    <div className="glass-card rounded-2xl p-5 space-y-3">
      <Skeleton className="h-3 w-24" />
      <Skeleton className="h-8 w-32" />
      <Skeleton className="h-3 w-20" />
    </div>
  );
}

// ─── Section Header ───────────────────────────────────────────────────────────
interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}

export function SectionHeader({ title, subtitle, action }: SectionHeaderProps) {
  return (
    <div className="flex items-start justify-between mb-6">
      <div>
        <h1 className="font-display font-bold text-2xl text-white">{title}</h1>
        {subtitle && <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}

// ─── Circular Progress ───────────────────────────────────────────────────────
interface CircularProgressProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  label?: string;
}

export function CircularProgress({ value, size = 80, strokeWidth = 6, color = "#00FF94", label }: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const dash = (value / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" strokeWidth={strokeWidth}
          stroke="rgba(42,58,84,0.8)" />
        <motion.circle
          cx={size / 2} cy={size / 2} r={radius} fill="none" strokeWidth={strokeWidth}
          stroke={color} strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - dash }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
        />
      </svg>
      <div className="absolute text-center">
        <div className="font-display font-bold text-sm" style={{ color: "var(--text-primary)" }}>{value}%</div>
        {label && <div className="font-mono text-xs" style={{ color: "var(--text-muted)", fontSize: 9 }}>{label}</div>}
      </div>
    </div>
  );
}

// ─── Empty State ─────────────────────────────────────────────────────────────
export function EmptyState({ icon, title, description }: { icon: ReactNode; title: string; description?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
        style={{ background: "var(--surface-elevated)", color: "var(--text-muted)" }}>
        {icon}
      </div>
      <h3 className="font-display font-semibold text-white mb-1">{title}</h3>
      {description && <p className="text-sm max-w-xs" style={{ color: "var(--text-secondary)" }}>{description}</p>}
    </div>
  );
}
