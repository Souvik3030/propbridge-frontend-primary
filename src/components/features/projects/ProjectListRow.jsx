import React from 'react';
import { Download, Heart, Scale } from 'lucide-react';
import { Card } from '../../ui/Card';

const formatPrice = (p) => {
  if (!p || p === 0) return '-';
  if (p >= 1_000_000) return `AED ${(p / 1_000_000).toFixed(1)}M`;
  return `AED ${p.toLocaleString()}`;
};

const uniqueBeds = (ur) => {
  if (!ur || !ur.length) return [];
  return [...new Set(ur)].sort((a, b) => a - b);
};

const ProjectListRow = ({ project, onProjectClick, isFavorited, onToggleFavorite, onGenerateBrochure }) => {
  const beds = uniqueBeds(project.rooms);

  return (
    <Card
      className="flex items-center gap-4 p-4 cursor-pointer hover:shadow-md transition-all group"
      onClick={() => onProjectClick(project)}
    >
      {/* Image */}
      <div className="w-[160px] h-[100px] rounded-xl overflow-hidden flex-shrink-0 bg-slate-100 dark:bg-slate-800">
        <img
          src={project.media?.coverImage}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=400'; }}
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h3 className="text-[15px] font-bold text-slate-800 dark:text-white mb-0.5 truncate">{project.title}</h3>
        <p className="text-[12px] text-slate-400 dark:text-slate-500 mb-2">
          by <span className="text-[#ccab59] font-semibold">{project.developer?.name}</span>
          {project.location?.community && ` · ${project.location.community}, ${project.location.city}`}
        </p>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[15px] font-bold text-[#ccab59]">{formatPrice(project.price)}</span>
          {project.unitsCount > 0 && (
            <span className="px-2 py-0.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 text-[11px] font-semibold rounded-md">
              {project.unitsCount} units
            </span>
          )}
          {beds.length > 0 && (
            <span className="text-[12px] text-slate-400">{beds.join(', ')} BR</span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <button
          onClick={(e) => { e.stopPropagation(); onToggleFavorite(project.id); }}
          className="p-2 text-slate-300 dark:text-slate-600 hover:text-red-400 transition-colors"
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-red-400 text-red-400' : ''}`} />
        </button>
        <button
          onClick={onGenerateBrochure}
          className="p-2 text-slate-300 dark:text-slate-600 hover:text-[#ccab59] transition-all"
          title="Generate Brochure"
        >
          <Download className="w-4 h-4" />
        </button>
        <button
          onClick={(e) => e.stopPropagation()}
          className="p-2 text-slate-300 dark:text-slate-600 hover:text-blue-400 transition-colors"
        >
          <Scale className="w-4 h-4" />
        </button>
      </div>
    </Card>
  );
};

export default ProjectListRow;
