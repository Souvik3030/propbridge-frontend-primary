import React from 'react';
import { Heart, Download, Save, Share2, LayoutGrid, List, Map } from 'lucide-react';

const sortOptions = [
  { id: 'default', label: 'Default' },
  { id: 'hottest', label: '🔥 Hottest' },
  { id: 'price_asc', label: 'Price ↑' },
  { id: 'price_desc', label: 'Price ↓' },
  { id: 'best_yield', label: 'Best Yield' },
  { id: 'dld_sales', label: 'DLD Sales' },
  { id: 'most_units', label: 'Most Units' },
  { id: 'newest', label: 'Newest' },
  { id: 'pct_complete', label: '% Complete' },
  { id: 'dev_az', label: 'Developer A-Z' },
  { id: 'name_az', label: 'Name A-Z' },
  { id: 'aed_sqft', label: 'AED/Sqft' },
  { id: 'handover_asc', label: 'Handover ↑' },
  { id: 'area_asc', label: 'Area ↑' },
  { id: 'area_desc', label: 'Area ↓' },
];

const SortAndViewBar = ({
  activeSort, setActiveSort,
  viewMode, setViewMode,
  showStats, setShowStats,
  favorites = 0,
  totalShowing = 0,
  totalCount = 0,
}) => {
  return (
    <div className="space-y-3 mb-4">
      {/* Sort Row */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        <span className="text-[12px] text-slate-500 dark:text-slate-400 font-semibold whitespace-nowrap flex-shrink-0">Sort:</span>
        {sortOptions.map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveSort(s.id)}
            className={`px-3 py-1.5 rounded-lg text-[12px] font-medium whitespace-nowrap flex-shrink-0 transition-colors border ${
              activeSort === s.id
                ? 'border-[#ccab59] text-[#a38847] dark:text-[#ccab59] bg-[#ccab59]/10'
                : 'border-[#ece7d9] dark:border-slate-700 text-slate-500 dark:text-slate-400 bg-white dark:bg-[#111827] hover:border-slate-300 dark:hover:border-slate-500'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Actions Row */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap">
          <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#ece7d9] dark:border-slate-700 bg-white dark:bg-[#111827] text-slate-500 dark:text-slate-400 text-[12px] font-medium hover:border-red-200 hover:text-red-500 transition-colors">
            <Heart className="w-3.5 h-3.5" />
            {favorites} Favorites
          </button>
          <button
            onClick={() => setShowStats(!showStats)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#ccab59]/40 bg-[#ccab59]/10 text-[#a38847] dark:text-[#ccab59] text-[12px] font-semibold hover:bg-[#ccab59]/20 transition-colors"
          >
            {showStats ? 'Hide Stats' : 'Show Stats'}
          </button>
          <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#ece7d9] dark:border-slate-700 bg-white dark:bg-[#111827] text-slate-500 dark:text-slate-400 text-[12px] font-medium hover:border-blue-200 hover:text-blue-500 transition-colors">
            <Download className="w-3.5 h-3.5 text-blue-400" />
            Export CSV
          </button>
          <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#ece7d9] dark:border-slate-700 bg-white dark:bg-[#111827] text-slate-500 dark:text-slate-400 text-[12px] font-medium hover:border-slate-300 transition-colors">
            <Save className="w-3.5 h-3.5" />
            Save
          </button>
          <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#ece7d9] dark:border-slate-700 bg-white dark:bg-[#111827] text-slate-500 dark:text-slate-400 text-[12px] font-medium hover:border-slate-300 transition-colors">
            <Share2 className="w-3.5 h-3.5" />
            Share
          </button>

        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-1 bg-white dark:bg-[#111827] border border-[#ece7d9] dark:border-slate-700 rounded-xl p-1 flex-shrink-0">
          {[
            { id: 'grid', icon: <LayoutGrid className="w-4 h-4" />, label: 'Grid' },
            { id: 'list', icon: <List className="w-4 h-4" />, label: 'List' },
            { id: 'map', icon: <Map className="w-4 h-4" />, label: 'Map' },
          ].map((v) => (
            <button
              key={v.id}
              onClick={() => setViewMode(v.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-colors ${
                viewMode === v.id
                  ? 'bg-[#ccab59]/15 text-[#a38847] dark:text-[#ccab59] border border-[#ccab59]/30'
                  : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
              }`}
            >
              {v.icon}
              {v.label}
            </button>
          ))}
        </div>
      </div>

      {/* Count */}
      <p className="text-[12px] text-slate-500 dark:text-slate-400">
        Showing 1–{Math.min(totalShowing, totalCount)} of {totalCount.toLocaleString()} projects
      </p>
    </div>
  );
};

export default SortAndViewBar;
