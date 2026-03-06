// src/pages/MinistryReporting.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const rapportsRecents = [
  {
    id: 1,
    titre: "Rapport mensuel — Janvier 2024",
    type: "mensuel",
    periode: "Janvier 2024",
    regions: ["Toutes les régions"],
    pages: 28,
    date: "2024-02-01",
    statut: "envoye",
    taille: "3.2 MB",
  },
  {
    id: 2,
    titre: "Rapport trimestriel — T4 2023",
    type: "trimestriel",
    periode: "Oct–Déc 2023",
    regions: ["Lagunes", "Gbêkê"],
    pages: 45,
    date: "2024-01-05",
    statut: "envoye",
    taille: "5.8 MB",
  },
  {
    id: 3,
    titre: "Rapport d'alerte — Non-conformités",
    type: "alerte",
    periode: "Déc 2023",
    regions: ["Hambol", "Tonkpi"],
    pages: 12,
    date: "2024-01-03",
    statut: "brouillon",
    taille: "1.4 MB",
  },
  {
    id: 4,
    titre: "Rapport annuel 2023",
    type: "annuel",
    periode: "Année 2023",
    regions: ["Toutes les régions"],
    pages: 86,
    date: "2024-01-15",
    statut: "envoye",
    taille: "12.1 MB",
  },
];

const STATUT_RAPPORT = {
  envoye: { label: "Envoyé", color: "bg-green-100 text-green-700" },
  brouillon: { label: "Brouillon", color: "bg-gray-100 text-gray-600" },
  genere: { label: "Généré", color: "bg-blue-100 text-blue-700" },
};

const TYPE_RAPPORT = {
  mensuel: { label: "Mensuel", icon: "📅" },
  trimestriel: { label: "Trimestriel", icon: "📊" },
  annuel: { label: "Annuel", icon: "📋" },
  alerte: { label: "Alerte", icon: "🚨" },
  regional: { label: "Régional", icon: "🗺️" },
};

const REGIONS = [
  "Lagunes (Abidjan)",
  "Gbêkê (Bouaké)",
  "Sud-Comoé (Grand-Bassam)",
  "Lacs (Yamoussoukro)",
  "San-Pédro",
  "Hambol (Katiola)",
  "Tonkpi (Man)",
];

const SECTIONS_RAPPORT = [
  "Résumé exécutif",
  "Statistiques nationales",
  "Projets approuvés / rejetés",
  "Analyse des opérateurs",
  "Non-conformités détectées",
  "Alertes et recommandations",
  "Évolution par région",
  "Annexes documentaires",
];

export default function MinistryReporting() {
  const [typeRapport, setTypeRapport] = useState("mensuel");
  const [periodeDebut, setPeriodeDebut] = useState("2024-01-01");
  const [periodeFin, setPeriodeFin] = useState("2024-01-31");
  const [regionsSelectionnees, setRegionsSelectionnees] = useState([]);
  const [sectionsSelectionnees, setSectionsSelectionnees] = useState(SECTIONS_RAPPORT.slice(0, 5));
  const [destinataires, setDestinataires] = useState("dguhc@mclau.gouv.ci");
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [rapportPreview, setRapportPreview] = useState(null);
  const [activeTab, setActiveTab] = useState("creer");

  const toggleRegion = (r) => {
    setRegionsSelectionnees((prev) =>
      prev.includes(r) ? prev.filter((x) => x !== r) : [...prev, r]
    );
  };

  const toggleSection = (s) => {
    setSectionsSelectionnees((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );
  };

  const handleGenerer = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setGenerated(true);
      setRapportPreview({
        titre: `Rapport ${TYPE_RAPPORT[typeRapport].label} — ${new Date(periodeDebut).toLocaleDateString("fr-FR", { month: "long", year: "numeric" })}`,
        type: typeRapport,
        periode: `${new Date(periodeDebut).toLocaleDateString("fr-FR")} – ${new Date(periodeFin).toLocaleDateString("fr-FR")}`,
        regions: regionsSelectionnees.length > 0 ? regionsSelectionnees : ["Toutes les régions"],
        sections: sectionsSelectionnees,
        pages: Math.round(sectionsSelectionnees.length * 3.5 + 8),
        taille: `${(sectionsSelectionnees.length * 0.4 + 1.2).toFixed(1)} MB`,
        date: new Date().toLocaleDateString("fr-FR"),
      });
      setActiveTab("apercu");
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <nav className="text-xs text-gray-400 mb-1">
              <Link to="/dashboard-ministry" className="hover:text-orange-500">Ministère</Link>
              <span className="mx-2">›</span>
              <span className="text-gray-700">Génération de rapports</span>
            </nav>
            <h1 className="text-2xl font-bold text-gray-900">Génération de rapports</h1>
            <p className="text-gray-500 mt-1">Créez et envoyez des rapports officiels au Ministère</p>
          </div>
        </div>

        {/* Onglets principaux */}
        <div className="flex gap-1 bg-gray-100 p-1 rounded-xl mb-8 w-fit">
          {[
            { key: "creer", label: "✏️ Créer un rapport" },
            { key: "apercu", label: "👁️ Aperçu" },
            { key: "historique", label: "📚 Historique" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.key
                  ? "bg-white text-orange-600 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Onglet Créer */}
        {activeTab === "creer" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Formulaire */}
            <div className="lg:col-span-2 space-y-6">
              {/* Type de rapport */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h2 className="font-semibold text-gray-900 mb-4">Type de rapport</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {Object.entries(TYPE_RAPPORT).map(([key, val]) => (
                    <button
                      key={key}
                      onClick={() => setTypeRapport(key)}
                      className={`p-4 rounded-xl border text-center transition-all ${
                        typeRapport === key
                          ? "border-orange-400 bg-orange-50"
                          : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <div className="text-2xl mb-1">{val.icon}</div>
                      <div className={`text-sm font-medium ${typeRapport === key ? "text-orange-600" : "text-gray-700"}`}>
                        {val.label}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Période */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h2 className="font-semibold text-gray-900 mb-4">Période couverte</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1 font-medium">Date de début</label>
                    <input
                      type="date"
                      value={periodeDebut}
                      onChange={(e) => setPeriodeDebut(e.target.value)}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1 font-medium">Date de fin</label>
                    <input
                      type="date"
                      value={periodeFin}
                      onChange={(e) => setPeriodeFin(e.target.value)}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                  </div>
                </div>
              </div>

              {/* Régions */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h2 className="font-semibold text-gray-900 mb-1">Régions concernées</h2>
                <p className="text-xs text-gray-400 mb-4">Laissez vide pour inclure toutes les régions</p>
                <div className="grid grid-cols-2 gap-2">
                  {REGIONS.map((r) => (
                    <label key={r} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer p-2 rounded-lg hover:bg-gray-50">
                      <input
                        type="checkbox"
                        checked={regionsSelectionnees.includes(r)}
                        onChange={() => toggleRegion(r)}
                        className="accent-orange-500 rounded"
                      />
                      {r}
                    </label>
                  ))}
                </div>
              </div>

              {/* Sections */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h2 className="font-semibold text-gray-900 mb-4">Sections à inclure</h2>
                <div className="space-y-2">
                  {SECTIONS_RAPPORT.map((s) => (
                    <label key={s} className="flex items-center gap-3 text-sm text-gray-700 cursor-pointer p-2 rounded-lg hover:bg-gray-50">
                      <input
                        type="checkbox"
                        checked={sectionsSelectionnees.includes(s)}
                        onChange={() => toggleSection(s)}
                        className="accent-orange-500 rounded"
                      />
                      {s}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Panneau latéral */}
            <div className="space-y-5">
              {/* Destinataires */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                <h3 className="font-semibold text-gray-900 mb-3">Destinataires</h3>
                <textarea
                  value={destinataires}
                  onChange={(e) => setDestinataires(e.target.value)}
                  rows={3}
                  placeholder="Emails séparés par des virgules..."
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
                />
                <p className="text-xs text-gray-400 mt-1">Séparez les adresses par des virgules</p>
              </div>

              {/* Résumé */}
              <div className="bg-gray-50 rounded-xl border border-gray-200 p-5">
                <h3 className="font-semibold text-gray-900 mb-3">Résumé de la configuration</h3>
                <div className="space-y-2 text-xs text-gray-600">
                  <div className="flex justify-between">
                    <span>Type</span>
                    <span className="font-medium text-gray-800">{TYPE_RAPPORT[typeRapport].label}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Période</span>
                    <span className="font-medium text-gray-800">
                      {new Date(periodeDebut).toLocaleDateString("fr-FR", { month: "short" })} – {new Date(periodeFin).toLocaleDateString("fr-FR", { month: "short", year: "numeric" })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Régions</span>
                    <span className="font-medium text-gray-800">
                      {regionsSelectionnees.length > 0 ? regionsSelectionnees.length : "Toutes"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sections</span>
                    <span className="font-medium text-gray-800">{sectionsSelectionnees.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pages estimées</span>
                    <span className="font-medium text-gray-800">~{Math.round(sectionsSelectionnees.length * 3.5 + 8)}</span>
                  </div>
                </div>
              </div>

              {/* Boutons */}
              <div className="space-y-3">
                <button
                  onClick={handleGenerer}
                  disabled={generating || sectionsSelectionnees.length === 0}
                  className={`w-full py-3 rounded-xl text-sm font-semibold transition-all ${
                    generating || sectionsSelectionnees.length === 0
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-orange-500 hover:bg-orange-600 text-white shadow-md"
                  }`}
                >
                  {generating ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                      </svg>
                      Génération en cours...
                    </span>
                  ) : "📄 Générer le rapport"}
                </button>
                <button className="w-full py-2.5 rounded-xl text-sm font-medium border border-gray-200 text-gray-600 hover:bg-gray-50">
                  💾 Enregistrer en brouillon
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Onglet Aperçu */}
        {activeTab === "apercu" && (
          <div>
            {!rapportPreview ? (
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm h-96 flex items-center justify-center text-center p-8">
                <div>
                  <div className="text-5xl mb-3">📄</div>
                  <p className="text-gray-500 font-medium">Aucun rapport généré</p>
                  <p className="text-gray-400 text-sm mt-1">Créez un rapport depuis l'onglet "Créer"</p>
                  <button onClick={() => setActiveTab("creer")} className="mt-4 btn-primary px-5 py-2 text-sm">
                    Créer un rapport
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Aperçu PDF simulé */}
                <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                  <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                    <h2 className="font-semibold text-gray-900">Aperçu du rapport</h2>
                    <div className="flex gap-2">
                      <button className="text-xs bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg hover:bg-gray-200">
                        🖨️ Imprimer
                      </button>
                      <button className="text-xs bg-orange-500 text-white px-3 py-1.5 rounded-lg hover:bg-orange-600">
                        ⬇️ Télécharger PDF
                      </button>
                    </div>
                  </div>

                  {/* Page de couverture simulée */}
                  <div className="p-8">
                    <div className="border border-gray-200 rounded-xl overflow-hidden shadow-inner">
                      {/* En-tête gouvernemental */}
                      <div className="bg-green-700 text-white p-6 text-center">
                        <p className="text-xs opacity-80 uppercase tracking-widest mb-1">République de Côte d'Ivoire</p>
                        <p className="text-xs opacity-80">Ministère de la Construction, du Logement et de l'Urbanisme</p>
                        <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full mx-auto mt-3 flex items-center justify-center text-2xl">
                          🏛️
                        </div>
                      </div>

                      {/* Corps */}
                      <div className="bg-white p-6">
                        <div className="text-center mb-6">
                          <div className="inline-block bg-orange-100 text-orange-600 text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase">
                            {TYPE_RAPPORT[rapportPreview.type].label}
                          </div>
                          <h1 className="text-xl font-bold text-gray-900 mb-2">{rapportPreview.titre}</h1>
                          <p className="text-sm text-gray-500">Période : {rapportPreview.periode}</p>
                          <p className="text-sm text-gray-500">
                            Régions : {rapportPreview.regions.join(", ")}
                          </p>
                        </div>

                        <div className="border-t border-gray-100 pt-4">
                          <p className="text-xs font-semibold text-gray-600 mb-3 uppercase">Table des matières</p>
                          <div className="space-y-1.5">
                            {rapportPreview.sections.map((s, i) => (
                              <div key={s} className="flex items-center justify-between text-xs py-1 border-b border-dotted border-gray-100">
                                <span className="text-gray-700">{i + 1}. {s}</span>
                                <span className="text-gray-400">{(i + 1) * 3}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="mt-6 text-center text-xs text-gray-400">
                          <p>Généré le {rapportPreview.date} · {rapportPreview.pages} pages · {rapportPreview.taille}</p>
                          <p className="mt-1">TerraCi — Plateforme de Sécurisation Foncière</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-xl p-5">
                    <div className="text-2xl mb-2">✅</div>
                    <p className="font-semibold text-green-800 text-sm">Rapport généré avec succès !</p>
                    <p className="text-xs text-green-600 mt-1">{rapportPreview.pages} pages · {rapportPreview.taille}</p>
                  </div>

                  <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 space-y-3">
                    <h3 className="font-semibold text-gray-900 text-sm">Envoyer le rapport</h3>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Destinataires</label>
                      <input
                        type="text"
                        value={destinataires}
                        onChange={(e) => setDestinataires(e.target.value)}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Note d'accompagnement</label>
                      <textarea
                        rows={3}
                        placeholder="Message optionnel..."
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
                      />
                    </div>
                    <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-xl text-sm font-semibold transition-colors">
                      📤 Envoyer au Ministère
                    </button>
                    <button className="w-full border border-gray-200 text-gray-600 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">
                      ⬇️ Télécharger PDF
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Onglet Historique */}
        {activeTab === "historique" && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-semibold text-gray-900">Rapports récents</h2>
              <span className="text-xs text-gray-400">{rapportsRecents.length} rapports</span>
            </div>
            <div className="divide-y divide-gray-100">
              {rapportsRecents.map((r) => {
                const sc = STATUT_RAPPORT[r.statut];
                const tc = TYPE_RAPPORT[r.type];
                return (
                  <div key={r.id} className="px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center text-xl">
                        {tc.icon}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{r.titre}</p>
                        <div className="flex items-center gap-3 mt-0.5">
                          <span className="text-xs text-gray-400">{r.periode}</span>
                          <span className="text-xs text-gray-400">{r.pages} pages · {r.taille}</span>
                          <span className="text-xs text-gray-400">{new Date(r.date).toLocaleDateString("fr-FR")}</span>
                        </div>
                        <div className="flex gap-1 mt-1 flex-wrap">
                          {r.regions.map((reg) => (
                            <span key={reg} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                              {reg}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0 ml-4">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${sc.color}`}>
                        {sc.label}
                      </span>
                      <button className="text-xs border border-gray-200 text-gray-600 px-3 py-1.5 rounded-lg hover:bg-gray-100">
                        ⬇️ PDF
                      </button>
                      {r.statut !== "envoye" && (
                        <button className="text-xs bg-green-500 text-white px-3 py-1.5 rounded-lg hover:bg-green-600">
                          Envoyer
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}