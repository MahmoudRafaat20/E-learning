import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { SIDE_NAV } from "../../config/nav";

function cx(...a) {
  return a.filter(Boolean).join(" ");
}

export default function Sidebar() {
  const role = useContext(AuthContext)?.role || "student";
  const items = SIDE_NAV[role] || [];

  return (
    <aside className="hidden lg:block w-60 shrink-0">
      <div className="sticky top-24 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm p-4">
        <div className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-3">
          Menu
        </div>
        <div className="flex flex-col gap-1">
          {items.map((it) => (
            <NavLink
              key={it.to}
              to={it.to}
              className={({ isActive }) =>
                cx(
                  "rounded-xl px-3 py-2 transition",
                  "hover:bg-zinc-100 dark:hover:bg-zinc-900",
                  isActive && "bg-zinc-100 dark:bg-zinc-900"
                )
              }>
              {it.label}
            </NavLink>
          ))}
        </div>
      </div>
    </aside>
  );
}
