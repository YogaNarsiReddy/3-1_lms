import { useEffect, useState, useContext } from "react";
import axiosClient from "../api/axiosClient";
import { AuthContext } from "../context/AuthContext";

export default function AdminPanel() {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (user?.role !== "ADMIN") return;

    axiosClient.get("/admin/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err));
  }, [user]);

  if (!user || user.role !== "ADMIN") {
    return <h2 className="text-center mt-10">Access Denied</h2>;
  }

  // Change role
  const updateRole = async (id, newRole) => {
    await axiosClient.post(`/admin/users/${id}/role?role=${newRole}`);
    setUsers(users.map(u => u.id === id ? { ...u, role: newRole } : u));
  };

  // Change status
  const updateStatus = async (id, newStatus) => {
    await axiosClient.post(`/admin/users/${id}/status?status=${newStatus}`);
    setUsers(users.map(u => u.id === id ? { ...u, status: newStatus } : u));
  };

  // Delete
  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    await axiosClient.delete(`/admin/users/${id}`);
    setUsers(users.filter(u => u.id !== id));
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 bg-white p-6 shadow rounded">
      <h2 className="text-3xl font-bold mb-4">Admin Panel — Manage Users</h2>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Role</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="text-center">
              <td className="border p-2">{u.id}</td>
              <td className="border p-2">{u.name}</td>
              <td className="border p-2">{u.email}</td>

              {/* ROLE DROPDOWN */}
              <td className="border p-2">
                <select
                  value={u.role}
                  onChange={(e) => updateRole(u.id, e.target.value)}
                  className="border p-1"
                >
                  <option value="STUDENT">STUDENT</option>
                  <option value="INSTRUCTOR">INSTRUCTOR</option>
                  <option value="ADMIN">ADMIN</option>
                </select>
              </td>

              {/* STATUS DROPDOWN */}
              <td className="border p-2">
                <select
                  value={u.status}
                  onChange={(e) => updateStatus(u.id, e.target.value)}
                  className="border p-1"
                >
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="BLOCKED">BLOCKED</option>
                  <option value="PENDING">PENDING</option>
                </select>
              </td>

              {/* DELETE BUTTON */}
              <td className="border p-2">
                <button 
                  onClick={() => deleteUser(u.id)} 
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
