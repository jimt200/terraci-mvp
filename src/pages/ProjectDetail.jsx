import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const projectsData = [
  {
    id: 1,
    titre: "Résidence Les Cocotiers",
    operateur: "KOUADIO IMMOBILIER",
    operateur_id: 1,
    ville: "Abidjan",
    commune: "Cocody",
    region: "Lagunes",
    adresse: "Cocody Riviera 3, Rue des Cocotiers",
    coordonnees: { lat: 5.3600, lng: -3.9800 },
    prix_min: 12000000,
    prix_max: 18000000,
    superficie_totale: "2.3 ha",
    lots_total: 45,
    lots_disponibles: 20,
    lots_reserves: 5,
    lots_vendus: 20,
    statut: "approuve",
    avancement: 75,
    description: "Projet résidentiel haut standing situé dans la commune de Cocody. Accès facile aux grandes artères, à proximité des écoles internationales et centres commerciaux. Chaque lot est viabilisé avec eau, électricité et voirie.",
    features: ["Eau potable", "Électricité", "Voirie bitumée", "Gardiennage", "Clôture"],
    images: [],
    documents: [
      { id: 1, nom: "Titre foncier", obligatoire: true, disponible: true },
      { id: 2, nom: "Plan de lotissement", obligatoire: true, disponible: true },
      { id: 3, nom: "Arrêté de morcellement", obligatoire: true, disponible: true },
      { id: 4, nom: "Étude d'impact environnemental", obligatoire: true, disponible: true },
      { id: 5, nom: "Registre de commerce", obligatoire: true, disponible: true },
      { id: 6, nom: "Attestation fiscale", obligatoire: true, disponible: false },
      { id: 7, nom: "Plan de viabilisation", obligatoire: false, disponible: true },
      { id: 8, nom: "Convention de vente type", obligatoire: false, disponible: true },
    ],
    lots: [
      { id: "A-01", bloc: "A", superficie: 253, prix: 12000000, statut: "vendu", dimensions: "10x25m" },
      { id: "A-02", bloc: "A", superficie: 253, prix: 12000000, statut: "vendu", dimensions: "10x25m" },
      { id: "A-03", bloc: "A", superficie: 253, prix: 13000000, statut: "disponible", dimensions: "10x25m" },
      { id: "A-04", bloc: "A", superficie: 300, prix: 15000000, statut: "reserve", dimensions: "12x25m" },
      { id: "A-05", bloc: "A", superficie: 253, prix: 12000000, statut: "disponible", dimensions: "10x25m" },
      { id: "A-06", bloc: "A", superficie: 253, prix: 12500000, statut: "disponible", dimensions: "10x25m" },
      { id: "B-01", bloc: "B", superficie: 280, prix: 14000000, statut: "disponible", dimensions: "11x25m" },
      { id: "B-02", bloc: "B", superficie: 280, prix: 14000000, statut: "vendu", dimensions: "11x25m" },
      { id: "B-03", bloc: "B", superficie: 280, prix: 14500000, statut: "disponible", dimensions: "11x25m" },
      { id: "B-04", bloc: "B", superficie: 300, prix: 15000000, statut: "reserve", dimensions: "12x25m" },
      { id: "C-01", bloc: "C", superficie: 320, prix: 16000000, statut: "disponible", dimensions: "12x27m" },
      { id: "C-02", bloc: "C", superficie: 320, prix: 16000000, statut: "vendu", dimensions: "12x27m" },
      { id: "C-03", bloc: "C", superficie: 350, prix: 18000000, statut: "disponible", dimensions: "14x25m" },
      { id: "C-04", bloc: "C", superficie: 320, prix: 16500000, statut: "disponible", dimensions: "12x27m" },
    ],
  },
];

const defaultProject = projectsData[0];

const STATUT_LOT = {
  disponible: { color: "bg-green-500 hover:bg-green-400", label: "Disponible", text: "text-white" },
  reserve: { color: "bg-orange-400 hover:bg-orange-300", label: "Réservé", text: "text-white" },
  vendu: { color: "bg-blue-500", label: "Vendu", text: "text-white" },
};

export default function ProjectDetail() {
  const { id } = useParams();
  const project = projectsData.find((p) => p.id === parseInt(id)) || defaultProject;

  const [onglet, setOnglet] = useState("apercu");
  const [lotSelectionne, setLotSelectionne] = useState(null);
  const [filtreStatutLot, setFiltreStatutLot] = useState("tous");
  const [showMapModal, setShowMapModal] = useState(false);

  const blocs = [...new Set(project.lots.map((l) => l.bloc))];

  const lotsFiltres = project.lots.filter((l) =>
    filtreStatutLot === "tous" || l.statut === filtreStatutLot
  );

  const formatPrix = (p) => `${(p / 1000000).toFixed(1)} M FCFA`;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8">

        {/* Breadcrumb */}
        <nav className="text-sm text-gray-400 mb-6">
          <Link to="/search" className="hover:text-orange-500">Projets</Link>
          <span className="mx-2">›</span>
          <span className="text-gray-700">{project.titre}</span>
        </nav>

        {/* Header projet */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap mb-2">
                <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full">
                  ✓ Projet validé
                </span>
                <span className="bg-orange-100 text-orange-600 text-xs px-2 py-0.5 rounded-full">
                  {project.region}
                </span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">{project.titre}</h1>
              <p className="text-gray-500 text-sm mb-3">
                📍 {project.adresse}, {project.commune}, {project.ville}
              </p>

              {/* Bouton géolocalisation */}
              <button
                onClick={() => setShowMapModal(true)}
                className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors border border-blue-200"
              >
                🗺️ Voir sur la carte
              </button>
            </div>

            <div className="flex flex-col gap-3 sm:items-end shrink-0">
              <div className="text-right">
                <p className="text-xs text-gray-400">Prix à partir de</p>
                <p className="text-2xl font-bold text-orange-500">{formatPrix(project.prix_min)}</p>
                <p className="text-xs text-gray-400">jusqu'à {formatPrix(project.prix_max)}</p>
              </div>

              {/* Bouton contacter opérateur → redirige vers profil public */}
              <Link
                to={`/operator/${project.operateur_id}`}
                className="btn-primary text-sm px-5 py-2.5 flex items-center gap-2"
              >
                🏢 Contacter {project.operateur}
              </Link>
            </div>
          </div>

          {/* Stats lots */}
          <div className="grid grid-cols-4 gap-3 mt-5 pt-5 border-t border-gray-100">
            {[
              { label: "Total lots", value: project.lots_total, color: "text-gray-700" },
              { label: "Disponibles", value: project.lots_disponibles, color: "text-green-600" },
              { label: "Réservés", value: project.lots_reserves, color: "text-orange-500" },
              { label: "Vendus", value: project.lots_vendus, color: "text-blue-500" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className={`text-xl font-bold ${s.color}`}>{s.value}</div>
                <div className="text-xs text-gray-400 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Onglets */}
        <div className="flex gap-1 bg-gray-100 p-1 rounded-xl mb-6 overflow-x-auto">
          {[
            { key: "apercu", label: "📋 Aperçu" },
            { key: "lots", label: `🏠 Plan des lots (${project.lots_disponibles} dispo)` },
            { key: "documents", label: "📁 Documents" },
          ].map((tab) => (
            <button key={tab.key} onClick={() => setOnglet(tab.key)}
              className={`shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                onglet === tab.key ? "bg-white text-orange-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
              }`}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* ===== ONGLET APERÇU ===== */}
        {onglet === "apercu" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-5">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                <h2 className="font-bold text-gray-900 mb-3">Description</h2>
                <p className="text-gray-600 leading-relaxed text-sm">{project.description}</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                <h2 className="font-bold text-gray-900 mb-3">Équipements et services</h2>
                <div className="flex flex-wrap gap-2">
                  {project.features.map((f) => (
                    <span key={f} className="bg-green-50 text-green-700 border border-green-200 text-sm px-3 py-1 rounded-full">
                      ✓ {f}
                    </span>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                <h2 className="font-bold text-gray-900 mb-3">Informations générales</h2>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Superficie totale", value: project.superficie_totale },
                    { label: "Nombre de lots", value: project.lots_total },
                    { label: "Commune", value: project.commune },
                    { label: "Région", value: project.region },
                  ].map((item) => (
                    <div key={item.label} className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-400">{item.label}</p>
                      <p className="text-sm font-semibold text-gray-800">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar opérateur */}
            <div className="space-y-4">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                <h3 className="font-bold text-gray-900 mb-3">Opérateur</h3>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-xl font-bold text-orange-600">
                    {project.operateur.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{project.operateur}</p>
                    <p className="text-xs text-green-600 font-medium">✓ Certifié TerraCi</p>
                  </div>
                </div>
                <Link
                  to={`/operator/${project.operateur_id}`}
                  className="btn-primary w-full py-2.5 text-sm flex items-center justify-center gap-2"
                >
                  🏢 Voir le profil complet
                </Link>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                <h3 className="font-bold text-gray-900 mb-3">Avancement</h3>
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-gray-100 rounded-full h-3">
                    <div className="bg-orange-500 h-3 rounded-full" style={{ width: `${project.avancement}%` }}></div>
                  </div>
                  <span className="font-bold text-orange-600 text-sm">{project.avancement}%</span>
                </div>
                <p className="text-xs text-gray-400 mt-2">Viabilisation et aménagement</p>
              </div>
            </div>
          </div>
        )}

        {/* ===== ONGLET PLAN DES LOTS ===== */}
        {onglet === "lots" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between flex-wrap gap-3">
                  <h2 className="font-bold text-gray-900">Plan interactif du lotissement</h2>
                  <div className="flex items-center gap-4 text-xs">
                    <span className="flex items-center gap-1"><span className="w-3 h-3 bg-green-500 rounded inline-block"></span> Disponible</span>
                    <span className="flex items-center gap-1"><span className="w-3 h-3 bg-orange-400 rounded inline-block"></span> Réservé</span>
                    <span className="flex items-center gap-1"><span className="w-3 h-3 bg-blue-500 rounded inline-block"></span> Vendu</span>
                  </div>
                </div>

                {/* Filtre */}
                <div className="px-5 py-3 border-b border-gray-100 flex gap-2">
                  {["tous", "disponible", "reserve", "vendu"].map((f) => (
                    <button key={f} onClick={() => setFiltreStatutLot(f)}
                      className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${
                        filtreStatutLot === f ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                      }`}>
                      {f === "tous" ? "Tous" : f === "disponible" ? "Disponibles" : f === "reserve" ? "Réservés" : "Vendus"}
                    </button>
                  ))}
                </div>

                {/* Plan par blocs */}
                <div className="p-5 space-y-6 overflow-y-auto max-h-[500px]">
                  {blocs.map((bloc) => {
                    const lotsBloc = project.lots.filter((l) =>
                      l.bloc === bloc && (filtreStatutLot === "tous" || l.statut === filtreStatutLot)
                    );
                    if (lotsBloc.length === 0) return null;
                    return (
                      <div key={bloc}>
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                          BLOC {bloc}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {lotsBloc.map((lot) => {
                            const sc = STATUT_LOT[lot.statut];
                            const isSelected = lotSelectionne?.id === lot.id;
                            return (
                              <button
                                key={lot.id}
                                onClick={() => lot.statut !== "vendu" && setLotSelectionne(isSelected ? null : lot)}
                                disabled={lot.statut === "vendu"}
                                className={`w-12 h-10 rounded-lg text-xs font-bold transition-all ${sc.color} ${sc.text} ${
                                  isSelected ? "ring-2 ring-offset-1 ring-gray-800 scale-110" : ""
                                } ${lot.statut === "vendu" ? "cursor-not-allowed opacity-70" : "cursor-pointer"}`}
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
            </div>

            {/* Panneau détail lot */}
            <div>
              {!lotSelectionne ? (
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 text-center h-64 flex flex-col items-center justify-center">
                  <div className="text-4xl mb-3">👆</div>
                  <p className="text-gray-500 font-medium">Cliquez sur un lot</p>
                  <p className="text-gray-400 text-sm mt-1">pour voir ses détails</p>
                </div>
              ) : (
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden sticky top-20">
                  <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                    <h3 className="font-bold text-gray-900">LOT {lotSelectionne.id}</h3>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        lotSelectionne.statut === "disponible" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
                      }`}>
                        {STATUT_LOT[lotSelectionne.statut].label}
                      </span>
                      <button onClick={() => setLotSelectionne(null)} className="text-gray-400 hover:text-gray-600">✕</button>
                    </div>
                  </div>
                  <div className="p-5 space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { label: "Superficie", value: `${lotSelectionne.superficie} m²` },
                        { label: "Dimensions", value: lotSelectionne.dimensions },
                        { label: "Bloc", value: `Bloc ${lotSelectionne.bloc}` },
                        { label: "Référence", value: lotSelectionne.id },
                      ].map((item) => (
                        <div key={item.label} className="bg-gray-50 rounded-lg p-3">
                          <p className="text-xs text-gray-400">{item.label}</p>
                          <p className="text-sm font-semibold text-gray-800">{item.value}</p>
                        </div>
                      ))}
                    </div>
                    <div className="bg-orange-50 rounded-xl p-4 text-center">
                      <p className="text-xs text-gray-500 mb-1">Prix</p>
                      <p className="text-2xl font-bold text-orange-500">
                        {lotSelectionne.prix.toLocaleString("fr-FR")} FCFA
                      </p>
                    </div>
                    {lotSelectionne.statut === "disponible" && (
                      <div className="space-y-2">
                        <Link
                          to={`/operator/${project.operateur_id}`}
                          className="btn-primary w-full py-3 text-sm flex items-center justify-center gap-2"
                        >
                          💬 Réserver ce lot
                        </Link>
                        <Link
                          to={`/operator/${project.operateur_id}`}
                          className="btn-outline w-full py-2.5 text-sm flex items-center justify-center gap-2"
                        >
                          📞 Contacter l'opérateur
                        </Link>
                      </div>
                    )}
                    {lotSelectionne.statut === "reserve" && (
                      <p className="text-center text-sm text-orange-600 bg-orange-50 p-3 rounded-lg">
                        ⏳ Ce lot est actuellement réservé. Contactez l'opérateur pour la liste d'attente.
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ===== ONGLET DOCUMENTS ===== */}
        {onglet === "documents" && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100">
              <h2 className="font-bold text-gray-900">Documents du projet</h2>
              <p className="text-sm text-gray-500 mt-1">
                Liste des documents légaux. Les documents cochés sont disponibles et vérifiés par TerraCi.
              </p>
            </div>
            <div className="p-5">
              {/* Résumé */}
              <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg mb-5 text-sm">
                <span className="text-green-600 font-medium">
                  ✓ {project.documents.filter((d) => d.disponible).length} documents disponibles
                </span>
                <span className="text-gray-400">·</span>
                <span className="text-red-500">
                  ✗ {project.documents.filter((d) => !d.disponible).length} manquant(s)
                </span>
              </div>

              <div className="space-y-2">
                {project.documents.map((doc) => (
                  <div key={doc.id}
                    className={`flex items-center justify-between p-4 rounded-xl border transition-colors ${
                      doc.disponible ? "border-green-200 bg-green-50" : "border-red-100 bg-red-50"
                    }`}>
                    <div className="flex items-center gap-3">
                      {/* Checkbox visuel — lecture seule pour l'acheteur */}
                      <div className={`w-5 h-5 rounded flex items-center justify-center shrink-0 ${
                        doc.disponible ? "bg-green-500" : "bg-gray-200"
                      }`}>
                        {doc.disponible && <span className="text-white text-xs font-bold">✓</span>}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">{doc.nom}</p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {doc.obligatoire ? "Obligatoire" : "Complémentaire"} ·{" "}
                          {doc.disponible ? "Vérifié par TerraCi" : "Non fourni"}
                        </p>
                      </div>
                    </div>
                    <div className="shrink-0">
                      {doc.disponible ? (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                          ✓ Disponible
                        </span>
                      ) : (
                        <span className="text-xs bg-red-100 text-red-500 px-2 py-1 rounded-full font-medium">
                          ✗ Manquant
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 p-4 bg-blue-50 border border-blue-200 rounded-xl text-sm text-blue-700">
                ℹ️ Les documents sont vérifiés par les administrateurs TerraCi avant validation du projet. Pour consulter les documents originaux, contactez directement l'opérateur.
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Modal Géolocalisation */}
      {showMapModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <div>
                <h3 className="font-bold text-gray-900">Localisation du projet</h3>
                <p className="text-xs text-gray-400 mt-0.5">{project.adresse}, {project.ville}</p>
              </div>
              <button onClick={() => setShowMapModal(false)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">X</button>
            </div>
            <div className="p-5">
              <div className="rounded-xl overflow-hidden border border-gray-200" style={{ height: 350 }}>
                <iframe
                  title="Localisation projet"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  src={"https://www.google.com/maps?q=" + project.coordonnees.lat + "," + project.coordonnees.lng + "&z=15&output=embed"}
                ></iframe>
              </div>
              <div className="flex gap-3 mt-4">
                
                  href={"https://www.google.com/maps?q=" + project.coordonnees.lat + "," + project.coordonnees.lng}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary text-sm px-5 py-2.5 flex items-center gap-2 flex-1 justify-center"
                <a>
                  Ouvrir dans Google Maps
                </a>
                <button onClick={() => setShowMapModal(false)} className="btn-outline text-sm px-5 py-2.5">
                  Fermer
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