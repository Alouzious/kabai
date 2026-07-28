import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../lib/api";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: "easeOut" },
  }),
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/projects/", { params: { site: "main" } })
      .then((res) => setProjects(res.data))
      .catch(() => setProjects([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
        className="mb-14"
      >
        <p className="text-accent font-semibold tracking-widest text-sm mb-3">
          OUR WORK
        </p>
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
          Projects
        </h1>
        <p className="text-[--color-text-body] text-lg max-w-2xl">
          A look at what KAB AI members have been building from data
          science tools to full AI-powered platforms.
        </p>
      </motion.div>

      {loading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="bg-cream rounded-xl overflow-hidden animate-pulse"
            >
              <div className="h-44 bg-cream-dark" />
              <div className="p-5 space-y-3">
                <div className="h-4 bg-cream-dark rounded w-3/4" />
                <div className="h-3 bg-cream-dark rounded w-full" />
                <div className="h-3 bg-cream-dark rounded w-2/3" />
              </div>
            </div>
          ))}
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-20 border border-black/10 rounded-2xl">
          <p className="text-[--color-text-body] text-lg">
            No projects published yet — check back soon.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((p, i) => (
            <motion.div
              key={p.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={i * 0.1}
              variants={fadeUp}
              whileHover={{ y: -8 }}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col"
            >
              {p.cover_image_url && (
                <div className="overflow-hidden h-44">
                  <img
                    src={p.cover_image_url}
                    alt={p.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
              )}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-display font-bold text-lg mb-2">
                  {p.title}
                </h3>
                <p className="text-sm text-[--color-text-body] line-clamp-2 mb-5 flex-1">
                  {p.abstract}
                </p>
                <Link
                  to={`/projects/${p.slug}`}
                  className="inline-flex items-center gap-1 text-accent font-semibold text-sm transition-colors hover:text-accent-light w-fit"
                >
                  Learn more
                  <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}