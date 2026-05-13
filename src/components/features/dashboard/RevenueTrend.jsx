import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line 
} from 'recharts';

const data = [
  { name: 'Sep', revenue: 65, compliance: 85 },
  { name: 'Oct', revenue: 62, compliance: 88 },
  { name: 'Nov', revenue: 78, compliance: 90 },
  { name: 'Dec', revenue: 82, compliance: 92 },
  { name: 'Jan', revenue: 88, compliance: 95 },
  { name: 'Feb', revenue: 95, compliance: 98 },
];

const RevenueTrend = () => {
  return (
    <div className="bg-white dark:bg-[#1a1c2e]/40 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-[16px] p-4 flex flex-col gap-4 shadow-sm h-full">
      <div className="flex items-center justify-between">
        <h3 className="text-[16px] font-serif font-bold text-slate-900 dark:text-white tracking-tight">Business Trends</h3>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-[#ccab59]" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Revenue</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Compliance</span>
          </div>
        </div>
      </div>

      <div className="flex-1 w-full min-h-[180px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ccab59" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#ccab59" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 600 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 600 }}
            />
            <Tooltip
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontSize: '11px' }}
              itemStyle={{ fontWeight: 'bold', padding: '2px 0' }}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#ccab59"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorRev)"
              dot={{ r: 3, fill: '#ccab59', strokeWidth: 2, stroke: '#fff' }}
              activeDot={{ r: 5, strokeWidth: 0 }}
            />
            <Area
              type="monotone"
              dataKey="compliance"
              stroke="#10b981"
              strokeWidth={2}
              fill="transparent"
              dot={{ r: 3, fill: '#10b981', strokeWidth: 2, stroke: '#fff' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueTrend;
