import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../api/axiosClient";

export default function ViewQuizAttempts() {
  const { quizId } = useParams();
  const [attempts, setAttempts] = useState([]);

  useEffect(() => {
    axiosClient
      .get(`/results/quiz/${quizId}`)
      .then((res) => setAttempts(res.data))
      .catch((err) => console.error(err));
  }, [quizId]);

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-3xl font-bold mb-4">Quiz Attempts</h2>
      <p className="text-gray-600 mb-4">Quiz ID: {quizId}</p>

      {attempts.length === 0 ? (
        <p className="text-gray-600">No attempts yet.</p>
      ) : (
        <div className="space-y-4">
          {attempts.map((a) => (
            <div key={a.id} className="border p-4 rounded shadow-sm">
              <p className="font-semibold">Student ID: {a.studentId}</p>
              <p>Score: {a.score}</p>
              <p className="text-gray-500">
                Attempted On: {a.takenOn ? a.takenOn : "N/A"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
