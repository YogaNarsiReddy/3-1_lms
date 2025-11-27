import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";

export default function CreateQuiz() {
  const { courseId } = useParams();
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  const handleCreate = async () => {
    try {
      const res = await axiosClient.post("/quizzes/create", {
        courseId: Number(courseId),
        title
      });

      alert("Quiz created!");
      navigate(`/instructor/${courseId}/quizzes`);
    } catch (err) {
      console.error(err);
      alert("Failed to create quiz.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 shadow rounded">
      <h2 className="text-2xl font-bold mb-3">Create Quiz</h2>

      <input
        className="border p-2 w-full mb-3"
        placeholder="Quiz Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button
        onClick={handleCreate}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Create Quiz
      </button>
    </div>
  );
}

