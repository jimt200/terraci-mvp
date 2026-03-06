// src/pages/ManageOperators.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const operatorsData = [
  {
    id: 1,
    nom: "KOUADIO IMMOBILIER",
    responsable: "Kouadio Serge",
    email: "contact@kouadio-immo.ci",
    telephone: "+225 07 12 34 56",
    ville: "Abidjan",
    projets: 7,
    projetsActifs: 2,
    note: 4.2,
    conformite: 92,
    statut: "certifie",
    depuis: "Mars 2021",
    lotesVendus: 187,
    chiffreAffaires: "4.2 Mrd FCFA",
    documents: ["RC", "Patente", "Agrément MCLAU", "Assurance RC"],
    historique: [
      { date: "2024-01-10", action: "Renouvellement certificat", type: "positif" },
      { date: "2023-11-05", action: "Mise à jour documents", type: "neutre" },
      { date: "2023-06-20", action: "Avertissement – retard livraison", type: "negatif" },
    ],
  },
  {
    id: 2,
    nom: "AFRICA LAND CI",
    responsable: "Traoré Aminata",
    email: "info@africaland.ci",
    telephone: "+225 05 98 76 54",
    ville: "Bouaké",
    projets: 4,
    projetsActifs: 1,
    note: 3.8,
    conformite: 78,
    statut: "certifie",
    depuis: "Juin 2022",
    lotesVendus: 94,
    chiffreAffaires: "1.8 Mrd FCFA",
    documents: ["RC", "Patente", "Agrément MCLAU"],
    historique: [
      { date: "2024-01-18", action: "Nouveau projet soumis", type: "neutre" },
      { date: "2023-09-14", action: "Documents mis à jour", type: "positif" },
    ],
  },
  {
    id: 3,
    nom: "IMMO CÔTE SUD",
    responsable: "N'Guessan Franck",
    email: "contact@immocotesud.ci",
    telephone: "+225 01 23 45 67",
    ville: "Grand-Bassam",
    projets: 3,
    projetsActifs: 1,
    note: 4.5,
    conformite: 96,
    statut: "certifie",
    depuis: "Janvier 2020",
    lotesVendus: 112,
    chiffreAffaires: "2.6 Mrd FCFA",
    documents: ["RC", "Patente", "Agrément MCLAU", "Assurance RC", "Caution bancaire"],
    historique: [
      { date: "2024-01-10", action: "Projet approuvé Villa Park", type: "positif" },
      { date: "2023-12-01", action: "Audit de conformité passé", type: "positif" },
    ],
  },
  {
    id: 4,
    nom: "CAPITAL FONCIER CI",
    responsable: "Bamba Ibrahim",
    email: "ibamba@capitalfoncier.ci",
    telephone: "+225 09 11 22 33",
    ville: "Yamoussoukro",
    projets: 2,
    projetsActifs: 1,
    note: 3.5,
    conformite: 65,
    statut: "suspendu",
    depuis: "Août 2022",
    lotesVendus: 45,
    chiffreAffaires: "0.9 Mrd FCFA",
    documents: ["RC", "Patente"],
    historique: [
      { date: "2024-01-05", action: "Suspension – non-conformité documents", type: "negatif" },
      { date: "2023-10-20", action: "Mise en demeure envoyée", type: "negatif" },
    ],
  },
  {
    id: 5,
    nom: "PREMIUM ESTATES CI",
    responsable: "Coulibaly Fatou",
    email: "fcoulibaly@premiumestates.ci",
    telephone: "+225 07 55 44 33",
    ville: "San-Pédro",
    projets: 5,
    projetsActifs: 1,
    note: 4.0,
    conformite: 88,
    statut: "certifie",
    depuis: "Novembre 2021",
    lotesVendus: 130,
    chiffreAffaires: "3.1 Mrd FCFA",
    documents: ["RC", "Patente", "Agrément MCLAU", "Assurance RC"],
    historique: [
      { date: "2024-01-08", action: "Projet Domaine Belvédère soumis", type: "neutre" },
      { date: "2023-08-15", action: "Certification renouvelée", type: "positif" },
    ],
  },
];

const STATUT_CONFIG = {
  certifie: { label: "Certifié", color: "bg-green-100 text-green-700" },
  suspendu: { label: "Suspendu", color: "bg-red-100 text-red-700" },
  en_attente: { label: "En attente", color: "bg-yellow-100 text-yellow-700" },
};

const ONGLETS = ["Profil", "Projets", "Performance", "Documents", "Historique"];

export default function ManageOperators() {
  const [selected, setSelected] = useState(null);
  const [onglet, setOnglet] = useState("Profil");
  const [recherche, setRecherche] = useState("");
  const [filtreStatut, setFiltreStatut] = useState("tous");

  const filtered = operatorsData.filter((op) => {
    const matchSearch =
      recherche === "" ||
      op.nom.toLowerCase().includes(recherche.toLowerCase()) ||
      op.ville.toLowerCase().includes(recherche.toLowerCase());
    const matchStatut = filtreStatut === "tous" || op.statut === filtreStatut;
    return matchSearch && matchStatut;
  });

  const stats = {
    total: operatorsData.length,
    certifies: operatorsData.filter((o) => o.statut === "certifie").length,
    suspendus: operatorsData.filter((o) => o.statut === "suspendu").length,
    conformiteMoyenne: Math.round(
      operatorsData.reduce((a, b) => a + b.conformite, 0) / operatorsData.length
    ),
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <nav className="text-xs text-gray-400 mb-1">
              <Link to="/dashboard-admin" className="hover:text-orange-500">Admin</Link>
              <span className="mx-2">›</span>
              <span className="text-gray-700">Gestion des opérateurs</span>
            </nav>
            <h1 className="text-2xl font-bold text-gray-900">Gestion des opérateurs</h1>
            <p className="text-gray-500 mt-1">Supervisez et gérez les opérateurs fonciers</p>
          </div>
          <button className="btn-primary px-5 py-2 text-sm">+ Ajouter un opérateur</button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total opérateurs", value: stats.total, color: "text-gray-800", bg: "bg-white" },
            { label: "Certifiés", value: stats.certifies, color: "text-green-600", bg: "bg-green-50" },
            { label: "Suspendus", value: stats.suspendus, color: "text-red-600", bg: "bg-red-50" },
            { label: "Conformité moy.", value: `${stats.conformiteMoyenne}%`, color: "text-blue-600", bg: "bg-blue-50" },
          ].map((s) => (
            <div key={s.label} className={`${s.bg} rounded-xl border border-gray-100 p-4 text-center shadow-sm`}>
              <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
              <div className="text-xs text-gray-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Liste opérateurs */}
          <div className="lg:col-span-2">
            {/* Filtres */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4 shadow-sm space-y-3">
              <input
                type="text"
                placeholder="Rechercher un opérateur..."
                value={recherche}
                onChange={(e) => setRecherche(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              <select
                value={filtreStatut}
                onChange={(e) => setFiltreStatut(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              >
                <option value="tous">Tous les statuts</option>
                <option value="certifie">Certifiés</option>
                <option value="suspendu">Suspendus</option>
              </select>
            </div>

            {/* Cards opérateurs */}
            <div className="space-y-3">
              {filtered.map((op) => {
                const sc = STATUT_CONFIG[op.statut];
                return (
                  <div
                    key={op.id}
                    onClick={() => { setSelected(op); setOnglet("Profil"); }}
                    className={`bg-white rounded-xl border p-4 cursor-pointer transition-all shadow-sm hover:shadow-md ${
                      selected?.id === op.id ? "border-orange-400 shadow-md" : "border-gray-200"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-sm font-bold text-orange-600 shrink-0">
                          {op.nom.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-gray-900">{op.nom}</p>
                          <p className="text-xs text-gray-400">{op.ville}</p>
                        </div>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium shrink-0 ${sc.color}`}>
                        {sc.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                      <span>📁 {op.projets} projets</span>
                      <span>⭐ {op.note}/5</span>
                      <span>✓ {op.conformite}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Détail opérateur */}
          <div className="lg:col-span-3">
            {!selected ? (
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm h-96 flex items-center justify-center text-center p-8">
                <div>
                  <div className="text-5xl mb-3">🏢</div>
                  <p className="text-gray-500 font-medium">Sélectionnez un opérateur</p>
                  <p className="text-gray-400 text-sm mt-1">pour voir ses détails</p>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                {/* Header opérateur */}
                <div className="p-5 border-b border-gray-100 bg-gradient-to-r from-orange-50 to-white">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center text-xl font-bold text-orange-600">
                        {selected.nom.charAt(0)}
                      </div>
                      <div>
                        <h2 className="font-bold text-gray-900">{selected.nom}</h2>
                        <p className="text-sm text-gray-500">{selected.responsable}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{selected.email}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 flex-wrap justify-end">
                      {selected.statut === "certifie" ? (
                        <button className="text-xs bg-red-50 text-red-600 border border-red-200 px-3 py-1.5 rounded-lg hover:bg-red-100">
                          Suspendre
                        </button>
                      ) : (
                        <button className="text-xs bg-green-50 text-green-600 border border-green-200 px-3 py-1.5 rounded-lg hover:bg-green-100">
                          Réactiver
                        </button>
                      )}
                      <button className="text-xs bg-orange-500 text-white px-3 py-1.5 rounded-lg hover:bg-orange-600">
                        Certifier ✓
                      </button>
                    </div>
                  </div>
                </div>

                {/* Onglets */}
                <div className="flex border-b border-gray-100 overflow-x-auto">
                  {ONGLETS.map((t) => (
                    <button
                      key={t}
                      onClick={() => setOnglet(t)}
                      className={`shrink-0 px-4 py-3 text-xs font-medium transition-colors ${
                        onglet === t
                          ? "border-b-2 border-orange-500 text-orange-600 bg-orange-50"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>

                <div className="p-5">
                  {onglet === "Profil" && (
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { label: "Téléphone", value: selected.telephone },
                        { label: "Ville", value: selected.ville },
                        { label: "Membre depuis", value: selected.depuis },
                        { label: "Lots vendus", value: selected.lotesVendus },
                        { label: "Chiffre d'affaires", value: selected.chiffreAffaires },
                        { label: "Note", value: `${selected.note}/5 ⭐` },
                      ].map((item) => (
                        <div key={item.label} className="bg-gray-50 rounded-lg p-3">
                          <p className="text-xs text-gray-400">{item.label}</p>
                          <p className="text-sm font-semibold text-gray-800 mt-0.5">{item.value}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {onglet === "Projets" && (
                    <div className="space-y-3">
                      <div className="flex gap-4 text-sm text-center">
                        <div className="flex-1 bg-gray-50 rounded-lg p-3">
                          <p className="text-lg font-bold text-gray-800">{selected.projets}</p>
                          <p className="text-xs text-gray-500">Total projets</p>
                        </div>
                        <div className="flex-1 bg-green-50 rounded-lg p-3">
                          <p className="text-lg font-bold text-green-600">{selected.projetsActifs}</p>
                          <p className="text-xs text-gray-500">Actifs</p>
                        </div>
                        <div className="flex-1 bg-blue-50 rounded-lg p-3">
                          <p className="text-lg font-bold text-blue-600">{selected.lotesVendus}</p>
                          <p className="text-xs text-gray-500">Lots vendus</p>
                        </div>
                      </div>
                      <p className="text-xs text-gray-400 text-center pt-2">
                        Consulter le détail des projets dans l'onglet Projets →
                      </p>
                    </div>
                  )}

                  {onglet === "Performance" && (
                    <div className="space-y-4">
                      {[
                        { label: "Conformité documentaire", value: selected.conformite, color: "bg-green-500" },
                        { label: "Satisfaction acheteurs", value: Math.round(selected.note * 20), color: "bg-blue-500" },
                        { label: "Délais de livraison", value: 75, color: "bg-orange-500" },
                        { label: "Qualité des projets", value: 82, color: "bg-purple-500" },
                      ].map((kpi) => (
                        <div key={kpi.label}>
                          <div className="flex justify-between mb-1">
                            <span className="text-xs text-gray-600">{kpi.label}</span>
                            <span className="text-xs font-bold text-gray-800">{kpi.value}%</span>
                          </div>
                          <div className="w-full bg-gray-100 rounded-full h-2">
                            <div
                              className={`${kpi.color} h-2 rounded-full transition-all`}
                              style={{ width: `${kpi.value}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {onglet === "Documents" && (
                    <div className="space-y-2">
                      {["RC", "Patente", "Agrément MCLAU", "Assurance RC", "Caution bancaire"].map((doc) => {
                        const present = selected.documents.includes(doc);
                        return (
                          <div key={doc} className="flex items-center justify-between py-2 border-b border-gray-100">
                            <span className="text-sm text-gray-700">{doc}</span>
                            <span className={`text-xs font-medium ${present ? "text-green-600" : "text-red-500"}`}>
                              {present ? "✓ Fourni" : "✗ Manquant"}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {onglet === "Historique" && (
                    <div className="space-y-3">
                      {selected.historique.map((evt, i) => (
                        <div key={i} className={`flex gap-3 p-3 rounded-lg ${
                          evt.type === "positif" ? "bg-green-50" :
                          evt.type === "negatif" ? "bg-red-50" : "bg-gray-50"
                        }`}>
                          <span className="text-lg">
                            {evt.type === "positif" ? "✅" : evt.type === "negatif" ? "🚨" : "📝"}
                          </span>
                          <div>
                            <p className="text-sm text-gray-800 font-medium">{evt.action}</p>
                            <p className="text-xs text-gray-400 mt-0.5">
                              {new Date(evt.date).toLocaleDateString("fr-FR")}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}