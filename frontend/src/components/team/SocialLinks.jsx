import { FaLinkedin, FaTwitter, FaGithub, FaInstagram, FaEnvelope } from "react-icons/fa";

const clean = (v) => (v || "").trim();

export default function SocialLinks({ member, btnClass, size = 18 }) {
  const items = [
    ["LinkedIn", clean(member.linkedin_url), FaLinkedin, "url"],
    ["X / Twitter", clean(member.twitter_url), FaTwitter, "url"],
    ["GitHub", clean(member.github_url), FaGithub, "url"],
    ["Instagram", clean(member.instagram_url), FaInstagram, "url"],
    ["Email", clean(member.email), FaEnvelope, "mail"],
  ].filter((i) => i[1]);

  if (items.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-3">
      {items.map(([label, val, Icon, kind]) => (
        <a
          key={label}
          href={kind === "mail" ? `mailto:${val}` : /^https?:\/\//i.test(val) ? val : `https://${val}`}
          target={kind === "mail" ? undefined : "_blank"}
          rel="noreferrer"
          aria-label={label}
          title={label}
          className={btnClass}
        >
          <Icon size={size} />
        </a>
      ))}
    </div>
  );
}
