import { useState } from "react";
import { Send, CheckCircle2, Mail, MapPin, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import api from "../../lib/api";

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
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      await api.post("/membership/join", { ...form, site: "indabax" });
      setSent(true);
    } catch {
      setError("Something went wrong. Please try again in a moment.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-indabax-green/25 via-indabax-green/5 to-indabax-black/25 relative overflow-hidden">
      <div className="pointer-events-none absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-indabax-green/40 blur-[120px]" />
      <div className="pointer-events-none absolute top-1/3 -left-40 w-[500px] h-[500px] rounded-full bg-indabax-green-dark/30 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 w-[450px] h-[450px] rounded-full bg-indabax-green/25 blur-[120px]" />
      {/* HERO */}
      <div className="px-6 py-24 text-center">
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <p className="text-indabax-green font-bold tracking-widest text-sm mb-4 uppercase">
            Join The Community
          </p>
          <h1 className="font-display text-4xl md:text-6xl font-black mb-6 uppercase text-black">
            Join IndabaX Kabale
          </h1>
          <p className="text-black/70 max-w-xl mx-auto text-lg">
            Whether you&apos;re a student, researcher, or industry
            professional there&apos;s a place for you at IndabaX Kabale.
          </p>
        </motion.div>
      </div>

      {/* BENEFITS + FORM */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-14">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <p className="text-indabax-green font-bold tracking-widest text-sm mb-4 uppercase">
            Why Join
          </p>
          <h2 className="font-display text-3xl font-black mb-8 uppercase text-black">
            What you get
          </h2>
          <ul className="space-y-5 mb-10">
            {BENEFITS.map((b) => (
              <li key={b} className="flex items-start gap-3">
                <CheckCircle2 className="text-indabax-green shrink-0 mt-0.5" size={20} />
                <span className="text-black/70 leading-relaxed">{b}</span>
              </li>
            ))}
          </ul>

          <div className="bg-white/40 backdrop-blur-xl rounded-2xl p-7 border border-white/60 space-y-5">
            <div className="flex items-start gap-4">
              <div className="bg-indabax-green/10 p-3 rounded-full">
                <MapPin className="text-indabax-green" size={20} />
              </div>
              <div>
                <h3 className="font-semibold mb-1 text-black">Find Us</h3>
                <p className="text-black/70 text-sm">Kabale University, Kabale, Uganda</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-indabax-green/10 p-3 rounded-full">
                <Mail className="text-indabax-green" size={20} />
              </div>
              <div>
                <h3 className="font-semibold mb-1 text-black">Email Us</h3>
                <p className="text-black/70 text-sm">indabaxug@gmail.com</p>
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
          <h2 className="font-display text-2xl font-black mb-6 uppercase text-black">
            Membership form
          </h2>

          {sent ? (
            <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-2xl p-8 text-center shadow-xl">
              <CheckCircle2 className="text-indabax-green mx-auto mb-3" size={32} />
              <p className="font-semibold text-lg mb-1 text-black">You&apos;re in!</p>
              <p className="text-black/70 text-sm">
                We&apos;ll reach out with next steps and our next meet-up date.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 bg-white/40 backdrop-blur-xl rounded-2xl border border-white/60 shadow-xl p-6 md:p-8">
              <div>
                <label className="text-sm font-semibold block mb-1.5 text-black">Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-white/70 bg-white/50 backdrop-blur outline-none focus:border-indabax-green transition-colors text-black placeholder:text-black/40"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="text-sm font-semibold block mb-1.5 text-black">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-white/70 bg-white/50 backdrop-blur outline-none focus:border-indabax-green transition-colors text-black placeholder:text-black/40"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="text-sm font-semibold block mb-1.5 text-black">
                  Student / Researcher / Staff / Faculty
                </label>
                <input
                  type="text"
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-white/70 bg-white/50 backdrop-blur outline-none focus:border-indabax-green transition-colors text-black placeholder:text-black/40"
                  placeholder="e.g. 3rd year Computer Science student"
                />
              </div>
              <div>
                <label className="text-sm font-semibold block mb-1.5 text-black">
                  What draws you to AI?
                </label>
                <textarea
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-white/70 bg-white/50 backdrop-blur outline-none focus:border-indabax-green transition-colors resize-none text-black placeholder:text-black/40"
                  placeholder="Tell us a bit about yourself..."
                />
              </div>
              {error && <p className="text-red-600 text-sm">{error}</p>}
              <button
                type="submit"
                disabled={submitting}
                className="flex items-center justify-center gap-2 bg-indabax-green text-black px-6 py-3 rounded-full font-bold hover:bg-indabax-green-dark hover:text-white transition w-full disabled:opacity-60"
              >
                {submitting ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                {submitting ? "Submitting..." : "Submit"}
              </button>
            </form>
          )}
        </motion.div>
      </div>

      {/* OPEN MEMBERSHIP */}
      <div className="px-6 py-16 text-center border-t border-indabax-green/20">
        <h2 className="font-display text-2xl md:text-3xl font-black mb-3 uppercase text-black">
          Membership is open to all
        </h2>
        <p className="text-black/70 max-w-xl mx-auto font-medium">
          Any student, researcher, staff, or faculty member is welcome
          regardless of background. No prior AI experience required.
        </p>
      </div>
    </div>
  );
}
