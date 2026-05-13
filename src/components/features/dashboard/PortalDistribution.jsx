import React from 'react';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip 
} from 'recharts';

const data = [
  { name: 'Property Finder', value: 42, color: '#ccab59' },
  { name: 'Bayut', value: 35, color: '#10b981' },
  { name: 'Dubizzle', value: 23, color: '#f59e0b' },
];

const PortalDistribution = () => {
  return (
    <div className="bg-white dark:bg-[#1a1c2e]/40 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-[16px] p-4 flex flex-col gap-4 shadow-sm h-full">
      <h3 className="text-[16px] font-serif font-bold text-slate-900 dark:text-white tracking-tight">
        Portal Distribution
      </h3>
      
      <div className="flex-1 w-full min-h-[180px] flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={70}
              paddingAngle={4}
              dataKey="value"
              stroke="none"
              animationBegin={0}
              animationDuration={1500}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} className="transition-all hover:opacity-80" />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontSize: '10px' }}
              itemStyle={{ fontWeight: 'bold' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-1">
        {data.map(item => (
          <div key={item.name} className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 min-w-0">
               <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
               <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tight truncate">{item.name}</span>
            </div>
            <span className="text-[10px] font-bold text-slate-900 dark:text-white shrink-0 ml-1">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PortalDistribution;
