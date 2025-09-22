import React, { useState } from "react";

export default function AdminExams() {
  const [exams, setExams] = useState([
    {
      id: "e1",
      title: "Algebra Midterm",
      lesson: "Intro to Algebra",
      published: true,
    },
    {
      id: "e2",
      title: "Geometry Quiz",
      lesson: "Advanced Geometry",
      published: false,
    },
  ]);

  const addExam = () => {
    const title = prompt("Exam title?");
    const lesson = prompt("Linked lesson?");
    if (!title || !lesson) return;
    setExams((prev) => [
      ...prev,
      { id: crypto.randomUUID(), title, lesson, published: false },
    ]);
  };

  const toggle = (id) => {
    setExams((prev) =>
      prev.map((e) => (e.id === id ? { ...e, published: !e.published } : e))
    );
  };

  const remove = (id) => {
    if (!confirm("Delete this exam?")) return;
    setExams((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <div className="p-4 space-y-4">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Admin • Exams</h1>
        <button
          className="px-3 py-2 rounded bg-black text-white"
          onClick={addExam}>
          + New Exam
        </button>
      </header>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="[&>th]:border-b [&>th]:py-2">
              <th>Title</th>
              <th>Lesson</th>
              <th>Status</th>
              <th style={{ width: 220 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {exams.map((e) => (
              <tr key={e.id} className="[&>td]:py-2 [&>td]:border-b">
                <td>{e.title}</td>
                <td>{e.lesson}</td>
                <td>{e.published ? "Published" : "Draft"}</td>
                <td className="space-x-2">
                  <button
                    className="px-2 py-1 rounded border"
                    onClick={() => alert(`Edit ${e.title}`)}>
                    Edit
                  </button>
                  <button
                    className="px-2 py-1 rounded border"
                    onClick={() => toggle(e.id)}>
                    {e.published ? "Unpublish" : "Publish"}
                  </button>
                  <button
                    className="px-2 py-1 rounded border text-red-600"
                    onClick={() => remove(e.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {exams.length === 0 && (
              <tr>
                <td colSpan={4} className="py-8 text-center text-gray-500">
                  No exams yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
