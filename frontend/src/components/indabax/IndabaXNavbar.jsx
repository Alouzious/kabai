import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ArrowLeft } from "lucide-react";

export default function IndabaXNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-indabax-black text-white sticky top-0 z-50 border-b border-indabax-green/20">
      <div className="bg-indabax-black-light border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-2">
          <Link to="/" className="flex items-center gap-2 text-xs text-white/60 hover:text-indabax-green transition w-fit">
            <ArrowLeft size={14} />
            Back to KAB AI
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
        <Link to="/indabax" className="flex items-center gap-3 shrink-0">
          <img
            src="/indabax.png"
            alt="IndabaX Kabale"
            className="h-12 w-12 md:h-14 md:w-14 object-contain rounded-xl bg-white/5 p-1"
          />
          <span className="font-display font-black text-2xl md:text-3xl tracking-tight">
            IndabaX
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-wide">
          <Link to="/indabax" className="hover:text-indabax-green transition">Home</Link>
          <Link to="/indabax/about" className="hover:text-indabax-green transition">About</Link>
          <Link to="/indabax/projects" className="hover:text-indabax-green transition">Projects</Link>
          <Link to="/indabax/team" className="hover:text-indabax-green transition">Team</Link>
          <Link to="/indabax/gallery" className="hover:text-indabax-green transition">Gallery</Link>
          <Link to="/indabax/learning" className="hover:text-indabax-green transition">Learning</Link>
          <Link to="/indabax/join" className="bg-indabax-green text-indabax-black px-5 py-2.5 rounded-full font-bold hover:bg-white transition">
            Join Us
          </Link>
        </nav>

        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-indabax-black-light px-6 py-4 flex flex-col gap-4 text-sm font-bold uppercase tracking-wide">
          <Link to="/" onClick={() => setOpen(false)} className="flex items-center gap-2 text-white/60 normal-case font-normal">
            <ArrowLeft size={14} /> Back to KAB AI
          </Link>
          <Link to="/indabax" onClick={() => setOpen(false)} className="flex items-center gap-3 normal-case">
            <img
              src="/indabax.png"
              alt="IndabaX Kabale"
              className="h-10 w-10 object-contain rounded-lg bg-white/5 p-1"
            />
            <span className="font-display font-black text-xl">
              IndabaX
            </span>
          </Link>
          <Link to="/indabax/about" onClick={() => setOpen(false)}>About</Link>
          <Link to="/indabax/projects" onClick={() => setOpen(false)}>Projects</Link>
          <Link to="/indabax/team" onClick={() => setOpen(false)}>Team</Link>
          <Link to="/indabax/gallery" onClick={() => setOpen(false)}>Gallery</Link>
          <Link to="/indabax/learning" onClick={() => setOpen(false)}>Learning</Link>
          <Link to="/indabax/join" onClick={() => setOpen(false)} className="text-indabax-green">Join Us</Link>
        </div>
      )}
    </header>
  );
}