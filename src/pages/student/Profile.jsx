import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import Button from "../../Components/ui/Button";
import Alert from "../../Components/ui/Alert";

export default function Profile() {
  const { user, role, setRole, logout } = useContext(AuthContext);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold dark:text-zinc-100">
        Your Profile
      </h1>

      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <div className="text-sm text-zinc-500">Email</div>
            <div className="font-medium break-all dark:text-zinc-100">
              {user?.email ?? "—"}
            </div>
          </div>
          <div>
            <div className="text-sm text-zinc-500">Role</div>
            <div className="flex items-center gap-3">
              <span className="font-medium capitalize dark:text-zinc-100">
                {role}
              </span>
              {typeof setRole === "function" && (
                <select
                  className="rounded-xl border dark:text-zinc-100 border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2 text-sm"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  aria-label="Switch role (dev)">
                  <option value="student">student</option>
                  <option value="admin">admin</option>
                  <option value="superadmin">superadmin</option>
                </select>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 flex gap-2">
          <Button
            variant="outline"
            onClick={logout}
            className="dark:text-zinc-100">
            Sign out
          </Button>
        </div>
      </div>

      <Alert variant="success" title="Progress">
        You’re doing great! Keep up with your lessons and practice exams.
      </Alert>
    </div>
  );
}
