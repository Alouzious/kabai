import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaLinkedin, FaTwitter } from "react-icons/fa";
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

export default function TeamPreview() {
  const [team, setTeam] = useState([]);

  useEffect(() => {
    api.get("/team/", { params: { site: "main" } })
      .then((res) => setTeam(res.data.filter((m) => m.is_current)))
      .catch(() => setTeam([]));
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
          <p className="text-accent font-semibold tracking-widest text-sm mb-3">OUR TEAM</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold">Current Leadership</h2>
        </motion.div>

        {team.length === 0 ? (
          <p className="text-center text-[--color-text-body]">Team information coming soon.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {team.map((m, i) => (
              <motion.div
                key={m.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                custom={i * 0.12}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300"
              >
                <div className="h-56 overflow-hidden bg-cream-dark">
                  {m.photo_url && (
                    <img
                      src={m.photo_url}
                      alt={m.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  )}
                </div>
                <div className="p-5 text-center">
                  <h3 className="font-semibold text-lg">{m.name}</h3>
                  <p className="text-accent text-sm mb-3">{m.role}</p>
                  <div className="flex justify-center gap-2">
                    {m.linkedin_url && (
                      <a href={m.linkedin_url} target="_blank" rel="noreferrer" className="bg-cream p-2 rounded-full text-charcoal hover:bg-accent hover:text-white transition-colors">
                        <FaLinkedin size={16} />
                      </a>
                    )}
                    {m.twitter_url && (
                      <a href={m.twitter_url} target="_blank" rel="noreferrer" className="bg-cream p-2 rounded-full text-charcoal hover:bg-accent hover:text-white transition-colors">
                        <FaTwitter size={16} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link to="/team" className="text-accent font-semibold transition-colors hover:text-accent-light">
            Meet the full team
          </Link>
        </div>
      </div>
    </section>
  );
}
