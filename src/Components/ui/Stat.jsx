import React from "react";

function clsx(...c) {
  return c.filter(Boolean).join(" ");
}

/**
 * Simple stat card
 * @param {object} props
 * @param {string} props.title
 * @param {React.ReactNode} props.value
 * @param {React.ComponentType} [props.icon]   // optional icon component
 * @param {string} [props.hint]                // optional small text under value
 * @param {string} [props.className]
 */
export default function Stat({
  title,
  value,
  icon: Icon,
  hint,
  className = "",
}) {
  return (
    <div
      className={clsx(
        "rounded-2xl border border-zinc-200 dark:border-zinc-800",
        "bg-white dark:bg-zinc-950 shadow-sm p-5",
        className
      )}>
      <div className="flex items-start justify-between">
        <div>
          <div className="text-sm text-zinc-500 dark:text-zinc-400">
            {title}
          </div>
          <div className="mt-2 text-2xl font-semibold tracking-tight">
            {value}
          </div>
          {hint && (
            <div className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
              {hint}
            </div>
          )}
        </div>
        {Icon && <Icon className="h-6 w-6 text-zinc-400" />}
      </div>
    </div>
  );
}
