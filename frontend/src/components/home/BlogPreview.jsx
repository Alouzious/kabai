import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../../lib/api";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay, ease: "easeOut" },
  }),
};

export default function BlogPreview() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    api.get("/blog/", { params: { site: "main", limit: 3 } })
      .then((res) => setPosts(res.data))
      .catch(() => setPosts([]));
  }, []);

  if (posts.length === 0) return null;

  return (
    <section className="px-6 py-24 max-w-7xl mx-auto">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
        className="text-center mb-14"
      >
        <h2 className="font-display text-3xl md:text-4xl font-bold text-charcoal">Latest Posts</h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8">
        {posts.map((p, i) => (
          <motion.article
            key={p.id}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={i * 0.15}
            variants={fadeUp}
            className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300"
          >
            {p.cover_image_url && (
              <div className="h-44 overflow-hidden">
                <img src={p.cover_image_url} alt={p.title} className="w-full h-full object-cover" />
              </div>
            )}
            <div className="p-5">
              {p.published_at && (
                <p className="text-accent text-xs font-semibold mb-2">
                  {new Date(p.published_at).toLocaleDateString()}
                </p>
              )}
              <h3 className="font-display font-bold text-lg mb-2">{p.title}</h3>
              <p className="text-sm text-text-body line-clamp-2 mb-4">{p.excerpt}</p>
              <Link to={`/blog/${p.slug}`} className="text-accent font-semibold text-sm hover:text-accent-light transition-colors">
                Read more
              </Link>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}