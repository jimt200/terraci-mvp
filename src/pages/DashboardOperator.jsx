import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { projects } from "../data/projects";

export default function DashboardOperator() {
  const mesProjets = projects.slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 text-xs font-medium px-3 py-1 rounded-full mb-2">
              🏗️ Espace Opérateur
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard Opérateur</h1>
            <p className="text-gray-500 mt-1">Gérez vos projets et vos lots fonciers</p>
          </div>
          <Link to="/create-project" className="btn-primary px-5 py-2 text-sm">
            + Nouveau projet
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Projets actifs", value: 3, icon: "🏗️", color: "text-orange-600", bg: "bg-orange-50" },
            { label: "Lots disponibles", value: 87, icon: "🏠", color: "text-blue-600", bg: "bg-blue-50" },
            { label: "Lots vendus", value: 58, icon: "✅", color: "text-green-600", bg: "bg-green-50" },
            { label: "En validation", value: 1, icon: "⏳", color: "text-yellow-600", bg: "bg-yellow-50" },
          ].map((s) => (
            <div key={s.label} className={`${s.bg} rounded-xl border border-gray-100 p-5 shadow-sm`}>
              <div className="text-2xl mb-2">{s.icon}</div>
              <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
              <div className="text-xs text-gray-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Actions rapides */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
          {[
            { to: "/create-project", icon: "📁", title: "Déposer un projet", desc: "Soumettez un nouveau projet en 5 étapes", btn: "Commencer", primary: true },
            { to: "/manage-lots/1", icon: "🗂️", title: "Gérer mes lots", desc: "Visualisez et gérez le plan interactif de vos lots", btn: "Accéder", primary: false },
            { to: "/search", icon: "📊", title: "Voir les projets", desc: "Consultez tous les projets disponibles sur la plateforme", btn: "Explorer", primary: false },
          ].map((a) => (
            <div key={a.to} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <div className="text-3xl mb-3">{a.icon}</div>
              <h3 className="font-bold text-gray-900 mb-1">{a.title}</h3>
              <p className="text-sm text-gray-500 mb-4">{a.desc}</p>
              <Link to={a.to} className={`${a.primary ? "btn-primary" : "btn-outline"} text-sm px-4 py-2 inline-block`}>
                {a.btn} →
              </Link>
            </div>
          ))}
        </div>

        {/* Mes projets */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">Mes projets</h2>
            <Link to="/create-project" className="text-sm text-orange-500 hover:text-orange-600 font-medium">
              + Nouveau
            </Link>
          </div>
          <div className="divide-y divide-gray-100">
            {mesProjets.map((p) => (
              <div key={p.id} className="px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div>
                  <p className="font-medium text-gray-900">{p.title || p.nom || `Projet #${p.id}`}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{p.ville || p.location} · {p.lots || 0} lots</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Actif</span>
                  <Link to={`/manage-lots/${p.id}`} className="text-xs bg-orange-500 text-white px-3 py-1.5 rounded-lg hover:bg-orange-600 transition-colors">
                    Gérer lots →
                  </Link>
                  <Link to={`/project/${p.id}`} className="text-xs border border-gray-200 text-gray-600 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                    Voir →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>
      <Footer />
    </div>
  );
}