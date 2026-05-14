import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const MarketColumnChartCard = ({ title, subtitle, data, xKey, dataKey, colors = ['#a38847', '#b59a4e', '#c9a84c'], valueFormatter }) => {
  return (
    <div className="bg-white dark:bg-[#1a1f33] border border-black/5 dark:border-white/5 rounded-[16px] p-6 mb-5 shadow-[0_4px_24px_rgba(0,0,0,0.08)] transition-all duration-300">
      <div className="mb-4">
        <h2 className="text-[18px] font-[800] font-serif text-[#1a1a2e] dark:text-[#f0f0f0] tracking-[0.01em] transition-colors leading-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="text-[12px] text-slate-500 dark:text-[#8892a4] mt-1 transition-colors font-medium uppercase tracking-wider">
            {subtitle}
          </p>
        )}
      </div>

      <div className="w-full h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#c9a84c" stopOpacity={1} />
                <stop offset="100%" stopColor="#a38847" stopOpacity={0.8} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} opacity={0.3} className="dark:stroke-white/10" />
            <XAxis
              dataKey={xKey}
              tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }}
              tickLine={false}
              axisLine={false}
              interval={0}
              height={60}
              textAnchor="end"
              angle={-45}
              dy={15}
            />
            <YAxis 
              tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }} 
              tickLine={false} 
              axisLine={false} 
              width={60}
              tickFormatter={(value) => value >= 1000 ? `${(value/1000).toFixed(0)}k` : value}
            />
            <Tooltip
              cursor={{ fill: 'rgba(201,168,76,0.04)', radius: 8 }}
              contentStyle={{ 
                background: 'rgba(255, 255, 255, 0.98)', 
                border: '1px solid rgba(201,168,76,0.2)', 
                borderRadius: '14px', 
                boxShadow: '0 15px 40px rgba(0,0,0,0.12)',
                padding: '16px',
                backdropFilter: 'blur(10px)',
              }}
              itemStyle={{ 
                color: '#a38847', 
                fontWeight: 800, 
                fontSize: '14px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}
              labelStyle={{ 
                color: '#1a1a2e', 
                fontWeight: 800, 
                fontSize: '12px',
                marginBottom: '8px',
                fontFamily: 'serif'
              }}
              formatter={(value) => (valueFormatter ? valueFormatter(value) : value.toLocaleString())}
              animationDuration={300}
            />
            <Bar 
              dataKey={dataKey} 
              radius={[6, 6, 0, 0]} 
              barSize={20}
              animationBegin={200}
              animationDuration={1500}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={index === 0 ? "url(#barGradient)" : colors[index % colors.length]} 
                  className="transition-all duration-300 hover:opacity-80"
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MarketColumnChartCard;
