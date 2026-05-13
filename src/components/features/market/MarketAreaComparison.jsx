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
    <div className="space-y-6">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Area Comparison</h2>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          {[{ value: area1, setter: setArea1, label: 'Select Area 1' }, { value: area2, setter: setArea2, label: 'Select Area 2' }].map((selectProps) => (
            <div key={selectProps.label} className="relative w-full sm:w-80 rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
              <select
                value={selectProps.value}
                onChange={(event) => selectProps.setter(event.target.value)}
                className="w-full appearance-none rounded-2xl border-none bg-transparent px-4 py-3 text-sm text-slate-900 outline-none dark:text-slate-100"
              >
                <option value="">{selectProps.label}</option>
                {areaOptions.map((areaName) => (
                  <option key={areaName} value={areaName} className="bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
                    {areaName}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute inset-y-0 right-4 top-0 flex items-center text-slate-400 dark:text-slate-300">
                <ChevronDown className="w-4 h-4" />
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950 overflow-hidden">
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Area Data Table</h3>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{tableData.length} areas</p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full w-full text-left border-separate border-spacing-y-2">
            <thead>
              <tr className="border-b border-slate-200/80 text-sm font-semibold uppercase tracking-[0.15em] text-slate-500 dark:border-slate-800/70 dark:text-slate-400">
                <th className="px-4 py-3">Area</th>
                <th className="px-4 py-3 text-right">Sales ↓</th>
                <th className="px-4 py-3 text-right">Off-Plan</th>
                <th className="px-4 py-3 text-right">Ready</th>
                <th className="px-4 py-3 text-right">Avg Price</th>
                <th className="px-4 py-3 text-right">AED/sqft</th>
                <th className="px-4 py-3 text-right">Freehold</th>
              </tr>
            </thead>
            <tbody className="text-sm text-slate-700 dark:text-slate-200">
              {tableData.map((row) => (
                <tr key={row.id} className="border-b border-slate-100 dark:border-slate-800/70">
                  <td className="px-4 py-4 font-semibold text-slate-900 dark:text-slate-100">{row.area}</td>
                  <td className="px-4 py-4 text-right text-slate-700 dark:text-slate-300">{formatNumber(row.sales)}</td>
                  <td className="px-4 py-4 text-right text-slate-700 dark:text-slate-300">{formatNumber(row.offPlan)}</td>
                  <td className="px-4 py-4 text-right text-slate-700 dark:text-slate-300">{formatNumber(row.ready)}</td>
                  <td className="px-4 py-4 text-right text-amber-600 dark:text-amber-400">AED {row.avgPrice}</td>
                  <td className="px-4 py-4 text-right text-slate-700 dark:text-slate-300">{row.sqft.replace('AED ', '')}</td>
                  <td className="px-4 py-4 text-right text-slate-700 dark:text-slate-300">{formatNumber(row.freehold)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex items-center justify-center gap-3 border-t border-slate-200/80 pt-4 text-sm text-slate-500 dark:border-slate-800/70 dark:text-slate-400">
          <button className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-slate-400 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-500" disabled>
            Prev
          </button>
          <span>Page 1 of 5</span>
          <button className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-slate-700 transition hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:hover:bg-slate-900">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarketAreaComparison;
