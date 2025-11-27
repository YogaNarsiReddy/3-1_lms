import { useEffect, useState, useContext } from "react";
import axiosClient from "../api/axiosClient";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function InstructorCourses() {
  const { user } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    if (!user) return;

    axiosClient
      .get(`/courses/instructor/${user.id}`)
      .then((res) => setCourses(res.data))
      .catch((err) => console.error(err));
  }, [user]);

  if (!user) return <h2 className="mt-10 text-center">Please login.</h2>;

  return (
    <div className="p-6 max-w-4xl mx-auto">

      <h2 className="text-3xl font-bold mb-5">My Courses</h2>

      {/* ➕ ADD COURSE BUTTON */}
      <div className="flex justify-end mb-4">
        <Link
          to="/instructor/add-course"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          + Add Course
        </Link>
      </div>

      {/* LIST COURSES */}
      {courses.length === 0 ? (
        <p className="text-gray-600 mt-4">You have not created any courses yet.</p>
      ) : (
        courses.map((c) => (
          <div key={c.id} className="border p-4 mb-3 rounded shadow">
            <h3 className="font-bold text-xl">{c.title}</h3>
            <p className="text-gray-700">{c.description}</p>

            <div className="flex gap-4 mt-3">
              <Link
                to={`/instructor/${c.id}/quizzes`}
                className="bg-blue-600 text-white px-3 py-1 rounded"
              >
                Manage Quizzes
              </Link>

              <Link
                to={`/instructor/${c.id}/add-quiz`}
                className="bg-green-600 text-white px-3 py-1 rounded"
              >
                Add Quiz
              </Link>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
