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
    <section className="bg-accent px-6 py-14 md:py-16">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="text-center md:text-left">
          <p className="text-charcoal font-bold tracking-wide text-xs md:text-sm mb-2 uppercase">
            Subscribe to Our Newsletter
          </p>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-charcoal mb-2">
            Get Updates on News, Events &amp; Opportunities
          </h2>
          <p className="text-charcoal/70 text-sm md:text-base">
            Sign up to get the latest updates from KAB AI by email.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex gap-3 flex-col sm:flex-row w-full md:w-auto shrink-0">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            className="w-full sm:w-72 px-4 py-3 rounded-lg text-charcoal placeholder-charcoal/50 bg-white outline-none focus:ring-2 focus:ring-charcoal/30"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="bg-charcoal text-white px-6 py-3 rounded-lg font-semibold uppercase text-sm tracking-wide hover:bg-charcoal-light transition disabled:opacity-60 whitespace-nowrap"
          >
            {status === "loading" ? "Subscribing..." : "Subscribe Now"}
          </button>
        </form>
      </div>

      {status === "success" && (
        <p className="text-charcoal font-medium mt-4 text-sm text-center md:text-left max-w-6xl mx-auto">
          Subscribed! Thank you.
        </p>
      )}
      {status === "error" && (
        <p className="text-charcoal font-medium mt-4 text-sm text-center md:text-left max-w-6xl mx-auto">
          Something went wrong, try again.
        </p>
      )}
    </section>
  );
}