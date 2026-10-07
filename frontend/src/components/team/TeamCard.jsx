import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCircleUser } from "react-icons/fa6";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: "easeOut" },
  }),
};

export default function TeamCard({ member: m, site = "main", index = 0 }) {
  const to = `${site === "indabax" ? "/indabax" : ""}/team/${m.id}`;

  if (site === "indabax") {
    return (
      <Link to={to} className="group block text-center py-2">
        <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44 mx-auto rounded-full overflow-hidden ring-4 ring-black/5 group-hover:ring-indabax-green shadow-md bg-white group-hover:-translate-y-1 transition-all duration-300">
          {m.photo_url ? (
            <img
              src={m.photo_url}
              alt={m.name}
              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-indabax-green/30">
              <FaCircleUser size={110} />
            </div>
          )}
        </div>
        <h3 className="mt-5 font-semibold text-lg text-black leading-snug group-hover:text-indabax-green-dark transition-colors">
          {m.name}
        </h3>
        <span className="inline-block mt-2 px-4 py-1.5 rounded-full text-sm font-bold bg-indabax-green/10 text-indabax-green-dark group-hover:bg-indabax-green group-hover:text-black transition-colors">
          {m.role}
        </span>
        {!m.is_current && <p className="text-xs text-black/50 mt-2">Alumni · {m.year}</p>}
      </Link>
    );
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      custom={index * 0.1}
      variants={fadeUp}
      whileHover={{ y: -6 }}
    >
      <Link
        to={to}
        className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300"
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
          {!m.is_current && <p className="text-xs text-[--color-text-body] mt-1">Alumni · {m.year}</p>}
        </div>
      </Link>
    </motion.div>
  );
}
