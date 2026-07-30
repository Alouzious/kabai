import { createContext, useContext, useState, useEffect } from "react";
import { loginRequest } from "../lib/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("kabai_token"));

  useEffect(() => {
    if (token) {
      localStorage.setItem("kabai_token", token);
    } else {
      localStorage.removeItem("kabai_token");
    }
  }, [token]);

  async function login(email, password) {
    const res = await loginRequest(email, password);
    setToken(res.data.access_token);
    return res.data;
  }

  function logout() {
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
