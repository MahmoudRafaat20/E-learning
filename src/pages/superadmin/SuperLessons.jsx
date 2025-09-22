import React, { useState } from "react";

export default function SuperLessons() {
  const [lessons, setLessons] = useState([
    {
      id: "sl1",
      title: "Global Policy Overview",
      status: "published",
      owner: "Admin One",
    },
    {
      id: "sl2",
      title: "System Config Basics",
      status: "draft",
      owner: "Admin Two",
    },
  ]);

  const add = () => {
    const title = prompt("Lesson title?");
    const owner = prompt("Owner (admin)?");
    if (!title || !owner) return;
    setLessons((prev) => [
      ...prev,
      { id: crypto.randomUUID(), title, owner, status: "draft" },
    ]);
  };

  return (
    <div className="p-4 space-y-4">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Super Admin • Lessons</h1>
        <button className="px-3 py-2 rounded bg-black text-white" onClick={add}>
          + New Lesson
        </button>
      </header>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="[&>th]:border-b [&>th]:py-2">
              <th>Title</th>
              <th>Owner</th>
              <th>Status</th>
              <th style={{ width: 220 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {lessons.map((l) => (
              <tr key={l.id} className="[&>td]:py-2 [&>td]:border-b">
                <td>{l.title}</td>
                <td>{l.owner}</td>
                <td className="capitalize">{l.status}</td>
                <td className="space-x-2">
                  <button
                    className="px-2 py-1 rounded border"
                    onClick={() => alert(`Edit ${l.title}`)}>
                    Edit
                  </button>
                  <button
                    className="px-2 py-1 rounded border"
                    onClick={() => alert(`Publish toggle ${l.title}`)}>
                    {l.status === "draft" ? "Publish" : "Unpublish"}
                  </button>
                  <button
                    className="px-2 py-1 rounded border text-red-600"
                    onClick={() => alert(`Delete ${l.title}`)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {lessons.length === 0 && (
              <tr>
                <td colSpan={4} className="py-8 text-center text-gray-500">
                  No lessons yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
