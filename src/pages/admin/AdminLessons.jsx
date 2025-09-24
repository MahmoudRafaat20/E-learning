import React, { useState } from "react";

export default function AdminLessons() {
  const [lessons, setLessons] = useState([
    { id: "l1", title: "Intro to Algebra", status: "published" },
    { id: "l2", title: "Advanced Geometry", status: "draft" },
  ]);

  const addLesson = () => {
    const title = prompt("Lesson title?");
    if (!title) return;
    setLessons((prev) => [
      ...prev,
      { id: crypto.randomUUID(), title, status: "draft" },
    ]);
  };

  const toggleStatus = (id) => {
    setLessons((prev) =>
      prev.map((l) =>
        l.id === id
          ? { ...l, status: l.status === "draft" ? "published" : "draft" }
          : l
      )
    );
  };

  const removeLesson = (id) => {
    if (!confirm("Delete this lesson?")) return;
    setLessons((prev) => prev.filter((l) => l.id !== id));
  };

  return (
    <div className="p-4 space-y-4">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Admin • Lessons</h1>
        <button
          className="px-3 py-2 rounded bg-black text-white"
          onClick={addLesson}>
          + New Lesson
        </button>
      </header>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="[&>th]:border-b [&>th]:py-2">
              <th>Title</th>
              <th>Status</th>
              <th style={{ width: 220 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {lessons.map((l) => (
              <tr key={l.id} className="[&>td]:py-2 [&>td]:border-b">
                <td>{l.title}</td>
                <td className="capitalize">{l.status}</td>
                <td className="space-x-2">
                  <button
                    className="px-2 py-1 rounded border"
                    onClick={() => alert(`Edit ${l.title}`)}>
                    Edit
                  </button>
                  <button
                    className="px-2 py-1 rounded border"
                    onClick={() => toggleStatus(l.id)}>
                    {l.status === "draft" ? "Publish" : "Unpublish"}
                  </button>
                  <button
                    className="px-2 py-1 rounded border text-red-600"
                    onClick={() => removeLesson(l.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {lessons.length === 0 && (
              <tr>
                <td colSpan={3} className="py-8 text-center text-gray-500">
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
