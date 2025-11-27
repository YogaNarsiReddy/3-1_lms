import { useContext, useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import { AuthContext } from "../context/AuthContext";

export default function MyQuizHistory() {
  const { user } = useContext(AuthContext);
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!user) return;
    axiosClient
      .get(`/results/student/${user.id}`)
      .then((res) => setResults(res.data))
      .catch((err) => console.error(err));
  }, [user]);

  if (!user) return <h2 className="text-center mt-10">Please Login.</h2>;

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-6 shadow rounded">
      <h2 className="text-2xl font-bold mb-4">My Quiz History</h2>

      {results.length === 0 ? (
        <p className="text-gray-600">No quiz attempts found.</p>
      ) : (
        <div className="space-y-4">
          {results.map((r) => (
            <div key={r.id} className="border p-4 rounded">
              <p><strong>Quiz ID:</strong> {r.quizId}</p>
              <p><strong>Score:</strong> {r.score}</p>
              <p><strong>Taken On:</strong> {r.takenOn || "Unknown"}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
