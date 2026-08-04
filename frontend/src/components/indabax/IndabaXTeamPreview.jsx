import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../lib/api";

export default function IndabaXTeamPreview() {
  const [team, setTeam] = useState([]);

  useEffect(() => {
    api.get("/team/", { params: { site: "indabax" } }).then((r) => setTeam(r.data.filter((m) => m.is_current))).catch(() => {});
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
            <div key={m.id} className="bg-white rounded-xl overflow-hidden border border-indabax-green/20 hover:border-indabax-green transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="h-40 bg-indabax-green/10 overflow-hidden">
                {m.photo_url && <img src={m.photo_url} alt={m.name} className="w-full h-full object-cover" />}
              </div>
              <div className="p-4 text-center">
                <h3 className="font-bold text-sm text-indabax-black">{m.name}</h3>
                <p className="text-indabax-green text-xs uppercase tracking-wide">{m.role}</p>
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