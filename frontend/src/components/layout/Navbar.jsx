import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown, ChevronRight, Mail } from "lucide-react";
import api from "../../lib/api";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [workOpen, setWorkOpen] = useState(false);
  const [communitiesOpen, setCommunitiesOpen] = useState(false);
  const [projectSubOpen, setProjectSubOpen] = useState(false);
  const [pubSubOpen, setPubSubOpen] = useState(false);

  const [projectCats, setProjectCats] = useState([]);
  const [pubCats, setPubCats] = useState([]);

  useEffect(() => {
    api.get("/categories/", { params: { type: "project" } }).then((r) => setProjectCats(r.data)).catch(() => {});
    api.get("/categories/", { params: { type: "publication" } }).then((r) => setPubCats(r.data)).catch(() => {});
  }, []);

  return (
    <header className="sticky top-0 z-50">
      <div className="hidden md:flex bg-accent text-charcoal px-12 md:px-16 lg:px-20 py-1 items-center justify-between" style={{ minHeight: '30px' }}>
        <div className="flex items-center gap-8 ml-4 md:ml-6">
          <span className="flex items-center gap-1.5 text-[14px] leading-none text-black" style={{ fontFamily: '"Times New Roman", Times, serif' }}><Mail size={13} /> kabai@gmail.com</span>
        </div>
        <span className="text-[14px] leading-none tracking-wide uppercase text-[#0072BB] mr-6 md:mr-8 lg:mr-10" style={{ fontFamily: '"Times New Roman", Times, serif' }}>Kabale University</span>
      </div>

      <div className="bg-charcoal text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 sm:h-20 md:h-24">
          <Link to="/" className="flex items-center gap-3">
            <div className="font-brand font-bold text-xl sm:text-2xl md:text-3xl tracking-wider leading-none">
              KAB <span className="text-accent">AI</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6 lg:gap-10 text-[14px] lg:text-[15px] font-medium font-display">
            <Link to="/" className="hover:text-accent transition">Home</Link>
            <Link to="/about" className="hover:text-accent transition">About</Link>

            <div className="relative" onMouseEnter={() => setWorkOpen(true)} onMouseLeave={() => { setWorkOpen(false); setProjectSubOpen(false); setPubSubOpen(false); }}>
              <button className="flex items-center gap-1 hover:text-accent transition">
                Our Work <ChevronDown size={14} />
              </button>
              {workOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 bg-white/70 backdrop-blur-md text-charcoal rounded-lg shadow-xl py-2 w-56 z-20 border border-white/40">
                  {/* Projects with nested */}
                  <div className="relative" onMouseEnter={() => setProjectSubOpen(true)} onMouseLeave={() => setProjectSubOpen(false)}>
                    <Link to="/projects" className="flex items-center justify-between px-4 py-2 hover:bg-white/80 text-sm font-medium">
                      Projects <ChevronRight size={14} className="text-charcoal/50" />
                    </Link>
                    {projectSubOpen && (
                      <div className="absolute left-full top-0 ml-1 bg-white/70 backdrop-blur-md text-charcoal rounded-lg shadow-xl py-2 w-56 z-30 border border-white/40">
                        <Link to="/projects" className="block px-4 py-2 hover:bg-white/80 text-sm font-semibold text-accent">Research Projects</Link>
                        {projectCats.map((c) => (
                          <Link key={c.id} to={`/projects?category=${c.slug}`} className="block px-4 py-2 hover:bg-white/80 text-sm">
                            {c.name}
                          </Link>
                        ))}
                        {projectCats.length === 0 && <span className="block px-4 py-2 text-sm text-charcoal/50">No categories</span>}
                      </div>
                    )}
                  </div>
                  {/* Publications with nested */}
                  <div className="relative" onMouseEnter={() => setPubSubOpen(true)} onMouseLeave={() => setPubSubOpen(false)}>
                    <Link to="/research" className="flex items-center justify-between px-4 py-2 hover:bg-white/80 text-sm font-medium">
                      Publications <ChevronRight size={14} className="text-charcoal/50" />
                    </Link>
                    {pubSubOpen && (
                      <div className="absolute left-full top-0 ml-1 bg-white/70 backdrop-blur-md text-charcoal rounded-lg shadow-xl py-2 w-56 z-30 border border-white/40">
                        <Link to="/research" className="block px-4 py-2 hover:bg-white/80 text-sm font-semibold text-accent">All Publications</Link>
                        {pubCats.map((c) => (
                          <Link key={c.id} to={`/research?category=${c.slug}`} className="block px-4 py-2 hover:bg-white/80 text-sm">
                            {c.name}
                          </Link>
                        ))}
                        {pubCats.length === 0 && <span className="block px-4 py-2 text-sm text-charcoal/50">No categories</span>}
                      </div>
                    )}
                  </div>
                  {/* Datasets independent */}
                  <Link to="/datasets" className="block px-4 py-2 hover:bg-white/80 text-sm font-medium">Datasets</Link>
                </div>
              )}
            </div>

            <Link to="/blog" className="hover:text-accent transition">Blog</Link>

            <div className="relative" onMouseEnter={() => setCommunitiesOpen(true)} onMouseLeave={() => setCommunitiesOpen(false)}>
              <button className="flex items-center gap-1 hover:text-accent transition">
                Communities <ChevronDown size={14} />
              </button>
              {communitiesOpen && (
                <div className="absolute top-full left-0 bg-white/70 backdrop-blur-md text-charcoal rounded-lg shadow-xl py-2 w-56 z-20 border border-white/40">
                  <Link to="/indabax" target="_blank" rel="noreferrer" className="block px-4 py-2 hover:bg-white/80 text-sm">IndabaX AI Club</Link>
                  <a href="https://gdg.community.dev/gdg-on-campus-kabale-university-kabale-uganda/" target="_blank" rel="noreferrer" className="block px-4 py-2 hover:bg-white/80 text-sm">GDG on Campus</a>
                  <span className="block px-4 py-2 text-sm text-charcoal/50 cursor-not-allowed">Youth Mappers</span>
                </div>
              )}
            </div>

            <Link to="/contact" className="bg-accent text-charcoal font-semibold px-4 lg:px-5 py-2 lg:py-2.5 rounded-lg hover:bg-accent-light transition">
              Join Us
            </Link>
          </nav>

          <button className="md:hidden p-1" onClick={() => setOpen(!open)} aria-label="Toggle menu">
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        <div className="absolute bottom-0 left-0 w-full leading-none overflow-hidden pointer-events-none z-0" style={{ height: '10px', transform: 'translateY(100%)' }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 10" preserveAspectRatio="none" className="w-full h-full">
            <path d="M0,10 Q500,-4 1000,10" fill="none" stroke="#FDC854" strokeWidth="10"/>
          </svg>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-charcoal-light px-4 sm:px-6 py-4 flex flex-col gap-1 text-sm text-white max-h-[calc(100vh-4rem)] overflow-y-auto">
          <Link to="/" onClick={() => setOpen(false)} className="py-2.5 border-b border-white/10">Home</Link>
          <Link to="/about" onClick={() => setOpen(false)} className="py-2.5 border-b border-white/10">About</Link>
          <div className="py-2.5 border-b border-white/10">
            <p className="font-bold text-white/50 text-xs uppercase tracking-wide mb-2">Our Work</p>
            <Link to="/projects" onClick={() => setOpen(false)} className="block py-1.5 pl-2 font-semibold text-accent">Research Projects</Link>
            {projectCats.map((c) => (
              <Link key={c.id} to={`/projects?category=${c.slug}`} onClick={() => setOpen(false)} className="block py-1 pl-6 text-sm text-white/80">
                • {c.name}
              </Link>
            ))}
            <Link to="/research" onClick={() => setOpen(false)} className="block py-1.5 pl-2 font-semibold text-accent mt-2">Publications</Link>
            {pubCats.map((c) => (
              <Link key={c.id} to={`/research?category=${c.slug}`} onClick={() => setOpen(false)} className="block py-1 pl-6 text-sm text-white/80">
                • {c.name}
              </Link>
            ))}
            <Link to="/datasets" onClick={() => setOpen(false)} className="block py-1.5 pl-2 font-semibold text-accent mt-2">Datasets</Link>
          </div>
          <Link to="/blog" onClick={() => setOpen(false)} className="py-2.5 border-b border-white/10">Blog</Link>
          <Link to="/team" onClick={() => setOpen(false)} className="py-2.5 border-b border-white/10">Team</Link>
          <Link to="/indabax" target="_blank" rel="noreferrer" onClick={() => setOpen(false)} className="py-2.5 border-b border-white/10">IndabaX AI Club</Link>
          <a href="https://gdg.community.dev/gdg-on-campus-kabale-university-kabale-uganda/" target="_blank" rel="noreferrer" onClick={() => setOpen(false)} className="py-2.5 border-b border-white/10">GDG on Campus</a>
          <span className="py-2.5 border-b border-white/10 text-white/50">Youth Mappers</span>
          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="mt-3 text-center bg-accent text-charcoal font-semibold py-2.5 rounded-lg"
          >
            Join Us
          </Link>
        </div>
      )}
    </header>
  );
}
