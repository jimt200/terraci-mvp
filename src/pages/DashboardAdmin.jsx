import Header from '../components/Header';
import Footer from '../components/Footer';
import { projects } from '../data/projects';
import { ClipboardCheck, AlertTriangle, Users, BarChart3, CheckCircle, XCircle, Clock } from 'lucide-react';

export default function DashboardAdmin() {
  const pendingProjects = projects.filter(p => p.documents.some(d => !d.verified));
  const approvedProjects = projects.filter(p => p.documents.every(d => d.verified));

  const stats = {
    totalProjects: projects.length,
    pending: pendingProjects.length,
    approved: approvedProjects.length,
    operators: 3
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Administration TerraCi</h1>
          <p className="text-gray-600">Gestion et validation des projets fonciers</p>
        </div>

        {/* Alerts */}
        {pendingProjects.length > 0 && (
          <div className="bg-orange-50 border-l-4 border-orange-500 p-4 mb-8">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
              <p className="text-orange-700 font-semibold">
                {pendingProjects.length} projet(s) en attente de validation
              </p>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between mb-4">
              <BarChart3 className="w-8 h-8 text-primary" />
            </div>
            <div className="text-3xl font-bold mb-1">{stats.totalProjects}</div>
            <div className="text-sm text-gray-600">Total Projets</div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between mb-4">
              <Clock className="w-8 h-8 text-orange-500" />
            </div>
            <div className="text-3xl font-bold mb-1">{stats.pending}</div>
            <div className="text-sm text-gray-600">En Attente</div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between mb-4">
              <CheckCircle className="w-8 h-8 text-secondary" />
            </div>
            <div className="text-3xl font-bold mb-1">{stats.approved}</div>
            <div className="text-sm text-gray-600">Approuvés</div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <div className="text-3xl font-bold mb-1">{stats.operators}</div>
            <div className="text-sm text-gray-600">Opérateurs Actifs</div>
          </div>
        </div>

        {/* Pending Validations */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <ClipboardCheck className="w-6 h-6 text-primary" />
            Projets à Valider
          </h2>
          
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Projet</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Opérateur</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Ville</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Documents</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Priorité</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {pendingProjects.map(project => {
                    const verifiedDocs = project.documents.filter(d => d.verified).length;
                    const totalDocs = project.documents.length;
                    
                    return (
                      <tr key={project.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="font-semibold">{project.name}</div>
                          <div className="text-sm text-gray-500">{project.totalLots} lots</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm">{project.operator.name}</div>
                          <div className="text-xs text-gray-500">⭐ {project.operator.rating}</div>
                        </td>
                        <td className="px-6 py-4 text-sm">{project.city}</td>
                        <td className="px-6 py-4">
                          <div className="text-sm">
                            {verifiedDocs}/{totalDocs} vérifiés
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                            <div 
                              className="bg-secondary rounded-full h-2"
                              style={{ width: `${(verifiedDocs/totalDocs)*100}%` }}
                            ></div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-700">
                            Moyenne
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button className="btn-primary text-sm py-2 px-4">
                            Examiner
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Approved Projects */}
        <div>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <CheckCircle className="w-6 h-6 text-secondary" />
            Projets Approuvés
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {approvedProjects.map(project => (
              <div key={project.id} className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-start gap-4">
                  <img 
                    src={project.image} 
                    alt={project.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-bold">{project.name}</h3>
                        <p className="text-sm text-gray-600">{project.location}</p>
                      </div>
                      <span className="bg-secondary/10 text-secondary px-2 py-1 rounded-full text-xs font-semibold">
                        ✓ Approuvé
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      {project.operator.name}
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-gray-500">Lots:</span> {project.availableLots}/{project.totalLots}
                      </div>
                      <div>
                        <span className="text-gray-500">Prog:</span> {project.progress}%
                      </div>
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