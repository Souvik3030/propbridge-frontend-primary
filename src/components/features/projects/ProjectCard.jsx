import React from 'react';
import { Heart, FileText, Scale, Download, Check } from 'lucide-react';
import { Card } from '../../ui/Card';
import { useProjects } from '../../../context/ProjectContext';
// import { useProjects } from '../../../../context/ProjectContext';

const formatPrice = (p) => {
  if (!p || p === 0) return 0;
  if (p >= 1_000_000) return `${(p / 1_000_000).toFixed(1)}M`;
  return p.toLocaleString();
};

const formatHandover = (pp) => {
  if (!pp || !pp[0]) return '-';
  const { downPayment: d, preHandover: pre, handover: h } = pp[0];
  if (d === undefined || pre === undefined || h === undefined) return '-';
  return `${d}/${pre}/${h}`;
};

const uniqueBeds = (ur) => {
  if (!ur || !ur.length) return [];
  return [...new Set(ur)].sort((a, b) => a - b);
};

const ProjectCard = ({ project, onProjectClick, isFavorited, onToggleFavorite, onGenerateBrochure }) => {
  const { toggleCompare, isInCompare } = useProjects();
  const beds = uniqueBeds(project.rooms);
  const handover = formatHandover(project.paymentPlan);
  const inCompare = isInCompare(project.id);
  
  const hotScore = project.score || 75; 
  const dldPriceSqft = "2,493"; // Placeholder or from API if available
  const unitsCount = project.unitsCount || 56;
  const dldTxns = 348;
  const yieldPercent = "4.9%";
  const builtUpArea = project.area?.builtUp?.toLocaleString() || "736";

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    onToggleFavorite(project.id);
  };

  const handleCompareClick = (e) => {
    e.stopPropagation();
    toggleCompare(project);
  };

  return (
    <Card
      className="overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer bg-white dark:bg-[#0f172a] flex flex-col h-full"
      onClick={() => onProjectClick(project)}
    >
      {/* Image Section */}
      <div className="relative h-[160px] overflow-hidden">
        <img
          src={project.media?.coverImage}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800'; }}
        />

        {/* TOP LEFT: Hot Badge */}
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 bg-[#ef4444] text-white text-[11px] font-black rounded uppercase tracking-wider shadow-lg">
            HOT {hotScore}
          </span>
        </div>

        {/* TOP RIGHT: Action Buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <button
            onClick={handleFavoriteClick}
            className="w-8 h-8 bg-black/40 backdrop-blur-md rounded-lg flex items-center justify-center hover:bg-black/60 transition-all border border-white/10"
          >
            <Heart className={`w-4 h-4 ${isFavorited ? 'fill-red-500 text-red-500' : 'text-white'}`} />
          </button>
          <button
            onClick={handleCompareClick}
            className={`w-8 h-8 backdrop-blur-md rounded-lg flex items-center justify-center transition-all border border-white/10 ${
              inCompare 
                ? 'bg-blue-500 hover:bg-blue-600' 
                : 'bg-black/40 hover:bg-black/60'
            }`}
          >
            {inCompare 
              ? <Check className="w-4 h-4 text-white" />
              : <Scale className="w-4 h-4 text-white" />
            }
          </button>
        </div>

        {/* BOTTOM LEFT: Status Badge */}
        <div className="absolute bottom-3 left-3">
          <span className="px-3 py-1.5 bg-black/80 backdrop-blur-sm text-white text-[12px] font-bold rounded-lg border border-white/10">
            Off-Plan
          </span>
        </div>

        {/* BOTTOM RIGHT: DLD Badge */}
        <div className="absolute bottom-3 right-3">
          <span className="px-3 py-1.5 bg-[#10b981] text-white text-[11px] font-bold rounded-lg shadow-lg border border-white/10">
            DLD: AED {dldPriceSqft}/sqft
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col flex-1">
        {/* Title & Developer */}
        <div className="mb-2.5">
          <h3 className="text-[18px] font-bold text-slate-900 dark:text-white mb-0.5 leading-tight">{project.title}</h3>
          <p className="text-[12px] text-slate-500 dark:text-slate-400">
            by <span className="text-[#a38847] dark:text-[#ccab59] font-bold">{project.developer?.name}</span> · {project.location?.city}, {project.location?.community}
          </p>
        </div>

        {/* Metric Pills Row */}
        <div className="flex flex-wrap items-center gap-1.5 mb-3">
          <span className="px-2 py-0.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-[10px] font-bold rounded-md border border-blue-100/50 dark:border-blue-900/40">
            {project.type?.sub || 'Apartments'}
          </span>
          <span className="px-2 py-0.5 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 text-[10px] font-bold rounded-md border border-purple-100/50 dark:border-purple-900/40">
            {beds.join(', ')} BR
          </span>
          <span className="px-2 py-0.5 bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 text-[10px] font-bold rounded-md border border-slate-100 dark:border-slate-800">
            {builtUpArea} sqft
          </span>
          <span className="px-2 py-0.5 bg-emerald-50 dark:bg-emerald-900/10 text-emerald-600 dark:text-emerald-500 text-[10px] font-bold rounded-md border border-emerald-100 dark:border-emerald-900/20">
            {unitsCount} units
          </span>
          <span className="px-2 py-0.5 bg-emerald-50 dark:bg-emerald-900/10 text-emerald-600 dark:text-emerald-500 text-[10px] font-bold rounded-md border border-emerald-100 dark:border-emerald-900/20">
            {dldTxns} sales
          </span>
          <span className="px-2 py-0.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-[10px] font-bold rounded-md border border-blue-100/50 dark:border-blue-900/40">
            {yieldPercent} yield
          </span>
        </div>

        {/* Secondary Info Line */}
        {/* <p className="text-[11px] text-slate-400 dark:text-slate-500 mb-4 font-medium italic">
          Creek Metro Station · City Centre Mirdif
        </p> */}

        {/* Price & Plan Line */}
        <div className="mt-auto mb-4 pb-4 border-b border-slate-100 dark:border-slate-800/50 flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="text-[14px] font-bold text-[#ccab59] opacity-70">AED</span>
            <span className="text-[20px] font-black text-slate-900 dark:text-white tracking-tight">
              {formatPrice(project.price)}
            </span>
          </div>
          <span className="text-[13px] font-bold text-slate-400 tracking-wider">
            {handover}
          </span>
        </div>

        {/* 3-Button Footer */}
        <div className="grid grid-cols-12 gap-1.5">
          <button 
            onClick={onGenerateBrochure}
            className="col-span-4 flex items-center justify-center gap-1.5 px-2 py-2 bg-[#fdf8e9] dark:bg-slate-800 border border-[#f3e8c1] dark:border-slate-700 text-[#a38847] dark:text-[#ccab59] rounded-lg text-[11px] font-black hover:bg-[#f9f1d0] transition-colors"
          >
            <Download className="w-3 h-3" /> Brochure
          </button>
          
          <button 
            onClick={(e) => {
              e.stopPropagation();
              const doc = project.documents?.find(d => d.tag === 'project_brochure') || project.documents?.[0];
              if (doc?.url) window.open(doc.url, '_blank');
            }}
            className={`col-span-4 flex items-center justify-center gap-1.5 px-2 py-2 rounded-lg text-[11px] font-black transition-colors whitespace-nowrap overflow-hidden ${
              project.documents?.length > 0 
                ? 'bg-[#eff6ff] dark:bg-slate-800 border border-[#dbeafe] dark:border-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-[#dbeafe]' 
                : 'bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-300 dark:text-slate-600 cursor-not-allowed opacity-50'
            }`}
            disabled={!project.documents?.length}
          >
            <Download className="w-3 h-3" /> Dev PDF
          </button>
          <div className="col-span-4 flex items-center justify-center text-center px-1 py-2 bg-[#f0fdf4] dark:bg-slate-800/50 border border-[#dcfce7] dark:border-emerald-900/20 text-[#10b981] rounded-lg text-[9px] font-black leading-tight">
            <span>{dldTxns} sales · AED {dldPriceSqft}/sqft</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProjectCard;
