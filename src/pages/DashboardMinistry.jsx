// src/pages/DashboardMinistry.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const statsNationales = {
  totalProjets: 48,
  projetsActifs: 23,
  projetsSoumis: 12,
  operateursCertifies: 34,
  lotsDisponibles: 2840,
  lotsVendus: 1205,
  conformiteMoyenne: 84,
  alertes: 5,
};

const regionsData = [
  { nom: "Lagunes (Abidjan)", projets: 18, operateurs: 14, conformite: 89, alertes: 1, x: 28, y: 68 },
  { nom: "Gbêkê (Bouaké)", projets: 8, operateurs: 6, conformite: 76, alertes: 2, x: 52, y: 38 },
  { nom: "Sud-Comoé (Grand-Bassam)", projets: 5, operateurs: 3, conformite: 91, alertes: 0, x: 36, y: 72 },
  { nom: "Lacs (Yamoussoukro)", projets: 6, operateurs: 5, conformite: 82, alertes: 1, x: 44, y: 52 },
  { nom: "San-Pédro", projets: 4, operateurs: 3, conformite: 85, alertes: 0, x: 22, y: 78 },
  { nom: "Hambol (Katiola)", projets: 3, operateurs: 2, conformite: 70, alertes: 1, x: 55, y: 30 },
  { nom: "Tonkpi (Man)", projets: 4, operateurs: 1, conformite: 65, alertes: 0, x: 15, y: 45 },
];

const alertes = [
  { id: 1, type: "critique", projet: "Cité Moderne Yamoussoukro", message: "Opérateur suspendu — projet bloqué", date: "2024-01-20", region: "Lacs" },
  { id: 2, type: "avertissement", projet: "Lotissement Akwaba", message: "Documents incomplets depuis 30 jours", date: "2024-01-18", region: "Gbêkê" },
  { id: 3, type: "avertissement", projet: "Résidence Harmonie", message: "Dossier incomplet — relance nécessaire", date: "2024-01-22", region: "Lagunes" },
  { id: 4, type: "info", projet: "Domaine Belvédère", message: "En attente de validation depuis 25 jours", date: "2024-01-08", region: "San-Pédro" },
  { id: 5, type: "critique", projet: "Villa des Palmes Katiola", message: "Non-conformité environnementale signalée", date: "2024-01-19", region: "Hambol" },
];

const ALERTE_CONFIG = {
  critique: { color: "bg-red-50 border-red-200", badge: "bg-red-100 text-red-700", icon: "🚨" },
  avertissement: { color: "bg-orange-50 border-orange-200", badge: "bg-orange-100 text-orange-700", icon: "⚠️" },
  info: { color: "bg-blue-50 border-blue-200", badge: "bg-blue-100 text-blue-700", icon: "ℹ️" },
};

export default function DashboardMinistry() {
  const [regionActive, setRegionActive] = useState(null);
  const [periodeStats, setPeriodeStats] = useState("mois");

  const tauxVente = Math.round((statsNationales.lotsVendus / (statsNationales.lotsVendus + statsNationales.lotsDisponibles)) * 100);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full mb-2">
              🏛️ Ministère de la Construction et de l'Urbanisme
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Tableau de bord national</h1>
            <p className="text-gray-500 mt-1">Supervision du marché foncier — Côte d'Ivoire</p>
          </div>
          <div className="flex gap-3">
            <Link to="/ministry-reporting" className="btn-primary text-sm px-4 py-2">
              📊 Générer un rapport
            </Link>
            <button className="btn-outline text-sm px-4 py-2">🔄 Actualiser</button>
          </div>
        </div>

        {/* KPI principaux */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Projets enregistrés", value: statsNationales.totalProjets, sub: `${statsNationales.projetsActifs} actifs`, icon: "🏗️", color: "text-blue-600", bg: "bg-blue-50" },
            { label: "Opérateurs certifiés", value: statsNationales.operateursCertifies, sub: "sur le territoire", icon: "🏢", color: "text-green-600", bg: "bg-green-50" },
            { label: "Lots disponibles", value: statsNationales.lotsDisponibles.toLocaleString(), sub: `${tauxVente}% taux de vente`, icon: "🏠", color: "text-orange-600", bg: "bg-orange-50" },
            { label: "Conformité nationale", value: `${statsNationales.conformiteMoyenne}%`, sub: "moyenne nationale", icon: "✅", color: "text-purple-600", bg: "bg-purple-50" },
          ].map((kpi) => (
            <div key={kpi.label} className={`${kpi.bg} rounded-xl p-5 border border-gray-100 shadow-sm`}>
              <div className="text-2xl mb-2">{kpi.icon}</div>
              <div className={`text-2xl font-bold ${kpi.color}`}>{kpi.value}</div>
              <div className="text-sm font-medium text-gray-700 mt-1">{kpi.label}</div>
              <div className="text-xs text-gray-400 mt-0.5">{kpi.sub}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Carte CI simulée */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-semibold text-gray-900">🗺️ Carte des projets — Côte d'Ivoire</h2>
              <span className="text-xs text-gray-400">{regionsData.length} régions actives</span>
            </div>
            <div className="relative p-4" style={{ height: 340 }}>
              {/* SVG carte simplifiée CI */}
              <svg viewBox="0 0 100 100" className="w-full h-full" style={{ background: "#f0fdf4", borderRadius: 12 }}>
                {/* Forme simplifiée de la CI */}
                <path
                  d="M15 20 L85 20 L90 30 L88 60 L80 75 L60 85 L30 82 L15 70 L10 50 L12 35 Z"
                  fill="#dcfce7"
                  stroke="#86efac"
                  strokeWidth="1"
                />
                {/* Points régions */}
                {regionsData.map((region) => (
                  <g key={region.nom}>
                    <circle
                      cx={region.x}
                      cy={region.y}
                      r={region.alertes > 0 ? 4 : 3}
                      fill={region.alertes > 0 ? "#f97316" : "#22c55e"}
                      stroke="white"
                      strokeWidth="1"
                      className="cursor-pointer"
                      onClick={() => setRegionActive(regionActive?.nom === region.nom ? null : region)}
                    />
                    {region.alertes > 0 && (
                      <circle
                        cx={region.x}
                        cy={region.y}
                        r={6}
                        fill="none"
                        stroke="#f97316"
                        strokeWidth="0.8"
                        opacity="0.5"
                      />
                    )}
                  </g>
                ))}
                <text x="50" y="97" textAnchor="middle" fontSize="4" fill="#6b7280">
                  Golfe de Guinée
                </text>
              </svg>

              {/* Légende */}
              <div className="absolute bottom-6 left-6 bg-white rounded-lg shadow p-2 text-xs space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-gray-600">Conforme</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                  <span className="text-gray-600">Alerte</span>
                </div>
              </div>

              {/* Tooltip région */}
              {regionActive && (
                <div className="absolute top-6 right-6 bg-white rounded-xl shadow-lg p-4 text-xs max-w-[180px] border border-gray-100">
                  <p className="font-bold text-gray-900 mb-2">{regionActive.nom}</p>
                  <div className="space-y-1 text-gray-600">
                    <div className="flex justify-between"><span>Projets</span><span className="font-medium">{regionActive.projets}</span></div>
                    <div className="flex justify-between"><span>Opérateurs</span><span className="font-medium">{regionActive.operateurs}</span></div>
                    <div className="flex justify-between"><span>Conformité</span><span className="font-medium">{regionActive.conformite}%</span></div>
                    <div className="flex justify-between"><span>Alertes</span><span className={`font-medium ${regionActive.alertes > 0 ? "text-orange-600" : "text-green-600"}`}>{regionActive.alertes}</span></div>
                  </div>
                  <button onClick={() => setRegionActive(null)} className="mt-2 text-gray-400 hover:text-gray-600 w-full text-center">✕ Fermer</button>
                </div>
              )}
            </div>
          </div>

          {/* Alertes */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-semibold text-gray-900">🚨 Alertes actives</h2>
              <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-0.5 rounded-full">
                {alertes.length}
              </span>
            </div>
            <div className="divide-y divide-gray-100 overflow-y-auto max-h-72">
              {alertes.map((alerte) => {
                const conf = ALERTE_CONFIG[alerte.type];
                return (
                  <div key={alerte.id} className={`p-4 ${conf.color} border-l-2`}>
                    <div className="flex items-start gap-2">
                      <span className="text-sm">{conf.icon}</span>
                      <div className="flex-1">
                        <p className="text-xs font-semibold text-gray-900">{alerte.projet}</p>
                        <p className="text-xs text-gray-600 mt-0.5">{alerte.message}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`text-xs px-1.5 py-0.5 rounded ${conf.badge}`}>{alerte.type}</span>
                          <span className="text-xs text-gray-400">{alerte.region}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="p-3 border-t border-gray-100">
              <Link to="/validation-queue" className="text-xs text-orange-500 hover:text-orange-600 font-medium">
                Voir toutes les alertes →
              </Link>
            </div>
          </div>
        </div>

        {/* Tableau régions */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-8">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">📊 Breakdown par région</h2>
            <div className="flex gap-2">
              {["semaine", "mois", "trimestre", "annee"].map((p) => (
                <button
                  key={p}
                  onClick={() => setPeriodeStats(p)}
                  className={`text-xs px-3 py-1 rounded-lg transition-colors ${
                    periodeStats === p ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                  }`}
                >
                  {p === "semaine" ? "7j" : p === "mois" ? "30j" : p === "trimestre" ? "3m" : "1an"}
                </button>
              ))}
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  {["Région", "Projets", "Opérateurs", "Conformité", "Alertes", "Tendance"].map((h) => (
                    <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {regionsData.map((r) => (
                  <tr key={r.nom} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3 font-medium text-gray-800">{r.nom}</td>
                    <td className="px-5 py-3 text-gray-600">{r.projets}</td>
                    <td className="px-5 py-3 text-gray-600">{r.operateurs}</td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 max-w-[80px] bg-gray-100 rounded-full h-1.5">
                          <div
                            className={`h-1.5 rounded-full ${r.conformite >= 85 ? "bg-green-500" : r.conformite >= 70 ? "bg-orange-400" : "bg-red-400"}`}
                            style={{ width: `${r.conformite}%` }}
                          ></div>
                        </div>
                        <span className="text-xs font-medium text-gray-700">{r.conformite}%</span>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      {r.alertes > 0 ? (
                        <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-0.5 rounded-full">
                          {r.alertes}
                        </span>
                      ) : (
                        <span className="text-green-500 text-xs">✓ Aucune</span>
                      )}
                    </td>
                    <td className="px-5 py-3 text-gray-500 text-xs">
                      {r.conformite >= 85 ? "↑ En hausse" : r.conformite >= 70 ? "→ Stable" : "↓ En baisse"}
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