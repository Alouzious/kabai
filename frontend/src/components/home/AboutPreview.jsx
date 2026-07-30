import { Eye, Target } from "lucide-react";
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
    <section className="relative px-6 py-24 md:py-28 max-w-7xl mx-auto overflow-hidden">
      {/* subtle decorative accent */}
      <div className="absolute -top-10 -left-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-charcoal/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative grid md:grid-cols-2 gap-14 md:gap-16 items-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          custom={0}
          variants={fadeUp}
        >
          <p className="text-accent font-semibold tracking-widest text-sm mb-3 uppercase">
            Our Story
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 leading-tight text-charcoal">
            It Started with a Handful of Students and One Big Question
          </h2>
          <p className="text-text-body leading-relaxed mb-4">
            In a small computer lab at Kabale University, a group of students
            asked themselves whether artificial intelligence, a field that felt
            distant and reserved for bigger cities, could actually take root here.
            They had no funding, no lab equipment, just curiosity and a shared
            belief that talent isn't limited by location.
          </p>
          <p className="text-text-body leading-relaxed">
            That question became KAB AI, a community built by students, for
            students, determined to make AI education accessible to anyone in
            Kabale willing to learn. What began as a handful of late-night study
            sessions has grown into workshops, real projects and a network of
            young innovators solving problems that matter to their own community.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          custom={0.2}
          variants={fadeUp}
          className="bg-white rounded-2xl border border-border-soft shadow-xl shadow-charcoal/5 p-8 md:p-10 space-y-8"
        >
          <div className="flex gap-4">
            <div className="shrink-0 w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
              <Eye className="text-accent" size={24} />
            </div>
            <div>
              <h3 className="font-display font-bold text-xl text-charcoal mb-2">Vision</h3>
              <p className="text-text-body text-sm leading-relaxed">
                A generation of Kabale students empowered by AI to solve local and global challenges.
              </p>
            </div>
          </div>

          <div className="h-px bg-border-soft" />

          <div className="flex gap-4">
            <div className="shrink-0 w-12 h-12 rounded-xl bg-charcoal/5 flex items-center justify-center">
              <Target className="text-charcoal" size={24} />
            </div>
            <div>
              <h3 className="font-display font-bold text-xl text-charcoal mb-2">Mission</h3>
              <p className="text-text-body text-sm leading-relaxed">
                Equipping students with practical AI skills through workshops, projects and mentorship.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}