import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { TOP_NAV } from "../../config/nav";
import {
  Bell,
  LogOut,
  Menu,
  Search,
  Sun,
  Moon,
  ChevronDown,
  UserRound,
} from "lucide-react";

function cx(...a) {
  return a.filter(Boolean).join(" ");
}

function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "light";
    return (
      localStorage.getItem("theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light")
    );
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return {
    theme,
    setTheme,
    toggle: () => setTheme((t) => (t === "dark" ? "light" : "dark")),
  };
}

function Avatar({ name = "", email = "" }) {
  const text = (name || email || "U").trim();
  const initials = text
    .split(/[ ._@-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase())
    .join("");
  return (
    <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-zinc-200/80 dark:bg-zinc-800/80 text-sm font-semibold">
      {initials || "U"}
    </div>
  );
}

export default function Topbar() {
  const { user, logout } = useContext(AuthContext) ?? {};
  const role = user?.role || "student";
  const items = TOP_NAV[role] || [];
  const [open, setOpen] = useState(false);
  const [trayOpen, setTrayOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchRef = useRef(null);
  const { pathname } = useLocation();
  const { theme, toggle: toggleTheme } = useTheme();

  // Focus search on "/" like a command palette
  useEffect(() => {
    const onKey = (e) => {
      if (
        e.key === "/" &&
        !e.metaKey &&
        !e.ctrlKey &&
        !e.altKey &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Close mobile tray on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const roleBadge = useMemo(() => {
    const map = {
      student:
        "bg-emerald-100 text-emerald-700 ring-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-300 dark:ring-emerald-800",
      admin:
        "bg-amber-100 text-amber-800 ring-amber-200 dark:bg-amber-900/40 dark:text-amber-300 dark:ring-amber-800",
      superadmin:
        "bg-fuchsia-100 text-fuchsia-800 ring-fuchsia-200 dark:bg-fuchsia-900/40 dark:text-fuchsia-300 dark:ring-fuchsia-800",
    };
    return map[role] || map.student;
  }, [role]);

  return (
    <div className="sticky top-0 z-50 border-b border-zinc-200/60 dark:border-zinc-800/60 bg-white/60 dark:bg-zinc-950/40 backdrop-blur-xl">
      {/* Top line accent */}
      <div className="h-[2px] w-full bg-gradient-to-r from-fuchsia-500 via-blue-500 to-emerald-500 opacity-70" />

      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Burger + Brand + Desktop Nav */}
        <div className="flex items-center gap-3">
          <button
            className="lg:hidden p-2 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100/70 dark:hover:bg-zinc-900/70"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu">
            <Menu size={18} />
          </button>

          <Link
            to="/"
            className="font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-900 dark:from-white dark:via-zinc-300 dark:to-white">
              EduMaster
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1 ml-2">
            {items.map((it) => (
              <NavLink
                key={it.to}
                to={it.to}
                className={({ isActive }) =>
                  cx(
                    "px-3 py-2 rounded-xl text-sm transition group",
                    "hover:bg-zinc-100/80 dark:hover:bg-zinc-900/70",
                    "border border-transparent hover:border-zinc-200/60 dark:hover:border-zinc-800/60",
                    isActive &&
                      "bg-zinc-100/80 dark:bg-zinc-900/70 border-zinc-200/60 dark:border-zinc-800/60"
                  )
                }>
                <span className="relative">
                  {it.label}
                  {/* underline on hover */}
                  <span className="absolute -bottom-0.5 left-0 h-[2px] w-0 bg-gradient-to-r from-blue-500 to-emerald-500 transition-all duration-300 group-hover:w-full" />
                </span>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Middle: Search */}
        <div className="hidden md:flex items-center flex-1 max-w-sm mx-3">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <input
              ref={searchRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search…  (press /)"
              className="w-full pl-9 pr-10 py-2 rounded-xl text-sm border border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-900/60 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
            />
            {query && (
              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
                onClick={() => setQuery("")}>
                Esc
              </button>
            )}
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {/* Role badge (desktop) */}
          <span
            className={cx(
              "hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs ring-1",
              roleBadge
            )}
            title={`Role: ${role}`}>
            {role}
          </span>

          {/* Search button (mobile) */}
          <button
            className="md:hidden p-2 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100/70 dark:hover:bg-zinc-900/70"
            onClick={() => setTrayOpen(true)}
            aria-label="Open search">
            <Search size={18} />
          </button>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100/70 dark:hover:bg-zinc-900/70"
            aria-label="Toggle theme"
            title={theme === "dark" ? "Switch to light" : "Switch to dark"}>
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Notifications */}
          <button
            className="p-2 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100/70 dark:hover:bg-zinc-900/70 relative"
            aria-label="Notifications">
            <Bell size={18} />
            <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-rose-500 ring-2 ring-white dark:ring-zinc-950" />
          </button>

          {/* Avatar dropdown */}
          <div className="relative">
            <button
              onClick={() => setTrayOpen((v) => !v)}
              className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100/70 dark:hover:bg-zinc-900/70"
              aria-haspopup="menu"
              aria-expanded={trayOpen}>
              <Avatar name={user?.name} email={user?.email} />
              <ChevronDown size={16} className="text-zinc-500" />
            </button>

            {/* Dropdown */}
            {trayOpen && (
              <div
                role="menu"
                className="absolute right-0 mt-2 w-56 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-xl shadow-lg p-2">
                <div className="px-2 py-2 text-sm text-zinc-600 dark:text-zinc-300">
                  <div className="font-medium text-zinc-900 dark:text-zinc-100">
                    {user?.name || user?.email || "User"}
                  </div>
                  <div className="truncate">{user?.email || "—"}</div>
                </div>
                <div className="my-1 h-px bg-zinc-200/70 dark:bg-zinc-800/70" />
                <Link
                  to="/student/profile"
                  className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-zinc-100/70 dark:hover:bg-zinc-900/70 text-sm"
                  role="menuitem"
                  onClick={() => setTrayOpen(false)}>
                  <UserRound size={16} />
                  Profile
                </Link>
                <button
                  onClick={() => {
                    setTrayOpen(false);
                    logout?.();
                  }}
                  className="w-full text-left flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-zinc-100/70 dark:hover:bg-zinc-900/70 text-sm"
                  role="menuitem">
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile search sheet */}
      <div
        className={cx(
          "fixed inset-0 z-[60] md:hidden transition",
          trayOpen ? "visible" : "invisible"
        )}
        onClick={() => setTrayOpen(false)}>
        <div
          className={cx(
            "absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity",
            trayOpen ? "opacity-100" : "opacity-0"
          )}
        />
        <div
          className={cx(
            "absolute inset-x-0 top-0 p-3 transition-transform",
            trayOpen ? "translate-y-0" : "-translate-y-6"
          )}
          onClick={(e) => e.stopPropagation()}>
          <div className="mx-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-xl p-3 shadow-xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search…"
                className="w-full pl-9 pr-3 py-2 rounded-xl text-sm border border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-900/60 focus:outline-none"
              />
            </div>
            {/* You can render suggestions/results here */}
          </div>
        </div>
      </div>

      {/* Mobile nav drawer */}
      {open && (
        <div className="lg:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-950/80 backdrop-blur-xl">
          <div className="px-3 py-2 flex flex-col gap-1">
            {items.map((it) => (
              <NavLink
                key={it.to}
                to={it.to}
                className={({ isActive }) =>
                  cx(
                    "rounded-xl px-3 py-2 text-sm",
                    "hover:bg-zinc-100/80 dark:hover:bg-zinc-900/70",
                    isActive && "bg-zinc-100/80 dark:bg-zinc-900/70"
                  )
                }>
                {it.label}
              </NavLink>
            ))}

            <div className="mt-2 flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className="flex-0 p-2 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100/70 dark:hover:bg-zinc-900/70"
                aria-label="Toggle theme">
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              {user?.token ? (
                <button
                  onClick={logout}
                  className="flex-1 rounded-xl border border-zinc-200 dark:border-zinc-800 px-3 py-2 text-sm">
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  className="flex-1 rounded-xl border border-zinc-200 dark:border-zinc-800 px-3 py-2 text-sm">
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
