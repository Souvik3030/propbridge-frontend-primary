import React, { useMemo, useState } from 'react';
import { DLD_TOP_AREAS } from '../../../data/mockData';
import { ChevronDown } from 'lucide-react';

const formatNumber = (value) => Number(value).toLocaleString();

const MarketAreaComparison = () => {
  const areaOptions = useMemo(
    () => DLD_TOP_AREAS.map((area) => area.area),
    []
  );

  const [area1, setArea1] = useState('');
  const [area2, setArea2] = useState('');

  const tableData = useMemo(
    () =>
      DLD_TOP_AREAS.map((area, index) => {
        const sales = area.sales;
        const offPlan = area.offPlan;
        const ready = Math.max(0, sales - offPlan);
        const freehold = Math.round(sales * 1.3);
        return {
          id: index + 1,
          area: area.area,
          sales,
          offPlan,
          ready,
          avgPrice: area.avgPrice,
          sqft: area.avgSqft,
          freehold,
        };
      }),
    []
  );

  return (
    <div className="flex flex-col gap-8">
      {/* Area Comparison Selectors */}
      <div>
        <h3 className="text-[18px] font-bold font-serif text-[#111424] dark:text-[#f0f0f0] mb-3 transition-colors">
          Area Comparison
        </h3>
        <div className="flex flex-wrap gap-2.5">
          {[{ value: area1, setter: setArea1, label: 'Select Area 1' }, { value: area2, setter: setArea2, label: 'Select Area 2' }].map((selectProps) => (
            <div key={selectProps.label} className="relative min-w-[200px]">
              <select
                value={selectProps.value}
                onChange={(event) => selectProps.setter(event.target.value)}
                className="w-full appearance-none px-3 py-2 pr-10 rounded-lg border border-slate-200/60 dark:border-white/5 bg-white dark:bg-[#1a1f33] text-[#111424] dark:text-[#f0f0f0] text-xs font-medium focus:outline-none focus:border-[#c9a84c30] transition-all cursor-pointer shadow-sm"
              >
                <option value="">{selectProps.label}</option>
                {areaOptions.map((areaName) => (
                  <option key={areaName} value={areaName} className="bg-white dark:bg-[#1a1f33]">
                    {areaName}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 dark:text-[#8892a4] pointer-events-none" />
            </div>
          ))}
        </div>
      </div>

      {/* Area Data Table Card */}
      <div className="bg-white dark:bg-[#1a1f33] border border-slate-200/60 dark:border-white/5 rounded-[16px] p-6 shadow-sm">
        <div className="mb-6">
          <div className="text-[18px] font-extrabold font-serif text-[#111424] dark:text-[#f0f0f0] transition-colors leading-tight">
            Area Data Table
          </div>
          <div className="text-[13px] text-slate-500 dark:text-[#8892a4] mt-1 transition-colors font-medium">
            {tableData.length} areas tracked
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-[12px]">
            <thead>
              <tr className="bg-[#fcfaf5] dark:bg-[#1e2440] transition-colors border-b-2 border-slate-100 dark:border-white/5">
                <th className="p-[12px] text-left text-slate-400 dark:text-[#8892a4] font-bold uppercase tracking-wider text-[11px]">Area</th>
                <th className="p-[12px] text-right text-slate-400 dark:text-[#8892a4] font-bold uppercase tracking-wider text-[11px]">Sales ↓</th>
                <th className="p-[12px] text-right text-slate-400 dark:text-[#8892a4] font-bold uppercase tracking-wider text-[11px]">Off-Plan</th>
                <th className="p-[12px] text-right text-slate-400 dark:text-[#8892a4] font-bold uppercase tracking-wider text-[11px]">Ready</th>
                <th className="p-[12px] text-right text-slate-400 dark:text-[#8892a4] font-bold uppercase tracking-wider text-[11px]">Avg Price</th>
                <th className="p-[12px] text-right text-slate-400 dark:text-[#8892a4] font-bold uppercase tracking-wider text-[11px]">AED/sqft</th>
                <th className="p-[12px] text-right text-slate-400 dark:text-[#8892a4] font-bold uppercase tracking-wider text-[11px]">Freehold</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              {tableData.slice(0, 20).map((row) => (
                <tr key={row.id} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group">
                  <td className="p-[10px_12px] font-bold text-[#111424] dark:text-[#f0f0f0] whitespace-nowrap">{row.area}</td>
                  <td className="p-[10px_12px] text-right font-mono font-semibold text-slate-700 dark:text-[#cbd5e1]">{formatNumber(row.sales)}</td>
                  <td className="p-[10px_12px] text-right text-slate-500 dark:text-[#8892a4]">{formatNumber(row.offPlan)}</td>
                  <td className="p-[10px_12px] text-right text-slate-500 dark:text-[#8892a4]">{formatNumber(row.ready)}</td>
                  <td className="p-[10px_12px] text-right font-bold text-[#a38847] dark:text-[#c9a84c]">AED {row.avgPrice}</td>
                  <td className="p-[10px_12px] text-right font-mono text-slate-700 dark:text-[#cbd5e1]">{row.sqft.replace('AED ', '')}</td>
                  <td className="p-[10px_12px] text-right text-slate-500 dark:text-[#8892a4]">{formatNumber(row.freehold)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination UI */}
        <div className="mt-6 flex items-center justify-center gap-1.5 pt-6 border-t border-slate-100 dark:border-white/5">
          <button className="px-3.5 py-1.5 rounded-lg border border-slate-200/60 dark:border-white/5 bg-white dark:bg-[#1a1f33] text-slate-400 dark:text-[#4d5a78] text-[11px] font-bold opacity-50 cursor-not-allowed uppercase tracking-tighter" disabled>
            Prev
          </button>
          <span className="text-[11px] font-bold text-slate-500 dark:text-[#8892a4] px-2 uppercase">Page 1 of 5</span>
          <button className="px-3.5 py-1.5 rounded-lg border border-slate-200/60 dark:border-white/5 bg-white dark:bg-[#1a1f33] text-[#111424] dark:text-[#f0f0f0] text-[11px] font-bold hover:bg-slate-50 dark:hover:bg-white/5 transition-all shadow-sm uppercase tracking-tighter">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarketAreaComparison;
