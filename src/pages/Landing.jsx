import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProjectCard from '../components/ProjectCard';
import { projects } from '../data/projects';
import { Shield, FileText, Map, DollarSign, TrendingUp, Users } from 'lucide-react';

export default function Landing() {
  const featuredProjects = projects.slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Investissez en Toute Sécurité dans l'Immobilier Ivoirien
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-orange-100">
              La première plateforme digitale qui sécurise vos achats de terrains et préfinancements de projets de lotissement
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/dashboard-operator" className="bg-white text-primary hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg transition-colors text-lg">
                Je suis Opérateur
              </Link>
              <Link to="/search" className="bg-secondary hover:bg-secondary-dark text-white font-semibold py-4 px-8 rounded-lg transition-colors text-lg">
                Je cherche un terrain
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Pourquoi Choisir TerraCi ?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="font-bold text-lg mb-2">Sécurité Garantie</h3>
              <p className="text-gray-600">Tous les projets validés par notre équipe et supervisés par le Ministère</p>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">Transparence Totale</h3>
              <p className="text-gray-600">Accès à toute la documentation légale et suivi en temps réel</p>
            </div>

            <div className="text-center">
              <div className="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Map className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="font-bold text-lg mb-2">Plans Interactifs</h3>
              <p className="text-gray-600">Visualisez et choisissez votre lot directement en ligne</p>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">Paiement Sécurisé</h3>
              <p className="text-gray-600">Compte séquestre et traçabilité blockchain</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Comment Ça Marche ?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="font-bold text-lg mb-2">Recherchez un Projet</h3>
              <p className="text-gray-600">Parcourez les projets par ville, prix ou superficie</p>
            </div>

            <div className="text-center">
              <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="font-bold text-lg mb-2">Consultez Documentation</h3>
              <p className="text-gray-600">Vérifiez tous les documents légaux et le plan de lotissement</p>
            </div>

            <div className="text-center">
              <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="font-bold text-lg mb-2">Achetez en Sécurité</h3>
              <p className="text-gray-600">Paiement sécurisé et suivi de l'évolution des travaux</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Projets en Vedette</h2>
            <Link to="/search" className="text-primary hover:text-primary-dark font-semibold">
              Voir tous les projets →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">150+</div>
              <div className="text-orange-100">Projets Enregistrés</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">5,000+</div>
              <div className="text-orange-100">Terrains Disponibles</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">10,000+</div>
              <div className="text-orange-100">Acheteurs Satisfaits</div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block bg-secondary/10 px-6 py-3 rounded-full mb-4">
            <p className="text-secondary font-semibold">✓ Supervisé par le Ministère de la Construction</p>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            Votre investissement est entre de bonnes mains
          </h2>
        </div>
      </section>

      <Footer />
    </div>
  );
}