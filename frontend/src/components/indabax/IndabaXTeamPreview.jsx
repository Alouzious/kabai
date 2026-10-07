import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../lib/api";
import TeamCard from "../team/TeamCard";
import { sortByRole } from "../team/roles";

// Exactly these roles show on the home page (spelled as in the admin)
const HOME_ROLES = ["Community Patron", "Club President", "Vice President", "Technical Lead"];

export default function IndabaXTeamPreview() {
  const [team, setTeam] = useState([]);

  useEffect(() => {
    api
      .get("/team/", { params: { site: "indabax" } })
      .then((r) =>
        setTeam(sortByRole(r.data.filter((m) => m.is_current && HOME_ROLES.includes(m.role))))
      )
      .catch(() => {});
  }, []);

  return (
    <section className="px-6 py-24 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="font-display text-4xl md:text-5xl font-black uppercase">Leadership</h2>
      </div>

      {team.length === 0 ? (
        <p className="text-center text-[--color-text-body]">Team information coming soon.</p>
      ) : (
        <div className="flex flex-wrap justify-center gap-8">
          {team.map((m) => (
            <div key={m.id} className="w-[calc(50%-1rem)] md:w-[calc(25%-1.5rem)]">
              <TeamCard member={m} site="indabax" />
            </div>
          ))}
        </div>
      )}

      <div className="text-center mt-12">
        <Link
          to="/indabax/team"
          className="text-indabax-green font-bold uppercase tracking-wide transition-colors hover:text-indabax-green-dark"
        >
          Meet the full team
        </Link>
      </div>
    </section>
  );
}
