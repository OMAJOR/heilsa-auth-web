/**
 * Heilsa Design System Utilities
 * Helper functions and constants for the Heilsa component library
 */

// Color utilities
export const heilsaColors = {
  // Brand colors
  teal: "#3ECFB2",
  tealLight: "#D0F5EE",
  tealDark: "#0F9E82",
  blue: "#5CA8E8",
  blueLight: "#DCEFFE",
  blueDark: "#2075C4",
  violet: "#8B7CF8",
  violetLight: "#EAE8FF",
  violetDark: "#5A45C8",
  navy: "#1E2A45",
  navyMid: "#2F3E5C",
  gold: "#D4A853",
  goldLight: "#FFF3DC",

  // Status colors
  success: "#34C78A",
  warning: "#F59E0B",
  error: "#F24E4E",

  // Neutral colors
  surface: "#FFFFFF",
  background: "#F6F8FB",
  subtleBg: "#EDF0F5",
  border: "#D8DDE8",
  textMuted: "#9BA5B8",
  textBody: "#5D6880",
  textStrong: "#1E2A45",
} as const;

// Spacing constants
export const heilsaSpacing = {
  screen: 16,
  section: 24,
  card: 12,
  inner: 16,
  small: 8,
  tiny: 4,
} as const;

// Radius constants
export const heilsaRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 999,
} as const;

// Typography constants (in pixels)
export const heilsaTypography = {
  screenTitle: 28,
  sectionTitle: 20,
  cardTitle: 16,
  metric: 32,
  body: 14,
  caption: 12,
  label: 11,
} as const;

// Format health metrics
export function formatMetric(value: number, type: "steps" | "calories" | "distance" | "duration" | "heartRate" | "weight"): string {
  switch (type) {
    case "steps":
      return value.toLocaleString();
    case "calories":
      return `${value.toLocaleString()} kcal`;
    case "distance":
      return `${(value / 1000).toFixed(2)} km`;
    case "duration":
      const hours = Math.floor(value / 3600);
      const minutes = Math.floor((value % 3600) / 60);
      return `${hours}h ${minutes}m`;
    case "heartRate":
      return `${Math.round(value)} bpm`;
    case "weight":
      return `${value.toFixed(1)} kg`;
    default:
      return value.toString();
  }
}

// Calculate trend from two values
export function calculateTrend(current: number, previous: number): {
  direction: "up" | "down" | "neutral";
  percentage: number;
  value: number;
} {
  const difference = current - previous;
  const percentage = previous !== 0 ? (difference / previous) * 100 : 0;

  return {
    direction: difference > 0 ? "up" : difference < 0 ? "down" : "neutral",
    percentage: Math.abs(percentage),
    value: Math.abs(difference),
  };
}

// Format trend for display
export function formatTrend(current: number, previous: number, showPercentage: boolean = true): string {
  const { direction, percentage, value } = calculateTrend(current, previous);

  if (direction === "neutral") return "No change";

  const sign = direction === "up" ? "+" : "-";
  if (showPercentage) {
    return `${sign}${percentage.toFixed(0)}%`;
  }
  return `${sign}${value}`;
}

// Date utilities for Heilsa dashboard
export function formatDateForDashboard(date: Date): string {
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export function isToday(date: Date): boolean {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

export function isYesterday(date: Date): boolean {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return (
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear()
  );
}

export function getRelativeDateLabel(date: Date): string {
  if (isToday(date)) return "Today";
  if (isYesterday(date)) return "Yesterday";
  return formatDateForDashboard(date);
}

// Get connector status color
export function getConnectorStatusColor(
  status: "connected" | "disconnected" | "syncing" | "error" | "coming-soon"
): keyof typeof heilsaColors {
  switch (status) {
    case "connected":
      return "success";
    case "syncing":
      return "blue";
    case "error":
      return "error";
    default:
      return "textMuted";
  }
}

// Time ago formatter
export function timeAgo(date: Date): string {
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return "just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)} min ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hr ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`;
  return date.toLocaleDateString();
}

// Validate premium feature access
export function isPremiumFeature(featureName: string): boolean {
  // This would integrate with your actual subscription system
  const premiumFeatures = [
    "ai-insights",
    "advanced-analytics",
    "unlimited-connectors",
    "export-data",
    "priority-support",
  ];
  return premiumFeatures.includes(featureName);
}

// Health score calculator (example)
export function calculateHealthScore(metrics: {
  sleep?: number;
  steps?: number;
  heartRate?: number;
  calories?: number;
}): number {
  let score = 0;
  let count = 0;

  if (metrics.sleep) {
    // Ideal: 7-9 hours
    const sleepScore = metrics.sleep >= 7 && metrics.sleep <= 9 ? 100 : Math.max(0, 100 - Math.abs(8 - metrics.sleep) * 10);
    score += sleepScore;
    count++;
  }

  if (metrics.steps) {
    // Ideal: 10,000 steps
    const stepsScore = Math.min(100, (metrics.steps / 10000) * 100);
    score += stepsScore;
    count++;
  }

  if (metrics.heartRate) {
    // Ideal resting: 60-100 bpm
    const hrScore = metrics.heartRate >= 60 && metrics.heartRate <= 100 ? 100 : Math.max(0, 100 - Math.abs(80 - metrics.heartRate));
    score += hrScore;
    count++;
  }

  return count > 0 ? Math.round(score / count) : 0;
}

// Get health score color
export function getHealthScoreColor(score: number): keyof typeof heilsaColors {
  if (score >= 80) return "success";
  if (score >= 60) return "teal";
  if (score >= 40) return "warning";
  return "error";
}

// Validate connector name (prevent trademark issues)
export function getGenericConnectorName(name: string): string {
  const genericNames: Record<string, string> = {
    "Apple Health": "Health Platform (iOS)",
    "Google Fit": "Health Platform (Android)",
    "Fitbit": "Fitness Tracker",
    "Oura": "Smart Ring",
    "WHOOP": "Recovery Band",
  };
  return genericNames[name] || name;
}
