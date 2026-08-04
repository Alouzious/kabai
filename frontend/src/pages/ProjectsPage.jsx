import { useEffect, useState } from "react";
import { Link, useSearchParams, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../lib/api";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: "easeOut" },
  }),
};

export default function ProjectsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const isIndabaX = location.pathname.startsWith("/indabax");
  const activeCategory = searchParams.get("category");

  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/categories/", { params: { type: "project" } }).then((r) => setCategories(r.data)).catch(() => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    api
      .get("/projects/", { params: { site: "main" } })
      .then((res) => setProjects(res.data))
      .catch(() => setProjects([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = activeCategory
    ? projects.filter((p) => p.category?.slug === activeCategory)
    : projects;

  const setCategory = (slug) => {
    if (slug) setSearchParams({ category: slug });
    else setSearchParams({});
  };

  return (
    <div className="bg-white">
      <div className={`${isIndabaX ? "bg-indabax-black" : "bg-charcoal"} text-white px-4 sm:px-6 py-16 sm:py-20 text-center`}>
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <p className={`${isIndabaX ? "text-indabax-green" : "text-accent"} font-semibold tracking-widest text-xs sm:text-sm mb-3 uppercase`}>Our Work</p>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Projects</h1>
          <p className="text-white/60 max-w-xl mx-auto text-sm sm:text-base">
            A look at what KAB AI members have been building, from data science tools to full AI-powered platforms.
          </p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
        {categories.length > 0 && (
          <motion.div initial="hidden" animate="visible" custom={0.1} variants={fadeUp} className="flex gap-2 mb-10 sm:mb-14 flex-wrap justify-center">
            <button
              onClick={() => setCategory(null)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                !activeCategory
                  ? isIndabaX
                    ? "bg-indabax-green text-indabax-black"
                    : "bg-accent text-charcoal"
                  : isIndabaX
                    ? "bg-indabax-black-light text-white hover:bg-indabax-green-dark"
                    : "bg-cream text-charcoal hover:bg-cream-dark"
              }`}
            >
              All Projects
            </button>
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setCategory(c.slug)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                  activeCategory === c.slug
                    ? isIndabaX
                      ? "bg-indabax-green text-indabax-black"
                      : "bg-accent text-charcoal"
                    : isIndabaX
                      ? "bg-indabax-black-light text-white hover:bg-indabax-green-dark"
                      : "bg-cream text-charcoal hover:bg-cream-dark"
                }`}
              >
                {c.name}
              </button>
            ))}
          </motion.div>
        )}

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-cream rounded-xl overflow-hidden animate-pulse">
                <div className="h-40 sm:h-44 bg-cream-dark" />
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-cream-dark rounded w-3/4" />
                  <div className="h-3 bg-cream-dark rounded w-full" />
                  <div className="h-3 bg-cream-dark rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 border border-border-soft rounded-2xl">
            <p className="text-text-body text-lg">No projects found for this category yet.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filtered.map((p, i) => (
              <motion.div
                key={p.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                custom={i * 0.1}
                variants={fadeUp}
                whileHover={{ y: -8 }}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col border border-border-soft"
              >
                {p.cover_image_url && (
                  <div className="overflow-hidden h-40 sm:h-44">
                    <img
                      src={p.cover_image_url}
                      alt={p.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                )}
                <div className="p-5 flex flex-col flex-1">
                  {p.category && (
                    <span
                      className={`inline-block w-fit ${
                        isIndabaX ? "bg-indabax-black-light text-indabax-green" : "bg-cream text-charcoal"
                      } text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide mb-3`}
                    >
                      {p.category.name}
                    </span>
                  )}
                  <h3 className="font-display font-bold text-lg mb-2">{p.title}</h3>
                  <p className="text-sm text-text-body line-clamp-2 mb-5 flex-1">{p.abstract}</p>
                  <Link
                    to={`${isIndabaX ? "/indabax" : ""}/projects/${p.slug}`}
                    className={`inline-flex items-center gap-1 font-semibold text-sm transition-colors w-fit ${
                      isIndabaX
                        ? "text-indabax-green hover:text-indabax-green-dark"
                        : "text-accent hover:text-accent-light"
                    }`}
                  >
                    Learn more →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}