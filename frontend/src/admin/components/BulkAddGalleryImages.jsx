import { useEffect, useState } from "react";
import api from "../../lib/api";

export default function BulkAddGalleryImages({ onAdded }) {
  const [events, setEvents] = useState([]);
  const [eventId, setEventId] = useState("");
  const [urlsText, setUrlsText] = useState("");
  const [saving, setSaving] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/events/", { params: { site: "indabax", limit: 100 } })
      .then((res) => setEvents(res.data))
      .catch(() => setEvents([]));
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setResult(null);

    if (!eventId) {
      setError("Choose an event first.");
      return;
    }

    const urls = urlsText
      .split("\n")
      .map((u) => u.trim())
      .filter(Boolean);

    if (urls.length === 0) {
      setError("Paste at least one image URL.");
      return;
    }

    setSaving(true);
    let successCount = 0;
    let failCount = 0;

    for (const url of urls) {
      try {
        await api.post("/gallery/", { event_id: eventId, image_url: url, caption: "" });
        successCount++;
      } catch {
        failCount++;
      }
    }

    setSaving(false);
    setResult({ successCount, failCount });
    setUrlsText("");
    if (successCount > 0 && onAdded) onAdded();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-border-soft bg-cream-dark/30 rounded-lg p-6 mb-6"
    >
      <p className="font-display font-semibold text-charcoal mb-4">
        Add multiple images to an event
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-charcoal mb-1.5">
            Event <span className="text-accent">*</span>
          </label>
          <select
            value={eventId}
            onChange={(e) => setEventId(e.target.value)}
            className="w-full px-3 py-2 border border-border-soft rounded-md text-sm text-text-body bg-cream focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
          >
            <option value="">Select event...</option>
            {events.map((ev) => (
              <option key={ev.id} value={ev.id}>
                {ev.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-charcoal mb-1.5">
          Image URLs <span className="text-accent">*</span>
          <span className="text-text-body/50 font-normal"> — one per line</span>
        </label>
        <textarea
          rows={6}
          value={urlsText}
          onChange={(e) => setUrlsText(e.target.value)}
          placeholder={"https://res.cloudinary.com/.../photo1.jpg\nhttps://res.cloudinary.com/.../photo2.jpg"}
          className="w-full px-3 py-2 border border-border-soft rounded-md text-sm text-text-body bg-cream focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent font-mono"
        />
      </div>

      {error && (
        <p className="text-sm text-red-600 mt-4 bg-red-50 border border-red-200 rounded-md px-3 py-2">
          {error}
        </p>
      )}

      {result && (
        <p className="text-sm mt-4 bg-green-50 border border-green-200 text-green-700 rounded-md px-3 py-2">
          Added {result.successCount} image{result.successCount === 1 ? "" : "s"}.
          {result.failCount > 0 && ` ${result.failCount} failed.`}
        </p>
      )}

      <button
        type="submit"
        disabled={saving}
        className="bg-accent hover:bg-accent-light text-charcoal font-semibold text-sm rounded-md px-5 py-2 transition-colors disabled:opacity-60 mt-4"
      >
        {saving ? "Adding..." : "Add Images"}
      </button>
    </form>
  );
}
