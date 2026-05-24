import { HTMLAttributes, forwardRef, ReactNode } from "react";
import { cn } from "../ui/utils";

export interface HeilsaPremiumLimitCardProps extends HTMLAttributes<HTMLDivElement> {
  icon?: ReactNode;
  title: string;
  current: number;
  max: number;
  resetInfo?: string;
}

export const HeilsaPremiumLimitCard = forwardRef<HTMLDivElement, HeilsaPremiumLimitCardProps>(
  ({ className, icon, title, current, max, resetInfo, ...props }, ref) => {
    const percentage = (current / max) * 100;
    const remaining = max - current;

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-[var(--r-lg)] p-[14px_16px] bg-white border border-[var(--h-gray-300)]",
          className
        )}
        {...props}
      >
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-2">
            {icon && (
              <div className="w-7 h-7 rounded-[var(--r-md)] bg-[var(--h-gold-light)] text-[var(--h-gold)] flex items-center justify-center text-[15px] flex-shrink-0">
                {icon}
              </div>
            )}
            <span className="text-sm font-medium text-[var(--h-navy)]">
              {title}
            </span>
          </div>
          <span className="text-[13px] text-[var(--h-gray-600)]">
            {current} / {max}
          </span>
        </div>

        <div className="h-1.5 bg-[var(--h-gray-200)] rounded-[var(--r-full)] overflow-hidden">
          <div
            className="h-full rounded-[var(--r-full)] bg-gradient-to-r from-[var(--h-gold)] to-[#E8C46A]"
            style={{ width: `${Math.min(100, percentage)}%` }}
          />
        </div>

        {resetInfo && (
          <div className="text-xs text-[var(--h-gray-600)] mt-1.5">
            {remaining} remaining · {resetInfo}
          </div>
        )}
      </div>
    );
  }
);

HeilsaPremiumLimitCard.displayName = "HeilsaPremiumLimitCard";
