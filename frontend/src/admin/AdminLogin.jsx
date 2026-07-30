import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.detail || "Login failed. Check your credentials."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-charcoal px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <p className="font-display text-2xl font-semibold text-cream">Kabai Admin</p>
          <p className="text-sm text-cream/50 mt-1">Sign in to manage content</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-cream rounded-lg shadow-xl px-8 py-8"
        >
          <div className="mb-4">
            <label className="block text-sm font-medium text-charcoal mb-1.5">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-border-soft rounded-md text-sm text-text-body focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-charcoal mb-1.5">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-border-soft rounded-md text-sm text-text-body focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
            />
          </div>

          {error && (
            <p className="text-sm text-red-600 mb-4 bg-red-50 border border-red-200 rounded-md px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-accent hover:bg-accent-light text-charcoal font-semibold text-sm rounded-md py-2.5 transition-colors disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
