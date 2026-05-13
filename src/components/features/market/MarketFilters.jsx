import React from 'react';
import { ChevronDown } from 'lucide-react';

const statuses = ['All', 'Off-Plan', 'Ready'];

const MarketFilters = ({ areas = [], selectedArea, activeStatus, onAreaChange, onStatusChange, children }) => {
  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-4 sm:p-5 shadow-sm shadow-[#00000008] dark:border-slate-800 dark:bg-slate-950 dark:shadow-[#0000001f]">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <label className="relative block min-w-[220px] rounded-2xl border border-slate-200 bg-slate-50 text-slate-900 overflow-hidden dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100">
            <select
              value={selectedArea}
              onChange={(event) => onAreaChange(event.target.value)}
              className="w-full appearance-none bg-transparent px-4 py-3 text-sm outline-none text-slate-900 dark:text-slate-100"
            >
              {areas.map((area) => (
                <option key={area} value={area} className="bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
                  {area}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute inset-y-0 right-4 top-0 flex items-center text-slate-400 dark:text-slate-300">
              <ChevronDown className="w-4 h-4" />
            </span>
          </label>

          <div className="flex flex-wrap items-center gap-2 rounded-3xl bg-slate-100 p-1 dark:bg-slate-900">
            {statuses.map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => onStatusChange(status)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  activeStatus === status
                    ? 'bg-[#fde9b7] text-slate-950 shadow-sm shadow-[#d8c18c]/30 dark:bg-[#3f351f] dark:text-white'
                    : 'text-slate-600 hover:bg-slate-200 dark:text-slate-300 dark:hover:bg-slate-800'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-start lg:justify-end">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MarketFilters;
