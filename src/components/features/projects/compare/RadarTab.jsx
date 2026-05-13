import React from 'react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip 
} from 'recharts';
import { COLORS, RADAR_AXES, calcScores } from './CompareHelpers';

const RadarTab = ({ projects }) => {
  const data = RADAR_AXES.map(({ key, label }) => {
    const entry = { metric: label };
    projects.forEach(p => {
      entry[p.t] = calcScores(p)[key];
    });
    return entry;
  });

  return (
    <div className="flex flex-col animate-in fade-in duration-500">
      {/* Chart Section */}
      <div className="flex justify-center py-4">
        <div className="w-full max-w-lg h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
              <PolarGrid stroke="#e2e8f0" strokeDasharray="3 3" />
              <PolarAngleAxis dataKey="metric" tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 600 }} />
              <Tooltip 
                contentStyle={{ 
                  borderRadius: '12px', 
                  border: 'none', 
                  boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}
                formatter={(v) => [`${Math.round(v)}/100`, 'Rating']}
              />
              {projects.map((p, i) => (
                <Radar
                  key={p.i}
                  name={p.t}
                  dataKey={p.t}
                  stroke={COLORS[i]}
                  fill={COLORS[i]}
                  fillOpacity={0.12}
                  strokeWidth={3}
                />
              ))}
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-5 mb-8">
        {projects.map((p, i) => (
          <div key={p.i} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i] }} />
            <span className="text-[11px] font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">{p.t}</span>
          </div>
        ))}
      </div>

      {/* Score Cards Grid */}
      <div className="grid gap-4 px-6 mb-4" style={{ gridTemplateColumns: `repeat(${projects.length}, 1fr)` }}>
        {projects.map((p, i) => {
          const s = calcScores(p);
          return (
            <div
              key={p.i}
              className="rounded-2xl border p-5 transition-all hover:shadow-lg"
              style={{ 
                borderColor: COLORS[i] + '44', 
                backgroundColor: COLORS[i] + '08' 
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                 <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                 <p className="font-black text-[14px] truncate" style={{ color: COLORS[i] }}>{p.t}</p>
              </div>
              
              <div className="space-y-3">
                {RADAR_AXES.map(({ key, label }) => (
                  <div key={key} className="flex flex-col gap-1">
                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
                      <span>{label}</span>
                      <span className="text-slate-700 dark:text-slate-200">{Math.round(s[key])}</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-200/50 dark:bg-slate-700/30 rounded-full overflow-hidden">
                       <div 
                         className="h-full rounded-full transition-all duration-1000"
                         style={{ 
                           width: `${s[key]}%`,
                           backgroundColor: COLORS[i]
                         }}
                       />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RadarTab;
