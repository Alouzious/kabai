import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../lib/api";

export default function IndabaXProjectsPreview() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get("/projects/", { params: { site: "indabax", limit: 3 } }).then((r) => setProjects(r.data)).catch(() => {});
  }, []);

  return (
    <section className="px-6 py-24 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <p className="text-indabax-green font-bold tracking-widest text-sm mb-4 uppercase">Our Work</p>
        <h2 className="font-display text-4xl md:text-5xl font-black uppercase">IndabaX Projects</h2>
      </div>
      {projects.length === 0 ? (
        <p className="text-center text-[--color-text-body]">No projects published yet.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((p) => (
            <Link
              key={p.id}
              to={`/indabax/projects/${p.slug}`}
              className="bg-white rounded-xl overflow-hidden border border-indabax-green/20 hover:border-indabax-green transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {p.cover_image_url && <img src={p.cover_image_url} alt={p.title} className="w-full h-44 object-cover" />}
              <div className="p-5">
                <h3 className="font-display font-bold text-lg text-indabax-black mb-2">{p.title}</h3>
                <p className="text-sm text-indabax-black/70 line-clamp-2">{p.abstract}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}