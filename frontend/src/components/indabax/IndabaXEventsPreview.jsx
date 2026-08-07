import { useEffect, useState } from "react";
import api from "../../lib/api";

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function IndabaXEventsPreview() {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);

  useEffect(() => {
    api
      .get("/events/", { params: { site: "indabax", is_past: false, limit: 2 } })
      .then((r) => setUpcomingEvents(r.data))
      .catch(() => {});
    api
      .get("/events/", { params: { site: "indabax", is_past: true, limit: 2 } })
      .then((r) => setPastEvents(r.data))
      .catch(() => {});
  }, []);

  return (
    <section className="bg-indabax-black text-white px-6 py-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-indabax-green font-bold tracking-widest text-sm mb-4 uppercase">
            Events
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-black uppercase">
            Upcoming &amp; Past
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Upcoming */}
          <div>
            <h3 className="font-bold text-lg mb-6 uppercase tracking-wide text-indabax-green">
              Upcoming
            </h3>
            {upcomingEvents.length === 0 ? (
              <p className="text-white/50 text-sm">No upcoming events right now.</p>
            ) : (
              <div className="space-y-6">
                {upcomingEvents.map((e) => (
                  <div
                    key={e.id}
                    className="group bg-white rounded-2xl overflow-hidden border border-indabax-green/20 hover:border-indabax-green shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    {e.banner_url && (
                      <div className="h-56 overflow-hidden bg-indabax-green/10 relative">
                        <img
                          src={e.banner_url}
                          alt={e.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <span className="absolute top-4 left-4 bg-indabax-green text-indabax-black text-xs font-bold uppercase px-3 py-1 rounded-full">
                          Upcoming
                        </span>
                      </div>
                    )}
                    <div className="p-6">
                      <p className="text-indabax-green text-xs font-bold mb-2 uppercase tracking-wide">
                        {formatDate(e.event_date)}
                      </p>
                      <h4 className="font-bold text-xl text-indabax-black leading-snug">
                        {e.title}
                      </h4>
                      {e.description && (
                        <p className="text-sm text-indabax-black/60 mt-2 line-clamp-2">
                          {e.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Past */}
          <div>
            <h3 className="font-bold text-lg mb-6 uppercase tracking-wide text-white/70">
              Past
            </h3>
            {pastEvents.length === 0 ? (
              <p className="text-white/50 text-sm">No past events yet.</p>
            ) : (
              <div className="space-y-6">
                {pastEvents.map((e) => (
                  <div
                    key={e.id}
                    className="group bg-white/90 rounded-2xl overflow-hidden opacity-80 hover:opacity-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    {e.banner_url && (
                      <div className="h-56 overflow-hidden bg-indabax-green/10 relative grayscale-[30%] group-hover:grayscale-0 transition-all duration-500">
                        <img
                          src={e.banner_url}
                          alt={e.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <span className="absolute top-4 left-4 bg-white/90 text-indabax-black text-xs font-bold uppercase px-3 py-1 rounded-full">
                          Past
                        </span>
                      </div>
                    )}
                    <div className="p-6">
                      <p className="text-indabax-green text-xs font-bold mb-2 uppercase tracking-wide">
                        {formatDate(e.event_date)}
                      </p>
                      <h4 className="font-bold text-xl text-indabax-black leading-snug">
                        {e.title}
                      </h4>
                      {e.description && (
                        <p className="text-sm text-indabax-black/60 mt-2 line-clamp-2">
                          {e.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
