import { InputHTMLAttributes, forwardRef, ReactNode } from "react";
import { cn } from "../ui/utils";

export interface HeilsaInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export const HeilsaInput = forwardRef<HTMLInputElement, HeilsaInputProps>(
  ({ className, label, error, leftIcon, rightIcon, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label className="text-sm font-medium text-[var(--h-navy)]">
            {label}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--h-gray-600)] w-5 h-5 flex items-center justify-center">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            className={cn(
              "w-full h-11 px-3 rounded-[var(--r-md)] bg-white border border-[var(--h-gray-300)]",
              "text-sm text-[var(--h-navy)] placeholder:text-[var(--h-gray-400)]",
              "focus:outline-none focus:ring-2 focus:ring-[var(--h-teal)] focus:border-transparent",
              "transition-all",
              error && "border-[var(--h-error)] focus:ring-[var(--h-error)]",
              leftIcon && "pl-10",
              rightIcon && "pr-10",
              className
            )}
            {...props}
          />

          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--h-gray-600)] w-5 h-5 flex items-center justify-center">
              {rightIcon}
            </div>
          )}
        </div>

        {error && (
          <span className="text-xs text-[var(--h-error)]">
            {error}
          </span>
        )}
      </div>
    );
  }
);

HeilsaInput.displayName = "HeilsaInput";
