import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">TerraCi</h3>
            <p className="text-gray-400">
              La plateforme qui sécurise vos investissements fonciers en Côte d'Ivoire
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Liens Rapides</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/search" className="hover:text-white transition-colors">Rechercher</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Comment ça marche</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Légal</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Conditions d'utilisation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Politique de confidentialité</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Mentions légales</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Email: contact@terraci.ci</li>
              <li>Tél: +225 27 XX XX XX XX</li>
              <li>Abidjan, Côte d'Ivoire</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2026 TerraCi by Hokma Labs. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}