import { Link } from "react-router-dom";
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

export default function IndabaXFooter() {
  return (
    <footer className="bg-indabax-black text-white pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 text-center sm:text-left items-start justify-items-center sm:justify-items-start">
        <div className="max-w-xs sm:max-w-none">
          <div className="flex items-center gap-3 mb-4 justify-center sm:justify-start">
            <img
              src="/indabax.png"
              alt="IndabaX Kabale"
              className="h-16 w-16 object-contain rounded-2xl bg-white/5 p-1.5"
            />
            <h3 className="font-display font-black text-2xl">
              IndabaX
            </h3>
          </div>
          <p className="text-sm text-white/50">
            The AI community track of KAB AI at Kabale University.
          </p>
          <div className="flex gap-3 mt-4 justify-center sm:justify-start">
            <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-indabax-green hover:text-indabax-black transition"><FaTwitter size={16} /></a>
            <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-indabax-green hover:text-indabax-black transition"><FaLinkedin size={16} /></a>
            <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-indabax-green hover:text-indabax-black transition"><FaGithub size={16} /></a>
          </div>
        </div>

        <div>
          <h4 className="font-bold uppercase tracking-wide text-sm mb-3 border-b border-indabax-green inline-block pb-1">Explore</h4>
          <ul className="space-y-2 text-sm text-white/60 mt-2">
            <li><Link to="/indabax" className="hover:text-indabax-green">Home</Link></li>
            <li><Link to="/indabax/about" className="hover:text-indabax-green">About</Link></li>
            <li><Link to="/indabax/team" className="hover:text-indabax-green">Team</Link></li>
            <li><Link to="/indabax/gallery" className="hover:text-indabax-green">Gallery</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold uppercase tracking-wide text-sm mb-3 border-b border-indabax-green inline-block pb-1">Resources</h4>
          <ul className="space-y-2 text-sm text-white/60 mt-2">
            <li><Link to="/indabax/projects" className="hover:text-indabax-green">Projects</Link></li>
            <li><Link to="/indabax/learning" className="hover:text-indabax-green">Learning Hub</Link></li>
            <li><Link to="/" className="hover:text-indabax-green">Back to KAB AI</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold uppercase tracking-wide text-sm mb-3 border-b border-indabax-green inline-block pb-1">Contact Info</h4>
          <p className="text-sm text-white/60 mt-2">Kabale University, Kabale, Uganda</p>
          <p className="text-sm text-white/60 mt-1">indabaxkabale@gmail.com</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-white/10 mt-10 pt-6 text-sm text-white/40 text-center">
        &copy; {new Date().getFullYear()} IndabaX Kabale A KAB AI Community. All rights reserved.
      </div>
    </footer>
  );
}