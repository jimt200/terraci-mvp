import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const ETAPES = [
  { num: 1, label: "Informations générales" },
  { num: 2, label: "Localisation" },
  { num: 3, label: "Lots et prix" },
  { num: 4, label: "Documents" },
  { num: 5, label: "Récapitulatif" },
];

const DOCUMENTS_REQUIS = [
  { id: 1, nom: "Titre foncier", obligatoire: true, description: "Document officiel attestant la propriété du terrain" },
  { id: 2, nom: "Plan de lotissement", obligatoire: true, description: "Plan certifié par un géomètre agréé" },
  { id: 3, nom: "Arrêté de morcellement", obligatoire: true, description: "Autorisation officielle de morcellement" },
  { id: 4, nom: "Étude d'impact environnemental", obligatoire: true, description: "Étude EIE validée par le ministère" },
  { id: 5, nom: "Registre de commerce", obligatoire: true, description: "RC de la société opératrice" },
  { id: 6, nom: "Attestation fiscale", obligatoire: true, description: "Attestation de régularité fiscale" },
  { id: 7, nom: "Plan de viabilisation", obligatoire: false, description: "Plan des réseaux eau, électricité, voirie" },
  { id: 8, nom: "Convention de vente type", obligatoire: false, description: "Modèle de contrat de vente proposé aux acheteurs" },
];

export default function CreateProject() {
  const navigate = useNavigate();
  const [etape, setEtape] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    titre: "", description: "", ville: "", commune: "", region: "",
    adresse: "", coordLat: "", coordLng: "",
    lots_total: "", superficie_totale: "", prix_min: "", prix_max: "",
    features: [],
    documents: DOCUMENTS_REQUIS.map((d) => ({ ...d, fichier: null, coché: false })),
  });

  const updateForm = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const toggleFeature = (f) => {
    setForm((prev) => ({
      ...prev,
      features: prev.features.includes(f)
        ? prev.features.filter((x) => x !== f)
        : [...prev.features, f]
    }));
  };

  const updateDocument = (id, field, value) => {
    setForm((prev) => ({
      ...prev,
      documents: prev.documents.map((d) =>
        d.id === id ? { ...d, [field]: value } : d
      )
    }));
  };

  const handleFileUpload = (id, file) => {
    updateDocument(id, "fichier", file);
    if (file) updateDocument(id, "coché", true);
  };

  const docsObligatoires = form.documents.filter((d) => d.obligatoire);
  const docsCompletes = docsObligatoires.filter((d) => d.fichier).length;
  const peutSoumettre = docsCompletes === docsObligatoires.length;

  const handleSubmit = () => {
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl shadow-lg p-10 max-w-md w-full text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Projet soumis !</h2>
            <p className="text-gray-500 mb-2">
              Votre projet <strong>{form.titre || "sans titre"}</strong> a été soumis avec succès.
            </p>
            <p className="text-sm text-gray-400 mb-8">
              Un administrateur TerraCi va examiner votre dossier et vous notifier de sa décision sous 5 à 7 jours ouvrés.
            </p>
            <div className="space-y-3">
              <Link to="/dashboard-operator" className="btn-primary w-full py-3 block text-center">
                Retour au dashboard
              </Link>
              <button onClick={() => { setSubmitted(false); setEtape(1); }}
                className="btn-outline w-full py-3">
                Créer un autre projet
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8">

        {/* Breadcrumb */}
        <nav className="text-xs text-gray-400 mb-6">
          <Link to="/dashboard-operator" className="hover:text-orange-500">Dashboard</Link>
          <span className="mx-2">›</span>
          <span className="text-gray-700">Nouveau projet</span>
        </nav>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">Déposer un nouveau projet</h1>
        <p className="text-gray-500 text-sm mb-8">Remplissez les 5 étapes pour soumettre votre projet à validation.</p>

        {/* Stepper */}
        <div className="flex items-center justify-between mb-10 overflow-x-auto pb-2">
          {ETAPES.map((e, i) => (
            <div key={e.num} className="flex items-center">
              <div className="flex flex-col items-center">
                <button
                  onClick={() => e.num < etape && setEtape(e.num)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                    etape === e.num ? "bg-orange-500 text-white shadow-lg scale-110" :
                    etape > e.num ? "bg-green-500 text-white" :
                    "bg-gray-200 text-gray-400"
                  }`}
                >
                  {etape > e.num ? "✓" : e.num}
                </button>
                <span className={`text-xs mt-1 whitespace-nowrap ${etape === e.num ? "text-orange-500 font-medium" : "text-gray-400"}`}>
                  {e.label}
                </span>
              </div>
              {i < ETAPES.length - 1 && (
                <div className={`h-0.5 w-12 sm:w-20 mx-1 mb-4 transition-colors ${etape > e.num ? "bg-green-400" : "bg-gray-200"}`}></div>
              )}
            </div>
          ))}
        </div>

        {/* Contenu étapes */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-6">

          {/* ÉTAPE 1 — Infos générales */}
          {etape === 1 && (
            <div className="space-y-5">
              <h2 className="font-bold text-gray-900 text-lg">Informations générales</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Nom du projet <span className="text-red-400">*</span>
                </label>
                <input type="text" placeholder="Ex: Résidence Les Cocotiers"
                  value={form.titre} onChange={(e) => updateForm("titre", e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
                <textarea rows={4} placeholder="Décrivez votre projet foncier..."
                  value={form.description} onChange={(e) => updateForm("description", e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Prix minimum (FCFA)</label>
                  <input type="number" placeholder="Ex: 10000000"
                    value={form.prix_min} onChange={(e) => updateForm("prix_min", e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Prix maximum (FCFA)</label>
                  <input type="number" placeholder="Ex: 20000000"
                    value={form.prix_max} onChange={(e) => updateForm("prix_max", e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Nombre de lots</label>
                  <input type="number" placeholder="Ex: 45"
                    value={form.lots_total} onChange={(e) => updateForm("lots_total", e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Superficie totale</label>
                  <input type="text" placeholder="Ex: 2.3 ha"
                    value={form.superficie_totale} onChange={(e) => updateForm("superficie_totale", e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Équipements disponibles</label>
                <div className="flex flex-wrap gap-3">
                  {["Eau potable", "Électricité", "Voirie bitumée", "Gardiennage", "Clôture", "Espace vert"].map((f) => (
                    <label key={f} className="flex items-center gap-2 text-sm cursor-pointer p-2 rounded-lg hover:bg-gray-50 border border-gray-100">
                      <input type="checkbox" checked={form.features.includes(f)}
                        onChange={() => toggleFeature(f)} className="accent-orange-500 rounded" />
                      {f}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ÉTAPE 2 — Localisation */}
          {etape === 2 && (
            <div className="space-y-5">
              <h2 className="font-bold text-gray-900 text-lg">Localisation du projet</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Ville <span className="text-red-400">*</span></label>
                  <select value={form.ville} onChange={(e) => updateForm("ville", e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400">
                    <option value="">Choisir...</option>
                    {["Abidjan", "Bouaké", "Yamoussoukro", "San-Pédro", "Korhogo", "Grand-Bassam", "Man", "Daloa"].map((v) => (
                      <option key={v} value={v}>{v}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Commune / Quartier</label>
                  <input type="text" placeholder="Ex: Cocody Riviera 3"
                    value={form.commune} onChange={(e) => updateForm("commune", e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Région</label>
                  <select value={form.region} onChange={(e) => updateForm("region", e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400">
                    <option value="">Choisir...</option>
                    {["Lagunes", "Gbêkê", "Sud-Comoé", "Lacs", "San-Pédro", "Hambol", "Tonkpi", "Haut-Sassandra"].map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Adresse précise</label>
                  <input type="text" placeholder="Rue, Avenue..."
                    value={form.adresse} onChange={(e) => updateForm("adresse", e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
                </div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <h3 className="font-medium text-blue-800 mb-3 text-sm">📍 Coordonnées GPS (optionnel)</h3>
                <p className="text-xs text-blue-600 mb-3">
                  Ajoutez les coordonnées pour que les acheteurs puissent localiser le projet sur la carte.
                  Trouvez-les sur Google Maps en faisant un clic droit sur le terrain.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-blue-700 mb-1">Latitude</label>
                    <input type="text" placeholder="Ex: 5.3600"
                      value={form.coordLat} onChange={(e) => updateForm("coordLat", e.target.value)}
                      className="w-full border border-blue-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-blue-700 mb-1">Longitude</label>
                    <input type="text" placeholder="Ex: -3.9800"
                      value={form.coordLng} onChange={(e) => updateForm("coordLng", e.target.value)}
                      className="w-full border border-blue-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ÉTAPE 3 — Lots */}
          {etape === 3 && (
            <div className="space-y-5">
              <h2 className="font-bold text-gray-900 text-lg">Configuration des lots</h2>
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 text-sm text-orange-700">
                💡 Vous pourrez ajouter et gérer les lots individuellement depuis votre dashboard après validation du projet, via la page <strong>"Gestion des Lots"</strong>.
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Nombre total de lots prévus</label>
                  <input type="number" placeholder="Ex: 120"
                    value={form.lots_total} onChange={(e) => updateForm("lots_total", e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Types de lots proposés</label>
                <div className="space-y-3">
                  {[
                    { label: "Lots standards", desc: "200 à 300 m²", icon: "🟦" },
                    { label: "Lots grandes superficies", desc: "300 à 500 m²", icon: "🟩" },
                    { label: "Lots angles / coins", desc: "Prix premium", icon: "🟧" },
                  ].map((type) => (
                    <label key={type.label} className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                      <input type="checkbox" className="accent-orange-500 w-4 h-4" />
                      <span className="text-lg">{type.icon}</span>
                      <div>
                        <p className="text-sm font-medium text-gray-800">{type.label}</p>
                        <p className="text-xs text-gray-400">{type.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ÉTAPE 4 — Documents */}
          {etape === 4 && (
            <div className="space-y-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-bold text-gray-900 text-lg">Documents du projet</h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Uploadez les documents officiels. Les documents obligatoires sont requis pour la validation.
                  </p>
                </div>
                <div className="shrink-0 text-center bg-orange-50 rounded-xl px-4 py-2 border border-orange-200">
                  <p className="text-xl font-bold text-orange-500">{docsCompletes}/{docsObligatoires.length}</p>
                  <p className="text-xs text-gray-500">obligatoires</p>
                </div>
              </div>

              {/* Barre de progression */}
              <div>
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Progression</span>
                  <span>{Math.round((docsCompletes / docsObligatoires.length) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="bg-orange-500 h-2 rounded-full transition-all"
                    style={{ width: `${(docsCompletes / docsObligatoires.length) * 100}%` }}>
                  </div>
                </div>
              </div>

              {/* Liste documents */}
              <div className="space-y-3">
                {form.documents.map((doc) => (
                  <div key={doc.id}
                    className={`border rounded-xl p-4 transition-colors ${
                      doc.fichier ? "border-green-200 bg-green-50" :
                      doc.obligatoire ? "border-orange-200 bg-orange-50" : "border-gray-200 bg-white"
                    }`}>
                    <div className="flex items-start gap-3">
                      {/* Checkbox statut */}
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                        doc.fichier ? "bg-green-500" : "bg-gray-200"
                      }`}>
                        {doc.fichier
                          ? <span className="text-white text-xs font-bold">✓</span>
                          : <span className="text-gray-400 text-xs">{doc.id}</span>
                        }
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <p className="text-sm font-semibold text-gray-800">{doc.nom}</p>
                          {doc.obligatoire
                            ? <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded font-medium">Obligatoire</span>
                            : <span className="text-xs bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">Optionnel</span>
                          }
                        </div>
                        <p className="text-xs text-gray-400 mb-3">{doc.description}</p>

                        {/* Zone upload */}
                        {doc.fichier ? (
                          <div className="flex items-center justify-between bg-white rounded-lg px-3 py-2 border border-green-200">
                            <div className="flex items-center gap-2">
                              <span className="text-green-500">📄</span>
                              <span className="text-xs text-gray-700 truncate max-w-[180px]">{doc.fichier.name}</span>
                            </div>
                            <button
                              onClick={() => handleFileUpload(doc.id, null)}
                              className="text-red-400 hover:text-red-600 text-xs ml-2 shrink-0"
                            >
                              ✕ Supprimer
                            </button>
                          </div>
                        ) : (
                          <label className="flex items-center gap-2 cursor-pointer">
                            <div className="flex-1 border-2 border-dashed border-gray-300 hover:border-orange-400 rounded-lg px-4 py-3 text-center transition-colors hover:bg-orange-50">
                              <p className="text-xs text-gray-400">📎 Cliquer pour uploader le PDF</p>
                              <p className="text-xs text-gray-300 mt-0.5">PDF, max 10 MB</p>
                            </div>
                            <input
                              type="file"
                              accept=".pdf,.jpg,.jpeg,.png"
                              className="hidden"
                              onChange={(e) => e.target.files[0] && handleFileUpload(doc.id, e.target.files[0])}
                            />
                          </label>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {!peutSoumettre && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 text-sm text-yellow-700">
                  ⚠️ Il vous manque encore {docsObligatoires.length - docsCompletes} document(s) obligatoire(s) pour pouvoir soumettre.
                </div>
              )}
            </div>
          )}

          {/* ÉTAPE 5 — Récapitulatif */}
          {etape === 5 && (
            <div className="space-y-5">
              <h2 className="font-bold text-gray-900 text-lg">Récapitulatif avant soumission</h2>

              {[
                {
                  titre: "Informations générales",
                  items: [
                    { label: "Nom du projet", value: form.titre || "—" },
                    { label: "Prix min", value: form.prix_min ? `${parseInt(form.prix_min).toLocaleString()} FCFA` : "—" },
                    { label: "Prix max", value: form.prix_max ? `${parseInt(form.prix_max).toLocaleString()} FCFA` : "—" },
                    { label: "Nombre de lots", value: form.lots_total || "—" },
                    { label: "Superficie", value: form.superficie_totale || "—" },
                  ]
                },
                {
                  titre: "Localisation",
                  items: [
                    { label: "Ville", value: form.ville || "—" },
                    { label: "Commune", value: form.commune || "—" },
                    { label: "Région", value: form.region || "—" },
                    { label: "GPS", value: form.coordLat ? `${form.coordLat}, ${form.coordLng}` : "Non renseigné" },
                  ]
                },
                {
                  titre: "Documents",
                  items: form.documents.map((d) => ({
                    label: d.nom,
                    value: d.fichier ? `✓ ${d.fichier.name}` : d.obligatoire ? "⚠️ Manquant" : "— Non fourni"
                  }))
                }
              ].map((section) => (
                <div key={section.titre} className="bg-gray-50 rounded-xl p-4">
                  <h3 className="font-semibold text-gray-700 mb-3 text-sm">{section.titre}</h3>
                  <div className="space-y-2">
                    {section.items.map((item) => (
                      <div key={item.label} className="flex justify-between text-sm">
                        <span className="text-gray-500">{item.label}</span>
                        <span className={`font-medium ${
                          item.value.includes("⚠️") ? "text-red-500" :
                          item.value.startsWith("✓") ? "text-green-600" : "text-gray-800"
                        }`}>
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-700">
                ℹ️ En soumettant ce projet, vous certifiez que toutes les informations sont exactes et que vous êtes habilité à déposer ce dossier. L'examen prend 5 à 7 jours ouvrés.
              </div>
            </div>
          )}
        </div>

        {/* Navigation étapes */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setEtape((e) => Math.max(1, e - 1))}
            disabled={etape === 1}
            className={`px-6 py-3 rounded-xl text-sm font-medium transition-all ${
              etape === 1 ? "opacity-0 pointer-events-none" : "btn-outline"
            }`}
          >
            ← Précédent
          </button>

          <div className="flex gap-1.5">
            {ETAPES.map((e) => (
              <div key={e.num} className={`w-2 h-2 rounded-full transition-all ${
                etape === e.num ? "bg-orange-500 w-6" : etape > e.num ? "bg-green-400" : "bg-gray-200"
              }`}></div>
            ))}
          </div>

          {etape < 5 ? (
            <button
              onClick={() => setEtape((e) => Math.min(5, e + 1))}
              className="btn-primary px-6 py-3 text-sm"
            >
              Suivant →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!peutSoumettre}
              className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all ${
                peutSoumettre
                  ? "bg-green-600 hover:bg-green-700 text-white shadow-md"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
            >
              🚀 Soumettre le projet
            </button>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}