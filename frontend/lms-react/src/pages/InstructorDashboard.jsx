import { useContext, useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function InstructorDashboard() {
  const { user } = useContext(AuthContext);

  const [courses, setCourses] = useState([]);
  const [attempts, setAttempts] = useState([]);

  // Load courses for instructor
  useEffect(() => {
    if (!user) return;

    axiosClient
      .get(`/courses/instructor/${user.id}`)
      .then((res) => setCourses(res.data))
      .catch((err) => console.error(err));
  }, [user]);

  // Load quiz attempts for instructor
  useEffect(() => {
    if (!user) return;

    axiosClient
      .get(`/quizzes/results/instructor/${user.id}`)
      .then((res) => setAttempts(res.data))
      .catch((err) => console.error(err));
  }, [user]);

  if (!user || user.role !== "INSTRUCTOR") {
    return <h2 className="text-center mt-10">Unauthorized</h2>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Instructor Dashboard</h1>

      {/* Add Course Button */}
      <Link
        to="/instructor/add-course"
        className="bg-green-600 text-white px-4 py-2 rounded mb-6 inline-block"
      >
        + Add Course
      </Link>

      {/* Instructor Courses */}
      <h2 className="text-2xl font-bold mt-6 mb-3">Your Courses</h2>
      <div className="grid grid-cols-3 gap-4">
        {courses.map((c) => (
          <div key={c.id} className="border p-4 rounded shadow">
            <h3 className="font-bold text-xl">{c.title}</h3>
            <p className="text-gray-700">{c.category}</p>

            <div className="flex flex-col mt-3 gap-2">
              <Link
                to={`/instructor/${c.id}/quizzes`}
                className="bg-blue-600 text-white px-3 py-1 rounded"
              >
                Manage Quizzes
              </Link>

              <Link
                to={`/instructor/${c.id}/add-quiz`}
                className="bg-purple-600 text-white px-3 py-1 rounded"
              >
                Add Quiz
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Quiz Attempts */}
      <h2 className="text-2xl font-bold mt-10">Student Quiz Attempts</h2>

      {attempts.length === 0 ? (
        <p className="text-gray-600 mt-3">No quiz attempts yet.</p>
      ) : (
        <table className="w-full mt-4 border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Quiz</th>
              <th className="p-2 border">Student</th>
              <th className="p-2 border">Score</th>
              <th className="p-2 border">Taken On</th>
            </tr>
          </thead>
          <tbody>
            {attempts.map((a) => (
              <tr key={a.id}>
                <td className="p-2 border">{a.quizId}</td>
                <td className="p-2 border">{a.studentId}</td>
                <td className="p-2 border">{a.score}</td>
                <td className="p-2 border">{a.takenOn}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
