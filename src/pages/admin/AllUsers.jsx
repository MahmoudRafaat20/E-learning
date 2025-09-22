import React, { useMemo, useState } from "react";

export default function AllUsers() {
  const [query, setQuery] = useState("");
  const data = [
    { id: "u1", name: "Alice", email: "alice@example.com", role: "student" },
    { id: "u2", name: "Bob", email: "bob@example.com", role: "admin" },
    { id: "u3", name: "Carol", email: "carol@example.com", role: "student" },
    { id: "u4", name: "Dave", email: "dave@example.com", role: "superadmin" },
  ];

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return data.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.role.toLowerCase().includes(q)
    );
  }, [query, data]);

  return (
    <div className="p-4 space-y-4">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">All Users</h1>
        <button
          className="px-3 py-2 rounded bg-black text-white"
          onClick={() => alert("TODO: open create-user modal")}>
          + New User
        </button>
      </header>

      <div className="max-w-md">
        <input
          className="w-full border rounded px-3 py-2"
          placeholder="Search by name, email, or role…"
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
              <th style={{ width: 160 }}>Actions</th>
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
                    onClick={() => alert(`View ${u.name}`)}>
                    View
                  </button>
                  <button
                    className="px-2 py-1 rounded border"
                    onClick={() => alert(`Edit ${u.name}`)}>
                    Edit
                  </button>
                  <button
                    className="px-2 py-1 rounded border text-red-600"
                    onClick={() => alert(`Delete ${u.name}`)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={4} className="py-8 text-center text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
