import React from 'react';
import { Download } from 'lucide-react';

const formatPrice = (p) => {
  if (!p || p === 0) return '-';
  if (p >= 1_000_000) return `AED ${(p / 1_000_000).toFixed(1)}M`;
  return `AED ${p.toLocaleString()}`;
};

const uniqueBedsStr = (ur) => {
  if (!ur || !ur.length) return '';
  return [...new Set(ur)].sort((a, b) => a - b).join(', ') + ' BR';
};

const ProjectHeader = ({ project, onGenerateBrochure }) => {
  return (
    <div className="bg-white dark:bg-[#111827] rounded-xl p-6 shadow-sm border border-[#ece7d9] dark:border-slate-800 mb-6">
      {/* Tags */}
      <div className="flex items-center gap-2 mb-4">
        <span className="px-3 py-1 bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 text-xs font-bold rounded-md">
          Bayut Off-Plan
        </span>
        <span className="px-3 py-1 bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400 text-xs font-bold rounded-md capitalize">
          {project.status?.completionStatus?.replace('-', ' ')}
        </span>
        {project.type?.sub && (
          <span className="px-3 py-1 bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-500 text-xs font-bold rounded-md">
            {project.type.sub}
          </span>
        )}
        <button 
          onClick={onGenerateBrochure}
          className="ml-auto flex items-center gap-2 px-4 py-1.5 bg-[#fdfaf3] dark:bg-slate-800 text-[#ccab59] border border-[#ece7d9] dark:border-slate-700 rounded-lg font-black text-xs hover:bg-white dark:hover:bg-slate-700 transition-all shadow-sm"
        >
          <Download size={14} /> Generate Brochure
        </button>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{project.title}</h1>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">
        by <span className="font-semibold text-[#ccab59]">{project.developer?.name}</span> · {project.location?.community}, {project.location?.city}
      </p>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-3">
        <div className="bg-[#fcfaf5] dark:bg-slate-800/50 p-3 rounded-xl flex flex-col items-center justify-center text-center">
          <span className="text-[#ccab59] font-bold text-[15px]">{formatPrice(project.price)}</span>
          <span className="text-[10px] text-slate-400 font-medium mt-1">Starting Price</span>
        </div>
        <div className="bg-[#fcfaf5] dark:bg-slate-800/50 p-3 rounded-xl flex flex-col items-center justify-center text-center">
          <span className="text-blue-500 font-bold text-[13px] leading-tight flex flex-col">
            <span>{project.type?.main} ·</span>
            <span>{project.type?.sub}</span>
          </span>
          <span className="text-[10px] text-slate-400 font-medium mt-1">Type</span>
        </div>
        <div className="bg-[#fcfaf5] dark:bg-slate-800/50 p-3 rounded-xl flex flex-col items-center justify-center text-center">
          <span className="text-purple-500 font-bold text-[14px]">
            {uniqueBedsStr(project.rooms) || '-'}
          </span>
          <span className="text-[10px] text-slate-400 font-medium mt-1">Bedrooms</span>
        </div>
        <div className="bg-[#fcfaf5] dark:bg-slate-800/50 p-3 rounded-xl flex flex-col items-center justify-center text-center">
          <span className="text-slate-900 dark:text-white font-bold text-[14px]">
            {project.area?.builtUp?.toLocaleString()} {project.area?.unit}
          </span>
          <span className="text-[10px] text-slate-400 font-medium mt-1">Area</span>
        </div>
        <div className="bg-[#fcfaf5] dark:bg-slate-800/50 p-3 rounded-xl flex flex-col items-center justify-center text-center">
          <span className="text-emerald-500 font-bold text-[14px]">{project.unitsCount}</span>
          <span className="text-[10px] text-slate-400 font-medium mt-1">Units Listed</span>
        </div>
        <div className="bg-[#fcfaf5] dark:bg-slate-800/50 p-3 rounded-xl flex flex-col items-center justify-center text-center">
          <span className="text-purple-500 font-bold text-[13px] capitalize leading-snug">
            {project.status?.completionStatus?.replace('-', ' ')}
          </span>
          <span className="text-[10px] text-slate-400 font-medium mt-1">Completion</span>
        </div>
        <div className="bg-[#fcfaf5] dark:bg-slate-800/50 p-3 rounded-xl flex flex-col items-center justify-center text-center">
          <span className="text-slate-900 dark:text-white font-bold text-[14px]">{"\u2014"}</span>
          <span className="text-[10px] text-slate-400 font-medium mt-1">Start Date</span>
        </div>
        <div className="bg-[#fcfaf5] dark:bg-slate-800/50 p-3 rounded-xl flex flex-col items-center justify-center text-center">
          <span className="text-blue-500 font-bold text-[14px]">{project.status?.completionDate}</span>
          <span className="text-[10px] text-slate-400 font-medium mt-1">Handover</span>
        </div>
      </div>
    </div>
  );
};

export default ProjectHeader;
