import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";
import MyCourses from "./pages/MyCourses";
import MyQuizHistory from "./pages/MyQuizHistory";
import TakeQuiz from "./pages/TakeQuiz";
import InstructorCourses from "./pages/InstructorCourses";
import AddCourse from "./pages/AddCourse";
import QuizList from "./pages/QuizList";
import CreateQuiz from "./pages/CreateQuiz";
import CreateQuestion from "./pages/CreateQuestion";
import ViewQuizAttempts from "./pages/ViewQuizAttempts";
import InstructorDashboard from "./pages/InstructorDashboard";

import AdminPanel from "./pages/AdminPanel";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/AdminUsers";
import AdminCourses from "./pages/AdminCourses";
import AdminQuizzes from "./pages/AdminQuizzes";

export default function App() {

  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>   {/* ⭐ REQUIRED */}
      <Navbar />

      <Routes>

        {/* Public */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Course details */}
        <Route path="/course/:id" element={<CourseDetails />} />

        {/* Student */}
        <Route
          path="/my-courses"
          element={user?.role === "STUDENT" ? <MyCourses /> : <Login />}
        />
        <Route
          path="/my-history"
          element={user?.role === "STUDENT" ? <MyQuizHistory /> : <Login />}
        />

        {/* Take Quiz */}
        <Route
          path="/quiz/:quizId"
          element={user ? <TakeQuiz /> : <Login />}
        />

        {/* Instructor */}
        <Route
          path="/instructor/dashboard"
          element={user?.role === "INSTRUCTOR" ? <InstructorDashboard /> : <Login />}
        />
        <Route
          path="/instructor/courses"
          element={user?.role === "INSTRUCTOR" ? <InstructorCourses /> : <Login />}
        />
        <Route
          path="/instructor/add-course"
          element={user?.role === "INSTRUCTOR" ? <AddCourse /> : <Login />}
        />
        <Route
          path="/instructor/:courseId/quizzes"
          element={user?.role === "INSTRUCTOR" ? <QuizList /> : <Login />}
        />
        <Route
          path="/instructor/:courseId/add-quiz"
          element={user?.role === "INSTRUCTOR" ? <CreateQuiz /> : <Login />}
        />
        <Route
          path="/instructor/quiz/:quizId/add-question"
          element={user?.role === "INSTRUCTOR" ? <CreateQuestion /> : <Login />}
        />
        <Route
          path="/instructor/quiz/:quizId/attempts"
          element={user?.role === "INSTRUCTOR" ? <ViewQuizAttempts /> : <Login />}
        />

        {/* Admin */}
        <Route
          path="/admin"
          element={user?.role === "ADMIN" ? <AdminPanel /> : <Login />}
        />
        <Route
          path="/admin/dashboard"
          element={user?.role === "ADMIN" ? <AdminDashboard /> : <Login />}
        />
        <Route
          path="/admin/users"
          element={user?.role === "ADMIN" ? <AdminUsers /> : <Login />}
        />
        <Route
          path="/admin/courses"
          element={user?.role === "ADMIN" ? <AdminCourses /> : <Login />}
        />
        <Route
          path="/admin/quizzes"
          element={user?.role === "ADMIN" ? <AdminQuizzes /> : <Login />}
        />

        {/* Courses */}
        <Route
          path="/courses"
          element={user ? <Courses /> : <Login />}
        />

      </Routes>
    </BrowserRouter>
  );
}
