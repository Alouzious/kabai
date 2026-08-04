import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../../lib/api";
import IndabaXHero from "../../components/indabax/IndabaXHero";
import IndabaXProjectsPreview from "../../components/indabax/IndabaXProjectsPreview";
import IndabaXEventsPreview from "../../components/indabax/IndabaXEventsPreview";
import IndabaXTeamPreview from "../../components/indabax/IndabaXTeamPreview";
import IndabaXGalleryPreview from "../../components/indabax/IndabaXGalleryPreview";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: "easeOut" },
  }),
};

function Section({ children, className = "" }) {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeUp}
      className={className}
    >
      {children}
    </motion.section>
  );
}

const OBJECTIVES = [
  {
    title: "Meetings & Workshops",
    text: "Discussions of current events in AI, professor talks, tutorials, and hands-on workshops.",
  },
  {
    title: "Collaborative Projects",
    text: "Teams work on ML/AI projects, programming competitions, and online courses outside regular meetings.",
  },
  {
    title: "Career Guidance",
    text: "Support for students pursuing ML/AI careers, with a maintained resource page on courses and research opportunities.",
  },
  {
    title: "Capacity Building",
    text: "Free access to computing resources, research grants, certifications, and conference passes through our partners.",
  },
  {
    title: "Research & Mentorship",
    text: "Technical workshops and mentorship programs fostering scientific research and writing among members.",
  },
  {
    title: "AI Culture on Campus",
    text: "Encouraging and guiding management on incorporating AI courses into the university curriculum.",
  },
  {
    title: "Free Learning Passes",
    text: "Access to self-paced courses on partner platforms like the NVIDIA Deep Learning Institute.",
  },
  {
    title: "Hackathon Readiness",
    text: "Preparing members to compete in hackathons against other university clubs across the continent.",
  },
];

export default function IndabaXHomePage() {
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    api.get("/partners/", { params: { site: "indabax" } }).then((r) => setPartners(r.data)).catch(() => {});
  }, []);

  return (
    <>
      <IndabaXHero />

      {/* Who We Are */}
      <Section className="px-6 py-24 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-indabax-green font-bold tracking-widest text-sm mb-4 uppercase">Who We Are</p>
          <h2 className="font-display text-4xl md:text-5xl font-black mb-6 leading-tight uppercase">
            The IndabaX Uganda AI Club, Kabale Chapter
          </h2>
          <p className="text-[--color-text-body] leading-relaxed text-lg mb-4">
            IndabaX Kabale exists as a place of community for discussing, learning about, and
            working on machine learning and artificial intelligence across disciplines 
            strengthening ML/AI knowledge throughout Kabale University and the wider community.
          </p>
          <p className="text-[--color-text-body] leading-relaxed text-lg">
            We're formally affiliated with{" "}
            <span className="text-indabax-green font-semibold">Deep Learning IndabaX Uganda</span>,
            part of the pan-African Deep Learning Indaba movement, and open to any student,
            researcher, staff, or faculty member regardless of background with
            an interest in AI.
          </p>
        </div>
        <div className="bg-indabax-black text-white rounded-2xl p-10 space-y-8">
          <div>
            <h3 className="font-display font-black text-2xl mb-2 text-indabax-green uppercase">Vision</h3>
            <p className="text-white/70 leading-relaxed">
              A thriving AI community in Kabale, connected to the broader African AI movement
              through Deep Learning IndabaX Uganda.
            </p>
          </div>
          <div>
            <h3 className="font-display font-black text-2xl mb-2 text-indabax-green uppercase">Mission</h3>
            <p className="text-white/70 leading-relaxed">
              To build capacity, foster research, and prepare our members to compete and
              collaborate with AI communities across the continent one workshop,
              hackathon, and mentorship session at a time.
            </p>
          </div>
        </div>
      </Section>

      {/* What We Do (Objectives) */}
      <Section className="bg-indabax-black text-white px-6 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-indabax-green font-bold tracking-widest text-sm mb-4 uppercase">What We Do</p>
            <h2 className="font-display text-4xl md:text-5xl font-black uppercase">Our Objectives</h2>
            <p className="text-white/50 max-w-2xl mx-auto mt-4">
              Straight from our club constitution the goals guiding everything we build together.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {OBJECTIVES.map((o, i) => (
              <div
                key={o.title}
                className="group bg-white rounded-xl p-6 border border-indabax-green/20 hover:bg-indabax-green hover:border-indabax-green transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
              >
                <span className="text-indabax-green group-hover:text-indabax-black font-display font-black text-3xl block mb-3">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-bold text-base text-indabax-black mb-2">{o.title}</h3>
                <p className="text-sm text-indabax-black/70 group-hover:text-indabax-black/80 leading-relaxed">{o.text}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section><IndabaXProjectsPreview /></Section>
      <Section><IndabaXEventsPreview /></Section>
      <Section><IndabaXTeamPreview /></Section>
      <Section><IndabaXGalleryPreview /></Section>

      {/* Partners */}
      {partners.length > 0 && (
        <Section className="px-6 py-20 text-center max-w-7xl mx-auto">
          <p className="text-indabax-green font-bold tracking-widest text-sm mb-10 uppercase">Our Partners</p>
          <div className="flex flex-wrap justify-center items-center gap-10">
            {partners.map((p) => (
              <img key={p.id} src={p.logo_url} alt={p.name} className="h-12 object-contain opacity-60 hover:opacity-100 transition" />
            ))}
          </div>
        </Section>
      )}

      {/* Join CTA */}
      <Section className="px-6 py-24 text-center">
        <h2 className="font-display text-4xl md:text-5xl font-black mb-4 uppercase text-indabax-black">Ready to Join?</h2>
        <p className="text-indabax-black/70 mb-8 max-w-xl mx-auto text-lg font-medium">
          Any student, researcher, staff, or faculty member is welcome. Membership is
          open to all, without regard to background.
        </p>
        <Link to="/indabax/join" className="bg-indabax-green text-indabax-black px-8 py-4 rounded-full font-bold text-lg hover:bg-indabax-green-dark hover:text-white transition inline-block">
          Join Us
        </Link>
      </Section>
    </>
  );
}