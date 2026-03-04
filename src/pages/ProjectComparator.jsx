import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { projects } from '../data/projects';
import { X, Plus, Check, AlertCircle } from 'lucide-react';

export default function ProjectComparator() {
  const [selectedProjects, setSelectedProjects] = useState([projects[0], projects[1], projects[2]]);
  const [showAddModal, setShowAddModal] = useState(false);

  const removeProject = (projectId) => {
    setSelectedProjects(prev => prev.filter(p => p.id !== projectId));
  };

  const addProject = (project) => {
    if (selectedProjects.length < 3 && !selectedProjects.find(p => p.id === project.id)) {
      setSelectedProjects(prev => [...prev, project]);
      setShowAddModal(false);
    }
  };

  const formatPrice = (price) => (price / 1000000).toFixed(1) + 'M';

  const ComparisonRow = ({ label, values, highlight = false }) => (
    <tr className={`border-b border-gray-200 ${highlight ? 'bg-gray-50' : 'bg-white'}`}>
      <td className="px-6 py-4 font-semibold text-gray-700 sticky left-0 bg-white border-r border-gray-200">
        {label}
      </td>
      {values.map((value, index) => (
        <td key={index} className="px-6 py-4 text-center">
          {value}
        </td>
      ))}
    </tr>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Comparateur de Projets</h1>
          <p className="text-gray-600">Comparez jusqu'à 3 projets côte à côte</p>
        </div>

        {/* Selected Projects Header */}
        <div className="bg-white rounded-lg shadow-md overflow-x-auto mb-6">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="px-6 py-4 text-left w-1/4 sticky left-0 bg-white"></th>
                {selectedProjects.map(project => (
                  <th key={project.id} className="px-6 py-4 w-1/4">
                    <div className="relative">
                      <button
                        onClick={() => removeProject(project.id)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <img 
                        src={project.image} 
                        alt={project.name}
                        className="w-full h-32 object-cover rounded-lg mb-3"
                      />
                      <Link to={`/project/${project.id}`} className="font-bold text-gray-900 hover:text-primary line-clamp-2">
                        {project.name}
                      </Link>
                      <p className="text-sm text-gray-600 mt-1">{project.location}</p>
                    </div>
                  </th>
                ))}
                {selectedProjects.length < 3 && (
                  <th className="px-6 py-4 w-1/4">
                    <button
                      onClick={() => setShowAddModal(true)}
                      className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:border-primary hover:bg-primary/5 transition-colors"
                    >
                      <Plus className="w-8 h-8 text-gray-400 mb-2" />
                      <span className="text-sm text-gray-600">Ajouter un projet</span>
                    </button>
                  </th>
                )}
              </tr>
            </thead>

            <tbody>
              {/* Informations Générales */}
              <ComparisonRow
                label="🏢 Opérateur"
                values={selectedProjects.map(p => (
                  <div>
                    <div className="font-semibold">{p.operator.name}</div>
                    <div className="text-sm text-primary">⭐ {p.operator.rating}/5</div>
                  </div>
                ))}
              />

              <ComparisonRow
                label="📍 Ville"
                values={selectedProjects.map(p => p.city)}
                highlight
              />

              <ComparisonRow
                label="✓ Certification"
                values={selectedProjects.map(p => 
                  p.certified ? 
                    <span className="inline-flex items-center gap-1 text-secondary font-semibold">
                      <Check className="w-4 h-4" /> Certifié
                    </span> : 
                    <span className="text-gray-400">Non certifié</span>
                )}
              />

              {/* Prix et Financement */}
              <ComparisonRow
                label="💰 Prix Minimum"
                values={selectedProjects.map(p => (
                  <span className="text-xl font-bold text-primary">{formatPrice(p.priceMin)} FCFA</span>
                ))}
                highlight
              />

              <ComparisonRow
                label="💰 Prix Maximum"
                values={selectedProjects.map(p => (
                  <span className="text-xl font-bold text-primary">{formatPrice(p.priceMax)} FCFA</span>
                ))}
              />

              {/* Lots */}
              <ComparisonRow
                label="🏘️ Total Lots"
                values={selectedProjects.map(p => <span className="font-semibold">{p.totalLots}</span>)}
                highlight
              />

              <ComparisonRow
                label="✅ Lots Disponibles"
                values={selectedProjects.map(p => (
                  <span className={`font-bold ${p.availableLots > 20 ? 'text-secondary' : 'text-orange-600'}`}>
                    {p.availableLots}
                  </span>
                ))}
              />

              <ComparisonRow
                label="📊 Taux de Vente"
                values={selectedProjects.map(p => {
                  const rate = Math.round((p.soldLots / p.totalLots) * 100);
                  return <span className="font-semibold">{rate}%</span>;
                })}
                highlight
              />

              {/* Superficie */}
              <ComparisonRow
                label="📐 Superficie Min"
                values={selectedProjects.map(p => `${p.surfaceMin}m²`)}
              />

              <ComparisonRow
                label="📐 Superficie Max"
                values={selectedProjects.map(p => `${p.surfaceMax}m²`)}
                highlight
              />

              {/* Avancement */}
              <ComparisonRow
                label="🔧 Avancement"
                values={selectedProjects.map(p => (
                  <div>
                    <div className="font-bold text-lg mb-1">{p.progress}%</div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary rounded-full h-2"
                        style={{ width: `${p.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              />

              <ComparisonRow
                label="📅 Statut"
                values={selectedProjects.map(p => (
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    p.status === 'En cours' ? 'bg-orange-100 text-orange-700' : 
                    p.status === 'En finition' ? 'bg-blue-100 text-blue-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {p.status}
                  </span>
                ))}
                highlight
              />

              {/* Infrastructures */}
              <ComparisonRow
                label="💧 Eau Courante"
                values={selectedProjects.map(p => 
                  p.features.includes('Eau courante') ? 
                    <Check className="w-5 h-5 text-secondary mx-auto" /> : 
                    <X className="w-5 h-5 text-gray-300 mx-auto" />
                )}
              />

              <ComparisonRow
                label="⚡ Électricité"
                values={selectedProjects.map(p => 
                  p.features.includes('Électricité') ? 
                    <Check className="w-5 h-5 text-secondary mx-auto" /> : 
                    <X className="w-5 h-5 text-gray-300 mx-auto" />
                )}
                highlight
              />

              <ComparisonRow
                label="🛣️ Voirie Pavée"
                values={selectedProjects.map(p => 
                  p.features.includes('Voirie pavée') ? 
                    <Check className="w-5 h-5 text-secondary mx-auto" /> : 
                    <X className="w-5 h-5 text-gray-300 mx-auto" />
                )}
              />

              <ComparisonRow
                label="💡 Éclairage Public"
                values={selectedProjects.map(p => 
                  p.features.includes('Éclairage public') ? 
                    <Check className="w-5 h-5 text-secondary mx-auto" /> : 
                    <X className="w-5 h-5 text-gray-300 mx-auto" />
                )}
                highlight
              />

              {/* Documents */}
              <ComparisonRow
                label="📄 Documents Vérifiés"
                values={selectedProjects.map(p => {
                  const verified = p.documents.filter(d => d.verified).length;
                  const total = p.documents.length;
                  return (
                    <div>
                      <div className="font-semibold">{verified}/{total}</div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div 
                          className="bg-secondary rounded-full h-2"
                          style={{ width: `${(verified/total)*100}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              />

              {/* Actions */}
              <tr className="bg-gray-50">
                <td className="px-6 py-6 sticky left-0 bg-gray-50"></td>
                {selectedProjects.map(project => (
                  <td key={project.id} className="px-6 py-6 text-center">
                    <div className="space-y-2">
                      <Link 
                        to={`/project/${project.id}`}
                        className="btn-primary w-full block text-center"
                      >
                        Voir Détails
                      </Link>
                      <button className="btn-outline w-full">
                        Contacter
                      </button>
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Add Project Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[80vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white">
                <h2 className="text-xl font-bold">Ajouter un Projet</h2>
                <button onClick={() => setShowAddModal(false)}>
                  <X className="w-6 h-6 text-gray-600" />
                </button>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {projects.filter(p => !selectedProjects.find(sp => sp.id === p.id)).map(project => (
                    <div key={project.id} className="card p-4 cursor-pointer" onClick={() => addProject(project)}>
                      <img src={project.image} alt={project.name} className="w-full h-32 object-cover rounded-lg mb-3" />
                      <h3 className="font-bold line-clamp-1">{project.name}</h3>
                      <p className="text-sm text-gray-600">{project.location}</p>
                      <div className="text-primary font-bold mt-2">
                        {formatPrice(project.priceMin)} - {formatPrice(project.priceMax)} FCFA
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}