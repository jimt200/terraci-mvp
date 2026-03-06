import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const operatorsPublicData = {
  1: {
    id: 1,
    nom: "KOUADIO IMMOBILIER",
    responsable: "Kouadio Serge",
    slogan: "Votre partenaire de confiance pour l'immobilier en Côte d'Ivoire",
    email: "contact@kouadio-immo.ci",
    telephone: "+225 07 12 34 56",
    whatsapp: "+225 07 12 34 56",
    ville: "Abidjan",
    adresse: "Cocody Riviera 3, Rue des Jardins, Abidjan",
    depuis: "2021",
    certifie: true,
    note: 4.2,
    avis: 47,
    projets: 7,
    lotesVendus: 187,
    conformite: 92,
    description: "KOUADIO IMMOBILIER est une société spécialisée dans la promotion immobilière et la gestion de projets de lotissement en Côte d'Ivoire. Avec plus de 7 projets réalisés depuis 2021, nous accompagnons nos clients dans chaque étape de leur acquisition foncière.",
    specialites: ["Lotissements résidentiels", "Projets haut standing", "Zone Abidjan", "Accompagnement juridique"],
    projetsListe: [
      { id: 1, titre: "Résidence Les Cocotiers", ville: "Abidjan", lots: 45, statut: "actif", annee: "2024" },
      { id: 6, titre: "Résidence Harmonie", ville: "Abidjan", lots: 55, statut: "en_validation", annee: "2024" },
    ],
    avisClients: [
      { nom: "Kouamé A.", note: 5, texte: "Très professionnel, documents en ordre, livraison dans les délais.", date: "Jan 2024" },
      { nom: "Diabaté F.", note: 4, texte: "Bonne expérience globale. Processus clair et transparent.", date: "Déc 2023" },
      { nom: "Yao P.", note: 4, texte: "Équipe réactive et à l'écoute. Je recommande.", date: "Nov 2023" },
    ],
    reseaux: { facebook: "#", linkedin: "#", instagram: "#" }
  },
  2: {
    id: 2,
    nom: "AFRICA LAND CI",
    responsable: "Traoré Aminata",
    slogan: "L'immobilier accessible à tous les ivoiriens",
    email: "info@africaland.ci",
    telephone: "+225 05 98 76 54",
    whatsapp: "+225 05 98 76 54",
    ville: "Bouaké",
    adresse: "Quartier Commerce, Avenue Houphouët-Boigny, Bouaké",
    depuis: "2022",
    certifie: true,
    note: 3.8,
    avis: 23,
    projets: 4,
    lotesVendus: 94,
    conformite: 78,
    description: "AFRICA LAND CI opère principalement dans la région du Gbêkê avec une approche axée sur l'accessibilité et la transparence foncière.",
    specialites: ["Zone centre Côte d'Ivoire", "Lotissements économiques", "Projets région Bouaké"],
    projetsListe: [
      { id: 2, titre: "Lotissement Akwaba", ville: "Bouaké", lots: 60, statut: "en_validation", annee: "2024" },
    ],
    avisClients: [
      { nom: "Koné M.", note: 4, texte: "Bon suivi du dossier, équipe disponible.", date: "Jan 2024" },
    ],
    reseaux: { facebook: "#", linkedin: "#", instagram: "#" }
  }
};

const defaultOperator = operatorsPublicData[1];

export default function OperatorProfile() {
  const { id } = useParams();
  const op = operatorsPublicData[id] || defaultOperator;
  const [onglet, setOnglet] = useState("presentation");

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8">

        {/* Breadcrumb */}
        <nav className="text-sm text-gray-400 mb-6">
          <Link to="/search" className="hover:text-orange-500">Projets</Link>
          <span className="mx-2">›</span>
          <span className="text-gray-700">Profil opérateur</span>
        </nav>

        {/* Header opérateur */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mb-6">
          <div className="h-24 bg-gradient-to-r from-orange-500 to-orange-400"></div>
          <div className="px-6 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-10">
              <div className="flex items-end gap-4">
                <div className="w-20 h-20 bg-white rounded-2xl border-4 border-white shadow-md flex items-center justify-center text-3xl font-bold text-orange-500 shrink-0">
                  {op.nom.charAt(0)}
                </div>
                <div className="pb-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h1 className="text-xl font-bold text-gray-900">{op.nom}</h1>
                    {op.certifie && (
                      <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                        ✓ Certifié TerraCi
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mt-0.5">{op.slogan}</p>
                </div>
              </div>
              <div className="flex gap-3 pb-1">
                <a href={`tel:${op.telephone}`}
                  className="btn-outline text-sm px-4 py-2 flex items-center gap-2">
                  📞 Appeler
                </a>
                <a href={`https://wa.me/${op.whatsapp.replace(/\s/g, '')}`} target="_blank" rel="noreferrer"
                  className="btn-primary text-sm px-4 py-2 flex items-center gap-2">
                  💬 WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Stats rapides */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Projets réalisés", value: op.projets, icon: "🏗️", color: "text-orange-600", bg: "bg-orange-50" },
            { label: "Lots vendus", value: op.lotesVendus, icon: "🏠", color: "text-blue-600", bg: "bg-blue-50" },
            { label: "Note clients", value: `${op.note}/5`, icon: "⭐", color: "text-yellow-600", bg: "bg-yellow-50" },
            { label: "Conformité", value: `${op.conformite}%`, icon: "✅", color: "text-green-600", bg: "bg-green-50" },
          ].map((s) => (
            <div key={s.label} className={`${s.bg} rounded-xl p-4 text-center border border-gray-100`}>
              <div className="text-xl mb-1">{s.icon}</div>
              <div className={`text-xl font-bold ${s.color}`}>{s.value}</div>
              <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Onglets */}
        <div className="flex gap-1 bg-gray-100 p-1 rounded-xl mb-6 overflow-x-auto">
          {[
            { key: "presentation", label: "📋 Présentation" },
            { key: "projets", label: "🏗️ Projets" },
            { key: "avis", label: `⭐ Avis (${op.avis})` },
            { key: "contact", label: "📞 Contact" },
          ].map((tab) => (
            <button key={tab.key} onClick={() => setOnglet(tab.key)}
              className={`shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                onglet === tab.key ? "bg-white text-orange-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
              }`}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Contenu onglets */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

          {onglet === "presentation" && (
            <div className="space-y-6">
              <div>
                <h2 className="font-bold text-gray-900 mb-3">À propos</h2>
                <p className="text-gray-600 leading-relaxed">{op.description}</p>
              </div>
              <div>
                <h2 className="font-bold text-gray-900 mb-3">Spécialités</h2>
                <div className="flex flex-wrap gap-2">
                  {op.specialites.map((s) => (
                    <span key={s} className="bg-orange-50 text-orange-600 border border-orange-200 text-sm px-3 py-1 rounded-full">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Membre depuis", value: op.depuis },
                  { label: "Ville principale", value: op.ville },
                  { label: "Responsable", value: op.responsable },
                  { label: "Avis clients", value: `${op.avis} avis` },
                ].map((item) => (
                  <div key={item.label} className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-400">{item.label}</p>
                    <p className="text-sm font-semibold text-gray-800 mt-0.5">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {onglet === "projets" && (
            <div className="space-y-4">
              <h2 className="font-bold text-gray-900">Projets de {op.nom}</h2>
              {op.projetsListe.map((p) => (
                <div key={p.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center text-lg">🏗️</div>
                    <div>
                      <p className="font-semibold text-gray-900">{p.titre}</p>
                      <p className="text-xs text-gray-400">{p.ville} · {p.lots} lots · {p.annee}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      p.statut === "actif" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                    }`}>
                      {p.statut === "actif" ? "Actif" : "En validation"}
                    </span>
                    <Link to={`/project/${p.id}`} className="btn-primary text-xs px-3 py-1.5">
                      Voir →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          {onglet === "avis" && (
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-orange-50 rounded-xl">
                <div className="text-center">
                  <div className="text-4xl font-bold text-orange-500">{op.note}</div>
                  <div className="flex justify-center gap-0.5 mt-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} className={i < Math.round(op.note) ? "text-yellow-400" : "text-gray-200"}>★</span>
                    ))}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{op.avis} avis</div>
                </div>
                <div className="flex-1 space-y-1">
                  {[5, 4, 3, 2, 1].map((star) => (
                    <div key={star} className="flex items-center gap-2 text-xs">
                      <span className="text-gray-500 w-4">{star}★</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                        <div className="bg-yellow-400 h-1.5 rounded-full"
                          style={{ width: `${star === 5 ? 60 : star === 4 ? 25 : star === 3 ? 10 : 5}%` }}>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {op.avisClients.map((avis, i) => (
                <div key={i} className="p-4 border border-gray-100 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-bold text-gray-600">
                        {avis.nom.charAt(0)}
                      </div>
                      <span className="font-medium text-sm text-gray-900">{avis.nom}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="flex">
                        {Array.from({ length: 5 }).map((_, j) => (
                          <span key={j} className={j < avis.note ? "text-yellow-400 text-xs" : "text-gray-200 text-xs"}>★</span>
                        ))}
                      </span>
                      <span className="text-xs text-gray-400">{avis.date}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">"{avis.texte}"</p>
                </div>
              ))}
            </div>
          )}

          {onglet === "contact" && (
            <div className="space-y-4 max-w-lg">
              <h2 className="font-bold text-gray-900">Coordonnées</h2>
              {[
                { icon: "📍", label: "Adresse", value: op.adresse },
                { icon: "📞", label: "Téléphone", value: op.telephone },
                { icon: "✉️", label: "Email", value: op.email },
                { icon: "💬", label: "WhatsApp", value: op.whatsapp },
              ].map((c) => (
                <div key={c.label} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <span className="text-lg shrink-0">{c.icon}</span>
                  <div>
                    <p className="text-xs text-gray-400">{c.label}</p>
                    <p className="text-sm font-medium text-gray-800">{c.value}</p>
                  </div>
                </div>
              ))}
              <div className="pt-4 space-y-3">
                <a href={`mailto:${op.email}`}
                  className="btn-outline w-full py-3 flex items-center justify-center gap-2">
                  ✉️ Envoyer un email
                </a>
                <a href={`https://wa.me/${op.whatsapp.replace(/\s/g, '')}`} target="_blank" rel="noreferrer"
                  className="btn-primary w-full py-3 flex items-center justify-center gap-2">
                  💬 Contacter sur WhatsApp
                </a>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}