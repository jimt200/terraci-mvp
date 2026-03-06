import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { projects } from "../data/projects";

export default function DashboardBuyer() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1 rounded-full mb-2">
              🏠 Espace Acheteur
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Bonjour, Acheteur 👋</h1>
            <p className="text-gray-500 mt-1">Trouvez et sécurisez votre terrain idéal</p>
          </div>
          <Link to="/search" className="btn-primary px-5 py-2 text-sm">
            🔍 Chercher un terrain
          </Link>
        </div>

        {/* Actions rapides */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { to: "/search", icon: "🔍", title: "Rechercher", desc: "Parcourez les projets disponibles", color: "border-blue-200 hover:border-blue-400" },
            { to: "/advanced-search", icon: "🎯", title: "Recherche avancée", desc: "Filtres détaillés par budget, région", color: "border-orange-200 hover:border-orange-400" },
            { to: "/comparator", icon: "⚖️", title: "Comparer", desc: "Comparez 3 projets côte à côte", color: "border-green-200 hover:border-green-400" },
            { to: "/my-purchases/1", icon: "📦", title: "Mes achats", desc: "Suivez l'avancement de votre dossier", color: "border-purple-200 hover:border-purple-400" },
          ].map((a) => (
            <Link
              key={a.to}
              to={a.to}
              className={`bg-white rounded-xl border-2 p-5 transition-all hover:shadow-md group ${a.color}`}
            >
              <div className="text-2xl mb-2">{a.icon}</div>
              <h3 className="font-semibold text-gray-900 text-sm mb-1 group-hover:text-orange-600 transition-colors">{a.title}</h3>
              <p className="text-xs text-gray-500">{a.desc}</p>
            </Link>
          ))}
        </div>

        {/* Mon achat en cours */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900">Mon achat en cours</h2>
            <Link to="/my-purchases/1" className="text-sm text-orange-500 hover:text-orange-600 font-medium">
              Voir le détail →
            </Link>
          </div>
          <div className="flex items-center gap-4 p-4 bg-orange-50 rounded-xl">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-xl">🏠</div>
            <div className="flex-1">
              <p className="font-semibold text-gray-900">Résidence Les Cocotiers — Lot B-12</p>
              <p className="text-sm text-gray-500">Abidjan · 15 000 000 FCFA</p>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                  <div className="bg-orange-500 h-1.5 rounded-full" style={{ width: "60%" }}></div>
                </div>
                <span className="text-xs text-gray-500">60% complété</span>
              </div>
            </div>
            <Link to="/my-purchases/1" className="btn-primary text-xs px-4 py-2 shrink-0">
              Suivre →
            </Link>
          </div>
        </div>

        {/* Projets suggérés */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">Projets suggérés</h2>
            <Link to="/search" className="text-sm text-orange-500 hover:text-orange-600 font-medium">
              Voir tout →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
            {projects.slice(0, 3).map((p) => (
              <Link
                key={p.id}
                to={`/project/${p.id}`}
                className="p-5 hover:bg-gray-50 transition-colors block"
              >
                <p className="font-medium text-gray-900 mb-1">{p.title || p.nom || `Projet #${p.id}`}</p>
                <p className="text-xs text-gray-500 mb-2">{p.ville || p.location}</p>
                <p className="text-sm font-semibold text-orange-500">
                  {p.prix_min ? `${(p.prix_min / 1000000).toFixed(0)} M FCFA` : "Prix sur demande"}
                </p>
                <span className="text-xs text-orange-500 mt-2 inline-block">Voir le projet →</span>
              </Link>
            ))}
          </div>
        </div>

      </main>
      <Footer />
    </div>
  );
}