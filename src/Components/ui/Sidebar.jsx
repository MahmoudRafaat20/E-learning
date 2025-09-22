import React, { useContext, useMemo } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { SIDE_NAV } from "../../config/nav";
import {
  LayoutDashboard,
  BookOpen,
  FileCheck2,
  HelpCircle,
  Users as UsersIcon,
  Shield,
  BarChart3,
  User,
  CreditCard,
  ChevronRight,
  CircleDot,
} from "lucide-react";

function cx(...a) {
  return a.filter(Boolean).join(" ");
}

const iconFor = (label = "") => {
  const key = label.toLowerCase();
  if (key.includes("dashboard") || key.includes("overview"))
    return LayoutDashboard;
  if (key.includes("lesson")) return BookOpen;
  if (key.includes("exam")) return FileCheck2;
  if (key.includes("question")) return HelpCircle;
  if (key.includes("user")) return UsersIcon;
  if (key.includes("admin")) return Shield;
  if (key.includes("report")) return BarChart3;
  if (key.includes("profile")) return User;
  if (key.includes("payment") || key.includes("billing")) return CreditCard;
  return CircleDot;
};

export default function Sidebar() {
  const { user } = useContext(AuthContext) ?? {};
  const role = user?.role || "student";
  const items = SIDE_NAV[role] || [];

  const roleBadge = useMemo(() => {
    const map =
      {
        student:
          "bg-emerald-100 text-emerald-700 ring-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-300 dark:ring-emerald-800",
        admin:
          "bg-amber-100 text-amber-800 ring-amber-200 dark:bg-amber-900/40 dark:text-amber-300 dark:ring-amber-800",
        superadmin:
          "bg-fuchsia-100 text-fuchsia-800 ring-fuchsia-200 dark:bg-fuchsia-900/40 dark:text-fuchsia-300 dark:ring-fuchsia-800",
      }[role] ||
      "bg-zinc-100 text-zinc-700 ring-zinc-200 dark:bg-zinc-800/50 dark:text-zinc-300 dark:ring-zinc-700";
    return map;
  }, [role]);

  return (
    <aside className="hidden lg:block w-64 shrink-0">
      <div className="sticky top-24 rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white/60 dark:bg-zinc-950/40 backdrop-blur-xl shadow-sm">
        {/* accent */}
        <div className="h-[3px] w-full rounded-t-2xl bg-gradient-to-r from-fuchsia-500 via-blue-500 to-emerald-500 opacity-80" />

        {/* header */}
        <div className="p-4 pb-2 flex items-center justify-between">
          <div className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            Navigation
          </div>
          <span
            className={cx(
              "px-2 py-0.5 rounded-xl text-[10px] ring-1",
              roleBadge
            )}>
            {role}
          </span>
        </div>

        {/* nav list */}
        <nav className="px-2 pb-3">
          <ul className="space-y-1">
            {items.map((it) => {
              const Icon = iconFor(it.label);
              return (
                <li key={it.to}>
                  <NavLink
                    to={it.to}
                    className={({ isActive }) =>
                      cx(
                        "group relative flex items-center gap-3 px-3 py-2 rounded-xl border transition",
                        "border-transparent hover:border-zinc-200/70 dark:hover:border-zinc-800/70",
                        "hover:bg-zinc-50/70 dark:hover:bg-zinc-900/50",
                        isActive &&
                          "bg-zinc-100/70 dark:bg-zinc-900/60 border-zinc-200/70 dark:border-zinc-800/70"
                      )
                    }>
                    {/* active gradient rail */}
                    <span
                      className={cx(
                        "absolute left-0 top-1/2 -translate-y-1/2 h-7 w-1 rounded-r",
                        "bg-gradient-to-b from-blue-500 to-emerald-500",
                        "opacity-0 group-hover:opacity-60 transition-opacity",
                        // show when active
                        "data-[active=true]:opacity-100"
                      )}
                      data-active={undefined}
                    />
                    <Icon className="h-4 w-4 text-zinc-500 group-hover:text-zinc-700 dark:text-zinc-400 dark:group-hover:text-zinc-200 transition-colors" />
                    <span className="text-sm text-zinc-800 dark:text-zinc-100">
                      {it.label}
                    </span>
                    <ChevronRight className="ml-auto h-4 w-4 text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* footer helper */}
        <div className="px-4 py-3 text-[11px] text-zinc-500 dark:text-zinc-400 border-t border-zinc-200/60 dark:border-zinc-800/60">
          Tip: press{" "}
          <kbd className="px-1.5 py-0.5 rounded border border-zinc-300 dark:border-zinc-700 bg-white/70 dark:bg-zinc-900/70">
            /
          </kbd>{" "}
          to search.
        </div>
      </div>
    </aside>
  );
}
