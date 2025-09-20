import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { cn } from "../../lib/cn";

export default function Modal({
  open,
  onClose,
  title,
  children,
  footer,
  size = "md",
}) {
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose?.();
    }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const sizes = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[100] grid place-items-center"
      aria-modal="true"
      role="dialog">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => onClose?.()}
      />
      {/* Dialog */}
      <div
        className={cn(
          "relative mx-4 w-full rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-xl",
          sizes[size]
        )}>
        <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 p-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button
            onClick={() => onClose?.()}
            className="rounded-lg p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            aria-label="Close modal">
            ✕
          </button>
        </div>
        <div className="p-4">{children}</div>
        {footer && (
          <div className="border-t border-zinc-200 dark:border-zinc-800 p-4">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
