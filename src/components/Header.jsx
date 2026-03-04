import { Link } from 'react-router-dom';
import { Menu, Bell, User } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">T</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">TerraCi</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary transition-colors">
              Accueil
            </Link>
            <Link to="/search" className="text-gray-700 hover:text-primary transition-colors">
              Rechercher
            </Link>
            <Link to="/dashboard-operator" className="text-gray-700 hover:text-primary transition-colors">
              Opérateur
            </Link>
            <Link to="/dashboard-buyer" className="text-gray-700 hover:text-primary transition-colors">
              Acheteur
            </Link>
            <Link to="/dashboard-admin" className="text-gray-700 hover:text-primary transition-colors">
              Admin
            </Link>
          </nav>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Bell className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <User className="w-5 h-5 text-gray-600" />
            </button>
            <button className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Menu className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}