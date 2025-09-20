import { useMemo, useState } from "react";
import Button from "../../Components/ui/Button";
import { Input, Label } from "../../Components/ui/Input";
import Modal from "../../Components/ui/Modal";
import Table from "../../Components/ui/Table";
import { toast } from "react-toastify";

const seed = [
  {
    id: 1,
    name: "Ali Kaya",
    email: "ali@example.com",
    role: "student",
    status: "active",
  },
  {
    id: 2,
    name: "Zeynep Demir",
    email: "zeynep@example.com",
    role: "student",
    status: "active",
  },
  {
    id: 3,
    name: "Admin One",
    email: "admin1@example.com",
    role: "admin",
    status: "active",
  },
];

export default function Users() {
  const [q, setQ] = useState("");
  const [rows, setRows] = useState(seed);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", role: "student" });

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return rows;
    return rows.filter(
      (r) =>
        r.name.toLowerCase().includes(t) ||
        r.email.toLowerCase().includes(t) ||
        r.role.includes(t)
    );
  }, [q, rows]);

  const promote = (id) => {
    setRows((rs) =>
      rs.map((r) =>
        r.id === id
          ? { ...r, role: r.role === "admin" ? "student" : "admin" }
          : r
      )
    );
    toast.success("Role updated");
  };

  const disable = (id) => {
    setRows((rs) =>
      rs.map((r) => (r.id === id ? { ...r, status: "disabled" } : r))
    );
    toast.info("User disabled");
  };

  const remove = (id) => {
    setRows((rs) => rs.filter((r) => r.id !== id));
    toast.success("User removed");
  };

  const create = (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setRows((rs) => [{ id: Date.now(), status: "active", ...form }, ...rs]);
    setForm({ name: "", email: "", role: "student" });
    setOpen(false);
    toast.success("User created");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold">Users</h1>
        <div className="flex gap-2">
          <Input
            placeholder="Search users…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            aria-label="Search users"
          />
          <Button variant="primary" onClick={() => setOpen(true)}>
            New User
          </Button>
        </div>
      </div>

      <Table
        columns={["ID", "Name", "Email", "Role", "Status", "Actions"]}
        rows={filtered.map((u) => [
          `#${u.id}`,
          u.name,
          u.email,
          <span key={`r-${u.id}`} className="capitalize">
            {u.role}
          </span>,
          <span
            key={`s-${u.id}`}
            className={
              u.status === "disabled" ? "text-red-600" : "text-green-600"
            }>
            {u.status}
          </span>,
          <div key={`a-${u.id}`} className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => promote(u.id)}>
              {u.role === "admin" ? "Demote" : "Promote"}
            </Button>
            <Button size="sm" variant="outline" onClick={() => disable(u.id)}>
              Disable
            </Button>
            <Button size="sm" variant="danger" onClick={() => remove(u.id)}>
              Delete
            </Button>
          </div>,
        ])}
      />

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Create user"
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={create}>
              Create
            </Button>
          </div>
        }>
        <form onSubmit={create} className="space-y-3">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) =>
                setForm((f) => ({ ...f, email: e.target.value }))
              }
            />
          </div>
          <div>
            <Label htmlFor="role">Role</Label>
            <select
              id="role"
              className="w-full h-10 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent px-3"
              value={form.role}
              onChange={(e) =>
                setForm((f) => ({ ...f, role: e.target.value }))
              }>
              <option value="student">student</option>
              <option value="admin">admin</option>
            </select>
          </div>
        </form>
      </Modal>
    </div>
  );
}
