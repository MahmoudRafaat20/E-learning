import { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../Context/AuthContext";
import { Mail, Lock, Eye, EyeOff, LogIn } from "lucide-react";

// Redirect destinations (aligned with your router)
const defaultPathByRole = (role) => {
  if (role === "admin") return "/admin/dashboard";
  if (role === "superadmin") return "/superadmin/dashboard";
  return "/student/lessons"; // student/default
};

export default function Login() {
  const { login, user, role: ctxRole } = useContext(AuthContext) ?? {};
  const role = ctxRole || user?.role || "student";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [reveal, setReveal] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // If PrivateRoute bounced the user, it put the target here:
  const from = location.state?.from?.pathname || defaultPathByRole(role);

  // If already authenticated and we land on /login, push to their home
  useEffect(() => {
    if (user?.token) navigate(from, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.token]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in both email and password.");
      return;
    }
    setLoading(true);
    try {
      const result = await login?.(email, password);
      if (result?.success) {
        navigate(from, { replace: true });
        toast.success("Welcome back!");
      } else {
        toast.error(result?.message || "Invalid credentials");
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden">
      {/* subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-200 via-blue-200 to-emerald-200 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950" />
      {/* top accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-fuchsia-500 via-blue-500 to-emerald-500 opacity-80" />

      {/* If you already have a ToastContainer in App.jsx, remove this one */}
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="relative w-full max-w-md mx-auto px-4">
        <div className="rounded-3xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white/70 dark:bg-zinc-950/50 backdrop-blur-xl shadow-xl p-6">
          <div className="mb-6 text-center">
            <div className="inline-flex items-center justify-center h-10 w-10 rounded-2xl bg-gradient-to-br from-fuchsia-500 to-emerald-500 text-white shadow">
              <LogIn size={18} />
            </div>
            <h1 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
              Welcome back
            </h1>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Sign in to continue to{" "}
              <span className="font-medium">EduMaster</span>.
            </p>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Email
              </label>
              <div className="mt-1 relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">
                  <Mail size={16} />
                </span>
                <input
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-900/60 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Password
                </label>
                <Link
                  to="#"
                  className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                  onClick={(e) => e.preventDefault()}>
                  Forgot password?
                </Link>
              </div>
              <div className="mt-1 relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">
                  <Lock size={16} />
                </span>
                <input
                  type={reveal ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-10 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-900/60 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                  required
                />
                <button
                  type="button"
                  onClick={() => setReveal((v) => !v)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-lg text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
                  aria-label={reveal ? "Hide password" : "Show password"}>
                  {reveal ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-fuchsia-600 to-emerald-600 text-white font-medium py-2.5 shadow hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-blue-500/40 disabled:opacity-60">
              {loading ? (
                <>
                  <span className="h-4 w-4 border-2 border-white/70 border-t-transparent rounded-full animate-spin" />
                  Signing in…
                </>
              ) : (
                <>
                  <LogIn size={16} />
                  Sign in
                </>
              )}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 my-2">
              <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
              <span className="text-[11px] uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                or
              </span>
              <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
            </div>

            {/* Register */}
            <div className="text-center text-sm">
              <span className="text-zinc-600 dark:text-zinc-400">
                New here?{" "}
              </span>
              <Link
                to="/register"
                className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                Create an account
              </Link>
            </div>
          </form>
        </div>

        {/* small footer */}
        <div className="mt-4 text-center text-xs text-zinc-600 dark:text-zinc-400">
          © {new Date().getFullYear()} EduMaster. All rights reserved.
        </div>
      </div>
    </div>
  );
}
