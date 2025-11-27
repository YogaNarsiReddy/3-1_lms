import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-blue-600 text-white p-3 flex justify-between items-center">

      <h1 className="text-xl font-bold">
        <Link to={user ? "/courses" : "/"}>LMS</Link>
      </h1>

      <div className="flex gap-5 items-center">

        {/* COURSES (Only after login) */}
        {user && (
          <Link className="hover:text-gray-300" to="/courses">
            Courses
          </Link>
        )}

        {/* STUDENT MENU */}
        {user?.role === "STUDENT" && (
          <>
            <Link className="hover:text-gray-300" to="/my-courses">
              My Courses
            </Link>

            <Link className="hover:text-gray-300" to="/my-history">
              My Quiz History
            </Link>
          </>
        )}

        {/* INSTRUCTOR MENU */}
       {user?.role === "INSTRUCTOR" && (
  <>
    <Link className="hover:text-gray-300" to="/instructor/dashboard">
      Instructor Dashboard
    </Link>
    <Link className="hover:text-gray-300" to="/instructor/courses">
      My Courses
    </Link>
  </>
)}


        {/* ADMIN MENU */}
        {user?.role === "ADMIN" && (
          <>
            <Link className="hover:text-gray-300" to="/admin/dashboard">
              Admin Dashboard
            </Link>

            <Link className="hover:text-gray-300" to="/admin/users">
              Manage Users
            </Link>

            <Link className="hover:text-gray-300" to="/admin/courses">
              Manage Courses
            </Link>

            <Link className="hover:text-gray-300" to="/admin/quizzes">
              Manage Quizzes
            </Link>
          </>
        )}

        {/* LOGIN + REGISTER (only before login) */}
        {!user && (
          <>
            <Link className="hover:text-gray-300" to="/login">Login</Link>
            <Link className="hover:text-gray-300" to="/register">Register</Link>
          </>
        )}

        {/* LOGOUT */}
        {user && (
          <>
            <span className="font-medium">Hi, {user.name}</span>
            <button
              onClick={logout}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
