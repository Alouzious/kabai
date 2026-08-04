import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../lib/api";

export default function IndabaXGalleryPreview() {
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    api.get("/gallery/", { params: { limit: 6 } }).then((r) => setGallery(r.data)).catch(() => {});
  }, []);

  if (gallery.length === 0) return null;

  return (
    <section className="bg-indabax-black px-6 py-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-indabax-green font-bold tracking-widest text-sm mb-4 uppercase">Gallery</p>
          <h2 className="font-display text-4xl md:text-5xl font-black text-white uppercase">Moments from IndabaX</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {gallery.map((g) => (
            <div key={g.id} className="rounded-xl overflow-hidden h-48 border-2 border-transparent hover:border-indabax-green transition-colors">
              <img src={g.image_url} alt="Gallery" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link to="/indabax/gallery" className="text-indabax-green font-bold uppercase tracking-wide transition-colors hover:text-white">
            View full gallery
          </Link>
        </div>
      </div>
    </section>
  );
}