import { useEffect, useState } from "react";
import { FileText, Calendar, Users, Tag } from "lucide-react";
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
  const [papers, setPapers] = useState([]);
  const [category, setCategory] = useState(null);

  useEffect(() => {
    api.get("/research-papers/", { params: { category } }).then((res) => setPapers(res.data));
  }, [category]);

  const categories = [...new Set(papers.map((p) => p.category).filter(Boolean))];

  return (
    <div className="bg-white">
      <div className="bg-charcoal text-white px-6 py-20 text-center">
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <p className="text-accent font-semibold tracking-widest text-sm mb-3 uppercase">Publications</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Research Papers</h1>
          <p className="text-white/60 max-w-xl mx-auto">
            Original research from KAB AI members, published and shared with the community.
          </p>
        </motion.div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16">
        {categories.length > 0 && (
          <motion.div
            initial="hidden"
            animate="visible"
            custom={0.1}
            variants={fadeUp}
            className="flex gap-2 mb-12 flex-wrap justify-center"
          >
            <button
              onClick={() => setCategory(null)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                !category ? "bg-accent text-white" : "bg-cream text-charcoal hover:bg-cream-dark"
              }`}
            >
              All Topics
            </button>
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                  category === c ? "bg-accent text-white" : "bg-cream text-charcoal hover:bg-cream-dark"
                }`}
              >
                {c}
              </button>
            ))}
          </motion.div>
        )}

        {papers.length === 0 ? (
          <p className="text-center text-[--color-text-body] py-10">No research papers published yet.</p>
        ) : (
          <div className="space-y-6">
            {papers.map((p, i) => (
              <motion.article
                key={p.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                custom={i * 0.1}
                variants={fadeUp}
                className="border border-[--color-border-soft] rounded-2xl p-8 hover:shadow-lg hover:border-accent/30 transition-all duration-300"
              >
                <div className="flex items-center gap-2 mb-4">
                  {p.category && (
                    <span className="inline-flex items-center gap-1 bg-cream text-charcoal text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
                      <Tag size={12} />
                      {p.category}
                    </span>
                  )}
                </div>

                <h2 className="font-display text-2xl font-bold mb-3 leading-snug">
                  {p.title}
                </h2>

                <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-[--color-text-body] mb-5">
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
                  <p className="text-[--color-text-body] leading-relaxed">
                    {p.abstract}
                  </p>
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
