import { useEffect, useState } from "react";
import { X } from "lucide-react";
import api from "../../lib/api";

export default function IndabaXGalleryPage() {
  const [events, setEvents] = useState([]);
  const [imagesByEvent, setImagesByEvent] = useState({});
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    api.get("/events/", { params: { site: "indabax" } }).then((res) => {
      setEvents(res.data);
      res.data.forEach((e) => {
        api.get("/gallery/", { params: { event_id: e.id } }).then((r) => {
          setImagesByEvent((prev) => ({ ...prev, [e.id]: r.data }));
        });
      });
    });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <p className="text-accent font-semibold tracking-widest text-sm mb-3">GALLERY</p>
      <h1 className="font-display text-4xl font-bold mb-12">Event Photos</h1>

      {events.length === 0 ? (
        <p className="text-center text-[--color-text-body]">No events with photos yet.</p>
      ) : (
        events.map((e) => {
          const images = imagesByEvent[e.id] || [];
          if (images.length === 0) return null;
          return (
            <div key={e.id} className="mb-16">
              <h2 className="font-display text-2xl font-bold mb-6">{e.title}</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {images.map((img) => (
                  <button key={img.id} onClick={() => setLightbox(img.image_url)} className="rounded-xl overflow-hidden h-40">
                    <img src={img.image_url} alt={e.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                  </button>
                ))}
              </div>
            </div>
          );
        })
      )}

      {lightbox && (
        <div className="fixed inset-0 bg-charcoal/90 z-50 flex items-center justify-center px-6" onClick={() => setLightbox(null)}>
          <button className="absolute top-6 right-6 text-white" onClick={() => setLightbox(null)}>
            <X size={32} />
          </button>
          <img src={lightbox} alt="Selected" className="max-h-[85vh] max-w-full rounded-xl" />
        </div>
      )}
    </div>
  );
}
