import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../api/axiosClient";

export default function QuizAttempts() {
  const { quizId } = useParams();
  const [attempts, setAttempts] = useState([]);

  useEffect(() => {
    axiosClient
      .get(`/results/quiz/${quizId}`)
      .then((res) => setAttempts(res.data))
      .catch((err) => console.error(err));
  }, [quizId]);

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-6 shadow rounded">
      <h2 className="text-2xl font-bold mb-4">
        Quiz Attempts (Quiz ID: {quizId})
      </h2>

      {attempts.length === 0 ? (
        <p className="text-gray-600">No attempts yet.</p>
      ) : (
        <div className="space-y-4">
          {attempts.map((a) => (
            <div key={a.id} className="border p-4 rounded">
              <p><strong>Student ID:</strong> {a.studentId}</p>
              <p><strong>Score:</strong> {a.score}</p>
              <p><strong>Taken On:</strong> {a.takenOn}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
