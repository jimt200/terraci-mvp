import Header from '../components/Header';
import Footer from '../components/Footer';
import { projects } from '../data/projects';
import { Home, TrendingUp, Heart, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function DashboardBuyer() {
  // Simuler un achat
  const purchasedProject = projects[0];
  const favoriteProjects = projects.slice(1, 4);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Bonjour, Monsieur TOURÉ Amadou</h1>
          <p className="text-gray-600">Suivez vos investissements fonciers</p>
        </div>

        {/* Quick Search */}
        <div className="bg-gradient-to-r from-primary to-orange-600 text-white rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">Trouvez votre terrain idéal</h2>
          <Link to="/search" className="btn-secondary inline-flex items-center gap-2">
            <Search className="w-5 h-5" />
            Rechercher un Projet
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between mb-4">
              <Home className="w-8 h-8 text-primary" />
            </div>
            <div className="text-3xl font-bold mb-1">1</div>
            <div className="text-sm text-gray-600">Terrain Acquis</div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-8 h-8 text-secondary" />
            </div>
            <div className="text-3xl font-bold mb-1">60%</div>
            <div className="text-sm text-gray-600">Avancement Moyen</div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between mb-4">
              <Heart className="w-8 h-8 text-red-500" />
            </div>
            <div className="text-3xl font-bold mb-1">{favoriteProjects.length}</div>
            <div className="text-sm text-gray-600">Projets Favoris</div>
          </div>
        </div>

        {/* Current Purchase */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Mon Achat en Cours</h2>
          
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="md:flex">
              <img 
                src={purchasedProject.image} 
                alt={purchasedProject.name}
                className="w-full md:w-64 h-48 object-cover"
              />
              
              <div className="p-6 flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold mb-1">{purchasedProject.name}</h3>
                    <p className="text-gray-600">{purchasedProject.location}</p>
                  </div>
                  <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-semibold">
                    🔄 Travaux en cours
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <div className="text-sm text-gray-600">Lot</div>
                    <div className="font-bold">B-45</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Superficie</div>
                    <div className="font-bold">420m²</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Prix</div>
                    <div className="font-bold text-primary">13.5M FCFA</div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-semibold">Avancement des travaux</span>
                    <span className="text-primary font-bold">{purchasedProject.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-primary rounded-full h-3"
                      style={{ width: `${purchasedProject.progress}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>Bornage ✓</span>
                    <span>Viabilisation 🔄</span>
                    <span>Électrification ⏳</span>
                    <span>Livraison ⏳</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button className="btn-primary text-sm py-2 px-4">
                    Voir Progression Détaillée
                  </button>
                  <button className="btn-outline text-sm py-2 px-4">
                    Documents
                  </button>
                  <button className="btn-outline text-sm py-2 px-4">
                    Contacter Opérateur
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Favorites */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Mes Favoris</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {favoriteProjects.map(project => (
              <Link 
                key={project.id} 
                to={`/project/${project.id}`}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="relative h-48">
                  <img 
                    src={project.image} 
                    alt={project.name}
                    className="w-full h-full object-cover"
                  />
                  <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <Heart className="w-5 h-5 fill-red-500 text-red-500" />
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="font-bold mb-1 line-clamp-1">{project.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{project.location}</p>
                  <div className="text-lg font-bold text-primary">
                    À partir de {(project.priceMin / 1000000).toFixed(1)}M FCFA
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}