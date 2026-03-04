import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { projects } from '../data/projects';
import { ChevronLeft, Download, MessageCircle, Camera, FileText, CreditCard, TrendingUp } from 'lucide-react';

export default function MyPurchasesDetail() {
  const { id } = useParams();
  const project = projects.find(p => p.id === parseInt(id || 1));
  const [activeTab, setActiveTab] = useState('progression');

  const purchaseInfo = {
    lotNumber: 'B-45',
    surface: 420,
    dimensions: '15m x 28m',
    price: 13500000,
    purchaseDate: '2026-01-15',
    position: 'Angle, Vue dégagée',
    qrCode: 'QR-B45-20260115'
  };

  const payments = [
    { date: '2026-01-15', description: 'Acompte initial', amount: 5000000, method: 'Mobile Money', status: 'Payé' },
    { date: '2026-01-15', description: 'Solde', amount: 8500000, method: 'Virement bancaire', status: 'Payé' }
  ];

  const progressUpdates = [
    { date: '2026-03-01', title: 'Viabilisation progression', description: 'Réseau d\'eau: 15% d\'avancement', photos: 2 },
    { date: '2026-02-15', title: 'Début viabilisation', description: 'Travaux de terrassement commencés', photos: 3 },
    { date: '2026-01-25', title: 'Bornage complété', description: 'Toutes les limites du lot sont établies', photos: 1 }
  ];

  const tabs = [
    { id: 'progression', label: 'Progression', icon: TrendingUp },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'paiements', label: 'Paiements', icon: CreditCard },
    { id: 'messages', label: 'Messages', icon: MessageCircle }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link to="/dashboard-buyer" className="inline-flex items-center gap-2 text-gray-600 hover:text-primary mb-6">
          <ChevronLeft className="w-5 h-5" />
          Retour à mes achats
        </Link>

        {/* Purchase Header */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold mb-2">{project?.name}</h1>
              <p className="text-gray-600">{project?.location}</p>
            </div>
            <span className="px-4 py-2 bg-orange-100 text-orange-700 rounded-full font-semibold">
              🔄 Travaux en cours
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <div className="text-sm text-gray-600">Lot</div>
              <div className="text-xl font-bold">{purchaseInfo.lotNumber}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Superficie</div>
              <div className="text-xl font-bold">{purchaseInfo.surface}m²</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Prix d'achat</div>
              <div className="text-xl font-bold text-primary">
                {(purchaseInfo.price / 1000000).toFixed(1)}M FCFA
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Date d'achat</div>
              <div className="text-xl font-bold">
                {new Date(purchaseInfo.purchaseDate).toLocaleDateString('fr-FR')}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-md mb-6">
          <div className="border-b border-gray-200">
            <div className="flex overflow-x-auto">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 font-semibold whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? 'text-primary border-b-2 border-primary'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6">
            {/* Progression Tab */}
            {activeTab === 'progression' && (
              <div className="space-y-6">
                {/* Overall Progress */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-semibold">Avancement Global des Travaux</span>
                    <span className="text-primary font-bold">{project?.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div 
                      className="bg-primary rounded-full h-4 transition-all duration-500"
                      style={{ width: `${project?.progress}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>Bornage ✅</span>
                    <span>Viabilisation 🔄</span>
                    <span>Électrification ⏳</span>
                    <span>Livraison ⏳</span>
                  </div>
                </div>

                {/* Detailed Timeline */}
                <div>
                  <h3 className="font-bold text-lg mb-4">Étapes du Projet</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-white font-bold">
                          ✓
                        </div>
                        <div className="w-0.5 h-16 bg-secondary"></div>
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold">Approbation</div>
                        <div className="text-sm text-gray-600">Complété le 10/01/2026</div>
                        <div className="text-xs text-secondary font-semibold">100%</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-white font-bold">
                          ✓
                        </div>
                        <div className="w-0.5 h-16 bg-secondary"></div>
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold">Bornage</div>
                        <div className="text-sm text-gray-600">Complété le 20/01/2026</div>
                        <div className="text-xs text-secondary font-semibold">100%</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                          🔄
                        </div>
                        <div className="w-0.5 h-16 bg-gray-300"></div>
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold">Viabilisation</div>
                        <div className="text-sm text-gray-600">En cours</div>
                        <div className="text-xs text-primary font-semibold">60%</div>
                        <div className="mt-2 space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">• Terrassement</span>
                            <span className="text-secondary font-semibold">✓ 100%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">• Réseau d'eau</span>
                            <span className="text-primary font-semibold">🔄 80%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">• Réseau électrique</span>
                            <span className="text-orange-600 font-semibold">🔄 40%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">• Voirie</span>
                            <span className="text-orange-600 font-semibold">🔄 30%</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-bold">
                          ⏳
                        </div>
                        <div className="w-0.5 h-16 bg-gray-300"></div>
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-600">Électrification</div>
                        <div className="text-sm text-gray-500">Prévu: Mars 2026</div>
                        <div className="text-xs text-gray-400">0%</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-bold">
                          ⏳
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-600">Livraison</div>
                        <div className="text-sm text-gray-500">Prévu: Décembre 2026</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Updates */}
                <div>
                  <h3 className="font-bold text-lg mb-4">Mises à Jour Récentes</h3>
                  <div className="space-y-4">
                    {progressUpdates.map((update, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="font-semibold">{update.title}</div>
                            <div className="text-sm text-gray-600">{update.description}</div>
                          </div>
                          <div className="text-xs text-gray-500 whitespace-nowrap ml-4">
                            {new Date(update.date).toLocaleDateString('fr-FR')}
                          </div>
                        </div>
                        {update.photos > 0 && (
                          <div className="flex items-center gap-2 text-sm text-primary">
                            <Camera className="w-4 h-4" />
                            {update.photos} photo{update.photos > 1 ? 's' : ''} ajoutée{update.photos > 1 ? 's' : ''}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Documents Tab */}
            {activeTab === 'documents' && (
              <div className="space-y-4">
                <h3 className="font-bold text-lg">Mes Documents</h3>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-3">Documents d'Achat</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-primary" />
                        <div>
                          <div className="font-semibold">Contrat de Vente</div>
                          <div className="text-sm text-gray-500">Signé le 15/01/2026</div>
                        </div>
                      </div>
                      <button className="btn-outline text-sm py-2 px-4 flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        Télécharger
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-primary" />
                        <div>
                          <div className="font-semibold">Reçu de Paiement</div>
                          <div className="text-sm text-gray-500">15/01/2026</div>
                        </div>
                      </div>
                      <button className="btn-outline text-sm py-2 px-4 flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        Télécharger
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-primary" />
                        <div>
                          <div className="font-semibold">Attestation de Réservation</div>
                          <div className="text-sm text-gray-500">15/01/2026</div>
                        </div>
                      </div>
                      <button className="btn-outline text-sm py-2 px-4 flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        Télécharger
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-3">Documents du Projet</h4>
                  <div className="space-y-3">
                    {project?.documents.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            doc.verified ? 'bg-secondary/10 text-secondary' : 'bg-orange-100 text-orange-600'
                          }`}>
                            {doc.verified ? '✓' : '⏳'}
                          </div>
                          <div>
                            <div className="font-semibold">{doc.name}</div>
                            {doc.verified && doc.date && (
                              <div className="text-sm text-gray-500">
                                Vérifié le {new Date(doc.date).toLocaleDateString('fr-FR')}
                              </div>
                            )}
                          </div>
                        </div>
                        <button className="btn-outline text-sm py-2 px-4 flex items-center gap-2">
                          <Download className="w-4 h-4" />
                          Télécharger
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Paiements Tab */}
            {activeTab === 'paiements' && (
              <div className="space-y-6">
                <div className="bg-secondary/10 p-6 rounded-lg">
                  <div className="grid grid-cols-3 gap-6 text-center">
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Montant Total</div>
                      <div className="text-2xl font-bold">{(purchaseInfo.price / 1000000).toFixed(1)}M FCFA</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Payé</div>
                      <div className="text-2xl font-bold text-secondary">{(purchaseInfo.price / 1000000).toFixed(1)}M FCFA</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Solde</div>
                      <div className="text-2xl font-bold">0 FCFA</div>
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <span className="inline-flex items-center gap-2 bg-secondary text-white px-4 py-2 rounded-full font-semibold">
                      ✓ Entièrement Payé
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-4">Historique des Paiements</h3>
                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Date</th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Description</th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Montant</th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Méthode</th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Statut</th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Reçu</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {payments.map((payment, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 text-sm">
                              {new Date(payment.date).toLocaleDateString('fr-FR')}
                            </td>
                            <td className="px-6 py-4">{payment.description}</td>
                            <td className="px-6 py-4 font-semibold">
                              {(payment.amount / 1000000).toFixed(1)}M FCFA
                            </td>
                            <td className="px-6 py-4 text-sm">{payment.method}</td>
                            <td className="px-6 py-4">
                              <span className="inline-flex items-center gap-1 bg-secondary/10 text-secondary px-2 py-1 rounded-full text-xs font-semibold">
                                ✓ {payment.status}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <button className="text-primary hover:text-primary-dark font-semibold text-sm">
                                📄 Voir
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Messages Tab */}
            {activeTab === 'messages' && (
              <div>
                <div className="bg-gray-50 p-6 rounded-lg mb-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                      KI
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold mb-1">KOUADIO IMMOBILIER SARL</div>
                      <div className="text-sm text-gray-600">Opérateur du projet</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-gray-300 flex-shrink-0"></div>
                    <div className="flex-1">
                      <div className="bg-gray-100 p-4 rounded-lg">
                        <p className="text-sm">
                          Bonjour M. TOURÉ, nous avons le plaisir de vous informer que les travaux de viabilisation progressent bien. Le réseau d'eau est à 80%.
                        </p>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">Il y a 2 jours</div>
                    </div>
                  </div>

                  <div className="flex gap-4 flex-row-reverse">
                    <div className="w-10 h-10 rounded-full bg-primary flex-shrink-0"></div>
                    <div className="flex-1">
                      <div className="bg-primary/10 p-4 rounded-lg">
                        <p className="text-sm">
                          Merci pour cette mise à jour. Quand pourrai-je visiter mon lot ?
                        </p>
                      </div>
                      <div className="text-xs text-gray-500 mt-1 text-right">Il y a 1 jour</div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex gap-3">
                    <input
                      type="text"
                      placeholder="Tapez votre message..."
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    <button className="btn-primary">
                      Envoyer
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}