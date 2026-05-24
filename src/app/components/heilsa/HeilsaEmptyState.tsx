import { HTMLAttributes, forwardRef, ReactNode } from "react";
import { cn } from "../ui/utils";

export interface HeilsaEmptyStateProps extends HTMLAttributes<HTMLDivElement> {
  icon?: ReactNode;
  title: string;
  subtitle?: string;
}

export const HeilsaEmptyState = forwardRef<HTMLDivElement, HeilsaEmptyStateProps>(
  ({ className, icon, title, subtitle, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("text-center p-8", className)}
        {...props}
      >
        {icon && (
          <div className="text-[32px] text-[var(--h-gray-300)] mb-2.5">
            {icon}
          </div>
        )}

        <div className="text-sm font-medium text-[var(--h-navy)] mb-1">
          {title}
        </div>

        {subtitle && (
          <div className="text-[13px] text-[var(--h-gray-600)]">
            {subtitle}
          </div>
        )}
      </div>
    );
  }
);

HeilsaEmptyState.displayName = "HeilsaEmptyState";
