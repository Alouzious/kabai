import { useEffect, useState } from "react";
import api from "../../lib/api";

export default function Partners() {
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    api.get("/partners/", { params: { site: "main" } })
      .then((res) => setPartners(res.data))
      .catch(() => setPartners([]));
  }, []);

  if (partners.length === 0) return null;

  // Duplicate the list so the marquee loops seamlessly
  const track = [...partners, ...partners];

  return (
    <section className="py-20 overflow-hidden">
      <p className="text-accent font-semibold tracking-widest text-sm mb-10 text-center">OUR PARTNERS</p>

      <div className="relative w-full overflow-hidden group">
        {/* fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent z-10" />

        <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
          {track.map((p, i) => (
            <a
              key={`${p.id}-${i}`}
              href={p.website_url || "#"}
              target={p.website_url ? "_blank" : undefined}
              rel="noreferrer"
              title={p.name}
              className="mx-6 flex items-center justify-center shrink-0 w-40 h-40"
            >
              <img
                src={p.logo_url}
                alt={p.name}
                className="w-full h-full object-contain hover:scale-105 transition-transform"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  e.currentTarget.nextSibling.style.display = "block";
                }}
              />
              <span className="hidden text-lg font-semibold text-charcoal">{p.name}</span>
            </a>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
      `}</style>
    </section>
  );
}