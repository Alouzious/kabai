import { Info } from "lucide-react";

const OPEN_TO_EVERY_YEAR = [
  "Year One Representative",
  "Secretary",
  "Treasurer",
  "Event Planner",
  "Graphic Designer",
];

const YEAR_2_AND_ABOVE = [
  "Club President",
  "Vice President",
  "Technical Lead",
  "Speaker",
  "Women Lead",
  "Social Media Lead",
  "Year Two Representative",
];

export { OPEN_TO_EVERY_YEAR, YEAR_2_AND_ABOVE };

export default function ApplicationInstructions() {
  return (
    <div className="rounded-xl border border-indabax-green/40 bg-indabax-green/10 p-4 md:p-5">
      <div className="flex items-start gap-3 mb-3">
        <Info className="text-indabax-green-dark shrink-0 mt-0.5" size={18} />
        <div>
          <p className="font-semibold text-black text-sm md:text-base">
            Read this before you apply
          </p>
          <p className="text-black/70 text-sm mt-1 leading-relaxed">
            Not every post is open to every student. Check your year of study below,
            then choose a post you are eligible for. Applications for a post you are
            not eligible for will not be considered.
          </p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mt-4">
        <div className="rounded-lg bg-white/50 border border-white/70 p-3.5">
          <p className="text-xs font-bold uppercase tracking-wide text-indabax-green-dark mb-2">
            Open to every year
          </p>
          <p className="text-xs text-black/60 mb-2">Students in any year can apply for:</p>
          <ul className="space-y-1 text-sm text-black/80">
            {OPEN_TO_EVERY_YEAR.map((p) => (
              <li key={p} className="flex gap-2">
                <span className="text-indabax-green-dark">·</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-lg bg-white/50 border border-white/70 p-3.5">
          <p className="text-xs font-bold uppercase tracking-wide text-indabax-green-dark mb-2">
            Year 2 and above
          </p>
          <p className="text-xs text-black/60 mb-2">Only students in Year 2 or higher can apply for:</p>
          <ul className="space-y-1 text-sm text-black/80">
            {YEAR_2_AND_ABOVE.map((p) => (
              <li key={p} className="flex gap-2">
                <span className="text-indabax-green-dark">·</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
