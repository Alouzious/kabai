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
    <section className="px-6 py-16 max-w-7xl mx-auto text-center">
      <p className="text-accent font-semibold tracking-widest text-sm mb-8">OUR PARTNERS</p>
      <div className="flex flex-wrap justify-center items-center gap-10">
        {partners.map((p) => (
          <img key={p.id} src={p.logo_url} alt={p.name} className="h-12 object-contain grayscale hover:grayscale-0 transition" />
        ))}
      </div>
    </section>
  );
}
