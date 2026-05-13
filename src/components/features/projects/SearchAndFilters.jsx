import React, { useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import AdvancedFiltersDrawer from './AdvancedFiltersDrawer';

const filterOptions = [
  { key: 'type',      label: 'All Types',      options: ['All Types', 'Villas', 'Apartments', 'Townhouses', 'Penthouses'] },
  { key: 'status',    label: 'All Status',     options: ['All Status', 'Under Construction', 'Ready', 'Off-Plan'] },
  { key: 'beds',      label: 'All Beds',       options: ['All Beds', 'Studio', '1 BR', '2 BR', '3 BR', '4 BR', '5+ BR'] },
  { key: 'price',     label: 'All Prices',     options: ['All Prices', 'Under AED 1M', 'AED 1M–3M', 'AED 3M–5M', 'AED 5M+'] },
  { key: 'developer', label: 'All Developers', options: ['All Developers', 'Emaar', 'DAMAC Properties', 'Meraas', 'Sobha Realty', 'Aldar'] },
  { key: 'area',      label: 'All Areas',      options: ['All Areas', 'Dubai Hills Estate', 'Dubai Creek Harbour', 'DAMAC Islands 2', 'Business Bay', 'JVC'] },
];

const SearchAndFilters = ({ searchQuery, setSearchQuery, filters, setFilters }) => {
  const [showDrawer, setShowDrawer] = useState(false);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleAdvancedApply = (advFilters) => {
    setFilters((prev) => ({ ...prev, advanced: advFilters }));
  };

  const hasAdvanced = filters.advanced && Object.values(filters.advanced).some(v =>
    Array.isArray(v) ? v.length > 0 : (v !== '' && v !== 'All')
  );

  return (
    <>
      <AdvancedFiltersDrawer
        open={showDrawer}
        onClose={() => setShowDrawer(false)}
        onApply={handleAdvancedApply}
      />

      <div className="pt-5 pb-2">
        {/* Search Row */}
        <div className="flex gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects, developers, areas..."
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-[#111827] border border-[#ece7d9] dark:border-slate-700 rounded-lg text-[14px] text-slate-700 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-[#ccab59] transition-colors"
            />
          </div>
          <button
            onClick={() => setShowDrawer(true)}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-lg border font-bold text-[13px] transition-colors relative ${
              hasAdvanced
                ? 'bg-[#ccab59] text-white border-[#ccab59]'
                : 'bg-white dark:bg-[#111827] border-[#ece7d9] dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-[#ccab59]'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
            {hasAdvanced && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-500 rounded-full text-[9px] font-black text-white flex items-center justify-center">
                ✓
              </span>
            )}
          </button>
        </div>

        {/* Quick Filter Dropdowns Row */}
        <div className="flex flex-wrap gap-2">
          {filterOptions.map((f) => (
            <select
              key={f.key}
              value={filters[f.key] || f.label}
              onChange={(e) => handleFilterChange(f.key, e.target.value)}
              className="px-3 py-2 bg-white dark:bg-[#111827] border border-[#ece7d9] dark:border-slate-700 rounded-md text-[13px] text-slate-600 dark:text-slate-300 focus:outline-none focus:border-[#ccab59] cursor-pointer hover:border-slate-300 transition-colors appearance-none pr-8 min-w-[105px]"
              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2.5'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 9px center' }}
            >
              {f.options.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          ))}
        </div>
      </div>
    </>
  );
};

export default SearchAndFilters;
