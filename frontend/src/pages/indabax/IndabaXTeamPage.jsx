import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../lib/api";
import TeamCard from "../../components/team/TeamCard";
import { sortByRole } from "../../components/team/roles";

export default function IndabaXTeamPage() {
  const [team, setTeam] = useState([]);
  const [year, setYear] = useState(null);

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
            <TeamCard key={m.id} member={m} site="indabax" />
          ))}
        </div>
      )}

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
