import { useEffect, useState } from "react";
import api from "../../lib/api";

export default function IndabaXEventsPreview() {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);

  useEffect(() => {
    api.get("/events/", { params: { site: "indabax", is_past: false, limit: 2 } }).then((r) => setUpcomingEvents(r.data)).catch(() => {});
    api.get("/events/", { params: { site: "indabax", is_past: true, limit: 2 } }).then((r) => setPastEvents(r.data)).catch(() => {});
  }, []);

  return (
    <section className="bg-indabax-black text-white px-6 py-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-indabax-green font-bold tracking-widest text-sm mb-4 uppercase">Events</p>
          <h2 className="font-display text-4xl md:text-5xl font-black uppercase">Upcoming &amp; Past</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <h3 className="font-bold text-lg mb-4 uppercase tracking-wide">Upcoming</h3>
            {upcomingEvents.length === 0 ? (
              <p className="text-white/50 text-sm">No upcoming events right now.</p>
            ) : (
              <div className="space-y-4">
                {upcomingEvents.map((e) => (
                  <div key={e.id} className="bg-white rounded-xl p-6 border border-indabax-green/20 hover:border-indabax-green transition-colors">
                    <p className="text-indabax-green text-xs font-bold mb-1 uppercase">{new Date(e.event_date).toLocaleDateString()}</p>
                    <h4 className="font-bold text-lg text-indabax-black">{e.title}</h4>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4 uppercase tracking-wide">Past</h3>
            {pastEvents.length === 0 ? (
              <p className="text-white/50 text-sm">No past events yet.</p>
            ) : (
              <div className="space-y-4">
                {pastEvents.map((e) => (
                  <div key={e.id} className="bg-white rounded-xl p-6 opacity-70">
                    <p className="text-indabax-green text-xs font-bold mb-1 uppercase">{new Date(e.event_date).toLocaleDateString()}</p>
                    <h4 className="font-bold text-lg text-indabax-black">{e.title}</h4>
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