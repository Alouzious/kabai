import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Camera } from "lucide-react";
import api from "../../lib/api";

function optimized(url) {
  if (!url || !url.includes("res.cloudinary.com")) return url;
  return url.replace("/image/upload/", "/image/upload/w_800,q_auto,f_auto/");
}

export default function IndabaXGalleryPreview() {
  const [albums, setAlbums] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    api
      .get("/events/", { params: { site: "indabax", limit: 50 } })
      .then((res) => {
        const events = res.data;
        Promise.all(
          events.map((e) =>
            api
              .get("/gallery/", { params: { event_id: e.id, limit: 1 } })
              .then((r) => ({ event: e, cover: r.data[0] || null }))
              .catch(() => ({ event: e, cover: null }))
          )
        ).then((results) => {
          // Only show events that actually have at least one photo
          setAlbums(results.filter((r) => r.cover));
          setLoaded(true);
        });
      })
      .catch(() => setLoaded(true));
  }, []);

  return (
    <section className="bg-indabax-black px-6 py-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-indabax-green font-bold tracking-widest text-sm mb-4 uppercase">Gallery</p>
          <h2 className="font-display text-4xl md:text-5xl font-black text-white uppercase">Moments from IndabaX</h2>
        </div>

        {!loaded ? null : albums.length === 0 ? (
          <div className="text-center">
            <Link to="/indabax/gallery" className="text-indabax-green font-bold uppercase tracking-wide transition-colors hover:text-white">
              View full gallery
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {albums.map(({ event, cover }) => (
              <Link
                key={event.id}
                to={`/indabax/gallery?event=${event.id}`}
                className="group relative block rounded-2xl overflow-hidden h-72 md:h-96"
              >
                <img
                  src={optimized(cover.image_url)}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col items-start justify-end text-left p-6">
                  <span className="flex items-center gap-1.5 text-indabax-green font-bold tracking-widest text-xs mb-2 uppercase">
                    <Camera size={14} /> View Album
                  </span>
                  <h3 className="font-display text-xl md:text-2xl font-black text-white uppercase leading-tight">
                    {event.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link to="/indabax/gallery" className="text-indabax-green font-bold uppercase tracking-wide transition-colors hover:text-white">
            View full gallery
          </Link>
        </div>
      </div>
    </section>
  );
}
