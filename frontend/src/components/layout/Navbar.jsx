import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown, Mail, Phone } from "lucide-react";
import api from "../../lib/api";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [workOpen, setWorkOpen] = useState(false);
  const [communitiesOpen, setCommunitiesOpen] = useState(false);

  const [projectCats, setProjectCats] = useState([]);
  const [pubCats, setPubCats] = useState([]);

  useEffect(() => {
    api.get("/categories/", { params: { type: "project" } }).then((r) => setProjectCats(r.data)).catch(() => {});
    api.get("/categories/", { params: { type: "publication" } }).then((r) => setPubCats(r.data)).catch(() => {});
  }, []);

  return (
    <header className="sticky top-0 z-50 shadow-lg shadow-black/10">
      <div className="hidden md:flex bg-accent text-charcoal text-xs font-medium px-6 py-1.5 items-center justify-between">
        <div className="flex items-center gap-5">
          <span className="flex items-center gap-1.5"><Mail size={12} /> kabai@kab.ac.ug</span>
          <span className="flex items-center gap-1.5"><Phone size={12} /> Kabale University</span>
        </div>
        <span className="tracking-wide uppercase text-[11px]">IndabaX AI Club · Kabale University</span>
      </div>

      <div className="bg-charcoal text-white border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-24">
          <Link to="/" className="flex items-center gap-3">
            <div className="font-display font-extrabold text-3xl tracking-tight leading-none">
              KAB <span className="text-accent">AI</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8 lg:gap-10 text-[15px] font-medium">
            <Link to="/" className="hover:text-accent transition">Home</Link>
            <Link to="/about" className="hover:text-accent transition">About</Link>

            <div className="relative" onMouseEnter={() => setWorkOpen(true)} onMouseLeave={() => setWorkOpen(false)}>
              <button className="flex items-center gap-1 hover:text-accent transition">
                Our Work <ChevronDown size={14} />
              </button>
              {workOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 bg-white text-charcoal rounded-lg shadow-xl py-6 px-8 w-[520px] grid grid-cols-2 gap-8">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-charcoal/50 mb-3">Projects</p>
                    <Link to="/projects" className="block py-1.5 text-sm font-semibold text-accent hover:text-accent-light">
                      All Projects
                    </Link>
                    {projectCats.map((c) => (
                      <Link key={c.id} to={`/projects?category=${c.slug}`} className="block py-1.5 text-sm hover:text-accent transition">
                        {c.name}
                      </Link>
                    ))}
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-charcoal/50 mb-3">Publications</p>
                    <Link to="/research" className="block py-1.5 text-sm font-semibold text-accent hover:text-accent-light">
                      All Publications
                    </Link>
                    {pubCats.map((c) => (
                      <Link key={c.id} to={`/research?category=${c.slug}`} className="block py-1.5 text-sm hover:text-accent transition">
                        {c.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link to="/blog" className="hover:text-accent transition">Blog</Link>

            <div className="relative" onMouseEnter={() => setCommunitiesOpen(true)} onMouseLeave={() => setCommunitiesOpen(false)}>
              <button className="flex items-center gap-1 hover:text-accent transition">
                Communities <ChevronDown size={14} />
              </button>
              {communitiesOpen && (
                <div className="absolute top-full left-0 bg-white text-charcoal rounded-lg shadow-xl py-2 w-56">
                  <Link to="/indabax" className="block px-4 py-2 hover:bg-cream-dark text-sm">IndabaX AI Club</Link>
                </div>
              )}
            </div>

            <Link to="/contact" className="bg-accent text-charcoal font-semibold px-5 py-2.5 rounded-lg hover:bg-accent-light transition">
              Join Us
            </Link>
          </nav>

          <button className="md:hidden" onClick={() => setOpen(!open)}>
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-charcoal-light px-6 py-4 flex flex-col gap-3 text-sm text-white">
          <Link to="/" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/about" onClick={() => setOpen(false)}>About</Link>
          <Link to="/projects" onClick={() => setOpen(false)}>Projects</Link>
          <Link to="/research" onClick={() => setOpen(false)}>Publications</Link>
          <Link to="/blog" onClick={() => setOpen(false)}>Blog</Link>
          <Link to="/team" onClick={() => setOpen(false)}>Team</Link>
          <Link to="/indabax" onClick={() => setOpen(false)}>IndabaX AI Club</Link>
          <Link to="/contact" onClick={() => setOpen(false)} className="text-accent font-semibold">Join Us</Link>
        </div>
      )}
    </header>
  );
}