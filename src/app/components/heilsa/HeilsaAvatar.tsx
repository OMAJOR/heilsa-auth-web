import { HTMLAttributes, forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../ui/utils";

const avatarVariants = cva(
  "inline-flex items-center justify-center rounded-full bg-gradient-to-br overflow-hidden",
  {
    variants: {
      size: {
        sm: "w-8 h-8 text-xs",
        md: "w-10 h-10 text-sm",
        lg: "w-12 h-12 text-base",
        xl: "w-16 h-16 text-lg",
      },
      color: {
        teal: "from-[var(--h-teal-light)] to-[var(--h-teal)]",
        blue: "from-[var(--h-blue-light)] to-[var(--h-blue)]",
        violet: "from-[var(--h-violet-light)] to-[var(--h-violet)]",
        gradient: "from-[var(--h-teal)] via-[var(--h-blue)] to-[var(--h-violet)]",
      },
    },
    defaultVariants: {
      size: "md",
      color: "teal",
    },
  }
);

export interface HeilsaAvatarProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarVariants> {
  src?: string;
  alt?: string;
  fallback?: string;
}

export const HeilsaAvatar = forwardRef<HTMLDivElement, HeilsaAvatarProps>(
  ({ className, size, color, src, alt, fallback, ...props }, ref) => {
    const initials = fallback?.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);

    return (
      <div
        ref={ref}
        className={cn(avatarVariants({ size, color, className }))}
        {...props}
      >
        {src ? (
          <img
            src={src}
            alt={alt || "Avatar"}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="font-medium text-white">
            {initials || "U"}
          </span>
        )}
      </div>
    );
  }
);

HeilsaAvatar.displayName = "HeilsaAvatar";
