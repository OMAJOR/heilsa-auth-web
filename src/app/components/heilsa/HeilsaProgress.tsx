import { HTMLAttributes, forwardRef } from "react";
import { cn } from "../ui/utils";

export interface HeilsaProgressProps extends HTMLAttributes<HTMLDivElement> {
  value: number; // 0-100
  max?: number;
  showLabel?: boolean;
  color?: "teal" | "blue" | "violet" | "gold" | "success" | "warning" | "error";
  size?: "sm" | "md" | "lg";
}

const colorMap = {
  teal: "bg-[var(--h-teal)]",
  blue: "bg-[var(--h-blue)]",
  violet: "bg-[var(--h-violet)]",
  gold: "bg-[var(--h-gold)]",
  success: "bg-[var(--h-success)]",
  warning: "bg-[var(--h-warning)]",
  error: "bg-[var(--h-error)]",
};

const sizeMap = {
  sm: "h-1",
  md: "h-1.5",
  lg: "h-2",
};

export const HeilsaProgress = forwardRef<HTMLDivElement, HeilsaProgressProps>(
  ({ className, value, max = 100, showLabel = false, color = "teal", size = "md", ...props }, ref) => {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100));

    return (
      <div ref={ref} className={cn("w-full", className)} {...props}>
        {showLabel && (
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-sm text-[var(--h-gray-600)]">
              Progress
            </span>
            <span className="text-sm font-medium text-[var(--h-navy)]">
              {Math.round(percentage)}%
            </span>
          </div>
        )}

        <div
          className={cn(
            "w-full rounded-[var(--r-full)] bg-[var(--h-gray-200)] overflow-hidden",
            sizeMap[size]
          )}
        >
          <div
            className={cn(
              "h-full rounded-[var(--r-full)] transition-all duration-300 ease-out",
              colorMap[color]
            )}
            style={{ width: `${percentage}%` }}
            role="progressbar"
            aria-valuenow={value}
            aria-valuemin={0}
            aria-valuemax={max}
          />
        </div>
      </div>
    );
  }
);

HeilsaProgress.displayName = "HeilsaProgress";

// Ring progress component for circular progress
export interface HeilsaRingProgressProps extends HTMLAttributes<HTMLDivElement> {
  value: number; // 0-100
  size?: number;
  strokeWidth?: number;
  color?: "teal" | "blue" | "violet" | "gold" | "success" | "warning" | "error";
  showValue?: boolean;
}

const ringColorMap = {
  teal: "var(--h-teal)",
  blue: "var(--h-blue)",
  violet: "var(--h-violet)",
  gold: "var(--h-gold)",
  success: "var(--h-success)",
  warning: "var(--h-warning)",
  error: "var(--h-error)",
};

export const HeilsaRingProgress = forwardRef<HTMLDivElement, HeilsaRingProgressProps>(
  ({ className, value, size = 80, strokeWidth = 6, color = "teal", showValue = true, ...props }, ref) => {
    const percentage = Math.min(100, Math.max(0, value));
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    return (
      <div
        ref={ref}
        className={cn("relative inline-flex items-center justify-center", className)}
        style={{ width: size, height: size }}
        {...props}
      >
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="var(--h-gray-200)"
            strokeWidth={strokeWidth}
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={ringColorMap[color]}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-300 ease-out"
          />
        </svg>

        {showValue && (
          <span className="absolute text-base font-medium text-[var(--h-navy)]">
            {Math.round(percentage)}%
          </span>
        )}
      </div>
    );
  }
);

HeilsaRingProgress.displayName = "HeilsaRingProgress";
