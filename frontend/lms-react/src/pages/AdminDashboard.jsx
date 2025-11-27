import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    // If you have an admin analytics endpoint; otherwise mock
    axiosClient.get("/admin/analytics")
      .then(res => setStats(res.data))
      .catch(() => {
        setStats({
          totalUsers: 10,
          totalStudents: 8,
          totalInstructors: 2,
          totalCourses: 5,
          totalEnrollments: 12
        });
      });
  }, []);

  if (!stats) return <div className="p-6">Loading dashboard...</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-4 gap-4">
        <div className="p-4 bg-white rounded shadow">
          <div className="text-sm text-gray-500">Total Users</div>
          <div className="text-2xl font-bold">{stats.totalUsers}</div>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <div className="text-sm text-gray-500">Students</div>
          <div className="text-2xl font-bold">{stats.totalStudents}</div>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <div className="text-sm text-gray-500">Instructors</div>
          <div className="text-2xl font-bold">{stats.totalInstructors}</div>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <div className="text-sm text-gray-500">Courses</div>
          <div className="text-2xl font-bold">{stats.totalCourses}</div>
        </div>
      </div>
    </div>
  );
}
