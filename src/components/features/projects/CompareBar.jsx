import React from 'react';
import { X } from 'lucide-react';
import { useProjects } from '../../../context/ProjectContext';

const CompareBar = ({ onCompareNow }) => {
  const { compareList, removeFromCompare, clearCompare } = useProjects();

  if (compareList.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 bg-white dark:bg-[#111827] border-t border-slate-200 dark:border-slate-800 shadow-[0_-4px_30px_rgba(0,0,0,0.1)]">
      {/* Left: Thumbnail chips */}
      <div className="flex items-center gap-3">
        {compareList.map(proj => (
          <div key={proj.i} className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700">
            <img
              src={proj.cv}
              alt={proj.t}
              className="w-8 h-8 rounded-lg object-cover"
              onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=100'; }}
            />
            <span className="text-[13px] font-bold text-slate-700 dark:text-slate-200">{proj.t}</span>
            <button
              onClick={() => removeFromCompare(proj.i)}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* Right: Controls */}
      <div className="flex items-center gap-4">
        <span className="text-[13px] font-medium text-slate-400">
          {compareList.length} of 4 selected
        </span>
        <button
          onClick={clearCompare}
          className="text-[13px] font-bold text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
        >
          Clear All
        </button>
        <button
          onClick={onCompareNow}
          disabled={compareList.length < 2}
          className="px-6 py-2.5 bg-[#ccab59] disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl text-[14px] font-black hover:bg-[#b0934c] transition-colors shadow-sm"
        >
          Compare Now
        </button>
      </div>
    </div>
  );
};

export default CompareBar;
