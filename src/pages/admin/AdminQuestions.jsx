import React, { useState } from "react";

export default function AdminQuestions() {
  const [questions, setQuestions] = useState([
    { id: "q1", exam: "Algebra Midterm", text: "Solve 2x + 5 = 17" },
    { id: "q2", exam: "Geometry Quiz", text: "Define a parallelogram." },
  ]);

  const addQuestion = () => {
    const exam = prompt("Exam?");
    const text = prompt("Question text?");
    if (!exam || !text) return;
    setQuestions((prev) => [...prev, { id: crypto.randomUUID(), exam, text }]);
  };

  const remove = (id) => {
    if (!confirm("Delete this question?")) return;
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  return (
    <div className="p-4 space-y-4">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Admin • Questions</h1>
        <button
          className="px-3 py-2 rounded bg-black text-white"
          onClick={addQuestion}>
          + Add Question
        </button>
      </header>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="[&>th]:border-b [&>th]:py-2">
              <th>Exam</th>
              <th>Question</th>
              <th style={{ width: 140 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((q) => (
              <tr key={q.id} className="[&>td]:py-2 [&>td]:border-b">
                <td>{q.exam}</td>
                <td>{q.text}</td>
                <td className="space-x-2">
                  <button
                    className="px-2 py-1 rounded border"
                    onClick={() => alert(`Edit ${q.id}`)}>
                    Edit
                  </button>
                  <button
                    className="px-2 py-1 rounded border text-red-600"
                    onClick={() => remove(q.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {questions.length === 0 && (
              <tr>
                <td colSpan={3} className="py-8 text-center text-gray-500">
                  No questions yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
