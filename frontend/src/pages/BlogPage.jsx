import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Calendar } from "lucide-react";
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

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/blog/", { params: { site: "main" } })
      .then((res) => setPosts(res.data))
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-white">
      <div className="bg-charcoal text-white px-4 sm:px-6 py-16 sm:py-20 text-center">
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <p className="text-accent font-semibold tracking-widest text-xs sm:text-sm mb-3 uppercase">
            Stories &amp; Updates
          </p>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Blog</h1>
          <p className="text-white/60 max-w-xl mx-auto text-sm sm:text-base">
            News, write-ups and reflections from the KAB AI community.
          </p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
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
        ) : posts.length === 0 ? (
          <div className="text-center py-20 border border-border-soft rounded-2xl">
            <p className="text-text-body text-lg">No posts published yet — check back soon.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {posts.map((p, i) => (
              <motion.article
                key={p.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                custom={i * 0.1}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col border border-border-soft"
              >
                {p.cover_image_url && (
                  <div className="h-40 sm:h-44 overflow-hidden">
                    <img
                      src={p.cover_image_url}
                      alt={p.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                )}
                <div className="p-5 flex flex-col flex-1">
                  {p.published_at && (
                    <p className="flex items-center gap-1.5 text-accent text-xs font-semibold mb-2">
                      <Calendar size={12} />
                      {new Date(p.published_at).toLocaleDateString()}
                    </p>
                  )}
                  <h3 className="font-display font-bold text-lg mb-2">{p.title}</h3>
                  <p className="text-sm text-text-body line-clamp-3 mb-5 flex-1">{p.excerpt}</p>
                  <Link
                    to={`/blog/${p.slug}`}
                    className="inline-flex items-center gap-1 text-accent font-semibold text-sm hover:text-accent-light transition-colors w-fit"
                  >
                    Read more →
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}