import React from "react";
import { cn } from "../../lib/cn";

const VARIANT = {
  info: "bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-950/40 dark:text-blue-200 dark:border-blue-900",
  success:
    "bg-green-50 text-green-800 border-green-200 dark:bg-green-950/40 dark:text-green-200 dark:border-green-900",
  warning:
    "bg-yellow-50 text-yellow-900 border-yellow-200 dark:bg-yellow-950/40 dark:text-yellow-200 dark:border-yellow-900",
  danger:
    "bg-red-50 text-red-800 border-red-200 dark:bg-red-950/40 dark:text-red-200 dark:border-red-900",
};

export default function Alert({
  variant = "info",
  title,
  children,
  onClose,
  icon,
}) {
  return (
    <div
      className={cn("relative w-full rounded-xl border p-4", VARIANT[variant])}
      role="alert">
      <div className="flex items-start gap-3">
        {icon && <div className="mt-0.5">{icon}</div>}
        <div className="flex-1">
          {title && <div className="font-semibold">{title}</div>}
          {children && (
            <div className="mt-1 text-sm leading-relaxed">{children}</div>
          )}
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="rounded-lg p-1 hover:bg-black/5 dark:hover:bg-white/10"
            aria-label="Close alert">
            ✕
          </button>
        )}
      </div>
    </div>
  );
}
