import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const projectData = {
  id: 1,
  titre: "RÉSIDENCE JARDIN DE COCODY",
  lots: [
    ...Array.from({ length: 24 }, (_, i) => ({
      id: `I1-${String(i + 1).padStart(2, "0")}`,
      ilot: "1", numero: String(i + 1).padStart(2, "0"),
      superficie: 253, dimensions: "10x25m",
      prix: 12000000 + (i % 3) * 500000,
      mois_paiement: 24,
      statut: i < 10 ? "vendu" : i < 13 ? "reserve" : "disponible",
      position: "Milieu, Avenue des Jardins",
      features: ["Eau", "Electricite", "Voirie"],
      acheteur: i < 10 ? "Kouamé A." : i < 13 ? "Traoré F." : null,
    })),
    ...Array.from({ length: 26 }, (_, i) => ({
      id: `I2-${String(i + 1).padStart(2, "0")}`,
      ilot: "2", numero: String(i + 1).padStart(2, "0"),
      superficie: 280, dimensions: "11x25m",
      prix: 13000000 + (i % 3) * 500000,
      mois_paiement: 36,
      statut: i < 12 ? "vendu" : i < 14 ? "reserve" : "disponible",
      position: "Avenue Principale",
      features: ["Eau", "Electricite"],
      acheteur: i < 12 ? "Diabaté M." : i < 14 ? "Koné P." : null,
    })),
    ...Array.from({ length: 24 }, (_, i) => ({
      id: `I3-${String(i + 1).padStart(2, "0")}`,
      ilot: "3", numero: String(i + 1).padStart(2, "0"),
      superficie: 320, dimensions: "12x27m",
      prix: 15000000 + (i % 3) * 1000000,
      mois_paiement: 48,
      statut: i < 15 ? "vendu" : i < 17 ? "reserve" : "disponible",
      position: "Angle, Rue des Fleurs",
      features: ["Eau", "Electricite", "Voirie"],
      acheteur: i < 15 ? "N'Guessan B." : i < 17 ? "Bamba I." : null,
    })),
    ...Array.from({ length: 24 }, (_, i) => ({
      id: `I4-${String(i + 1).padStart(2, "0")}`,
      ilot: "4", numero: String(i + 1).padStart(2, "0"),
      superficie: 300, dimensions: "12x25m",
      prix: 14000000 + (i % 3) * 500000,
      mois_paiement: 24,
      statut: i < 8 ? "vendu" : i < 10 ? "reserve" : "disponible",
      position: "Fond, Rue Secondaire",
      features: ["Eau", "Electricite"],
      acheteur: i < 8 ? "Yao S." : i < 10 ? "Coulibaly F." : null,
    })),
    ...Array.from({ length: 22 }, (_, i) => ({
      id: `I5-${String(i + 1).padStart(2, "0")}`,
      ilot: "5", numero: String(i + 1).padStart(2, "0"),
      superficie: 270, dimensions: "10x27m",
      prix: 13500000 + (i % 3) * 500000,
      mois_paiement: 36,
      statut: i < 5 ? "vendu" : i < 7 ? "reserve" : "disponible",
      position: "Vue dégagée",
      features: ["Eau", "Electricite", "Voirie"],
      acheteur: i < 5 ? "Ouattara K." : i < 7 ? "Séry R." : null,
    })),
  ],
};

const STATUT_CONFIG = {
  disponible: { color: "bg-green-500 hover:bg-green-400", label: "Disponible", badge: "bg-green-100 text-green-700" },
  reserve: { color: "bg-orange-400 hover:bg-orange-300", label: "Réservé", badge: "bg-orange-100 text-orange-700" },
  vendu: { color: "bg-blue-500 cursor-not-allowed", label: "Vendu", badge: "bg-blue-100 text-blue-700" },
};

// Composant QR Code simulé
function QRCodeDisplay({ lotId, acheteur }) {
  const qrData = `TERRACI-${lotId}-${Date.now()}`;
  return (
    <div className="bg-white border-2 border-gray-200 rounded-xl p-4 text-center">
      <div className="w-32 h-32 mx-auto bg-gray-900 rounded-lg flex items-center justify-center mb-3 relative overflow-hidden">
        {/* QR simulé avec pattern */}
        <div className="grid grid-cols-8 gap-0.5 p-2">
          {Array.from({ length: 64 }).map((_, i) => (
            <div key={i} className={`w-2.5 h-2.5 ${
              [0,1,2,3,4,5,6,8,14,16,22,24,30,32,38,40,46,48,54,56,57,58,59,60,61,62,
               10,11,12,20,21,28,29,36,37,44,45].includes(i) ? "bg-white" : "bg-gray-900"
            }`}></div>
          ))}
        </div>
      </div>
      <p className="text-xs font-bold text-gray-800 mb-0.5">QR Code unique</p>
      <p className="text-xs text-gray-500 mb-1">{lotId}</p>
      <p className="text-xs text-orange-500 font-medium">{acheteur}</p>
      <p className="text-xs text-gray-400 mt-1 font-mono">{qrData.slice(0, 20)}...</p>
      <button className="mt-3 text-xs bg-orange-500 text-white px-4 py-1.5 rounded-lg hover:bg-orange-600 w-full">
        ⬇️ Télécharger
      </button>
    </div>
  );
}

export default function ManageLots() {
  const { id } = useParams();
  const [lots, setLots] = useState(projectData.lots);
  const [lotSelectionne, setLotSelectionne] = useState(null);
  const [vue, setVue] = useState("plan");
  const [recherche, setRecherche] = useState("");
  const [filtreStatut, setFiltreStatut] = useState("tous");
  const [filtreIlot, setFiltreIlot] = useState("tous");
  const [filtrePrix, setFiltrePrix] = useState("tous");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditPrix, setShowEditPrix] = useState(false);
  const [nouveauPrix, setNouveauPrix] = useState("");
  const [showConfirm, setShowConfirm] = useState(null);
  const [showQR, setShowQR] = useState(false);
  const [nouveauLot, setNouveauLot] = useState({
    ilot: "1", numero: "", superficie: "", dimensions: "",
    prix: "", mois_paiement: "24", features: []
  });

  const ilots = [...new Set(lots.map((l) => l.ilot))].sort();

  const stats = {
    total: lots.length,
    disponibles: lots.filter((l) => l.statut === "disponible").length,
    reserves: lots.filter((l) => l.statut === "reserve").length,
    vendus: lots.filter((l) => l.statut === "vendu").length,
  };

  const lotsFiltres = lots.filter((lot) => {
    const matchRecherche = recherche === "" ||
      lot.id.toLowerCase().includes(recherche.toLowerCase()) ||
      (lot.acheteur && lot.acheteur.toLowerCase().includes(recherche.toLowerCase()));
    const matchStatut = filtreStatut === "tous" || lot.statut === filtreStatut;
    const matchIlot = filtreIlot === "tous" || lot.ilot === filtreIlot;
    const matchPrix = filtrePrix === "tous" ||
      (filtrePrix === "moins15" && lot.prix < 15000000) ||
      (filtrePrix === "15a20" && lot.prix >= 15000000 && lot.prix <= 20000000) ||
      (filtrePrix === "plus20" && lot.prix > 20000000);
    return matchRecherche && matchStatut && matchIlot && matchPrix;
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
      id: `I${nouveauLot.ilot}-${String(nouveauLot.numero).padStart(2, "0")}`,
      ilot: nouveauLot.ilot,
      numero: String(nouveauLot.numero).padStart(2, "0"),
      superficie: parseInt(nouveauLot.superficie),
      dimensions: nouveauLot.dimensions || "—",
      prix: parseInt(nouveauLot.prix.replace(/\s/g, "")),
      mois_paiement: parseInt(nouveauLot.mois_paiement) || 24,
      statut: "disponible",
      position: "—",
      features: nouveauLot.features,
      acheteur: null,
    };
    setLots((prev) => [...prev, lot]);
    setShowAddModal(false);
    setNouveauLot({ ilot: "1", numero: "", superficie: "", dimensions: "", prix: "", mois_paiement: "24", features: [] });
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
            <button onClick={() => setShowAddModal(true)}
              className="btn-primary text-sm px-4 py-2 flex items-center gap-2">
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
              <input type="text" placeholder="🔍 Rechercher un lot ou acheteur..."
                value={recherche} onChange={(e) => setRecherche(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
            </div>
            <select value={filtreStatut} onChange={(e) => setFiltreStatut(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400">
              <option value="tous">Tous statuts</option>
              <option value="disponible">Disponibles</option>
              <option value="reserve">Réservés</option>
              <option value="vendu">Vendus</option>
            </select>
            <select value={filtreIlot} onChange={(e) => setFiltreIlot(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400">
              <option value="tous">Tous les îlots</option>
              {ilots.map((il) => <option key={il} value={il}>Îlot {il}</option>)}
            </select>
            <select value={filtrePrix} onChange={(e) => setFiltrePrix(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400">
              <option value="tous">Tous les prix</option>
              <option value="moins15">Moins de 15M</option>
              <option value="15a20">15M à 20M</option>
              <option value="plus20">Plus de 20M</option>
            </select>
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
                <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between flex-wrap gap-2">
                  <h2 className="font-semibold text-gray-800 text-sm">Plan du Lotissement</h2>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1"><span className="w-3 h-3 bg-green-500 rounded inline-block"></span> Disponible</span>
                    <span className="flex items-center gap-1"><span className="w-3 h-3 bg-orange-400 rounded inline-block"></span> Réservé</span>
                    <span className="flex items-center gap-1"><span className="w-3 h-3 bg-blue-500 rounded inline-block"></span> Vendu</span>
                  </div>
                </div>
                <div className="p-5 space-y-6 overflow-y-auto max-h-[560px]">
                  {ilots.map((ilot) => {
                    const lotsIlot = lotsFiltres.filter((l) => l.ilot === ilot);
                    if (lotsIlot.length === 0) return null;
                    return (
                      <div key={ilot}>
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 text-center">
                          ÎLOT {ilot}
                        </p>
                        <div className="flex flex-wrap gap-1.5 justify-center">
                          {lotsIlot.map((lot) => {
                            const sc = STATUT_CONFIG[lot.statut];
                            const isSelected = lotSelectionne?.id === lot.id;
                            return (
                              <button key={lot.id}
                                onClick={() => setLotSelectionne(isSelected ? null : lot)}
                                className={`w-12 h-9 rounded-lg text-xs font-bold transition-all ${sc.color} text-white ${
                                  isSelected ? "ring-2 ring-offset-1 ring-gray-900 scale-110 shadow-lg" :
                                  lot.statut !== "vendu" ? "hover:scale-105" : ""
                                }`}
                                title={lot.statut === "vendu" ? `Vendu — ${lot.acheteur}` : lot.id}
                              >
                                {lot.numero}
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
                        {["Lot", "Îlot", "Superficie", "Prix", "Mensualité", "Acheteur", "Statut", "Actions"].map((h) => (
                          <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {lotsFiltres.map((lot) => {
                        const sc = STATUT_CONFIG[lot.statut];
                        const mensualite = Math.round(lot.prix / lot.mois_paiement);
                        return (
                          <tr key={lot.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-4 py-3 font-medium text-gray-900">{lot.id}</td>
                            <td className="px-4 py-3 text-gray-600">Îlot {lot.ilot}</td>
                            <td className="px-4 py-3 text-gray-600">{lot.superficie} m²</td>
                            <td className="px-4 py-3 font-medium">{(lot.prix / 1000000).toFixed(1)}M</td>
                            <td className="px-4 py-3 text-xs text-gray-500">
                              {mensualite.toLocaleString()} / {lot.mois_paiement}mois
                            </td>
                            <td className="px-4 py-3 text-xs text-gray-600">{lot.acheteur || "—"}</td>
                            <td className="px-4 py-3">
                              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${sc.badge}`}>
                                {sc.label}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <button onClick={() => setLotSelectionne(lot)}
                                className="text-xs text-orange-500 hover:text-orange-600 font-medium">
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

          {/* Panneau détail */}
          <div>
            {!lotSelectionne ? (
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 text-center h-72 flex flex-col items-center justify-center">
                <div className="text-4xl mb-3">👆</div>
                <p className="text-gray-500 font-medium text-sm">Cliquez sur un lot</p>
                <p className="text-gray-400 text-xs mt-1">pour gérer ses actions</p>
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden sticky top-20">
                <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">LOT {lotSelectionne.id}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUT_CONFIG[lotSelectionne.statut].badge}`}>
                      {STATUT_CONFIG[lotSelectionne.statut].label}
                    </span>
                  </div>
                  <button onClick={() => { setLotSelectionne(null); setShowQR(false); setShowEditPrix(false); }}
                    className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
                </div>

                <div className="p-5 space-y-4">
                  {/* Infos */}
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { label: "Îlot", value: `Îlot ${lotSelectionne.ilot}` },
                      { label: "Numéro", value: `Lot ${lotSelectionne.numero}` },
                      { label: "Superficie", value: `${lotSelectionne.superficie} m²` },
                      { label: "Dimensions", value: lotSelectionne.dimensions },
                    ].map((item) => (
                      <div key={item.label} className="bg-gray-50 rounded-lg p-2.5">
                        <p className="text-xs text-gray-400">{item.label}</p>
                        <p className="text-xs font-semibold text-gray-800 mt-0.5">{item.value}</p>
                      </div>
                    ))}
                  </div>

                  {/* Acheteur si vendu/réservé */}
                  {lotSelectionne.acheteur && (
                    <div className="bg-blue-50 rounded-lg p-3 flex items-center gap-2">
                      <span className="text-blue-500">👤</span>
                      <div>
                        <p className="text-xs text-blue-400">Acheteur</p>
                        <p className="text-sm font-semibold text-blue-700">{lotSelectionne.acheteur}</p>
                      </div>
                    </div>
                  )}

                  {/* Features */}
                  {lotSelectionne.features.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {lotSelectionne.features.map((f) => (
                        <span key={f} className="text-xs bg-blue-50 text-blue-600 border border-blue-100 px-2 py-0.5 rounded-full">
                          {f === "Eau" ? "💧" : f === "Electricite" ? "⚡" : "🛣️"} {f}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Prix + mensualité */}
                  <div className="bg-orange-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs text-gray-500">Prix total</p>
                      <p className="text-xl font-bold text-orange-500">
                        {lotSelectionne.prix.toLocaleString("fr-FR")} FCFA
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-orange-200">
                      <p className="text-xs text-gray-500">Mensualité ({lotSelectionne.mois_paiement} mois)</p>
                      <p className="text-sm font-bold text-orange-400">
                        {Math.round(lotSelectionne.prix / lotSelectionne.mois_paiement).toLocaleString("fr-FR")} FCFA/mois
                      </p>
                    </div>
                  </div>

                  {/* QR Code si vendu */}
                  {lotSelectionne.statut === "vendu" && (
                    <div>
                      <button onClick={() => setShowQR(!showQR)}
                        className="w-full border border-gray-200 text-gray-700 text-sm py-2.5 rounded-xl hover:bg-gray-50 flex items-center justify-center gap-2 transition-colors">
                        📱 {showQR ? "Masquer" : "Voir"} le QR Code acheteur
                      </button>
                      {showQR && lotSelectionne.acheteur && (
                        <div className="mt-3">
                          <QRCodeDisplay lotId={lotSelectionne.id} acheteur={lotSelectionne.acheteur} />
                        </div>
                      )}
                    </div>
                  )}

                  {/* Modifier prix */}
                  {lotSelectionne.statut !== "vendu" && (
                    showEditPrix ? (
                      <div className="space-y-2">
                        <input type="text" value={nouveauPrix}
                          onChange={(e) => setNouveauPrix(e.target.value)}
                          placeholder="Ex: 15000000"
                          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
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
                    )
                  )}

                  {/* Actions statut */}
                  {lotSelectionne.statut === "vendu" ? (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
                      <p className="text-sm font-semibold text-red-700 mb-1">🔒 Lot verrouillé</p>
                      <p className="text-xs text-red-500">
                        Ce lot est vendu. Seul un administrateur TerraCi peut modifier ce statut pour éviter toute revente frauduleuse.
                      </p>
                    </div>
                  ) : showConfirm ? (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 space-y-3">
                      <p className="text-sm font-medium text-gray-800 text-center">
                        Confirmer : marquer comme <strong>{showConfirm === "reserve" ? "Réservé" : "Vendu"}</strong> ?
                      </p>
                      {showConfirm === "vendu" && (
                        <p className="text-xs text-red-500 text-center">
                          ⚠️ Cette action est irréversible sans autorisation admin.
                        </p>
                      )}
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
                      {lotSelectionne.statut === "disponible" && (
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
                      {lotSelectionne.statut === "reserve" && (
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
                  <label className="block text-xs text-gray-500 mb-1 font-medium">Îlot <span className="text-red-400">*</span></label>
                  <select value={nouveauLot.ilot}
                    onChange={(e) => setNouveauLot({ ...nouveauLot, ilot: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400">
                    {["1", "2", "3", "4", "5", "6", "7", "8"].map((n) => (
                      <option key={n} value={n}>Îlot {n}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1 font-medium">Numéro du lot <span className="text-red-400">*</span></label>
                  <input type="number" placeholder="Ex: 25" value={nouveauLot.numero}
                    onChange={(e) => setNouveauLot({ ...nouveauLot, numero: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1 font-medium">Superficie (m²) <span className="text-red-400">*</span></label>
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
                <label className="block text-xs text-gray-500 mb-1 font-medium">Prix (FCFA) <span className="text-red-400">*</span></label>
                <input type="text" placeholder="Ex: 12000000" value={nouveauLot.prix}
                  onChange={(e) => setNouveauLot({ ...nouveauLot, prix: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-1 font-medium">
                  Paiement échelonné sur (mois)
                </label>
                <select value={nouveauLot.mois_paiement}
                  onChange={(e) => setNouveauLot({ ...nouveauLot, mois_paiement: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400">
                  {[6, 12, 18, 24, 36, 48, 60].map((m) => (
                    <option key={m} value={m}>{m} mois</option>
                  ))}
                </select>
                {nouveauLot.prix && (
                  <p className="text-xs text-orange-500 mt-1">
                    ≈ {Math.round(parseInt(nouveauLot.prix.replace(/\s/g, "") || 0) / parseInt(nouveauLot.mois_paiement)).toLocaleString("fr-FR")} FCFA / mois
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-2 font-medium">Caractéristiques</label>
                <div className="flex gap-3 flex-wrap">
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