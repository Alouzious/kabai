import { useState } from "react";
import { Mail, MapPin, Send } from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: "easeOut" },
  }),
};

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="bg-white">
      <div className="bg-charcoal text-white px-4 sm:px-6 py-16 sm:py-24 text-center">
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <p className="text-accent font-semibold tracking-widest text-xs sm:text-sm mb-3 uppercase">Get In Touch</p>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Join KAB AI</h1>
          <p className="text-white/60 max-w-xl mx-auto text-sm sm:text-base">
            Interested in joining the club or partnering with us? We'd love to hear from you.
          </p>
        </motion.div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 sm:py-20 grid md:grid-cols-2 gap-10 sm:gap-14">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <h2 className="font-display text-xl sm:text-2xl font-bold mb-6 text-charcoal">Send Us a Message</h2>

          {sent ? (
            <div className="bg-cream rounded-xl p-8 text-center">
              <p className="font-semibold text-lg mb-1 text-charcoal">Message sent!</p>
              <p className="text-text-body text-sm">We'll get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-semibold block mb-1.5 text-charcoal">Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-border-soft outline-none focus:border-accent transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="text-sm font-semibold block mb-1.5 text-charcoal">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-border-soft outline-none focus:border-accent transition-colors"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="text-sm font-semibold block mb-1.5 text-charcoal">Message</label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-border-soft outline-none focus:border-accent transition-colors resize-none"
                  placeholder="Tell us what's on your mind..."
                />
              </div>
              <button
                type="submit"
                className="flex items-center justify-center gap-2 bg-accent text-charcoal px-6 py-3 rounded-lg font-semibold hover:bg-accent-light transition w-full"
              >
                <Send size={16} />
                Send Message
              </button>
            </form>
          )}
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.15} variants={fadeUp} className="space-y-5 sm:space-y-6">
          <div className="bg-cream rounded-2xl p-6 sm:p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-accent/10 p-3 rounded-full shrink-0">
                <MapPin className="text-accent" size={20} />
              </div>
              <div>
                <h3 className="font-semibold mb-1 text-charcoal">Visit Us</h3>
                <p className="text-text-body text-sm">Kabale University, Kabale, Uganda</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-accent/10 p-3 rounded-full shrink-0">
                <Mail className="text-accent" size={20} />
              </div>
              <div>
                <h3 className="font-semibold mb-1 text-charcoal">Email Us</h3>
                <p className="text-text-body text-sm">kabai@kab.ac.ug</p>
              </div>
            </div>
          </div>

          <div className="bg-charcoal text-white rounded-2xl p-6 sm:p-8">
            <h3 className="font-display font-bold text-lg mb-2">Want to Partner With Us?</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              We're always open to collaborating with organizations that share our mission of expanding
              AI education and opportunity in Kabale.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}