import { HTMLAttributes, forwardRef, ReactNode } from "react";
import { cn } from "../ui/utils";
import { HeilsaButton } from "./HeilsaButton";

export interface HeilsaWearableCardProps extends HTMLAttributes<HTMLDivElement> {
  icon?: ReactNode;
  name: string;
  status: "connected" | "disconnected" | "syncing" | "error";
  lastSynced?: string;
  onAction?: () => void;
  actionLabel?: string;
}

const statusConfig = {
  connected: {
    dot: "bg-[var(--h-success)]",
    text: "Connected",
    button: "Manage",
  },
  disconnected: {
    dot: "bg-[var(--h-gray-300)]",
    text: "Disconnected",
    button: "Connect",
  },
  syncing: {
    dot: "bg-[var(--h-blue)]",
    text: "Syncing...",
    button: "View",
  },
  error: {
    dot: "bg-[var(--h-error)]",
    text: "Error",
    button: "Reconnect",
  },
};

export const HeilsaWearableCard = forwardRef<HTMLDivElement, HeilsaWearableCardProps>(
  ({ className, icon, name, status, lastSynced, onAction, actionLabel, ...props }, ref) => {
    const config = statusConfig[status];

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-[var(--r-lg)] p-[14px_16px] border border-[var(--h-gray-300)] bg-white flex items-center gap-3",
          className
        )}
        {...props}
      >
        {icon && (
          <div className="w-9 h-9 rounded-[var(--r-md)] bg-[var(--h-gray-200)] flex items-center justify-center flex-shrink-0 text-[var(--h-navy)]">
            {icon}
          </div>
        )}

        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-[var(--h-navy)] mb-0.5">
            {name}
          </div>
          <div className="text-xs text-[var(--h-gray-600)] flex items-center gap-1">
            <span className={cn("w-[7px] h-[7px] rounded-full inline-block", config.dot)} />
            <span>{config.text}</span>
            {lastSynced && status === "connected" && (
              <>
                <span>·</span>
                <span>synced {lastSynced}</span>
              </>
            )}
          </div>
        </div>

        <HeilsaButton
          variant="ghost"
          size="sm"
          onClick={onAction}
        >
          {actionLabel || config.button}
        </HeilsaButton>
      </div>
    );
  }
);

HeilsaWearableCard.displayName = "HeilsaWearableCard";
