import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";

export default function AdminCourses() {
  const [courses, setCourses] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    setLoading(true);
    try {
      const res = await axiosClient.get("/courses/all");
      setCourses(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load courses");
    } finally {
      setLoading(false);
    }
  };

  const deleteCourse = async (id) => {
    if (!confirm("Delete course?")) return;
    try {
      await axiosClient.delete(`/courses/${id}`);
      load();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  const saveCourse = async () => {
    try {
      await axiosClient.put(`/courses/${editing.id}`, editing);
      setEditing(null);
      load();
      alert("Updated");
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  if (loading) return <h3 className="text-center mt-10">Loading courses...</h3>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Courses</h1>

      {courses.length === 0 ? <p>No courses</p> : (
        <div className="space-y-4">
          {courses.map((c) => (
            <div key={c.id} className="border p-4 rounded flex justify-between items-start">
              <div className="w-3/4">
                <h3 className="font-semibold">{c.title}</h3>
                <p className="text-sm text-gray-700">{c.description}</p>
                <p className="text-xs text-gray-500 mt-1">Instructor: {c.instructorId} • Category: {c.category}</p>
              </div>

              <div className="flex flex-col gap-2">
                {editing?.id === c.id ? (
                  <>
                    <input className="border p-1" value={editing.title} onChange={(e)=>setEditing({...editing, title: e.target.value})} />
                    <input className="border p-1" value={editing.category} onChange={(e)=>setEditing({...editing, category: e.target.value})} />
                    <input className="border p-1" value={editing.instructorId} onChange={(e)=>setEditing({...editing, instructorId: e.target.value})} />
                    <div className="flex gap-2">
                      <button onClick={saveCourse} className="bg-green-600 text-white px-3 py-1 rounded">Save</button>
                      <button onClick={()=> setEditing(null)} className="bg-gray-400 text-white px-3 py-1 rounded">Cancel</button>
                    </div>
                  </>
                ) : (
                  <>
                    <button onClick={()=> setEditing(c)} className="bg-blue-600 text-white px-3 py-1 rounded">Edit</button>
                    <button onClick={()=> deleteCourse(c.id)} className="bg-red-600 text-white px-3 py-1 rounded">Delete</button>
                    <button onClick={()=> window.location.href = `/course/${c.id}`} className="bg-purple-600 text-white px-3 py-1 rounded">Open</button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
