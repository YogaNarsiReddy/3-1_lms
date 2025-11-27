import { useContext, useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function MyCourses() {
  const { user } = useContext(AuthContext);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    axiosClient.get(`/enrollments/student/${user.id}`)
      .then(async (res) => {
        const enrollments = res.data;

        // if server returns course as null, fetch course details
        const coursePromises = enrollments.map((e) => {
          if (e.course) return Promise.resolve({ ...e, course: e.course });
          return axiosClient.get(`/courses/${e.courseId}`).then(r => ({ ...e, course: r.data }));
        });

        const full = await Promise.all(coursePromises);
        setEnrolledCourses(full);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [user]);

  const handleUnenroll = async (courseId) => {
    try {
      await axiosClient.delete(`/enrollments/unenroll`, { params: { studentId: user.id, courseId } });
      setEnrolledCourses(prev => prev.filter(e => e.courseId !== courseId));
      alert("Unenrolled");
    } catch (err) {
      console.error(err);
      alert("Failed to unenroll");
    }
  };

  const markCompleted = async (courseId) => {
    try {
      await axiosClient.post(`/enrollments/complete`, null, { params: { studentId: user.id, courseId } });
      setEnrolledCourses(prev => prev.map(e => e.courseId === courseId ? { ...e, completed: true } : e));
      alert("Marked completed");
    } catch (err) {
      console.error(err);
      alert("Failed to mark completed");
    }
  };

  if (!user) return <h2 className="text-center mt-10">Please login to view courses.</h2>;
  if (loading) return <h2 className="text-center mt-10">Loading...</h2>;

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-6 shadow rounded">
      <h2 className="text-3xl font-bold mb-4">My Enrolled Courses</h2>

      {enrolledCourses.length === 0 ? (
        <p className="text-gray-600">You have not enrolled in any courses yet.</p>
      ) : (
        <div className="space-y-5">
          {enrolledCourses.map((e) => (
            <div key={e.id} className="border p-4 rounded shadow-sm flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold">{e.course?.title}</h3>
                <p className="text-gray-700">{e.course?.description}</p>
                <p className="text-sm text-gray-500 mt-1">Enrolled on: {new Date(e.enrolledOn).toLocaleDateString()}</p>
                {e.completed && <span className="text-sm text-green-600 font-medium mt-2 inline-block">Completed</span>}
              </div>

              <div className="flex flex-col gap-2">
                <Link to={`/course/${e.course?.id}`} className="bg-blue-600 text-white px-4 py-2 rounded">Go to Course</Link>

                {!e.completed && (
                  <button onClick={() => markCompleted(e.courseId)} className="bg-green-600 text-white px-4 py-2 rounded">
                    Mark Completed
                  </button>
                )}

                <button onClick={() => handleUnenroll(e.courseId)} className="bg-red-500 text-white px-4 py-2 rounded">
                  Unenroll
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
