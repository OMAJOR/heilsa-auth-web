import { HTMLAttributes, forwardRef, ReactNode } from "react";
import { cn } from "../ui/utils";

export interface HeilsaMetricCardProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string | number;
  unit?: string;
  trend?: ReactNode;
  trendUp?: boolean;
  trendDown?: boolean;
}

export const HeilsaMetricCard = forwardRef<HTMLDivElement, HeilsaMetricCardProps>(
  ({ className, label, value, unit, trend, trendUp, trendDown, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "bg-[var(--h-gray-200)] rounded-[var(--r-md)] p-[14px_16px]",
          className
        )}
        {...props}
      >
        <div className="text-xs text-[var(--h-gray-600)] mb-1">
          {label}
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-[26px] font-medium text-[var(--h-navy)] leading-none">
            {value}
          </span>
          {unit && (
            <span className="text-[13px] text-[var(--h-gray-600)]">
              {unit}
            </span>
          )}
        </div>
        {trend && (
          <div className={cn(
            "text-xs mt-[5px]",
            trendUp && "text-[var(--h-success)]",
            trendDown && "text-[var(--h-error)]",
            !trendUp && !trendDown && "text-[var(--h-gray-600)]"
          )}>
            {trend}
          </div>
        )}
      </div>
    );
  }
);

HeilsaMetricCard.displayName = "HeilsaMetricCard";
