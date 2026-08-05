import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Play } from "lucide-react";
import api from "../../lib/api";

const ALBUM_TITLE = "UNVEILING DATA INSIGHTS SESSION 29TH APRIL 2026 WITH MR. SIMON ALEX";

function optimized(url) {
  if (!url || !url.includes("res.cloudinary.com")) return url;
  return url.replace("/image/upload/", "/image/upload/w_1600,q_auto,f_auto/");
}

export default function IndabaXGalleryPreview() {
  const [album, setAlbum] = useState(null);

  useEffect(() => {
    api
      .get("/events/", { params: { site: "indabax", limit: 50 } })
      .then((res) => {
        const ev = res.data.find((e) => e.title === ALBUM_TITLE) || res.data[0];
        if (!ev) return;
        api.get("/gallery/", { params: { event_id: ev.id, limit: 200 } }).then((r) => {
          if (r.data.length === 200) {
            api.get("/gallery/", { params: { event_id: ev.id, limit: 200, skip: 200 } }).then((r2) => {
              setAlbum({ event: ev, images: r.data.concat(r2.data) });
            });
          } else {
            setAlbum({ event: ev, images: r.data });
          }
        });
      })
      .catch(() => {});
  }, []);

  return (
    <section className="bg-indabax-black px-6 py-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-indabax-green font-bold tracking-widest text-sm mb-4 uppercase">Gallery</p>
          <h2 className="font-display text-4xl md:text-5xl font-black text-white uppercase">Moments from IndabaX</h2>
        </div>

        {/* Album cover link */}
        {album?.event?.banner_url ? (
          <Link
            to="/indabax/gallery"
            className="group relative block rounded-2xl overflow-hidden h-72 md:h-[480px]"
          >
            <img
              src={optimized(album.event.banner_url)}
              alt={album.event.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col items-center justify-end text-center p-8">
              <span className="text-indabax-green font-bold tracking-widest text-xs mb-2 uppercase">View Full Album</span>
              <h3 className="font-display text-2xl md:text-4xl font-black text-white uppercase">
                {album.event.title}
              </h3>
              <p className="text-white/70 text-sm md:text-base mt-2">
                {`${album.images.length} photos`}
              </p>
              <span className="mt-6 flex items-center gap-2 bg-indabax-green text-indabax-black px-8 py-3 rounded-full font-bold text-sm group-hover:bg-white transition-colors">
                <Play size={16} /> Open the album
              </span>
            </div>
          </Link>
        ) : (
          <div className="text-center">
            <Link to="/indabax/gallery" className="text-indabax-green font-bold uppercase tracking-wide transition-colors hover:text-white">
              View full gallery
            </Link>
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
