import { cn } from "../../lib/cn";

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 " +
  "disabled:opacity-50 disabled:pointer-events-none ring-offset-white dark:ring-offset-zinc-900";

const variants = {
  solid:
    "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200",
  primary: "bg-blue-600 text-white hover:bg-blue-500",
  ghost: "bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800",
  outline:
    "border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100/60 dark:hover:bg-zinc-800/60",
  danger: "bg-red-600 text-white hover:bg-red-500",
};

const sizes = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-5 text-base",
  icon: "h-10 w-10 p-0",
};

export default function Button({
  as: Comp = "button",
  variant = "solid",
  size = "md",
  isLoading = false,
  leftIcon,
  rightIcon,
  className,
  children,
  ...props
}) {
  return (
    <Comp
      className={cn(base, variants[variant], sizes[size], className)}
      aria-disabled={isLoading || props.disabled}
      {...props}>
      {isLoading && (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      )}
      {!isLoading && leftIcon}
      <span className={cn({ "opacity-0": isLoading })}>{children}</span>
      {!isLoading && rightIcon}
    </Comp>
  );
}
