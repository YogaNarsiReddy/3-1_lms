import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import { AuthContext } from "../context/AuthContext";

export default function CourseDetails() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [quizzes, setQuizzes] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    axiosClient
      .get(`/courses/${id}`)
      .then((res) => setCourse(res.data))
      .catch((err) => console.error(err));

    axiosClient
      .get(`/quizzes/course/${id}`)
      .then((res) => setQuizzes(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleEnroll = async () => {
    if (!user) {
      alert("Please login first!");
      return;
    }

    if (user.role !== "STUDENT") {
      alert("Only students can enroll in courses.");
      return;
    }

    try {
      await axiosClient.post(
        `/enrollments/enroll?studentId=${user.id}&courseId=${id}`
      );
      alert("Enrolled successfully!");
    } catch (err) {
      alert("Error enrolling (maybe already enrolled).");
    }
  };

  if (!course)
    return (
      <h2 className="text-center mt-10 text-xl font-semibold">
        Loading course details...
      </h2>
    );

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-6 shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-3">{course.title}</h1>
      <p className="text-gray-700 mb-3">{course.description}</p>

      <p className="text-sm bg-gray-200 inline-block px-3 py-1 rounded-full mb-4">
        Category: {course.category}
      </p>

      <div className="flex justify-between items-center mt-6">
        {user?.role === "STUDENT" && (
          <button
            onClick={handleEnroll}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
          >
            Enroll Now
          </button>
        )}

        <p className="text-sm text-gray-500">
          Instructor ID: {course.instructorId}
        </p>
      </div>

      <hr className="my-6" />

      <h2 className="text-2xl font-semibold mb-3">Quizzes</h2>

      {quizzes.length === 0 ? (
        <p className="text-gray-600">No quizzes for this course yet.</p>
      ) : (
        <div className="space-y-3">
          {quizzes.map((q) => (
            <div
              key={q.id}
              className="border p-4 rounded flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold">{q.title}</h3>
                <p className="text-sm text-gray-600">Quiz ID: {q.id}</p>
              </div>

              <Link
                to={`/quiz/${q.id}`}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Take Quiz
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
