import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../../lib/api";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: "easeOut" },
  }),
};

export default function WorkPreview() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get("/projects/", { params: { site: "main", limit: 4 } })
      .then((res) => setProjects(res.data))
      .catch(() => setProjects([]));
  }, []);

  return (
    <section className="bg-cream px-6 py-24">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="text-center mb-14"
        >
          <p className="text-accent font-semibold tracking-widest text-sm mb-3">OUR WORK</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold">Featured Projects</h2>
        </motion.div>

        {projects.length === 0 ? (
          <p className="text-center text-[--color-text-body]">No projects published yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {projects.map((p, i) => (
              <motion.div
                key={p.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                custom={i * 0.15}
                variants={fadeUp}
                whileHover={{ y: -8 }}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300"
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
                <div className="p-5">
                  <h3 className="font-display font-bold text-lg mb-2">{p.title}</h3>
                  <p className="text-sm text-[--color-text-body] line-clamp-2 mb-4">{p.abstract}</p>
                  <Link
                    to={`/projects/${p.slug}`}
                    className="text-accent font-semibold text-sm transition-colors hover:text-accent-light"
                  >
                    Read more
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link
            to="/projects"
            className="text-accent font-semibold transition-colors hover:text-accent-light"
          >
            View all projects
          </Link>
        </div>
      </div>
    </section>
  );
}
