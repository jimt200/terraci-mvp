import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Landing() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-br from-orange-500 to-orange-600 text-white py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white bg-opacity-20 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
            🇨🇮 Plateforme officielle de sécurisation foncière
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
            Achetez votre terrain en<br />
            <span className="text-yellow-300">toute sécurité</span> en Côte d'Ivoire
          </h1>
          <p className="text-lg text-orange-100 mb-10 max-w-2xl mx-auto">
            TerraCi sécurise chaque transaction foncière. Projets vérifiés, opérateurs certifiés, documents authentifiés.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/search" className="bg-white text-orange-600 font-semibold px-8 py-3 rounded-xl hover:bg-orange-50 transition-colors">
              🔍 Chercher un terrain
            </Link>
            <Link to="/advanced-search" className="bg-orange-700 text-white font-semibold px-8 py-3 rounded-xl hover:bg-orange-800 transition-colors">
              🎯 Recherche avancée
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gray-900 text-white py-10 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {[
            { value: "48", label: "Projets enregistrés" },
            { value: "2 840", label: "Lots disponibles" },
            { value: "34", label: "Opérateurs certifiés" },
            { value: "84%", label: "Taux de conformité" },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-3xl font-bold text-orange-400">{s.value}</div>
              <div className="text-sm text-gray-400 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Espaces utilisateurs */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Choisissez votre espace</h2>
            <p className="text-gray-500 mt-2">TerraCi s'adapte à chaque acteur du marché foncier</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                to: "/dashboard-buyer",
                icon: "🏠",
                title: "Acheteur",
                desc: "Trouvez, comparez et sécurisez votre achat foncier",
                color: "border-blue-200 hover:border-blue-400",
                badge: "bg-blue-100 text-blue-600",
              },
              {
                to: "/dashboard-operator",
                icon: "🏗️",
                title: "Opérateur",
                desc: "Déposez vos projets et gérez vos lots immobiliers",
                color: "border-orange-200 hover:border-orange-400",
                badge: "bg-orange-100 text-orange-600",
              },
              {
                to: "/dashboard-admin",
                icon: "⚙️",
                title: "Administrateur",
                desc: "Validez les dossiers et supervisez la conformité",
                color: "border-purple-200 hover:border-purple-400",
                badge: "bg-purple-100 text-purple-600",
              },
              {
                to: "/dashboard-ministry",
                icon: "🏛️",
                title: "Ministère",
                desc: "Supervisez le marché foncier national et générez des rapports",
                color: "border-green-200 hover:border-green-400",
                badge: "bg-green-100 text-green-600",
              },
            ].map((card) => (
              <Link
                key={card.to}
                to={card.to}
                className={`bg-white rounded-2xl border-2 p-6 transition-all hover:shadow-lg group ${card.color}`}
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl text-2xl mb-4 ${card.badge}`}>
                  {card.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{card.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{card.desc}</p>
                <div className="mt-4 text-sm font-medium text-orange-500 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  Accéder →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Fonctionnalités */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Tout ce dont vous avez besoin</h2>
            <p className="text-gray-500 mt-2">Une plateforme complète pour chaque étape de votre projet</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { to: "/search", icon: "🔍", title: "Recherche de projets", desc: "Parcourez les projets fonciers vérifiés par région, budget et superficie" },
              { to: "/advanced-search", icon: "🎯", title: "Filtres avancés", desc: "Affinez votre recherche avec des critères précis : prix, statut, opérateur" },
              { to: "/comparator", icon: "⚖️", title: "Comparateur", desc: "Comparez jusqu'à 3 projets côte à côte pour faire le meilleur choix" },
              { to: "/create-project", icon: "📁", title: "Dépôt de dossier", desc: "Soumettez votre projet en 5 étapes avec tous les documents requis" },
              { to: "/validation-queue", icon: "✅", title: "Validation officielle", desc: "Chaque projet est examiné et validé par un administrateur certifié" },
              { to: "/ministry-reporting", icon: "📊", title: "Rapports officiels", desc: "Génération de rapports de conformité pour le Ministère de tutelle" },
            ].map((f) => (
              <Link
                key={f.to}
                to={f.to}
                className="p-6 rounded-xl border border-gray-100 hover:border-orange-200 hover:bg-orange-50 transition-all group"
              >
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-orange-600 transition-colors">{f.title}</h3>
                <p className="text-sm text-gray-500">{f.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-16 px-4 bg-gradient-to-r from-green-700 to-green-800 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Prêt à sécuriser votre foncier ?</h2>
          <p className="text-green-200 mb-8">
            Rejoignez les centaines d'acheteurs et d'opérateurs qui font confiance à TerraCi
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/search" className="bg-white text-green-700 font-semibold px-8 py-3 rounded-xl hover:bg-green-50 transition-colors">
              Voir les projets disponibles
            </Link>
            <Link to="/create-project" className="bg-green-600 text-white font-semibold px-8 py-3 rounded-xl border border-green-500 hover:bg-green-500 transition-colors">
              Déposer mon projet
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}