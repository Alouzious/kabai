import axios from "axios";

const api = axios.create({
  // baseURL: "https://kabai.onrender.com/api/v1",
  baseURL: "http://localhost:8000/api/v1",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("kabai_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const loginRequest = (email, password) =>
  api.post("/auth/login", { email, password });

export default api;
