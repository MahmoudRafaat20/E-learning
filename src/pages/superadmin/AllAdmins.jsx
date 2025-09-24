import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../Context/AuthContext";

export default function AdminsPage() {
  const { user, role, isAuthenticated } = useAuth();
  const token = user?.token;

  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    cpassword: "",
  });

  useEffect(() => {
    if (!isAuthenticated || !["admin", "superadmin"].includes(role?.toLowerCase())) {
      setError("You do not have permission to view this page.");
      return;
    }
    fetchAdmins();
  }, [isAuthenticated, role]);

  async function fetchAdmins() {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get("https://edu-master-psi.vercel.app/admin/all-admin", {
        headers: { token },
      });
      setAdmins(res.data?.data || []);
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Failed to load");
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateAdmin(e) {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://edu-master-psi.vercel.app/admin/create-admin",
        formData,
        { headers: { token } }
      );
      
      setAdmins((prev) => [...prev, res.data?.data]);
      setShowForm(false);
      setFormData({
        fullName: "",
        email: "",
        phoneNumber: "",
        password: "",
        cpassword: "",
      });
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create admin");
    }
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">All Admins</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
        >
          Create Admin
        </button>
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
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan="4" className="p-6 text-center">
                  <div className="flex justify-center items-center gap-3">
                    <div className="w-6 h-6 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-gray-600">Loading data...</span>
                  </div>
                </td>
              </tr>
            )}

            {!loading && admins.length > 0 && admins.map((admin, idx) => (
              <tr key={admin._id || idx} className="odd:bg-white even:bg-gray-50">
                <td className="p-3 border">{idx + 1}</td>
                <td className="p-3 border">{admin.fullName}</td>
                <td className="p-3 border">{admin.email}</td>
                <td className="p-3 border">{admin.phoneNumber}</td>
              </tr>
            ))}

            {!loading && admins.length === 0 && !error && (
              <tr>
                <td colSpan="4" className="p-6 text-center text-gray-500">
                  No admins found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* الفورم */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Create Admin</h2>
            <form onSubmit={handleCreateAdmin} className="space-y-3">
              <input
                type="text"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="text"
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="password"
                placeholder="Confirm Password"
                value={formData.cpassword}
                onChange={(e) => setFormData({ ...formData, cpassword: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 border rounded hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
