import { Link } from 'react-router-dom';
import { MapPin, Home, TrendingUp } from 'lucide-react';

export default function ProjectCard({ project }) {
  const formatPrice = (price) => {
    return (price / 1000000).toFixed(1) + 'M';
  };

  return (
    <Link to={`/project/${project.id}`} className="card overflow-hidden block">
      {/* Image */}
      <div className="relative h-48">
        <img 
          src={project.image} 
          alt={project.name}
          className="w-full h-full object-cover"
        />
        {project.certified && (
          <div className="absolute top-3 right-3 bg-secondary text-white text-xs px-3 py-1 rounded-full font-semibold">
            ✓ Certifié Ministère
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">
          {project.name}
        </h3>
        
        <div className="flex items-center text-gray-600 text-sm mb-3">
          <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
          <span className="line-clamp-1">{project.location}</span>
        </div>

        <div className="text-sm text-gray-700 mb-3">
          {project.operator.name} <span className="text-primary">★ {project.operator.rating}</span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm mb-3">
          <div className="flex items-center text-gray-600">
            <Home className="w-4 h-4 mr-1 flex-shrink-0" />
            {project.availableLots} / {project.totalLots} lots
          </div>
          <div className="flex items-center text-gray-600">
            <TrendingUp className="w-4 h-4 mr-1 flex-shrink-0" />
            {project.progress}%
          </div>
        </div>

        <div className="text-sm text-gray-600 mb-3">
          📐 {project.surfaceMin}m² - {project.surfaceMax}m²
        </div>

        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs text-gray-500">À partir de</div>
            <div className="text-xl font-bold text-primary">
              {formatPrice(project.priceMin)} FCFA
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-2 mt-3">
          {project.features.slice(0, 3).map((feature, index) => (
            <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
              {feature}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}