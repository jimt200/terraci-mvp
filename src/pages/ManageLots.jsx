import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { projects } from '../data/projects';
import { Search, Filter, Download, Plus, Edit, Trash2 } from 'lucide-react';

export default function ManageLots() {
  const { id } = useParams();
  const project = projects.find(p => p.id === parseInt(id || 1));
  
  const [lots, setLots] = useState([
    { id: 'A-01', surface: 300, dimensions: '12m x 25m', price: 10000000, status: 'Vendu', buyer: 'M. KOFFI', features: ['Eau', 'Électricité'], position: 'Angle' },
    { id: 'A-02', surface: 320, dimensions: '13m x 25m', price: 10500000, status: 'Disponible', buyer: null, features: ['Eau', 'Électricité'], position: 'Standard' },
    { id: 'A-03', surface: 280, dimensions: '11m x 25m', price: 9500000, status: 'Réservé', buyer: 'Mme TOURÉ', features: ['Eau', 'Électricité'], position: 'Standard' },
    { id: 'B-01', surface: 350, dimensions: '14m x 25m', price: 11500000, status: 'Disponible', buyer: null, features: ['Eau', 'Électricité', 'Voirie'], position: 'Angle' },
    { id: 'B-02', surface: 300, dimensions: '12m x 25m', price: 10000000, status: 'Disponible', buyer: null, features: ['Eau', 'Électricité'], position: 'Standard' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('Tous');
  const [viewMode, setViewMode] = useState('plan'); // 'plan' or 'list'

  const filteredLots = lots.filter(lot => {
    const matchesSearch = lot.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'Tous' || lot.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: lots.length,
    available: lots.filter(l => l.status === 'Disponible').length,
    reserved: lots.filter(l => l.status === 'Réservé').length,
    sold: lots.filter(l => l.status === 'Vendu').length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Gestion des Lots</h1>
          <p className="text-gray-600">{project?.name}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="text-2xl font-bold">{stats.total}</div>
            <div className="text-sm text-gray-600">Total Lots</div>
          </div>
          <div className="bg-secondary/10 p-4 rounded-lg border-2 border-secondary">
            <div className="text-2xl font-bold text-secondary">{stats.available}</div>
            <div className="text-sm text-gray-600">Disponibles</div>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg border-2 border-orange-300">
            <div className="text-2xl font-bold text-orange-600">{stats.reserved}</div>
            <div className="text-sm text-gray-600">Réservés</div>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-300">
            <div className="text-2xl font-bold text-blue-600">{stats.sold}</div>
            <div className="text-sm text-gray-600">Vendus</div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Rechercher un lot..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option>Tous</option>
                <option>Disponible</option>
                <option>Réservé</option>
                <option>Vendu</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('plan')}
                className={`px-4 py-2 rounded-lg font-semibold ${
                  viewMode === 'plan' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'
                }`}
              >
                Vue Plan
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-2 rounded-lg font-semibold ${
                  viewMode === 'list' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'
                }`}
              >
                Vue Liste
              </button>
            </div>

            <div className="flex gap-2">
              <button className="btn-outline text-sm py-2 px-4 flex items-center gap-2">
                <Download className="w-4 h-4" />
                Exporter
              </button>
              <button className="btn-primary text-sm py-2 px-4 flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Ajouter Lots
              </button>
            </div>
          </div>
        </div>

        {/* Plan View */}
        {viewMode === 'plan' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="mb-4">
              <h3 className="font-bold text-lg mb-2">Plan du Lotissement</h3>
              <div className="flex gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-secondary rounded"></div>
                  <span>Disponible</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-orange-400 rounded"></div>
                  <span>Réservé</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-400 rounded"></div>
                  <span>Vendu</span>
                </div>
              </div>
            </div>

            {/* Simplified Interactive Plan */}
            <div className="border-2 border-gray-300 rounded-lg p-8 bg-gray-50">
              <div className="grid grid-cols-5 gap-4">
                {filteredLots.map(lot => (
                  <div
                    key={lot.id}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:scale-105 ${
                      lot.status === 'Disponible' ? 'bg-secondary/20 border-secondary hover:bg-secondary/30' :
                      lot.status === 'Réservé' ? 'bg-orange-100 border-orange-400 hover:bg-orange-200' :
                      'bg-blue-100 border-blue-400 hover:bg-blue-200'
                    }`}
                  >
                    <div className="font-bold text-center mb-1">{lot.id}</div>
                    <div className="text-xs text-center text-gray-600">{lot.surface}m²</div>
                    <div className="text-xs text-center font-semibold text-primary mt-1">
                      {(lot.price / 1000000).toFixed(1)}M
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* List View */}
        {viewMode === 'list' && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Lot</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Superficie</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Dimensions</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Prix</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Statut</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Acheteur</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredLots.map(lot => (
                  <tr key={lot.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold">{lot.id}</td>
                    <td className="px-6 py-4">{lot.surface}m²</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{lot.dimensions}</td>
                    <td className="px-6 py-4 font-semibold text-primary">
                      {(lot.price / 1000000).toFixed(1)}M FCFA
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        lot.status === 'Disponible' ? 'bg-secondary/20 text-secondary' :
                        lot.status === 'Réservé' ? 'bg-orange-100 text-orange-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {lot.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">{lot.buyer || '-'}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button className="p-2 hover:bg-gray-100 rounded-lg">
                          <Edit className="w-4 h-4 text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg">
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}