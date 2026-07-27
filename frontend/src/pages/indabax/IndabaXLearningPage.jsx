import { useEffect, useState } from "react";
import api from "../../lib/api";

export default function IndabaXLearningPage() {
  const [resources, setResources] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(null);

  useEffect(() => {
    api.get("/learning/", { params: { category } }).then((res) => setResources(res.data));
  }, [category]);

  const categories = [...new Set(resources.map((r) => r.category))];
  const filtered = resources.filter((r) => r.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <p className="text-accent font-semibold tracking-widest text-sm mb-3">LEARNING HUB</p>
      <h1 className="font-display text-4xl font-bold mb-10">Learn With Us</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-10">
        <input
          type="text"
          placeholder="Search resources..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-3 rounded-lg border border-[--color-border-soft] outline-none focus:border-accent"
        />
        <div className="flex gap-2 flex-wrap">
          <button onClick={() => setCategory(null)} className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${!category ? "bg-accent text-white" : "bg-cream hover:bg-cream-dark"}`}>
            All
          </button>
          {categories.map((c) => (
            <button key={c} onClick={() => setCategory(c)} className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${category === c ? "bg-accent text-white" : "bg-cream hover:bg-cream-dark"}`}>
              {c}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-[--color-text-body]">No resources found.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {filtered.map((r) => (
            <div key={r.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300">
              {r.cover_image_url && <img src={r.cover_image_url} alt={r.title} className="w-full h-40 object-cover" />}
              <div className="p-5">
                <span className="text-xs font-semibold text-accent uppercase tracking-wide">{r.difficulty}</span>
                <h3 className="font-display font-bold text-lg mt-1 mb-2">{r.title}</h3>
                <p className="text-sm text-[--color-text-body] mb-4 line-clamp-2">{r.description}</p>
                {r.video_url && (
                  <a href={r.video_url} target="_blank" rel="noreferrer" className="text-accent font-semibold text-sm transition-colors hover:text-accent-light">
                    Watch video
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
