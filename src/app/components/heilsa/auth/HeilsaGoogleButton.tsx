import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "../../ui/utils";

export interface HeilsaGoogleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

export const HeilsaGoogleButton = forwardRef<HTMLButtonElement, HeilsaGoogleButtonProps>(
  ({ className, loading, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "w-full h-11 px-4 rounded-[var(--r-md)]",
          "bg-white border border-[var(--h-gray-300)]",
          "text-sm font-medium text-[var(--h-gray-600)]",
          "hover:bg-[var(--h-gray-100)] active:scale-[0.98]",
          "flex items-center justify-center gap-2.5",
          "transition-all disabled:opacity-[0.38] disabled:pointer-events-none",
          className
        )}
        disabled={loading}
        {...props}
      >
        {loading ? (
          <div className="w-5 h-5 border-2 border-[var(--h-gray-300)] border-t-[var(--h-navy)] rounded-full animate-spin" />
        ) : (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M19.6 10.227c0-.709-.064-1.39-.182-2.045H10v3.868h5.382a4.6 4.6 0 01-1.996 3.018v2.51h3.232c1.891-1.742 2.982-4.305 2.982-7.35z"
              fill="#4285F4"
            />
            <path
              d="M10 20c2.7 0 4.964-.895 6.618-2.423l-3.232-2.509c-.895.6-2.04.955-3.386.955-2.605 0-4.81-1.76-5.595-4.123H1.064v2.59A9.996 9.996 0 0010 20z"
              fill="#34A853"
            />
            <path
              d="M4.405 11.9c-.2-.6-.314-1.24-.314-1.9 0-.66.114-1.3.314-1.9V5.51H1.064A9.996 9.996 0 000 10c0 1.614.386 3.14 1.064 4.49l3.34-2.59z"
              fill="#FBBC05"
            />
            <path
              d="M10 3.977c1.468 0 2.786.505 3.823 1.496l2.868-2.868C14.959.99 12.695 0 10 0 6.09 0 2.71 2.24 1.064 5.51l3.34 2.59C5.192 5.736 7.396 3.977 10 3.977z"
              fill="#EA4335"
            />
          </svg>
        )}
        <span>{children || "Continue with Google"}</span>
      </button>
    );
  }
);

HeilsaGoogleButton.displayName = "HeilsaGoogleButton";
