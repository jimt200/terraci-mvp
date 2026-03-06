import { Link, useLocation } from "react-router-dom";

const navItems = [
  { to: "/", icon: "🏠", label: "Accueil" },
  { to: "/search", icon: "🔍", label: "Recherche" },
  { to: "/comparator", icon: "⚖️", label: "Comparer" },
  { to: "/dashboard-buyer", icon: "👤", label: "Mon espace" },
];

export default function BottomNav() {
  const location = useLocation();
  const isActive = (path) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 md:hidden safe-area-pb">
      <div className="grid grid-cols-4 h-16">
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={`flex flex-col items-center justify-center gap-0.5 transition-colors ${
              isActive(item.to)
                ? "text-orange-500"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <span className="text-xl leading-none">{item.icon}</span>
            <span className="text-xs font-medium">{item.label}</span>
            {isActive(item.to) && (
              <span className="absolute bottom-1 w-1 h-1 bg-orange-500 rounded-full"></span>
            )}
          </Link>
        ))}
      </div>
    </nav>
  );
}