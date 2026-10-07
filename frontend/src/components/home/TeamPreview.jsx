import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../../lib/api";
import TeamCard from "../team/TeamCard";

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
    api
      .get("/team/", { params: { site: "main" } })
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
          <h2 className="font-display text-3xl md:text-4xl font-bold">Current Leadership</h2>
        </motion.div>

        {team.length === 0 ? (
          <p className="text-center text-[--color-text-body]">Team information coming soon.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {team.map((m, i) => (
              <TeamCard key={m.id} member={m} site="main" index={i} />
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
