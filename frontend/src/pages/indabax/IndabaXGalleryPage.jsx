import { useCallback, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { X, ChevronLeft, ChevronRight, Download, ArrowLeft } from "lucide-react";
import api from "../../lib/api";

function optimized(url) {
  if (!url || !url.includes("res.cloudinary.com")) return url;
  return url.replace("/image/upload/", "/image/upload/w_800,q_auto,f_auto/");
}

function downloadImage(url, name = "photo") {
  fetch(url)
    .then((res) => res.blob())
    .then((blob) => {
      const objectUrl = URL.createObjectURL(blob);
      const ext = (url.split(".").pop() || "jpg").split("?")[0].slice(0, 5);
      const a = document.createElement("a");
      a.href = objectUrl;
      a.download = `${name}.${ext}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(objectUrl);
    })
    .catch(() => {
      window.open(url, "_blank");
    });
}

export default function IndabaXGalleryPage() {
  const [events, setEvents] = useState([]);
  const [imagesByEvent, setImagesByEvent] = useState({});
  const [lightbox, setLightbox] = useState(null);
  const [searchParams] = useSearchParams();
  const targetEventId = searchParams.get("event");

  useEffect(() => {
    api.get("/events/", { params: { site: "indabax" } }).then((res) => {
      setEvents(res.data);

      // Only fetch photos for the requested event, or for all events if none specified
      const eventsToFetch = targetEventId
        ? res.data.filter((e) => e.id === targetEventId)
        : res.data;

      eventsToFetch.forEach((e) => {
        let all = [];
        const fetchPage = (skip) =>
          api.get("/gallery/", { params: { event_id: e.id, limit: 200, skip } }).then((r) => {
            all = all.concat(r.data);
            if (r.data.length === 200) return fetchPage(skip + 200);
            setImagesByEvent((prev) => ({ ...prev, [e.id]: all }));
          });
        fetchPage(0);
      });
    });
  }, [targetEventId]);

  const closeLightbox = useCallback(() => setLightbox(null), []);

  const move = useCallback(
    (dir) => {
      if (!lightbox) return;
      const images = lightbox.images;
      const next = (lightbox.index + dir + images.length) % images.length;
      setLightbox({ ...lightbox, index: next });
    },
    [lightbox]
  );

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") move(-1);
      if (e.key === "ArrowRight") move(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, closeLightbox, move]);

  // When a specific event is targeted, only show that event's data
  const eventsToShow = targetEventId
    ? events.filter((e) => e.id === targetEventId)
    : events;

  const targetEvent = targetEventId ? events.find((e) => e.id === targetEventId) : null;

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <p className="text-indabax-green font-semibold tracking-widest text-sm mb-3">GALLERY</p>

      {targetEventId ? (
        <div className="mb-12">
          <Link
            to="/indabax/gallery"
            className="inline-flex items-center gap-2 text-sm text-indabax-green font-semibold mb-4 hover:text-indabax-green-dark transition-colors"
          >
            <ArrowLeft size={16} /> All albums
          </Link>
          <h1 className="font-display text-4xl font-bold">
            {targetEvent ? targetEvent.title : "Loading album…"}
          </h1>
        </div>
      ) : (
        <h1 className="font-display text-4xl font-bold mb-12">Event Photos</h1>
      )}

      {eventsToShow.length === 0 ? (
        <p className="text-center text-[--color-text-body]">No events with photos yet.</p>
      ) : (
        eventsToShow.map((e) => {
          const images = imagesByEvent[e.id] || [];
          if (images.length === 0) return null;
          return (
            <div key={e.id} id={`event-${e.id}`} className="mb-16 scroll-mt-24">
              {!targetEventId && <h2 className="font-display text-2xl font-bold mb-6">{e.title}</h2>}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {images.map((img, i) => (
                  <div key={img.id} className="group relative rounded-xl overflow-hidden h-40">
                    <button onClick={() => setLightbox({ images, index: i })} className="w-full h-full">
                      <img src={optimized(img.image_url)} alt={e.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    </button>
                    <button
                      onClick={() => downloadImage(img.image_url, e.title)}
                      title="Download photo"
                      className="absolute bottom-2 right-2 p-2 rounded-full bg-black/60 text-white hover:bg-indabax-green hover:text-black transition-colors"
                    >
                      <Download size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        })
      )}

      {lightbox && (
        <div
          className="fixed inset-0 bg-indabax-black/90 z-50 flex items-center justify-center px-6"
          onClick={closeLightbox}
        >
          <button className="absolute top-6 right-6 text-white hover:text-indabax-green" onClick={closeLightbox}>
            <X size={32} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              move(-1);
            }}
            className="absolute left-4 md:left-8 text-white hover:text-indabax-green"
            aria-label="Previous photo"
          >
            <ChevronLeft size={44} />
          </button>
          <img
            src={optimized(lightbox.images[lightbox.index].image_url)}
            alt="Selected"
            className="max-h-[85vh] max-w-full rounded-xl"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              move(1);
            }}
            className="absolute right-4 md:right-8 text-white hover:text-indabax-green"
            aria-label="Next photo"
          >
            <ChevronRight size={44} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              downloadImage(lightbox.images[lightbox.index].image_url);
            }}
            className="absolute bottom-6 right-6 flex items-center gap-2 px-4 py-2 rounded-full bg-indabax-green text-black font-semibold hover:bg-white transition-colors"
          >
            <Download size={18} /> Download
          </button>
          <p className="absolute bottom-6 left-6 text-white/80 font-medium">
            {lightbox.index + 1} / {lightbox.images.length}
          </p>
        </div>
      )}
    </div>
  );
}
