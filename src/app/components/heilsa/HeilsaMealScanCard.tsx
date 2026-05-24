import { HTMLAttributes, forwardRef, ReactNode } from "react";
import { cn } from "../ui/utils";
import { HeilsaCard } from "./HeilsaCard";
import { HeilsaMetricCard } from "./HeilsaMetricCard";

export interface MacroData {
  protein: number;
  carbs: number;
  fat: number;
}

export interface HeilsaMealScanCardProps extends HTMLAttributes<HTMLDivElement> {
  icon?: ReactNode;
  mealName: string;
  timestamp: string;
  calories: number;
  macros: MacroData;
}

export const HeilsaMealScanCard = forwardRef<HTMLDivElement, HeilsaMealScanCardProps>(
  ({ className, icon, mealName, timestamp, calories, macros, ...props }, ref) => {
    return (
      <HeilsaCard
        ref={ref}
        variant="elevated"
        className={cn("", className)}
        {...props}
      >
        <div className="flex items-center gap-2.5 mb-3">
          {icon && (
            <div className="w-9 h-9 rounded-[var(--r-md)] bg-[var(--h-teal-light)] text-[var(--h-teal-dark)] flex items-center justify-center flex-shrink-0">
              {icon}
            </div>
          )}
          <div className="flex-1">
            <div className="text-sm font-medium text-[var(--h-navy)]">
              {mealName}
            </div>
            <div className="text-xs text-[var(--h-gray-600)]">
              Scanned today · {timestamp}
            </div>
          </div>
          <div className="text-xl font-medium text-[var(--h-navy)]">
            {calories}
            <span className="text-xs text-[var(--h-gray-600)] ml-0.5">kcal</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div className="bg-[var(--h-gray-200)] rounded-[var(--r-md)] p-2 text-center">
            <div className="text-[11px] text-[var(--h-gray-600)] mb-0.5">
              Protein
            </div>
            <div className="text-base font-medium text-[var(--h-teal-dark)]">
              {macros.protein}g
            </div>
          </div>
          <div className="bg-[var(--h-gray-200)] rounded-[var(--r-md)] p-2 text-center">
            <div className="text-[11px] text-[var(--h-gray-600)] mb-0.5">
              Carbs
            </div>
            <div className="text-base font-medium text-[var(--h-blue-dark)]">
              {macros.carbs}g
            </div>
          </div>
          <div className="bg-[var(--h-gray-200)] rounded-[var(--r-md)] p-2 text-center">
            <div className="text-[11px] text-[var(--h-gray-600)] mb-0.5">
              Fat
            </div>
            <div className="text-base font-medium text-[var(--h-violet-dark)]">
              {macros.fat}g
            </div>
          </div>
        </div>
      </HeilsaCard>
    );
  }
);

HeilsaMealScanCard.displayName = "HeilsaMealScanCard";
