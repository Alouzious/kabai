import { Eye, Target } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: "easeOut" },
  }),
};

const WHAT_WE_DO = [
  {
    title: "Workshops",
    body: "Hands-on sessions covering Python, data analysis, machine learning, and applied AI tools, built for beginners and sharpened for advanced members.",
  },
  {
    title: "Projects",
    body: "Members team up to build real applications, from data science tools to AI-powered platforms, learning by shipping rather than just studying.",
  },
  {
    title: "Mentorship",
    body: "Experienced members and industry contacts guide newer students through their first models, first repos, and first contributions.",
  },
];

const CORE_VALUES = [
  { name: "Innovation", body: "We chase new ideas and aren't afraid to prototype something that hasn't been tried on campus before." },
  { name: "Inclusiveness", body: "No prior AI experience required, every member starts somewhere, and every question is a fair one." },
  { name: "Integrity", body: "We build and share honestly, giving credit, respecting data, and using AI responsibly." },
  { name: "Mentorship", body: "Growth compounds when it's shared. Members who learn today teach the next cohort tomorrow." },
];

const JOURNEY = [
  { step: "01", title: "Informal Beginnings", body: "A handful of students start meeting weekly to teach each other AI and data science basics." },
  { step: "02", title: "Structured Workshops", body: "KAB AI formalizes into a club with regular sessions, a curriculum, and its first cohort of mentors." },
  { step: "03", title: "Community Partnerships", body: "Collaboration begins with the IndabaX AI Club and MTN Spark Hub, widening access to mentors and events." },
  { step: "04", title: "Student-Built Projects", body: "Members start shipping real projects and representing Kabale University at regional tech events." },
];

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* HERO */}
      <div className="bg-charcoal text-white px-4 sm:px-6 py-16 sm:py-24 text-center">
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <p className="text-accent font-semibold tracking-widest text-xs sm:text-sm mb-3 uppercase">About Us</p>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4">About KAB AI</h1>
          <p className="text-white/60 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Kabale University's student-led artificial intelligence community, a space where curiosity
            about AI turns into real skills, real projects, and real impact for South Western Uganda.
          </p>
        </motion.div>
      </div>

      {/* HISTORY */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 grid md:grid-cols-[220px_1fr] gap-6 sm:gap-10">
        <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="font-display text-2xl sm:text-3xl font-bold text-charcoal">
          Our History
        </motion.h2>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.1} variants={fadeUp} className="space-y-5 text-text-body leading-relaxed text-sm sm:text-base">
          <p>
            KAB AI was founded by a small group of students at Kabale University who kept running into the
            same problem: there was real appetite for artificial intelligence on campus, but almost nowhere
            to learn it hands-on. What started as informal weekend meet-ups in the Faculty of Computing
            sharing notebooks and tutorials has grown into a structured community with regular workshops,
            mentorship, and student-built projects.
          </p>
          <p>
            Today, KAB AI sits within the wider Kabale University tech ecosystem alongside initiatives like
            the IndabaX AI Club and the MTN Spark Hub, giving members access to a network of mentors,
            hackathons, and real infrastructure rather than just theory.
          </p>
          <p>
            The club remains entirely student-run, a deliberate choice that keeps it close to what students
            actually need: practical skills, a supportive community, and a reason to keep building after the
            workshop ends.
          </p>
        </motion.div>
      </section>

      {/* VISION + MISSION */}
      <section className="bg-cream px-4 sm:px-6 py-16 sm:py-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6 sm:gap-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-white rounded-2xl border border-border-soft p-6 sm:p-8 md:p-10">
            <div className="flex gap-3 sm:gap-4 mb-4">
              <div className="shrink-0 w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center">
                <Eye className="text-accent" size={20} />
              </div>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-charcoal self-center">Vision</h2>
            </div>
            <p className="text-text-body leading-relaxed text-sm sm:text-base">
              A generation of Kabale students empowered by AI to solve local and global challenges, from
              agriculture and health to language and commerce.
            </p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.1} variants={fadeUp} className="bg-white rounded-2xl border border-border-soft p-6 sm:p-8 md:p-10">
            <div className="flex gap-3 sm:gap-4 mb-4">
              <div className="shrink-0 w-11 h-11 rounded-xl bg-charcoal/5 flex items-center justify-center">
                <Target className="text-charcoal" size={20} />
              </div>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-charcoal self-center">Mission</h2>
            </div>
            <p className="text-text-body leading-relaxed text-sm sm:text-base">
              Equipping students with practical AI skills through workshops, hands-on projects, and
              mentorship, taught by students, for students.
            </p>
          </motion.div>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="font-display text-2xl sm:text-3xl font-bold text-charcoal mb-8 sm:mb-10 text-center">
          What We Do
        </motion.h2>
        <div className="grid sm:grid-cols-3 gap-5 sm:gap-6">
          {WHAT_WE_DO.map((item, i) => (
            <motion.div
              key={item.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i * 0.1}
              variants={fadeUp}
              className="border border-border-soft rounded-2xl p-6 sm:p-7 hover:border-accent/40 transition-colors"
            >
              <h3 className="font-display font-bold text-lg mb-3 text-charcoal">{item.title}</h3>
              <p className="text-text-body text-sm leading-relaxed">{item.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="bg-cream px-4 sm:px-6 py-16 sm:py-20">
        <div className="max-w-6xl mx-auto">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="font-display text-2xl sm:text-3xl font-bold text-charcoal mb-8 sm:mb-10 text-center">
            Core Values
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {CORE_VALUES.map((v, i) => (
              <motion.div
                key={v.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i * 0.1}
                variants={fadeUp}
                className="bg-white rounded-xl border border-border-soft p-6 text-center"
              >
                <h3 className="font-display font-bold text-charcoal mb-2">{v.name}</h3>
                <p className="text-sm text-text-body leading-relaxed">{v.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* JOURNEY */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="font-display text-2xl sm:text-3xl font-bold text-charcoal mb-10 sm:mb-14 text-center">
          Our Journey
        </motion.h2>
        <div className="space-y-8 sm:space-y-10">
          {JOURNEY.map((m, i) => (
            <motion.div
              key={m.step}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i * 0.1}
              variants={fadeUp}
              className="flex gap-5 sm:gap-8"
            >
              <span className="font-display text-2xl sm:text-3xl font-bold text-accent w-10 sm:w-12 shrink-0">
                {m.step}
              </span>
              <div>
                <h3 className="font-display font-bold text-lg mb-2 text-charcoal">{m.title}</h3>
                <p className="text-text-body leading-relaxed text-sm sm:text-base">{m.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-charcoal px-4 sm:px-6 py-16 sm:py-20 text-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="max-w-xl mx-auto">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-4">Want to Build With Us?</h2>
          <p className="text-white/60 text-sm sm:text-base mb-8 leading-relaxed">
            Whether you're writing your first line of Python or shipping your fifth model, there's a place for you at KAB AI.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-accent text-charcoal font-semibold px-8 py-3 rounded-lg hover:bg-accent-light transition"
          >
            Join KAB AI
          </Link>
        </motion.div>
      </section>
    </div>
  );
}