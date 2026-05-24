import { ButtonHTMLAttributes, forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../ui/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-[var(--r-md)] font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--h-teal)] disabled:pointer-events-none disabled:opacity-[0.38]",
  {
    variants: {
      variant: {
        primary: "bg-[var(--h-navy)] text-white hover:bg-[var(--h-navy-mid)]",
        secondary: "bg-transparent border border-[var(--h-navy)] text-[var(--h-navy)] hover:bg-[var(--h-gray-100)]",
        ghost: "bg-transparent border border-[var(--h-gray-300)] text-[var(--h-gray-600)] hover:bg-[var(--h-gray-200)]",
        teal: "bg-[var(--h-teal)] text-white hover:bg-[var(--h-teal-dark)]",
        premium: "bg-gradient-to-br from-[var(--h-gold)] to-[#E8C46A] text-white hover:opacity-90",
        destructive: "bg-[var(--h-error)] text-white hover:opacity-90",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-[18px] text-sm",
        lg: "h-12 px-6 text-base",
        icon: "h-10 w-10 p-2",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface HeilsaButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const HeilsaButton = forwardRef<HTMLButtonElement, HeilsaButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

HeilsaButton.displayName = "HeilsaButton";

// Icon button variant
export const HeilsaIconButton = forwardRef<HTMLButtonElement, HeilsaButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <button
        className={cn(
          "p-2 rounded-[var(--r-md)] border border-[var(--h-gray-300)] bg-white cursor-pointer text-lg text-[var(--h-gray-600)] hover:bg-[var(--h-gray-100)] transition-colors",
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

HeilsaIconButton.displayName = "HeilsaIconButton";
