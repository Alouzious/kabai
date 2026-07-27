import { useEffect, useState } from "react";
import api from "../../lib/api";

export default function EventsPreview() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    api.get("/events/", { params: { site: "main", is_past: false, limit: 3 } })
      .then((res) => setEvents(res.data))
      .catch(() => setEvents([]));
  }, []);

  return (
    <section className="px-6 py-20 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <p className="text-accent font-semibold tracking-widest text-sm mb-3">EVENTS & WORKSHOPS</p>
        <h2 className="font-display text-3xl md:text-4xl font-bold">Upcoming Events</h2>
      </div>

      {events.length === 0 ? (
        <p className="text-center text-[--color-text-body]">No upcoming events right now — check back soon.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {events.map((e) => (
            <div key={e.id} className="bg-cream rounded-xl overflow-hidden">
              {e.banner_url && <img src={e.banner_url} alt={e.title} className="w-full h-40 object-cover" />}
              <div className="p-5">
                <p className="text-accent text-xs font-semibold mb-1">
                  {new Date(e.event_date).toLocaleDateString()}
                </p>
                <h3 className="font-display font-bold text-lg mb-2">{e.title}</h3>
                <p className="text-sm text-[--color-text-body] line-clamp-2">{e.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
