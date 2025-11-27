import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import { AuthContext } from "../context/AuthContext";

export default function TakeQuiz() {
  const { quizId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    axiosClient
      .get(`/questions/quiz/${quizId}`)
      .then((res) => setQuestions(res.data))
      .catch((err) => console.error(err));
  }, [quizId]);

  const handleSubmit = async () => {
    if (!user) {
      alert("Please login first!");
      navigate("/login");
      return;
    }

    try {
      const payload = {
        quizId: Number(quizId),
        studentId: user.id,
        answers: answers,
      };

      const res = await axiosClient.post("/attempts/submit", payload);
      alert("Quiz Submitted! Score: " + res.data.score);

      navigate(`/results/student/${user.id}`);
    } catch (err) {
      console.error(err);
      alert("Error submitting quiz.");
    }
  };

  const updateAnswer = (qId, opt) => {
    setAnswers({ ...answers, [qId]: opt });
  };

  if (questions.length === 0)
    return <h2 className="text-center mt-10">Loading questions...</h2>;

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-6 shadow rounded">
      <h2 className="text-3xl font-bold mb-4">Quiz #{quizId}</h2>

      {questions.map((q, index) => (
        <div key={q.id} className="mb-6 border p-4 rounded">
          <h3 className="text-xl font-semibold">
            Q{index + 1}. {q.questionText}
          </h3>

          <div className="mt-3 space-y-2">
            {["A", "B", "C", "D"].map((opt) => (
              <label
                key={opt}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="radio"
                  name={`q-${q.id}`}
                  value={opt}
                  onChange={() => updateAnswer(q.id, opt)}
                />
                {q[`option${opt}`]}
              </label>
            ))}
          </div>
        </div>
      ))}

      <button
        className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700"
        onClick={handleSubmit}
      >
        Submit Quiz
      </button>
    </div>
  );
}
