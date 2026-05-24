import { HTMLAttributes, forwardRef } from "react";
import { cn } from "../ui/utils";
import { HeilsaButton } from "./HeilsaButton";

export interface HeilsaDateSelectorProps extends HTMLAttributes<HTMLDivElement> {
  currentDate: Date;
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  onTodayClick: () => void;
}

export const HeilsaDateSelector = forwardRef<HTMLDivElement, HeilsaDateSelectorProps>(
  ({ className, currentDate, selectedDate, onDateChange, onTodayClick, ...props }, ref) => {
    const isToday = selectedDate.toDateString() === currentDate.toDateString();

    const formatDate = (date: Date) => {
      return date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      });
    };

    const changeDate = (days: number) => {
      const newDate = new Date(selectedDate);
      newDate.setDate(newDate.getDate() + days);
      onDateChange(newDate);
    };

    return (
      <div
        ref={ref}
        className={cn("flex items-center justify-between gap-3", className)}
        {...props}
      >
        <button
          onClick={() => changeDate(-1)}
          className="p-2 rounded-[var(--r-md)] hover:bg-[var(--h-gray-200)] transition-colors text-[var(--h-gray-600)]"
          aria-label="Previous day"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 16L6 10L12 4" />
          </svg>
        </button>

        <div className="flex-1 flex flex-col items-center gap-1">
          <h2 className="text-xl font-medium text-[var(--h-navy)]">
            {formatDate(selectedDate)}
          </h2>
          {!isToday && (
            <button
              onClick={onTodayClick}
              className="text-xs text-[var(--h-teal-dark)] hover:underline"
            >
              Back to Today
            </button>
          )}
        </div>

        <button
          onClick={() => changeDate(1)}
          disabled={isToday}
          className={cn(
            "p-2 rounded-[var(--r-md)] transition-colors",
            isToday
              ? "text-[var(--h-gray-300)] cursor-not-allowed"
              : "text-[var(--h-gray-600)] hover:bg-[var(--h-gray-200)]"
          )}
          aria-label="Next day"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 4L14 10L8 16" />
          </svg>
        </button>
      </div>
    );
  }
);

HeilsaDateSelector.displayName = "HeilsaDateSelector";
