import React, { useState, useContext } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../Context/AuthContext";
import {
  User,
  Mail,
  Phone,
  GraduationCap,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
} from "lucide-react";

const classLevels = [
  "Grade 1 Secondary",
  "Grade 2 Secondary",
  "Grade 3 Secondary",
  "Undergraduate",
  "Postgraduate",
];

export default function Register() {
  const { register } = useContext(AuthContext) ?? {};
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [classLevel, setClassLevel] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setcPassword] = useState("");

  const [reveal1, setReveal1] = useState(false);
  const [reveal2, setReveal2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errs, setErrs] = useState({});

  const validate = () => {
    const e = {};
    if (!fullName.trim()) e.fullName = "Full name is required.";
    if (!email.trim()) e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      e.email = "Enter a valid email.";
    if (!phoneNumber.trim()) e.phoneNumber = "Phone number is required.";
    if (!classLevel.trim()) e.classLevel = "Select your class level.";
    if (!password) e.password = "Password is required.";
    else if (password.length < 6) e.password = "Use at least 6 characters.";
    if (!cpassword) e.cpassword = "Please confirm your password.";
    else if (password !== cpassword) e.cpassword = "Passwords do not match.";
    return e;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const eMap = validate();
    setErrs(eMap);
    if (Object.keys(eMap).length) {
      toast.error("Please fix the highlighted fields.");
      return;
    }
    setLoading(true);
    try {
      const result = await register?.(
        fullName,
        email,
        phoneNumber,
        classLevel,
        password,
        cpassword
      );
      if (result?.success) {
        toast.success("Account created! Redirecting to login…");
        setTimeout(() => navigate("/login"), 900);
      } else {
        toast.error(result?.message || "Registration failed. Try again.");
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fieldCls = (hasErr) =>
    [
      "w-full rounded-xl border bg-zinc-50/70 dark:bg-zinc-900/60",
      "border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100",
      "focus:outline-none focus:ring-2 focus:ring-blue-500/40",
      "pl-9 pr-3 py-2",
      hasErr
        ? "ring-2 ring-rose-500/30 border-rose-400 dark:border-rose-600"
        : "",
    ]
      .filter(Boolean)
      .join(" ");

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden">
      {/* subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-200 via-blue-200 to-emerald-200 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950" />
      {/* top accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-fuchsia-500 via-blue-500 to-emerald-500 opacity-80" />

      {/* If you already have a ToastContainer in App.jsx, remove this one */}
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="relative w-full max-w-xl px-4">
        <div className="rounded-3xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white/70 dark:bg-zinc-950/50 backdrop-blur-xl shadow-xl p-6">
          <div className="mb-6 text-center">
            <div className="inline-flex items-center justify-center h-10 w-10 rounded-2xl bg-gradient-to-br from-fuchsia-500 to-emerald-500 text-white shadow">
              <CheckCircle2 size={18} />
            </div>
            <h1 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
              Create your account
            </h1>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Join <span className="font-medium">EduMaster</span> in seconds.
            </p>
          </div>

          <form
            onSubmit={onSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Full Name */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Full name
              </label>
              <div className="mt-1 relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">
                  <User size={16} />
                </span>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Jane Doe"
                  className={fieldCls(!!errs.fullName)}
                />
              </div>
              {errs.fullName && (
                <p className="mt-1 text-xs text-rose-600">{errs.fullName}</p>
              )}
            </div>

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
                  className={fieldCls(!!errs.email)}
                />
              </div>
              {errs.email && (
                <p className="mt-1 text-xs text-rose-600">{errs.email}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Phone number
              </label>
              <div className="mt-1 relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">
                  <Phone size={16} />
                </span>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="012 XXX XXX XX"
                  className={fieldCls(!!errs.phoneNumber)}
                />
              </div>
              {errs.phoneNumber && (
                <p className="mt-1 text-xs text-rose-600">{errs.phoneNumber}</p>
              )}
            </div>

            {/* Class Level */}
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Class level
              </label>
              <div className="mt-1 relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">
                  <GraduationCap size={16} />
                </span>
                <select
                  value={classLevel}
                  onChange={(e) => setClassLevel(e.target.value)}
                  className={fieldCls(!!errs.classLevel)}>
                  <option value="">Select level…</option>
                  {classLevels.map((lv) => (
                    <option key={lv} value={lv}>
                      {lv}
                    </option>
                  ))}
                </select>
              </div>
              {errs.classLevel && (
                <p className="mt-1 text-xs text-rose-600">{errs.classLevel}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Password
              </label>
              <div className="mt-1 relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">
                  <Lock size={16} />
                </span>
                <input
                  type={reveal1 ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={fieldCls(!!errs.password)}
                />
                <button
                  type="button"
                  onClick={() => setReveal1((v) => !v)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-lg text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
                  aria-label={reveal1 ? "Hide password" : "Show password"}>
                  {reveal1 ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errs.password && (
                <p className="mt-1 text-xs text-rose-600">{errs.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Confirm password
              </label>
              <div className="mt-1 relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">
                  <Lock size={16} />
                </span>
                <input
                  type={reveal2 ? "text" : "password"}
                  value={cpassword}
                  onChange={(e) => setcPassword(e.target.value)}
                  placeholder="••••••••"
                  className={fieldCls(!!errs.cpassword)}
                />
                <button
                  type="button"
                  onClick={() => setReveal2((v) => !v)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-lg text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
                  aria-label={reveal2 ? "Hide password" : "Show password"}>
                  {reveal2 ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errs.cpassword && (
                <p className="mt-1 text-xs text-rose-600">{errs.cpassword}</p>
              )}
            </div>

            {/* Submit */}
            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-fuchsia-600 to-emerald-600 text-white font-medium py-2.5 shadow hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-blue-500/40 disabled:opacity-60">
                {loading ? (
                  <>
                    <span className="h-4 w-4 border-2 border-white/70 border-t-transparent rounded-full animate-spin" />
                    Creating account…
                  </>
                ) : (
                  <>Create account</>
                )}
              </button>
            </div>
          </form>

          {/* Login link */}
          <div className="mt-4 text-center text-sm">
            <span className="text-zinc-600 dark:text-zinc-400">
              Already have an account?{" "}
            </span>
            <Link
              to="/login"
              className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
              Sign in
            </Link>
          </div>
        </div>

        {/* small footer */}
        <div className="mt-4 text-center text-xs text-zinc-600 dark:text-zinc-400">
          © {new Date().getFullYear()} EduMaster. All rights reserved.
        </div>
      </div>
    </div>
  );
}
