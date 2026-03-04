import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProjectCard from '../components/ProjectCard';
import { projects, cities } from '../data/projects';
import { Search as SearchIcon, SlidersHorizontal } from 'lucide-react';

export default function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [priceRange, setPriceRange] = useState([0, 50000000]);
  const [showFilters, setShowFilters] = useState(false);

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = !selectedCity || project.city === selectedCity;
    const matchesPrice = project.priceMin >= priceRange[0] && project.priceMax <= priceRange[1];
    
    return matchesSearch && matchesCity && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Rechercher un Projet</h1>
          
          {/* Search Bar */}
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher par ville, quartier ou nom de projet..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="btn-outline flex items-center gap-2"
            >
              <SlidersHorizontal className="w-5 h-5" />
              Filtres
            </button>
          </div>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h3 className="font-bold text-lg mb-4">Filtres Avancés</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* City Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ville
                </label>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                >
                  <option value="">Toutes les villes</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Budget Maximum
                </label>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                >
                  <option value="50000000">Tous les budgets</option>
                  <option value="5000000">Jusqu'à 5M FCFA</option>
                  <option value="10000000">Jusqu'à 10M FCFA</option>
                  <option value="15000000">Jusqu'à 15M FCFA</option>
                  <option value="20000000">Jusqu'à 20M FCFA</option>
                </select>
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  État du Projet
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                  <option>Tous</option>
                  <option>En cours</option>
                  <option>En finition</option>
                  <option>Terminé</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        <div className="mb-4">
          <p className="text-gray-600">
            <span className="font-semibold">{filteredProjects.length}</span> projets trouvés
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* No Results */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Aucun projet ne correspond à vos critères</p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setSelectedCity('');
                setPriceRange([0, 50000000]);
              }}
              className="btn-outline mt-4"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}