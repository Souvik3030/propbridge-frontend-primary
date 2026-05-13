import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const MarketColumnChartCard = ({ title, subtitle, data, xKey, dataKey, colors = ['#d4aa58', '#b58d3f', '#9a7a2e'], valueFormatter }) => {
  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm shadow-[#00000008] dark:border-[#1f2d45] dark:bg-[#0b1220] dark:shadow-[#0000001f]">
      <div className="mb-5">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">{title}</h2>
        {subtitle && <p className="text-sm text-slate-500 mt-2 dark:text-slate-400">{subtitle}</p>}
      </div>

      <div className="w-full h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} opacity={0.7} />
            <XAxis
              dataKey={xKey}
              tick={{ fill: '#475569', fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              interval={0}
              height={56}
              textAnchor="end"
              angle={-35}
              dy={16}
            />
            <YAxis tick={{ fill: '#475569', fontSize: 12 }} tickLine={false} axisLine={false} width={36} />
            <Tooltip
              cursor={{ fill: 'rgba(203,186,133,0.08)' }}
              contentStyle={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '18px', boxShadow: '0 10px 30px rgba(15,23,42,0.08)' }}
              formatter={(value) => (valueFormatter ? valueFormatter(value) : value.toLocaleString())}
              labelStyle={{ color: '#0f172a', fontWeight: 700 }}
            />
            <Bar dataKey={dataKey} radius={[12, 12, 0, 0]} fill={colors[0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MarketColumnChartCard;
