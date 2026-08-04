import { createContext, useContext, useState, useEffect } from "react";
import { loginRequest, logoutRequest, setOnUnauthorized } from "../lib/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("kabai_token"));

  useEffect(() => {
    setOnUnauthorized(() => setToken(null));
  }, []);

  async function login(email, password) {
    const res = await loginRequest(email, password);
    const accessToken = res.data.access_token;
    localStorage.setItem("kabai_token", accessToken);
    setToken(accessToken);
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
    <AuthContext.Provider value={{ token, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
