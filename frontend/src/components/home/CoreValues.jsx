import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../../lib/api";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay, ease: "easeOut" },
  }),
};

export default function CoreValues() {
  const [values, setValues] = useState([]);

  useEffect(() => {
    api.get("/core-values/", { params: { site: "main" } })
      .then((res) => setValues(res.data))
      .catch(() => setValues([]));
  }, []);

  if (values.length === 0) return null;

  return (
    <section className="bg-cream px-4 sm:px-6 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeUp} className="text-center mb-10 sm:mb-14">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-charcoal">Our Core Values</h2>
        </motion.div>

        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-8">
          {values.map((v, i) => (
            <motion.div
              key={v.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={i * 0.12}
              variants={fadeUp}
              className="bg-white rounded-xl border border-border-soft p-5 sm:p-7 text-center"
            >
              <h3 className="font-display font-bold text-base sm:text-lg text-charcoal mb-2">{v.title}</h3>
              <p className="text-text-body text-sm leading-relaxed">{v.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}