import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const res = await axiosClient.get("/admin/users");
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const changeRole = async (id, role) => {
    try {
      await axiosClient.post(`/admin/users/${id}/role?role=${role}`);
      loadUsers();
    } catch (err) {
      console.error(err);
      alert("Failed to change role");
    }
  };

  const changeStatus = async (id, status) => {
    try {
      await axiosClient.post(`/admin/users/${id}/status?status=${status}`);
      loadUsers();
    } catch (err) {
      console.error(err);
      alert("Failed to change status");
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    try {
      await axiosClient.delete(`/admin/users/${id}`);
      loadUsers();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  if (loading) return <h3 className="text-center mt-10">Loading users...</h3>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Users</h1>

      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
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
              <tr key={u.id} className="text-center border">
                <td className="p-2 border">{u.id}</td>
                <td className="p-2 border">{u.name}</td>
                <td className="p-2 border">{u.email}</td>
                <td className="p-2 border">
                  <select
                    value={u.role}
                    onChange={(e) => changeRole(u.id, e.target.value)}
                    className="border p-1"
                  >
                    <option value="STUDENT">STUDENT</option>
                    <option value="INSTRUCTOR">INSTRUCTOR</option>
                    <option value="ADMIN">ADMIN</option>
                  </select>
                </td>
                <td className="p-2 border">
                  <select
                    value={u.status}
                    onChange={(e) => changeStatus(u.id, e.target.value)}
                    className="border p-1"
                  >
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="PENDING">PENDING</option>
                    <option value="BLOCKED">BLOCKED</option>
                  </select>
                </td>
                <td className="p-2 border">
                  <button
                    onClick={() => deleteUser(u.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
