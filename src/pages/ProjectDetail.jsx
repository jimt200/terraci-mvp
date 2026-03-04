import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { projects } from '../data/projects';
import { MapPin, Home, TrendingUp, Calendar, DollarSign, FileText, ChevronRight, Star } from 'lucide-react';

export default function ProjectDetail() {
  const { id } = useParams();
  const project = projects.find(p => p.id === parseInt(id));

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Projet non trouvé</h1>
          <Link to="/search" className="btn-primary">Retour à la recherche</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const formatPrice = (price) => {
    return (price / 1000000).toFixed(1) + 'M';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Link to="/" className="hover:text-primary">Accueil</Link>
          <ChevronRight className="w-4 h-4" />
          <Link to="/search" className="hover:text-primary">Recherche</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900">{project.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="mb-6">
              <div className="relative h-96 rounded-xl overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.name}
                  className="w-full h-full object-cover"
                />
                {project.certified && (
                  <div className="absolute top-4 right-4 bg-secondary text-white px-4 py-2 rounded-full font-semibold">
                    ✓ Certifié par le Ministère
                  </div>
                )}
              </div>
              {/* Thumbnails */}
              <div className="grid grid-cols-4 gap-2 mt-2">
                {project.images.map((img, index) => (
                  <img 
                    key={index}
                    src={img} 
                    alt={`${project.name} ${index + 1}`}
                    className="h-20 w-full object-cover rounded-lg cursor-pointer hover:opacity-75 transition-opacity"
                  />
                ))}
              </div>
            </div>

            {/* Project Info */}
            <div className="bg-white rounded-xl p-6 shadow-md mb-6">
              <h1 className="text-3xl font-bold mb-4">{project.name}</h1>
              
              <div className="flex items-center text-gray-600 mb-4">
                <MapPin className="w-5 h-5 mr-2" />
                {project.location}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <Home className="w-6 h-6 text-primary mb-2" />
                  <div className="text-sm text-gray-600">Total Lots</div>
                  <div className="text-xl font-bold">{project.totalLots}</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600">Disponibles</div>
                  <div className="text-xl font-bold text-secondary">{project.availableLots}</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-primary mb-2" />
                  <div className="text-sm text-gray-600">Avancement</div>
                  <div className="text-xl font-bold">{project.progress}%</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <Calendar className="w-6 h-6 text-primary mb-2" />
                  <div className="text-sm text-gray-600">Livraison</div>
                  <div className="text-sm font-bold">Déc 2026</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-semibold">Progression des travaux</span>
                  <span className="text-primary font-bold">{project.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-primary rounded-full h-3 transition-all duration-500"
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>Bornage ✓</span>
                  <span>Viabilisation 🔄</span>
                  <span>Électrification ⏳</span>
                  <span>Livraison ⏳</span>
                </div>
              </div>

              <h2 className="text-xl font-bold mb-3">Description</h2>
              <p className="text-gray-700 mb-6">
                {project.description}
              </p>

              <h2 className="text-xl font-bold mb-3">Caractéristiques</h2>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {project.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <h2 className="text-xl font-bold mb-3">Superficie des Lots</h2>
              <p className="text-gray-700">
                De <span className="font-bold text-primary">{project.surfaceMin}m²</span> à <span className="font-bold text-primary">{project.surfaceMax}m²</span>
              </p>
            </div>

            {/* Documents */}
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <FileText className="w-6 h-6 text-primary" />
                Documents Légaux
              </h2>
              <div className="space-y-3">
                {project.documents.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      {doc.verified ? (
                        <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
                          <span className="text-secondary text-xl">✓</span>
                        </div>
                      ) : (
                        <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                          <span className="text-orange-600 text-xl">⏳</span>
                        </div>
                      )}
                      <div>
                        <div className="font-semibold">{doc.name}</div>
                        {doc.verified && doc.date && (
                          <div className="text-sm text-gray-500">Vérifié le {new Date(doc.date).toLocaleDateString('fr-FR')}</div>
                        )}
                      </div>
                    </div>
                    <button className="text-primary hover:text-primary-dark font-semibold">
                      Télécharger
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Price Card */}
            <div className="bg-white rounded-xl p-6 shadow-md mb-6 sticky top-24">
              <div className="text-sm text-gray-600 mb-2">À partir de</div>
              <div className="text-3xl font-bold text-primary mb-4">
                {formatPrice(project.priceMin)} FCFA
              </div>
              <div className="text-sm text-gray-600 mb-6">
                Jusqu'à {formatPrice(project.priceMax)} FCFA
              </div>

              <button className="btn-primary w-full mb-3">
                Réserver un Lot
              </button>
              <button className="btn-outline w-full">
                Contacter l'Opérateur
              </button>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  Paiement 100% Sécurisé
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  Compte Séquestre Garanti
                </div>
              </div>
            </div>

            {/* Operator Info */}
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="font-bold text-lg mb-4">Opérateur</h3>
              <div className="mb-4">
                <div className="font-semibold text-gray-900">{project.operator.name}</div>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="w-4 h-4 fill-primary text-primary" />
                  <span className="font-bold">{project.operator.rating}</span>
                  <span className="text-gray-500 text-sm">({project.operator.reviews} avis)</span>
                </div>
              </div>
              {project.operator.verified && (
                <div className="inline-block bg-secondary/10 text-secondary px-3 py-1 rounded-full text-sm font-semibold">
                  ✓ Opérateur Vérifié
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}