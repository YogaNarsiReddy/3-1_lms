import axios from "axios";

const apiBaseUrl =
  window.RUNTIME_API_URL ||
  import.meta.env.VITE_API_BASE_URL ||
  process.env.REACT_APP_API_BASE_URL ||
  "http://localhost:8078"; // only for local dev

console.log("🔗 Using API Base URL:", apiBaseUrl);

const axiosClient = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;
