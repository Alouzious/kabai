import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { FaCircleUser } from "react-icons/fa6";
import { FaEnvelope, FaLinkedin, FaTwitter, FaGithub, FaInstagram, FaIdBadge, FaRegCalendarAlt } from "react-icons/fa";
import api from "../lib/api";
import ShareButtons from "../components/team/ShareButtons";
import { THEMES } from "../components/team/teamTheme";

const clean = (v) => (v || "").trim();
const fullUrl = (v) => (/^https?:\/\//i.test(v) ? v : `https://${v}`);

// Big About text: "## Heading" makes a titled section, "- item" makes a boxed list, anything else is a paragraph
function parseBio(bio) {
  const blocks = [];
  let list = [];
  const flush = () => {
    if (list.length) {
      blocks.push({ type: "list", items: list });
      list = [];
    }
  };
  (bio || "").split("\n").forEach((raw) => {
    const line = raw.trim();
    if (!line) return flush();
    if (line.startsWith("## ")) {
      flush();
      blocks.push({ type: "h", text: line.slice(3) });
    } else if (/^[-•*]\s+/.test(line)) {
      list.push(line.replace(/^[-•*]\s+/, ""));
    } else {
      flush();
      blocks.push({ type: "p", text: line });
    }
  });
  flush();
  return blocks;
}

export default function TeamProfilePage({ site = "main" }) {
  const { id } = useParams();
  const t = THEMES[site];
  const basePath = site === "indabax" ? "/indabax" : "";
  const bannerBg = site === "indabax" ? "bg-indabax-black" : "bg-charcoal";
  const [member, setMember] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let alive = true;
    setStatus("loading");
    window.scrollTo(0, 0);
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
  const email = clean(member.email);
  const shortBio = clean(member.short_bio);

  const contacts = [
    email && { Icon: FaEnvelope, label: email, href: `mailto:${email}` },
    clean(member.linkedin_url) && { Icon: FaLinkedin, label: "LinkedIn", href: fullUrl(clean(member.linkedin_url)) },
    clean(member.github_url) && { Icon: FaGithub, label: "GitHub", href: fullUrl(clean(member.github_url)) },
    clean(member.twitter_url) && { Icon: FaTwitter, label: "X / Twitter", href: fullUrl(clean(member.twitter_url)) },
    clean(member.instagram_url) && { Icon: FaInstagram, label: "Instagram", href: fullUrl(clean(member.instagram_url)) },
  ].filter(Boolean);

  const blocks = parseBio(member.bio);

  return (
    <div>
      {/* Banner */}
      <div className={`${bannerBg} text-white`}>
        <div className="max-w-4xl mx-auto px-6 py-10 text-center">
          <h1 className="font-display text-2xl md:text-3xl font-bold">{member.name}</h1>
          <p className="text-xs uppercase tracking-widest mt-3 text-white/70">
            <Link to={basePath || "/"} className="hover:text-white">Home</Link>
            {" / "}
            <Link to={`${basePath}/team`} className="hover:text-white">Team</Link>
            {" / "}
            <span className={t.label}>{member.name}</span>
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header: round photo + details + short about */}
        <div className="flex flex-col sm:flex-row gap-8 items-center sm:items-start">
          <div className="w-40 h-40 sm:w-44 sm:h-44 shrink-0 rounded-full overflow-hidden ring-4 ring-black/5 shadow-md bg-white">
            {member.photo_url ? (
              <img src={member.photo_url} alt={member.name} className="w-full h-full object-cover object-top" />
            ) : (
              <div className={`w-full h-full flex items-center justify-center ${t.placeholder}`}>
                <FaCircleUser size={110} />
              </div>
            )}
          </div>

          <div className="text-center sm:text-left">
            <h2 className={`font-display text-3xl font-bold ${t.title}`}>{member.name}</h2>
            <ul className="mt-4 space-y-2 text-sm">
              <li className={`flex items-center gap-2 justify-center sm:justify-start font-semibold ${t.label}`}>
                <FaIdBadge size={14} /> {member.role}
              </li>
              <li className={`flex items-center gap-2 justify-center sm:justify-start ${t.body}`}>
                <FaRegCalendarAlt size={14} />
                {member.is_current ? `Current team · ${member.year}` : `Alumni · ${member.year}`}
              </li>
              {contacts.map(({ Icon, label, href }) => (
                <li key={label} className="flex items-center gap-2 justify-center sm:justify-start">
                  <Icon size={14} className={t.label} />
                  <a
                    href={href}
                    target={href.startsWith("mailto:") ? undefined : "_blank"}
                    rel="noreferrer"
                    className={`hover:underline break-all ${t.body}`}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
            {shortBio && (
              <p className={`mt-5 text-base leading-relaxed max-w-xl ${t.body}`}>{shortBio}</p>
            )}
          </div>
        </div>

        <hr className="my-10 border-black/10" />

        {/* Big About */}
        <section>
          <h3 className={`font-display text-xl font-bold mb-4 pb-2 border-b border-black/10 ${t.title}`}>About</h3>
          {blocks.length === 0 ? (
            <p className="text-black/50 italic">No bio available yet for this member.</p>
          ) : (
            <div className="space-y-4">
              {blocks.map((b, i) => {
                if (b.type === "h") {
                  return (
                    <h3
                      key={i}
                      className={`font-display text-xl font-bold pt-6 pb-2 border-b border-black/10 ${t.title}`}
                    >
                      {b.text}
                    </h3>
                  );
                }
                if (b.type === "list") {
                  return (
                    <ul key={i} className="space-y-2">
                      {b.items.map((item, j) => (
                        <li key={j} className={`bg-black/[0.04] rounded px-4 py-2.5 text-sm ${t.body}`}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  );
                }
                return (
                  <p key={i} className={`${t.body} leading-relaxed`}>
                    {b.text}
                  </p>
                );
              })}
            </div>
          )}
        </section>

        {/* Share */}
        <section className="mt-12 rounded-xl bg-black/[0.04] p-6">
          <h3 className={`font-display text-lg font-bold mb-3 ${t.title}`}>Share this profile</h3>
          <ShareButtons url={link} title={`${member.name} – ${member.role}`} btnClass={t.primaryBtn} />
        </section>

        <div className="mt-10">
          <Link to={`${basePath}/team`} className={`inline-flex items-center gap-2 text-sm font-semibold ${t.back}`}>
            <ArrowLeft size={16} /> Back to team
          </Link>
        </div>
      </div>
    </div>
  );
}
