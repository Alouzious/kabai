import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaCircleUser } from "react-icons/fa6";
import api from "../../lib/api";

const ROLE_ORDER = [
  "Community Patron",
  "Club President",
  "Vice President",
  "Speaker",
  "Secretary",
  "Technical Lead",
  "Year Two Representative",
  "Women Lead",
  "Social Media Lead",
  "Graphic Designer",
  "Event Planner",
];

export default function IndabaXTeamPreview() {
  const [team, setTeam] = useState([]);

  useEffect(() => {
    api
      .get("/team/", { params: { site: "indabax" } })
      .then((r) =>
        setTeam(
          r.data
            .filter((m) => m.is_current)
            .sort(
              (a, b) =>
                (ROLE_ORDER.indexOf(a.role) === -1 ? 999 : ROLE_ORDER.indexOf(a.role)) -
                (ROLE_ORDER.indexOf(b.role) === -1 ? 999 : ROLE_ORDER.indexOf(b.role))
            )
        )
      )
      .catch(() => {});
  }, []);

  return (
    <section className="px-6 py-24 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <p className="text-indabax-green font-bold tracking-widest text-sm mb-4 uppercase">Our Team</p>
        <h2 className="font-display text-4xl md:text-5xl font-black uppercase">IndabaX Organizers</h2>
      </div>
      {team.length === 0 ? (
        <p className="text-center text-[--color-text-body]">Team information coming soon.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {team.map((m) => (
            <div key={m.id} className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 text-left w-full border border-transparent hover:border-indabax-green/40 hover:-translate-y-1">
              <div className="h-64 overflow-hidden bg-indabax-green/10">
                {m.photo_url ? (
                  <img src={m.photo_url} alt={m.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
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
            </div>
          ))}
        </div>
      )}
      <div className="text-center mt-12">
        <Link to="/indabax/team" className="text-indabax-green font-bold uppercase tracking-wide transition-colors hover:text-indabax-green-dark">
          Meet the full team
        </Link>
      </div>
    </section>
  );
}