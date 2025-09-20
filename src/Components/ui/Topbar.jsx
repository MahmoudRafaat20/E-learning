import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext"; // note: path matches YOUR tree
import { TOP_NAV } from "../../config/nav";

function cx(...a) {
  return a.filter(Boolean).join(" ");
}

export default function Topbar() {
  const { user, logout } = useContext(AuthContext);
  // If your AuthContext exposes role, use it; otherwise default to "student"
  const role = useContext(AuthContext)?.role || "student";
  const items = TOP_NAV[role] || [];
  const [open, setOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50 border-b border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-950/70 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Brand + Desktop Nav */}
        <div className="flex items-center gap-4">
          <button
            className="lg:hidden p-2 rounded-xl border border-zinc-200 dark:border-zinc-800"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu">
            <span className="block h-0.5 w-5 bg-current mb-1" />
            <span className="block h-0.5 w-5 bg-current mb-1" />
            <span className="block h-0.5 w-5 bg-current" />
          </button>

          <Link to="/" className="font-semibold">
            EduMaster
          </Link>

          <nav className="hidden lg:flex items-center gap-2 ml-4">
            {items.map((it) => (
              <NavLink
                key={it.to}
                to={it.to}
                className={({ isActive }) =>
                  cx(
                    "px-3 py-2 rounded-xl transition",
                    "hover:bg-zinc-100 dark:hover:bg-zinc-900",
                    isActive && "bg-zinc-100 dark:bg-zinc-900"
                  )
                }>
                {it.label}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Right: Auth actions */}
        <div className="flex items-center gap-2">
          {user?.email && (
            <span className="hidden sm:block text-sm text-zinc-600 dark:text-zinc-300">
              {user.email}
            </span>
          )}
          {user?.token ? (
            <button
              onClick={logout}
              className="rounded-xl border border-zinc-200 dark:border-zinc-800 px-3 py-2 text-sm">
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="rounded-xl border border-zinc-200 dark:border-zinc-800 px-3 py-2 text-sm">
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
          <div className="px-4 py-2 flex flex-col gap-1">
            {items.map((it) => (
              <NavLink
                key={it.to}
                to={it.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cx(
                    "rounded-xl px-3 py-2",
                    "hover:bg-zinc-100 dark:hover:bg-zinc-900",
                    isActive && "bg-zinc-100 dark:bg-zinc-900"
                  )
                }>
                {it.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
