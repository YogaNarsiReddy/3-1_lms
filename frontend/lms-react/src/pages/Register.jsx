import { useState } from "react";
import axiosClient from "../api/axiosClient";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "STUDENT"
  });

  const navigate = useNavigate();

  const submit = async () => {
    try {
      await axiosClient.post("/auth/register", form);
      alert("Registered!");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Registration failed.");
    }
  };

  return (
    <div className="flex justify-center mt-20">
      <div className="w-96 bg-white p-6 shadow-md rounded">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

        <input
          className="border p-2 w-full mb-3"
          placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          className="border p-2 w-full mb-3"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          className="border p-2 w-full mb-3"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        {/* ROLE DROPDOWN */}
        <select
          className="border p-2 w-full mb-3"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="STUDENT">Student</option>
          <option value="INSTRUCTOR">Instructor</option>
          <option value="ADMIN">Admin</option>
        </select>

        <button
          onClick={submit}
          className="bg-green-600 w-full py-2 rounded text-white hover:bg-green-700"
        >
          Register
        </button>
      </div>
    </div>
  );
}
