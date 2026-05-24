import { useNavigate } from "react-router-dom";
import { Home, Scan, Activity, MessageSquare, User as UserIcon, LogOut } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useAuth } from "../../../lib/auth-context";

const C = {
  card: "#FFFFFF",
  primary: "#38BDF8",
  primaryDk: "#0EA5E9",
  text: "#0F172A",
  muted: "#64748B",
  border: "#CBD5E1",
  green: "#22C55E",
};

export type SidebarKey = "home" | "scan" | "health" | "chat" | "profile";

type NavItem = { key: SidebarKey; icon: LucideIcon; label: string; path: string };

const NAV: NavItem[] = [
  { key: "home", icon: Home, label: "Home", path: "/dashboard" },
  { key: "scan", icon: Scan, label: "Scan", path: "/scan" },
  { key: "health", icon: Activity, label: "Health", path: "/health" },
  { key: "chat", icon: MessageSquare, label: "AI Chat", path: "/chat" },
  { key: "profile", icon: UserIcon, label: "Profile", path: "/profile" },
];

function md(user: ReturnType<typeof useAuth>["user"]) {
  return (user?.user_metadata ?? {}) as Record<string, unknown>;
}

export function displayName(user: ReturnType<typeof useAuth>["user"]) {
  if (!user) return "there";
  const m = md(user);
  const first = (m.first_name as string) || (m.firstName as string);
  if (first) return first;
  const full = (m.full_name as string) || (m.name as string);
  if (full) return full.split(" ")[0];
  if (user.email) return user.email.split("@")[0];
  return "there";
}

export function fullName(user: ReturnType<typeof useAuth>["user"]) {
  if (!user) return "";
  const m = md(user);
  const first = (m.first_name as string) || (m.firstName as string) || "";
  const last = (m.last_name as string) || (m.lastName as string) || "";
  if (first || last) return `${first} ${last}`.trim();
  const full = (m.full_name as string) || (m.name as string);
  return full || user.email || "";
}

export function initials(user: ReturnType<typeof useAuth>["user"]) {
  if (!user) return "··";
  const m = md(user);
  const first = (m.first_name as string) || (m.firstName as string) || "";
  const last = (m.last_name as string) || (m.lastName as string) || "";
  if (first || last) return ((first[0] ?? "") + (last[0] ?? "")).toUpperCase() || "··";
  const full = (m.full_name as string) || (m.name as string) || "";
  if (full) {
    const parts = full.split(" ").filter(Boolean);
    return ((parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "")).toUpperCase() || "··";
  }
  return (user.email?.slice(0, 2) ?? "··").toUpperCase();
}

export function AppSidebar({
  active,
  footer,
  chatHistory,
}: {
  active: SidebarKey;
  footer?: "default" | "compact";
  chatHistory?: string[];
}) {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const useCompact = footer === "compact";

  return (
    <div
      style={{
        width: 200,
        background: C.card,
        borderRight: `1px solid ${C.border}`,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        padding: "20px 0",
        flexShrink: 0,
      }}
    >
      <div style={{ padding: "0 16px 24px", display: "flex", alignItems: "center", gap: 10 }}>
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 9,
            background: `linear-gradient(135deg,${C.primary},${C.primaryDk})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
        </div>
        <span style={{ fontSize: 16, fontWeight: 700, color: C.text }}>Heilsa</span>
      </div>

      <div style={{ padding: "0 8px" }}>
        {NAV.map(({ key, icon: Icon, label, path }) => {
          const isActive = key === active;
          return (
            <div
              key={key}
              onClick={() => navigate(path)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 12px",
                borderRadius: 10,
                background: isActive ? "#EFF8FF" : "transparent",
                marginBottom: 2,
                cursor: "pointer",
              }}
            >
              <Icon size={18} color={isActive ? C.primaryDk : C.muted} />
              <span
                style={{
                  fontSize: 14,
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? C.primaryDk : C.muted,
                }}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>

      {chatHistory && chatHistory.length > 0 && (
        <div
          style={{
            padding: "16px 12px 0",
            borderTop: `1px solid ${C.border}`,
            marginTop: 16,
          }}
        >
          <div
            style={{
              fontSize: 10,
              fontWeight: 600,
              color: C.muted,
              textTransform: "uppercase",
              letterSpacing: 1,
              marginBottom: 8,
              padding: "0 8px",
            }}
          >
            Chat History
          </div>
          {chatHistory.map((h) => (
            <div
              key={h}
              style={{
                padding: "8px 10px",
                borderRadius: 8,
                cursor: "pointer",
                fontSize: 12,
                color: C.muted,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {h}
            </div>
          ))}
        </div>
      )}

      <div style={{ flex: 1 }} />

      <div style={{ padding: "12px 16px", borderTop: `1px solid ${C.border}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <div
            style={{
              width: useCompact ? 30 : 32,
              height: useCompact ? 30 : 32,
              borderRadius: "50%",
              background: C.primary,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <span style={{ color: "#fff", fontSize: useCompact ? 11 : 13, fontWeight: 700 }}>
              {initials(user)}
            </span>
          </div>
          <div style={{ minWidth: 0 }}>
            <div
              style={{
                fontSize: useCompact ? 12 : 13,
                fontWeight: 600,
                color: C.text,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: 110,
              }}
            >
              {fullName(user) || "Heilsa member"}
            </div>
            <div style={{ fontSize: useCompact ? 10 : 11, color: C.muted }}>
              {useCompact ? "Premium Member" : "Pro Member"}
            </div>
          </div>
        </div>
        {!useCompact && (
          <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: C.green }} />
            <span style={{ fontSize: 11, color: C.muted }}>Syncing · Apple Health</span>
          </div>
        )}
        <button
          onClick={() => signOut()}
          style={{
            marginTop: 12,
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            padding: "8px 10px",
            borderRadius: 8,
            background: "transparent",
            border: `1px solid ${C.border}`,
            cursor: "pointer",
            color: C.muted,
            fontSize: 12,
            fontWeight: 500,
            fontFamily: "inherit",
          }}
        >
          <LogOut size={13} />
          Sign out
        </button>
      </div>
    </div>
  );
}
