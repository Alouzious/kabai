import { useMemo, useState } from "react";
import { Send, CheckCircle2, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import api from "../../lib/api";
import { useSetting } from "../../lib/useSetting";
import ApplicationInstructions, {
  OPEN_TO_EVERY_YEAR,
  YEAR_2_AND_ABOVE,
} from "../../components/indabax/ApplicationInstructions";
import BeforeYouCampaign from "../../components/indabax/BeforeYouCampaign";

const KAB_EMAIL_SUFFIX = "@kab.ac.ug";
const KAB_EMAIL_PATTERN = /^[^\s@]+@kab\.ac\.ug$/i;

const POSITIONS = [...OPEN_TO_EVERY_YEAR, ...YEAR_2_AND_ABOVE];

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

function isYearOne(year) {
  return year === "Year 1";
}

function isEligibleForPosition(year, position) {
  if (!year || !position) return true;
  if (OPEN_TO_EVERY_YEAR.includes(position)) return true;
  if (YEAR_2_AND_ABOVE.includes(position)) return !isYearOne(year);
  return true;
}

function isKabEmail(value) {
  return KAB_EMAIL_PATTERN.test(value.trim());
}

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
  const [emailTouched, setEmailTouched] = useState(false);

  const availablePositions = useMemo(() => {
    if (!form.year_of_study) return POSITIONS;
    if (isYearOne(form.year_of_study)) return OPEN_TO_EVERY_YEAR;
    return POSITIONS;
  }, [form.year_of_study]);

  const emailValid = !form.email.trim() || isKabEmail(form.email);
  const emailError =
    emailTouched && form.email.trim() && !isKabEmail(form.email)
      ? `Use your Kabale University email ending with ${KAB_EMAIL_SUFFIX}`
      : "";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const next = { ...prev, [name]: value };
      if (
        name === "year_of_study" &&
        next.position &&
        !isEligibleForPosition(value, next.position)
      ) {
        next.position = "";
      }
      return next;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailTouched(true);
    setError("");

    if (!form.year_of_study) {
      setError("Please select your year of study so we can show the posts you are eligible for.");
      return;
    }
    if (!isKabEmail(form.email)) {
      setError(`Applications must use your Kabale University email ending with ${KAB_EMAIL_SUFFIX}.`);
      return;
    }
    if (!isEligibleForPosition(form.year_of_study, form.position)) {
      setError("You are not eligible for that post based on your year of study. Choose an eligible position.");
      return;
    }

    setSubmitting(true);
    try {
      await api.post("/applications/", {
        ...form,
        year_of_study: form.year_of_study,
        email: form.email.trim().toLowerCase(),
      });
      setSent(true);
    } catch (err) {
      const code = err.response?.status;
      const detail = err.response?.data?.detail;
      if (code === 403) setError("Applications are closed right now.");
      else if (code === 429) setError("Too many attempts. Please wait a minute and try again.");
      else if (code === 422) {
        if (typeof detail === "string") setError(detail);
        else setError("Please check your answers: use your KAB email, and make sure your phone and reason have enough detail.");
      } else setError("Something went wrong. Please try again in a moment.");
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
            Want to help lead IndabaX Kabale? Check eligibility for your year, then tell us
            who you are and why you want to lead.
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
            className="space-y-5 bg-white/40 backdrop-blur-xl rounded-2xl border border-white/60 shadow-xl p-6 md:p-8"
          >
            <ApplicationInstructions />
            <BeforeYouCampaign />

            <div>
              <label className={labelClass}>Full name *</label>
              <input type="text" name="name" required minLength={2} value={form.name} onChange={handleChange} className={inputClass} placeholder="Your full name" />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Year of study *</label>
                <select name="year_of_study" required value={form.year_of_study} onChange={handleChange} className={inputClass}>
                  <option value="">Choose your year</option>
                  {YEARS.map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>Position you are applying for *</label>
                <select
                  name="position"
                  required
                  value={form.position}
                  onChange={handleChange}
                  className={inputClass}
                  disabled={!form.year_of_study}
                >
                  <option value="">
                    {form.year_of_study ? "Choose a position" : "Select your year first"}
                  </option>
                  {availablePositions.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
                {form.year_of_study && isYearOne(form.year_of_study) && (
                  <p className="text-xs text-black/55 mt-1.5">
                    Year 1 students can only apply for posts open to every year.
                  </p>
                )}
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
                <label className={labelClass}>KAB email *</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  onBlur={() => setEmailTouched(true)}
                  pattern="[^@\s]+@kab\.ac\.ug"
                  title={`Must end with ${KAB_EMAIL_SUFFIX}`}
                  className={`${inputClass} ${emailError ? "border-red-400 focus:border-red-500" : ""}`}
                  placeholder={`name${KAB_EMAIL_SUFFIX}`}
                  autoComplete="email"
                  inputMode="email"
                />
                {emailError ? (
                  <p className="text-xs text-red-600 mt-1.5">{emailError}</p>
                ) : (
                  <p className="text-xs text-black/55 mt-1.5">
                    Must end with <span className="font-mono">{KAB_EMAIL_SUFFIX}</span>
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className={labelClass}>Why do you want to be a leader? *</label>
              <textarea name="reason" required minLength={10} maxLength={2000} rows={6} value={form.reason} onChange={handleChange} className={`${inputClass} resize-none`} placeholder="Tell us what you would bring and what you would like to do." />
              <p className="text-xs text-black/50 mt-1 text-right">{form.reason.length} / 2000</p>
            </div>

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={submitting || (emailTouched && !emailValid)}
              className="flex items-center justify-center gap-2 bg-indabax-green text-black px-6 py-3 rounded-full font-bold hover:bg-indabax-green-dark hover:text-white transition w-full disabled:opacity-60"
            >
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
