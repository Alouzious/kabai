import { useState } from "react";
import { Send, CheckCircle2, Mail, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: "easeOut" },
  }),
};

const BENEFITS = [
  "Weekly workshops on ML/AI, tutorials, and professor talks",
  "Team up on real projects and programming competitions",
  "Mentorship and guidance for AI-focused career paths",
  "Free passes to partner platforms like NVIDIA Deep Learning Institute",
  "A seat on the squad for the annual IndabaX Uganda Hackathon",
];

export default function IndabaXJoinPage() {
  const [form, setForm] = useState({ name: "", email: "", role: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="bg-gradient-to-b from-[#0a0f0d] via-[#0d1512] to-black text-white relative overflow-hidden">
      <div className="pointer-events-none absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-indabax-green/10 blur-[120px]" />
      <div className="pointer-events-none absolute top-1/3 -right-40 w-[500px] h-[500px] rounded-full bg-indabax-green/5 blur-[140px]" />
      {/* HERO */}
      <div className="px-6 py-24 text-center border-b border-white/10">
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <p className="text-indabax-green font-bold tracking-widest text-sm mb-4 uppercase">
            Join The Community
          </p>
          <h1 className="font-display text-4xl md:text-6xl font-black mb-6 uppercase">
            Join IndabaX Kabale
          </h1>
          <p className="text-white/60 max-w-xl mx-auto text-lg">
            Whether you&apos;re a student, researcher, or industry
            professional there&apos;s a place for you at IndabaX Kabale.
          </p>
        </motion.div>
      </div>

      {/* BENEFITS + FORM */}
      <div className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-14">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <p className="text-indabax-green font-bold tracking-widest text-sm mb-4 uppercase">
            Why Join
          </p>
          <h2 className="font-display text-3xl font-black mb-8 uppercase">
            What you get
          </h2>
          <ul className="space-y-5 mb-10">
            {BENEFITS.map((b) => (
              <li key={b} className="flex items-start gap-3">
                <CheckCircle2 className="text-indabax-green shrink-0 mt-0.5" size={20} />
                <span className="text-white/70 leading-relaxed">{b}</span>
              </li>
            ))}
          </ul>

          <div className="bg-indabax-black-light rounded-2xl p-7 border border-white/10 space-y-5">
            <div className="flex items-start gap-4">
              <div className="bg-indabax-green/10 p-3 rounded-full">
                <MapPin className="text-indabax-green" size={20} />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Find Us</h3>
                <p className="text-white/60 text-sm">Kabale University, Kabale, Uganda</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-indabax-green/10 p-3 rounded-full">
                <Mail className="text-indabax-green" size={20} />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Email Us</h3>
                <p className="text-white/60 text-sm">indabaxkabale@gmail.com</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.15}
          variants={fadeUp}
        >
          <h2 className="font-display text-2xl font-black mb-6 uppercase">
            Membership form
          </h2>

          {sent ? (
            <div className="bg-indabax-black-light border border-indabax-green/30 rounded-xl p-8 text-center">
              <CheckCircle2 className="text-indabax-green mx-auto mb-3" size={32} />
              <p className="font-semibold text-lg mb-1">You&apos;re in!</p>
              <p className="text-white/60 text-sm">
                We&apos;ll reach out with next steps and our next meet-up date.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-semibold block mb-1.5">Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-indabax-black-light border border-white/10 outline-none focus:border-indabax-green transition-colors text-white placeholder:text-white/30"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="text-sm font-semibold block mb-1.5">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-indabax-black-light border border-white/10 outline-none focus:border-indabax-green transition-colors text-white placeholder:text-white/30"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="text-sm font-semibold block mb-1.5">
                  Student / Researcher / Staff / Faculty
                </label>
                <input
                  type="text"
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-indabax-black-light border border-white/10 outline-none focus:border-indabax-green transition-colors text-white placeholder:text-white/30"
                  placeholder="e.g. 3rd year Computer Science student"
                />
              </div>
              <div>
                <label className="text-sm font-semibold block mb-1.5">
                  What draws you to AI?
                </label>
                <textarea
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-indabax-black-light border border-white/10 outline-none focus:border-indabax-green transition-colors resize-none text-white placeholder:text-white/30"
                  placeholder="Tell us a bit about yourself..."
                />
              </div>
              <button
                type="submit"
                className="flex items-center justify-center gap-2 bg-indabax-green text-indabax-black px-6 py-3 rounded-full font-bold hover:opacity-90 transition w-full"
              >
                <Send size={16} />
                Submit
              </button>
            </form>
          )}
        </motion.div>
      </div>

      {/* OPEN MEMBERSHIP STRIP */}
      <div className="bg-indabax-green text-indabax-black px-6 py-16 text-center">
        <h2 className="font-display text-2xl md:text-3xl font-black mb-3 uppercase">
          Membership is open to all
        </h2>
        <p className="text-indabax-black/70 max-w-xl mx-auto font-medium">
          Any student, researcher, staff, or faculty member is welcome
          regardless of background. No prior AI experience required.
        </p>
      </div>
    </div>
  );
}