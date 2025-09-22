import React, { useMemo, useState } from "react";

export default function AllAdmins() {
  const [query, setQuery] = useState("");
  // In real app, fetch only admins from API
  const data = [
    { id: "a1", name: "Admin One", email: "a1@example.com", role: "admin" },
    { id: "a2", name: "Admin Two", email: "a2@example.com", role: "admin" },
    {
      id: "s1",
      name: "Super Admin",
      email: "sa@example.com",
      role: "superadmin",
    },
  ];

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return data.filter(
      (u) =>
        (u.role === "admin" || u.role === "superadmin") &&
        (u.name.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q) ||
          u.role.toLowerCase().includes(q))
    );
  }, [query, data]);

  return (
    <div className="p-4 space-y-4">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">All Admins</h1>
        <button
          className="px-3 py-2 rounded bg-black text-white"
          onClick={() => alert("TODO: open invite-admin modal")}>
          + Invite Admin
        </button>
      </header>

      <div className="max-w-md">
        <input
          className="w-full border rounded px-3 py-2"
          placeholder="Search admins…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="[&>th]:border-b [&>th]:py-2">
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th style={{ width: 200 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((u) => (
              <tr key={u.id} className="[&>td]:py-2 [&>td]:border-b">
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td className="capitalize">{u.role}</td>
                <td className="space-x-2">
                  <button
                    className="px-2 py-1 rounded border"
                    onClick={() => alert(`Demote ${u.name}`)}>
                    {u.role === "admin"
                      ? "Promote to Super"
                      : "Demote to Admin"}
                  </button>
                  <button
                    className="px-2 py-1 rounded border text-red-600"
                    onClick={() => alert(`Remove ${u.name}`)}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={4} className="py-8 text-center text-gray-500">
                  No admins found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
