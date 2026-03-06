// src/pages/ValidationQueue.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { projects } from "../data/projects";

const validationData = [
  {
    id: 1,
    projet: "Résidence Les Cocotiers",
    operateur: "KOUADIO IMMOBILIER",
    ville: "Abidjan",
    region: "Lagunes",
    dateDepot: "2024-01-15",
    documents: { total: 8, fournis: 8 },
    priorite: "haute",
    statut: "en_attente",
    lots: 45,
    superficie: "2.3 ha",
  },
  {
    id: 2,
    projet: "Lotissement Akwaba",
    operateur: "AFRICA LAND",
    ville: "Bouaké",
    region: "Gbêkê",
    dateDepot: "2024-01-18",
    documents: { total: 8, fournis: 6 },
    priorite: "normale",
    statut: "incomplet",
    lots: 60,
    superficie: "3.1 ha",
  },
  {
    id: 3,
    projet: "Villa Park Grand-Bassam",
    operateur: "IMMO CÔTE SUD",
    ville: "Grand-Bassam",
    region: "Sud-Comoé",
    dateDepot: "2024-01-10",
    documents: { total: 8, fournis: 8 },
    priorite: "urgente",
    statut: "en_examen",
    lots: 30,
    superficie: "1.8 ha",
  },
  {
    id: 4,
    projet: "Cité Moderne Yamoussoukro",
    operateur: "CAPITAL FONCIER CI",
    ville: "Yamoussoukro",
    region: "Lacs",
    dateDepot: "2024-01-20",
    documents: { total: 8, fournis: 7 },
    priorite: "normale",
    statut: "en_attente",
    lots: 80,
    superficie: "4.5 ha",
  },
  {
    id: 5,
    projet: "Domaine Belvédère",
    operateur: "PREMIUM ESTATES CI",
    ville: "San-Pédro",
    region: "San-Pédro",
    dateDepot: "2024-01-08",
    documents: { total: 8, fournis: 8 },
    priorite: "haute",
    statut: "en_attente",
    lots: 25,
    superficie: "1.2 ha",
  },
  {
    id: 6,
    projet: "Résidence Harmonie",
    operateur: "KOUADIO IMMOBILIER",
    ville: "Abidjan",
    region: "Lagunes",
    dateDepot: "2024-01-22",
    documents: { total: 8, fournis: 5 },
    priorite: "basse",
    statut: "incomplet",
    lots: 55,
    superficie: "2.8 ha",
  },
];

const PRIORITE_CONFIG = {
  urgente: { label: "Urgente", color: "bg-red-100 text-red-700 border-red-200" },
  haute: { label: "Haute", color: "bg-orange-100 text-orange-700 border-orange-200" },
  normale: { label: "Normale", color: "bg-blue-100 text-blue-700 border-blue-200" },
  basse: { label: "Basse", color: "bg-gray-100 text-gray-600 border-gray-200" },
};

const STATUT_CONFIG = {
  en_attente: { label: "En attente", color: "bg-yellow-100 text-yellow-700" },
  en_examen: { label: "En examen", color: "bg-blue-100 text-blue-700" },
  incomplet: { label: "Incomplet", color: "bg-red-100 text-red-700" },
  approuve: { label: "Approuvé", color: "bg-green-100 text-green-700" },
};

export default function ValidationQueue() {
  const [filtreStatut, setFiltreStatut] = useState("tous");
  const [filtrePriorite, setFiltrePriorite] = useState("tous");
  const [filtreOperateur, setFiltreOperateur] = useState("tous");
  const [recherche, setRecherche] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);

  const operateurs = [...new Set(validationData.map((d) => d.operateur))];

  const filtered = validationData.filter((item) => {
    const matchStatut = filtreStatut === "tous" || item.statut === filtreStatut;
    const matchPriorite = filtrePriorite === "tous" || item.priorite === filtrePriorite;
    const matchOperateur = filtreOperateur === "tous" || item.operateur === filtreOperateur;
    const matchRecherche =
      recherche === "" ||
      item.projet.toLowerCase().includes(recherche.toLowerCase()) ||
      item.ville.toLowerCase().includes(recherche.toLowerCase());
    return matchStatut && matchPriorite && matchOperateur && matchRecherche;
  });

  const stats = {
    total: validationData.length,
    enAttente: validationData.filter((d) => d.statut === "en_attente").length,
    enExamen: validationData.filter((d) => d.statut === "en_examen").length,
    incomplet: validationData.filter((d) => d.statut === "incomplet").length,
    urgents: validationData.filter((d) => d.priorite === "urgente").length,
  };

  const toggleRow = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selectedRows.length === filtered.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filtered.map((d) => d.id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6">
          <Link to="/dashboard-admin" className="hover:text-orange-500">
            Dashboard Admin
          </Link>
          <span className="mx-2">›</span>
          <span className="text-gray-800 font-medium">File de validation</span>
        </nav>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              File de validation
            </h1>
            <p className="text-gray-500 mt-1">
              Projets en attente d'examen et d'approbation
            </p>
          </div>
          <div className="flex gap-3">
            <button className="btn-outline text-sm px-4 py-2">
              📊 Exporter
            </button>
            <button className="btn-primary text-sm px-4 py-2">
              🔄 Actualiser
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-8">
          {[
            { label: "Total", value: stats.total, color: "text-gray-800", bg: "bg-white" },
            { label: "En attente", value: stats.enAttente, color: "text-yellow-600", bg: "bg-yellow-50" },
            { label: "En examen", value: stats.enExamen, color: "text-blue-600", bg: "bg-blue-50" },
            { label: "Incomplets", value: stats.incomplet, color: "text-red-600", bg: "bg-red-50" },
            { label: "Urgents", value: stats.urgents, color: "text-orange-600", bg: "bg-orange-50" },
          ].map((stat) => (
            <div
              key={stat.label}
              className={`${stat.bg} rounded-xl border border-gray-100 p-4 text-center shadow-sm`}
            >
              <div className={`text-2xl font-bold ${stat.color}`}>
                {stat.value}
              </div>
              <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6 shadow-sm">
          <div className="flex flex-wrap gap-4 items-end">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-xs text-gray-500 mb-1 font-medium">
                Rechercher
              </label>
              <input
                type="text"
                placeholder="Projet, ville..."
                value={recherche}
                onChange={(e) => setRecherche(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1 font-medium">
                Statut
              </label>
              <select
                value={filtreStatut}
                onChange={(e) => setFiltreStatut(e.target.value)}
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              >
                <option value="tous">Tous les statuts</option>
                <option value="en_attente">En attente</option>
                <option value="en_examen">En examen</option>
                <option value="incomplet">Incomplet</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1 font-medium">
                Priorité
              </label>
              <select
                value={filtrePriorite}
                onChange={(e) => setFiltrePriorite(e.target.value)}
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              >
                <option value="tous">Toutes priorités</option>
                <option value="urgente">Urgente</option>
                <option value="haute">Haute</option>
                <option value="normale">Normale</option>
                <option value="basse">Basse</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1 font-medium">
                Opérateur
              </label>
              <select
                value={filtreOperateur}
                onChange={(e) => setFiltreOperateur(e.target.value)}
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              >
                <option value="tous">Tous les opérateurs</option>
                {operateurs.map((op) => (
                  <option key={op} value={op}>
                    {op}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={() => {
                setFiltreStatut("tous");
                setFiltrePriorite("tous");
                setFiltreOperateur("tous");
                setRecherche("");
              }}
              className="text-sm text-gray-500 hover:text-orange-500 px-3 py-2"
            >
              Réinitialiser
            </button>
          </div>
        </div>

        {/* Actions groupées */}
        {selectedRows.length > 0 && (
          <div className="bg-orange-50 border border-orange-200 rounded-lg px-4 py-3 mb-4 flex items-center justify-between">
            <span className="text-sm text-orange-700 font-medium">
              {selectedRows.length} projet(s) sélectionné(s)
            </span>
            <div className="flex gap-2">
              <button className="text-xs bg-white border border-orange-300 text-orange-600 px-3 py-1.5 rounded-lg hover:bg-orange-50">
                Demander compléments
              </button>
              <button className="text-xs bg-red-500 text-white px-3 py-1.5 rounded-lg hover:bg-red-600">
                Rejeter sélection
              </button>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-4 py-3 text-left w-10">
                    <input
                      type="checkbox"
                      checked={
                        selectedRows.length === filtered.length &&
                        filtered.length > 0
                      }
                      onChange={toggleAll}
                      className="rounded"
                    />
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-600">
                    Projet
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-600">
                    Opérateur
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-600">
                    Ville
                  </th>
                  <th className="px-4 py-3 text-center font-semibold text-gray-600">
                    Documents
                  </th>
                  <th className="px-4 py-3 text-center font-semibold text-gray-600">
                    Priorité
                  </th>
                  <th className="px-4 py-3 text-center font-semibold text-gray-600">
                    Statut
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-600">
                    Déposé le
                  </th>
                  <th className="px-4 py-3 text-center font-semibold text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.length === 0 ? (
                  <tr>
                    <td
                      colSpan={9}
                      className="px-4 py-12 text-center text-gray-400"
                    >
                      Aucun projet trouvé avec ces filtres.
                    </td>
                  </tr>
                ) : (
                  filtered.map((item) => {
                    const prioriteConf = PRIORITE_CONFIG[item.priorite];
                    const statutConf = STATUT_CONFIG[item.statut];
                    const docsComplets =
                      item.documents.fournis === item.documents.total;
                    return (
                      <tr
                        key={item.id}
                        className={`hover:bg-gray-50 transition-colors ${
                          selectedRows.includes(item.id) ? "bg-orange-50" : ""
                        }`}
                      >
                        <td className="px-4 py-3">
                          <input
                            type="checkbox"
                            checked={selectedRows.includes(item.id)}
                            onChange={() => toggleRow(item.id)}
                            className="rounded"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <div className="font-medium text-gray-900">
                            {item.projet}
                          </div>
                          <div className="text-xs text-gray-400">
                            {item.lots} lots · {item.superficie}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-gray-700">
                          {item.operateur}
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-gray-700">{item.ville}</div>
                          <div className="text-xs text-gray-400">
                            {item.region}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <div
                            className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                              docsComplets
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {docsComplets ? "✓" : "⚠"}
                            {item.documents.fournis}/{item.documents.total}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span
                            className={`inline-block px-2 py-1 rounded-full text-xs font-medium border ${prioriteConf.color}`}
                          >
                            {prioriteConf.label}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span
                            className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${statutConf.color}`}
                          >
                            {statutConf.label}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-500 text-xs">
                          {new Date(item.dateDepot).toLocaleDateString("fr-FR")}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-center gap-2">
                            <Link
                              to={`/detailed-exam/${item.id}`}
                              className="bg-orange-500 hover:bg-orange-600 text-white text-xs px-3 py-1.5 rounded-lg font-medium transition-colors"
                            >
                              Examiner →
                            </Link>
                            <button className="text-gray-400 hover:text-gray-600 text-xs px-2 py-1.5 border border-gray-200 rounded-lg">
                              ⋯
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Footer table */}
          <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500 bg-gray-50">
            <span>
              {filtered.length} projet(s) affiché(s) sur {validationData.length}
            </span>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1 border border-gray-200 rounded hover:bg-white">
                ← Précédent
              </button>
              <span className="px-3 py-1 bg-orange-500 text-white rounded">
                1
              </span>
              <button className="px-3 py-1 border border-gray-200 rounded hover:bg-white">
                Suivant →
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}