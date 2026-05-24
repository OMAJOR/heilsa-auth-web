import { useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import {
  Home,
  Scan,
  Activity,
  MessageSquare,
  User,
  RefreshCw,
  Bell,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  LogOut,
} from "lucide-react";
import { useAuth } from "../../lib/auth-context";

const C = {
  bg: "#F0F9FF",
  card: "#FFFFFF",
  primary: "#38BDF8",
  primaryDk: "#0EA5E9",
  text: "#0F172A",
  muted: "#64748B",
  border: "#CBD5E1",
  green: "#22C55E",
  shadow: "0 4px 20px rgba(14,165,233,0.08)",
  sidebarBg: "#FFFFFF",
};

const sleepData = [
  { t: "10pm", deep: 0, rem: 0, light: 0.3, awake: 0 },
  { t: "11pm", deep: 0.8, rem: 0, light: 1.2, awake: 0 },
  { t: "1am", deep: 1.4, rem: 0.6, light: 0.8, awake: 0 },
  { t: "3am", deep: 0.6, rem: 1.2, light: 0.4, awake: 0 },
  { t: "5am", deep: 0.2, rem: 0.8, light: 1.0, awake: 0.1 },
  { t: "7am", deep: 0, rem: 0.4, light: 0.6, awake: 0 },
];

const stepsData = [
  { d: "Mon", steps: 7200 },
  { d: "Tue", steps: 9100 },
  { d: "Wed", steps: 6800 },
  { d: "Thu", steps: 11200 },
  { d: "Fri", steps: 8240 },
  { d: "Sat", steps: 5400 },
  { d: "Sun", steps: 3100 },
];

function getDateStrip(today: Date) {
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const days = [];
  const start = new Date(today);
  start.setDate(today.getDate() - 4);
  for (let i = 0; i < 7; i++) {
    const date = new Date(start);
    date.setDate(start.getDate() + i);
    days.push({
      d: dayNames[date.getDay()],
      n: date.getDate(),
      today: date.toDateString() === today.toDateString(),
    });
  }
  return days;
}

function displayName(user: { email?: string | null; user_metadata?: Record<string, unknown> } | null) {
  if (!user) return "there";
  const md = (user.user_metadata ?? {}) as Record<string, unknown>;
  const first = (md.first_name as string) || (md.firstName as string);
  if (first) return first;
  const full = (md.full_name as string) || (md.name as string);
  if (full) return full.split(" ")[0];
  if (user.email) return user.email.split("@")[0];
  return "there";
}

function initials(user: { email?: string | null; user_metadata?: Record<string, unknown> } | null) {
  if (!user) return "··";
  const md = (user.user_metadata ?? {}) as Record<string, unknown>;
  const first = (md.first_name as string) || (md.firstName as string) || "";
  const last = (md.last_name as string) || (md.lastName as string) || "";
  if (first || last) return ((first[0] ?? "") + (last[0] ?? "")).toUpperCase() || "··";
  const full = (md.full_name as string) || (md.name as string) || "";
  if (full) {
    const parts = full.split(" ").filter(Boolean);
    return ((parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "")).toUpperCase() || "··";
  }
  return (user.email?.slice(0, 2) ?? "··").toUpperCase();
}

function fullName(user: { email?: string | null; user_metadata?: Record<string, unknown> } | null) {
  if (!user) return "";
  const md = (user.user_metadata ?? {}) as Record<string, unknown>;
  const first = (md.first_name as string) || (md.firstName as string) || "";
  const last = (md.last_name as string) || (md.lastName as string) || "";
  if (first || last) return `${first} ${last}`.trim();
  const full = (md.full_name as string) || (md.name as string);
  return full || user.email || "";
}

function Sidebar({
  onSignOut,
  user,
}: {
  onSignOut: () => void;
  user: ReturnType<typeof useAuth>["user"];
}) {
  const nav = [
    { icon: Home, label: "Home", active: true },
    { icon: Scan, label: "Scan" },
    { icon: Activity, label: "Health" },
    { icon: MessageSquare, label: "AI Chat" },
    { icon: User, label: "Profile" },
  ];
  return (
    <div
      style={{
        width: 200,
        background: C.sidebarBg,
        borderRight: `1px solid ${C.border}`,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        padding: "20px 0",
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
      <div style={{ flex: 1, padding: "0 8px" }}>
        {nav.map(({ icon: Icon, label, active }) => (
          <div
            key={label}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 12px",
              borderRadius: 10,
              background: active ? "#EFF8FF" : "transparent",
              marginBottom: 2,
              cursor: "pointer",
            }}
          >
            <Icon size={18} color={active ? C.primaryDk : C.muted} />
            <span
              style={{
                fontSize: 14,
                fontWeight: active ? 600 : 400,
                color: active ? C.primaryDk : C.muted,
              }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
      <div style={{ padding: "12px 16px", borderTop: `1px solid ${C.border}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: C.primary,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ color: "#fff", fontSize: 13, fontWeight: 700 }}>{initials(user)}</span>
          </div>
          <div style={{ minWidth: 0 }}>
            <div
              style={{
                fontSize: 13,
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
            <div style={{ fontSize: 11, color: C.muted }}>Pro Member</div>
          </div>
        </div>
        <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: C.green }} />
          <span style={{ fontSize: 11, color: C.muted }}>Syncing · Apple Health</span>
        </div>
        <button
          onClick={onSignOut}
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

function MetricCard({
  label,
  value,
  unit,
  source,
  trend,
  trendUp,
}: {
  label: string;
  value: string;
  unit: string;
  source: string;
  trend?: string;
  trendUp?: boolean;
}) {
  return (
    <div
      style={{
        background: C.card,
        borderRadius: 16,
        padding: "16px 18px",
        boxShadow: C.shadow,
        border: `1px solid ${C.border}`,
      }}
    >
      <div style={{ fontSize: 12, fontWeight: 500, color: C.muted, marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 26, fontWeight: 700, color: C.text, lineHeight: 1 }}>
        {value} <span style={{ fontSize: 13, fontWeight: 500, color: C.muted }}>{unit}</span>
      </div>
      {trend && (
        <div style={{ fontSize: 11, color: trendUp ? C.green : "#EF4444", marginTop: 4 }}>
          {trendUp ? "↑" : "↓"} {trend}
        </div>
      )}
      <div
        style={{
          fontSize: 10,
          color: C.muted,
          marginTop: 6,
          display: "flex",
          alignItems: "center",
          gap: 4,
        }}
      >
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: C.border,
            display: "inline-block",
          }}
        />
        Source: {source}
      </div>
    </div>
  );
}

export const Dashboard = () => {
  const { user, signOut } = useAuth();
  const today = useMemo(() => new Date(), []);
  const days = useMemo(() => getDateStrip(today), [today]);
  const [selectedDay, setSelectedDay] = useState(() => days.findIndex((d) => d.today));
  const dateLabel = today.toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const greeting = (() => {
    const h = today.getHours();
    if (h < 12) return "Good morning";
    if (h < 18) return "Good afternoon";
    return "Good evening";
  })();

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        background: C.bg,
        overflow: "hidden",
      }}
    >
      <Sidebar onSignOut={() => signOut()} user={user} />

      {/* Main */}
      <div style={{ flex: 1, overflow: "auto", padding: 28 }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 20,
          }}
        >
          <div>
            <div style={{ fontSize: 12, color: C.muted, marginBottom: 2 }}>{dateLabel}</div>
            <h1 style={{ fontSize: 24, fontWeight: 700, color: C.text, margin: 0 }}>
              {greeting}, {displayName(user)}
            </h1>
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <button
              style={{
                padding: "7px 14px",
                borderRadius: 8,
                background: C.card,
                border: `1px solid ${C.border}`,
                fontSize: 13,
                fontWeight: 500,
                color: C.primaryDk,
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              Today
            </button>
            <Bell size={18} color={C.muted} style={{ cursor: "pointer" }} />
            <RefreshCw size={16} color={C.muted} style={{ cursor: "pointer" }} />
          </div>
        </div>

        {/* Date strip */}
        <div
          style={{
            display: "flex",
            gap: 6,
            marginBottom: 22,
            background: C.card,
            padding: 8,
            borderRadius: 14,
            boxShadow: C.shadow,
            border: `1px solid ${C.border}`,
            width: "fit-content",
          }}
        >
          <ChevronLeft size={16} color={C.muted} style={{ alignSelf: "center", cursor: "pointer" }} />
          {days.map((d, i) => (
            <div
              key={i}
              onClick={() => setSelectedDay(i)}
              style={{
                width: 48,
                padding: "8px 4px",
                borderRadius: 10,
                background:
                  i === selectedDay
                    ? `linear-gradient(135deg,${C.primary},${C.primaryDk})`
                    : "transparent",
                textAlign: "center",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  color: i === selectedDay ? "rgba(255,255,255,0.8)" : C.muted,
                  marginBottom: 2,
                }}
              >
                {d.d}
              </div>
              <div
                style={{
                  fontSize: 15,
                  fontWeight: 600,
                  color: i === selectedDay ? "#fff" : C.text,
                }}
              >
                {d.n}
              </div>
              {d.today && i !== selectedDay && (
                <div
                  style={{
                    width: 4,
                    height: 4,
                    borderRadius: "50%",
                    background: C.primary,
                    margin: "3px auto 0",
                  }}
                />
              )}
            </div>
          ))}
          <ChevronRight size={16} color={C.muted} style={{ alignSelf: "center", cursor: "pointer" }} />
        </div>

        {/* AI Insight */}
        <div
          style={{
            background: "linear-gradient(135deg,#EFF8FF,#DBEAFE)",
            border: `1px solid ${C.primary}30`,
            borderRadius: 14,
            padding: "14px 18px",
            marginBottom: 22,
            display: "flex",
            gap: 12,
            alignItems: "flex-start",
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 9,
              background: `linear-gradient(135deg,${C.primary},${C.primaryDk})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Sparkles size={15} color="#fff" />
          </div>
          <div>
            <div
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: C.primaryDk,
                marginBottom: 3,
              }}
            >
              Heilsa Insight
            </div>
            <div style={{ fontSize: 13, color: "#1E40AF" }}>
              Your HRV is up 12% this week — recovery looks strong. Sleep deep-sleep improved by 18
              min vs your 7-day average.
            </div>
          </div>
        </div>

        {/* Metric grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: 14,
            marginBottom: 24,
          }}
        >
          <MetricCard
            label="Recovery"
            value="82"
            unit="/ 100"
            source="Apple Health"
            trend="6 pts vs yesterday"
            trendUp
          />
          <MetricCard
            label="Sleep"
            value="7.4"
            unit="h"
            source="Apple Watch"
            trend="18 min above avg"
            trendUp
          />
          <MetricCard
            label="Steps"
            value="8,240"
            unit="steps"
            source="iPhone"
            trend="Goal: 10,000"
          />
          <MetricCard
            label="Resting HR"
            value="58"
            unit="bpm"
            source="Apple Watch"
            trend="−2 from baseline"
            trendUp
          />
          <MetricCard
            label="HRV"
            value="68"
            unit="ms"
            source="Apple Watch"
            trend="↑12% this week"
            trendUp
          />
          <MetricCard label="Active Cal" value="487" unit="kcal" source="Apple Watch" />
          <MetricCard
            label="Nutrition"
            value="1,840"
            unit="/ 2,200 kcal"
            source="AI Meal Scan"
          />
          <MetricCard label="Hydration" value="1.6" unit="/ 3.0 L" source="Manual entry" />
        </div>

        {/* Charts row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div
            style={{
              background: C.card,
              borderRadius: 16,
              padding: 20,
              boxShadow: C.shadow,
              border: `1px solid ${C.border}`,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: C.text }}>Sleep Stages</div>
              <div style={{ fontSize: 11, color: C.muted }}>Source: Apple Watch</div>
            </div>
            <div style={{ fontSize: 12, color: C.muted, marginBottom: 14 }}>
              Last night · 7h 24min total
            </div>
            <ResponsiveContainer width="100%" height={140}>
              <BarChart data={sleepData} barSize={18}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis
                  dataKey="t"
                  tick={{ fontSize: 10, fill: C.muted }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis hide />
                <Tooltip
                  contentStyle={{ fontSize: 12, borderRadius: 8, border: `1px solid ${C.border}` }}
                />
                <Bar dataKey="deep" stackId="a" fill="#0EA5E9" name="Deep" />
                <Bar dataKey="rem" stackId="a" fill="#8B5CF6" name="REM" />
                <Bar dataKey="light" stackId="a" fill="#BAE6FD" name="Light" />
                <Bar dataKey="awake" stackId="a" fill="#F1F5F9" name="Awake" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div style={{ display: "flex", gap: 14, marginTop: 10 }}>
              {[
                ["#0EA5E9", "Deep", "1.2h"],
                ["#8B5CF6", "REM", "1.8h"],
                ["#BAE6FD", "Light", "3.4h"],
                ["#F1F5F9", "Awake", "1.0h"],
              ].map(([col, lbl, val]) => (
                <div key={lbl} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: 2,
                      background: col,
                      border: lbl === "Awake" ? `1px solid ${C.border}` : "none",
                    }}
                  />
                  <span style={{ fontSize: 10, color: C.muted }}>
                    {lbl} <b style={{ color: C.text }}>{val}</b>
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              background: C.card,
              borderRadius: 16,
              padding: 20,
              boxShadow: C.shadow,
              border: `1px solid ${C.border}`,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: C.text }}>Steps This Week</div>
              <div style={{ fontSize: 11, color: C.muted }}>Source: iPhone</div>
            </div>
            <div style={{ fontSize: 12, color: C.muted, marginBottom: 14 }}>
              Goal: 10,000 steps/day
            </div>
            <ResponsiveContainer width="100%" height={140}>
              <BarChart data={stepsData} barSize={22}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis
                  dataKey="d"
                  tick={{ fontSize: 10, fill: C.muted }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis hide />
                <Tooltip
                  contentStyle={{ fontSize: 12, borderRadius: 8, border: `1px solid ${C.border}` }}
                  formatter={(v: number) => [v.toLocaleString(), "Steps"]}
                />
                <Bar dataKey="steps" fill={C.primary} radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Right rail */}
      <div
        style={{
          width: 240,
          background: C.card,
          borderLeft: `1px solid ${C.border}`,
          padding: 20,
          overflow: "auto",
        }}
      >
        <div style={{ fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 14 }}>
          Today's Timeline
        </div>
        {[
          { time: "8:00 AM", label: "Morning Meds", sub: "Vitamin D3, Omega-3", done: true },
          { time: "10:00 AM", label: "Workout", sub: "Strength · 45 min", done: true },
          { time: "1:00 PM", label: "Lunch", sub: "Logged via AI Scan", done: true },
          { time: "3:00 PM", label: "Walk", sub: "3,200 steps", done: false },
          { time: "9:00 PM", label: "Evening Meds", sub: "Magnesium 400mg", done: false },
        ].map((item) => (
          <div key={item.time} style={{ display: "flex", gap: 10, marginBottom: 14 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: item.done ? C.primaryDk : C.border,
                  flexShrink: 0,
                }}
              />
              <div style={{ width: 1, height: 28, background: C.border }} />
            </div>
            <div style={{ paddingBottom: 4 }}>
              <div style={{ fontSize: 11, color: C.muted }}>{item.time}</div>
              <div style={{ fontSize: 13, fontWeight: 500, color: C.text }}>{item.label}</div>
              <div style={{ fontSize: 11, color: C.muted }}>{item.sub}</div>
            </div>
          </div>
        ))}

        <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 16, marginTop: 4 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 12 }}>
            Device Sync
          </div>
          {[
            ["Apple Health", "Synced · 4 min ago"],
            ["Apple Watch", "Synced · 4 min ago"],
            ["Withings Scale", "Synced · 9 am"],
          ].map(([name, status]) => (
            <div
              key={name}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <span style={{ fontSize: 12, color: C.text }}>{name}</span>
              <span style={{ fontSize: 10, color: C.green, fontWeight: 500 }}>
                {status.split("·")[0]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
