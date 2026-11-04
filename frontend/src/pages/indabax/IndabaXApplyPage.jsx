import { useState } from "react";
import { Send, CheckCircle2, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import api from "../../lib/api";
import { useSetting } from "../../lib/useSetting";

// ---- Edit these to change the page. No backend change is needed. ----
const POSITIONS = [
  "Club President",
  "Vice President",
  "Secretary",
  "Technical Lead",
  "Speaker",
  "Women Lead",
  "Social Media Lead",
  "Graphic Designer",
  "Event Planner",
  "Year Two Representative",
  "Other",
];

const FACULTIES = [
  "Faculty of Computing, Library and Information Science",
  "Faculty of Science",
  "Faculty of Engineering, Technology, Applied Design and Fine Art",
  "Faculty of Agriculture and Environmental Sciences",
  "Faculty of Economics and Management Science",
  "Faculty of Social Sciences",
  "Faculty of Education",
  "Faculty of Law",
  "Kabale University School of Medicine (KABSOM)",
  "Institute of Language Studies",
  "Institute of Tourism and Hospitality",
  "Other",
];

const YEARS = ["Year 1", "Year 2", "Year 3", "Year 4", "Year 5", "Postgraduate"];
// ---------------------------------------------------------------------

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: "easeOut" },
  }),
};

const inputClass =
  "w-full px-4 py-3 rounded-lg border border-white/70 bg-white/50 backdrop-blur outline-none focus:border-indabax-green transition-colors text-black placeholder:text-black/40";
const labelClass = "text-sm font-semibold block mb-1.5 text-black";

export default function IndabaXApplyPage() {
  const openSetting = useSetting("indabax_applications_open");
  const [form, setForm] = useState({
    name: "",
    position: "",
    faculty: "",
    year_of_study: "",
    phone: "",
    email: "",
    reason: "",
  });
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      await api.post("/applications/", {
        ...form,
        year_of_study: form.year_of_study || null,
        email: form.email.trim() || null,
      });
      setSent(true);
    } catch (err) {
      const code = err.response?.status;
      if (code === 403) setError("Applications are closed right now.");
      else if (code === 429) setError("Too many attempts. Please wait a minute and try again.");
      else if (code === 422) setError("Please check your answers: the phone number and your reason need a little more detail.");
      else setError("Something went wrong. Please try again in a moment.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-indabax-green/25 via-indabax-green/5 to-indabax-black/25 relative overflow-hidden">
      <div className="pointer-events-none absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-indabax-green/40 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 -left-40 w-[450px] h-[450px] rounded-full bg-indabax-green-dark/30 blur-[140px]" />

      <div className="px-6 pt-24 pb-10 text-center">
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <p className="text-indabax-green font-bold tracking-widest text-sm mb-4 uppercase">
            Call for Leaders
          </p>
          <h1 className="font-display text-4xl md:text-6xl font-black mb-6 uppercase text-black">
            Apply for Leadership
          </h1>
          <p className="text-black/70 max-w-xl mx-auto text-lg">
            Want to help lead IndabaX Kabale? Tell us who you are, the position you are
            interested in and why you want to lead.
          </p>
        </motion.div>
      </div>

      <div className="max-w-2xl mx-auto px-6 pb-24">
        {openSetting === null ? (
          <p className="text-center text-black/60">Loading…</p>
        ) : openSetting !== "true" ? (
          <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-2xl p-8 text-center shadow-xl">
            <p className="font-semibold text-lg mb-1 text-black">Applications are closed</p>
            <p className="text-black/70 text-sm">Follow our channels to hear about the next call.</p>
          </div>
        ) : sent ? (
          <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-2xl p-8 text-center shadow-xl">
            <CheckCircle2 className="text-indabax-green mx-auto mb-3" size={32} />
            <p className="font-semibold text-lg mb-1 text-black">Application received</p>
            <p className="text-black/70 text-sm">
              Thank you for applying. The team will review it and contact you.
            </p>
          </div>
        ) : (
          <motion.form
            onSubmit={handleSubmit}
            initial="hidden"
            animate="visible"
            custom={0.1}
            variants={fadeUp}
            className="space-y-4 bg-white/40 backdrop-blur-xl rounded-2xl border border-white/60 shadow-xl p-6 md:p-8"
          >
            <div>
              <label className={labelClass}>Full name *</label>
              <input type="text" name="name" required minLength={2} value={form.name} onChange={handleChange} className={inputClass} placeholder="Your full name" />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Position you are applying for *</label>
                <select name="position" required value={form.position} onChange={handleChange} className={inputClass}>
                  <option value="">Choose a position</option>
                  {POSITIONS.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>Year of study</label>
                <select name="year_of_study" value={form.year_of_study} onChange={handleChange} className={inputClass}>
                  <option value="">Choose your year</option>
                  {YEARS.map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className={labelClass}>Faculty *</label>
              <select name="faculty" required value={form.faculty} onChange={handleChange} className={inputClass}>
                <option value="">Choose your faculty</option>
                {FACULTIES.map((f) => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Phone number *</label>
                <input type="tel" name="phone" required minLength={7} value={form.phone} onChange={handleChange} className={inputClass} placeholder="e.g. 0700 000 000" />
              </div>
              <div>
                <label className={labelClass}>Email (optional)</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} className={inputClass} placeholder="you@example.com" />
              </div>
            </div>

            <div>
              <label className={labelClass}>Why do you want to be a leader? *</label>
              <textarea name="reason" required minLength={10} maxLength={2000} rows={6} value={form.reason} onChange={handleChange} className={`${inputClass} resize-none`} placeholder="Tell us what you would bring and what you would like to do." />
              <p className="text-xs text-black/50 mt-1 text-right">{form.reason.length} / 2000</p>
            </div>

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <button type="submit" disabled={submitting} className="flex items-center justify-center gap-2 bg-indabax-green text-black px-6 py-3 rounded-full font-bold hover:bg-indabax-green-dark hover:text-white transition w-full disabled:opacity-60">
              {submitting ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
              {submitting ? "Submitting..." : "Submit application"}
            </button>

            <p className="text-xs text-black/50 text-center">
              We use your details only to review your application and contact you.
            </p>
          </motion.form>
        )}
      </div>
    </div>
  );
}
