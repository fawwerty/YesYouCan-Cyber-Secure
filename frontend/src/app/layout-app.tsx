"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, AlertTriangle, ShieldCheck, Leaf, BarChart3,
  Truck, ClipboardList, Zap, Users, FileText, Settings,
  Bell, ChevronLeft, ChevronRight, Shield, LogOut, Menu, X,
  Activity, Globe, Sun, Moon, CheckCircle
} from "lucide-react";
import useAuthStore from "../store/authStore";
import useThemeStore from "../store/themeStore";
import toast from "react-hot-toast";
import { useSocket } from "../hooks/useSocket";
import { cn, ROLE_LABELS } from "../lib/utils";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Risks", href: "/risks", icon: AlertTriangle },
  { label: "Compliance", href: "/compliance", icon: ShieldCheck },
  { label: "Emissions", href: "/emissions", icon: Leaf },
  { label: "ESG Analytics", href: "/esg", icon: BarChart3 },
  { label: "Suppliers", href: "/suppliers", icon: Truck },
  { label: "Audit", href: "/audit", icon: ClipboardList },
  { label: "Incidents", href: "/incidents", icon: Zap },
  { label: "Employees", href: "/employees", icon: Users },
  { label: "Reports", href: "/reports", icon: FileText },
  { label: "Authorization", href: "/admin/approvals", icon: CheckCircle, roles: ["super_admin"] },
  { label: "Admin", href: "/admin", icon: Settings, roles: ["super_admin", "admin"] },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, tenant, isAuthenticated, logout } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [notifOpen, setNotifOpen] = useState(false);
  const socket = useSocket();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login");
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (!socket) return;
    socket.on("incident:critical", (data) => {
      setNotifications((prev) => [
        { id: Date.now(), type: "critical", message: `Critical incident: ${data.incident.title}`, time: new Date() },
        ...prev.slice(0, 9),
      ]);
      toast.error(`🚨 Critical Incident: ${data.incident.title}`, { duration: 6000 });
    });
    socket.on("risk:created", (data) => {
      setNotifications((prev) => [
        { id: Date.now(), type: "risk", message: `New risk: ${data.risk.title}`, time: new Date() },
        ...prev.slice(0, 9),
      ]);
    });
    return () => {
      socket.off("incident:critical");
      socket.off("risk:created");
    };
  }, [socket]);

  if (!isAuthenticated || !user) return null;

  const visibleNav = NAV_ITEMS.filter((item) => !item.roles || item.roles.includes(user.role));

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out");
    router.push("/auth/login");
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className={cn("flex items-center gap-3 px-4 py-5 border-b", "border-[var(--surface-border)]")}
        style={{ minHeight: 72 }}>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-[var(--accent-green)]">
          <Shield size={16} className="text-black" />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.15 }}>
              <div className="font-display font-bold text-[var(--text-primary)] text-sm leading-none">YesYouCan</div>
              <div className="font-mono text-xs mt-0.5" style={{ color: theme === "light" ? "#000" : "var(--accent-green)", fontSize: 10, fontWeight: 800 }}>
                CYBER SECURE
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 space-y-0.5 px-2">
        {visibleNav.map((item, i) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          const Icon = item.icon;
          return (
            <motion.div key={item.href} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03 }}>
              <Link href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-body transition-all duration-200 group",
                  isActive ? "nav-item-active" : "hover:bg-[var(--surface-elevated)]"
                )}
                style={{ color: isActive ? "var(--accent-green)" : "var(--text-secondary)" }}
                title={collapsed ? item.label : undefined}
              >
                <Icon size={17} className="flex-shrink-0"
                  style={{ color: isActive ? "var(--accent-green)" : undefined }} />
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      transition={{ duration: 0.1 }} className="font-bold tracking-tight">
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            </motion.div>
          );
        })}
      </nav>

      {/* User area */}
      <div className="px-2 pb-3 border-t pt-3" style={{ borderColor: "var(--surface-border)" }}>
        <div className={cn("flex items-center gap-3 px-3 py-2.5 rounded-xl",
          "bg-[var(--surface-elevated)] border border-[var(--surface-border)]")}>
          <div className="w-7 h-7 rounded-lg flex-shrink-0 flex items-center justify-center font-display font-bold text-xs"
            style={{ background: "var(--surface-border)", color: "var(--text-primary)" }}>
            {user.firstName[0]}{user.lastName[0]}
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="flex-1 min-w-0">
                <div className="text-xs font-bold text-[var(--text-primary)] truncate">
                  {user.firstName} {user.lastName}
                </div>
                <div className="text-xs truncate font-semibold" style={{ color: "var(--text-muted)" }}>
                  {ROLE_LABELS[user.role]}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          {!collapsed && (
            <button onClick={handleLogout} title="Logout"
              className="flex-shrink-0 p-1 rounded transition-colors hover:text-red-400"
              style={{ color: "var(--text-muted)" }}>
              <LogOut size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className={cn("flex h-screen overflow-hidden", theme === "light" && "light")} style={{ background: "transparent" }}>
      {/* Desktop Sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 64 : 240 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className={cn("hidden md:flex flex-col flex-shrink-0 border-r relative z-20 glass-surface")}
        style={{
          borderTop: "none", borderLeft: "none", borderBottom: "none",
        }}
      >
        <SidebarContent />
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-20 w-6 h-6 rounded-full border flex items-center justify-center z-30 transition-colors shadow-sm"
          style={{ background: "var(--surface-1)", borderColor: "var(--surface-border)", color: "var(--text-secondary)" }}
        >
          {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
        </button>
      </motion.aside>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-30 bg-black/60 md:hidden"
              onClick={() => setMobileOpen(false)} />
            <motion.aside initial={{ x: -240 }} animate={{ x: 0 }} exit={{ x: -240 }}
              transition={{ duration: 0.2 }}
              className="fixed left-0 top-0 bottom-0 w-60 z-40 md:hidden border-r glass-surface">
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex-shrink-0 h-[60px] flex items-center justify-between px-4 md:px-6 border-b glass-surface"
          style={{ borderTop: "none", borderLeft: "none", borderRight: "none" }}>
          <div className="flex items-center gap-3">
            <button className="md:hidden p-2 rounded-lg" style={{ color: "var(--text-secondary)" }}
              onClick={() => setMobileOpen(true)}>
              <Menu size={20} />
            </button>
            <div className="hidden md:flex items-center gap-2">
              <Activity size={14} style={{ color: "var(--accent-green)" }} />
              <span className="font-mono text-xs" style={{ color: "var(--text-muted)" }}>
                {tenant?.name || "YesYouCan Cyber Secure"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg border border-[var(--surface-border)] hover:bg-[var(--surface-2)] transition-colors"
              style={{ color: "var(--text-secondary)" }}
              title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {/* Live status */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid var(--surface-border)" }}>
              <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--accent-green)" }} />
              <span className="font-mono text-xs" style={{ color: "var(--text-muted)" }}>LIVE</span>
            </div>

            {/* Notifications */}
            <div className="relative">
              <button onClick={() => setNotifOpen(!notifOpen)}
                className="relative p-2 rounded-lg transition-colors"
                style={{ background: "rgba(255,255,255,0.03)", color: "var(--text-secondary)" }}>
                <Bell size={16} />
                {notifications.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-xs flex items-center justify-center font-mono"
                    style={{ background: "var(--accent-green)", color: "#0A0F1E", fontSize: 9 }}>
                    {notifications.length}
                  </span>
                )}
              </button>
              <AnimatePresence>
                {notifOpen && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
                    className="absolute right-0 top-10 w-72 rounded-xl overflow-hidden z-50 shadow-2xl"
                    style={{ background: "rgba(0,0,0,0.85)", border: "1px solid var(--surface-border)", backdropFilter: "blur(20px)" }}>
                    <div className="px-4 py-3 border-b flex items-center justify-between"
                      style={{ borderColor: "var(--surface-border)" }}>
                      <span className="font-display font-bold text-sm text-[var(--text-primary)]">Notifications</span>
                      <button onClick={() => setNotifications([])} className="text-xs" style={{ color: "var(--text-muted)" }}>
                        Clear all
                      </button>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="px-4 py-6 text-center text-sm" style={{ color: "var(--text-muted)" }}>
                          No notifications
                        </div>
                      ) : notifications.map((n) => (
                        <div key={n.id} className="px-4 py-3 border-b text-sm transition-colors hover:bg-[var(--surface-elevated)]"
                          style={{ borderColor: "var(--surface-border)" }}>
                          <p style={{ color: "var(--text-primary)" }}>{n.message}</p>
                          <p className="font-mono text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                            {new Date(n.time).toLocaleTimeString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto" style={{ background: "transparent" }}>
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="h-full"
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
