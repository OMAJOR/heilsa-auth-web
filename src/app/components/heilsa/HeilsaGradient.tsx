import { HTMLAttributes, forwardRef } from "react";
import { cn } from "../ui/utils";

export interface HeilsaGradientProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "brand" | "gold";
  animated?: boolean;
}

export const HeilsaGradient = forwardRef<HTMLDivElement, HeilsaGradientProps>(
  ({ className, variant = "brand", animated = false, ...props }, ref) => {
    const gradientClass = variant === "brand"
      ? "bg-gradient-to-r from-[var(--h-teal)] via-[var(--h-blue)] to-[var(--h-violet)]"
      : "bg-gradient-to-r from-[var(--h-gold)] to-[#E8C46A]";

    return (
      <div
        ref={ref}
        className={cn(
          gradientClass,
          animated && "animate-gradient bg-[length:200%_auto]",
          className
        )}
        {...props}
      />
    );
  }
);

HeilsaGradient.displayName = "HeilsaGradient";

// Loading spinner component with gradient
export const HeilsaLoadingSpinner = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("inline-block", className)}
      role="status"
      aria-label="Loading"
      {...props}
    >
      <div className="w-10 h-10 rounded-full border-[3px] border-transparent bg-gradient-to-r from-[var(--h-teal)] via-[var(--h-blue)] to-[var(--h-violet)] animate-spin">
        <div className="w-full h-full rounded-full bg-[var(--h-gray-100)] scale-[0.7]" />
      </div>
    </div>
  );
});

HeilsaLoadingSpinner.displayName = "HeilsaLoadingSpinner";

// Premium badge with gold gradient
export interface HeilsaPremiumBadgeProps extends HTMLAttributes<HTMLDivElement> {
  label?: string;
}

export const HeilsaPremiumBadge = forwardRef<HTMLDivElement, HeilsaPremiumBadgeProps>(
  ({ className, label = "Premium", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center gap-1.5 px-3 py-1 rounded-[var(--r-full)]",
          "bg-gradient-to-r from-[var(--h-gold)] to-[#E8C46A]",
          "text-xs font-medium text-white",
          className
        )}
        {...props}
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 1L7.5 4.5L11 5L8.5 7.5L9 11L6 9L3 11L3.5 7.5L1 5L4.5 4.5L6 1Z" />
        </svg>
        <span>{label}</span>
      </div>
    );
  }
);

HeilsaPremiumBadge.displayName = "HeilsaPremiumBadge";
