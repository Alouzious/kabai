import { createContext, useContext, useState, useEffect } from "react";
import { loginRequest, logoutRequest, setOnUnauthorized } from "../lib/api";
import api from "../lib/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    setOnUnauthorized(() => setToken(null));
    api.get("/auth/me")
      .then(() => setToken("authenticated"))
      .catch(() => setToken(null))
      .finally(() => setChecking(false));
  }, []);

  async function login(email, password) {
    const res = await loginRequest(email, password);
    setToken("authenticated");
    return res.data;
  }

  async function logout() {
    try {
      await logoutRequest();
    } catch {
      // server unreachable — still clear local state
    }
    setToken(null);
  }

  return (
    <AuthContext.Provider value={{ token, login, logout, isAuthenticated: !!token, checking }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
