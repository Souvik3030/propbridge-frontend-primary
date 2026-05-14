import React from 'react';
import { ChevronDown } from 'lucide-react';

const statuses = ['All', 'Off-Plan', 'Ready'];

const MarketFilters = ({ areas = [], selectedArea, activeStatus, onAreaChange, onStatusChange, children }) => {
  return (
    <div className="flex flex-wrap items-center gap-3 mb-6 animate-in fade-in slide-in-from-top-2 duration-500 delay-150">
      {/* Area Selector */}
      <div className="relative group">
        <select
          value={selectedArea}
          onChange={(event) => onAreaChange(event.target.value)}
          className="appearance-none pl-3 pr-9 py-2 rounded-lg border border-slate-200/60 dark:border-white/5 bg-white dark:bg-[#1a1f33] text-[#1a1a2e] dark:text-[#f0f0f0] text-[12px] font-medium focus:outline-none focus:border-[#c9a84c30] transition-all cursor-pointer shadow-sm"
        >
          {areas.map((area) => (
            <option key={area} value={area} className="bg-white dark:bg-[#1a1f33]">
              {area}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 dark:text-[#8892a4] pointer-events-none transition-transform group-hover:translate-y-[-40%]" />
      </div>

      {/* Status Toggle */}
      <div className="flex gap-0.5 bg-[#f3f0e8] dark:bg-white/5 rounded-lg p-[3px] shadow-inner">
        {statuses.map((status) => (
          <button
            key={status}
            type="button"
            onClick={() => onStatusChange(status)}
            className={`px-4 py-1.5 rounded-md text-[11px] font-[700] transition-all duration-200 uppercase tracking-tight ${
              activeStatus === status
                ? 'bg-white dark:bg-[#c9a84c1a] text-[#a38847] dark:text-[#c9a84c] shadow-sm'
                : 'text-slate-500 dark:text-[#8892a4] hover:text-[#a38847] dark:hover:text-[#c9a84c]'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Action Slot (Export Button) */}
      <div className="ml-auto">
        {children}
      </div>
    </div>
  );
};

export default MarketFilters;
