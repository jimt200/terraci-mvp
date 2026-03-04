import Header from '../components/Header';
import Footer from '../components/Footer';
import { projects } from '../data/projects';
import { PlusCircle, BarChart3, Home, DollarSign, FileText, TrendingUp } from 'lucide-react';

export default function DashboardOperator() {
  // Simuler les projets de l'opérateur connecté
  const operatorProjects = projects.filter(p => p.operator.name === "KOUADIO IMMOBILIER SARL");
  
  const stats = {
    activeProjects: operatorProjects.length,
    totalLots: operatorProjects.reduce((sum, p) => sum + p.totalLots, 0),
    soldLots: operatorProjects.reduce((sum, p) => sum + p.soldLots, 0),
    revenue: "1.2 Milliards"
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Bienvenue, KOUADIO IMMOBILIER SARL</h1>
          <p className="text-gray-600">Gérez vos projets de lotissement</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between mb-4">
              <BarChart3 className="w-8 h-8 text-primary" />
              <span className="text-sm text-gray-500">Projets</span>
            </div>
            <div className="text-3xl font-bold mb-1">{stats.activeProjects}</div>
            <div className="text-sm text-gray-600">Projets Actifs</div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between mb-4">
              <Home className="w-8 h-8 text-primary" />
              <span className="text-sm text-gray-500">Lots</span>
            </div>
            <div className="text-3xl font-bold mb-1">{stats.totalLots}</div>
            <div className="text-sm text-gray-600">{stats.soldLots} Vendus</div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="w-8 h-8 text-secondary" />
              <span className="text-sm text-gray-500">Revenus</span>
            </div>
            <div className="text-3xl font-bold mb-1">{stats.revenue}</div>
            <div className="text-sm text-gray-600">FCFA Total</div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-8 h-8 text-secondary" />
              <span className="text-sm text-gray-500">Note</span>
            </div>
            <div className="text-3xl font-bold mb-1">4.5/5</div>
            <div className="text-sm text-gray-600">28 Avis</div>
          </div>
        </div>

        {/* Actions */}
        <div className="mb-8">
          <button className="btn-primary flex items-center gap-2">
            <PlusCircle className="w-5 h-5" />
            Créer un Nouveau Projet
          </button>
        </div>

        {/* Projects List */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold">Vos Projets</h2>
          </div>
          
          <div className="divide-y divide-gray-200">
            {operatorProjects.map(project => (
              <div key={project.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start gap-4">
                  <img 
                    src={project.image} 
                    alt={project.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-bold">{project.name}</h3>
                        <p className="text-gray-600">{project.location}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        project.status === 'En cours' ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'
                      }`}>
                        {project.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-4 gap-4 mb-4">
                      <div>
                        <div className="text-sm text-gray-600">Total Lots</div>
                        <div className="font-bold">{project.totalLots}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Disponibles</div>
                        <div className="font-bold text-secondary">{project.availableLots}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Vendus</div>
                        <div className="font-bold text-primary">{project.soldLots}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Avancement</div>
                        <div className="font-bold">{project.progress}%</div>
                      </div>
                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                      <div 
                        className="bg-primary rounded-full h-2"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>

                    <div className="flex gap-2">
                      <button className="btn-outline text-sm py-2 px-4">Modifier</button>
                      <button className="btn-outline text-sm py-2 px-4">Documents</button>
                      <button className="btn-outline text-sm py-2 px-4">Lots</button>
                      <button className="btn-primary text-sm py-2 px-4">Voir Détails</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}