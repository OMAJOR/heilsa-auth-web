import { HTMLAttributes, forwardRef, ReactNode } from "react";
import { cn } from "../ui/utils";

export interface HeilsaChatBubbleProps extends HTMLAttributes<HTMLDivElement> {
  variant: "user" | "ai";
  children: ReactNode;
  icon?: ReactNode;
}

export const HeilsaChatBubble = forwardRef<HTMLDivElement, HeilsaChatBubbleProps>(
  ({ className, variant, children, icon, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "max-w-[85%] p-[10px_14px] text-[13px] leading-[1.5]",
          variant === "ai" && "bg-[var(--h-gray-200)] rounded-[0_var(--r-lg)_var(--r-lg)_var(--r-lg)] text-[var(--h-navy)] self-start",
          variant === "user" && "bg-[var(--h-navy)] text-white rounded-[var(--r-lg)_var(--r-lg)_0_var(--r-lg)] self-end",
          className
        )}
        {...props}
      >
        {icon && variant === "ai" ? (
          <div className="flex gap-2 items-start">
            <span className="text-[var(--h-violet)] text-base flex-shrink-0">
              {icon}
            </span>
            <span>{children}</span>
          </div>
        ) : (
          children
        )}
      </div>
    );
  }
);

HeilsaChatBubble.displayName = "HeilsaChatBubble";

export const HeilsaChatWrap = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex flex-col gap-2.5", className)}
        {...props}
      />
    );
  }
);

HeilsaChatWrap.displayName = "HeilsaChatWrap";
