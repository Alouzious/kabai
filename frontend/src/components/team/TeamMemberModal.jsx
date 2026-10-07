import { useEffect } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { FaCircleUser } from "react-icons/fa6";
import SocialLinks from "./SocialLinks";
import ShareButtons from "./ShareButtons";
import { THEMES } from "./teamTheme";

export default function TeamMemberModal({ member, site = "main", onClose }) {
  const t = THEMES[site];
  const basePath = site === "indabax" ? "/indabax" : "";
  const link = `${window.location.origin}${basePath}/team/${member.id}`;

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className={`fixed inset-0 ${t.overlay} z-50 flex items-center justify-center px-4 py-8 overflow-y-auto`}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl overflow-hidden shadow-2xl w-full max-w-lg my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-72">
          {member.photo_url ? (
            <img src={member.photo_url} alt={member.name} className={`w-full h-full ${t.fit}`} />
          ) : (
            <div className={`w-full h-full flex items-center justify-center ${t.placeholder}`}>
              <FaCircleUser size={96} />
            </div>
          )}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/90 hover:bg-black hover:text-white p-2 rounded-full transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-7">
          <p className={`${t.label} font-bold text-xs uppercase tracking-widest mb-1`}>
            {member.is_current ? "Current Team" : `Alumni · ${member.year}`}
          </p>
          <h2 className={`font-display text-2xl font-bold mb-1 ${t.title}`}>{member.name}</h2>
          <p className={`${t.label} font-semibold mb-4`}>{member.role}</p>

          {member.bio ? (
            <p className={`${t.body} leading-relaxed whitespace-pre-line`}>{member.bio}</p>
          ) : (
            <p className="text-black/50 italic">No bio available yet for this member.</p>
          )}

          <div className="mt-6">
            <SocialLinks member={member} btnClass={t.iconBtn} />
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              to={`${basePath}/team/${member.id}`}
              onClick={onClose}
              className={`px-5 py-2.5 rounded-full text-sm font-bold transition-colors ${t.primaryBtn}`}
            >
              View full profile →
            </Link>
          </div>
          <div className="mt-4">
            <ShareButtons url={link} title={`${member.name} – ${member.role}`} btnClass={t.ghostBtn} />
          </div>
        </div>
      </div>
    </div>
  );
}
