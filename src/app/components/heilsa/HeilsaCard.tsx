import { HTMLAttributes, forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../ui/utils";

const cardVariants = cva(
  "rounded-[var(--r-lg)] bg-white transition-all",
  {
    variants: {
      variant: {
        default: "border border-[var(--h-gray-300)]",
        elevated: "border border-[var(--h-gray-300)] shadow-[var(--shadow-card)]",
        flat: "border border-[var(--h-gray-300)]",
      },
      padding: {
        none: "",
        sm: "p-3",
        md: "p-[var(--spacing-card-inner)]",
        lg: "p-6",
      },
      interactive: {
        true: "cursor-pointer hover:shadow-[var(--shadow-elevated)] active:scale-[0.99]",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "md",
      interactive: false,
    },
  }
);

export interface HeilsaCardProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

export const HeilsaCard = forwardRef<HTMLDivElement, HeilsaCardProps>(
  ({ className, variant, padding, interactive, ...props }, ref) => {
    return (
      <div
        className={cn(cardVariants({ variant, padding, interactive, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

HeilsaCard.displayName = "HeilsaCard";

export const HeilsaCardHeader = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col gap-1.5 mb-3", className)}
    {...props}
  />
));
HeilsaCardHeader.displayName = "HeilsaCardHeader";

export const HeilsaCardTitle = forwardRef<
  HTMLHeadingElement,
  HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-[var(--text-card-title)] font-medium text-[var(--h-navy)]", className)}
    {...props}
  />
));
HeilsaCardTitle.displayName = "HeilsaCardTitle";

export const HeilsaCardContent = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("", className)} {...props} />
));
HeilsaCardContent.displayName = "HeilsaCardContent";
