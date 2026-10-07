import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../lib/api";
import TeamCard from "../components/team/TeamCard";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: "easeOut" },
  }),
};

export default function TeamPage() {
  const [team, setTeam] = useState([]);
  const [year, setYear] = useState(null);

  useEffect(() => {
    api.get("/team/", { params: { site: "main", year } }).then((res) => setTeam(res.data));
  }, [year]);

  const years = [...new Set(team.map((m) => m.year))].sort((a, b) => b - a);

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <motion.div initial="hidden" animate="visible" variants={fadeUp}>
        <p className="text-accent font-semibold tracking-widest text-sm mb-3">OUR TEAM</p>
        <h1 className="font-display text-4xl font-bold mb-10">Leadership</h1>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        custom={0.1}
        variants={fadeUp}
        className="flex gap-2 mb-12 flex-wrap"
      >
        <button
          onClick={() => setYear(null)}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
            !year ? "bg-accent text-white" : "bg-cream text-charcoal hover:bg-cream-dark"
          }`}
        >
          All Years
        </button>
        {years.map((y) => (
          <button
            key={y}
            onClick={() => setYear(y)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
              year === y ? "bg-accent text-white" : "bg-cream text-charcoal hover:bg-cream-dark"
            }`}
          >
            {y}
          </button>
        ))}
      </motion.div>

      {team.length === 0 ? (
        <p className="text-center text-[--color-text-body] py-10">No team members found for this filter.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {team.map((m, i) => (
            <TeamCard key={m.id} member={m} site="main" index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
