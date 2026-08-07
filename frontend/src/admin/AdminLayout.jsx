import { useState } from "react";
import { Navigate, Outlet, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const navItems = [
  { to: "/admin/dashboard", label: "Dashboard" },
  { to: "/admin/slides", label: "Slides" },
  { to: "/admin/projects", label: "Projects" },
  { to: "/admin/blog", label: "Blog" },
  { to: "/admin/categories", label: "Categories" },
  { to: "/admin/core-values", label: "Core Values" },
  { to: "/admin/events", label: "Events" },
  { to: "/admin/gallery", label: "Gallery" },
  { to: "/admin/team", label: "Team" },
  { to: "/admin/research", label: "Research" },
];

export default function AdminLayout() {
  const { isAuthenticated, checking, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-charcoal">
        <div className="text-cream font-display text-lg">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  function handleLogout() {
    logout();
    navigate("/admin/login");
  }

  function handleNavClick() {
    setMenuOpen(false);
  }

  return (
    <div className="min-h-screen bg-cream font-body text-text-body lg:flex">
      {/* Mobile top bar */}
      <div className="lg:hidden flex items-center justify-between bg-charcoal text-cream px-4 py-3">
        <div>
          <p className="font-display text-base font-semibold text-cream">Kabai Admin</p>
        </div>
        <button
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          className="p-2 -mr-2"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {menuOpen ? (
              <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
            ) : (
              <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {/* Sidebar: drawer on mobile, static on lg+ */}
      <aside
        className={`
          bg-charcoal text-cream flex flex-col shrink-0
          lg:w-60 lg:static lg:flex
          fixed inset-x-0 top-[49px] z-40 lg:top-auto
          transition-all duration-200
          ${menuOpen ? "flex" : "hidden"}
        `}
      >
        <div className="hidden lg:block px-6 py-6 border-b border-white/10">
          <p className="font-display text-lg font-semibold tracking-tight text-cream">
            Kabai Admin
          </p>
          <p className="text-xs text-cream/50 mt-1">Kabale AI Club</p>
        </div>

        <nav className="flex-1 py-2 lg:py-4">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={handleNavClick}
              className={({ isActive }) =>
                `flex items-center px-6 py-2.5 text-sm border-l-2 transition-colors ${
                  isActive
                    ? "border-accent bg-white/5 text-accent font-medium"
                    : "border-transparent text-cream/70 hover:text-cream hover:bg-white/5"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="px-6 py-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="text-sm text-cream/60 hover:text-accent transition-colors"
          >
            Log out
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto min-w-0">
        <div className="max-w-5xl mx-auto px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
