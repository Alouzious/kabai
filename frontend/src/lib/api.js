import axios from "axios";

const api = axios.create({
  baseURL: "https://kabai-c2ox.onrender.com/api/v1",
  // baseURL: "https://kabai.onrender.com/api/v1",
  // baseURL: "http://localhost:8000/api/v1",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("kabai_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let onUnauthorized = null;

export const setOnUnauthorized = (callback) => {
  onUnauthorized = callback;
};

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("kabai_token");
      if (onUnauthorized) {
        onUnauthorized();
      }
    }
    return Promise.reject(error);
  }
);

export const loginRequest = (email, password) =>
  api.post("/auth/login", { email, password });

export const logoutRequest = () => {
  localStorage.removeItem("kabai_token");
  if (onUnauthorized) {
    onUnauthorized();
  }
  return Promise.resolve();
};

export default api;
