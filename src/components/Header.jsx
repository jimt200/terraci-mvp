import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">T</span>
            </div>
            <span className="font-bold text-gray-900 text-lg">
              Terra<span className="text-orange-500">Ci</span>
            </span>
          </Link>

          {/* Nav desktop */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              to="/"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive("/") ? "bg-orange-50 text-orange-600" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              Accueil
            </Link>
            <Link
              to="/search"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive("/search") ? "bg-orange-50 text-orange-600" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              Rechercher
            </Link>
            <Link
              to="/advanced-search"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive("/advanced-search") ? "bg-orange-50 text-orange-600" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              Recherche avancée
            </Link>
            <Link
              to="/comparator"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive("/comparator") ? "bg-orange-50 text-orange-600" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              Comparateur
            </Link>

            {/* Menu Espaces */}
            <div className="relative">
              <button
                onClick={() => setRoleMenuOpen(!roleMenuOpen)}
                className="px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 flex items-center gap-1"
              >
                Espaces
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {roleMenuOpen && (
                <div className="absolute top-full right-0 mt-1 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                  <div className="px-3 py-1.5">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Dashboards</p>
                  </div>
                  {[
                    { to: "/dashboard-buyer", icon: "🏠", label: "Espace Acheteur" },
                    { to: "/dashboard-operator", icon: "🏗️", label: "Espace Opérateur" },
                    { to: "/dashboard-admin", icon: "⚙️", label: "Espace Administrateur" },
                    { to: "/dashboard-ministry", icon: "🏛️", label: "Espace Ministère" },
                  ].map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setRoleMenuOpen(false)}
                      className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                    >
                      <span>{item.icon}</span>
                      {item.label}
                    </Link>
                  ))}
                  <div className="border-t border-gray-100 my-1"></div>
                  <div className="px-3 py-1.5">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Outils Admin</p>
                  </div>
                  {[
                    { to: "/validation-queue", icon: "📋", label: "File de validation" },
                    { to: "/manage-operators", icon: "🏢", label: "Gérer les opérateurs" },
                    { to: "/ministry-reporting", icon: "📊", label: "Rapports Ministère" },
                  ].map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setRoleMenuOpen(false)}
                      className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                    >
                      <span>{item.icon}</span>
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* CTA desktop */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/dashboard-buyer" className="text-sm text-gray-600 hover:text-gray-900 font-medium px-3 py-2">
              Connexion
            </Link>
            <Link to="/create-project" className="btn-primary text-sm px-4 py-2">
              Déposer un projet
            </Link>
          </div>

          {/* Burger mobile */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
          >
            {menuOpen ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Menu mobile */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-100 py-3 space-y-1">
            {[
              { to: "/", label: "🏠 Accueil" },
              { to: "/search", label: "🔍 Rechercher" },
              { to: "/advanced-search", label: "🎯 Recherche avancée" },
              { to: "/comparator", label: "⚖️ Comparateur" },
              { to: "/dashboard-buyer", label: "👤 Espace Acheteur" },
              { to: "/dashboard-operator", label: "🏗️ Espace Opérateur" },
              { to: "/dashboard-admin", label: "⚙️ Espace Admin" },
              { to: "/dashboard-ministry", label: "🏛️ Espace Ministère" },
              { to: "/validation-queue", label: "📋 File de validation" },
              { to: "/manage-operators", label: "🏢 Gérer opérateurs" },
              { to: "/ministry-reporting", label: "📊 Rapports" },
              { to: "/create-project", label: "➕ Déposer un projet" },
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(item.to) ? "bg-orange-50 text-orange-600" : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}