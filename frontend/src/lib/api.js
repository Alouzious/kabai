import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1",
  withCredentials: true,
});

let onUnauthorized = null;
export function setOnUnauthorized(cb) {
  onUnauthorized = cb;
}

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401 && onUnauthorized) {
      onUnauthorized();
    }
    return Promise.reject(err);
  },
);

export const loginRequest = (email, password) =>
  api.post("/auth/login", { email, password });

export const logoutRequest = () => api.post("/auth/logout");

export default api;
