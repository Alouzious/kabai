import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Camera, ChevronLeft, ChevronRight } from "lucide-react";
import api from "../../lib/api";

const MAX_ALBUMS = 6;
const COUNT_LIMIT = 100;

function optimized(url) {
  if (!url || !url.includes("res.cloudinary.com")) return url;
  return url.replace("/image/upload/", "/image/upload/w_800,q_auto,f_auto/");
}

function formatDate(d) {
  if (!d) return "";
  const date = new Date(d);
  if (isNaN(date)) return "";
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export default function IndabaXGalleryPreview() {
  const [albums, setAlbums] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const trackRef = useRef(null);

  useEffect(() => {
    api
      .get("/events/", { params: { site: "indabax", limit: 50 } })
      .then((res) => {
        // newest first, only look at the latest few events
        const events = [...res.data]
          .sort((a, b) => new Date(b.event_date) - new Date(a.event_date))
          .slice(0, MAX_ALBUMS * 2);

        Promise.all(
          events.map((e) =>
            api
              .get("/gallery/", { params: { event_id: e.id, limit: COUNT_LIMIT } })
              .then((r) => ({ event: e, cover: r.data[0] || null, count: r.data.length }))
              .catch(() => ({ event: e, cover: null, count: 0 }))
          )
        ).then((results) => {
          setAlbums(results.filter((r) => r.cover).slice(0, MAX_ALBUMS));
          setLoaded(true);
        });
      })
      .catch(() => setLoaded(true));
  }, []);

  function updateArrows() {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }

  useEffect(() => {
    updateArrows();
    window.addEventListener("resize", updateArrows);
    return () => window.removeEventListener("resize", updateArrows);
  }, [albums]);

  function scrollByPage(dir) {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth + 32), behavior: "smooth" });
  }

  return (
    <section className="bg-indabax-black px-6 py-24">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-display text-4xl md:text-5xl font-black text-white uppercase text-center mb-12">
          Moments from IndabaX
        </h2>

        {loaded && albums.length > 0 && (
          <div className="relative">
            <div
              ref={trackRef}
              onScroll={updateArrows}
              className="flex gap-8 overflow-x-auto snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {albums.map(({ event, cover, count }) => (
                <Link
                  key={event.id}
                  to={`/indabax/gallery?event=${event.id}`}
                  className="group relative block shrink-0 snap-start w-full md:w-[calc(50%-1rem)] h-72 md:h-96 rounded-2xl overflow-hidden"
                >
                  <img
                    src={optimized(cover.image_url)}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-4 right-4 bg-black/60 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {count >= COUNT_LIMIT ? `${COUNT_LIMIT}+` : count} {count === 1 ? "photo" : "photos"}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col items-start justify-end text-left p-6">
                    <span className="flex items-center gap-1.5 text-indabax-green font-bold tracking-widest text-xs mb-2 uppercase">
                      <Camera size={14} /> View Album
                    </span>
                    <h3 className="font-display text-xl md:text-2xl font-black text-white uppercase leading-tight">
                      {event.title}
                    </h3>
                    {formatDate(event.event_date) && (
                      <p className="text-white/70 text-sm mt-1">{formatDate(event.event_date)}</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>

            {canPrev && (
              <button
                onClick={() => scrollByPage(-1)}
                aria-label="Previous albums"
                className="absolute left-2 md:-left-5 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/70 hover:bg-indabax-green text-white hover:text-black transition-colors"
              >
                <ChevronLeft size={26} />
              </button>
            )}
            {canNext && (
              <button
                onClick={() => scrollByPage(1)}
                aria-label="Next albums"
                className="absolute right-2 md:-right-5 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/70 hover:bg-indabax-green text-white hover:text-black transition-colors"
              >
                <ChevronRight size={26} />
              </button>
            )}
          </div>
        )}

        <div className="text-center mt-12">
          <Link
            to="/indabax/gallery"
            className="text-indabax-green font-bold uppercase tracking-wide transition-colors hover:text-white"
          >
            View all albums →
          </Link>
        </div>
      </div>
    </section>
  );
}
