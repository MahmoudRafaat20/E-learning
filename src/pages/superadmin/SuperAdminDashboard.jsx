import { useState } from "react";
import Table from "../../Components/ui/Table";
import Stat from "../../Components/ui/Stat";
import Button from "../../Components/ui/Button";
import { toast } from "react-toastify";

export default function SuperAdminDashboard() {
  const [admins, setAdmins] = useState([
    { id: 1, name: "Admin One", email: "admin1@example.com" },
    { id: 2, name: "Admin Two", email: "admin2@example.com" },
  ]);

  const remove = (id) => {
    setAdmins((as) => as.filter((a) => a.id !== id));
    toast.success("Admin removed");
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold dark:text-zinc-100">Super Admin</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat
          title="Total Admins"
          value={admins.length}
          className="dark:text-zinc-100"
        />
        <Stat
          title="Total Students"
          value="120"
          className="dark:text-zinc-100"
        />
        <Stat title="Total Lessons" value="50" className="dark:text-zinc-100" />
        <Stat title="Revenue" value="$5000" className="dark:text-zinc-100" />
      </div>

      <section>
        <h2 className="font-semibold mb-3 dark:text-zinc-100">Manage Admins</h2>
        <Table
          columns={["ID", "Name", "Email", "Actions"]}
          className="dark:text-zinc-100"
          rows={admins.map((a) => [
            `#${a.id}`,
            a.name,
            a.email,
            <div key={`a-${a.id}`} className="flex gap-2">
              <Button size="sm" variant="outline">
                Edit
              </Button>
              <Button size="sm" variant="danger" onClick={() => remove(a.id)}>
                Delete
              </Button>
            </div>,
          ])}
        />
      </section>
    </div>
  );
}
