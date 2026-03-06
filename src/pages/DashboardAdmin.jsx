import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const stats = [
  { label: "Dossiers en attente", value: 6, icon: "⏳", color: "text-yellow-600", bg: "bg-yellow-50", to: "/validation-queue" },
  { label: "Projets approuvés", value: 31, icon: "✅", color: "text-green-600", bg: "bg-green-50", to: "/validation-queue" },
  { label: "Opérateurs actifs", value: 34, icon: "🏢", color: "text-blue-600", bg: "bg-blue-50", to: "/manage-operators" },
  { label: "Alertes actives", value: 5, icon: "🚨", color: "text-red-600", bg: "bg-red-50", to: "/validation-queue" },
];

const actions = [
  {
    to: "/validation-queue",
    icon: "📋",
    title: "File de validation",
    desc: "6 dossiers en attente d'examen",
    badge: "6 en attente",
    badgeColor: "bg-yellow-100 text-yellow-700",
    btnColor: "btn-primary",
  },
  {
    to: "/manage-operators",
    icon: "🏢",
    title: "Gérer les opérateurs",
    desc: "Certifier, suspendre, suivre la conformité",
    badge: "1 suspendu",
    badgeColor: "bg-red-100 text-red-700",
    btnColor: "btn-outline",
  },
  {
    to: "/detailed-exam/1",
    icon: "🔍",
    title: "Examen de dossier",
    desc: "Examinez les projets en détail avec les 3 panneaux",
    badge: "Accès direct",
    badgeColor: "bg-blue-100 text-blue-700",
    btnColor: "btn-outline",
  },
];

const dossiersRecents = [
  { id: 1, projet: "Résidence Les Cocotiers", operateur: "KOUADIO IMMOBILIER", ville: "Abidjan", priorite: "haute", statut: "en_attente", date: "2024-01-15" },
  { id: 3, projet: "Villa Park Grand-Bassam", operateur: "IMMO CÔTE SUD", ville: "Grand-Bassam", priorite: "urgente", statut: "en_examen", date: "2024-01-10" },
  { id: 4, projet: "Cité Moderne Yamoussoukro", operateur: "CAPITAL FONCIER CI", ville: "Yamoussoukro", priorite: "normale", statut: "en_attente", date: "2024-01-20" },
  { id: 5, projet: "Domaine Belvédère", operateur: "PREMIUM ESTATES CI", ville: "San-Pédro", priorite: "haute", statut: "en_attente", date: "2024-01-08" },
];

export default function DashboardAdmin() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 text-xs font-medium px-3 py-1 rounded-full mb-2">
              ⚙️ Espace Administrateur
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard Administrateur</h1>
            <p className="text-gray-500 mt-1">Validation des dossiers et gestion de la conformité</p>
          </div>
          <Link to="/validation-queue" className="btn-primary px-5 py-2 text-sm">
            📋 Voir la file de validation
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {stats.map((s) => (
            <Link
              key={s.label}
              to={s.to}
              className={`${s.bg} rounded-xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-all`}
            >
              <div className="text-2xl mb-2">{s.icon}</div>
              <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
              <div className="text-xs text-gray-500 mt-1">{s.label}</div>
            </Link>
          ))}
        </div>

        {/* Actions principales */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
          {actions.map((a) => (
            <div key={a.to} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <div className="text-3xl mb-3">{a.icon}</div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-bold text-gray-900">{a.title}</h3>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium shrink-0 ${a.badgeColor}`}>
                  {a.badge}
                </span>
              </div>
              <p className="text-sm text-gray-500 mb-4">{a.desc}</p>
              <Link to={a.to} className={`${a.btnColor} text-sm px-4 py-2 inline-block`}>
                Accéder →
              </Link>
            </div>
          ))}
        </div>

        {/* Dossiers récents */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">Dossiers récents à traiter</h2>
            <Link to="/validation-queue" className="text-sm text-orange-500 hover:text-orange-600 font-medium">
              Voir tout →
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500">Projet</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500">Opérateur</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500">Ville</th>
                  <th className="px-5 py-3 text-center text-xs font-semibold text-gray-500">Priorité</th>
                  <th className="px-5 py-3 text-center text-xs font-semibold text-gray-500">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {dossiersRecents.map((d) => (
                  <tr key={d.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3 font-medium text-gray-900">{d.projet}</td>
                    <td className="px-5 py-3 text-gray-600">{d.operateur}</td>
                    <td className="px-5 py-3 text-gray-600">{d.ville}</td>
                    <td className="px-5 py-3 text-center">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        d.priorite === "urgente" ? "bg-red-100 text-red-700" :
                        d.priorite === "haute" ? "bg-orange-100 text-orange-700" :
                        "bg-blue-100 text-blue-700"
                      }`}>
                        {d.priorite}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-center">
                      <Link
                        to={`/detailed-exam/${d.id}`}
                        className="bg-orange-500 hover:bg-orange-600 text-white text-xs px-3 py-1.5 rounded-lg font-medium transition-colors"
                      >
                        Examiner →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}