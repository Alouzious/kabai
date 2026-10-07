import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { FaCircleUser } from "react-icons/fa6";
import api from "../lib/api";
import SocialLinks from "../components/team/SocialLinks";
import ShareButtons from "../components/team/ShareButtons";
import { THEMES } from "../components/team/teamTheme";

export default function TeamProfilePage({ site = "main" }) {
  const { id } = useParams();
  const t = THEMES[site];
  const basePath = site === "indabax" ? "/indabax" : "";
  const [member, setMember] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let alive = true;
    setStatus("loading");
    api
      .get(`/team/${id}`)
      .then((res) => {
        if (!alive) return;
        setMember(res.data);
        setStatus("ok");
      })
      .catch(() => alive && setStatus("missing"));
    return () => {
      alive = false;
    };
  }, [id]);

  useEffect(() => {
    if (!member) return;
    const old = document.title;
    document.title = `${member.name} – ${member.role}`;
    return () => {
      document.title = old;
    };
  }, [member]);

  if (status === "loading") {
    return <p className="max-w-5xl mx-auto px-6 py-24 text-center text-black/60">Loading…</p>;
  }

  if (status === "missing") {
    return (
      <div className="max-w-5xl mx-auto px-6 py-24 text-center">
        <p className="text-lg mb-4">We couldn't find this profile.</p>
        <Link to={`${basePath}/team`} className={`font-semibold ${t.back}`}>
          See the whole team
        </Link>
      </div>
    );
  }

  // a link opened on the wrong site goes to the right one
  if (member.site && member.site !== site) {
    return <Navigate to={`${member.site === "indabax" ? "/indabax" : ""}/team/${member.id}`} replace />;
  }

  const link = `${window.location.origin}${basePath}/team/${member.id}`;

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <Link to={`${basePath}/team`} className={`inline-flex items-center gap-2 text-sm font-semibold mb-8 ${t.back}`}>
        <ArrowLeft size={16} /> Back to team
      </Link>

      <div className="grid md:grid-cols-[320px_1fr] gap-10 items-start">
        <div className="rounded-2xl overflow-hidden aspect-[4/5] shadow-lg bg-white">
          {member.photo_url ? (
            <img src={member.photo_url} alt={member.name} className={`w-full h-full ${t.fit}`} />
          ) : (
            <div className={`w-full h-full flex items-center justify-center ${t.placeholder}`}>
              <FaCircleUser size={120} />
            </div>
          )}
        </div>

        <div>
          <p className={`${t.label} font-bold text-xs uppercase tracking-widest mb-2`}>
            {member.is_current ? "Current Team" : `Alumni · ${member.year}`}
          </p>
          <h1 className={`font-display text-4xl font-bold mb-2 ${t.title}`}>{member.name}</h1>
          <p className={`${t.label} font-semibold text-lg mb-6`}>{member.role}</p>

          {member.bio ? (
            <p className={`${t.body} leading-relaxed whitespace-pre-line`}>{member.bio}</p>
          ) : (
            <p className="text-black/50 italic">No bio available yet for this member.</p>
          )}

          <div className="mt-8">
            <SocialLinks member={member} btnClass={t.iconBtn} size={20} />
          </div>
          <div className="mt-8">
            <ShareButtons url={link} title={`${member.name} – ${member.role}`} btnClass={t.ghostBtn} />
          </div>
        </div>
      </div>
    </div>
  );
}
