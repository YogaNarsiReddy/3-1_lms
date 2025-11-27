import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axiosClient from "../api/axiosClient";

export default function QuizList() {
  const { courseId } = useParams();
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log("CourseId from URL =", courseId);  // DEBUG

  useEffect(() => {
    if (!courseId) return;

    axiosClient
      .get(`/quizzes/course/${courseId}`)
      .then((res) => {
        console.log("Quiz API Response =", res.data); // DEBUG
        setQuizzes(res.data);
      })
      .catch((err) => console.error("Error fetching quizzes:", err))
      .finally(() => setLoading(false));
  }, [courseId]); // << FIXED
                   // Now re-runs when courseId changes

  if (loading) return <h3 className="text-center mt-10">Loading...</h3>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">
        Quizzes for Course {courseId}
      </h2>

      {quizzes.length === 0 && <p>No quizzes found.</p>}

      {quizzes.map((q) => (
        <div key={q.id} className="border p-3 mb-3 rounded">
          <p className="font-semibold">{q.title}</p>

          <div className="mt-2 flex gap-2">
            <Link
              to={`/instructor/quiz/${q.id}/add-question`}
              className="bg-blue-600 text-white px-3 py-1 rounded"
            >
              Add Question
            </Link>

            <Link
              to={`/instructor/quiz/${q.id}/attempts`}
              className="bg-purple-600 text-white px-3 py-1 rounded"
            >
              View Attempts
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
