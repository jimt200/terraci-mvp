import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-10 px-4 pb-24 md:pb-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-8">
          {/* Logo */}
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">T</span>
              </div>
              <span className="font-bold text-white text-lg">
                Terra<span className="text-orange-500">Ci</span>
              </span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              Plateforme de sécurisation foncière en Côte d'Ivoire.
            </p>
          </div>

          {/* Liens */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Explorer</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/search" className="hover:text-orange-400 transition-colors">Rechercher</Link></li>
              <li><Link to="/advanced-search" className="hover:text-orange-400 transition-colors">Recherche avancée</Link></li>
              <li><Link to="/comparator" className="hover:text-orange-400 transition-colors">Comparateur</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Espaces</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/dashboard-buyer" className="hover:text-orange-400 transition-colors">Acheteur</Link></li>
              <li><Link to="/dashboard-operator" className="hover:text-orange-400 transition-colors">Opérateur</Link></li>
              <li><Link to="/dashboard-admin" className="hover:text-orange-400 transition-colors">Administrateur</Link></li>
              <li><Link to="/dashboard-ministry" className="hover:text-orange-400 transition-colors">Ministère</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li className="text-gray-500">contact@terraci.ci</li>
              <li className="text-gray-500">+225 07 00 00 00</li>
              <li className="text-gray-500">Abidjan, Côte d'Ivoire</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-600">© 2024 TerraCi — Hokma Labs. Tous droits réservés.</p>
          <p className="text-xs text-gray-600">Développé avec ❤️ pour la Côte d'Ivoire</p>
        </div>
      </div>
    </footer>
  );
}