import { Eye, Target } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: "easeOut" },
  }),
};

export default function AboutPreview() {
  return (
    <section className="px-6 py-24 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        custom={0}
        variants={fadeUp}
      >
        <p className="text-accent font-semibold tracking-widest text-sm mb-3">
          OUR STORY
        </p>
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-5 leading-tight">
          It Started with a Handful of Students and One Big Question
        </h2>
        <p className="text-[--color-text-body] leading-relaxed mb-4">
          In a small computer lab at Kabale University, a group of students
          asked themselves whether artificial intelligence a field that felt
          distant and reserved for bigger cities could actually take root here.
          They had no funding, no lab equipment, just curiosity and a shared
          belief that talent isn't limited by location.
        </p>
        <p className="text-[--color-text-body] leading-relaxed mb-6">
          That question became KAB AI a community built by students, for
          students, determined to make AI education accessible to anyone in
          Kabale willing to learn. What began as a handful of late-night study
          sessions has grown into workshops, real projects and a network of
          young innovators solving problems that matter to their own community.
        </p>
        <Link
          to="/about"
          className="text-accent font-semibold transition-colors hover:text-accent-light"
        >
          Learn more about us
        </Link>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        custom={0.2}
        variants={fadeUp}
        className="bg-gradient-to-br from-cream to-cream-dark rounded-2xl p-8 space-y-6"
      >
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Eye className="text-accent" size={22} />
            <h3 className="font-display font-bold text-xl">Vision</h3>
          </div>
          <p className="text-[--color-text-body] text-sm leading-relaxed">
            A generation of Kabale students empowered by AI to solve local and global challenges.
          </p>
        </div>
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Target className="text-accent" size={22} />
            <h3 className="font-display font-bold text-xl">Mission</h3>
          </div>
          <p className="text-[--color-text-body] text-sm leading-relaxed">
            Equipping students with practical AI skills through workshops, projects and mentorship.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
