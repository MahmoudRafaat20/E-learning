import React, { forwardRef } from "react";
import { cn } from "../../lib/cn";

export const Label = ({ children, htmlFor, className }) => (
  <label
    htmlFor={htmlFor}
    className={cn(
      "mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300",
      className
    )}>
    {children}
  </label>
);

const base =
  "block w-full rounded-xl border bg-white dark:bg-zinc-950 " +
  "placeholder:text-zinc-400 dark:placeholder:text-zinc-500 " +
  "focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-500 " +
  "disabled:opacity-60";

export const Input = forwardRef(function Input(
  { error, className, leftIcon, rightIcon, ...props },
  ref
) {
  return (
    <div className="relative">
      {leftIcon && (
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
          {leftIcon}
        </span>
      )}
      <input
        ref={ref}
        className={cn(
          base,
          "border-zinc-300 dark:border-zinc-700",
          leftIcon && "pl-10",
          rightIcon && "pr-10",
          error && "border-red-500 focus:ring-red-500",
          "h-10 px-3"
        )}
        aria-invalid={!!error}
        {...props}
      />
      {rightIcon && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400">
          {rightIcon}
        </span>
      )}
      {typeof error === "string" && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
});

export const Textarea = forwardRef(function Textarea(
  { error, className, ...props },
  ref
) {
  return (
    <>
      <textarea
        ref={ref}
        className={cn(
          base,
          "border-zinc-300 dark:border-zinc-700 h-28 px-3 py-2",
          error && "border-red-500 focus:ring-red-500",
          className
        )}
        aria-invalid={!!error}
        {...props}
      />
      {typeof error === "string" && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </>
  );
});
