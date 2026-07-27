import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../lib/api";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get("/projects/", { params: { site: "main" } }).then((res) => setProjects(res.data));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <p className="text-accent font-semibold tracking-widest text-sm mb-3">OUR WORK</p>
      <h1 className="font-display text-4xl font-bold mb-10">Projects</h1>

      <div className="grid md:grid-cols-3 gap-8">
        {projects.map((p) => (
          <Link
            key={p.id}
            to={`/projects/${p.slug}`}
            className="bg-cream rounded-xl overflow-hidden hover:shadow-lg transition"
          >
            {p.cover_image_url && <img src={p.cover_image_url} alt={p.title} className="w-full h-44 object-cover" />}
            <div className="p-5">
              <h3 className="font-display font-bold text-lg mb-2">{p.title}</h3>
              <p className="text-sm text-[--color-text-body] line-clamp-2">{p.abstract}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
