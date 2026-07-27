import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [workOpen, setWorkOpen] = useState(false);
  const [communitiesOpen, setCommunitiesOpen] = useState(false);

  return (
    <header className="bg-charcoal text-white sticky top-0 z-50 border-b border-white/10 shadow-lg shadow-black/20">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        <Link to="/" className="font-display font-bold text-xl tracking-tight">
          KAB <span className="text-accent">AI</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link to="/" className="hover:text-accent transition">Home</Link>
          <Link to="/about" className="hover:text-accent transition">About</Link>

          <div
            className="relative"
            onMouseEnter={() => setWorkOpen(true)}
            onMouseLeave={() => setWorkOpen(false)}
          >
            <button className="flex items-center gap-1 hover:text-accent transition">
              Our Work <ChevronDown size={14} />
            </button>
            {workOpen && (
              <div className="absolute top-full left-0 bg-white text-charcoal rounded-lg shadow-xl py-2 w-48">
                <Link to="/projects" className="block px-4 py-2 hover:bg-cream text-sm">Projects</Link>
                <Link to="/research" className="block px-4 py-2 hover:bg-cream text-sm">Research Papers</Link>
              </div>
            )}
          </div>

          <Link to="/team" className="hover:text-accent transition">Team</Link>

          <div
            className="relative"
            onMouseEnter={() => setCommunitiesOpen(true)}
            onMouseLeave={() => setCommunitiesOpen(false)}
          >
            <button className="flex items-center gap-1 hover:text-accent transition">
              Communities <ChevronDown size={14} />
            </button>
            {communitiesOpen && (
              <div className="absolute top-full left-0 bg-white text-charcoal rounded-lg shadow-xl py-2 w-56">
                <Link to="/indabax" className="block px-4 py-2 hover:bg-cream text-sm">IndabaX AI Club</Link>
                <Link to="/committees" className="block px-4 py-2 hover:bg-cream text-sm">Committees</Link>
              </div>
            )}
          </div>

          <Link
            to="/contact"
            className="bg-accent text-white px-4 py-2 rounded-lg hover:bg-accent-light transition"
          >
            Join Us
          </Link>
        </nav>

        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-charcoal-light px-6 py-4 flex flex-col gap-3 text-sm">
          <Link to="/" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/about" onClick={() => setOpen(false)}>About</Link>
          <Link to="/projects" onClick={() => setOpen(false)}>Projects</Link>
          <Link to="/research" onClick={() => setOpen(false)}>Research Papers</Link>
          <Link to="/team" onClick={() => setOpen(false)}>Team</Link>
          <Link to="/indabax" onClick={() => setOpen(false)}>IndabaX AI Club</Link>
          <Link to="/committees" onClick={() => setOpen(false)}>Committees</Link>
          <Link to="/contact" onClick={() => setOpen(false)} className="text-accent font-semibold">Join Us</Link>
        </div>
      )}
    </header>
  );
}
