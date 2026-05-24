import { HTMLAttributes, forwardRef, ReactNode } from "react";
import { cn } from "../ui/utils";
import { HeilsaBadge } from "./HeilsaBadge";

export interface HeilsaHealthInsightCardProps extends HTMLAttributes<HTMLDivElement> {
  icon?: ReactNode;
  title: string;
  body: string;
  tagVariant?: "teal" | "blue" | "violet" | "gold";
  tagLabel?: string;
}

const iconColorMap = {
  teal: "bg-[var(--h-teal-light)] text-[var(--h-teal-dark)]",
  blue: "bg-[var(--h-blue-light)] text-[var(--h-blue-dark)]",
  violet: "bg-[var(--h-violet-light)] text-[var(--h-violet-dark)]",
  gold: "bg-[var(--h-gold-light)] text-[var(--h-gold)]",
};

export const HeilsaHealthInsightCard = forwardRef<HTMLDivElement, HeilsaHealthInsightCardProps>(
  ({ className, icon, title, body, tagVariant = "teal", tagLabel, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-[var(--r-lg)] p-4 bg-white border border-[var(--h-gray-300)]",
          className
        )}
        {...props}
      >
        <div className="flex items-center gap-2.5 mb-2.5">
          {icon && (
            <div className={cn(
              "w-9 h-9 rounded-[var(--r-md)] flex items-center justify-center text-lg flex-shrink-0",
              iconColorMap[tagVariant]
            )}>
              {icon}
            </div>
          )}
          <div className="text-sm font-medium text-[var(--h-navy)]">
            {title}
          </div>
        </div>

        <div className="text-[13px] text-[var(--h-gray-600)] leading-[1.55]">
          {body}
        </div>

        {tagLabel && (
          <HeilsaBadge variant={tagVariant} size="sm" className="mt-2">
            {tagLabel}
          </HeilsaBadge>
        )}
      </div>
    );
  }
);

HeilsaHealthInsightCard.displayName = "HeilsaHealthInsightCard";
