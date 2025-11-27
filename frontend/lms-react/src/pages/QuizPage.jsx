import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import { AuthContext } from "../context/AuthContext";

export default function QuizPage() {
  const { quizId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({}); // { questionId: "A" }
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    axiosClient.get(`/questions/quiz/${quizId}`)
      .then(res => setQuestions(res.data))
      .catch(err => {
        console.error(err);
        alert("Failed to load questions");
        navigate("/");
      });
  }, [quizId]);

  const choose = (questionId, option) => {
    setAnswers(prev => ({ ...prev, [questionId]: option }));
  };

  const handleSubmit = async () => {
    if (!user) {
      alert("Please login to submit the quiz.");
      return;
    }
    // Ensure at least one answer
    if (Object.keys(answers).length === 0) {
      if (!confirm("You haven't answered anything. Submit anyway?")) return;
    }

    const payload = {
      studentId: user.id,
      quizId: Number(quizId),
      answers: answers
    };

    try {
      setSubmitting(true);
      const res = await axiosClient.post("/quizzes/attempt", payload);
      setResult(res.data);
    } catch (err) {
      console.error("Submit error:", err);
      alert("Failed to submit quiz.");
    } finally {
      setSubmitting(false);
    }
  };

  if (result) {
    return (
      <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow rounded">
        <h2 className="text-2xl font-bold mb-4">Quiz Result</h2>
        <p className="mb-2">Score: <span className="font-semibold">{result.score}</span></p>
        <p className="mb-4">Taken on: {result.takenOn || result.taken_on || "just now"}</p>
        <button onClick={() => navigate(-1)} className="bg-blue-600 text-white px-4 py-2 rounded">Back</button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Quiz</h2>

      {questions.length === 0 ? (
        <p className="text-gray-600">No questions found for this quiz.</p>
      ) : (
        <div className="space-y-6">
          {questions.map((q, idx) => (
            <div key={q.id} className="border p-4 rounded">
              <p className="font-semibold">{idx + 1}. {q.questionText}</p>

              <div className="mt-3 space-y-2">
                {["optionA","optionB","optionC","optionD"].map((optKey, i) => {
                  const label = optKey === "optionA" ? "A" : optKey === "optionB" ? "B" : optKey === "optionC" ? "C" : "D";
                  const text = q[optKey] || "";
                  return (
                    <label key={optKey} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name={`q-${q.id}`}
                        checked={answers[q.id] === label}
                        onChange={() => choose(q.id, label)}
                      />
                      <span className="ml-1">{label}. {text}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          ))}

          <div className="flex gap-3">
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
            >
              {submitting ? "Submitting..." : "Submit Quiz"}
            </button>

            <button onClick={() => navigate(-1)} className="bg-gray-200 px-4 py-2 rounded">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
