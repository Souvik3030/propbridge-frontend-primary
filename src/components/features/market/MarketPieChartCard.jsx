import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const MarketPieChartCard = ({ title, data, colors }) => {
  const isDonut = data.length === 2;

  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm shadow-[#00000008] dark:border-[#1f2d45] dark:bg-[#0b1220] dark:shadow-[#0000001f]">
      <h2 className="text-lg font-bold text-slate-900 mb-4 dark:text-white">{title}</h2>

      <div className="mb-6 flex flex-wrap gap-3 overflow-x-auto pb-1">
        {data.map((entry, index) => (
          <div
            key={entry.name}
            className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
          >
            <span
              className="h-2.5 w-2.5 rounded-full shrink-0"
              style={{ backgroundColor: colors[index % colors.length] }}
            />
            <span>{entry.name}</span>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <div className="w-full max-w-105 h-70">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius={isDonut ? 64 : 0}
                outerRadius={108}
                paddingAngle={3}
                stroke="transparent"
                startAngle={90}
                endAngle={-270}
              >
                {data.map((entry, index) => (
                  <Cell key={`slice-${entry.name}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default MarketPieChartCard;
