import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ChevronRight, ChevronLeft, Upload, MapPin, Home, DollarSign, Calendar, FileText } from 'lucide-react';

export default function CreateProject() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    type: 'Lotissement résidentiel',
    description: '',
    startDate: '',
    deliveryDate: '',
    totalBudget: '',
    status: 'En planification',
    city: 'Abidjan',
    commune: '',
    address: '',
    gpsCoordinates: '',
    totalLots: '',
    priceMin: '',
    priceMax: '',
    surfaceMin: '',
    surfaceMax: '',
    mainImage: null,
    additionalImages: [],
    sitePlan: null
  });

  const steps = [
    { number: 1, title: 'Informations Générales', icon: FileText },
    { number: 2, title: 'Localisation', icon: MapPin },
    { number: 3, title: 'Détails des Lots', icon: Home },
    { number: 4, title: 'Documents', icon: Upload },
    { number: 5, title: 'Publication', icon: ChevronRight }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = () => {
    if (currentStep < 5) setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = () => {
    alert('Projet créé avec succès ! (Fonctionnalité de démo)');
    navigate('/dashboard-operator');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Créer un Nouveau Projet</h1>
          <p className="text-gray-600">Remplissez les informations pour soumettre votre projet à validation</p>
        </div>

        {/* Progress Steps */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-colors ${
                    currentStep >= step.number 
                      ? 'bg-primary text-white' 
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    <step.icon className="w-6 h-6" />
                  </div>
                  <span className={`text-sm font-medium ${
                    currentStep >= step.number ? 'text-primary' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-1 mx-4 ${
                    currentStep > step.number ? 'bg-primary' : 'bg-gray-200'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-xl shadow-md p-8">
          {/* Step 1: Informations Générales */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6">Informations Générales</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom du Projet *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Ex: Résidence Jardin de Cocody"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type de Projet *
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option>Lotissement résidentiel</option>
                  <option>Projet commercial</option>
                  <option>Mixte (résidentiel + commercial)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description du Projet *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={5}
                  placeholder="Décrivez votre projet en détail : emplacement, avantages, infrastructures prévues..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date de Début *
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date de Livraison Prévue *
                  </label>
                  <input
                    type="date"
                    name="deliveryDate"
                    value={formData.deliveryDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Budget Total du Projet
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      name="totalBudget"
                      value={formData.totalBudget}
                      onChange={handleInputChange}
                      placeholder="2500000000"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                      FCFA
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Statut du Projet
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option>En planification</option>
                    <option>En cours</option>
                    <option>En finition</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Localisation */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6">Localisation</h2>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ville *
                  </label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option>Abidjan</option>
                    <option>Bouaké</option>
                    <option>San Pedro</option>
                    <option>Yamoussoukro</option>
                    <option>Daloa</option>
                    <option>Bingerville</option>
                    <option>Grand-Bassam</option>
                    <option>Korhogo</option>
                    <option>Man</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Commune / Quartier *
                  </label>
                  <input
                    type="text"
                    name="commune"
                    value={formData.commune}
                    onChange={handleInputChange}
                    placeholder="Ex: Cocody, Riviera Golf"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Adresse Complète *
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Rue, Boulevard, Indication précise..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Coordonnées GPS (optionnel)
                </label>
                <input
                  type="text"
                  name="gpsCoordinates"
                  value={formData.gpsCoordinates}
                  onChange={handleInputChange}
                  placeholder="Ex: 5.3600° N, 4.0083° W"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold mb-4">Aperçu Localisation</h3>
                <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                  <MapPin className="w-12 h-12 text-gray-400" />
                  <span className="ml-3 text-gray-500">Carte interactive (à venir)</span>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Détails des Lots */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6">Détails des Lots</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre Total de Lots *
                </label>
                <input
                  type="number"
                  name="totalLots"
                  value={formData.totalLots}
                  onChange={handleInputChange}
                  placeholder="120"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div className="bg-primary/5 border-l-4 border-primary p-4 rounded">
                <p className="text-sm text-gray-700">
                  💡 <strong>Conseil :</strong> Vous pourrez gérer chaque lot individuellement (prix, dimensions, statut) après création du projet.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Fourchette de Prix</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Prix Minimum *
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        name="priceMin"
                        value={formData.priceMin}
                        onChange={handleInputChange}
                        placeholder="8500000"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                      <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                        FCFA
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Prix Maximum *
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        name="priceMax"
                        value={formData.priceMax}
                        onChange={handleInputChange}
                        placeholder="15000000"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                      <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                        FCFA
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Fourchette de Superficie</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Superficie Minimum *
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        name="surfaceMin"
                        value={formData.surfaceMin}
                        onChange={handleInputChange}
                        placeholder="250"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                      <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                        m²
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Superficie Maximum *
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        name="surfaceMax"
                        value={formData.surfaceMax}
                        onChange={handleInputChange}
                        placeholder="600"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                      <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                        m²
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Documents */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6">Upload des Documents</h2>
              
              <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded mb-6">
                <p className="text-sm text-orange-700">
                  ⚠️ Tous les documents sont requis pour la validation par l'équipe TerraCi
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image Principale du Projet *
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">Glissez votre image ici ou cliquez pour parcourir</p>
                  <p className="text-sm text-gray-500">JPG, PNG - Max 5MB</p>
                  <input type="file" className="hidden" accept="image/*" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Images Supplémentaires (Max 10)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">Ajoutez plusieurs images</p>
                  <p className="text-sm text-gray-500">JPG, PNG - Max 5MB chacune</p>
                  <input type="file" className="hidden" accept="image/*" multiple />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Plan de Lotissement *
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">Upload du plan géoréférencé</p>
                  <p className="text-sm text-gray-500">PDF, JPG, PNG - Max 10MB</p>
                  <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" />
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold mb-4">Documents Légaux (À ajouter après création)</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Arrêté d'Approbation du Lotissement</li>
                  <li>• Certificat Foncier / Titre Foncier</li>
                  <li>• Permis de Lotir</li>
                  <li>• Rapport de Bornage Géomètre</li>
                  <li>• Étude d'Impact Environnemental</li>
                </ul>
              </div>
            </div>
          )}

          {/* Step 5: Publication */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6">Récapitulatif et Publication</h2>
              
              <div className="bg-secondary/10 border border-secondary rounded-lg p-6 mb-6">
                <h3 className="font-bold text-secondary mb-2">✓ Projet Prêt pour Soumission</h3>
                <p className="text-sm text-gray-700">
                  Votre projet sera examiné par l'équipe TerraCi sous 5-7 jours ouvrés.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="font-bold mb-4">Résumé du Projet</h3>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Nom:</span>
                    <p className="font-semibold">{formData.name || 'Non renseigné'}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Type:</span>
                    <p className="font-semibold">{formData.type}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Ville:</span>
                    <p className="font-semibold">{formData.city}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Commune:</span>
                    <p className="font-semibold">{formData.commune || 'Non renseigné'}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Nombre de lots:</span>
                    <p className="font-semibold">{formData.totalLots || 'Non renseigné'}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Prix:</span>
                    <p className="font-semibold">
                      {formData.priceMin && formData.priceMax 
                        ? `${(formData.priceMin/1000000).toFixed(1)}M - ${(formData.priceMax/1000000).toFixed(1)}M FCFA`
                        : 'Non renseigné'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded">
                <p className="text-sm text-orange-700">
                  <strong>Prochaines étapes :</strong><br/>
                  1. Examen de votre dossier par notre équipe<br/>
                  2. Vérification des documents<br/>
                  3. Validation et mise en ligne<br/>
                  4. Vous recevrez une notification par email
                </p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
                currentStep === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
              Précédent
            </button>

            {currentStep < 5 ? (
              <button
                onClick={nextStep}
                className="flex items-center gap-2 btn-primary"
              >
                Suivant
                <ChevronRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="btn-primary"
              >
                Soumettre pour Validation
              </button>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}