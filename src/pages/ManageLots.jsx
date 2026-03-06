import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const projectData = {
  id: 1,
  titre: "RÉSIDENCE JARDIN DE COCODY",
  lots: [
    // BLOC A
    ...Array.from({ length: 24 }, (_, i) => ({
      id: `A-${String(i + 1).padStart(2, "0")}`,
      bloc: "A", superficie: 253, dimensions: "10x25m",
      prix: 12000000 + (i % 3) * 500000,
      statut: i < 10 ? "vendu" : i < 13 ? "reserve" : "disponible",
      position: "Milieu, Avenue des Jardins",
      features: ["Eau", "Electricite", "Voirie"],
    })),
    // BLOC B
    ...Array.from({ length: 26 }, (_, i) => ({
      id: `B-${String(i + 1).padStart(2, "0")}`,
      bloc: "B", superficie: 280, dimensions: "11x25m",
      prix: 13000000 + (i % 3) * 500000,
      statut: i < 12 ? "vendu" : i < 14 ? "reserve" : "disponible",
      position: "Avenue Principale",
      features: ["Eau", "Electricite"],
    })),
    // BLOC C
    ...Array.from({ length: 24 }, (_, i) => ({
      id: `C-${String(i + 1).padStart(2, "0")}`,
      bloc: "C", superficie: 320, dimensions: "12x27m",
      prix: 15000000 + (i % 3) * 1000000,
      statut: i < 15 ? "vendu" : i < 17 ? "reserve" : "disponible",
      position: "Angle, Rue des Fleurs",
      features: ["Eau", "Electricite", "Voirie"],
    })),
    // BLOC D
    ...Array.from({ length: 24 }, (_, i) => ({
      id: `D-${String(i + 1).padStart(2, "0")}`,
      bloc: "D", superficie: 300, dimensions: "12x25m",
      prix: 14000000 + (i % 3) * 500000,
      statut: i < 8 ? "vendu" : i < 10 ? "reserve" : "disponible",
      position: "Fond, Rue Secondaire",
      features: ["Eau", "Electricite"],
    })),
    // BLOC E
    ...Array.from({ length: 22 }, (_, i) => ({
      id: `E-${String(i + 1).padStart(2, "0")}`,
      bloc: "E", superficie: 270, dimensions: "10x27m",
      prix: 13500000 + (i % 3) * 500000,
      statut: i < 5 ? "vendu" : i < 7 ? "reserve" : "disponible",
      position: "Vue dégagée",
      features: ["Eau", "Electricite", "Voirie"],
    })),
  ],
};

const STATUT_CONFIG = {
  disponible: { color: "bg-green-500 hover:bg-green-400", label: "Disponible", badge: "bg-green-100 text-green-700" },
  reserve: { color: "bg-orange-400 hover:bg-orange-300", label: "Réservé", badge: "bg-orange-100 text-orange-700" },
  vendu: { color: "bg-blue-500", label: "Vendu", badge: "bg-blue-100 text-blue-700" },
};

export default function ManageLots() {
  const { id } = useParams();
  const [lots, setLots] = useState(projectData.lots);
  const [lotSelectionne, setLotSelectionne] = useState(null);
  const [vue, setVue] = useState("plan");
  const [recherche, setRecherche] = useState("");
  const [filtreStatut, setFiltreStatut] = useState("tous");
  const [filtreBloc, setFiltreBloc] = useState("tous");
  const [filtrePrix, setFiltrePrix] = useState("tous");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditPrix, setShowEditPrix] = useState(false);
  const [nouveauPrix, setNouveauPrix] = useState("");
  const [showConfirm, setShowConfirm] = useState(null);
  const [nouveauLot, setNouveauLot] = useState({
    bloc: "A", numero: "", superficie: "", dimensions: "", prix: "", features: []
  });

  const blocs = [...new Set(lots.map((l) => l.bloc))];

  const stats = {
    total: lots.length,
    disponibles: lots.filter((l) => l.statut === "disponible").length,
    reserves: lots.filter((l) => l.statut === "reserve").length,
    vendus: lots.filter((l) => l.statut === "vendu").length,
  };

  const lotsFiltres = lots.filter((lot) => {
    const matchRecherche = recherche === "" || lot.id.toLowerCase().includes(recherche.toLowerCase());
    const matchStatut = filtreStatut === "tous" || lot.statut === filtreStatut;
    const matchBloc = filtreBloc === "tous" || lot.bloc === filtreBloc;
    const matchPrix = filtrePrix === "tous" ||
      (filtrePrix === "moins15" && lot.prix < 15000000) ||
      (filtrePrix === "15a20" && lot.prix >= 15000000 && lot.prix <= 20000000) ||
      (filtrePrix === "plus20" && lot.prix > 20000000);
    return matchRecherche && matchStatut && matchBloc && matchPrix;
  });

  const updateStatutLot = (lotId, newStatut) => {
    setLots((prev) => prev.map((l) => l.id === lotId ? { ...l, statut: newStatut } : l));
    setLotSelectionne((prev) => prev ? { ...prev, statut: newStatut } : null);
    setShowConfirm(null);
  };

  const updatePrixLot = (lotId) => {
    const prix = parseInt(nouveauPrix.replace(/\s/g, ""));
    if (!prix || isNaN(prix)) return;
    setLots((prev) => prev.map((l) => l.id === lotId ? { ...l, prix } : l));
    setLotSelectionne((prev) => prev ? { ...prev, prix } : null);
    setShowEditPrix(false);
    setNouveauPrix("");
  };

  const ajouterLot = () => {
    if (!nouveauLot.numero || !nouveauLot.superficie || !nouveauLot.prix) return;
    const lot = {
      id: `${nouveauLot.bloc}-${String(nouveauLot.numero).padStart(2, "0")}`,
      bloc: nouveauLot.bloc,
      superficie: parseInt(nouveauLot.superficie),
      dimensions: nouveauLot.dimensions || "—",
      prix: parseInt(nouveauLot.prix.replace(/\s/g, "")),
      statut: "disponible",
      position: "—",
      features: nouveauLot.features,
    };
    setLots((prev) => [...prev, lot]);
    setShowAddModal(false);
    setNouveauLot({ bloc: "A", numero: "", superficie: "", dimensions: "", prix: "", features: [] });
  };

  const toggleFeature = (f) => {
    setNouveauLot((prev) => ({
      ...prev,
      features: prev.features.includes(f)
        ? prev.features.filter((x) => x !== f)
        : [...prev.features, f]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">

        {/* Breadcrumb */}
        <nav className="text-xs text-gray-400 mb-4">
          <Link to="/dashboard-operator" className="hover:text-orange-500">Mes Projets</Link>
          <span className="mx-2">›</span>
          <span className="text-orange-500">Résidence Jardin de Cocody</span>
          <span className="mx-2">›</span>
          <span className="text-gray-700">Lots</span>
        </nav>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              Gestion des Lots : <span className="text-orange-500">{projectData.titre}</span>
            </h1>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setShowAddModal(true)}
              className="btn-primary text-sm px-4 py-2 flex items-center gap-2"
            >
              + Ajouter des Lots
            </button>
            <label className="btn-outline text-sm px-4 py-2 flex items-center gap-2 cursor-pointer">
              📥 Importer depuis Excel
              <input type="file" accept=".xlsx,.xls,.csv" className="hidden" />
            </label>
            <button className="btn-outline text-sm px-4 py-2 flex items-center gap-2">
              📤 Exporter la Liste
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Total", value: stats.total, icon: "🏗️", color: "text-gray-700", bg: "bg-white" },
            { label: "Disponibles", value: stats.disponibles, icon: "🟢", color: "text-green-600", bg: "bg-green-50" },
            { label: "Réservés", value: stats.reserves, icon: "🟠", color: "text-orange-500", bg: "bg-orange-50" },
            { label: "Vendus", value: stats.vendus, icon: "🔵", color: "text-blue-500", bg: "bg-blue-50" },
          ].map((s) => (
            <div key={s.label} className={`${s.bg} rounded-xl border border-gray-100 p-4 shadow-sm`}>
              <div className="flex items-center gap-2 mb-1">
                <span>{s.icon}</span>
                <span className="text-xs text-gray-500">{s.label}</span>
              </div>
              <div className={`text-2xl font-bold ${s.color}`}>{s.value} lots</div>
            </div>
          ))}
        </div>

        {/* Filtres */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 mb-4">
          <div className="flex flex-wrap gap-3 items-end">
            <div className="flex-1 min-w-[160px]">
              <input
                type="text"
                placeholder="🔍 Rechercher un lot..."
                value={recherche}
                onChange={(e) => setRecherche(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
            <select value={filtreStatut} onChange={(e) => setFiltreStatut(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400">
              <option value="tous">Tous</option>
              <option value="disponible">Disponibles</option>
              <option value="reserve">Réservés</option>
              <option value="vendu">Vendus</option>
            </select>
            <select value={filtreBloc} onChange={(e) => setFiltreBloc(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400">
              <option value="tous">Toutes</option>
              {blocs.map((b) => <option key={b} value={b}>Bloc {b}</option>)}
            </select>
            <select value={filtrePrix} onChange={(e) => setFiltrePrix(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400">
              <option value="tous">Tous les prix</option>
              <option value="moins15">Moins de 15M</option>
              <option value="15a20">15M à 20M</option>
              <option value="plus20">Plus de 20M</option>
            </select>
            {/* Toggle Plan / Liste */}
            <div className="flex border border-gray-200 rounded-lg overflow-hidden ml-auto">
              <button onClick={() => setVue("plan")}
                className={`px-4 py-2 text-sm font-medium flex items-center gap-1 transition-colors ${vue === "plan" ? "bg-gray-900 text-white" : "bg-white text-gray-500 hover:bg-gray-50"}`}>
                🗺️ Plan
              </button>
              <button onClick={() => setVue("liste")}
                className={`px-4 py-2 text-sm font-medium flex items-center gap-1 transition-colors ${vue === "liste" ? "bg-gray-900 text-white" : "bg-white text-gray-500 hover:bg-gray-50"}`}>
                ☰ Liste
              </button>
            </div>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* Plan / Liste */}
          <div className="lg:col-span-2">
            {vue === "plan" ? (
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
                  <h2 className="font-semibold text-gray-800 text-sm">Plan du Lotissement</h2>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1"><span className="w-3 h-3 bg-green-500 rounded inline-block"></span> Disponible</span>
                    <span className="flex items-center gap-1"><span className="w-3 h-3 bg-orange-400 rounded inline-block"></span> Réservé</span>
                    <span className="flex items-center gap-1"><span className="w-3 h-3 bg-blue-500 rounded inline-block"></span> Vendu</span>
                  </div>
                </div>
                <div className="p-5 space-y-6 overflow-y-auto max-h-[560px]">
                  {blocs.map((bloc) => {
                    const lotsBloc = lotsFiltres.filter((l) => l.bloc === bloc);
                    if (lotsBloc.length === 0) return null;
                    return (
                      <div key={bloc}>
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 text-center">
                          BLOC {bloc}
                        </p>
                        <div className="flex flex-wrap gap-1.5 justify-center">
                          {lotsBloc.map((lot) => {
                            const sc = STATUT_CONFIG[lot.statut];
                            const isSelected = lotSelectionne?.id === lot.id;
                            return (
                              <button
                                key={lot.id}
                                onClick={() => setLotSelectionne(isSelected ? null : lot)}
                                className={`w-12 h-9 rounded-lg text-xs font-bold transition-all ${sc.color} text-white ${
                                  isSelected ? "ring-2 ring-offset-1 ring-gray-900 scale-110 shadow-lg" : "hover:scale-105"
                                }`}
                              >
                                {lot.id}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        {["Lot", "Bloc", "Superficie", "Prix", "Statut", "Actions"].map((h) => (
                          <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {lotsFiltres.map((lot) => {
                        const sc = STATUT_CONFIG[lot.statut];
                        return (
                          <tr key={lot.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-4 py-3 font-medium text-gray-900">{lot.id}</td>
                            <td className="px-4 py-3 text-gray-600">Bloc {lot.bloc}</td>
                            <td className="px-4 py-3 text-gray-600">{lot.superficie} m²</td>
                            <td className="px-4 py-3 font-medium text-gray-800">
                              {(lot.prix / 1000000).toFixed(1)}M FCFA
                            </td>
                            <td className="px-4 py-3">
                              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${sc.badge}`}>
                                {sc.label}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <button
                                onClick={() => setLotSelectionne(lot)}
                                className="text-xs text-orange-500 hover:text-orange-600 font-medium"
                              >
                                Gérer →
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="px-4 py-3 border-t border-gray-100 text-xs text-gray-500 bg-gray-50">
                  {lotsFiltres.length} lot(s) affiché(s)
                </div>
              </div>
            )}
          </div>

          {/* Panneau détail lot */}
          <div>
            {!lotSelectionne ? (
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 text-center h-72 flex flex-col items-center justify-center">
                <div className="text-4xl mb-3">👆</div>
                <p className="text-gray-500 font-medium text-sm">Cliquez sur un lot</p>
                <p className="text-gray-400 text-xs mt-1">pour gérer ses actions</p>
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden sticky top-20">
                {/* Header lot */}
                <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">LOT {lotSelectionne.id}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUT_CONFIG[lotSelectionne.statut].badge}`}>
                      {STATUT_CONFIG[lotSelectionne.statut].label}
                    </span>
                  </div>
                  <button onClick={() => setLotSelectionne(null)} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
                </div>

                <div className="p-5 space-y-4">
                  {/* Infos */}
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { label: "Superficie", value: `${lotSelectionne.superficie} m²` },
                      { label: "Dimensions", value: lotSelectionne.dimensions },
                      { label: "Position", value: lotSelectionne.position },
                      { label: "Bloc", value: `Bloc ${lotSelectionne.bloc}` },
                    ].map((item) => (
                      <div key={item.label} className="bg-gray-50 rounded-lg p-2.5">
                        <p className="text-xs text-gray-400">{item.label}</p>
                        <p className="text-xs font-semibold text-gray-800 mt-0.5">{item.value}</p>
                      </div>
                    ))}
                  </div>

                  {/* Caractéristiques */}
                  {lotSelectionne.features.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {lotSelectionne.features.map((f) => (
                        <span key={f} className="text-xs bg-blue-50 text-blue-600 border border-blue-100 px-2 py-0.5 rounded-full">
                          {f === "Eau" ? "💧" : f === "Electricite" ? "⚡" : "🛣️"} {f}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Prix */}
                  <div className="bg-orange-50 rounded-xl p-4">
                    <p className="text-xs text-gray-500 mb-1">Prix</p>
                    <p className="text-2xl font-bold text-orange-500">
                      {lotSelectionne.prix.toLocaleString("fr-FR")} FCFA
                    </p>
                  </div>

                  {/* Modifier prix */}
                  {showEditPrix ? (
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={nouveauPrix}
                        onChange={(e) => setNouveauPrix(e.target.value)}
                        placeholder="Ex: 15000000"
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                      />
                      <div className="flex gap-2">
                        <button onClick={() => updatePrixLot(lotSelectionne.id)}
                          className="flex-1 bg-orange-500 text-white text-xs py-2 rounded-lg hover:bg-orange-600">
                          ✓ Valider
                        </button>
                        <button onClick={() => setShowEditPrix(false)}
                          className="flex-1 border border-gray-200 text-gray-600 text-xs py-2 rounded-lg hover:bg-gray-50">
                          Annuler
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button onClick={() => setShowEditPrix(true)}
                      className="w-full border border-gray-200 text-gray-700 text-sm py-2.5 rounded-xl hover:bg-gray-50 flex items-center justify-center gap-2 transition-colors">
                      ✏️ Modifier Prix
                    </button>
                  )}

                  {/* Actions statut */}
                  {showConfirm ? (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 space-y-3">
                      <p className="text-sm font-medium text-gray-800 text-center">
                        Confirmer : marquer comme <strong>{showConfirm === "reserve" ? "Réservé" : "Vendu"}</strong> ?
                      </p>
                      <div className="flex gap-2">
                        <button onClick={() => updateStatutLot(lotSelectionne.id, showConfirm)}
                          className="flex-1 bg-orange-500 text-white text-xs py-2 rounded-lg hover:bg-orange-600">
                          ✓ Confirmer
                        </button>
                        <button onClick={() => setShowConfirm(null)}
                          className="flex-1 border border-gray-200 text-gray-600 text-xs py-2 rounded-lg hover:bg-gray-50">
                          Annuler
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {lotSelectionne.statut !== "reserve" && lotSelectionne.statut !== "vendu" && (
                        <button onClick={() => setShowConfirm("reserve")}
                          className="w-full bg-orange-500 hover:bg-orange-600 text-white text-sm py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors">
                          🔖 Réserver Manuellement
                        </button>
                      )}
                      {lotSelectionne.statut !== "vendu" && (
                        <button onClick={() => setShowConfirm("vendu")}
                          className="w-full border-2 border-blue-500 text-blue-500 hover:bg-blue-50 text-sm py-2.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors">
                          ✓ Marquer comme Vendu
                        </button>
                      )}
                      {lotSelectionne.statut !== "disponible" && (
                        <button onClick={() => updateStatutLot(lotSelectionne.id, "disponible")}
                          className="w-full border border-gray-200 text-gray-600 text-sm py-2.5 rounded-xl hover:bg-gray-50 flex items-center justify-center gap-2 transition-colors">
                          ↩️ Remettre Disponible
                        </button>
                      )}
                      <button className="w-full border border-gray-200 text-gray-600 text-sm py-2.5 rounded-xl hover:bg-gray-50 flex items-center justify-center gap-2 transition-colors">
                        🕐 Voir Historique
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Modal Ajouter Lot */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-900">Ajouter un lot</h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
            </div>
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-500 mb-1 font-medium">Bloc</label>
                  <select value={nouveauLot.bloc}
                    onChange={(e) => setNouveauLot({ ...nouveauLot, bloc: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400">
                    {["A", "B", "C", "D", "E", "F"].map((b) => <option key={b} value={b}>Bloc {b}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1 font-medium">Numéro</label>
                  <input type="number" placeholder="Ex: 25" value={nouveauLot.numero}
                    onChange={(e) => setNouveauLot({ ...nouveauLot, numero: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1 font-medium">Superficie (m²)</label>
                  <input type="number" placeholder="Ex: 253" value={nouveauLot.superficie}
                    onChange={(e) => setNouveauLot({ ...nouveauLot, superficie: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1 font-medium">Dimensions</label>
                  <input type="text" placeholder="Ex: 10x25m" value={nouveauLot.dimensions}
                    onChange={(e) => setNouveauLot({ ...nouveauLot, dimensions: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1 font-medium">Prix (FCFA)</label>
                <input type="text" placeholder="Ex: 12000000" value={nouveauLot.prix}
                  onChange={(e) => setNouveauLot({ ...nouveauLot, prix: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-2 font-medium">Caractéristiques</label>
                <div className="flex gap-2 flex-wrap">
                  {["Eau", "Electricite", "Voirie"].map((f) => (
                    <label key={f} className="flex items-center gap-2 text-sm cursor-pointer">
                      <input type="checkbox" checked={nouveauLot.features.includes(f)}
                        onChange={() => toggleFeature(f)} className="accent-orange-500 rounded" />
                      {f === "Eau" ? "💧" : f === "Electricite" ? "⚡" : "🛣️"} {f}
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={ajouterLot}
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl text-sm font-semibold transition-colors">
                  ✓ Ajouter le lot
                </button>
                <button onClick={() => setShowAddModal(false)}
                  className="flex-1 border border-gray-200 text-gray-600 py-3 rounded-xl text-sm hover:bg-gray-50 transition-colors">
                  Annuler
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}