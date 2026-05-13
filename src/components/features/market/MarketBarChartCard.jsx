import React from 'react';

const MarketBarChartCard = ({ title, items, valueFormatter }) => {
  const maxValue = Math.max(...items.map((item) => item.value));

  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm shadow-[#00000008] overflow-hidden dark:border-[#1f2d45] dark:bg-[#0b1220] dark:shadow-[#0000001f]">
      <h2 className="text-lg font-bold text-slate-900 mb-6 dark:text-white">{title}</h2>

      <div className="space-y-4">
        {items.map((item) => {
          const width = maxValue > 0 ? (item.value / maxValue) * 100 : 0;
          return (
            <div key={item.label} className="flex items-center gap-4">
              <div className="min-w-44 text-sm text-slate-700 font-medium dark:text-slate-300">
                {item.label}
              </div>
              <div className="flex-1 min-w-0">
                <div className="h-3 rounded-full bg-slate-100 overflow-hidden dark:bg-[#15213a]">
                  <div
                    className="h-full rounded-full bg-linear-to-r from-[#bf9d3f] to-[#7e6f25] transition-all"
                    style={{ width: `${Math.max(width, 4)}%` }}
                  />
                </div>
              </div>
              <div className="w-28 text-right text-sm text-slate-900 font-semibold dark:text-slate-200">
                {valueFormatter(item.value)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MarketBarChartCard;
