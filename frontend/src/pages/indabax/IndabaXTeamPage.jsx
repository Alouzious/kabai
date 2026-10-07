import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaCircleUser } from "react-icons/fa6";
import api from "../../lib/api";
import TeamMemberModal from "../../components/team/TeamMemberModal";
import { sortByRole } from "../../components/team/roles";

export default function IndabaXTeamPage() {
  const [team, setTeam] = useState([]);
  const [year, setYear] = useState(null);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    api
      .get("/team/", { params: { site: "indabax", year } })
      .then((res) => setTeam(sortByRole(res.data)));
  }, [year]);

  const years = [...new Set(team.map((m) => m.year))].sort((a, b) => b - a);

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <p className="text-indabax-green font-semibold tracking-widest text-sm mb-3">OUR TEAM</p>
      <h1 className="font-display text-4xl font-bold mb-10 text-black">IndabaX Organizers</h1>

      <div className="flex gap-2 mb-12 flex-wrap">
        <button
          onClick={() => setYear(null)}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
            !year ? "bg-indabax-green text-black" : "bg-cream hover:bg-cream-dark"
          }`}
        >
          All Years
        </button>
        {years.map((y) => (
          <button
            key={y}
            onClick={() => setYear(y)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
              year === y ? "bg-indabax-green text-black" : "bg-cream hover:bg-cream-dark"
            }`}
          >
            {y}
          </button>
        ))}
      </div>

      {team.length === 0 ? (
        <p className="text-center text-[--color-text-body] py-10">No team members found.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {team.map((m) => (
            <button
              type="button"
              key={m.id}
              onClick={() => setSelected(m)}
              className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 text-left w-full border border-transparent hover:border-indabax-green/40 hover:-translate-y-1"
            >
              <div className="h-64 overflow-hidden">
                {m.photo_url ? (
                  <img
                    src={m.photo_url}
                    alt={m.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-indabax-green/30">
                    <FaCircleUser size={72} />
                  </div>
                )}
              </div>
              <div className="p-5 text-center">
                <h3 className="font-semibold text-lg text-black">{m.name}</h3>
                <span className="inline-block px-4 py-1.5 rounded-full text-sm font-bold mb-3 bg-indabax-green/10 text-indabax-green-dark group-hover:bg-indabax-green group-hover:text-black transition-colors">
                  {m.role}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}

      {selected && <TeamMemberModal member={selected} site="indabax" onClose={() => setSelected(null)} />}

      <div className="text-center mt-12">
        <Link
          to="/indabax"
          className="text-indabax-green font-bold uppercase tracking-wide transition-colors hover:text-indabax-green-dark"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
