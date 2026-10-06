import { useEffect, useState } from "react";
import api from "../../lib/api";
import ImageUpload from "./ImageUpload";

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

  const urlCount = urlsText.split("\n").map((u) => u.trim()).filter(Boolean).length;

  function appendUrl(url) {
    setUrlsText((prev) => (prev.trim() ? prev.replace(/\s+$/, "") + "\n" + url : url));
  }

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
      setError("Upload photos or paste at least one image URL.");
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
        <div className="flex items-center justify-between flex-wrap gap-2 mb-1.5">
          <label className="block text-sm font-medium text-charcoal">
            Images <span className="text-accent">*</span>
            <span className="text-text-body/50 font-normal"> — upload files or paste URLs, one per line</span>
          </label>
          <ImageUpload
            folder="gallery"
            multiple
            label="Upload photos"
            className="bg-accent hover:bg-accent-light text-charcoal font-semibold text-sm rounded-md px-4 py-2 transition-colors disabled:opacity-60"
            onUploaded={appendUrl}
          />
        </div>
        <textarea
          rows={6}
          value={urlsText}
          onChange={(e) => setUrlsText(e.target.value)}
          placeholder={"Uploaded photo links appear here.\nYou can also paste image URLs, one per line."}
          className="w-full px-3 py-2 border border-border-soft rounded-md text-sm text-text-body bg-cream focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent font-mono"
        />
        {urlCount > 0 && (
          <p className="text-xs text-text-body/60 mt-1">
            {urlCount} image{urlCount === 1 ? "" : "s"} ready to add
          </p>
        )}
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
