// src/pages/DetailedExam.jsx
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const examData = {
  1: {
    projet: "Résidence Les Cocotiers",
    operateur: "KOUADIO IMMOBILIER",
    ville: "Abidjan",
    region: "Lagunes",
    lots: 45,
    superficie: "2.3 ha",
    prix_min: 12000000,
    prix_max: 18000000,
    dateDepot: "2024-01-15",
    description:
      "Projet résidentiel haut standing situé dans la commune de Cocody, Abidjan. Accès facile aux grandes artères, à proximité des écoles internationales et centres commerciaux.",
    statut: "en_attente",
    documents: [
      { id: 1, nom: "Titre foncier", type: "PDF", taille: "2.4 MB", valide: true, date: "2024-01-10" },
      { id: 2, nom: "Plan de lotissement", type: "PDF", taille: "8.1 MB", valide: true, date: "2024-01-10" },
      { id: 3, nom: "Arrêté de morcellement", type: "PDF", taille: "1.2 MB", valide: true, date: "2024-01-11" },
      { id: 4, nom: "Étude d'impact environnemental", type: "PDF", taille: "5.6 MB", valide: true, date: "2024-01-12" },
      { id: 5, nom: "Registre de commerce opérateur", type: "PDF", taille: "0.8 MB", valide: true, date: "2024-01-10" },
      { id: 6, nom: "Attestation fiscale", type: "PDF", taille: "0.5 MB", valide: false, date: "2024-01-13" },
      { id: 7, nom: "Plan de viabilisation", type: "PDF", taille: "3.2 MB", valide: true, date: "2024-01-14" },
      { id: 8, nom: "Convention de vente type", type: "PDF", taille: "1.0 MB", valide: true, date: "2024-01-15" },
    ],
    historique: [
      { date: "2024-01-15", action: "Dépôt du dossier", auteur: "KOUADIO IMMOBILIER", type: "depot" },
      { date: "2024-01-16", action: "Accusé de réception envoyé", auteur: "Système", type: "systeme" },
      { date: "2024-01-17", action: "Affecté à l'examinateur DIALLO K.", auteur: "Admin Koné", type: "affectation" },
    ],
    note_operateur: 4.2,
    projets_precedents: 7,
    conformite: 92,
  },
};

const defaultData = examData[1];

export default function DetailedExam() {
  const { id } = useParams();
  const data = examData[id] || defaultData;

  const [docSelectionne, setDocSelectionne] = useState(data.documents[0]);
  const [decision, setDecision] = useState("");
  const [commentaire, setCommentaire] = useState("");
  const [complementsNecessaires, setComplementsNecessaires] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [ongletCentre, setOngletCentre] = useState("infos");

  const complementsOptions = [
    "Attestation fiscale mise à jour",
    "Plan cadastral certifié",
    "Étude géotechnique",
    "Permis de construire",
    "Caution bancaire",
    "Photos du terrain",
  ];

  const toggleComplement = (c) => {
    setComplementsNecessaires((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
    );
  };

  const handleSubmit = () => {
    if (!decision || !commentaire) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl shadow-lg p-10 max-w-md w-full text-center">
            <div className="text-5xl mb-4">
              {decision === "approuver" ? "✅" : decision === "complements" ? "📋" : "❌"}
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              {decision === "approuver"
                ? "Projet approuvé !"
                : decision === "complements"
                ? "Compléments demandés"
                : "Projet rejeté"}
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              Votre décision a été enregistrée et l'opérateur sera notifié.
            </p>
            <Link to="/validation-queue" className="btn-primary px-6 py-2">
              ← Retour à la file
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-1 max-w-screen-xl mx-auto w-full px-4 py-6">
        {/* Breadcrumb + titre */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <nav className="text-xs text-gray-400 mb-1">
              <Link to="/dashboard-admin" className="hover:text-orange-500">Admin</Link>
              <span className="mx-1">›</span>
              <Link to="/validation-queue" className="hover:text-orange-500">File de validation</Link>
              <span className="mx-1">›</span>
              <span className="text-gray-700">Examen</span>
            </nav>
            <h1 className="text-xl font-bold text-gray-900">{data.projet}</h1>
            <p className="text-sm text-gray-500">{data.operateur} · {data.ville}, {data.region}</p>
          </div>
          <div className="flex gap-2">
            <span className="bg-yellow-100 text-yellow-700 text-xs font-medium px-3 py-1.5 rounded-full">
              ⏳ En attente de décision
            </span>
          </div>
        </div>

        {/* Layout 3 panneaux */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">

          {/* PANNEAU GAUCHE — Documents */}
          <div className="lg:col-span-3 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
              <h2 className="font-semibold text-gray-800 text-sm">📁 Documents ({data.documents.length})</h2>
            </div>
            <ul className="divide-y divide-gray-100">
              {data.documents.map((doc) => (
                <li
                  key={doc.id}
                  onClick={() => setDocSelectionne(doc)}
                  className={`px-4 py-3 cursor-pointer hover:bg-orange-50 transition-colors ${
                    docSelectionne?.id === doc.id ? "bg-orange-50 border-l-2 border-orange-500" : ""
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-800 truncate">{doc.nom}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{doc.taille} · {doc.date}</p>
                    </div>
                    <span className={`text-xs mt-0.5 shrink-0 ${doc.valide ? "text-green-500" : "text-red-400"}`}>
                      {doc.valide ? "✓" : "⚠"}
                    </span>
                  </div>
                </li>
              ))}
            </ul>

            {/* Viewer simulé */}
            {docSelectionne && (
              <div className="border-t border-gray-100 p-4">
                <div className="bg-gray-100 rounded-lg p-4 text-center">
                  <div className="text-3xl mb-2">📄</div>
                  <p className="text-xs font-medium text-gray-700">{docSelectionne.nom}</p>
                  <p className="text-xs text-gray-400 mt-1">{docSelectionne.taille}</p>
                  <button className="mt-3 text-xs bg-orange-500 text-white px-3 py-1.5 rounded-lg hover:bg-orange-600 w-full">
                    Ouvrir le PDF
                  </button>
                  <div className={`mt-2 text-xs font-medium ${docSelectionne.valide ? "text-green-600" : "text-red-500"}`}>
                    {docSelectionne.valide ? "✓ Document valide" : "⚠ À vérifier"}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* PANNEAU CENTRE — Infos projet */}
          <div className="lg:col-span-5 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            {/* Onglets */}
            <div className="flex border-b border-gray-100">
              {[
                { key: "infos", label: "📋 Infos projet" },
                { key: "operateur", label: "🏢 Opérateur" },
                { key: "historique", label: "🕐 Historique" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setOngletCentre(tab.key)}
                  className={`flex-1 px-3 py-3 text-xs font-medium transition-colors ${
                    ongletCentre === tab.key
                      ? "border-b-2 border-orange-500 text-orange-600 bg-orange-50"
                      : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="p-5">
              {/* Onglet Infos */}
              {ongletCentre === "infos" && (
                <div className="space-y-5">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{data.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: "Nombre de lots", value: data.lots },
                      { label: "Superficie", value: data.superficie },
                      { label: "Prix min", value: `${(data.prix_min / 1000000).toFixed(0)} M FCFA` },
                      { label: "Prix max", value: `${(data.prix_max / 1000000).toFixed(0)} M FCFA` },
                      { label: "Ville", value: data.ville },
                      { label: "Région", value: data.region },
                    ].map((item) => (
                      <div key={item.label} className="bg-gray-50 rounded-lg p-3">
                        <p className="text-xs text-gray-400">{item.label}</p>
                        <p className="text-sm font-semibold text-gray-800 mt-0.5">{item.value}</p>
                      </div>
                    ))}
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">État des documents</h3>
                    <div className="space-y-1.5">
                      {data.documents.map((doc) => (
                        <div key={doc.id} className="flex items-center justify-between text-xs py-1">
                          <span className="text-gray-700">{doc.nom}</span>
                          <span className={doc.valide ? "text-green-600 font-medium" : "text-red-500 font-medium"}>
                            {doc.valide ? "✓ OK" : "⚠ Problème"}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Onglet Opérateur */}
              {ongletCentre === "operateur" && (
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center text-xl font-bold text-orange-600">
                      {data.operateur.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{data.operateur}</p>
                      <p className="text-xs text-gray-500">Opérateur certifié</p>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="text-yellow-400">★★★★</span>
                        <span className="text-xs text-gray-500">{data.note_operateur}/5</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="bg-green-50 rounded-lg p-3">
                      <p className="text-lg font-bold text-green-600">{data.projets_precedents}</p>
                      <p className="text-xs text-gray-500">Projets réalisés</p>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-3">
                      <p className="text-lg font-bold text-blue-600">{data.conformite}%</p>
                      <p className="text-xs text-gray-500">Conformité</p>
                    </div>
                    <div className="bg-orange-50 rounded-lg p-3">
                      <p className="text-lg font-bold text-orange-600">0</p>
                      <p className="text-xs text-gray-500">Litiges</p>
                    </div>
                  </div>

                  <div className="text-xs text-gray-500 space-y-2">
                    <div className="flex justify-between py-1.5 border-b border-gray-100">
                      <span>Statut</span>
                      <span className="text-green-600 font-medium">Certifié ✓</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-gray-100">
                      <span>Membre depuis</span>
                      <span className="font-medium text-gray-700">Mars 2021</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-gray-100">
                      <span>Dernière mise à jour</span>
                      <span className="font-medium text-gray-700">Déc. 2023</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Onglet Historique */}
              {ongletCentre === "historique" && (
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900">Historique du dossier</h3>
                  <div className="relative">
                    <div className="absolute left-3 top-0 bottom-0 w-px bg-gray-200"></div>
                    <div className="space-y-4 pl-8">
                      {data.historique.map((evt, i) => (
                        <div key={i} className="relative">
                          <div className={`absolute -left-5 top-1 w-3 h-3 rounded-full border-2 border-white ${
                            evt.type === "depot" ? "bg-blue-400" :
                            evt.type === "systeme" ? "bg-gray-400" : "bg-orange-400"
                          }`}></div>
                          <div className="bg-gray-50 rounded-lg p-3">
                            <p className="text-xs font-medium text-gray-800">{evt.action}</p>
                            <div className="flex justify-between mt-1">
                              <span className="text-xs text-gray-400">{evt.auteur}</span>
                              <span className="text-xs text-gray-400">{new Date(evt.date).toLocaleDateString("fr-FR")}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* PANNEAU DROITE — Décision */}
          <div className="lg:col-span-4 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
              <h2 className="font-semibold text-gray-800 text-sm">⚖️ Décision d'examen</h2>
            </div>
            <div className="p-5 space-y-5">
              {/* Choix décision */}
              <div>
                <p className="text-xs font-semibold text-gray-600 mb-3 uppercase tracking-wide">Votre décision</p>
                <div className="space-y-2">
                  {[
                    { value: "approuver", label: "✅ Approuver le projet", color: "border-green-300 bg-green-50", activeColor: "border-green-500 bg-green-100", textColor: "text-green-700" },
                    { value: "complements", label: "📋 Demander des compléments", color: "border-blue-300 bg-blue-50", activeColor: "border-blue-500 bg-blue-100", textColor: "text-blue-700" },
                    { value: "rejeter", label: "❌ Rejeter le dossier", color: "border-red-300 bg-red-50", activeColor: "border-red-500 bg-red-100", textColor: "text-red-700" },
                  ].map((opt) => (
                    <label
                      key={opt.value}
                      className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                        decision === opt.value ? opt.activeColor : opt.color + " hover:opacity-90"
                      }`}
                    >
                      <input
                        type="radio"
                        name="decision"
                        value={opt.value}
                        checked={decision === opt.value}
                        onChange={() => setDecision(opt.value)}
                        className="accent-orange-500"
                      />
                      <span className={`text-sm font-medium ${opt.textColor}`}>{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Compléments nécessaires */}
              {decision === "complements" && (
                <div>
                  <p className="text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">
                    Documents manquants
                  </p>
                  <div className="space-y-1.5">
                    {complementsOptions.map((c) => (
                      <label key={c} className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={complementsNecessaires.includes(c)}
                          onChange={() => toggleComplement(c)}
                          className="accent-orange-500 rounded"
                        />
                        {c}
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Commentaire */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">
                  Commentaire <span className="text-red-400">*</span>
                </label>
                <textarea
                  value={commentaire}
                  onChange={(e) => setCommentaire(e.target.value)}
                  rows={4}
                  placeholder="Justifiez votre décision en détail..."
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
                />
                <p className="text-xs text-gray-400 mt-1">{commentaire.length}/500 caractères</p>
              </div>

              {/* Score de confiance */}
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs font-semibold text-gray-600 mb-2">Score de conformité</p>
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${data.conformite}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-bold text-green-600">{data.conformite}%</span>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  {data.documents.filter((d) => d.valide).length}/{data.documents.length} documents valides
                </p>
              </div>

              {/* Bouton soumettre */}
              <button
                onClick={handleSubmit}
                disabled={!decision || !commentaire}
                className={`w-full py-3 rounded-xl text-sm font-semibold transition-all ${
                  decision && commentaire
                    ? "bg-orange-500 hover:bg-orange-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
              >
                {!decision
                  ? "Choisissez une décision"
                  : !commentaire
                  ? "Ajoutez un commentaire"
                  : "✓ Soumettre la décision"}
              </button>

              <p className="text-xs text-gray-400 text-center">
                Cette décision sera enregistrée et horodatée.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}