import { Link } from "react-router-dom";

const links = [
  { to: "/admin/slides", label: "Slides", hint: "Homepage hero rotation" },
  { to: "/admin/projects", label: "Projects", hint: "Club project showcase" },
  { to: "/admin/blog", label: "Blog Posts", hint: "News and articles" },
  { to: "/admin/categories", label: "Categories", hint: "Tags for projects & research" },
  { to: "/admin/core-values", label: "Core Values", hint: "About page pillars" },
  { to: "/admin/events", label: "Events", hint: "Workshops and meetups" },
  { to: "/admin/team", label: "Team Members", hint: "Leadership and alumni" },
  { to: "/admin/research", label: "Research Papers", hint: "Published papers" },
];

export default function AdminDashboard() {
  return (
    <div>
      <h2 className="font-display text-xl sm:text-2xl font-semibold text-charcoal">
        Dashboard
      </h2>
      <p className="text-sm text-text-body/70 mt-1">
        Choose a resource to manage.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mt-6">
        {links.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            className="block border border-border-soft rounded-lg p-4 sm:p-5 bg-cream hover:border-accent hover:shadow-sm transition-all"
          >
            <p className="font-display font-semibold text-charcoal">{l.label}</p>
            <p className="text-xs text-text-body/60 mt-1">{l.hint}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
