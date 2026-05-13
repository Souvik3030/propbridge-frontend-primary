import React from 'react';
import { COLORS, TABLE_METRICS, getBestPrice } from './CompareHelpers';

const TableTab = ({ projects }) => {
  const bestPrice = getBestPrice(projects);
  return (
    <div className="overflow-auto scrollbar-none md:scrollbar-thin">
      <table className="w-full text-sm border-separate border-spacing-0">
        <thead>
          <tr className="border-b border-slate-200 dark:border-slate-700">
            <th className="text-left text-[11px] text-slate-400 font-bold py-4 px-6 w-[180px] uppercase tracking-wider sticky left-0 bg-white dark:bg-[#111827] z-20">Metric</th>
            {projects.map((p, i) => (
              <th key={p.i} className="text-center py-4 px-4 min-w-[200px] border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-[14px] font-black text-slate-800 dark:text-white truncate max-w-[150px]">{p.t}</span>
                  <div 
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: COLORS[i] }}
                  />
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {TABLE_METRICS.map(({ key, fn, highlight }, rowIdx) => (
            <tr
              key={key}
              className={`group ${rowIdx % 2 === 0 ? 'bg-slate-50/30 dark:bg-slate-800/5' : ''}`}
            >
              <td className="py-3.5 px-6 text-[12px] text-slate-500 dark:text-slate-400 font-bold border-b border-slate-100 dark:border-slate-800/50 sticky left-0 bg-white dark:bg-[#111827] group-hover:bg-slate-100 dark:group-hover:bg-slate-800/40 z-10 transition-colors">
                {key}
              </td>
              {projects.map((p, i) => {
                const val = fn(p);
                const isGold  = highlight === 'gold'  && val !== '—';
                const isBlue  = highlight === 'blue'  && val !== '—';
                const isDev   = key === 'Developer';
                return (
                  <td key={p.i} className="py-3.5 px-4 text-center border-b border-slate-100 dark:border-slate-800/50 transition-colors group-hover:bg-slate-50/50 dark:group-hover:bg-slate-800/20">
                    <span className={`text-[13px] font-bold ${
                      isDev   ? 'text-[#a38847] dark:text-[#ccab59]' :
                      isGold  ? 'text-[#ccab59]' :
                      isBlue  ? 'text-blue-500' :
                      'text-slate-600 dark:text-slate-300'
                    }`}>
                      {val}
                    </span>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableTab;
