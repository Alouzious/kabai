import { useEffect, useState } from "react";
import { FaLinkedin, FaTwitter } from "react-icons/fa";

export default function IndabaXTeamPage() {
  const [team, setTeam] = useState([]);
  const [year, setYear] = useState(null);

  useEffect(() => {
    import("../../lib/api").then(({ default: api }) => {
      api.get("/team/", { params: { site: "indabax", year } }).then((res) => setTeam(res.data));
    });
  }, [year]);

  const years = [...new Set(team.map((m) => m.year))].sort((a, b) => b - a);

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <p className="text-accent font-semibold tracking-widest text-sm mb-3">OUR TEAM</p>
      <h1 className="font-display text-4xl font-bold mb-10">IndabaX Organizers</h1>

      <div className="flex gap-2 mb-12 flex-wrap">
        <button onClick={() => setYear(null)} className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${!year ? "bg-accent text-white" : "bg-cream hover:bg-cream-dark"}`}>
          All Years
        </button>
        {years.map((y) => (
          <button key={y} onClick={() => setYear(y)} className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${year === y ? "bg-accent text-white" : "bg-cream hover:bg-cream-dark"}`}>
            {y}
          </button>
        ))}
      </div>

      {team.length === 0 ? (
        <p className="text-center text-[--color-text-body] py-10">No team members found.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {team.map((m) => (
            <div key={m.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300">
              <div className="h-56 overflow-hidden bg-cream-dark">
                {m.photo_url && <img src={m.photo_url} alt={m.name} className="w-full h-full object-cover" />}
              </div>
              <div className="p-5 text-center">
                <h3 className="font-semibold text-lg">{m.name}</h3>
                <p className="text-accent text-sm mb-2">{m.role}</p>
                {!m.is_current && <p className="text-xs text-[--color-text-body] mb-3">Alumni &middot; {m.year}</p>}
                <div className="flex justify-center gap-2 mt-3">
                  {m.linkedin_url && (
                    <a href={m.linkedin_url} target="_blank" rel="noreferrer" className="bg-cream p-2 rounded-full text-charcoal hover:bg-accent hover:text-white transition-colors">
                      <FaLinkedin size={16} />
                    </a>
                  )}
                  {m.twitter_url && (
                    <a href={m.twitter_url} target="_blank" rel="noreferrer" className="bg-cream p-2 rounded-full text-charcoal hover:bg-accent hover:text-white transition-colors">
                      <FaTwitter size={16} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
