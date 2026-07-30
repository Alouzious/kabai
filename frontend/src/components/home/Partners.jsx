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
    <section className="py-20 md:py-24 bg-cream-dark/40">
      <div className="max-w-3xl mx-auto text-center px-6 mb-14">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-charcoal mb-4">
          Partners &amp; Collaborators
        </h2>
        <p className="text-text-body text-sm md:text-base leading-relaxed">
          We work alongside universities, foundations and institutions advancing
          research, innovation and academic excellence across Africa and beyond.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 md:gap-10">
          {partners.map((p) => (
            <a
              key={p.id}
              href={p.website_url || "#"}
              target={p.website_url ? "_blank" : undefined}
              rel="noreferrer"
              title={p.name}
              className="flex items-center justify-center h-28 md:h-32 px-4"
            >
              <img
                src={p.logo_url}
                alt={p.name}
                className="max-w-full max-h-full object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  e.currentTarget.nextSibling.style.display = "block";
                }}
              />
              <span className="hidden text-base font-semibold text-charcoal text-center">{p.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}