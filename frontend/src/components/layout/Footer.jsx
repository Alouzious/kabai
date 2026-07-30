import { Link } from "react-router-dom";
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white pt-12 sm:pt-16 pb-6 sm:pb-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 text-center sm:text-left items-start justify-items-center sm:justify-items-start">
        <div className="max-w-xs sm:max-w-none">
          <h3 className="font-display font-bold text-lg sm:text-xl mb-2">
            KAB <span className="text-accent">AI</span>
          </h3>
          <p className="text-sm text-white/60">
            Advancing AI education and community-driven innovation at Kabale University.
          </p>
          <div className="flex gap-3 mt-4 justify-center sm:justify-start">
            <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-accent transition"><FaTwitter size={16} /></a>
            <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-accent transition"><FaLinkedin size={16} /></a>
            <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-accent transition"><FaGithub size={16} /></a>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-3 border-b border-accent inline-block pb-1 text-sm sm:text-base">Quick Links</h4>
          <ul className="space-y-2 text-sm text-white/70 mt-2">
            <li><Link to="/" className="hover:text-accent">Home</Link></li>
            <li><Link to="/about" className="hover:text-accent">About</Link></li>
            <li><Link to="/team" className="hover:text-accent">Team</Link></li>
            <li><Link to="/contact" className="hover:text-accent">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3 border-b border-accent inline-block pb-1 text-sm sm:text-base">Resources</h4>
          <ul className="space-y-2 text-sm text-white/70 mt-2">
            <li><Link to="/projects" className="hover:text-accent">Projects</Link></li>
            <li><Link to="/research" className="hover:text-accent">Research Papers</Link></li>
            <li><Link to="/indabax" className="hover:text-accent">IndabaX AI Club</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3 border-b border-accent inline-block pb-1 text-sm sm:text-base">Contact Info</h4>
          <p className="text-sm text-white/70 mt-2">Kabale University, Kabale, Uganda</p>
          <p className="text-sm text-white/70 mt-1">kabai@kab.ac.ug</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-white/10 mt-8 sm:mt-10 pt-5 sm:pt-6 text-xs sm:text-sm text-white/50 text-center px-2">
        © {new Date().getFullYear()} KAB AI Kabale University. All rights reserved.
      </div>
    </footer>
  );
}