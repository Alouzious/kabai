import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { FaLinkedin, FaTwitter } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";

export default function IndabaXTeamPage() {
  const [team, setTeam] = useState([]);
  const [year, setYear] = useState(null);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    import("../../lib/api").then(({ default: api }) => {
      api.get("/team/", { params: { site: "indabax", year } }).then((res) => setTeam(res.data));
    });
  }, [year]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setSelected(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [selected]);

  const years = [...new Set(team.map((m) => m.year))].sort((a, b) => b - a);

  const selectCard = (m) => setSelected(selected?.id === m.id ? null : m);

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <p className="text-indabax-green font-semibold tracking-widest text-sm mb-3">OUR TEAM</p>
      <h1 className="font-display text-4xl font-bold mb-10 text-black">IndabaX Organizers</h1>

      <div className="flex gap-2 mb-12 flex-wrap">
        <button onClick={() => setYear(null)} className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${!year ? "bg-indabax-green text-black" : "bg-cream hover:bg-cream-dark"}`}>
          All Years
        </button>
        {years.map((y) => (
          <button key={y} onClick={() => setYear(y)} className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${year === y ? "bg-indabax-green text-black" : "bg-cream hover:bg-cream-dark"}`}>
            {y}
          </button>
        ))}
      </div>

      {team.length === 0 ? (
        <p className="text-center text-[--color-text-body] py-10">No team members found.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {team.map((m) => {
            const isSelected = selected?.id === m.id;
            return (
              <button
                key={m.id}
                onClick={() => selectCard(m)}
                className={`group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 text-left w-full ${
                  isSelected
                    ? "ring-2 ring-indabax-green border-indabax-green -translate-y-1"
                    : "border border-transparent hover:-translate-y-1 hover:border-indabax-green/40"
                }`}
              >
                <div className="h-56 overflow-hidden bg-indabax-green/10">
                  {m.photo_url ? (
                    <img src={m.photo_url} alt={m.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-indabax-green/30">
                      <FaCircleUser size={72} />
                    </div>
                  )}
                </div>
                <div className="p-5 text-center">
                  <h3 className="font-semibold text-lg text-black">{m.name}</h3>
                  <span
                    className={`inline-block px-4 py-1.5 rounded-full text-sm font-bold mb-3 transition-colors ${
                      isSelected
                        ? "bg-indabax-green text-black"
                        : "bg-indabax-green/10 text-indabax-green-dark group-hover:bg-indabax-green group-hover:text-black"
                    }`}
                  >
                    {m.role}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {selected && (
        <div
          className="fixed inset-0 bg-indabax-black/80 z-50 flex items-center justify-center px-4 py-8 overflow-y-auto"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-2xl overflow-hidden shadow-2xl w-full max-w-lg my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-64 bg-indabax-green/10">
              {selected.photo_url && <img src={selected.photo_url} alt={selected.name} className="w-full h-full object-cover" />}
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 bg-white/90 hover:bg-indabax-green hover:text-black p-2 rounded-full transition-colors"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-7">
              <p className="text-indabax-green font-bold text-xs uppercase tracking-widest mb-1">
                {selected.is_current ? "Current Organizer" : `Alumni · ${selected.year}`}
              </p>
              <h2 className="font-display text-2xl font-bold text-black mb-1">{selected.name}</h2>
              <p className="text-indabax-green font-semibold mb-4">{selected.role}</p>
              {selected.bio ? (
                <p className="text-black/70 leading-relaxed">{selected.bio}</p>
              ) : (
                <p className="text-black/50 italic">
                  No bio available yet for this member.
                </p>
              )}
              {(selected.linkedin_url || selected.twitter_url) && (
                <div className="flex gap-3 mt-6">
                  {selected.linkedin_url && (
                    <a href={selected.linkedin_url} target="_blank" rel="noreferrer" className="bg-cream p-3 rounded-full text-indabax-green-dark hover:bg-indabax-green hover:text-black transition-colors">
                      <FaLinkedin size={18} />
                    </a>
                  )}
                  {selected.twitter_url && (
                    <a href={selected.twitter_url} target="_blank" rel="noreferrer" className="bg-cream p-3 rounded-full text-indabax-green-dark hover:bg-indabax-green hover:text-black transition-colors">
                      <FaTwitter size={18} />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="text-center mt-12">
        <Link to="/indabax" className="text-indabax-green font-bold uppercase tracking-wide transition-colors hover:text-indabax-green-dark">
          Back to home
        </Link>
      </div>
    </div>
  );
}
