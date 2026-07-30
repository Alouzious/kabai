import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FileText, Calendar, Users } from "lucide-react";
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

export default function ResearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get("category");

  const [papers, setPapers] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    api.get("/categories/", { params: { type: "publication" } }).then((r) => setCategories(r.data)).catch(() => {});
  }, []);

  useEffect(() => {
    api.get("/research-papers/", { params: { site: "main" } }).then((res) => setPapers(res.data)).catch(() => setPapers([]));
  }, []);

  const filtered = activeCategory
    ? papers.filter((p) => p.category?.slug === activeCategory)
    : papers;

  const setCategory = (slug) => {
    if (slug) setSearchParams({ category: slug });
    else setSearchParams({});
  };

  return (
    <div className="bg-white">
      <div className="bg-charcoal text-white px-4 sm:px-6 py-16 sm:py-20 text-center">
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <p className="text-accent font-semibold tracking-widest text-xs sm:text-sm mb-3 uppercase">Publications</p>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Research Papers</h1>
          <p className="text-white/60 max-w-xl mx-auto text-sm sm:text-base">
            Original research from KAB AI members, published and shared with the community.
          </p>
        </motion.div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14 sm:py-16">
        {categories.length > 0 && (
          <motion.div initial="hidden" animate="visible" custom={0.1} variants={fadeUp} className="flex gap-2 mb-10 sm:mb-12 flex-wrap justify-center">
            <button
              onClick={() => setCategory(null)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                !activeCategory ? "bg-accent text-charcoal" : "bg-cream text-charcoal hover:bg-cream-dark"
              }`}
            >
              All Topics
            </button>
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setCategory(c.slug)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                  activeCategory === c.slug ? "bg-accent text-charcoal" : "bg-cream text-charcoal hover:bg-cream-dark"
                }`}
              >
                {c.name}
              </button>
            ))}
          </motion.div>
        )}

        {filtered.length === 0 ? (
          <p className="text-center text-text-body py-10">No research papers found for this category yet.</p>
        ) : (
          <div className="space-y-6">
            {filtered.map((p, i) => (
              <motion.article
                key={p.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                custom={i * 0.1}
                variants={fadeUp}
                className="border border-border-soft rounded-2xl p-6 sm:p-8 hover:shadow-lg hover:border-accent/30 transition-all duration-300"
              >
                {p.category && (
                  <span className="inline-flex items-center bg-cream text-charcoal text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide mb-4">
                    {p.category.name}
                  </span>
                )}

                <h2 className="font-display text-xl sm:text-2xl font-bold mb-3 leading-snug">{p.title}</h2>

                <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-text-body mb-5">
                  <span className="flex items-center gap-1.5">
                    <Users size={14} className="text-accent" />
                    {p.authors}
                  </span>
                  {p.year && (
                    <span className="flex items-center gap-1.5">
                      <Calendar size={14} className="text-accent" />
                      {p.year}
                    </span>
                  )}
                </div>

                <div className="bg-cream rounded-xl p-5 mb-5">
                  <p className="text-xs font-bold text-accent uppercase tracking-wide mb-2">Abstract</p>
                  <p className="text-text-body leading-relaxed">{p.abstract}</p>
                </div>

                <a
                  href={p.pdf_url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-charcoal text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-charcoal-light transition"
                >
                  <FileText size={16} />
                  Read Full Paper
                </a>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}