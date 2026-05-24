import { InputHTMLAttributes, forwardRef, ReactNode, useState } from "react";
import { cn } from "../../ui/utils";
import { Eye, EyeOff } from "lucide-react";

export interface HeilsaAuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  leftIcon?: ReactNode;
}

export const HeilsaAuthInput = forwardRef<HTMLInputElement, HeilsaAuthInputProps>(
  ({ className, label, error, type, leftIcon, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";
    const inputType = isPassword && showPassword ? "text" : type;

    return (
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-[var(--h-navy)]">
          {label}
        </label>

        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--h-gray-600)] w-5 h-5 flex items-center justify-center">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            type={inputType}
            className={cn(
              "w-full h-11 px-3 rounded-[var(--r-md)] bg-white border border-[var(--h-gray-300)]",
              "text-sm text-[var(--h-navy)] placeholder:text-[var(--h-gray-400)]",
              "focus:outline-none focus:ring-2 focus:ring-[var(--h-teal)] focus:border-transparent",
              "transition-all",
              error && "border-[var(--h-error)] focus:ring-[var(--h-error)]",
              leftIcon && "pl-10",
              isPassword && "pr-10",
              className
            )}
            {...props}
          />

          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--h-gray-600)] hover:text-[var(--h-navy)] transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
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

HeilsaAuthInput.displayName = "HeilsaAuthInput";
