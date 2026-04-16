"use client";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn, formatNumber } from "../../lib/utils";
import { ReactNode } from "react";

// ─── KPI Card — Decision-first hierarchy ───────────────────────────────────────
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

export function KPICard({
  label, value, unit, change, icon,
  color = "var(--color-success)",
  delay = 0, formatter
}: KPICardProps) {
  const displayValue =
    typeof value === "number"
      ? formatter ? formatter(value) : formatNumber(value, 0)
      : value;

  // Trend — color-coded by purpose, not just style
  const trend =
    change === undefined ? null : {
      icon: change > 0 ? <TrendingUp size={13} /> : change < 0 ? <TrendingDown size={13} /> : <Minus size={13} />,
      color: change > 0 ? "var(--color-success)" : change < 0 ? "var(--color-danger)" : "var(--text-muted)",
      label: change > 0 ? `+${Math.abs(change)}%` : change < 0 ? `-${Math.abs(change)}%` : "No change",
    };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.3, ease: "easeOut" }}
      className="card-hover"
      style={{
        background: "var(--surface-1)",
        border: "1px solid var(--surface-border)",
        borderRadius: "12px",
        padding: "20px",
        cursor: "default",
      }}
    >
      {/* Row 1: Label (metadata, not content) + Icon */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
        <span className="label">{label}</span>
        {icon && (
          <div style={{ width: "30px", height: "30px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--surface-2)", color: "var(--text-muted)" }}>
            {icon}
          </div>
        )}
      </div>

      {/* Row 2: VALUE — dominant, unforgettable */}
      <div style={{ display: "flex", alignItems: "baseline", gap: "6px", marginBottom: "10px" }}>
        <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "32px", lineHeight: 1, color: "var(--text-primary)", letterSpacing: "-0.03em" }}>
          {displayValue}
        </span>
        {unit && (
          <span className="label" style={{ marginBottom: "2px" }}>{unit}</span>
        )}
      </div>

      {/* Row 3: Trend — actionable context */}
      {trend && (
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <span style={{ color: trend.color, display: "flex", alignItems: "center" }}>{trend.icon}</span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: trend.color, fontWeight: 600 }}>
            {trend.label}
          </span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-muted)" }}>
            vs last period
          </span>
        </div>
      )}
    </motion.div>
  );
}

// ─── Badge ────────────────────────────────────────────────────────────────────
interface BadgeProps {
  label: string;
  variant?: "green" | "amber" | "red" | "blue" | "ghost";
  size?: "sm" | "md";
}

export function Badge({ label, variant = "ghost", size = "sm" }: BadgeProps) {
  const styles: Record<string, string> = {
    green: "badge-green",
    amber: "badge-amber",
    red:   "badge-red",
    blue:  "bg-blue-500/10 text-blue-300 border border-blue-500/20",
    ghost: "border text-[var(--text-secondary)]",
  };
  const ghostStyle = variant === "ghost"
    ? { background: "var(--surface-2)", borderColor: "var(--surface-border)" }
    : {};

  return (
    <span
      className={cn("inline-flex items-center font-mono rounded font-medium", styles[variant], size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-xs")}
      style={ghostStyle}
    >
      {label}
    </span>
  );
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────
export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("skeleton rounded-lg", className)} />;
}

export function CardSkeleton() {
  return (
    <div style={{ background: "var(--surface-1)", border: "1px solid var(--surface-border)", borderRadius: "12px", padding: "20px" }} className="space-y-3">
      <Skeleton className="h-2.5 w-20" />
      <Skeleton className="h-8 w-28" />
      <Skeleton className="h-2.5 w-16" />
    </div>
  );
}

// ─── Section Header ───────────────────────────────────────────────────────────
interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  titleStyle?: React.CSSProperties;
}

export function SectionHeader({ title, subtitle, action, titleStyle }: SectionHeaderProps) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "24px" }}>
      <div>
        <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "22px", color: "var(--text-primary)", letterSpacing: "-0.01em", ...titleStyle }}>
          {title}
        </h1>
        {subtitle && (
          <p style={{ fontSize: "13px", color: "var(--text-muted)", marginTop: "4px" }}>{subtitle}</p>
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}

// ─── Circular Progress ────────────────────────────────────────────────────────
interface CircularProgressProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  label?: string;
}

export function CircularProgress({ value, size = 72, strokeWidth = 5, color = "var(--color-success)", label }: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const dash = (value / 100) * circumference;

  return (
    <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" strokeWidth={strokeWidth} stroke="var(--surface-2)" />
        <motion.circle
          cx={size / 2} cy={size / 2} r={radius} fill="none" strokeWidth={strokeWidth}
          stroke={color} strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - dash }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        />
      </svg>
      <div style={{ position: "absolute", textAlign: "center" }}>
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "13px", color: "var(--text-primary)" }}>{value}%</div>
        {label && <div className="label" style={{ fontSize: "8px", marginTop: "1px" }}>{label}</div>}
      </div>
    </div>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────
export function EmptyState({ icon, title, description }: { icon: ReactNode; title: string; description?: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "64px 24px", textAlign: "center" }}>
      <div style={{ width: "44px", height: "44px", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px", background: "var(--surface-1)", border: "1px solid var(--surface-border)", color: "var(--text-muted)" }}>
        {icon}
      </div>
      <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "15px", color: "var(--text-primary)", marginBottom: "6px" }}>{title}</h3>
      {description && <p style={{ fontSize: "13px", color: "var(--text-muted)", maxWidth: "280px", lineHeight: 1.6 }}>{description}</p>}
    </div>
  );
}
