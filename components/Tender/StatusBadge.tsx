import { Check, X, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: "pending" | "rejected" | "approved";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const StatusBadge = ({ status, size = "md", className }: StatusBadgeProps) => {
  const StatusIcon = {
    pending: Clock,
    approved: Check,
    rejected: X,
  }[status];

  const statusClassName = {
    pending: "status-pending",
    approved: "status-approved",
    rejected: "status-rejected",
  }[status];

  const sizeClasses = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-2.5 py-0.5",
    lg: "text-base px-3 py-1",
  }[size];

  const iconSize = {
    sm: 12,
    md: 14,
    lg: 16,
  }[size];

  return (
    <span
      className={cn(
        "status-pill inline-flex items-center gap-1 font-medium",
        statusClassName,
        sizeClasses,
        className
      )}>
      <StatusIcon size={iconSize} />
      <span>{status.charAt(0).toUpperCase() + status.slice(1)}</span>
    </span>
  );
};

export default StatusBadge;
