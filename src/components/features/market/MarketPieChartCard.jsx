import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const MarketPieChartCard = ({ title, data, colors }) => {
  const isDonut = data.length === 2;
  const totalValue = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="bg-white dark:bg-[#1a1f33] border border-black/5 dark:border-white/5 rounded-[16px] p-6 mb-5 shadow-[0_4px_24px_rgba(0,0,0,0.08)] transition-all duration-300">
      <h2 className="text-[18px] font-[800] font-serif text-[#1a1a2e] dark:text-[#f0f0f0] tracking-[0.01em] transition-colors mb-6 leading-tight">
        {title}
      </h2>

      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* Chart Container */}
        <div className="w-full md:w-1/2 h-[280px] relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip
                contentStyle={{ 
                  background: 'rgba(255, 255, 255, 0.98)', 
                  border: '1px solid rgba(201,168,76,0.2)', 
                  borderRadius: '14px', 
                  boxShadow: '0 15px 40px rgba(0,0,0,0.12)',
                  padding: '12px',
                  backdropFilter: 'blur(10px)',
                  fontSize: '11px',
                  fontWeight: 800
                }}
                itemStyle={{ color: '#a38847' }}
              />
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius={isDonut ? 75 : 0}
                outerRadius={100}
                paddingAngle={isDonut ? 6 : 0}
                stroke="transparent"
                startAngle={90}
                endAngle={-270}
                animationBegin={200}
                animationDuration={1500}
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`slice-${entry.name}`} 
                    fill={colors[index % colors.length]} 
                    className="transition-all duration-300 hover:opacity-80"
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          
          {isDonut && (
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Total</span>
              <span className="text-[20px] font-black font-serif text-[#1a1a2e] dark:text-white">
                {totalValue >= 1000 ? `${(totalValue/1000).toFixed(1)}k` : totalValue}
              </span>
            </div>
          )}
        </div>

        {/* Enhanced Legend */}
        <div className="w-full md:w-1/2 space-y-3">
          {data.map((entry, index) => (
            <div
              key={entry.name}
              className="flex items-center justify-between p-3 rounded-xl border border-slate-50 dark:border-white/5 bg-slate-50/50 dark:bg-white/5 transition-all hover:border-[#c9a84c30] group/item"
            >
              <div className="flex items-center gap-3">
                <span
                  className="h-2.5 w-2.5 rounded-full ring-4 ring-offset-2 dark:ring-offset-[#1a1f33] ring-transparent group-hover/item:ring-[#c9a84c20] transition-all"
                  style={{ backgroundColor: colors[index % colors.length] }}
                />
                <span className="text-[12px] font-bold text-slate-600 dark:text-[#cbd5e1] uppercase tracking-tight">
                  {entry.name}
                </span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[13px] font-black text-[#1a1a2e] dark:text-white">
                  {((entry.value / totalValue) * 100).toFixed(1)}%
                </span>
                <span className="text-[10px] font-bold text-slate-400 dark:text-[#8892a4]">
                  {entry.value.toLocaleString()} units
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketPieChartCard;
