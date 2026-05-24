import { HTMLAttributes, forwardRef, ReactNode } from "react";
import { cn } from "../ui/utils";

export interface NavItem {
  icon: ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export interface HeilsaBottomNavProps extends HTMLAttributes<HTMLDivElement> {
  items: NavItem[];
}

export const HeilsaBottomNav = forwardRef<HTMLDivElement, HeilsaBottomNavProps>(
  ({ className, items, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-around py-2.5 px-0 border-t border-[var(--h-gray-300)] bg-white",
          className
        )}
        {...props}
      >
        {items.map((item, index) => (
          <button
            key={index}
            onClick={item.onClick}
            className={cn(
              "flex flex-col items-center gap-[3px] cursor-pointer p-[4px_12px] rounded-[var(--r-md)] transition-colors",
              item.active
                ? "text-[var(--h-teal-dark)]"
                : "text-[var(--h-gray-400)]"
            )}
          >
            <div className="text-[22px]">
              {item.icon}
            </div>
            <span className="text-[10px]">
              {item.label}
            </span>
          </button>
        ))}
      </div>
    );
  }
);

HeilsaBottomNav.displayName = "HeilsaBottomNav";
