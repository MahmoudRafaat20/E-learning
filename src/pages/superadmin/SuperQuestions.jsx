import React, { useState } from "react";

export default function SuperQuestions() {
  const [questions, setQuestions] = useState([
    {
      id: "sq1",
      exam: "Policy Compliance Exam",
      owner: "Admin One",
      text: "What is least privilege?",
    },
    {
      id: "sq2",
      exam: "Config Audit Quiz",
      owner: "Admin Two",
      text: "Name three logging best practices.",
    },
  ]);

  const add = () => {
    const exam = prompt("Exam?");
    const owner = prompt("Owner (admin)?");
    const text = prompt("Question text?");
    if (!exam || !owner || !text) return;
    setQuestions((prev) => [
      ...prev,
      { id: crypto.randomUUID(), exam, owner, text },
    ]);
  };

  const remove = (id) => {
    if (!confirm("Delete this question?")) return;
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  return (
    <div className="p-4 space-y-4">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold dark:text-zinc-100">
          Super Admin • Questions
        </h1>
        <button className="px-3 py-2 rounded bg-black text-white" onClick={add}>
          + Add Question
        </button>
      </header>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="[&>th]:border-b [&>th]:py-2">
              <th className="dark:text-zinc-100">Exam</th>
              <th className="dark:text-zinc-100">Owner</th>
              <th className="dark:text-zinc-100">Question</th>
              <th style={{ width: 140 }} className="dark:text-zinc-100">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {questions.map((q) => (
              <tr
                key={q.id}
                className="[&>td]:py-2 [&>td]:border-b dark:text-zinc-100">
                <td className="dark:text-zinc-100">{q.exam}</td>
                <td className="dark:text-zinc-100">{q.owner}</td>
                <td className="dark:text-zinc-100">{q.text}</td>
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
                <td colSpan={4} className="py-8 text-center text-gray-500">
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
