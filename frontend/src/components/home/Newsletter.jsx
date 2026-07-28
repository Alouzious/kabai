import { useState } from "react";
import { Mail } from "lucide-react";
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
    <section className="bg-gradient-to-br from-accent to-accent-light px-6 py-20 text-center">
      <div className="max-w-xl mx-auto">
        <div className="bg-white/20 backdrop-blur-sm w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6">
          <Mail className="text-white" size={24} />
        </div>
        <h2 className="font-display text-3xl font-bold mb-3 text-white">Stay in the Loop</h2>
        <p className="text-white/90 mb-8">
          Get updates on events, workshops, and opportunities from KAB AI.
        </p>
        <form onSubmit={handleSubmit} className="flex gap-3 flex-col sm:flex-row">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="flex-1 px-4 py-3 rounded-lg text-charcoal placeholder-charcoal/50 bg-white border-2 border-white shadow-md outline-none focus:ring-2 focus:ring-white"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="bg-charcoal text-white px-6 py-3 rounded-lg font-semibold hover:bg-charcoal-light transition"
          >
            {status === "loading" ? "Subscribing..." : "Subscribe"}
          </button>
        </form>
        {status === "success" && <p className="text-white font-medium mt-3 text-sm">Subscribed! Thank you.</p>}
        {status === "error" && <p className="text-charcoal font-medium mt-3 text-sm">Something went wrong, try again.</p>}
      </div>
    </section>
  );
}