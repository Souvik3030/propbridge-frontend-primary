import React, { useState, useMemo } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell 
} from 'recharts';
import { calcScores } from './CompareHelpers';

const ScoringTab = ({ projects }) => {
  const [weights, setWeights] = useState({ 
    Price: 5, 
    Location: 5, 
    Size: 5, 
    Yield: 5, 
    Developer: 5 
  });

  const scored = useMemo(() => {
    return projects.map(p => {
      const s = calcScores(p);
      const total = Math.round(
        (s.priceValue    * weights.Price +
         s.locationRating * weights.Location +
         s.areaSize       * weights.Size +
         s.yieldScore     * weights.Yield +
         s.developerRep   * weights.Developer) /
        Object.values(weights).reduce((a, b) => a + b, 0)
      );
      return { project: p, score: Math.min(100, total) };
    });
  }, [projects, weights]);

  const sorted = [...scored].sort((a, b) => b.score - a.score);
  const best = sorted[0];

  const barData = sorted.map(({ project, score }) => ({ name: project.t, score }));

  return (
    <div className="flex flex-col gap-8 px-8 pb-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Weight Controls */}
      <div className="bg-[#fcfaf5] dark:bg-slate-800/10 border border-[#ece7d9] dark:border-slate-800/50 rounded-3xl p-6 sm:p-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {Object.keys(weights).map((key) => (
            <div key={key} className="flex flex-col items-center gap-4">
              <span className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">{key}</span>
              <div className="relative w-full h-24 flex items-center justify-center">
                <input
                  type="range" 
                  min={1} 
                  max={10} 
                  value={weights[key]}
                  onChange={(e) => setWeights(prev => ({ ...prev, [key]: Number(e.target.value) }))}
                  className="w-24 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#ccab59] -rotate-90"
                />
              </div>
              <span className="text-[#ccab59] font-black text-[18px] leading-none mb-0.5">{weights[key]}</span>
              <span className="text-[9px] font-bold text-slate-300 dark:text-slate-600 uppercase tracking-tighter">Weight</span>
            </div>
          ))}
        </div>
      </div>

      {/* Best Match Highlight */}
      {best && (
        <div className="relative border border-[#f3e8c1] dark:border-[#ccab59]/30 bg-gradient-to-br from-[#fdf8e9] to-white dark:from-[#ccab59]/10 dark:to-transparent rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6 overflow-hidden shadow-sm group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 -rotate-45 translate-x-10 -translate-y-10 rounded-full group-hover:scale-110 transition-transform" />
          
          <div className="flex items-center gap-6 z-10">
            <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-white dark:border-slate-800 shadow-xl group-hover:rotate-2 transition-transform">
              <img
                src={best.project.cv}
                alt={best.project.t}
                className="w-full h-full object-cover"
                onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=200'; }}
              />
            </div>
            <div>
              <p className="text-[10px] text-[#a38847] dark:text-[#ccab59] font-black uppercase tracking-[0.2em] mb-1">Your Perfect Match</p>
              <p className="text-[24px] font-black text-slate-900 dark:text-white leading-tight mb-1">{best.project.t}</p>
              <div className="flex items-center gap-2">
                 <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                 <p className="text-[12px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">{best.project.d}</p>
              </div>
            </div>
          </div>
          
          <div className="text-center sm:text-right z-10">
            <div className="inline-flex flex-col items-center sm:items-end">
               <span className="text-[48px] font-black text-[#ccab59] leading-[0.8] mb-2">{best.score}</span>
               <span className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.15em]">Weighted Match Score</span>
            </div>
          </div>
        </div>
      )}

      {/* Chart Section */}
      <div className="flex-1 w-full h-[300px] mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={barData}
            margin={{ top: 0, right: 30, left: 20, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
            <XAxis type="number" domain={[0, 100]} hide />
            <YAxis 
              type="category" 
              dataKey="name" 
              width={120} 
              tick={{ fontSize: 13, fill: '#64748b', fontWeight: 700 }} 
              axisLine={false}
              tickLine={false}
            />
            <Tooltip 
              cursor={{ fill: 'transparent' }}
              contentStyle={{ 
                borderRadius: '16px', 
                border: 'none', 
                boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
                padding: '12px 16px'
              }}
              labelStyle={{ fontWeight: 'black', marginBottom: '4px', color: '#1e293b' }}
              itemStyle={{ fontWeight: 'bold' }}
              formatter={(v) => [`${v}%`, 'Match Confidence']} 
            />
            <Bar dataKey="score" radius={[0, 8, 8, 0]} barSize={32}>
              {barData.map((entry, index) => (
                <Cell 
                  key={entry.name} 
                  fill={index === 0 ? '#ccab59' : '#e2e8f0'} 
                  className="transition-all hover:opacity-80"
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ScoringTab;
