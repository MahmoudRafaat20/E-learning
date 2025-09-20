import { Outlet, Link } from "react-router-dom";
export default function AuthLayout() {
  return (
    <div className="min-h-screen grid place-items-center bg-zinc-50 dark:bg-zinc-900">
      <div className="w-full max-w-md p-6 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
        <div className="mb-6 text-center font-semibold">
          <Link to="/" className="text-xl">
            EduMaster
          </Link>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
