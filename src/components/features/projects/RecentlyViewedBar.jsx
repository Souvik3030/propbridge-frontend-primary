import React from 'react';
import { History } from 'lucide-react';

const formatPrice = (p) => {
  if (!p || p === 0) return '-';
  if (p >= 1_000_000) return `AED ${(p / 1_000_000).toFixed(1)}M`;
  return `AED ${p.toLocaleString()}`;
};

const RecentlyViewedBar = ({ items, onClear, onProjectClick }) => {
  if (!items || items.length === 0) return null;

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
          <History className="w-4 h-4 text-[#ccab59]" />
          <span className="font-semibold text-[14px]">Recently Viewed</span>
        </div>
        <button
          onClick={onClear}
          className="text-[12px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors font-medium"
        >
          Clear
        </button>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-1 no-scrollbar">
        {items.map((proj) => (
          <div
            key={proj.id}
            onClick={() => onProjectClick(proj)}
            className="cursor-pointer flex-shrink-0 w-[160px] bg-white dark:bg-[#111827] rounded-xl border border-[#ece7d9] dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
          >
            <div className="h-[90px] overflow-hidden bg-slate-100 dark:bg-slate-800">
              <img
                src={proj.media?.coverImage}
                alt={proj.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=400'; }}
              />
            </div>
            <div className="p-3">
              <p className="text-[13px] font-bold text-slate-800 dark:text-white truncate">{proj.title}</p>
              <p className="text-[11px] text-[#ccab59] font-semibold mt-0.5">{formatPrice(proj.price)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentlyViewedBar;
