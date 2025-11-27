import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import { Link } from "react-router-dom";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(0);
  const [size] = useState(6);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  const load = (p = page) => {
    setLoading(true);
    axiosClient.get("/courses/paged", {
      params: { search, category, page: p, size }
    })
    .then(res => {
      setCourses(res.data.content);
      setTotalPages(res.data.totalPages);
    })
    .catch(err => console.error(err))
    .finally(() => setLoading(false));
  };

  useEffect(() => {
    load(0);
    setPage(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, category]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search courses..."
          className="border p-2 flex-1"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select className="border p-2" value={category} onChange={e => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          <option value="Programming">Programming</option>
          <option value="Math">Math</option>
          <option value="Design">Design</option>
        </select>
      </div>

      {loading ? <div>Loading...</div> : (
        <>
          <div className="grid grid-cols-3 gap-4">
            {courses.map(course => (
              <Link key={course.id} to={`/course/${course.id}`} className="border p-4 rounded shadow hover:shadow-md">
                <h3 className="font-bold text-lg">{course.title}</h3>
                <p className="text-sm text-gray-600">{course.category}</p>
                <p className="mt-2 text-gray-700 line-clamp-3">{course.description}</p>
              </Link>
            ))}
          </div>

          <div className="flex justify-center items-center gap-3 mt-6">
            <button onClick={() => { if (page>0) { setPage(page-1); load(page-1); } }} className="px-3 py-1 border rounded">Prev</button>
            <span>Page {page+1} / {totalPages || 1}</span>
            <button onClick={() => { if (page+1<totalPages) { setPage(page+1); load(page+1); } }} className="px-3 py-1 border rounded">Next</button>
          </div>
        </>
      )}
    </div>
  );
}
