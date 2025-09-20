import { Outlet } from "react-router-dom";
import Topbar from "../Components/ui/Topbar";
import Sidebar from "../Components/ui/Sidebar";

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <Topbar />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6 flex gap-6">
        <Sidebar />
        <main className="flex-1">
          <Outlet />
          <footer className="py-10 text-center text-sm text-zinc-500 dark:text-zinc-400">
            © EduMaster
          </footer>
        </main>
      </div>
    </div>
  );
}
