import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(value: number, decimals = 1): string {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(decimals)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(decimals)}K`;
  return value.toFixed(decimals);
}

export function formatCO2(tCO2: number): string {
  if (tCO2 >= 1000) return `${(tCO2 / 1000).toFixed(2)} kt CO₂e`;
  return `${tCO2.toFixed(2)} t CO₂e`;
}

export function riskLevel(score: number): { label: string; color: string; bg: string } {
  if (score >= 20) return { label: "Critical", color: "#f87171", bg: "rgba(239,68,68,0.15)" };
  if (score >= 15) return { label: "High", color: "#fb923c", bg: "rgba(249,115,22,0.15)" };
  if (score >= 8) return { label: "Medium", color: "#facc15", bg: "rgba(234,179,8,0.15)" };
  if (score >= 3) return { label: "Low", color: "#4ade80", bg: "rgba(34,197,94,0.15)" };
  return { label: "Minimal", color: "#94a3b8", bg: "rgba(148,163,184,0.15)" };
}

export function complianceColor(score: number): string {
  if (score >= 80) return "#00FF94";
  if (score >= 60) return "#facc15";
  if (score >= 40) return "#fb923c";
  return "#f87171";
}

export function formatDate(dateStr: string | Date, opts?: Intl.DateTimeFormatOptions): string {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "2-digit", month: "short", year: "numeric", ...opts,
  });
}

export function timeAgo(dateStr: string | Date): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d ago`;
  return formatDate(dateStr);
}

export const MONTH_NAMES = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

export function getMonthName(month: number): string {
  return MONTH_NAMES[month - 1] || "";
}

export const ROLE_LABELS: Record<string, string> = {
  super_admin: "Super Admin",
  admin: "Admin",
  analyst: "Analyst",
  executive: "Executive",
  supplier: "Supplier",
  employee: "Employee",
};

export const STATUS_COLORS: Record<string, string> = {
  open: "#fb923c",
  in_progress: "#60a5fa",
  mitigated: "#00FF94",
  accepted: "#94a3b8",
  closed: "#4b5563",
  compliant: "#00FF94",
  partial: "#facc15",
  non_compliant: "#f87171",
  not_applicable: "#94a3b8",
  reported: "#fb923c",
  investigating: "#60a5fa",
  contained: "#facc15",
  resolved: "#00FF94",
  planned: "#94a3b8",
  completed: "#00FF94",
  cancelled: "#f87171",
  green: "#00FF94",
  amber: "#facc15",
  red: "#f87171",
};
