import { HTMLAttributes, forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../ui/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 font-medium transition-colors border-none",
  {
    variants: {
      variant: {
        teal: "bg-[var(--h-teal-light)] text-[var(--h-teal-dark)]",
        blue: "bg-[var(--h-blue-light)] text-[var(--h-blue-dark)]",
        violet: "bg-[var(--h-violet-light)] text-[var(--h-violet-dark)]",
        gold: "bg-[var(--h-gold-light)] text-[var(--h-gold)]",
        success: "bg-[#D4F6E8] text-[var(--h-success)]",
        warning: "bg-[#FEF3CD] text-[var(--h-warning)]",
        error: "bg-[#FDEAEA] text-[var(--h-error)]",
        neutral: "bg-[var(--h-gray-200)] text-[var(--h-gray-600)] border border-[var(--h-gray-300)]",
      },
      size: {
        sm: "px-2 py-1 text-[10px]",
        md: "px-3 py-[5px] text-xs rounded-[var(--r-full)]",
        lg: "px-4 py-1.5 text-sm rounded-[var(--r-full)]",
      },
    },
    defaultVariants: {
      variant: "neutral",
      size: "md",
    },
  }
);

export interface HeilsaBadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export const HeilsaBadge = forwardRef<HTMLSpanElement, HeilsaBadgeProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <span
        className={cn(badgeVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

HeilsaBadge.displayName = "HeilsaBadge";
