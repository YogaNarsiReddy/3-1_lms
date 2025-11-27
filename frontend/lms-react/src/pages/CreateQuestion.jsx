import { useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../api/axiosClient";

export default function CreateQuestion() {
  const { quizId } = useParams();

  const [form, setForm] = useState({
    questionText: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    correctOption: "A"
  });

  const handleSubmit = async () => {
    try {
      await axiosClient.post("/questions/add", {
        quizId: Number(quizId),
        ...form
      });

      alert("Question added!");
    } catch (err) {
      alert("Failed to add question.");
      console.error(err);
    }
  };

  const change = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Add Question</h2>

      <input className="border p-2 w-full mb-3" placeholder="Question Text"
        onChange={e => change("questionText", e.target.value)} />

      <input className="border p-2 w-full mb-2" placeholder="Option A"
        onChange={e => change("optionA", e.target.value)} />

      <input className="border p-2 w-full mb-2" placeholder="Option B"
        onChange={e => change("optionB", e.target.value)} />

      <input className="border p-2 w-full mb-2" placeholder="Option C"
        onChange={e => change("optionC", e.target.value)} />

      <input className="border p-2 w-full mb-3" placeholder="Option D"
        onChange={e => change("optionD", e.target.value)} />

      <select 
        className="border p-2 w-full mb-3"
        onChange={e => change("correctOption", e.target.value)}
      >
        <option value="A">Correct Option: A</option>
        <option value="B">Correct Option: B</option>
        <option value="C">Correct Option: C</option>
        <option value="D">Correct Option: D</option>
      </select>

      <button
        onClick={handleSubmit}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Add Question
      </button>
    </div>
  );
}

