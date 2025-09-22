import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

export default function ExamPage() {
  const { user, role, isAuthenticated } = useAuth();
  const token = user?.token;

  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedExam, setSelectedExam] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      setError("You must be logged in to view this page.");
      return;
    }
    if (!["admin", "student", "user"].includes(role)) {
      setError("You do not have permission to view this page.");
      return;
    }
    fetchExams();
  }, [isAuthenticated, role]);

  async function fetchExams() {
    if (!token) return setError("No token found");
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get("https://edu-master-psi.vercel.app/exam", {
        headers: { token },
      });
      const payload = res.data;
      if (Array.isArray(payload)) setExams(payload);
      else if (Array.isArray(payload.data)) setExams(payload.data);
      else setExams(payload.exams || payload.items || []);
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Failed to load");
    } finally {
      setLoading(false);
    }
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Exams</h1>
          <button
            onClick={fetchExams}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            Refresh
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-3 border">#</th>
                <th className="p-3 border">Title</th>
                <th className="p-3 border">Description</th>
                <th className="p-3 border">Date</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan="4" className="p-6 text-center">
                    <div className="flex justify-center">
                      <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  </td>
                </tr>
              )}

              {!loading && exams.length === 0 && (
                <tr>
                  <td colSpan="4" className="p-6 text-center text-gray-500">
                    No exams found.
                  </td>
                </tr>
              )}

              {!loading &&
                exams.length > 0 &&
                exams.map((exam, idx) => (
                  <tr key={exam._id || idx} className="odd:bg-white even:bg-gray-50">
                    <td className="p-3 border">{idx + 1}</td>
                    <td className="p-3 border">{exam.title || exam.name || "-"}</td>
                    <td className="p-3 border">{exam.description || exam.desc || "-"}</td>
                    <td className="p-3 border">{exam.date || exam.createdAt || "-"}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {selectedExam && (
          <div className="mt-6 p-4 border rounded bg-gray-50">
            <h2 className="text-xl font-semibold mb-2">Exam Details</h2>
            <p><strong>Title:</strong> {selectedExam.title || selectedExam.name}</p>
            <p><strong>Description:</strong> {selectedExam.description || selectedExam.desc}</p>
            <p><strong>Date:</strong> {selectedExam.date || selectedExam.createdAt}</p>
            <button
              onClick={() => setSelectedExam(null)}
              className="mt-3 px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
