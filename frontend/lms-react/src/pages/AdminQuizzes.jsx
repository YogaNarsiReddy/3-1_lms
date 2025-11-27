import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";

export default function AdminQuizzes(){
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{ load() }, []);

  const load = async () => {
    setLoading(true);
    try {
      const res = await axiosClient.get("/admin/quizzes");
      setQuizzes(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load quizzes");
    } finally {
      setLoading(false);
    }
  };

  const del = async(id) => {
    if(!confirm("Delete quiz?")) return;
    try {
      await axiosClient.delete(`/admin/quizzes/${id}`);
      load();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  if (loading) return <h3 className="text-center mt-10">Loading quizzes...</h3>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Quizzes</h1>

      {quizzes.length === 0 ? <p>No quizzes found</p> : (
        <div className="space-y-3">
          {quizzes.map(q => (
            <div key={q.id} className="border p-3 rounded flex justify-between items-center">
              <div>
                <p className="font-semibold">{q.title}</p>
                <p className="text-sm text-gray-600">Course ID: {q.courseId}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={()=> del(q.id)} className="bg-red-600 text-white px-3 py-1 rounded">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
