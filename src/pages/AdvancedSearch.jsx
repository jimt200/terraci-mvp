import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProjectCard from '../components/ProjectCard';
import { projects, cities } from '../data/projects';
import { Search as SearchIcon, SlidersHorizontal, MapPin, X } from 'lucide-react';

export default function AdvancedSearch() {
  const [filters, setFilters] = useState({
    searchTerm: '',
    cities: [],
    priceMin: 0,
    priceMax: 50000000,
    surfaceMin: 0,
    surfaceMax: 1000,
    features: [],
    status: [],
    certified: false,
  });

  const availableFeatures = ['Eau courante', 'Électricité', 'Voirie pavée', 'Éclairage public', 'Sécurité 24/7'];
  const statusOptions = ['En cours', 'En finition', 'Terminé'];

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                         project.location.toLowerCase().includes(filters.searchTerm.toLowerCase());
    const matchesCities = filters.cities.length === 0 || filters.cities.includes(project.city);
    const matchesPrice = project.priceMin >= filters.priceMin && project.priceMax <= filters.priceMax;
    const matchesSurface = project.surfaceMin >= filters.surfaceMin && project.surfaceMax <= filters.surfaceMax;
    const matchesFeatures = filters.features.length === 0 || 
                           filters.features.every(f => project.features.includes(f));
    const matchesStatus = filters.status.length === 0 || filters.status.includes(project.status);
    const matchesCertified = !filters.certified || project.certified;
    
    return matchesSearch && matchesCities && matchesPrice && matchesSurface && 
           matchesFeatures && matchesStatus && matchesCertified;
  });

  const toggleArrayFilter = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: prev[key].includes(value) 
        ? prev[key].filter(v => v !== value)
        : [...prev[key], value]
    }));
  };

  const resetFilters = () => {
    setFilters({
      searchTerm: '',
      cities: [],
      priceMin: 0,
      priceMax: 50000000,
      surfaceMin: 0,
      surfaceMax: 1000,
      features: [],
      status: [],
      certified: false,
    });
  };

  const activeFiltersCount = 
    filters.cities.length + 
    filters.features.length + 
    filters.status.length + 
    (filters.certified ? 1 : 0) +
    (filters.priceMax < 50000000 ? 1 : 0) +
    (filters.surfaceMax < 1000 ? 1 : 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Recherche Avancée</h1>
          <p className="text-gray-600">Affinez vos critères pour trouver le projet idéal</p>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="relative">
            <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Rechercher par ville, quartier ou nom de projet..."
              value={filters.searchTerm}
              onChange={(e) => setFilters(prev => ({ ...prev, searchTerm: e.target.value }))}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <SlidersHorizontal className="w-5 h-5" />
                  Filtres
                  {activeFiltersCount > 0 && (
                    <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">
                      {activeFiltersCount}
                    </span>
                  )}
                </h2>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={resetFilters}
                    className="text-sm text-primary hover:text-primary-dark font-semibold"
                  >
                    Réinitialiser
                  </button>
                )}
              </div>

              {/* Cities */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Villes</h3>
                <div className="space-y-2">
                  {cities.map(city => (
                    <label key={city} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.cities.includes(city)}
                        onChange={() => toggleArrayFilter('cities', city)}
                        className="rounded text-primary focus:ring-primary"
                      />
                      <span className="text-sm">{city}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Budget (FCFA)</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-gray-600">Maximum</label>
                    <select
                      value={filters.priceMax}
                      onChange={(e) => setFilters(prev => ({ ...prev, priceMax: parseInt(e.target.value) }))}
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="50000000">Tous les budgets</option>
                      <option value="5000000">5M FCFA</option>
                      <option value="10000000">10M FCFA</option>
                      <option value="15000000">15M FCFA</option>
                      <option value="20000000">20M FCFA</option>
                      <option value="30000000">30M FCFA</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Surface */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Superficie (m²)</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-gray-600">Minimum</label>
                    <input
                      type="number"
                      value={filters.surfaceMin}
                      onChange={(e) => setFilters(prev => ({ ...prev, surfaceMin: parseInt(e.target.value) || 0 }))}
                      placeholder="200"
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">Maximum</label>
                    <input
                      type="number"
                      value={filters.surfaceMax}
                      onChange={(e) => setFilters(prev => ({ ...prev, surfaceMax: parseInt(e.target.value) || 1000 }))}
                      placeholder="600"
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Caractéristiques</h3>
                <div className="space-y-2">
                  {availableFeatures.map(feature => (
                    <label key={feature} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.features.includes(feature)}
                        onChange={() => toggleArrayFilter('features', feature)}
                        className="rounded text-primary focus:ring-primary"
                      />
                      <span className="text-sm">{feature}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Status */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3">État du Projet</h3>
                <div className="space-y-2">
                  {statusOptions.map(status => (
                    <label key={status} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.status.includes(status)}
                        onChange={() => toggleArrayFilter('status', status)}
                        className="rounded text-primary focus:ring-primary"
                      />
                      <span className="text-sm">{status}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Certified Only */}
              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.certified}
                    onChange={() => setFilters(prev => ({ ...prev, certified: !prev.certified }))}
                    className="rounded text-primary focus:ring-primary"
                  />
                  <span className="text-sm font-semibold">Uniquement projets certifiés</span>
                </label>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            {/* Active Filters Tags */}
            {activeFiltersCount > 0 && (
              <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                <div className="flex flex-wrap gap-2">
                  {filters.cities.map(city => (
                    <span key={city} className="inline-flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                      <MapPin className="w-3 h-3" />
                      {city}
                      <button onClick={() => toggleArrayFilter('cities', city)}>
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                  {filters.features.map(feature => (
                    <span key={feature} className="inline-flex items-center gap-1 bg-secondary/10 text-secondary px-3 py-1 rounded-full text-sm">
                      {feature}
                      <button onClick={() => toggleArrayFilter('features', feature)}>
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Results Count */}
            <div className="mb-6">
              <p className="text-gray-700">
                <span className="font-bold text-2xl text-primary">{filteredProjects.length}</span>
                <span className="ml-2">projet{filteredProjects.length > 1 ? 's' : ''} trouvé{filteredProjects.length > 1 ? 's' : ''}</span>
              </p>
            </div>

            {/* Projects Grid */}
            {filteredProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map(project => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <div className="text-gray-400 mb-4">
                  <SearchIcon className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Aucun projet trouvé</h3>
                <p className="text-gray-600 mb-6">Essayez d'ajuster vos filtres pour voir plus de résultats</p>
                <button onClick={resetFilters} className="btn-primary">
                  Réinitialiser les Filtres
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}