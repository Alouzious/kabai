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

  return (
    <section className="py-16 sm:py-20 md:py-24 bg-cream-dark/40">
      <div className="max-w-3xl mx-auto text-center px-4 sm:px-6 mb-10 sm:mb-14">
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-charcoal mb-3 sm:mb-4">
          Partners &amp; Collaborators
        </h2>
        <p className="text-text-body text-sm md:text-base leading-relaxed">
          We work alongside universities, foundations and institutions advancing
          research, innovation and academic excellence across Africa and beyond.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 sm:gap-8 md:gap-10">
          {partners.map((p) => (
              <a
              key={p.id}
              href={p.website_url || "#"}
              target={p.website_url ? "_blank" : undefined}
              rel="noreferrer"
              title={p.name}
              className="flex flex-col items-center justify-center gap-3 sm:gap-4 h-36 sm:h-44 md:h-52 px-3 sm:px-6 py-3 bg-white/60 hover:bg-white rounded-xl border border-charcoal/5 hover:border-accent/20 hover:shadow-md transition group"
            >
              <img
                src={p.logo_url}
                alt={p.name}
                className={`max-w-full object-contain mx-auto block ${p.name.includes("GDG") ? "max-h-28 sm:max-h-36 md:max-h-44 scale-110" : "max-h-20 sm:max-h-28 md:max-h-36"}`}
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
              <span className="hidden">{p.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}