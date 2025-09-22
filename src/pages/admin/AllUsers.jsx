import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../Context/AuthContext";

export default function UsersPage() {
  const { user, role, isAuthenticated } = useAuth();
  const token = user?.token;  
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isAuthenticated || !["admin", "superadmin"].includes(role?.toLowerCase())) {
      setError("You do not have permission to view this page.");
      return;
    }
    fetchUsers();
  }, [isAuthenticated, role]);

 async function fetchUsers() {
  setLoading(true);
  setError(null);
  try {
    const res = await axios.get("https://edu-master-psi.vercel.app/admin/all-user", {
      headers: { token },
    });

    setUsers(res.data.data || []);
  } catch (err) {
    setError(err.response?.data?.message || err.message || "Failed to load");
  } finally {
    setLoading(false);
  }
}


  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">All Users</h1>
      </div>

      {error && <p className="text-red-600">{error}</p>}

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse bg-white rounded shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border">#</th>
              <th className="p-3 border">Full Name</th>
              <th className="p-3 border">Email</th>
              <th className="p-3 border">Phone</th>
              <th className="p-3 border">Role</th>
              <th className="p-3 border">Verified</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan="6" className="p-6 text-center">
                  <div className="flex justify-center items-center gap-3">
                    <div className="w-6 h-6 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-gray-600">Loading data...</span>
                  </div>
                </td>
              </tr>
            )}

            {!loading &&
              users.length > 0 &&
              users.map((u, idx) => (
                <tr key={u._id || idx} className="odd:bg-white even:bg-gray-50">
                  <td className="p-3 border">{idx + 1}</td>
                  <td className="p-3 border">{u.fullName}</td>
                  <td className="p-3 border">{u.email}</td>
                  <td className="p-3 border">{u.phoneNumber}</td>
                  <td className="p-3 border capitalize">{u.role}</td>
                  <td className="p-3 border">{u.isVerified ? "✅" : "❌"}</td>
                </tr>
              ))}

            {!loading && users.length === 0 && !error && (
              <tr>
                <td colSpan="6" className="p-6 text-center text-gray-500">
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
