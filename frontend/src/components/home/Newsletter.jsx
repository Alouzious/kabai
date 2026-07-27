import { useState } from "react";
import api from "../../lib/api";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await api.post("/newsletter/subscribe", { email, site: "main" });
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="bg-charcoal text-white px-6 py-20 text-center">
      <div className="max-w-xl mx-auto">
        <h2 className="font-display text-3xl font-bold mb-3">Stay in the Loop</h2>
        <p className="text-white/70 mb-6">
          Get updates on events, workshops, and opportunities from KAB AI.
        </p>
        <form onSubmit={handleSubmit} className="flex gap-3 flex-col sm:flex-row">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="flex-1 px-4 py-3 rounded-lg text-charcoal outline-none"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="bg-accent px-6 py-3 rounded-lg font-semibold hover:bg-accent-light transition"
          >
            {status === "loading" ? "Subscribing..." : "Subscribe"}
          </button>
        </form>
        {status === "success" && <p className="text-accent mt-3 text-sm">Subscribed! Thank you.</p>}
        {status === "error" && <p className="text-red-400 mt-3 text-sm">Something went wrong, try again.</p>}
      </div>
    </section>
  );
}
