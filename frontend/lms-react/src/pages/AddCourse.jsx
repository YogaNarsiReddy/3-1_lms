import { useState, useContext } from "react";
import axiosClient from "../api/axiosClient";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AddCourse() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    thumbnailUrl: ""
  });

  const handleCreate = async () => {
    if (!user || user.role !== "INSTRUCTOR") {
      alert("Only instructors can create courses.");
      return;
    }

    const payload = {
      ...form,
      instructorId: user.id
    };

    try {
      await axiosClient.post("/courses/add", payload);
      alert("Course added!");

      navigate("/instructor/courses");
    } catch (err) {
      console.error(err);
      alert("Failed to create course");
    }
  };

  const change = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white shadow p-6 rounded">
      <h2 className="text-2xl font-bold mb-4">Add New Course</h2>

      <input 
        className="border p-2 w-full mb-3"
        placeholder="Course Title"
        onChange={(e) => change("title", e.target.value)}
      />

      <textarea
        className="border p-2 w-full mb-3"
        placeholder="Course Description"
        onChange={(e) => change("description", e.target.value)}
      />

      <input 
        className="border p-2 w-full mb-3"
        placeholder="Category (e.g., Programming)"
        onChange={(e) => change("category", e.target.value)}
      />

      <input 
        className="border p-2 w-full mb-3"
        placeholder="Thumbnail URL (optional)"
        onChange={(e) => change("thumbnailUrl", e.target.value)}
      />

      <button
        onClick={handleCreate}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Create Course
      </button>
    </div>
  );
}
