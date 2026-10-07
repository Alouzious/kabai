import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCircleUser } from "react-icons/fa6";
import api from "../../lib/api";
import TeamMemberModal from "../team/TeamMemberModal";

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
  const [selected, setSelected] = useState(null);

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
              <motion.button
                type="button"
                key={m.id}
                onClick={() => setSelected(m)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                custom={i * 0.12}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 text-left w-full"
              >
                <div className="h-56 overflow-hidden">
                  {m.photo_url ? (
                    <img
                      src={m.photo_url}
                      alt={m.name}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-accent/30">
                      <FaCircleUser size={72} />
                    </div>
                  )}
                </div>
                <div className="p-5 text-center">
                  <h3 className="font-semibold text-lg">{m.name}</h3>
                  <p className="text-accent text-sm">{m.role}</p>
                </div>
              </motion.button>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link to="/team" className="text-accent font-semibold transition-colors hover:text-accent-light">
            Meet the full team
          </Link>
        </div>
      </div>

      {selected && <TeamMemberModal member={selected} site="main" onClose={() => setSelected(null)} />}
    </section>
  );
}
